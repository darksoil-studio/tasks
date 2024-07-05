use hdi::prelude::*;

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub enum TaskStatus {
    Ready,
    Blocked,
    InProgress,
    Done,
    Cancelled,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct TaskDependency {
    pub original_revision_hash: ActionHash,
    pub last_revision_hash: ActionHash,
    pub status: TaskStatus,
    pub optional: bool,
}

#[derive(Clone, PartialEq)]
#[hdk_entry_helper]
pub struct Task {
    pub name: String,
    pub description: String,
    pub deadline: Option<Timestamp>,
    pub assignee: AgentPubKey,
    pub dependencies: Vec<TaskDependency>,
    pub status: TaskStatus,
    pub original_create_hash: Option<ActionHash>,
}

pub fn validate_status_from_dependencies(
    task_status: TaskStatus,
    dependencies: Vec<TaskDependency>,
) -> ExternResult<ValidateCallbackResult> {
    let non_optional_dependencies: Vec<TaskDependency> =
        dependencies.into_iter().filter(|d| !d.optional).collect();
    match task_status {
        TaskStatus::Cancelled => Ok(ValidateCallbackResult::Valid),
        TaskStatus::Ready | TaskStatus::InProgress | TaskStatus::Done => {
            if non_optional_dependencies
                .iter()
                .all(|d| d.status.eq(&TaskStatus::Done))
            {
                return Ok(ValidateCallbackResult::Valid);
            } else {
                return Ok(ValidateCallbackResult::Invalid(String::from(
                    "Not all tasks are done yet: this task is not ready to be done.",
                )));
            }
        }
        TaskStatus::Blocked => {
            if non_optional_dependencies
                .iter()
                .all(|d| d.status.eq(&TaskStatus::Done))
            {
                return Ok(ValidateCallbackResult::Invalid(String::from(
                    "All tasks are done: this task is not blocked.",
                )));
            } else {
                return Ok(ValidateCallbackResult::Valid);
            }
        }
    }
}

pub fn validate_create_task(
    action: EntryCreationAction,
    task: Task,
) -> ExternResult<ValidateCallbackResult> {
    match action {
        EntryCreationAction::Create(_) => {
            if let Some(_) = task.original_create_hash {
                return Ok(ValidateCallbackResult::Invalid(String::from(
                    "Create tasks can't have original_action_hash",
                )));
            }
        }
        EntryCreationAction::Update(_update) => {
            if let None = task.original_create_hash {
                return Ok(ValidateCallbackResult::Invalid(String::from(
                    "Update tasks must have original_action_hash",
                )));
            }
        }
    }

    for dependency in task.dependencies.clone() {
        let record = must_get_valid_record(dependency.original_revision_hash)?;
        let _task: crate::Task = record
            .entry()
            .to_app_option()
            .map_err(|e| wasm_error!(e))?
            .ok_or(wasm_error!(WasmErrorInner::Guest(String::from(
                "Dependant action must be accompanied by an entry"
            ))))?;
        let record = must_get_valid_record(dependency.last_revision_hash)?;
        let last_revision_dependency_task: crate::Task = record
            .entry()
            .to_app_option()
            .map_err(|e| wasm_error!(e))?
            .ok_or(wasm_error!(WasmErrorInner::Guest(String::from(
                "Dependant action must be accompanied by an entry"
            ))))?;
        if !last_revision_dependency_task.status.eq(&dependency.status) {
            return Ok(ValidateCallbackResult::Invalid(String::from(
                "Invalid TaskDependency status",
            )));
        }
    }

    validate_status_from_dependencies(task.status, task.dependencies)
}

pub fn validate_update_task(
    action: Update,
    task: Task,
    original_action: EntryCreationAction,
    original_task: Task,
) -> ExternResult<ValidateCallbackResult> {
    if let Some(original_create_hash) = task.original_create_hash {
        if let Some(previous_original_task_action) = original_task.original_create_hash {
            if !original_create_hash.eq(&previous_original_task_action) {
                return Ok(ValidateCallbackResult::Invalid(String::from(
                    "Task update must not change the original_create_hash",
                )));
            }
        } else {
            if let EntryCreationAction::Create(_create) = original_action {
                if !action.original_action_address.eq(&original_create_hash) {
                    return Ok(ValidateCallbackResult::Invalid(String::from(
                        "The first update must have the correct original_create_hash",
                    )));
                }
            } else {
                return Ok(ValidateCallbackResult::Invalid(String::from(
                    "Unreachable: Updates of updates must have original_create_hash",
                )));
            }
        }
    } else {
        return Ok(ValidateCallbackResult::Invalid(String::from(
            "Task update must have original_create_hash",
        )));
    }
    Ok(ValidateCallbackResult::Valid)
}

pub fn validate_delete_task(
    _action: Delete,
    _original_action: EntryCreationAction,
    _original_task: Task,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}

pub fn validate_create_link_assignee_to_tasks(
    _action: CreateLink,
    _base_address: AnyLinkableHash,
    target_address: AnyLinkableHash,
    _tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
    let action_hash =
        target_address
            .into_action_hash()
            .ok_or(wasm_error!(WasmErrorInner::Guest(
                "No action hash associated with link".to_string()
            )))?;
    let record = must_get_valid_record(action_hash)?;
    let _task: crate::Task = record
        .entry()
        .to_app_option()
        .map_err(|e| wasm_error!(e))?
        .ok_or(wasm_error!(WasmErrorInner::Guest(
            "Linked action must reference an entry".to_string()
        )))?;
    Ok(ValidateCallbackResult::Valid)
}

pub fn validate_delete_link_assignee_to_tasks(
    _action: DeleteLink,
    _original_action: CreateLink,
    _base: AnyLinkableHash,
    _target: AnyLinkableHash,
    _tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}

pub fn validate_create_link_task_to_tasks(
    _action: CreateLink,
    base_address: AnyLinkableHash,
    target_address: AnyLinkableHash,
    _tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
    let action_hash = base_address
        .into_action_hash()
        .ok_or(wasm_error!(WasmErrorInner::Guest(
            "No action hash associated with link".to_string()
        )))?;
    let record = must_get_valid_record(action_hash)?;
    let _task: crate::Task = record
        .entry()
        .to_app_option()
        .map_err(|e| wasm_error!(e))?
        .ok_or(wasm_error!(WasmErrorInner::Guest(
            "Linked action must reference an entry".to_string()
        )))?;
    let action_hash =
        target_address
            .into_action_hash()
            .ok_or(wasm_error!(WasmErrorInner::Guest(
                "No action hash associated with link".to_string()
            )))?;
    let record = must_get_valid_record(action_hash)?;
    let _task: crate::Task = record
        .entry()
        .to_app_option()
        .map_err(|e| wasm_error!(e))?
        .ok_or(wasm_error!(WasmErrorInner::Guest(
            "Linked action must reference an entry".to_string()
        )))?;
    Ok(ValidateCallbackResult::Valid)
}

pub fn validate_delete_link_task_to_tasks(
    _action: DeleteLink,
    _original_action: CreateLink,
    _base: AnyLinkableHash,
    _target: AnyLinkableHash,
    _tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}

pub fn validate_create_link_task_updates(
    _action: CreateLink,
    base_address: AnyLinkableHash,
    target_address: AnyLinkableHash,
    _tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
    // Check the entry type for the given action hash
    let action_hash = base_address
        .into_action_hash()
        .ok_or(wasm_error!(WasmErrorInner::Guest(
            "No action hash associated with link".to_string()
        )))?;
    let record = must_get_valid_record(action_hash)?;
    let _task: crate::Task = record
        .entry()
        .to_app_option()
        .map_err(|e| wasm_error!(e))?
        .ok_or(wasm_error!(WasmErrorInner::Guest(
            "Linked action must reference an entry".to_string()
        )))?;
    // Check the entry type for the given action hash
    let action_hash =
        target_address
            .into_action_hash()
            .ok_or(wasm_error!(WasmErrorInner::Guest(
                "No action hash associated with link".to_string()
            )))?;
    let record = must_get_valid_record(action_hash)?;
    let _task: crate::Task = record
        .entry()
        .to_app_option()
        .map_err(|e| wasm_error!(e))?
        .ok_or(wasm_error!(WasmErrorInner::Guest(
            "Linked action must reference an entry".to_string()
        )))?;
    // TODO: add the appropriate validation rules
    Ok(ValidateCallbackResult::Valid)
}

pub fn validate_delete_link_task_updates(
    _action: DeleteLink,
    _original_action: CreateLink,
    _base: AnyLinkableHash,
    _target: AnyLinkableHash,
    _tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Invalid(String::from(
        "TaskUpdates links cannot be deleted",
    )))
}
