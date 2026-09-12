
const addExpenseModal = document.querySelectorAll(".add-expense, .empty-action");
const addExpenseBtn = document.querySelector(".save-expense");
const modalForm = document.querySelector(".modal-form");
const modalBackdrop = document.querySelector(".modal-backdrop");
const closeModal = document.querySelectorAll(".close-modal, .cancel-button");
const expenseList = document.querySelector(".expense-list");
const emptyState = document.querySelector(".empty-state");
const balance = document.querySelector(".balance");
const currentMonth = new Date().getMonth() + 1;
let expenses = [
    {id: 1, name: "Fudgee Bar", category: "Food", amount: 16.75, date: "2026-09-09"},
    {id: 2, name: "Fudgee Bar", category: "Food", amount: 16.75, date: "2026-09-09"},
    {id: 3, name: "Fudgee Bar", category: "Food", amount: 16.75, date: "2026-09-09"},
    {id: 4, name: "Fudgee Bar", category: "Food", amount: 16.75, date: "2026-09-09"},
    {id: 5, name: "Fudgee Bar", category: "Food", amount: 16.75, date: "2026-09-09"},
    {id: 6, name: "Fudgee Bar", category: "Food", amount: 16.75, date: "2026-09-09"},
    {id: 7, name: "Fudgee Bar", category: "Food", amount: 16.75, date: "2026-09-09"}
];

function display() {
    balance.textContent = `${expenses.reduce((acc, cur) => {
        return acc + cur.amount;
    }, 0)}`
    if (expenses.length === 0) {
        emptyState.removeAttribute("hidden");
    } else {
        emptyState.setAttribute("hidden", "");
        expenses.forEach(expense => {
            expenseList.insertAdjacentHTML("beforeend", 
                `<tr><td><span><strong>${expense.name}</strong></span></td><td><span class="pill pill-food">${expense.category}</span></td><td>${expense.date}</td><td class="amount">₱${expense.amount}</td><td class="row-actions"><button class="edit-button" type="button">Edit</button><button class="delete-button" type="button">Delete</button></td></tr>`
            )
        })
    }
}



addExpenseModal.forEach(button => {
    button.addEventListener("click", () => {
        modalBackdrop.removeAttribute("hidden");
    });
});
// TODO: Make this an eventlistener for the actual form make it submit action
addExpenseBtn.addEventListener("click", () => {
    const formData = new FormData(modalForm);
    const newExpense = {
        id: date.now(),
        name: formData.get("name"),
        category: formData.get("category"),
        amount: formData.get("amount"),
        date: formData.get("date")
    };
    expenses.push(newExpense);
    display();
});


closeModal.forEach(button => {
    button.addEventListener("click", () => {
        modalBackdrop.setAttribute("hidden", "");
    });
});

display();
console.log(currentMonth);