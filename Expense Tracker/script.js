const addExpense = document.querySelectorAll(".add-expense, .empty-action");
const modalBackdrop = document.querySelector(".modal-backdrop");
const closeModal = document.querySelectorAll(".close-modal, .cancel-button");
const expenseList = document.querySelector(".expense-list");
const emptyState = document.querySelector(".empty-state");
const balance = document.querySelector(".balance");
const expenses = [
    {id: 1, description: "Fudgee Bar", category: "Food & Dining", amount: 16.75, date: "2026-09-09"},
    {id: 1, description: "Fudgee Bar", category: "Food & Dining", amount: 16.75, date: "2026-09-09"},
    {id: 1, description: "Fudgee Bar", category: "Food & Dining", amount: 16.75, date: "2026-09-09"},
    {id: 1, description: "Fudgee Bar", category: "Food & Dining", amount: 16.75, date: "2026-09-09"},
    {id: 1, description: "Fudgee Bar", category: "Food & Dining", amount: 16.75, date: "2026-09-09"},
    {id: 1, description: "Fudgee Bar", category: "Food & Dining", amount: 16.75, date: "2026-09-09"},
    {id: 1, description: "Fudgee Bar", category: "Food & Dining", amount: 16.75, date: "2026-09-09"}
];

function display() {
    balance.textContent = `${expenses.reduce((acc, cur) => {
        let total = acc + cur.amount;

        return total;
    }, 0)}`
    if (expenses.length === 0) {
        emptyState.removeAttribute("hidden");
    } else {
        emptyState.setAttribute("hidden", "");
        expenses.forEach(expense => {
            expenseList.insertAdjacentHTML("beforeend", 
                `<tr><td><span><strong>${expense.description}</strong></span></td><td><span class="pill pill-food">${expense.category}</span></td><td>${expense.date}</td><td class="amount">₱${expense.amount}</td><td class="row-actions"><button class="edit-button" type="button">Edit</button><button class="delete-button" type="button">Delete</button></td></tr>`
            )
        })
    }
}



addExpense.forEach(button => {
    button.addEventListener("click", () => {
        modalBackdrop.removeAttribute("hidden");
    });
});

closeModal.forEach(button => {
    button.addEventListener("click", () => {
        modalBackdrop.setAttribute("hidden", "");
    });
});

display();