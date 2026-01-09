# Track Your Money - Feature Overview & User Guide

## 🎯 What Can You Do With This App?

### 📝 Add & Track Transactions
```
Income
├── Monthly Salary
├── Freelance Projects
├── Investment Dividends
└── Other Income Sources

Expenses
├── Food & Dining
├── Transportation
├── Utilities
├── Entertainment
├── Shopping
├── Healthcare
└── Education

Savings
├── Bank Accounts
├── Fixed Deposits
└── Piggy Banks

Investments
├── Stock Market & Mutual Funds
├── Real Estate
├── Cryptocurrency
├── Gold
└── Bonds
```

### 📊 View Beautiful Analytics
- **Summary Cards**: Quick overview of totals
- **Pie Charts**: Visual breakdown of categories
- **Circular Progress**: Percentage rates visualization
- **Recent Transactions**: Latest 10 transactions
- **Real-time Updates**: Instant calculations

### 🏦 Manage Loans Efficiently
- Add loans with principal, rate, and tenure
- Auto-calculate monthly EMI
- Record EMI payments
- Track remaining due amount
- Monitor repayment progress
- Visual progress indicators

### 📈 Generate Reports
- Monthly financial summary
- Yearly aggregate data
- Category-wise breakdown
- Export to CSV format
- Integration ready for Google Sheets

### 🔍 Filter & Analyze
- Current month view
- Current year view
- Custom date range selection
- Category-wise filtering
- Time-period comparison

---

## 🎮 How to Use Each Feature

### Adding Your First Income Transaction

**Step 1: Navigate to Add Transaction**
```
Click: Navigation Bar → "Add Transaction"
```

**Step 2: Fill the Form**
```
Date:           [Auto-filled with today's date]
Type:           [Select "Income"]
Category:       [Select "Salary"]
Sub-Category:   [Select "Monthly"]
Description:    [Optional - "Jan 2025 salary"]
Amount:         [50,000]
```

**Step 3: Submit**
```
Click: "Add Transaction" button
Confirmation: Toast notification "Transaction added successfully!"
```

**Step 4: View on Dashboard**
```
Your income appears in:
- Total Income card
- Income Breakdown chart
- Recent Transactions list
- Dashboard summary calculations
```

### Adding an Expense Transaction

**Step 1: Navigate**
```
Click: "Add Transaction"
```

**Step 2: Fill Form**
```
Date:           [Select date]
Type:           [Select "Expense"]
Category:       [e.g., "Food & Dining"]
Sub-Category:   [e.g., "Groceries"]
Description:    [e.g., "Weekly groceries"]
Amount:         [3,500]
```

**Step 3: Track**
```
Shows up in:
- Total Expenses card
- Expense Breakdown chart
- Recent transactions
- Expense rate percentage
```

### Saving Money

**Step 1: Navigate**
```
Click: "Add Transaction"
```

**Step 2: Form Values**
```
Type:           [Saving]
Category:       [Bank Account / Fixed Deposit]
Sub-Category:   [Savings / FD 5 Year]
Amount:         [20,000]
```

**Step 3: Monitor**
```
Reflects in:
- Total Savings card
- Savings rate percentage
- Dashboard summary
```

### Recording Investment

**Step 1: Navigate**
```
Click: "Add Transaction"
```

**Step 2: Fill Details**
```
Type:           [Investment]
Category:       [Stock Market / Gold / etc]
Sub-Category:   [Specific type]
Amount:         [5,000]
```

**Step 3: Track Growth**
```
Visible in:
- Total Savings/Investment card
- Investment rate percentage
- Report analytics
```

### Managing Loans - Add New Loan

**Step 1: Go to Loans Tab**
```
Click: Navigation → "Loans"
```

**Step 2: Fill Loan Details**
```
Loan Name:      [Home Loan]
Principal:      [5,000,000]
Interest Rate:  [7.5] %
Tenure:         [240] months (20 years)
Start Date:     [2024-06-01]
EMI:            [Auto-calculates to ₹38,572]
```

**Step 3: Add Loan**
```
Click: "Add Loan" button
Result: Loan appears in loan list with full details
```

