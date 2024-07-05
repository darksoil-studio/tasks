use hdk::prelude::*;
use holochain::sweettest::*;

use tasks_integrity::*;



pub async fn sample_task_1(conductor: &SweetConductor, zome: &SweetZome) -> Task {
    Task {
	  name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.".to_string(),
	  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.".to_string(),
	  deadline: Some(1674053334548000),
      assignee: zome.cell_id().agent_pubkey().clone(),
          dependencies: vec![],
	  status: TaskStatus::Ready,
    }
}

pub async fn sample_task_2(conductor: &SweetConductor, zome: &SweetZome) -> Task {
    Task {
	  name: "Lorem ipsum 2".to_string(),
	  description: "Lorem ipsum 2".to_string(),
	  deadline: Some(1674059334548000),
          assignee: zome.cell_id().agent_pubkey().clone(),
          dependencies: vec![],
	  status: TaskStatus::Blocked
,
    }
}

pub async fn create_task(conductor: &SweetConductor, zome: &SweetZome, task: Task) -> Record {
    let record: Record = conductor
        .call(zome, "create_task", task)
        .await;
    record
}

