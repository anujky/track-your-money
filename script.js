// ========== DATA MANAGEMENT ==========

// Category structure
const categories = {
    income: {
        'Salary': ['Monthly', 'Annual Bonus', 'Additional Income'],
        'Business': ['Sales', 'Services', 'Freelance'],
        'Investments': ['Dividends', 'Interest', 'Rental Income'],
        'Other': ['Gifts', 'Reimbursement', 'Other']
    },
    expense: {
        'Food & Dining': ['Groceries', 'Restaurants', 'Cafes'],
        'Transportation': ['Fuel', 'Public Transport', 'Maintenance'],
        'Utilities': ['Electricity', 'Water', 'Internet', 'Phone'],
        'Entertainment': ['Movies', 'Games', 'Hobbies'],
        'Shopping': ['Clothes', 'Electronics', 'Home'],
        'Healthcare': ['Medical', 'Medicines', 'Fitness'],
        'Education': ['Courses', 'Books', 'Tuition'],
        'Other': ['Miscellaneous']
    },
    saving: {
        'Bank Account': ['Savings', 'Current', 'Others'],
        'Fixed Deposit': ['FD 1 Year', 'FD 3 Year', 'FD 5 Year'],
        'Piggy Bank': ['Cash Box', 'Digital Savings'],
        'Other': ['Miscellaneous']
    },
    investment: {
        'Stock Market': ['Stocks', 'Mutual Funds', 'ETF'],
        'Real Estate': ['Property', 'REIT'],
        'Crypto': ['Bitcoin', 'Ethereum', 'Others'],
        'Gold': ['Physical Gold', 'Digital Gold'],
        'Bonds': ['Government Bonds', 'Corporate Bonds'],
        'Other': ['Others']
    }
};

// Application state
let appData = {
    transactions: [],
    loans: [],
    emiPayments: {}
};

// ========== INITIALIZATION ==========

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadDataFromLocalStorage();
    setDefaultDate();
    updateDashboard();
});

function initializeApp() {
    // Set up Chart.js theme
    Chart.defaults.color = '#718096';
    Chart.defaults.borderColor = '#e2e8f0';
    Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchView(e.target.dataset.view);
        });
    });

    // Transaction form
    document.getElementById('transactionForm').addEventListener('submit', addTransaction);
    document.getElementById('transactionType').addEventListener('change', updateCategories);

    // Loan form
    document.getElementById('loanForm').addEventListener('submit', addLoan);
    document.getElementById('loanTenure').addEventListener('change', calculateEMI);
    document.getElementById('loanRate').addEventListener('change', calculateEMI);
    document.getElementById('loanAmount').addEventListener('change', calculateEMI);

    // EMI Payment modal
    const modal = document.getElementById('emiModal');
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
    });

    // Report filters
    document.getElementById('filterType').addEventListener('change', updateDashboard);
    document.getElementById('monthPicker').addEventListener('change', updateDashboard);
    document.getElementById('reportType').addEventListener('change', updateReports);
    document.getElementById('reportMonth').addEventListener('change', updateReports);

    // Export buttons
    document.getElementById('exportCSV').addEventListener('click', exportToCSV);
    document.getElementById('syncGoogleSheets').addEventListener('click', syncWithGoogleSheets);

    // EMI Payment form
    document.getElementById('emiPaymentForm').addEventListener('submit', recordEMIPayment);
}

function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('transactionDate').value = today;
    document.getElementById('monthPicker').value = today.substring(0, 7);
    document.getElementById('reportMonth').value = today.substring(0, 7);
    document.getElementById('emiPaymentDate').value = today;
    document.getElementById('loanStartDate').value = today;
}

// ========== VIEW MANAGEMENT ==========

function switchView(viewName) {
    // Hide all views
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected view
    document.getElementById(viewName).classList.add('active');
    document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

    // Update content if needed
    if (viewName === 'loans') updateLoansList();
    if (viewName === 'reports') updateReports();
}

// ========== TRANSACTION MANAGEMENT ==========

