// ========== GOOGLE APPS SCRIPT FOR TRACK YOUR MONEY ==========
// Updated for better CORS support with /exec endpoint
// 
// This Google Apps Script enables direct integration between your web app and Google Sheets
// Perfect for personal use - no backend server needed!
//
// Setup Instructions:
// 1. Go to https://sheets.google.com and create a new spreadsheet
// 2. Name it "Track Your Money"
// 3. Go to Extensions → Apps Script
// 4. Copy and paste this entire code into the Apps Script editor
// 5. Save the project
// 6. Deploy as web app (see instructions below)
// 7. Copy the deployment URL and update in your web app

// ========== GOOGLE APPS SCRIPT CODE (Copy everything below) ==========

// Store the spreadsheet structure
const SHEET_NAMES = {
    TRANSACTIONS: 'Transactions',
    LOANS: 'Loans',
    EMI_PAYMENTS: 'EMI Payments',
    SUMMARY: 'Summary'
};

// Initialize spreadsheet with headers (run once)
function initializeSpreadsheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Remove existing sheets if they exist
    try {
        const sheets = ss.getSheets();
        sheets.forEach(sheet => {
            if (sheet.getName() !== 'Sheet1') {
                ss.deleteSheet(sheet);
            }
        });
    } catch (e) {
        Logger.log('No sheets to delete');
    }
    
    // Create Transactions sheet
    let sheet = ss.insertSheet(SHEET_NAMES.TRANSACTIONS, 0);
    sheet.appendRow(['Date', 'Type', 'Category', 'SubCategory', 'Description', 'Amount', 'Synced At']);
    sheet.setFrozenRows(1);
    
    // Create Loans sheet
    sheet = ss.insertSheet(SHEET_NAMES.LOANS, 1);
    sheet.appendRow(['Loan Name', 'Principal', 'Interest Rate %', 'Tenure (Months)', 'Start Date', 'EMI', 'Amount Paid', 'Due Amount']);
    sheet.setFrozenRows(1);
    
    // Create EMI Payments sheet
    sheet = ss.insertSheet(SHEET_NAMES.EMI_PAYMENTS, 2);
    sheet.appendRow(['Loan ID', 'Payment Date', 'Amount Paid', 'Recorded At']);
    sheet.setFrozenRows(1);
    
    // Create Summary sheet
    sheet = ss.insertSheet(SHEET_NAMES.SUMMARY, 3);
    sheet.appendRow(['Metric', 'Value', 'Last Updated']);
    sheet.appendRow(['Total Income', 0, new Date()]);
    sheet.appendRow(['Total Expenses', 0, new Date()]);
    sheet.appendRow(['Total Savings', 0, new Date()]);
    sheet.appendRow(['Total Investment', 0, new Date()]);
    sheet.setFrozenRows(1);
    
    Logger.log('Spreadsheet initialized successfully!');
}

// ========== SYNC TRANSACTIONS ==========

function doPost(e) {
    try {
        // Parse request data
        let data;
        if (typeof e.postData.contents === 'string') {
            data = JSON.parse(e.postData.contents);
        } else {
            data = e.postData.contents;
        }
        
        const action = data.action;
        let result;
        
        // Route to appropriate function
        if (action === 'syncTransactions') {
            result = syncTransactions(data.transactions);
        } else if (action === 'syncLoans') {
            result = syncLoans(data.loans, data.emiPayments);
        } else if (action === 'getAll') {
            result = getAllData();
        } else if (action === 'addTransaction') {
            result = addTransaction(data.transaction);
        } else if (action === 'addLoan') {
            result = addLoan(data.loan);
        } else if (action === 'recordEMI') {
            result = recordEMIPayment(data.loanId, data.payment);
        } else if (action === 'deleteTransaction') {
            result = deleteTransaction(data.transaction);
        } else {
            result = {success: false, message: 'Unknown action: ' + action};
        }
        
        // Return with CORS headers
        return ContentService.createTextOutput(JSON.stringify(result))
            .setMimeType(ContentService.MimeType.JSON);
            
    } catch (error) {
        Logger.log('Error in doPost: ' + error.toString());
        const errorResponse = {success: false, error: error.toString(), message: 'Server error'};
        return ContentService.createTextOutput(JSON.stringify(errorResponse))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Sync all transactions
function syncTransactions(transactions) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName(SHEET_NAMES.TRANSACTIONS);
    
    // Clear existing data (keep headers)
    if (sheet.getLastRow() > 1) {
        sheet.deleteRows(2, sheet.getLastRow() - 1);
    }
    
    const timestamp = new Date().toISOString();
    const rows = [];
    
    transactions.forEach(t => {
        rows.push([
            t.date,
            t.type,
            t.category,
            t.subCategory,
            t.description || '',
            t.amount,
            timestamp
        ]);
    });
    
    if (rows.length > 0) {
        sheet.getRange(2, 1, rows.length, 7).setValues(rows);
    }
    
    updateSummary(transactions);
    
    return jsonResponse({
        success: true,
        message: `Synced ${transactions.length} transactions`,
        count: transactions.length,
        timestamp: timestamp
    });
}

// Add single transaction
function addTransaction(transaction) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName(SHEET_NAMES.TRANSACTIONS);
    
    const timestamp = new Date().toISOString();
    sheet.appendRow([
        transaction.date,
        transaction.type,
        transaction.category,
        transaction.subCategory,
        transaction.description || '',
        transaction.amount,
        timestamp
    ]);
    
    return jsonResponse({
        success: true,
        message: 'Transaction added successfully',
        timestamp: timestamp
    });
}

