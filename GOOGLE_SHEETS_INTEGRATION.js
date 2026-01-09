/**
 * Google Sheets Backend Integration
 * 
 * This file contains example code for integrating Track Your Money with Google Sheets
 * for cloud-based data storage and backup.
 * 
 * Prerequisites:
 * 1. Node.js installed
 * 2. Google Cloud Project created
 * 3. Google Sheets API enabled
 * 4. OAuth2 credentials downloaded
 * 5. Install dependencies: npm install express google-auth-library googleapis cors
 */

// ========== INSTALLATION & SETUP ==========
/*
1. Create Google Cloud Project:
   - Go to https://console.cloud.google.com
   - Create a new project
   - Enable Google Sheets API
   - Enable Google Drive API

2. Create OAuth2 Credentials:
   - Go to Credentials
   - Create OAuth 2.0 Client ID (Web Application)
   - Add authorized redirect URIs
   - Download JSON credentials

3. Create .env file with:
   CLIENT_ID=your_client_id
   CLIENT_SECRET=your_client_secret
   REDIRECT_URL=http://localhost:3000/auth/callback
   SHEET_ID=your_spreadsheet_id

4. Create Google Sheet with headers:
   A: Date
   B: Type
   C: Category
   D: SubCategory
   E: Description
   F: Amount
   G: Sync Timestamp
*/

const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Configure OAuth2
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

// Store tokens in session (use database in production)
let authTokens = {};

/**
 * Step 1: Generate Google OAuth URL
 * User redirects to this URL to authorize the app
 */
app.get('/auth/url', (req, res) => {
    const scopes = [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file'
    ];

    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent'
    });

    res.json({ authUrl: url });
});

/**
 * Step 2: Handle OAuth callback
 * Google redirects back here with authorization code
 */
app.get('/auth/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        
        // Store tokens (implement proper storage)
        authTokens = tokens;

        res.send('✅ Authorization successful! You can close this window.');
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).send('Authorization failed');
    }
});

/**
 * Sync transactions to Google Sheets
 * POST /api/sync-sheets
 * Body: { transactions: [...], loans: [...] }
 */
app.post('/api/sync-sheets', async (req, res) => {
    try {
        if (!authTokens.access_token) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        oauth2Client.setCredentials(authTokens);

        const { transactions, loans } = req.body;
        const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

        const timestamp = new Date().toISOString();

        // 1. Clear and update transactions sheet
        await sheets.spreadsheets.values.clear({
            spreadsheetId: process.env.SHEET_ID,
            range: 'Transactions!A2:G'
        });

        const transactionValues = transactions.map(t => [
            t.date,
            t.type,
            t.category,
            t.subCategory,
            t.description || '',
            t.amount,
            timestamp
        ]);

        if (transactionValues.length > 0) {
            await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.SHEET_ID,
                range: 'Transactions!A2',
                valueInputOption: 'RAW',
                resource: {
                    values: transactionValues
                }
            });
        }

        // 2. Update loans sheet
        if (loans && loans.length > 0) {
            await sheets.spreadsheets.values.clear({
                spreadsheetId: process.env.SHEET_ID,
                range: 'Loans!A2:H'
            });

            const loanValues = loans.map(l => [
                l.name,
                l.principal,
                l.rate,
                l.tenure,
                l.startDate,
                l.emi,
                l.paidAmount,
                l.principal - l.paidAmount
            ]);

            if (loanValues.length > 0) {
                await sheets.spreadsheets.values.append({
                    spreadsheetId: process.env.SHEET_ID,
                    range: 'Loans!A2',
                    valueInputOption: 'RAW',
                    resource: {
                        values: loanValues
                    }
                });
            }
        }

        res.json({
            success: true,
            message: 'Data synced successfully',
            syncedRecords: transactions.length,
            timestamp
        });

    } catch (error) {
        console.error('Sync error:', error);
        res.status(500).json({ error: 'Sync failed', details: error.message });
    }
});

/**
 * Get data from Google Sheets
 * GET /api/fetch-sheets
 */
app.get('/api/fetch-sheets', async (req, res) => {
    try {
        if (!authTokens.access_token) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        oauth2Client.setCredentials(authTokens);
        const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

        // Fetch transactions
        const transResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: 'Transactions!A2:G'
        });

        const transactions = (transResponse.data.values || []).map(row => ({
            date: row[0],
            type: row[1],
            category: row[2],
            subCategory: row[3],
            description: row[4],
            amount: parseFloat(row[5]),
            syncedAt: row[6]
        }));

        // Fetch loans
        const loanResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: 'Loans!A2:H'
        });

        const loans = (loanResponse.data.values || []).map(row => ({
            name: row[0],
            principal: parseFloat(row[1]),
            rate: parseFloat(row[2]),
            tenure: parseInt(row[3]),
            startDate: row[4],
            emi: parseFloat(row[5]),
            paidAmount: parseFloat(row[6]),
            dueAmount: parseFloat(row[7])
        }));

        res.json({
            success: true,
            transactions,
            loans,
            fetchedAt: new Date().toISOString()
        });

    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'Fetch failed', details: error.message });
    }
});

