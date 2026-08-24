
const addButton = document.getElementById("addTaskButton");
const tasksList = document.getElementById("tasksList");
const toDoList = document.getElementById("toDoList");
const taskModal = document.getElementById("taskModal");
const modalCancel = document.getElementsByClassName("cancel");
const modalConfirm = document.getElementsByClassName("confirm");

function addTask() {
    taskModal.removeAttribute("hidden");
}

function closeModal() {
    taskModal.setAttribute("hidden", "");
}

function confirmModal() {
    closeModal();
}

addButton.addEventListener("click", () => addTask());
modalCancel.addEventListener("click", () => closeModal());
modalConfirm.add
