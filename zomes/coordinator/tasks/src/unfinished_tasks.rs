use hdk::prelude::*;
use tasks_integrity::*;

///Adding a task to unfinished (linking from the anchor unfinished_tasks)
pub fn add_to_unfinished(task_hash: &ActionHash) -> ExternResult<()> {
    let path = Path::from("unfinished_tasks");
    create_link(
        path.path_entry_hash()?,
        task_hash.clone(),
        LinkTypes::UnfinishedTasks,
        (),
    )?;
    Ok(())
}

///Remove a task from unfinished tasks (deleting link)
pub fn remove_from_unfinished(task_hash: &ActionHash) -> ExternResult<()> {
    let path = Path::from("unfinished_tasks");
    let links = get_links(
        GetLinksInputBuilder::try_new(path.path_entry_hash()?, LinkTypes::UnfinishedTasks)?.build(),
    )?;
    for link in links {
        if let Some(hash) = link.target.into_action_hash() {
            if hash.eq(task_hash) {
                delete_link(link.create_link_hash)?;
            }
        }
    }

    Ok(())
}

///Checkin if a task is finished
pub fn is_finished(task: &Task) -> bool {
    match task.status {
        TaskStatus::Cancelled | TaskStatus::Done => true,
        _ => false,
    }
}

///Get all unfinished tasks
#[hdk_extern]
pub fn get_unfinished_tasks() -> ExternResult<Vec<Link>> {
    let path = Path::from("unfinished_tasks");
    get_links(
        GetLinksInputBuilder::try_new(path.path_entry_hash()?, LinkTypes::UnfinishedTasks)?.build(),
    )
}
