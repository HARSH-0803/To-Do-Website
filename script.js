const addBtn = document.querySelector(".add-btn");
const modal = document.querySelector(".modal");
const saveBtn = document.getElementById("saveTask");
const list = document.querySelector(".task-list")

addBtn.addEventListener("click", () => {
    modal.classList.remove("hidden")
});

saveBtn.addEventListener("click", () => {

    const name = document.getElementById("taskNameInput").value;
    const time = document.getElementById("taskTime").value;
    const priority = document.getElementById("prioritySelect").value;

    const date = new Date().toDateString();
    const fullDate = time + " | " + date;

    const task = document.createElement("div");
    task.classList.add("task");

    task.innerHTML = `
    <input type = "checkbox">
    <span class = "taskName">${name}</span>
    <span class = "date">${fullDate}</span>
    <button class ="edit">🖊</button>
    <span class = "priority ${priority}"></span>
    `;

    list.appendChild(task);

    modal.classList.add("hidden");
});