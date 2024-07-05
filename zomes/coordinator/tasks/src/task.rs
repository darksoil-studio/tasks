use hdk::prelude::*;
use tasks_integrity::*;

#[hdk_extern]
pub fn create_task(task: Task) -> ExternResult<Record> {
    let task_hash = create_entry(&EntryTypes::Task(task.clone()))?;
    create_link(
        task.assignee.clone(),
        task_hash.clone(),
        LinkTypes::AssigneeToTasks,
        (),
    )?;
    for base in task.dependencies.clone() {
        create_link(base, task_hash.clone(), LinkTypes::Dependency, ())?;
    }
    let record = get(task_hash.clone(), GetOptions::default())?.ok_or(wasm_error!(
        WasmErrorInner::Guest("Could not find the newly created Task".to_string())
    ))?;
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
pub struct UpdateTaskInput {
    pub original_task_hash: ActionHash,
    pub previous_task_hash: ActionHash,
    pub updated_task: Task,
}

#[hdk_extern]
pub fn update_task(input: UpdateTaskInput) -> ExternResult<Record> {
    let updated_task_hash = update_entry(input.previous_task_hash.clone(), &input.updated_task)?;
    create_link(
        input.original_task_hash.clone(),
        updated_task_hash.clone(),
        LinkTypes::TaskUpdates,
        (),
    )?;
    let record = get(updated_task_hash.clone(), GetOptions::default())?.ok_or(wasm_error!(
        WasmErrorInner::Guest("Could not find the newly updated Task".to_string())
    ))?;
    Ok(record)
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
    let links = get_links(
        GetLinksInputBuilder::try_new(task.assignee.clone(), LinkTypes::AssigneeToTasks)?.build(),
    )?;
    for link in links {
        if let Some(action_hash) = link.target.into_action_hash() {
            if action_hash == original_task_hash {
                delete_link(link.create_link_hash)?;
            }
        }
    }
    for base_address in task.dependencies {
        let links = get_links(
            GetLinksInputBuilder::try_new(base_address.clone(), LinkTypes::Dependency)?.build(),
        )?;
        for link in links {
            if let Some(action_hash) = link.target.into_action_hash() {
                if action_hash == original_task_hash {
                    delete_link(link.create_link_hash)?;
                }
            }
        }
    }
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
