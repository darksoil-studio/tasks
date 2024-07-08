use crate::{
    unfinished_tasks::{add_to_unfinished, is_finished, remove_from_unfinished},
    utils::{create_link_relaxed, delete_link_relaxed, update_relaxed},
};
use hdk::prelude::*;
use tasks_integrity::*;

#[hdk_extern]
pub fn create_task(task: Task) -> ExternResult<Record> {
    let task_hash = create_entry(&EntryTypes::Task(task.clone()))?;
    if let Some(assignee) = task.assignee {
        create_link(
            assignee.clone(),
            task_hash.clone(),
            LinkTypes::AssigneeToTasks,
            (),
        )?;
    }
    for dependency in task.dependencies.clone() {
        create_link(
            dependency.original_revision_hash,
            task_hash.clone(),
            LinkTypes::Dependency,
            dependency.last_revision_hash.into_inner(),
        )?;
    }
    let record = get(task_hash.clone(), GetOptions::default())?.ok_or(wasm_error!(
        WasmErrorInner::Guest("Could not find the newly created Task".to_string())
    ))?;
    add_to_unfinished(&task_hash)?;
    Ok(record)
}

#[hdk_extern]
pub fn get_latest_task(original_task_hash: ActionHash) -> ExternResult<Option<Record>> {
    let links = get_links(
        GetLinksInputBuilder::try_new(original_task_hash.clone(), LinkTypes::TaskUpdates)?.build(),
    )?;
    let latest_link = links
        .into_iter()
        .max_by(|link_a, link_b| link_a.timestamp.cmp(&link_b.timestamp));
    let latest_task_hash = match latest_link {
        Some(link) => {
            link.target
                .clone()
                .into_action_hash()
                .ok_or(wasm_error!(WasmErrorInner::Guest(
                    "No action hash associated with link".to_string()
                )))?
        }
        None => original_task_hash.clone(),
    };
    get(latest_task_hash, GetOptions::default())
}

#[hdk_extern]
pub fn get_original_task(original_task_hash: ActionHash) -> ExternResult<Option<Record>> {
    let Some(details) = get_details(original_task_hash, GetOptions::default())? else {
        return Ok(None);
    };
    match details {
        Details::Record(details) => Ok(Some(details.record)),
        _ => Err(wasm_error!(WasmErrorInner::Guest(
            "Malformed get details response".to_string()
        ))),
    }
}

