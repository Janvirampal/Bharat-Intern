let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category_select');
const amountInput = document.getElementById('amount_input');
const infoInput = document.getElementById('info');
const dateInput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    const category = categorySelect.value;
    const info = infoInput.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert("Please select a category");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }
    if (info === '') {
        alert("Please enter valid info");
        return;
    }
    if (date === '') {
        alert("Please select a date");
        return;
    }

    const expense = { category, amount, info, date };
    expenses.push(expense);

    // Update total amount based on category
    if (category === 'Income') {
        totalAmount += amount;
    } else if (category === 'Expense') {
        totalAmount -= amount;
    }
    totalAmountCell.textContent = totalAmount.toFixed(2);

    // Create new row in the table
    const newRow = expenseTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount.toFixed(2);
    infoCell.textContent = expense.info;
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        // Remove the expense from the array
        expenses.splice(expenses.indexOf(expense), 1);

        // Update total amount based on category
        if (category === 'Income') {
            totalAmount -= amount;
        } else if (category === 'Expense') {
            totalAmount += amount;
        }
        totalAmountCell.textContent = totalAmount.toFixed(2);

        // Remove the row from the table
        expenseTableBody.removeChild(newRow);
    });

    deleteCell.appendChild(deleteBtn);
});

// Initialize the table with existing expenses (if any)
function initializeTable() {
    expenses.forEach(expense => {
        const newRow = expenseTableBody.insertRow();

        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const infoCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount.toFixed(2);
        infoCell.textContent = expense.info;
        dateCell.textContent = expense.date;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            // Remove the expense from the array
            expenses.splice(expenses.indexOf(expense), 1);

            // Update total amount based on category
            if (expense.category === 'Income') {
                totalAmount -= expense.amount;
            } else if (expense.category === 'Expense') {
                totalAmount += expense.amount;
            }
            totalAmountCell.textContent = totalAmount.toFixed(2);

            // Remove the row from the table
            expenseTableBody.removeChild(newRow);
        });

        deleteCell.appendChild(deleteBtn);
    });
}

// Call initializeTable if you have pre-existing expenses (for example, from localStorage)
initializeTable();