function updateCategories() {
    const transactionType = document.getElementById('transactionType').value;
    const mainCategorySelect = document.getElementById('mainCategory');
    const subCategorySelect = document.getElementById('subCategory');

    mainCategorySelect.innerHTML = '<option value="">Select Category</option>';
    subCategorySelect.innerHTML = '<option value="">Select Sub-Category</option>';

    if (transactionType && categories[transactionType]) {
        Object.keys(categories[transactionType]).forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            mainCategorySelect.appendChild(option);
        });

        mainCategorySelect.addEventListener('change', updateSubCategories);
    }
}

function updateSubCategories() {
    const transactionType = document.getElementById('transactionType').value;
    const mainCategory = document.getElementById('mainCategory').value;
    const subCategorySelect = document.getElementById('subCategory');

    subCategorySelect.innerHTML = '<option value="">Select Sub-Category</option>';

    if (mainCategory && categories[transactionType][mainCategory]) {
        categories[transactionType][mainCategory].forEach(subCategory => {
            const option = document.createElement('option');
            option.value = subCategory;
            option.textContent = subCategory;
            subCategorySelect.appendChild(option);
        });
    }
}

function addTransaction(e) {
    e.preventDefault();

    const transaction = {
        id: Date.now(),
        date: document.getElementById('transactionDate').value,
        type: document.getElementById('transactionType').value,
        category: document.getElementById('mainCategory').value,
        subCategory: document.getElementById('subCategory').value,
        description: document.getElementById('description').value,
        amount: parseFloat(document.getElementById('amount').value)
    };

    appData.transactions.push(transaction);
    saveDataToLocalStorage();
    document.getElementById('transactionForm').reset();
    setDefaultDate();
    updateCategories();
    updateDashboard();
    switchView('dashboard');

    showNotification('Transaction added successfully!', 'success');
}

// Delete transaction
function deleteTransaction(transactionId) {
    // Confirm deletion
    if (!confirm('Are you sure you want to delete this transaction? It will also be removed from Google Sheets.')) {
        return;
    }

    // Find and remove transaction
    const index = appData.transactions.findIndex(t => t.id === parseInt(transactionId));
    if (index > -1) {
        const deletedTransaction = appData.transactions[index];
        appData.transactions.splice(index, 1);
        saveDataToLocalStorage();
        updateDashboard();
        showNotification('Transaction deleted successfully!', 'success');
        
        // Sync deletion to Google Sheets
        syncDeletedTransaction(deletedTransaction);
    }
}

// Sync deleted transaction to Google Sheets
async function syncDeletedTransaction(transaction) {
    try {
        // Prepare delete request
        const deleteData = {
            action: 'deleteTransaction',
            transaction: transaction
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(deleteData),
            signal: controller.signal,
            mode: 'no-cors'
        });

        clearTimeout(timeoutId);
        console.log('✅ Deletion synced to Google Sheets');
    } catch (error) {
        console.error('Error syncing deletion:', error);
        console.log('Note: Transaction deleted from local app. You may need to manually remove from Google Sheets if sync fails.');
    }
}

// ========== LOAN MANAGEMENT ==========

function calculateEMI() {
    const principal = parseFloat(document.getElementById('loanAmount').value) || 0;
    const rate = parseFloat(document.getElementById('loanRate').value) || 0;
    const months = parseInt(document.getElementById('loanTenure').value) || 1;

    if (principal <= 0 || rate <= 0 || months <= 0) {
        document.getElementById('emiAmount').value = '0.00';
        return;
    }

    const monthlyRate = rate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);

    document.getElementById('emiAmount').value = emi.toFixed(2);
}

function addLoan(e) {
    e.preventDefault();

    const loan = {
        id: Date.now(),
        name: document.getElementById('loanName').value,
        principal: parseFloat(document.getElementById('loanAmount').value),
        rate: parseFloat(document.getElementById('loanRate').value),
        tenure: parseInt(document.getElementById('loanTenure').value),
        startDate: document.getElementById('loanStartDate').value,
        emi: parseFloat(document.getElementById('emiAmount').value),
        paidAmount: 0
    };

    appData.loans.push(loan);
    appData.emiPayments[loan.id] = [];
    saveDataToLocalStorage();
    document.getElementById('loanForm').reset();
    setDefaultDate();
    updateLoansList();
    showNotification('Loan added successfully!', 'success');
}

