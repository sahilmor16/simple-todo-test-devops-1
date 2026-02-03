const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.onclick = () => toggleTask(index);

        const del = document.createElement("span");
        del.textContent = "✖";
        del.className = "delete";
        del.onclick = () => deleteTask(index);

        li.appendChild(span);
        li.appendChild(del);
        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