#[hdk_extern]
pub fn get_all_revisions_for_task(original_task_hash: ActionHash) -> ExternResult<Vec<Record>> {
    let Some(original_record) = get_original_task(original_task_hash.clone())? else {
        return Ok(vec![]);
    };
    let links = get_links(
        GetLinksInputBuilder::try_new(original_task_hash.clone(), LinkTypes::TaskUpdates)?.build(),
    )?;
    let get_input: Vec<GetInput> = links
        .into_iter()
        .map(|link| {
            Ok(GetInput::new(
                link.target
                    .into_action_hash()
                    .ok_or(wasm_error!(WasmErrorInner::Guest(
                        "No action hash associated with link".to_string()
                    )))?
                    .into(),
                GetOptions::default(),
            ))
        })
        .collect::<ExternResult<Vec<GetInput>>>()?;
    let records = HDK.with(|hdk| hdk.borrow().get(get_input))?;
    let mut records: Vec<Record> = records.into_iter().flatten().collect();
    records.insert(0, original_record);
    Ok(records)
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CreateUpdateLinkForTaskInput {
    pub original_task_hash: ActionHash,
    pub new_task_hash: ActionHash,
}

#[hdk_extern]
pub fn create_update_link_for_task(input: CreateUpdateLinkForTaskInput) -> ExternResult<()> {
    create_link_relaxed(
        input.original_task_hash.clone(),
        input.new_task_hash.clone(),
        LinkTypes::TaskUpdates,
        (),
    )?;
    Ok(())
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateTaskInput {
    pub original_task_hash: ActionHash,
    pub previous_task_hash: ActionHash,
    pub updated_task: Task,
}

#[hdk_extern]
pub fn update_task(input: UpdateTaskInput) -> ExternResult<()> {
    update_relaxed(
        input.previous_task_hash.clone(),
        EntryTypes::Task(input.updated_task.clone()),
    )?;
    let Some(previous_task_record) = get(input.previous_task_hash.clone(), GetOptions::default())?
    else {
        return Err(wasm_error!(WasmErrorInner::Guest(String::from(
            "Previous task not found",
        ))));
    };
    let previous_task: crate::Task = previous_task_record
        .entry()
        .to_app_option()
        .map_err(|e| wasm_error!(e))?
        .ok_or(wasm_error!(WasmErrorInner::Guest(String::from(
            "Dependant action must be accompanied by an entry"
        ))))?;

    let finished = is_finished(&input.updated_task);

    if is_finished(&previous_task) != finished {
        if finished {
            remove_from_unfinished(&input.original_task_hash)?;
        } else {
            add_to_unfinished(&input.original_task_hash)?;
        }
    }

    if previous_task.assignee.ne(&input.updated_task.assignee) {
        if let Some(previous_assignee) = previous_task.assignee.clone() {
            let links = get_links(
                GetLinksInputBuilder::try_new(previous_assignee, LinkTypes::AssigneeToTasks)?
                    .build(),
            )?;
            for link in links {
                if let Some(action_hash) = link.target.into_action_hash() {
                    if action_hash.eq(&input.previous_task_hash) {
                        delete_link_relaxed(link.create_link_hash)?;
                    }
                }
            }
        }
        if let Some(new_assignee) = input.updated_task.assignee {
            create_link_relaxed(
                new_assignee.clone(),
                input.original_task_hash.clone(),
                LinkTypes::AssigneeToTasks,
                (),
            )?;
        }
    }

    let previous_dependencies: Vec<ActionHash> = previous_task
        .dependencies
        .iter()
        .map(|d| d.original_revision_hash.clone())
        .collect();
    let new_dependencies: Vec<ActionHash> = input
        .updated_task
        .dependencies
        .iter()
        .map(|d| d.original_revision_hash.clone())
        .collect();
    let removed_dependencies: Vec<TaskDependency> = previous_task
        .dependencies
        .into_iter()
        .filter(|previous_dep| !new_dependencies.contains(&previous_dep.original_revision_hash))
        .collect();
    let added_dependencies: Vec<TaskDependency> = input
        .updated_task
        .dependencies
        .into_iter()
        .filter(|new_dep| !previous_dependencies.contains(&new_dep.original_revision_hash))
        .collect();
    for dependency in added_dependencies {
        create_link_relaxed(
            dependency.original_revision_hash,
            input.original_task_hash.clone(),
            LinkTypes::Dependency,
            dependency.last_revision_hash.into_inner(),
        )?;
    }
    for dependency in removed_dependencies {
        let links = get_links(
            GetLinksInputBuilder::try_new(
                dependency.original_revision_hash,
                LinkTypes::Dependency,
            )?
            .tag_prefix(LinkTag::from(dependency.last_revision_hash.into_inner()))
            .build(),
        )?;
        for link in links {
            delete_link_relaxed(link.create_link_hash)?;
        }
    }
    Ok(())
}

pub fn new_status_from_dependencies(
    current_status: TaskStatus,
    dependencies: Vec<TaskDependency>,
) -> Option<TaskStatus> {
    let non_optional_dependencies: Vec<TaskDependency> =
        dependencies.into_iter().filter(|d| !d.optional).collect();
    match current_status {
        TaskStatus::Blocked => {
            if non_optional_dependencies
                .iter()
                .all(|d| d.status.eq(&TaskStatus::Done))
            {
                return Some(TaskStatus::Ready);
            }
            None
        }
        TaskStatus::Ready | TaskStatus::InProgress => {
            if non_optional_dependencies
                .iter()
                .any(|d| !d.status.eq(&TaskStatus::Done))
            {
                return Some(TaskStatus::Blocked);
            }
            None
        }
        _ => None,
    }
}

pub fn dependant_task_update_needed(previous_status: TaskStatus, new_status: TaskStatus) -> bool {
    if previous_status.eq(&new_status) {
        return false;
    }
    match (previous_status, new_status) {
        (_, TaskStatus::Done) => true,
        (TaskStatus::Done, TaskStatus::Ready) => true,
        (TaskStatus::Done, TaskStatus::InProgress) => true,
        _ => false,
    }
}

#[hdk_extern]
pub fn delete_task(original_task_hash: ActionHash) -> ExternResult<ActionHash> {
    let details = get_details(original_task_hash.clone(), GetOptions::default())?.ok_or(
        wasm_error!(WasmErrorInner::Guest("Task not found".to_string())),
    )?;
    let record = match details {
        Details::Record(details) => Ok(details.record),
        _ => Err(wasm_error!(WasmErrorInner::Guest(
            "Malformed get details response".to_string()
        ))),
    }?;
    let entry = record
        .entry()
        .as_option()
        .ok_or(wasm_error!(WasmErrorInner::Guest(
            "Task record has no entry".to_string()
        )))?;
    let task = <Task>::try_from(entry)?;
    if let Some(assignee) = task.assignee {
        let links = get_links(
            GetLinksInputBuilder::try_new(assignee.clone(), LinkTypes::AssigneeToTasks)?.build(),
        )?;
        for link in links {
            if let Some(action_hash) = link.target.into_action_hash() {
                if action_hash == original_task_hash {
                    delete_link(link.create_link_hash)?;
                }
            }
        }
    }
    for dependency in task.dependencies {
        let links = get_links(
            GetLinksInputBuilder::try_new(
                dependency.original_revision_hash.clone(),
                LinkTypes::Dependency,
            )?
            .build(),
        )?;
        for link in links {
            if let Some(action_hash) = link.target.into_action_hash() {
                if action_hash == original_task_hash {
                    delete_link(link.create_link_hash)?;
                }
            }
        }
    }
    remove_from_unfinished(&original_task_hash)?;
    delete_entry(original_task_hash)
}

#[hdk_extern]
pub fn get_all_deletes_for_task(
    original_task_hash: ActionHash,
) -> ExternResult<Option<Vec<SignedActionHashed>>> {
    let Some(details) = get_details(original_task_hash, GetOptions::default())? else {
        return Ok(None);
    };
    match details {
        Details::Entry(_) => Err(wasm_error!(WasmErrorInner::Guest(
            "Malformed details".into()
        ))),
        Details::Record(record_details) => Ok(Some(record_details.deletes)),
    }
}

#[hdk_extern]
pub fn get_oldest_delete_for_task(
    original_task_hash: ActionHash,
) -> ExternResult<Option<SignedActionHashed>> {
    let Some(mut deletes) = get_all_deletes_for_task(original_task_hash)? else {
        return Ok(None);
    };
    deletes.sort_by(|delete_a, delete_b| {
        delete_a
            .action()
            .timestamp()
            .cmp(&delete_b.action().timestamp())
    });
    Ok(deletes.first().cloned())
}

#[hdk_extern]
pub fn get_tasks_for_assignee(assignee: AgentPubKey) -> ExternResult<Vec<Link>> {
    get_links(GetLinksInputBuilder::try_new(assignee, LinkTypes::AssigneeToTasks)?.build())
}

#[hdk_extern]
pub fn get_deleted_tasks_for_assignee(
    assignee: AgentPubKey,
) -> ExternResult<Vec<(SignedActionHashed, Vec<SignedActionHashed>)>> {
    let details = get_link_details(
        assignee,
        LinkTypes::AssigneeToTasks,
        None,
        GetOptions::default(),
    )?;
    Ok(details
        .into_inner()
        .into_iter()
        .filter(|(_link, deletes)| !deletes.is_empty())
        .collect())
}

#[hdk_extern]
pub fn get_dependent_tasks_for_task(task_hash: ActionHash) -> ExternResult<Vec<Link>> {
    get_links(GetLinksInputBuilder::try_new(task_hash, LinkTypes::Dependency)?.build())
}

#[hdk_extern]
pub fn get_deleted_dependent_tasks_for_task(
    task_hash: ActionHash,
) -> ExternResult<Vec<(SignedActionHashed, Vec<SignedActionHashed>)>> {
    let details = get_link_details(
        task_hash,
        LinkTypes::Dependency,
        None,
        GetOptions::default(),
    )?;
    Ok(details
        .into_inner()
        .into_iter()
        .filter(|(_link, deletes)| !deletes.is_empty())
        .collect())
}