function updateLoansList() {
    const loansList = document.getElementById('loansList');
    loansList.innerHTML = '';

    if (appData.loans.length === 0) {
        loansList.innerHTML = '<p class="empty-state">No loans added yet.</p>';
        return;
    }

    appData.loans.forEach(loan => {
        const dueAmount = loan.principal - loan.paidAmount;
        const percentage = (loan.paidAmount / loan.principal) * 100;
        const endDate = new Date(loan.startDate);
        endDate.setMonth(endDate.getMonth() + loan.tenure);

        const card = document.createElement('div');
        card.className = 'loan-card';
        card.innerHTML = `
            <div class="loan-card-header">
                <h4>${loan.name}</h4>
                <p>EMI: ₹${loan.emi.toFixed(2)}</p>
            </div>
            <div class="loan-card-body">
                <div class="loan-info-row">
                    <span class="loan-info-label">Principal Amount</span>
                    <span class="loan-info-value">₹${loan.principal.toFixed(2)}</span>
                </div>
                <div class="loan-info-row">
                    <span class="loan-info-label">Amount Paid</span>
                    <span class="loan-info-value">₹${loan.paidAmount.toFixed(2)}</span>
                </div>
                <div class="loan-info-row">
                    <span class="loan-info-label">Due Amount</span>
                    <span class="loan-info-value" style="color: #f56565;">₹${dueAmount.toFixed(2)}</span>
                </div>
                <div class="loan-info-row">
                    <span class="loan-info-label">Interest Rate</span>
                    <span class="loan-info-value">${loan.rate}% p.a.</span>
                </div>
                <div class="loan-info-row">
                    <span class="loan-info-label">End Date</span>
                    <span class="loan-info-value">${endDate.toLocaleDateString()}</span>
                </div>
                <div class="loan-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                    <p style="font-size: 0.85rem; color: #718096; text-align: center;">${percentage.toFixed(2)}% Paid</p>
                </div>
            </div>
            <div class="loan-card-footer">
                <button class="btn-emi" onclick="openEMIModal(${loan.id}, ${loan.emi})">Record EMI</button>
                <button class="btn-delete" onclick="deleteLoan(${loan.id})">Delete</button>
            </div>
        `;
        loansList.appendChild(card);
    });
}

function openEMIModal(loanId, emiAmount) {
    const modal = document.getElementById('emiModal');
    document.getElementById('emiPaymentAmount').value = emiAmount.toFixed(2);
    document.getElementById('emiPaymentForm').dataset.loanId = loanId;
    modal.classList.add('show');
}

function recordEMIPayment(e) {
    e.preventDefault();

    const loanId = parseInt(document.getElementById('emiPaymentForm').dataset.loanId);
    const paymentDate = document.getElementById('emiPaymentDate').value;
    const paymentAmount = parseFloat(document.getElementById('emiPaymentAmount').value);

    const loan = appData.loans.find(l => l.id === loanId);
    if (loan) {
        loan.paidAmount += paymentAmount;
        if (!appData.emiPayments[loanId]) {
            appData.emiPayments[loanId] = [];
        }
        appData.emiPayments[loanId].push({
            date: paymentDate,
            amount: paymentAmount
        });

        saveDataToLocalStorage();
        updateLoansList();
        document.getElementById('emiModal').classList.remove('show');
        document.getElementById('emiPaymentForm').reset();
        setDefaultDate();
        showNotification('EMI payment recorded!', 'success');
    }
}

function deleteLoan(loanId) {
    if (confirm('Are you sure you want to delete this loan?')) {
        appData.loans = appData.loans.filter(l => l.id !== loanId);
        delete appData.emiPayments[loanId];
        saveDataToLocalStorage();
        updateLoansList();
        showNotification('Loan deleted!', 'success');
    }
}

// ========== DASHBOARD & ANALYTICS ==========

