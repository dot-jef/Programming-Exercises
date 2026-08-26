
const addButton = document.getElementById("addTaskButton");
const tasksList = document.getElementById("tasksList");
const toDoList = document.getElementById("toDoList");
const taskModal = document.getElementById("taskModal");
const modalCancel = document.querySelectorAll(".cancel");
const tasks = [
    {title: "Bili sibuyas", description: "bumili ka ng sampung sibuyas bukas babayaran", status: "pending"},
    {title: "No Title", description: "wala lang example lang bakit ba", status: "completed"}
];

const form = document.getElementById("taskForm");

function displayTask() {
    tasksList.innerHTML = "";
    tasks.forEach(task => {
        tasksList.insertAdjacentHTML("beforeend", `
            <div class="tasks">
                <h3 class="status">${task.status}</h3>
                <h2 class="taskTitle">${task.title}</h2>
                <p class="taskDescription">${task.description}</p>
                ${task.status === "pending" ? `<button class="markDone">Mark as Done</button>`: ""}
                <button class="editTask">Edit</button>
                <button class="deleteTask">Delete</button>
            </div>`);
    });
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
        tasks.push(Object.fromEntries(formData));

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


displayTask();