### Managing Loans - Record EMI Payment

**Step 1: From Loan Card**
```
Click: "Record EMI" button on loan card
```

**Step 2: Payment Details**
```
Modal Dialog:
- Payment Date:  [Today's date]
- Amount:        [Auto-filled with EMI amount, can edit]
```

**Step 3: Confirm Payment**
```
Click: "Record Payment"
Result: 
- Amount Paid increases
- Due Amount decreases
- Progress bar updates
```

### Viewing Loan Progress

```
Each Loan Card Shows:
┌─────────────────────────┐
│ Loan Name               │
│ EMI: ₹38,572            │
├─────────────────────────┤
│ Principal: ₹5,000,000   │
│ Amount Paid: ₹77,144    │
│ Due: ₹4,922,856         │
│ Rate: 7.5% p.a.         │
│ End Date: Jun 2044      │
├─────────────────────────┤
│ [Progress Bar: 1.54%]   │
│ 1.54% Paid              │
├─────────────────────────┤
│ [Record EMI] [Delete]   │
└─────────────────────────┘
```

### Dashboard Overview

**What You See:**
```
Top Section:
- Total Income Card (Green)
- Total Expenses Card (Red)
- Total Savings Card (Blue)

Middle Section:
- Expenses Breakdown (Pie Chart)
- Income Breakdown (Pie Chart)

Lower Section:
- Expense Rate (Circular %)
- Savings Rate (Circular %)
- Investment Rate (Circular %)

Bottom Section:
- Recent Transactions List
```

### Filtering Dashboard

**Month View:**
```
Filter Control: [This Month ▼]
Shows: Current month transactions only
Updates: All calculations and charts
```

**Year View:**
```
Filter Control: [This Year ▼]
Shows: All transactions from current year
Updates: Annual summary
```

**Custom Range:**
```
Filter Control: [Custom Range ▼]
Month Picker: [2025-01 ▼]
Shows: Selected month's transactions
Updates: All visualizations
```

### Generating Reports

**Navigate to Reports:**
```
Click: "Reports" in navigation
```

**Available Report Types:**

**1. Monthly Report**
```
Displays:
Month | Income | Expenses | Savings | Investments | Net Savings
─────────────────────────────────────────────────────────────
Jan   | ₹65k   | ₹15k     | ₹30k    | ₹5k         | ₹15k
Feb   | ₹68k   | ₹16k     | ₹32k    | ₹6k         | ₹14k
etc...
```

**2. Yearly Report**
```
Displays:
Year | Income   | Expenses | Savings | Investments | Net Savings
────────────────────────────────────────────────────────────
2024 | ₹800k    | ₹200k    | ₹400k   | ₹100k       | ₹100k
2025 | ₹820k    | ₹210k    | ₹410k   | ₹110k       | ₹90k
```

**3. Category Report**
```
Displays:
Category | Amount
─────────────────────
expense - Food | ₹42k
expense - Fuel | ₹18k
income - Salary | ₹65k
etc...
```

### Exporting Data

**Download as CSV:**
```
Click: "Download as CSV" button
File: transactions_YYYY-MM-DD.csv
Can be opened in: Excel, Google Sheets, or any spreadsheet app
```

**Sync to Google Sheets:**
```
Click: "Sync to Google Sheets" button
Note: Requires backend setup
Sets up: Cloud storage and backup
```

---

## 💡 Dashboard Metrics Explained

### Summary Cards

**Total Income**
```
Definition: Sum of all income transactions in selected period
Calculation: ∑(All transactions where type = 'income')
Example: Salary (₹50k) + Freelance (₹15k) = ₹65k
Shows: Card displays "₹65,000"
```

**Total Expenses**
```
Definition: Sum of all expense transactions
Calculation: ∑(All transactions where type = 'expense')
Example: Food (₹3.5k) + Fuel (₹1.8k) + ... = ₹15k
Shows: Automatically updates
```

**Total Savings & Investments**
```
Definition: Combined savings and investment amounts
Calculation: ∑(type = 'saving') + ∑(type = 'investment')
Example: Bank Savings (₹20k) + Mutual Funds (₹5k) = ₹25k
Shows: Real-time total
```

