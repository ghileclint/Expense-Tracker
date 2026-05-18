// Create an object for each field
const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");
const filterCategory = document.getElementById("filter-category");

// Create Data structure to hold form value
let expenses = [];

// Create function to handle the form once submitted
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("expense-name").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const category = document.getElementById("expense-category").value;
  const date = document.getElementById("expense-date").value;

  //Validation

  if (!name || !amount || !category || !date) {
    alert("Please fill all fields");
    return;
  }

  const expense = {
    id: Date.now(),
    name,
    amount,
    category,
    date,
  };

  expenses.push(expense);
  displayExpenses(expenses);
  updateTotalAmount();

  expenseForm.reset();
});

expenseList.addEventListener("click", (e) => {

  // Delete
  if (e.target.classList.contains("delete-btn")) {
    const id = parseInt(e.target.dataset.id);
    expenses = expenses.filter((expense) => expense.id !== id);

    displayExpenses(expenses);
    updateTotalAmount();
  }

  // Edit
  if (e.target.classList.contains("edit-btn")) {
    const id = parseInt(e.target.dataset.id);

    const expense = expenses.find((expense) => expense.id === id);

    document.getElementById("expense-name").value = expense.name;
    document.getElementById("expense-amount").value = expense.amount;
    document.getElementById("expense-category").value = expense.category;
    document.getElementById("expense-date").value = expense.date;

    expenses = expenses.filter((expense) => expense.id !== id);

    displayExpenses(expenses);
    updateTotalAmount();
  }
});

filterCategory.addEventListener("change", (e) => {
  const category = e.target.value;

  if (category === "All") {
    displayExpenses(expenses);
  } else {
    const filteredExpenses = expenses.filter(
      (expense) => expense.category === category,
    );
    displayExpenses(filteredExpenses);
  }
});

function displayExpenses(expenses) {
  expenseList.innerHTML = "";

  expenses.forEach((expense) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${expense.name}</td>
        <td>${expense.amount.toFixed(2)}</td>
        <td>${expense.category}</td>
        <td>${expense.date}</td>
        <td> 
        <button class="edit-btn" data-id="${expense.id}">Edit</button>
        <button class="delete-btn" data-id="${expense.id}">Delete</button>
        </td>`;

    expenseList.appendChild(row);
  });
}

function updateTotalAmount() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalAmount.textContent = total.toFixed(2);
}
