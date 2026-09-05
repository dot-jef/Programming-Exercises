
const addButton = document.getElementById("addTaskButton");
const tasksList = document.getElementById("tasksList");
const taskModal = document.getElementById("taskModal");
const modalCancel = document.querySelectorAll(".cancel");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const form = document.getElementById("taskForm");
let isEdit = false;
const filter = document.getElementById("filter");
let filterStatus = filter.value;

function displayTask() {
    tasksList.innerHTML = "";
    switch(filterStatus) {
        case "all":
            tasks.forEach(task => {
                tasksList.insertAdjacentHTML("beforeend", `
                    <div data-id="${task.id}" class="tasks">
                        <h3 class="status">${task.status}</h3>
                        <h2 class="taskTitle">${task.title}</h2>
                        <p class="taskDescription">${task.description}</p>
                        ${task.status === "pending" ? `<button class="markDone">Mark as Done</button>`: ""}
                        ${task.status === "pending" ? `<button class="editTask">Edit</button>`: ""}
                        <button class="deleteBtn">Delete</button>
                    </div>`);
            });
            break;
        case "pending":
            tasks.filter(task => task.status === "pending").forEach(task => {
                tasksList.insertAdjacentHTML("beforeend", `
                    <div data-id="${task.id}" class="tasks">
                        <h3 class="status">${task.status}</h3>
                        <h2 class="taskTitle">${task.title}</h2>
                        <p class="taskDescription">${task.description}</p>
                        ${task.status === "pending" ? `<button class="markDone">Mark as Done</button>`: ""}
                        ${task.status === "pending" ? `<button class="editTask">Edit</button>`: ""}
                        <button class="deleteBtn">Delete</button>
                    </div>`);
            });
            break;
        case "completed":
            tasks.filter(task => task.status === "completed").forEach(task => {
                tasksList.insertAdjacentHTML("beforeend", `
                    <div data-id="${task.id}" class="tasks">
                        <h3 class="status">${task.status}</h3>
                        <h2 class="taskTitle">${task.title}</h2>
                        <p class="taskDescription">${task.description}</p>
                        ${task.status === "pending" ? `<button class="markDone">Mark as Done</button>`: ""}
                        ${task.status === "pending" ? `<button class="editTask">Edit</button>`: ""}
                        <button class="deleteBtn">Delete</button>
                    </div>`);
            });
            break;
    }
    
}


function openAddModal() {
    isEdit = false;
    form.reset();
    taskModal.querySelector("h1").textContent = "Add Task";
    taskModal.querySelector(".confirm").textContent = "Add";
    taskModal.removeAttribute("hidden");
}

function closeModal() {
    taskModal.setAttribute("hidden", "");
}


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const ObjectedFormData = Object.fromEntries(formData);
    if (isEdit) {
        if (ObjectedFormData.title || ObjectedFormData.description) {
            tasks = tasks.map(task => {
                if (task.id === Number(ObjectedFormData.id)) {
                    return {...task, id: Number(ObjectedFormData.id) , title: ObjectedFormData.title || "No Title", description: ObjectedFormData.description || "No Description"};
                }
                return task;
            });

        } else {
            alert("You must put a title or description");
            return;
        }
    } else {
        if (ObjectedFormData.title || ObjectedFormData.description) {
            ObjectedFormData.id = Date.now();
            !ObjectedFormData.title ? ObjectedFormData.title = "No Title" : "";
            !ObjectedFormData.description ? ObjectedFormData.description = "No Description" : "";
            tasks.push(ObjectedFormData);

        } else {
            alert("You must put a title or description");
            return;
        }
    }
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask();
    closeModal();
    form.reset();
});
addButton.addEventListener("click", () => openAddModal());
modalCancel.forEach((button) => {
    button.addEventListener("click", () => closeModal());
});
tasksList.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".deleteBtn");
    if (deleteBtn) {
        if (confirm("are you sure to delete this task?")) {

            const targetedTask = deleteBtn.closest(".tasks");
            const targetId = Number(targetedTask.dataset.id);

            tasks = tasks.filter(task => task.id != targetId);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTask();
        }
    }
    

    const markDoneBtn = event.target.closest(".markDone");
    if (markDoneBtn) {
        const targetedTask = markDoneBtn.closest(".tasks");
        const targetId = Number(targetedTask.dataset.id);

        tasks = tasks.map(task => {
            if (task.id === targetId) {
               return {...task, status: "completed"};
            }
            return task;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTask();
    }


    const editBtn = event.target.closest(".editTask");
    if (editBtn) {
        const targetedTask = editBtn.closest(".tasks");
        const targetId = Number(targetedTask.dataset.id);
        isEdit = true;

        taskModal.querySelector("h1").textContent = "Edit Task";
        taskModal.querySelector(".confirm").textContent = "Edit";
        const targetTask = tasks.find(task => task.id === targetId);
        Object.keys(targetTask).forEach(key => {
            const input = form.querySelector(`[name=${key}]`);
            if (input) {
                input.value = targetTask[key];
            }
        });
        taskModal.removeAttribute("hidden");
    }
});

filter.addEventListener("change", () => {
    filterStatus = filter.value;
    console.log(filterStatus);
    displayTask();
});

displayTask();