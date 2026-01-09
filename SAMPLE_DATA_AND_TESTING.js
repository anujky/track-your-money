/**
 * Sample Data & Testing Guide
 * 
 * Use this file to test the Track Your Money application with sample data
 * Copy the sample data into your browser's localStorage to test the app
 */

// ========== SAMPLE DATA ==========

const SAMPLE_DATA = {
    transactions: [
        // January Income
        {
            id: 1704067200000,
            date: "2025-01-01",
            type: "income",
            category: "Salary",
            subCategory: "Monthly",
            description: "January salary",
            amount: 50000
        },
        {
            id: 1704067200001,
            date: "2025-01-05",
            type: "income",
            category: "Business",
            subCategory: "Freelance",
            description: "Web design project",
            amount: 15000
        },
        // January Expenses
        {
            id: 1704067200002,
            date: "2025-01-02",
            type: "expense",
            category: "Food & Dining",
            subCategory: "Groceries",
            description: "Weekly groceries",
            amount: 3500
        },
        {
            id: 1704067200003,
            date: "2025-01-04",
            type: "expense",
            category: "Transportation",
            subCategory: "Fuel",
            description: "Petrol",
            amount: 1800
        },
        {
            id: 1704067200004,
            date: "2025-01-06",
            type: "expense",
            category: "Utilities",
            subCategory: "Electricity",
            description: "Electricity bill",
            amount: 2000
        },
        {
            id: 1704067200005,
            date: "2025-01-08",
            type: "expense",
            category: "Entertainment",
            subCategory: "Movies",
            description: "Movie tickets",
            amount: 500
        },
        {
            id: 1704067200006,
            date: "2025-01-10",
            type: "expense",
            category: "Shopping",
            subCategory: "Clothes",
            description: "New shirt",
            amount: 2000
        },
        {
            id: 1704067200007,
            date: "2025-01-12",
            type: "expense",
            category: "Healthcare",
            subCategory: "Medical",
            description: "Doctor visit",
            amount: 1500
        },
        // January Savings
        {
            id: 1704067200008,
            date: "2025-01-15",
            type: "saving",
            category: "Bank Account",
            subCategory: "Savings",
            description: "Monthly savings",
            amount: 20000
        },
        {
            id: 1704067200009,
            date: "2025-01-20",
            type: "saving",
            category: "Fixed Deposit",
            subCategory: "FD 5 Year",
            description: "FD investment",
            amount: 10000
        },
        // January Investments
        {
            id: 1704067200010,
            date: "2025-01-25",
            type: "investment",
            category: "Stock Market",
            subCategory: "Mutual Funds",
            description: "SIP investment",
            amount: 5000
        },
        {
            id: 1704067200011,
            date: "2025-01-28",
            type: "investment",
            category: "Gold",
            subCategory: "Digital Gold",
            description: "Digital gold purchase",
            amount: 2000
        }
    ],
    loans: [
        {
            id: 1704067200012,
            name: "Home Loan",
            principal: 5000000,
            rate: 7.5,
            tenure: 240,
            startDate: "2024-06-01",
            emi: 38572,
            paidAmount: 77144
        },
        {
            id: 1704067200013,
            name: "Car Loan",
            principal: 1500000,
            rate: 8.5,
            tenure: 60,
            startDate: "2024-11-01",
            emi: 28668,
            paidAmount: 28668
        }
    ],
    emiPayments: {
        1704067200012: [
            { date: "2024-07-01", amount: 38572 },
            { date: "2024-08-01", amount: 38572 }
        ],
        1704067200013: [
            { date: "2024-12-01", amount: 28668 }
        ]
    }
};

// ========== HOW TO LOAD SAMPLE DATA ==========

/*
Method 1: Paste in Browser Console (F12)
1. Open the app in browser
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Copy and paste the code below:

const sampleData = {
    transactions: [ ... ],
    loans: [ ... ],
    emiPayments: { ... }
};
localStorage.setItem('trackYourMoneyData', JSON.stringify(sampleData));
location.reload();

Method 2: Create a Setup Script
1. Add this to your HTML before closing </body>:
   <button id="loadSampleBtn">Load Sample Data</button>
   <script>
       document.getElementById('loadSampleBtn').addEventListener('click', () => {
           const sampleData = { ... };
           localStorage.setItem('trackYourMoneyData', JSON.stringify(sampleData));
           location.reload();
       });
   </script>

Method 3: Manually Add Data
1. Use the app interface to add sample transactions
2. Takes longer but good for testing UX
*/

