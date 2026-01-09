# 📊 Google Sheets Integration Using Apps Script

## Overview

This guide shows you how to integrate your "Track Your Money" web app directly with Google Sheets using **Google Apps Script** - perfect for personal use with **zero backend server needed**!

---

## ✨ Why Google Apps Script?

```
✅ No server required
✅ Free (uses Google's servers)
✅ Unlimited for personal use
✅ One-click deployment
✅ Direct Google Sheets integration
✅ Automatic backups
✅ Easy to set up
✅ Secure and reliable
```

---

## 🚀 Step-by-Step Setup (15 minutes)

### Step 1: Create a Google Sheet

1. Go to **https://sheets.google.com**
2. Click **"+ Create"** → **"Blank spreadsheet"**
3. Name it **"Track Your Money"**
4. Keep the URL for later (you'll need it)

```
Example URL: https://docs.google.com/spreadsheets/d/1mY-qWe_ABC123XYZ/edit
                                              ↑ Your Sheet ID
```

### Step 2: Open Apps Script Editor

1. In your Google Sheet, click **Extensions** (top menu)
2. Click **"Apps Script"**
3. A new tab opens with the Apps Script editor
4. Delete any existing code
5. Copy the entire code from **GoogleAppsScript.gs** file

### Step 3: Paste the Code

1. Copy all code from `GoogleAppsScript.gs`
2. Paste into the Apps Script editor
3. Press **Ctrl+S** to save (or Cmd+S on Mac)
4. Name the project: **"Track Your Money Sync"**
5. Click **Save**

### Step 4: Initialize the Spreadsheet

1. In the Apps Script editor, look for the function dropdown (top)
2. Select **"initializeSpreadsheet"**
3. Click the **▶ Run** button
4. Accept permissions when prompted
5. The sheets are now created with headers!

### Step 5: Deploy as Web App

1. Click **"Deploy"** (top right)
2. Click **"New deployment"** → Select **"Web app"**
3. Configure:
   - **Execute as:** Your Google Account
   - **Who has access:** Anyone
4. Click **"Deploy"**
5. Copy the **Deployment URL** (you'll need this)

```
Example: https://script.google.com/macros/d/abc123XYZ/userweb?v=1
```

### Step 6: Update Your Web App

1. Open `script.js` in your project
2. Find this line (around line 700):
```javascript
async function syncWithGoogleSheets() {
```
3. Update the `APPS_SCRIPT_URL` with your deployment URL

---

## 🔧 Configuration

### In Your Web App (script.js)

Update this constant with your deployment URL:

```javascript
// Google Apps Script Deployment URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxnMHdvjpG-EYAhTYjEmdXKfJQWZ0TKjzI8OzAbBXJncXu1w_yKsZy1jo2MZm75al9-/exec';
```

Replace `YOUR_DEPLOYMENT_ID` with the actual ID from Step 5.

---

## 📝 How It Works

### Data Flow

```
Your Web App (Browser)
        ↓
  [Sync Button]
        ↓
  Send JSON Data
        ↓
  Google Apps Script
        ↓
  Google Sheets
        ↓
  Data Stored & Synced
```

### What Gets Synced?

```
✓ All transactions (income, expenses, savings, investments)
✓ All loans (principal, rate, tenure, EMI)
✓ All EMI payments (date, amount)
✓ Summary statistics (totals updated)
```

---

## 💻 Frontend Integration

### Updated sync function in script.js:

```javascript
async function syncWithGoogleSheets() {
    try {
        // Check if we have data
        if (appData.transactions.length === 0) {
            showNotification('No data to sync. Add transactions first!', 'info');
            return;
        }

        showNotification('Syncing to Google Sheets...', 'info');

        // Send data to Apps Script
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'syncTransactions',
                transactions: appData.transactions,
                loans: appData.loans,
                emiPayments: appData.emiPayments
            })
        });

        const result = await response.json();
        
        if (result.success) {
            showNotification(`✅ Synced ${result.count} transactions to Google Sheets!`, 'success');
            console.log('Sync successful:', result);
        } else {
            showNotification('❌ Sync failed: ' + result.message, 'error');
        }
    } catch (error) {
        console.error('Sync error:', error);
        showNotification('❌ Sync failed. Check console for details.', 'error');
    }
}
```

---

## 🎯 Available Functions

### Apps Script provides these endpoints:

#### 1. Sync All Transactions
```javascript
{
    action: 'syncTransactions',
    transactions: [...],
    loans: [...],
    emiPayments: {...}
}
```

#### 2. Add Single Transaction
```javascript
{
    action: 'addTransaction',
    transaction: { date, type, category, subCategory, description, amount }
}
```

#### 3. Add Single Loan
```javascript
{
    action: 'addLoan',
    loan: { name, principal, rate, tenure, startDate, emi, paidAmount }
}
```

#### 4. Record EMI Payment
```javascript
{
    action: 'recordEMI',
    loanId: 123456789,
    payment: { date, amount }
}
```

#### 5. Get All Data
```javascript
{
    action: 'getAll'
}
```

---

## 📊 Google Sheets Structure

After initialization, your spreadsheet has 4 sheets:

### Sheet 1: Transactions
```
Columns: Date | Type | Category | SubCategory | Description | Amount | Synced At
```

### Sheet 2: Loans
```
Columns: Loan Name | Principal | Interest Rate % | Tenure (Months) | Start Date | EMI | Amount Paid | Due Amount
```

### Sheet 3: EMI Payments
```
Columns: Loan ID | Payment Date | Amount Paid | Recorded At
```

### Sheet 4: Summary
```
Columns: Metric | Value | Last Updated
Rows: Total Income, Total Expenses, Total Savings, Total Investment
```

---

## 🔐 Security & Permissions

### What Permissions Do You Need?

When you first run the script, Google asks for:
- ✅ **Read/Write access to Google Sheets** - To save your data
- ✅ **Execute as your account** - Uses your Google account

**Your data is completely private:**
- Only you can access your spreadsheet
- Google Apps Script runs on Google's secure servers
- No third-party services involved
- Complete encryption in transit

---

## 🐛 Troubleshooting

### Problem: "Script error" when syncing

**Solution:**
1. Check that you deployed the script correctly
2. Make sure the deployment URL is correct
3. Go to Apps Script → Executions tab to see error details
4. Common issues:
   - Wrong deployment URL
   - Script not saved
   - Permissions not granted

### Problem: Empty Google Sheet

**Solution:**
1. Make sure you ran `initializeSpreadsheet()` first
2. Check that the sheets were created (4 sheets should exist)
3. Run `testScript()` in Apps Script to verify

### Problem: "This app isn't verified" message

**Solution:**
1. Google shows this for custom scripts (it's normal)
2. Click **"Advanced"** → **"Go to Track Your Money (unsafe)"**
3. This is safe - it's your own script

### Problem: Sync not working

**Solution:**
1. Open browser console (F12)
2. Look for error messages
3. Check the Apps Script execution logs:
   - Go to Apps Script → Executions
   - Look for failed executions
   - Click to see error details
4. Verify the deployment URL matches

---

## 🎓 Usage Examples

### Example 1: Sync Everything

```javascript
// In your web app, after adding transactions:
document.getElementById('syncGoogleSheets').addEventListener('click', async () => {
    const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'syncTransactions',
            transactions: appData.transactions,
            loans: appData.loans,
            emiPayments: appData.emiPayments
        })
    });
    const result = await response.json();
    console.log(result);
});
```

### Example 2: Fetch Data Back

```javascript
// Retrieve all data from Google Sheets
async function fetchFromGoogleSheets() {
    const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getAll' })
    });
    const data = await response.json();
    console.log('Transactions:', data.transactions);
    console.log('Loans:', data.loans);
}
```

---

## 📈 Advanced Features

### Automatic Syncing

Add this to sync every 15 minutes:

```javascript
// Auto-sync every 15 minutes
setInterval(() => {
    syncWithGoogleSheets();
}, 15 * 60 * 1000);
```

### Bi-directional Sync

Fetch data when app loads:

```javascript
// On app load
async function initializeFromSheets() {
    const data = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'getAll' })
    }).then(r => r.json());
    
    if (data.success) {
        appData = {
            transactions: data.transactions,
            loans: data.loans,
            emiPayments: data.emiPayments
        };
        updateDashboard();
    }
}
```

### Batch Sync with Progress

```javascript
async function syncWithProgress() {
    const total = appData.transactions.length + appData.loans.length;
    let synced = 0;
    
    // Sync transactions
    for (let i = 0; i < appData.transactions.length; i += 100) {
        const batch = appData.transactions.slice(i, i + 100);
        await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: 'syncTransactions',
                transactions: batch
            })
        });
        synced += batch.length;
        console.log(`Synced ${synced}/${total} records`);
    }
}
```

---

## 💾 Data Backup & Recovery

### Automatic Google Sheets Backup

Your data is automatically backed up:
- ✅ Google Sheets keeps version history
- ✅ Access: File → Version history
- ✅ Restore any previous version

### Manual Export

```
In Google Sheets:
File → Download → CSV
File → Download → Excel (XLSX)
```

### CSV to Web App

```javascript
// Parse CSV and load into app
function loadFromCSV(csvText) {
    const lines = csvText.split('\n');
    appData.transactions = [];
    
    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',');
        appData.transactions.push({
            date: cols[0],
            type: cols[1],
            category: cols[2],
            subCategory: cols[3],
            description: cols[4],
            amount: parseFloat(cols[5])
        });
    }
    
    updateDashboard();
}
```

---

## 🎯 Personal Use Tips

### Organize Your Data

```
Create separate sheets for:
- Monthly budgets (use formulas)
- Financial goals (track progress)
- Loan payoff schedule (plan ahead)
- Savings targets (visualize goals)
```

### Use Formulas in Google Sheets

```
=SUM(F:F)                    # Total of all amounts
=COUNTIF(B:B,"expense")      # Count expenses
=AVERAGEIF(B:B,"expense",F:F) # Average expense
=FILTER(A:F, B:B="income")   # Filter by type
```

### Create Charts

1. In Google Sheets: **Insert** → **Chart**
2. Create:
   - Pie charts of categories
   - Line graphs over time
   - Budget vs actual comparison
   - Loan payoff timeline

### Share Read-Only

```
Share with family (view-only):
1. Click Share button
2. Add their email
3. Set to "Viewer" (can't edit)
4. Send invite
```

---

## 🔄 Sync Frequency Guide

### Daily Use
- Sync after adding transactions
- Automatic background sync (every 15 min)

### Weekly
- Export CSV backup
- Review Google Sheets summary

### Monthly
- Full data export
- Archive previous month data
- Update budgets

### Quarterly
- Analyze trends
- Plan adjustments
- Update financial goals

---

## 📞 Support & Help

### If Deployment Fails

1. Go to **Apps Script project**
2. Click **Deploy** → **New deployment**
3. Delete the old deployment
4. Create a new one
5. Update your URL in script.js

### If Sync Shows Error

1. Open **Apps Script**
2. Click **Executions** tab
3. Find the failed execution
4. Click it to see error details
5. Fix the issue and retry

### Check Script Status

```javascript
// Add this to your web app to verify:
async function checkScriptStatus() {
    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'getAll' })
        });
        const data = await response.json();
        console.log('✅ Apps Script is working!', data);
        return true;
    } catch (error) {
        console.error('❌ Apps Script error:', error);
        return false;
    }
}
```

---

## 🎊 You're All Set!

Your "Track Your Money" app is now integrated with Google Sheets!

### What You Can Do:
✅ Sync data with one click
✅ Access data from Google Sheets
✅ Share with family
✅ Create charts and analysis
✅ Backup automatically
✅ No server needed
✅ Completely free

### Next Steps:
1. Start using the sync button
2. Watch data appear in Google Sheets
3. Create summary reports
4. Share with family if needed

---

## 📋 Quick Checklist

- [ ] Created Google Sheet named "Track Your Money"
- [ ] Opened Apps Script editor (Extensions → Apps Script)
- [ ] Copied GoogleAppsScript.gs code
- [ ] Ran initializeSpreadsheet() function
- [ ] Deployed as Web App
- [ ] Copied deployment URL
- [ ] Updated APPS_SCRIPT_URL in script.js
- [ ] Tested sync with sample data
- [ ] Verified data appears in Google Sheets

---

**Happy syncing! 🎉📊✨**

Your personal finance data is now in the cloud, completely under your control!

---

For more help, refer to:
- Google Apps Script docs: https://developers.google.com/apps-script
- Google Sheets API: https://developers.google.com/sheets
- Track Your Money documentation
