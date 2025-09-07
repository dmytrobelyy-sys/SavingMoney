let balance = 0;
let history = [];
let debtors = [];

function updateUI() {
  document.getElementById("balance").innerText = `Баланс: ${balance} ₴`;

  const historyList = document.getElementById("history");
  historyList.innerHTML = "";
  history.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });

  const debtorList = document.getElementById("debtors");
  debtorList.innerHTML = "";
  debtors.forEach(d => {
    let li = document.createElement("li");
    li.textContent = d;
    debtorList.appendChild(li);
  });

  saveData();
}

function addIncome() {
  let amount = prompt("Сума надходження (₴):");
  if (amount) {
    balance += Number(amount);
    history.push(`+${amount} ₴`);
    updateUI();
  }
}

function addDebt() {
  let amount = prompt("Сума боргу (₴):");
  if (amount) {
    balance -= Number(amount);
    history.push(`-${amount} ₴`);
    updateUI();
  }
}

function addDebtor() {
  let name = prompt("Ім’я боржника:");
  if (name) {
    debtors.push(name);
    updateUI();
  }
}

// ---- Збереження у LocalStorage ----
function saveData() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("history", JSON.stringify(history));
  localStorage.setItem("debtors", JSON.stringify(debtors));
}

function loadData() {
  balance = Number(localStorage.getItem("balance")) || 0;
  history = JSON.parse(localStorage.getItem("history")) || [];
  debtors = JSON.parse(localStorage.getItem("debtors")) || [];
  updateUI();
}

window.onload = loadData;

// ---- PWA service worker ----
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}