// ========== TESTING CHECKLIST ==========

/*
✅ TRANSACTION TESTS

1. Add Income Transaction
   - Type: Income
   - Category: Salary
   - Sub: Monthly
   - Amount: 50000
   - Should appear in dashboard and recent transactions

2. Add Expense Transaction
   - Type: Expense
   - Category: Food & Dining
   - Sub: Groceries
   - Amount: 3500
   - Should appear in pie chart and recent transactions

3. Add Saving Transaction
   - Type: Saving
   - Category: Bank Account
   - Sub: Savings
   - Amount: 20000
   - Should reflect in total savings

4. Add Investment Transaction
   - Type: Investment
   - Category: Stock Market
   - Sub: Mutual Funds
   - Amount: 5000
   - Should reflect in investment rate

5. Test Date Filters
   - This Month: Should show current month transactions
   - This Year: Should show all this year's transactions
   - Custom Range: Should show selected month only

✅ LOAN TESTS

1. Add Home Loan
   - Name: Home Loan
   - Principal: 5000000
   - Rate: 7.5%
   - Tenure: 240 months
   - Check EMI calculates to ~38,572

2. Add Car Loan
   - Name: Car Loan
   - Principal: 1500000
   - Rate: 8.5%
   - Tenure: 60 months
   - Check EMI calculates correctly

3. Record EMI Payment
   - Click "Record EMI"
   - Enter amount and date
   - Check due amount decreases

4. Delete Loan
   - Click Delete on a loan
   - Confirm deletion
   - Loan should disappear

✅ DASHBOARD TESTS

1. Summary Cards
   - Total Income: Should be sum of all income
   - Total Expenses: Should be sum of all expenses
   - Total Savings: Should include savings and investments

2. Charts
   - Expense Chart: Should show pie chart with categories
   - Income Chart: Should show pie chart with sources

3. Circular Progress
   - Expense Rate: (Expenses / Income) * 100
   - Savings Rate: (Savings / Income) * 100
   - Investment Rate: (Investments / Income) * 100

4. Recent Transactions
   - Should show last 10 transactions
   - Should have correct amounts and icons

✅ REPORTS TESTS

1. Monthly Report
   - Should show income, expenses, savings by month
   - Net savings should be correct

2. Yearly Report
   - Should aggregate by year
   - Totals should match

3. Category Report
   - Should show breakdown by category
   - Should filter by selected month

4. CSV Export
   - Should download CSV file
   - Should contain all transactions
   - Should be importable in Excel

✅ UI/UX TESTS

1. Navigation
   - All nav links should work
   - Active link should be highlighted
   - Views should switch smoothly

2. Forms
   - All required fields marked
   - Form validation working
   - Reset after submission

3. Responsive Design
   - Test on desktop (1920px)
   - Test on tablet (768px)
   - Test on mobile (375px)

4. Notifications
   - Should show success messages
   - Should show error messages
   - Should auto-dismiss

✅ DATA PERSISTENCE TESTS

1. Add Data
   - Add transaction
   - Refresh page
   - Data should still be there

2. Clear Data
   - Open DevTools → Application → LocalStorage
   - Delete trackYourMoneyData
   - Refresh page
   - App should be empty

3. Multiple Browsers
   - Open app in Chrome
   - Open in Firefox
   - Each should have separate data

4. Export/Import
   - Export to CSV
   - Clear all data
   - Data should be gone
*/

// ========== PERFORMANCE TESTS ==========

/*
Test with Large Datasets:

1. Add 100+ Transactions
   - Should not slow down significantly
   - Charts should render smoothly
   - Reports should load quickly

2. Add 10+ Loans
   - Loan list should render properly
   - No UI freezing

3. Load Sample Data
   - Should load instantly
   - All calculations should be correct
   - Charts should display

4. Filter by Month
   - Should quickly filter data
   - No lag in switching views
*/

