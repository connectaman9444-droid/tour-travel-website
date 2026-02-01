const title = document.getElementById('title');
const amount = document.getElementById('amount');
const type = document.getElementById('type');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
    list.innerHTML = "";
    let income = 0, expense = 0;

    transactions.forEach((tx, index) => {
        const li = document.createElement('li');
        li.className = "list-item";
        li.innerHTML = `
            ${tx.title} - ₹${tx.amount} 
            <button onclick="deleteTransaction(${index})">X</button>
        `;
        list.appendChild(li);

        if (tx.type === "income") income += tx.amount;
        else expense += tx.amount;
    });

    document.getElementById('income').innerText = income;
    document.getElementById('expense').innerText = expense;
    document.getElementById('balance').innerText = income - expense;

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
    if (title.value === "" || amount.value === "") {
        alert("Please fill all fields");
        return;
    }

    const transaction = {
        title: title.value,
        amount: Number(amount.value),
        type: type.value
    };

    transactions.push(transaction);
    updateUI();
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

addBtn.addEventListener("click", addTransaction);
updateUI();