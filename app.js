const btnAddTask = document.getElementById("btn-add");
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

function storeData() {
  btnAddTask.onclick = function () {
    const task = {
      id: new Date().getTime().toString(),

      taskHeading: document.querySelector("#task-heading").value,
      task: document.querySelector("textarea").value,
    };
    taskList.push(task);
    renderTasks();
  };
}

document.addEventListener("DOMContentLoaded", function () {
  storeData();
  renderTasks();
});

function renderTasks() {
  ///storing to local...
  localStorage.setItem("tasks", JSON.stringify(taskList));
  const retrievedData = JSON.parse(localStorage.getItem("tasks"));
  document.querySelector(".tasks").innerHTML = retrievedData.map((task) => {
    return `

          <div   class="dded-task">
          <h3>${task.taskHeading}</h3>
          <p>${task.task}</p>
          <button>Edit</button>
           <button onclick="deleteTask(${task.id})" data-task-id=${task.id}>Delete</button>
        </div>
        `;
  });
}

function deleteTask(id) {
  const findTaskIndex = taskList.findIndex((task) => task.id === id);

  if (findTaskIndex !== -1) {
    taskList.splice(findTaskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }
}