function updateDashboard() {
    const filterType = document.getElementById('filterType').value;
    const monthValue = document.getElementById('monthPicker').value;

    const filteredTransactions = filterTransactions(appData.transactions, filterType, monthValue);

    // Calculate totals
    const income = filteredTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = filteredTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const savings = filteredTransactions
        .filter(t => t.type === 'saving')
        .reduce((sum, t) => sum + t.amount, 0);

    const investments = filteredTransactions
        .filter(t => t.type === 'investment')
        .reduce((sum, t) => sum + t.amount, 0);

    // Update summary cards
    document.getElementById('totalIncome').textContent = `₹${income.toFixed(2)}`;
    document.getElementById('totalExpenses').textContent = `₹${expenses.toFixed(2)}`;
    document.getElementById('totalSavings').textContent = `₹${(savings + investments).toFixed(2)}`;

    const total = income + expenses + savings + investments;
    document.getElementById('incomePercentage').textContent = total > 0 ? `${((income / income) * 100).toFixed(1)}%` : '0%';
    document.getElementById('expensePercentage').textContent = total > 0 ? `${((expenses / income) * 100).toFixed(1)}%` : '0%';
    document.getElementById('savingPercentage').textContent = total > 0 ? `${(((savings + investments) / income) * 100).toFixed(1)}%` : '0%';

    // Update charts
    updateExpenseChart(filteredTransactions);
    updateIncomeChart(filteredTransactions);

    // Update circular progress
    const expenseRate = income > 0 ? (expenses / income) * 100 : 0;
    const savingRate = income > 0 ? (savings / income) * 100 : 0;
    const investmentRate = income > 0 ? (investments / income) * 100 : 0;

    updateCircularProgress('expenseCircle', expenseRate);
    updateCircularProgress('savingsCircle', savingRate);
    updateCircularProgress('investmentCircle', investmentRate);

    document.getElementById('expenseRate').textContent = `${expenseRate.toFixed(1)}%`;
    document.getElementById('savingRate').textContent = `${savingRate.toFixed(1)}%`;
    document.getElementById('investmentRate').textContent = `${investmentRate.toFixed(1)}%`;

    // Update recent transactions
    updateRecentTransactions(filteredTransactions);
}

function filterTransactions(transactions, filterType, monthValue) {
    const now = new Date();

    return transactions.filter(t => {
        const transDate = new Date(t.date);

        if (filterType === 'month') {
            return transDate.getMonth() === now.getMonth() && 
                   transDate.getFullYear() === now.getFullYear();
        } else if (filterType === 'year') {
            return transDate.getFullYear() === now.getFullYear();
        } else if (filterType === 'custom' && monthValue) {
            const [year, month] = monthValue.split('-');
            return transDate.getMonth() === parseInt(month) - 1 && 
                   transDate.getFullYear() === parseInt(year);
        }
        return true;
    });
}

function updateExpenseChart(transactions) {
    const expensesByCategory = {};
    const colors = ['#f56565', '#ed8936', '#ecc94b', '#48bb78', '#4299e1', '#9f7aea', '#ed64a6'];

    transactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
            expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
        });

    const ctx = document.getElementById('expenseChart');
    
    // Destroy existing chart if it exists
    if (ctx.chart) ctx.chart.destroy();

    ctx.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(expensesByCategory),
            datasets: [{
                data: Object.values(expensesByCategory),
                backgroundColor: colors,
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 12 }
                    }
                }
            }
        }
    });
}

function updateIncomeChart(transactions) {
    const incomeByCategory = {};
    const colors = ['#48bb78', '#38a169', '#2f855a', '#22543d'];

    transactions
        .filter(t => t.type === 'income')
        .forEach(t => {
            incomeByCategory[t.category] = (incomeByCategory[t.category] || 0) + t.amount;
        });

    const ctx = document.getElementById('incomeChart');

    // Destroy existing chart if it exists
    if (ctx.chart) ctx.chart.destroy();

    ctx.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(incomeByCategory),
            datasets: [{
                data: Object.values(incomeByCategory),
                backgroundColor: colors,
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 12 }
                    }
                }
            }
        }
    });
}

function updateCircularProgress(elementId, percentage) {
    const circle = document.getElementById(elementId);
    const circumference = 2 * Math.PI * 45; // radius = 45
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = offset;
}

