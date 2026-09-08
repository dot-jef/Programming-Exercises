const addExpense = document.querySelector(".add-expense");
const modalBackdrop = document.querySelector(".modal-backdrop");
const closeModal = document.querySelectorAll(".close-modal, .cancel-button");

addExpense.addEventListener("click", () => {
    modalBackdrop.removeAttribute("hidden");
});


closeModal.forEach(button => {
    button.addEventListener("click", () => {
        modalBackdrop.setAttribute("hidden", "");
    });
});