### Circular Progress Percentages

**Expense Rate**
```
What it shows: What % of income you spend
Calculation: (Total Expenses ÷ Total Income) × 100
Example: (₹15k ÷ ₹65k) × 100 = 23%
Interpretation: 23% of income goes to expenses
```

**Savings Rate**
```
What it shows: What % of income you save
Calculation: (Total Savings ÷ Total Income) × 100
Example: (₹20k ÷ ₹65k) × 100 = 31%
Interpretation: 31% of income is saved
```

**Investment Rate**
```
What it shows: What % of income you invest
Calculation: (Total Investments ÷ Total Income) × 100
Example: (₹5k ÷ ₹65k) × 100 = 8%
Interpretation: 8% of income is invested
```

### Charts Explanation

**Expenses Breakdown (Pie Chart)**
```
Shows: Distribution of expenses by category
Each slice represents: One expense category
Size indicates: Amount spent in that category
Example:
- Food (35%) - largest slice
- Transportation (20%)
- Utilities (15%)
- Other (30%)
```

**Income Breakdown (Pie Chart)**
```
Shows: Distribution of income by source
Each slice represents: One income source
Size indicates: Amount from that source
Example:
- Salary (77%) - main income
- Freelance (23%) - additional
```

---

## 🔢 Example Scenarios

### Scenario 1: Monthly Budget Tracking

**January Transactions:**
```
Income:
- Salary: ₹50,000
- Freelance: ₹15,000
Total Income: ₹65,000

Expenses:
- Food: ₹5,000
- Transportation: ₹2,000
- Utilities: ₹2,000
- Entertainment: ₹500
- Other: ₹5,500
Total Expenses: ₹15,000

Savings:
- Bank: ₹20,000
Total Savings: ₹20,000

Investments:
- Mutual Funds: ₹5,000
Total Investment: ₹5,000

Dashboard Calculations:
Expense Rate = (15,000 ÷ 65,000) × 100 = 23%
Savings Rate = (20,000 ÷ 65,000) × 100 = 31%
Investment Rate = (5,000 ÷ 65,000) × 100 = 8%
Remaining = ₹65,000 - ₹15,000 - ₹20,000 - ₹5,000 = ₹25,000
```

### Scenario 2: Loan EMI Tracking

**Initial Loan:**
```
Loan: Home Loan
Principal: ₹5,000,000
Rate: 7.5% p.a.
Tenure: 240 months (20 years)
Calculated EMI: ₹38,572/month
```

**After 2 Months:**
```
Month 1: Record ₹38,572 payment
Month 2: Record ₹38,572 payment

Updated Loan Status:
Principal: ₹5,000,000
Paid: ₹77,144
Due: ₹4,922,856
Progress: 1.54%
```

### Scenario 3: Multi-Month Comparison

**Report Type: Monthly Summary**
```
January:  Income ₹65k, Expenses ₹15k, Savings ₹20k, Net ₹30k
February: Income ₹68k, Expenses ₹16k, Savings ₹22k, Net ₹30k
March:    Income ₹65k, Expenses ₹15k, Savings ₹20k, Net ₹30k

Insights:
- Income varies month to month
- Expenses are controlled
- Consistent savings
- Average monthly net: ₹30k
```

---

## ⌨️ Keyboard & Browser Tips

### Using the App on Mobile
```
Best practices:
1. Use portrait orientation for forms
2. Use landscape for charts
3. All buttons are touch-optimized
4. Swipe to navigate
```

### Browser Storage Tips
```
Check storage: DevTools → Application → Local Storage
Backup: Export CSV before clearing data
Clear: Settings → Clear browsing data (be careful!)
```

### Desktop Power Tips
```
Multi-monitor: Open reports on one screen, dashboard on another
Keyboard navigation: Tab through forms
Zoom: Use Ctrl++ to zoom (useful for charts)
```

---

## 🎨 UI Elements Guide

### Cards
```
┌─ Summary Card ──────────┐
│ Title (Gray)            │
│ ₹Amount (Colored)       │
│ Percentage (Gray)       │
│ [Hover effect]          │
└─────────────────────────┘
```