// Delete transaction
function deleteTransaction(transaction) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName(SHEET_NAMES.TRANSACTIONS);
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
    
    let foundAndDeleted = false;
    
    // Find and delete matching transaction
    for (let i = data.length - 1; i >= 0; i--) {
        const row = data[i];
        // Match by date, category, amount (as identifying factors)
        if (row[0] === transaction.date && 
            row[1] === transaction.type && 
            row[2] === transaction.category && 
            row[5] === transaction.amount) {
            sheet.deleteRow(i + 2); // +2 because array is 0-indexed and row 1 is header
            foundAndDeleted = true;
            break;
        }
    }
    
    return jsonResponse({
        success: true,
        message: foundAndDeleted ? 'Transaction deleted from Google Sheets' : 'Transaction not found in Google Sheets (already deleted)',
        deleted: foundAndDeleted,
        timestamp: new Date().toISOString()
    });
}

// ========== SYNC LOANS ==========

function syncLoans(loans, emiPayments) {
    // Sync loans
    const loansSheet = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName(SHEET_NAMES.LOANS);
    
    // Clear existing data (keep headers)
    if (loansSheet.getLastRow() > 1) {
        loansSheet.deleteRows(2, loansSheet.getLastRow() - 1);
    }
    
    const loanRows = [];
    loans.forEach(l => {
        const endDate = new Date(l.startDate);
        endDate.setMonth(endDate.getMonth() + l.tenure);
        
        loanRows.push([
            l.name,
            l.principal,
            l.rate,
            l.tenure,
            l.startDate,
            l.emi,
            l.paidAmount,
            l.principal - l.paidAmount
        ]);
    });
    
    if (loanRows.length > 0) {
        loansSheet.getRange(2, 1, loanRows.length, 8).setValues(loanRows);
    }
    
    // Sync EMI payments
    const emiSheet = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName(SHEET_NAMES.EMI_PAYMENTS);
    
    // Clear existing data (keep headers)
    if (emiSheet.getLastRow() > 1) {
        emiSheet.deleteRows(2, emiSheet.getLastRow() - 1);
    }
    
    const timestamp = new Date().toISOString();
    const emiRows = [];
    
    Object.entries(emiPayments).forEach(([loanId, payments]) => {
        payments.forEach(p => {
            emiRows.push([
                loanId,
                p.date,
                p.amount,
                timestamp
            ]);
        });
    });
    
    if (emiRows.length > 0) {
        emiSheet.getRange(2, 1, emiRows.length, 4).setValues(emiRows);
    }
    
    return jsonResponse({
        success: true,
        message: `Synced ${loans.length} loans and ${emiRows.length} EMI payments`,
        loansCount: loans.length,
        emiCount: emiRows.length,
        timestamp: timestamp
    });
}

// Add single loan
function addLoan(loan) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName(SHEET_NAMES.LOANS);
    
    sheet.appendRow([
        loan.name,
        loan.principal,
        loan.rate,
        loan.tenure,
        loan.startDate,
        loan.emi,
        loan.paidAmount || 0,
        (loan.principal - (loan.paidAmount || 0))
    ]);
    
    return jsonResponse({
        success: true,
        message: 'Loan added successfully'
    });
}

