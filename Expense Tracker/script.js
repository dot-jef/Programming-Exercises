
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
let isEdit = false;

function display() {
    expenseList.innerHTML = '';
    expenseCount.textContent = expenses.length;
    balance.textContent = `${expenses.reduce((acc, cur) => {
        return Number(acc) + Number(cur.amount);
    }, 0)}`

    if (expenses.length === 0) {
        emptyState.removeAttribute("hidden");
        return;
    }

    emptyState.setAttribute("hidden", "");
    expenses.forEach(expense => {
        expenseList.insertAdjacentHTML("beforeend", 
            `<tr class="expense" data-id="${expense.id}">
                <td><span><strong>${expense.name}</strong></span></td>
                <td><span class="pill pill-food">${expense.category}</span></td>
                <td>${expense.date}</td>
                <td class="amount">₱${expense.amount}</td>
                <td class="row-actions">
                    <button class="edit-button" type="button">Edit</button>
                    <button class="delete-button" type="button">Delete</button>
                </td>
            </tr>`
        )
    })
}



addExpenseModal.forEach(button => {
    button.addEventListener("click", () => {
        modalBackdrop.removeAttribute("hidden");
    });
});

modalForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(modalForm);

    if (isEdit) {
        expenses = expenses.map(expense => {
            if (expense.id === Number(formData.get("id"))) {
                return {...expense, id: Number(formData.get("id")), name: formData.get("name"), category: formData.get("category"), amount: formData.get("amount"), date: formData.get("date")}
            }
            return expense;
        });
        isEdit = false;
    } else {
        const newExpense = {
            id: Date.now(),
            name: formData.get("name"),
            category: formData.get("category"),
            amount: formData.get("amount"),
            date: formData.get("date")
        };
        expenses.push(newExpense);
    }
    
    localStorage.setItem("expenses", JSON.stringify(expenses));
    modalForm.reset();
    modalBackdrop.setAttribute("hidden", "");
    display();
});


expenseList.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".delete-button");
    if (deleteBtn) {
        const targetExpense = deleteBtn.closest(".expense");
        if (confirm("are you sure to delete?")) {
            expenses = expenses.filter(expense => expense.id != targetExpense.dataset.id);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            display();
        }
    }

    const editBtn = event.target.closest(".edit-button");
    if (editBtn) {
        const targetedExpense = editBtn.closest(".expense");
        const targetExpense = expenses.find(expense => expense.id === Number(targetedExpense.dataset.id));
        isEdit = true;
        console.log(targetExpense.id);
        modalForm.elements["id"].value = targetExpense.id;
        modalForm.elements["name"].value = targetExpense.name;
        modalForm.elements["amount"].value = targetExpense.amount;
        modalForm.elements["category"].value = targetExpense.category;
        modalForm.elements["date"].value = targetExpense.date;
        modalBackdrop.removeAttribute("hidden");

    }
});

closeModal.forEach(button => {
    button.addEventListener("click", () => {
        modalForm.reset();
        modalBackdrop.setAttribute("hidden", "");
    });
});

display();
console.log(currentMonth);