const addBtn = document.querySelector(".add-btn");
const modal = document.querySelector(".modal");
const saveBtn = document.getElementById("saveTask");
const list = document.querySelector(".task-list");
const app = document.querySelector(".app");

addBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    app.classList.add("blur");
});

function formatTime(time) {
    let [hours, minute] = time.split(":");
    hours = parseInt(hours);

    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minute} ${ampm}`;
}



saveBtn.addEventListener("click", () => {

    const name = document.getElementById("taskNameInput").value;
    const priority = document.getElementById("prioritySelect").value;

    const date = new Date().toDateString();

    const rawTime = document.getElementById("taskTime").value;
    const time = formatTime(rawTime);
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

    const editBtn = task.querySelector(".edit");
    const taskText = task.querySelector(".taskName");

    editBtn.addEventListener("click", () => {
        const newTask = prompt("Edit your Task : ", taskText.innerText);

        if (newTask !== null && newTask.trim() !== "") {
            taskText.innerText = newTask;
        }
        if (name.trim() === "") {
            alert("Task name required!");
            return;
        }
    });
    app.classList.remove("blur");

    list.appendChild(task);

    modal.classList.add("hidden");
});