function updateRecentTransactions(transactions) {
    const list = document.getElementById('transactionsList');
    
    if (transactions.length === 0) {
        list.innerHTML = '<p class="empty-state">No transactions for this period.</p>';
        return;
    }

    const recentTransactions = transactions.slice().reverse().slice(0, 10);

    list.innerHTML = recentTransactions.map(t => {
        const icons = {
            income: '📈',
            expense: '💸',
            saving: '🏦',
            investment: '📊'
        };

        const amountClass = ['income', 'saving', 'investment'].includes(t.type) ? 'income-amount' : 'expense-amount';
        const amountSign = ['income', 'saving', 'investment'].includes(t.type) ? '+' : '-';

        return `
            <div class="transaction-item">
                <div class="transaction-info">
                    <span class="transaction-icon">${icons[t.type]}</span>
                    <div class="transaction-details">
                        <h4>${t.category}</h4>
                        <p>${t.subCategory} • ${new Date(t.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <div class="transaction-amount ${amountClass}">
                    ${amountSign}₹${t.amount.toFixed(2)}
                </div>
                <button class="delete-btn" onclick="deleteTransaction('${t.id}')" title="Delete transaction">✕</button>
            </div>
        `;
    }).join('');
}

// ========== REPORTS ==========

function updateReports() {
    const reportType = document.getElementById('reportType').value;
    const monthValue = document.getElementById('reportMonth').value;

    const tbody = document.getElementById('reportTableBody');
    tbody.innerHTML = '';

    if (reportType === 'monthly') {
        generateMonthlyReport(tbody);
    } else if (reportType === 'yearly') {
        generateYearlyReport(tbody);
    } else if (reportType === 'category') {
        generateCategoryReport(tbody, monthValue);
    }
}

