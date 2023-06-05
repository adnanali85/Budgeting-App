const incomeInput = document.getElementById("income");
const addBudgetButton = document.getElementById("button1");
const expenseDescriptionInput = document.getElementById("text");
const expenseAmountInput = document.getElementById("amount");
const addExpenseButton = document.getElementById("button");
const expenseList = document.getElementById("list");
const balanceElement = document.getElementById("balance");

let budget = localStorage.getItem("budget") || 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateLocalStorage() {
  localStorage.setItem("budget", budget);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function calculateBalance() {
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const balance = budget - totalExpenses;
  balanceElement.textContent = `$${balance.toFixed(2)}`;
}

addBudgetButton.addEventListener("click", () => {
  const income = parseFloat(incomeInput.value);
  if (!isNaN(income) && income > 0) {
    budget = income;
    calculateBalance();
    updateLocalStorage();
  }
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateExpenseList();
  updateLocalStorage();
  calculateBalance();
}

function updateExpenseList() {
  expenseList.innerHTML = "";
  expenses.forEach((expense, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <b>${expense.description}</b><span><b>Rs${expense.amount.toFixed(
      2
    )}</b></span
      ><button class="delete-button" onclick="deleteExpense(${index})">x</button>
    `;
    expenseList.appendChild(listItem);
  });
}

addExpenseButton.addEventListener("click", () => {
  const description = expenseDescriptionInput.value;
  const amount = parseFloat(expenseAmountInput.value);
  if (!isNaN(amount) && amount > 0) {
    const expense = { description, amount };
    expenses.push(expense);
    updateExpenseList();
    updateLocalStorage();
    calculateBalance();
    expenseDescriptionInput.value = "";
    expenseAmountInput.value = "";
  }
});

window.addEventListener("load", () => {
  incomeInput.value = budget;
  updateExpenseList();
  calculateBalance();
});
