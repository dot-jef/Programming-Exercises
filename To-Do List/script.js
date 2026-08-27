
const addButton = document.getElementById("addTaskButton");
const tasksList = document.getElementById("tasksList");
const toDoList = document.getElementById("toDoList");
const taskModal = document.getElementById("taskModal");
const modalCancel = document.querySelectorAll(".cancel");
let tasks = [
    {id: 1, title: "Bili sibuyas", description: "bumili ka ng sampung sibuyas bukas babayaran", status: "pending"},
    {id: 2, title: "No Title", description: "wala lang example lang bakit ba", status: "completed"}
];
const form = document.getElementById("taskForm");


function displayTask() {
    tasksList.innerHTML = "";
    tasks.forEach(task => {
        tasksList.insertAdjacentHTML("beforeend", `
            <div data-id="${task.id}" class="tasks">
                <h3 class="status">${task.status}</h3>
                <h2 class="taskTitle">${task.title}</h2>
                <p class="taskDescription">${task.description}</p>
                ${task.status === "pending" ? `<button class="markDone">Mark as Done</button>`: ""}
                <button class="editTask">Edit</button>
                <button class="deleteBtn">Delete</button>
            </div>`);
    });
}

function removeTask(id) {
    tasks.pop()
}
function openAddModal() {
    taskModal.removeAttribute("hidden");
}

function closeModal() {
    taskModal.setAttribute("hidden", "");
}


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const ObjectedFormData = Object.fromEntries(formData);

    if (ObjectedFormData.title || ObjectedFormData.description) {
        ObjectedFormData.id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
        !ObjectedFormData.title ? ObjectedFormData.title = "No Title" : "";
        !ObjectedFormData.description ? ObjectedFormData.description = "No Description" : "";
        tasks.push(ObjectedFormData);

        displayTask();
        closeModal();
        form.reset();
    } else {
        alert("You must put a title or description");
    }
});
addButton.addEventListener("click", () => openAddModal());
modalCancel.forEach((button) => {
    button.addEventListener("click", () => closeModal());
});
tasksList.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".deleteBtn");
    if (!deleteBtn) {return;}
    if (confirm("are you sure to delete this task?")) {

        const targetedTask = deleteBtn.closest(".tasks")
        const targetId = Number(targetedTask.dataset.id);

        tasks = tasks.filter(task => task.id != targetId);
        displayTask();
    }

});

displayTask();