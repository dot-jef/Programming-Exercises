
const addExpenseModal = document.querySelectorAll(".add-expense, .empty-action");
const modalForm = document.querySelector(".modal-form");
const modalBackdrop = document.querySelector(".modal-backdrop");
const closeModal = document.querySelectorAll(".close-modal, .cancel-button");
const expenseList = document.querySelector(".expense-list");
const emptyState = document.querySelector(".empty-state");
const balance = document.querySelector(".balance");
const expenseCount = document.querySelector(".expense-count");
const currentMonth = new Date().getMonth() + 1;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function display() {
    if (expenses.length === 0) {
        emptyState.removeAttribute("hidden");
        return;
    }

    balance.textContent = `${expenses.reduce((acc, cur) => {
        return Number(acc) + Number(cur.amount);
    }, 0)}`
    expenseCount.textContent = expenses.length;
    expenseList.innerHTML = '';
    
    emptyState.setAttribute("hidden", "");
    expenses.forEach(expense => {
        expenseList.insertAdjacentHTML("beforeend", 
            `<tr><td><span><strong>${expense.name}</strong></span></td><td><span class="pill pill-food">${expense.category}</span></td><td>${expense.date}</td><td class="amount">₱${expense.amount}</td><td class="row-actions"><button class="edit-button" type="button">Edit</button><button class="delete-button" type="button">Delete</button></td></tr>`
        )
    })
}



addExpenseModal.forEach(button => {
    button.addEventListener("click", () => {
        modalBackdrop.removeAttribute("hidden");
    });
});
// TODO: Make this an eventlistener for the actual form make it submit action
modalForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(modalForm);
    const newExpense = {
        id: Date.now(),
        name: formData.get("name"),
        category: formData.get("category"),
        amount: formData.get("amount"),
        date: formData.get("date")
    };
    expenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    modalForm.reset();
    modalBackdrop.setAttribute("hidden", "");
    display();
});


closeModal.forEach(button => {
    button.addEventListener("click", () => {
        modalBackdrop.setAttribute("hidden", "");
    });
});

display();
console.log(currentMonth);