### Forms
```
┌─ Form Section ──────────┐
│ [Input] [Input]         │
│ [Select] [Select]       │
│ [Button Primary]        │
└─────────────────────────┘
```

### Buttons
```
Primary Button:     [Submit / Add]       (Purple gradient)
Secondary Button:   [Download / Reset]  (Light gray)
Danger Button:      [Delete]            (Red)
EMI Button:         [Record EMI]        (Blue)
```

### Modals
```
┌── Modal ─────────────────┐
│ [X Close]                │
│ Title                    │
│ [Form Content]           │
│ [Submit Button]          │
└──────────────────────────┘
```

---

## 📱 Responsive Behavior

### On Desktop (1920px)
```
Layout: Wide, multi-column
Cards: 3 per row
Charts: Side by side
Navigation: Horizontal
```

### On Tablet (768px)
```
Layout: Medium, 2-column
Cards: 2 per row
Charts: Stacked
Navigation: Horizontal (compact)
```

### On Mobile (375px)
```
Layout: Narrow, single column
Cards: 1 per row
Charts: Full width
Navigation: Vertical (stacked)
```

---

## 🚨 Important Notes

### Data Safety
- ✅ All data saved locally (no external storage required)
- ✅ Survives browser refresh
- ✅ Survives computer restart
- ⚠️ Clearing browser cache WILL delete data
- ✅ Export regularly for backup

### Browser Requirements
- ✅ Modern browser (Chrome, Firefox, Safari, Edge)
- ✅ JavaScript enabled
- ✅ localStorage enabled
- ✅ Cookies (if using Google Sheets sync)

### Performance
- ✅ Works smoothly with 100+ transactions
- ✅ Charts render instantly
- ✅ Reports generate in < 1 second
- ✅ No lag on modern devices

---

## 🎓 Learning Resources

### Understanding EMI
```
What is EMI?
EMI = Equated Monthly Installment
It's a fixed amount you pay monthly towards a loan

How it's calculated?
Formula: EMI = (P × r × (1 + r)^n) / ((1 + r)^n - 1)
Example: ₹5M at 7.5% for 20 years = ₹38,572/month
```

### Understanding Financial Ratios
```
Expense Ratio: What % of income goes to expenses
Target: 50-60% (depends on lifestyle)

Savings Ratio: What % of income is saved
Target: 20-30% (savings goal)

Investment Ratio: What % of income is invested
Target: 10-20% (growth goal)
```

---

## 💬 FAQ

**Q: Will my data be lost if I close the browser?**
A: No! Data is saved in localStorage and persists across sessions.

**Q: Can I use this on my phone?**
A: Yes! The app is fully responsive and works great on mobile.

**Q: How do I backup my data?**
A: Export to CSV from the Reports section.

**Q: Can I sync to Google Sheets?**
A: Yes, but requires backend setup. See GOOGLE_SHEETS_INTEGRATION.js

**Q: Is my data secure?**
A: Yes! All data stays on your device, no external uploads unless you enable Google Sheets.

**Q: Can I delete a transaction?**
A: Currently, you'd need to export data, edit it, and reload. Delete feature can be added.

**Q: How many transactions can I add?**
A: Theoretically unlimited, but practically 10,000+ should work smoothly.

**Q: Can I share the data with family?**
A: Export CSV and share, or set up Google Sheets sync for live sharing.

---

## 🎯 Tips for Financial Success

### Best Practices
1. **Track Daily**: Add transactions as they happen
2. **Categorize Properly**: Use categories wisely for insights
3. **Review Monthly**: Check dashboard every month
4. **Set Goals**: Use reports to set realistic financial goals
5. **Budget**: Plan based on historical spending patterns

### Financial Planning
```
Ideal Budget Breakdown:
- Expenses: 50-60%
- Savings: 20-30%
- Investments: 10-20%
- Loans (if any): Pay as planned
```

### Loan Management
1. Track all EMI payments
2. Know your payoff date
3. Make extra payments when possible
4. Monitor interest saved by early repayment

---

**Thank you for using Track Your Money! Start your financial journey today! 💰📊✨**