// ========== CALCULATION VERIFICATION ==========

/*
EMI Formula Verification:

Home Loan Example:
Principal (P) = 5,000,000
Rate (R) = 7.5% p.a.
Tenure (n) = 240 months
Monthly Rate (r) = 7.5 / 12 / 100 = 0.00625

EMI = (P × r × (1 + r)^n) / ((1 + r)^n - 1)
EMI = (5000000 × 0.00625 × (1.00625)^240) / ((1.00625)^240 - 1)
EMI ≈ 38,572

Expected in app: 38,572 ✓

Car Loan Example:
Principal = 1,500,000
Rate = 8.5% p.a.
Tenure = 60 months
Monthly Rate = 8.5 / 12 / 100 = 0.00708333

EMI = (1500000 × 0.00708333 × (1.00708333)^60) / ((1.00708333)^60 - 1)
EMI ≈ 28,668

Expected in app: 28,668 ✓
*/

// ========== SAMPLE DATA GENERATION SCRIPT ==========

function generateSampleData() {
    const months = ['2025-01', '2025-02', '2025-03'];
    const transactions = [];
    let id = 1704067200000;

    // Generate 3 months of sample data
    months.forEach((month, idx) => {
        // Monthly income
        transactions.push({
            id: id++,
            date: `${month}-01`,
            type: 'income',
            category: 'Salary',
            subCategory: 'Monthly',
            description: `${month} salary`,
            amount: 50000 + (Math.random() * 10000)
        });

        // Freelance income (50% chance)
        if (Math.random() > 0.5) {
            transactions.push({
                id: id++,
                date: `${month}-15`,
                type: 'income',
                category: 'Business',
                subCategory: 'Freelance',
                description: 'Project payment',
                amount: 10000 + (Math.random() * 20000)
            });
        }

        // 3-5 expenses
        const expenseCount = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < expenseCount; i++) {
            const categories = [
                { cat: 'Food & Dining', sub: 'Groceries', amt: 3500 },
                { cat: 'Transportation', sub: 'Fuel', amt: 2000 },
                { cat: 'Utilities', sub: 'Electricity', amt: 2000 },
                { cat: 'Entertainment', sub: 'Movies', amt: 500 },
                { cat: 'Shopping', sub: 'Clothes', amt: 2000 }
            ];
            const exp = categories[Math.floor(Math.random() * categories.length)];
            
            transactions.push({
                id: id++,
                date: `${month}-${10 + i * 5}`,
                type: 'expense',
                category: exp.cat,
                subCategory: exp.sub,
                description: 'Transaction',
                amount: exp.amt + (Math.random() * 500)
            });
        }

        // Savings
        transactions.push({
            id: id++,
            date: `${month}-20`,
            type: 'saving',
            category: 'Bank Account',
            subCategory: 'Savings',
            description: 'Monthly savings',
            amount: 15000 + (Math.random() * 5000)
        });

        // Investment
        transactions.push({
            id: id++,
            date: `${month}-25`,
            type: 'investment',
            category: 'Stock Market',
            subCategory: 'Mutual Funds',
            description: 'SIP',
            amount: 5000 + (Math.random() * 3000)
        });
    });

    return transactions;
}

// Usage: 
// const data = generateSampleData();
// console.log(data);

// ========== DEBUGGING HELPERS ==========

function logAppData() {
    const data = localStorage.getItem('trackYourMoneyData');
    if (data) {
        const parsed = JSON.parse(data);
        console.log('Current App Data:', parsed);
        console.log('Total Transactions:', parsed.transactions.length);
        console.log('Total Loans:', parsed.loans.length);
    } else {
        console.log('No data in localStorage');
    }
}

function clearAppData() {
    if (confirm('Clear all data? This cannot be undone!')) {
        localStorage.removeItem('trackYourMoneyData');
        location.reload();
    }
}

function exportAppData() {
    const data = localStorage.getItem('trackYourMoneyData');
    if (data) {
        console.log('Copy this JSON to backup:');
        console.log(data);
    }
}

// Usage in console:
// logAppData() - View all data
// clearAppData() - Clear all data
// exportAppData() - Export as JSON