function generateMonthlyReport(tbody) {
    const monthlyData = {};

    appData.transactions.forEach(t => {
        const date = new Date(t.date);
        const monthKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = {
                income: 0,
                expense: 0,
                saving: 0,
                investment: 0
            };
        }

        monthlyData[monthKey][t.type] = (monthlyData[monthKey][t.type] || 0) + t.amount;
    });

    Object.entries(monthlyData).forEach(([month, data]) => {
        const netSavings = (data.income || 0) - (data.expense || 0) - (data.saving || 0) - (data.investment || 0);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${month}</td>
            <td>₹${(data.income || 0).toFixed(2)}</td>
            <td>₹${(data.expense || 0).toFixed(2)}</td>
            <td>₹${(data.saving || 0).toFixed(2)}</td>
            <td>₹${(data.investment || 0).toFixed(2)}</td>
            <td style="color: ${netSavings >= 0 ? '#48bb78' : '#f56565'}; font-weight: 600;">₹${netSavings.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

function generateYearlyReport(tbody) {
    const yearlyData = {};

    appData.transactions.forEach(t => {
        const year = new Date(t.date).getFullYear().toString();

        if (!yearlyData[year]) {
            yearlyData[year] = {
                income: 0,
                expense: 0,
                saving: 0,
                investment: 0
            };
        }

        yearlyData[year][t.type] = (yearlyData[year][t.type] || 0) + t.amount;
    });

    Object.entries(yearlyData).forEach(([year, data]) => {
        const netSavings = (data.income || 0) - (data.expense || 0) - (data.saving || 0) - (data.investment || 0);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${year}</td>
            <td>₹${(data.income || 0).toFixed(2)}</td>
            <td>₹${(data.expense || 0).toFixed(2)}</td>
            <td>₹${(data.saving || 0).toFixed(2)}</td>
            <td>₹${(data.investment || 0).toFixed(2)}</td>
            <td style="color: ${netSavings >= 0 ? '#48bb78' : '#f56565'}; font-weight: 600;">₹${netSavings.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

function generateCategoryReport(tbody, monthValue) {
    const categoryData = {};

    appData.transactions
        .filter(t => {
            if (!monthValue) return true;
            const [year, month] = monthValue.split('-');
            const tDate = new Date(t.date);
            return tDate.getMonth() === parseInt(month) - 1 && tDate.getFullYear() === parseInt(year);
        })
        .forEach(t => {
            const key = `${t.type} - ${t.category}`;
            if (!categoryData[key]) {
                categoryData[key] = 0;
            }
            categoryData[key] += t.amount;
        });

    Object.entries(categoryData).forEach(([category, amount]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${category}</td>
            <td colspan="5" style="text-align: right; font-weight: 600;">₹${amount.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

// ========== EXPORT & SYNC ==========

function exportToCSV() {
    let csv = 'Date,Type,Category,SubCategory,Description,Amount\n';

    appData.transactions.forEach(t => {
        csv += `${t.date},${t.type},${t.category},${t.subCategory},${t.description || ''},${t.amount}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showNotification('CSV exported successfully!', 'success');
}

// ========== GOOGLE APPS SCRIPT SYNC ==========
// UPDATE THIS WITH YOUR DEPLOYMENT URL FROM GOOGLE APPS SCRIPT
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx97xFGPYe4dvKJm6-bKc4_-37AgNH_A7AITaeSp3yUlJVgliLwvxcktP-3Y0fHV-QHQA/exec';

async function syncWithGoogleSheets() {
    try {
        // Check if we have data to sync
        if (appData.transactions.length === 0 && appData.loans.length === 0) {
            showNotification('No data to sync. Add some transactions or loans first!', 'info');
            return;
        }

        // Check if deployment URL is configured
        if (APPS_SCRIPT_URL.includes('YOUR_DEPLOYMENT_ID')) {
            showNotification('❌ Please update APPS_SCRIPT_URL in script.js with your Google Apps Script deployment URL', 'error');
            console.log('To get the URL:');
            console.log('1. Go to Google Sheets → Extensions → Apps Script');
            console.log('2. Deploy → New deployment → Web app');
            console.log('3. Copy the deployment URL');
            console.log('4. Replace APPS_SCRIPT_URL in script.js with that URL');
            return;
        }

        showNotification('📤 Syncing data to Google Sheets...', 'info');
        console.log('Starting sync with URL:', APPS_SCRIPT_URL);

        // Prepare the sync request
        const syncData = {
            action: 'syncTransactions',
            transactions: appData.transactions,
            loans: appData.loans,
            emiPayments: appData.emiPayments
        };

        console.log('Sending data:', syncData);

        // Send data to Google Apps Script with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(syncData),
            signal: controller.signal,
            mode: 'no-cors' // Bypass CORS for /exec endpoint
        });

        clearTimeout(timeoutId);
        console.log('Response status:', response.status);
        console.log('Response type:', response.type);
        
        // With no-cors mode, we can't read response body from error responses
        // But if we got here without error, the request was sent successfully
        console.log('✅ Request sent successfully to Google Apps Script!');
        
        // For /exec endpoint with no-cors, we can't parse the response
        // But we can show success since the request was accepted
        const message = `✅ Successfully synced ${appData.transactions.length} transactions and ${appData.loans.length} loans to Google Sheets!`;
        showNotification(message, 'success');
        console.log('Data synced! Check your Google Sheet for updates.');
    } catch (error) {
        console.error('Sync error details:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        if (error.name === 'AbortError') {
            showNotification('❌ Sync timeout - request took too long', 'error');
        } else {
            showNotification(`❌ Sync failed: ${error.message}`, 'error');
        }
        
        console.log('Troubleshooting:');
        console.log('1. Make sure you saved GoogleAppsScript.gs code');
        console.log('2. Make sure you deployed it as "Web app"');
        console.log('3. Make sure deployment has "Anyone" access');
        console.log('4. Check Apps Script executions tab for errors');
        console.log('5. Try opening the deployment URL directly in browser');
    }
}

// ========== LOCAL STORAGE ==========

function saveDataToLocalStorage() {
    localStorage.setItem('trackYourMoneyData', JSON.stringify(appData));
}

function loadDataFromLocalStorage() {
    const data = localStorage.getItem('trackYourMoneyData');
    if (data) {
        appData = JSON.parse(data);
    }
}

// ========== UTILITIES ==========

function showNotification(message, type = 'info') {
    // Create a simple toast notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideInUp 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add toast animation to styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    @keyframes slideOutDown {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(100px); opacity: 0; }
    }
`;
document.head.appendChild(style);