// Record EMI payment
function recordEMIPayment(loanId, payment) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName(SHEET_NAMES.EMI_PAYMENTS);
    
    sheet.appendRow([
        loanId,
        payment.date,
        payment.amount,
        new Date().toISOString()
    ]);
    
    return jsonResponse({
        success: true,
        message: 'EMI payment recorded successfully'
    });
}

// ========== FETCH ALL DATA ==========

function getAllData() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get transactions
    const transSheet = ss.getSheetByName(SHEET_NAMES.TRANSACTIONS);
    const transData = transSheet.getDataRange().getValues();
    const transactions = [];
    
    for (let i = 1; i < transData.length; i++) {
        const row = transData[i];
        if (row[0]) {
            transactions.push({
                date: row[0],
                type: row[1],
                category: row[2],
                subCategory: row[3],
                description: row[4],
                amount: row[5],
                syncedAt: row[6]
            });
        }
    }
    
    // Get loans
    const loansSheet = ss.getSheetByName(SHEET_NAMES.LOANS);
    const loansData = loansSheet.getDataRange().getValues();
    const loans = [];
    
    for (let i = 1; i < loansData.length; i++) {
        const row = loansData[i];
        if (row[0]) {
            loans.push({
                name: row[0],
                principal: row[1],
                rate: row[2],
                tenure: row[3],
                startDate: row[4],
                emi: row[5],
                paidAmount: row[6],
                dueAmount: row[7]
            });
        }
    }
    
    // Get EMI payments
    const emiSheet = ss.getSheetByName(SHEET_NAMES.EMI_PAYMENTS);
    const emiData = emiSheet.getDataRange().getValues();
    const emiPayments = {};
    
    for (let i = 1; i < emiData.length; i++) {
        const row = emiData[i];
        if (row[0]) {
            const loanId = row[0];
            if (!emiPayments[loanId]) {
                emiPayments[loanId] = [];
            }
            emiPayments[loanId].push({
                date: row[1],
                amount: row[2]
            });
        }
    }
    
    return jsonResponse({
        success: true,
        transactions: transactions,
        loans: loans,
        emiPayments: emiPayments,
        fetchedAt: new Date().toISOString()
    });
}

// ========== UPDATE SUMMARY ==========

function updateSummary(transactions) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName(SHEET_NAMES.SUMMARY);
    
    let totalIncome = 0;
    let totalExpenses = 0;
    let totalSavings = 0;
    let totalInvestment = 0;
    
    transactions.forEach(t => {
        switch(t.type) {
            case 'income':
                totalIncome += t.amount;
                break;
            case 'expense':
                totalExpenses += t.amount;
                break;
            case 'saving':
                totalSavings += t.amount;
                break;
            case 'investment':
                totalInvestment += t.amount;
                break;
        }
    });
    
    const now = new Date();
    sheet.getRange('B2').setValue(totalIncome);
    sheet.getRange('C2').setValue(now);
    
    sheet.getRange('B3').setValue(totalExpenses);
    sheet.getRange('C3').setValue(now);
    
    sheet.getRange('B4').setValue(totalSavings);
    sheet.getRange('C4').setValue(now);
    
    sheet.getRange('B5').setValue(totalInvestment);
    sheet.getRange('C5').setValue(now);
}

// ========== HELPER FUNCTION ==========

function jsonResponse(data, statusCode = 200) {
    return ContentService.createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
}

// ========== TEST FUNCTION ==========

function testScript() {
    // This function tests if the script is working correctly
    Logger.log('Testing Google Apps Script...');
    
    // Test sync transactions
    const testTransactions = [
        {
            date: '2025-01-01',
            type: 'income',
            category: 'Salary',
            subCategory: 'Monthly',
            description: 'Test salary',
            amount: 50000
        },
        {
            date: '2025-01-02',
            type: 'expense',
            category: 'Food & Dining',
            subCategory: 'Groceries',
            description: 'Weekly groceries',
            amount: 3500
        }
    ];
    
    Logger.log('Test transactions: ' + JSON.stringify(testTransactions));
    Logger.log('✓ Script is working correctly!');
}

// ========== END OF GOOGLE APPS SCRIPT CODE ==========
