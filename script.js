const addBtn = document.querySelector(".add-btn");
const modal = document.querySelector(".modal");
const saveBtn = document.getElementById("saveTask");
const list = document.querySelector(".task-list");
const app = document.querySelector(".app");

addBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

function formatTime(time) {
    let [hours, minute] = time.split(":");
    hours = parseInt(hours);
    
    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;   //.

    return `${hours}:${minute} ${ampm}`;
}



saveBtn.addEventListener("click", () => {

    const name = document.getElementById("taskNameInput").value;
    if (name.trim() === "") {
        alert("Task name required!");
        return;
    }

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

    let checkbox = task.querySelector("input");
    checkbox.addEventListener("change", () => {
        task.classList.toggle("completed-task");
    })


    const editBtn = task.querySelector(".edit");
    const taskText = task.querySelector(".taskName");

    editBtn.addEventListener("click", () => {
        const newTask = prompt("Edit your Task : ", taskText.innerText);

        if (newTask !== null && newTask.trim() !== "") {
            taskText.innerText = newTask;
        }
    });
    
    list.appendChild(task);

    modal.classList.add("hidden");

    document.getElementById("taskNameInput").value ="";
    document.getElementById("taskTime").value ="";
    document.getElementById("prioritySelect").value = "low";


});
const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active-btn"));
        tab.classList.add("active-btn");

        const filter = tab.dataset.filter;
        const tasks = document.querySelectorAll(".task");

        tasks.forEach(task => {

            if (filter === "all") {
                task.style.display = "flex";
            }

            else if (filter === "pending") {
                if (!task.classList.contains("completed-task")) {
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }
            }

            else if (filter === "completed") {
                if (task.classList.contains("completed-task")) {
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }
            }

        });
    });
});

const downloadBtn = document.getElementById("downloadPDF");

downloadBtn.addEventListener("click", () => {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const tasks = document.querySelectorAll(".task");

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("My Task List", 10, 10);

    let y = 20;

    tasks.forEach((task, index) => {

        const name = task.querySelector(".taskName").innerText;
        const date = task.querySelector(".date").innerText;

        const priorityEl = task.querySelector(".priority");

        let priority = "Low";

        if (priorityEl.classList.contains("high")) priority = "High";
        else if (priorityEl.classList.contains("medium")) priority = "Medium";
        else if (priorityEl.classList.contains("low")) priority = "Low";

        const status = task.classList.contains("completed-task")
            ? "Completed"
            : "Pending";

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        const text = `${index + 1}. ${name}`;
        const subText = `Time: ${date} | Priority: ${priority} | Status: ${status}`;

        doc.text(text, 10, y);
        y += 6;

        doc.text(subText, 12, y);
        y += 10;
    });

    doc.save("MyTasks.pdf");
});