/**
 * Create a new sheet template
 * POST /api/create-sheet
 */
app.post('/api/create-sheet', async (req, res) => {
    try {
        oauth2Client.setCredentials(authTokens);
        const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

        // Create new spreadsheet
        const response = await sheets.spreadsheets.create({
            resource: {
                properties: {
                    title: `Track Your Money - ${new Date().toLocaleDateString()}`
                },
                sheets: [
                    {
                        properties: { title: 'Transactions' },
                        data: [{
                            rowData: [{
                                values: [
                                    { userEnteredValue: { stringValue: 'Date' } },
                                    { userEnteredValue: { stringValue: 'Type' } },
                                    { userEnteredValue: { stringValue: 'Category' } },
                                    { userEnteredValue: { stringValue: 'SubCategory' } },
                                    { userEnteredValue: { stringValue: 'Description' } },
                                    { userEnteredValue: { stringValue: 'Amount' } },
                                    { userEnteredValue: { stringValue: 'Sync Timestamp' } }
                                ]
                            }]
                        }]
                    },
                    {
                        properties: { title: 'Loans' },
                        data: [{
                            rowData: [{
                                values: [
                                    { userEnteredValue: { stringValue: 'Loan Name' } },
                                    { userEnteredValue: { stringValue: 'Principal' } },
                                    { userEnteredValue: { stringValue: 'Interest Rate %' } },
                                    { userEnteredValue: { stringValue: 'Tenure (Months)' } },
                                    { userEnteredValue: { stringValue: 'Start Date' } },
                                    { userEnteredValue: { stringValue: 'EMI' } },
                                    { userEnteredValue: { stringValue: 'Amount Paid' } },
                                    { userEnteredValue: { stringValue: 'Due Amount' } }
                                ]
                            }]
                        }]
                    }
                ]
            }
        });

        const sheetId = response.data.spreadsheetId;

        res.json({
            success: true,
            sheetId,
            message: 'Sheet created successfully',
            sheets: response.data.sheets
        });

    } catch (error) {
        console.error('Create sheet error:', error);
        res.status(500).json({ error: 'Failed to create sheet' });
    }
});

/**
 * Refresh token when expired
 */
app.post('/api/refresh-token', async (req, res) => {
    try {
        if (!authTokens.refresh_token) {
            return res.status(401).json({ error: 'No refresh token available' });
        }

        oauth2Client.setCredentials(authTokens);
        const { credentials } = await oauth2Client.refreshAccessToken();
        authTokens = credentials;

        res.json({ success: true, message: 'Token refreshed' });

    } catch (error) {
        console.error('Token refresh error:', error);
        res.status(500).json({ error: 'Token refresh failed' });
    }
});

/**
 * Logout and clear tokens
 */
app.post('/api/logout', (req, res) => {
    authTokens = {};
    res.json({ success: true, message: 'Logged out' });
});

/**
 * Check authentication status
 */
app.get('/api/auth-status', (req, res) => {
    res.json({
        authenticated: !!authTokens.access_token,
        hasRefreshToken: !!authTokens.refresh_token
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Auth URL: http://localhost:${PORT}/auth/url`);
});

// ========== FRONTEND INTEGRATION ==========
/*
Add this to your frontend (script.js) to use the backend:

async function syncWithGoogleSheets() {
    try {
        // Check if authenticated
        const statusRes = await fetch('http://localhost:3000/api/auth-status');
        const { authenticated } = await statusRes.json();

        if (!authenticated) {
            // Get auth URL and redirect
            const authRes = await fetch('http://localhost:3000/auth/url');
            const { authUrl } = await authRes.json();
            window.open(authUrl, '_blank');
            
            // After user authorizes, proceed with sync
            setTimeout(syncWithGoogleSheets, 2000);
            return;
        }

        // Sync data
        const response = await fetch('http://localhost:3000/api/sync-sheets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                transactions: appData.transactions,
                loans: appData.loans
            })
        });

        const result = await response.json();
        if (result.success) {
            showNotification('✅ Data synced to Google Sheets!', 'success');
        }
    } catch (error) {
        console.error('Sync error:', error);
        showNotification('❌ Sync failed. Please try again.', 'error');
    }
}
*/

// ========== PACKAGE.JSON ==========
/*
{
  "name": "track-your-money-backend",
  "version": "1.0.0",
  "description": "Backend server for Track Your Money app with Google Sheets integration",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "google-auth-library": "^9.0.0",
    "googleapis": "^105.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0"
  }
}
*/
