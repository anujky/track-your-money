# 🔧 Sync Troubleshooting Guide - "Failed to fetch" Error

## Quick Diagnosis

The error **"❌ Sync failed: Failed to fetch"** means your web app can't reach the Google Apps Script. This guide will help you fix it in 5 minutes.

---

## ✅ Checklist: Is Your Setup Complete?

Before troubleshooting, verify you've done ALL of these:

- [ ] Created a Google Sheet named "Track Your Money"
- [ ] Opened Google Sheet → Extensions → Apps Script
- [ ] Pasted the entire GoogleAppsScript.gs code into Apps Script editor
- [ ] Saved the Apps Script project
- [ ] Ran `initializeSpreadsheet()` function (looked for 4 new sheets)
- [ ] Clicked Deploy → New deployment → Web app
- [ ] Copied the deployment URL
- [ ] Updated the APPS_SCRIPT_URL in script.js with your URL
- [ ] Saved script.js and reloaded your web app
- [ ] Browser shows no JavaScript errors (press F12 to check)

**If you haven't done these, do them NOW before continuing.**

---

## 🔍 Root Cause Analysis

### Cause 1: ❌ Apps Script URL Not Deployed Correctly

**Symptoms:**
- You see the URL in script.js but it's the OLD format
- URL looks like: `https://script.google.com/macros/d/` (incomplete)
- Deployment button wasn't clicked

**Fix:**
1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Click **Deploy** button (top right)
4. Click **New deployment** (if no existing)
5. Select **Web app** from dropdown
6. Settings:
   - **Execute as:** Your Google Account (should be selected)
   - **Who has access:** **Anyone** (important!)
7. Click **Deploy**
8. Copy the FULL URL shown
9. Update script.js:
```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_FULL_ID_HERE/userweb?v=1';
```
10. Save script.js and reload browser

---

### Cause 2: ❌ Code Not Pasted into Apps Script

**Symptoms:**
- You deployed but the sheet has no data
- Apps Script executions show errors
- Sheet doesn't have 4 tabs (Transactions, Loans, EMI Payments, Summary)

**Fix:**
1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Check if the code is there and looks like:
```javascript
// ========== GOOGLE APPS SCRIPT FOR TRACK YOUR MONEY ==========
const SHEET_NAMES = {
    TRANSACTIONS: 'Transactions',
    ...
```
4. If NOT there or incomplete:
   - Delete everything in the editor
   - Copy the ENTIRE GoogleAppsScript.gs file
   - Paste into Apps Script editor
   - Save (Ctrl+S)
5. Run `initializeSpreadsheet()`:
   - Click function dropdown (near Run button)
   - Select "initializeSpreadsheet"
   - Click **▶ Run**
   - Accept permissions
6. Check your Google Sheet now has 4 tabs
7. Re-deploy if not already done

---

### Cause 3: ❌ "Anyone" Access Not Set

**Symptoms:**
- You see error in console: "403 Forbidden"
- URL is correct but still fails
- Other apps can't access it

**Fix:**
1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Click **Deploy** button
4. Find your deployment, click settings icon (⚙️)
5. Check: **"Who has access"** = **"Anyone"**
6. If it says "Only you":
   - Click to edit
   - Change to **"Anyone"**
   - Click Update
7. Try sync again

---

### Cause 4: ❌ Browser Console Shows CORS Error

**Symptoms:**
- Press F12 to open Developer Tools
- Console tab shows: "CORS policy: No 'Access-Control-Allow-Origin' header"

**This is expected!** Google Apps Script has built-in CORS handling. Fix:

1. Make sure "Anyone" access is set (see Cause 3)
2. Check that `doPost()` function exists in your Apps Script:
```javascript
function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        // ... rest of code
    }
    // ...
}
```
3. If missing, re-paste entire GoogleAppsScript.gs code
4. Re-deploy
5. Try sync again

---

### Cause 5: ❌ URL Copied Wrong

**Symptoms:**
- URL in script.js looks incomplete
- Missing the "userweb?v=1" part at the end

**Fix:**
1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Look for your deployment (might have multiple)
4. Copy the FULL URL - it should look like:
```
https://script.google.com/macros/d/AKfycbxXXXXXXXXXXXXXXX/userweb?v=1
```
5. In script.js, replace the entire APPS_SCRIPT_URL:
```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/d/AKfycbxXXXXXXXXXXXXXXX/userweb?v=1';
```
6. Save, reload, try sync again

---

## 🛠️ Advanced Debugging

### Step 1: Check Browser Console (F12)

1. Press **F12** to open Developer Tools
2. Click **Console** tab
3. Try syncing data
4. Look for error messages:

**Error: "fetch is not supported"**
- Solution: Use a modern browser (Chrome, Firefox, Safari, Edge)

**Error: "404 Not Found"**
- Your URL is wrong or not deployed
- See Cause 1 above

**Error: "403 Forbidden"**
- "Anyone" access not set
- See Cause 3 above

**Error: "413 Payload Too Large"**
- Too much data to sync at once
- Delete some old transactions and try again
- Or sync in smaller batches

---

### Step 2: Check Google Apps Script Execution Logs

1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Click **Executions** tab (left side)
4. Look for your sync attempts:
   - ✅ **GREEN** = Success
   - ❌ **RED** = Error (click to see details)
   - ⏱️ **YELLOW** = Still running (wait a moment)

**If you see RED:**
- Click the red execution
- Read the error message
- Common errors:
  - "Sheet not found" → Run initializeSpreadsheet() again
  - "Cannot read property 'getSheetByName'" → Paste code again
  - "Missing required field" → Check data format

---

### Step 3: Test with the Apps Script Script Editor

1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Scroll to bottom and find `testScript()` function
4. Select **testScript** from function dropdown
5. Click **▶ Run**
6. Check the Executions tab to see results
7. If testScript() fails, your setup is incomplete

---

## 🔄 Re-Deployment Steps (When Everything Else Fails)

Sometimes you need to start fresh. Here's how:

### Step 1: Remove Old Deployment
1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Look for **Deployments** section (might be in dropdown)
4. Find all deployments and delete them

### Step 2: Fresh Deploy
1. Make sure the code is there and complete
2. Click **Deploy** → **New deployment**
3. Type: **Web app**
4. Execute as: **Your Google Account**
5. Access: **Anyone**
6. Click **Deploy**
7. Copy the NEW URL

### Step 3: Update Web App
1. Open script.js
2. Replace APPS_SCRIPT_URL with the NEW URL:
```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/d/[NEW_ID]/userweb?v=1';
```
3. Save and reload browser

### Step 4: Test
1. Add a test transaction
2. Click **Sync to Google Sheets**
3. Should work now!

---

## 📋 Quick Fix Checklist (Do These in Order)

Try these fixes in this order - one will work:

1. **[ ] Re-copy the Deployment URL**
   - Go to Google Sheet → Extensions → Apps Script
   - Deploy → New deployment (or use existing)
   - Copy FULL URL exactly
   - Update script.js with new URL
   - Save, reload browser
   - Try sync

2. **[ ] Check "Anyone" Access**
   - Google Sheet → Extensions → Apps Script
   - Deploy → Manage deployments
   - Settings → Change to "Anyone"
   - Try sync

3. **[ ] Re-run initializeSpreadsheet()**
   - Google Sheet → Extensions → Apps Script
   - Function dropdown → select "initializeSpreadsheet"
   - Click Run
   - Accept permissions
   - Try sync

4. **[ ] Re-paste the Code**
   - Google Sheet → Extensions → Apps Script
   - Select all code (Ctrl+A)
   - Delete it
   - Copy entire GoogleAppsScript.gs file
   - Paste into Apps Script editor
   - Save (Ctrl+S)
   - Run initializeSpreadsheet()
   - Deploy → New deployment
   - Update APPS_SCRIPT_URL
   - Try sync

5. **[ ] Clear Browser Cache**
   - Press Ctrl+Shift+Delete
   - Clear cache and cookies
   - Close and reopen your web app
   - Try sync

---

## ✅ Verify Success

After applying fixes:

1. Open your web app in browser
2. Add a test transaction (e.g., "Test Income" - $100)
3. Click **"Sync to Google Sheets"** button
4. Should see: **"✅ Successfully synced 1 transactions..."**
5. Go to Google Sheet
6. Check **Transactions** tab - should have your test data

If you see this, **you're syncing!** 🎉

---

## 🆘 Still Not Working?

**Check these:**

1. **Is your Google Account the same?**
   - Apps Script deployed under Account A
   - But you logged into browser with Account B
   - Solution: Use same Google Account everywhere

2. **Is there a firewall/proxy blocking?**
   - Try sync from different WiFi network
   - Try from phone hotspot
   - If works on hotspot but not home WiFi → network issue

3. **Is Apps Script code incomplete?**
   - Check that `doPost()` function exists
   - Check that `syncTransactions()` function exists
   - If missing, re-paste entire code

4. **Did you add too much data?**
   - Syncing 10,000 transactions might fail
   - Solution: Delete old data, keep recent
   - Or create new sheet for archive

5. **Did you wait long enough?**
   - First sync takes longer (permission checks)
   - Wait 5-10 seconds for response
   - Check Executions tab in Apps Script

---

## 💡 Pro Tips

**Tip 1: Check Execution Logs Often**
- Go to Extensions → Apps Script → Executions
- You'll see exactly what happened
- Red = error (click to see why)

**Tip 2: Test Manually First**
- Add data to web app
- Click sync
- Check Executions tab
- If red, you found the problem

**Tip 3: Use Browser Console**
- Press F12 → Console
- Sync again
- Look for error messages
- Copy error text into Google search

**Tip 4: Sync After Each Add**
- Don't wait to sync 100 transactions
- Sync after each transaction
- Easier to troubleshoot
- Ensures data is backed up

**Tip 5: Keep a Backup**
- Export CSV before syncing (button in Reports)
- Download Google Sheet as CSV
- Have a backup just in case

---

## 🎯 Common Error Messages & Fixes

### Error: "Cannot read property 'getSheetByName' of null"
- **Cause:** Apps Script not in a Google Sheet
- **Fix:** Make sure you're editing Apps Script FROM your Google Sheet (not standalone)
- **Action:** Delete this Apps Script, start over with proper setup

### Error: "Sheet 'Transactions' not found"
- **Cause:** initializeSpreadsheet() wasn't run
- **Fix:** Run initializeSpreadsheet() again
- **Check:** Google Sheet should have 4 tabs now

### Error: "Request failed with status code 403"
- **Cause:** "Anyone" access not set
- **Fix:** See Cause 3 in this guide
- **Check:** Deploy → Manage → Settings → "Anyone"

### Error: "Request failed with status code 404"
- **Cause:** Deployment URL wrong
- **Fix:** Copy deployment URL again
- **Check:** URL should have /userweb?v=1 at end

### Error: "Exceeded maximum script runtime"
- **Cause:** Syncing too much data (>1000 rows)
- **Fix:** Delete old data first
- **Alternative:** Sync in smaller batches

---

## 📞 Need More Help?

**Check the Setup Guides:**
- `GOOGLE_SHEETS_QUICK_SETUP.md` - 5-minute quick setup
- `GOOGLE_SHEETS_APPS_SCRIPT_SETUP.md` - Detailed 15-minute setup

**Check the Diagrams:**
- `GOOGLE_APPS_SCRIPT_DIAGRAMS.md` - Visual flow and architecture

**Review Your Files:**
- `script.js` - Check APPS_SCRIPT_URL is correct
- `GoogleAppsScript.gs` - Check all code is pasted
- `index.html` - Check Sync button is present

---

## 🎉 Success!

Once you see **"✅ Successfully synced"** message and data appears in Google Sheets:

1. Your data is now backed up in Google Sheets ☁️
2. You can view it anytime at sheets.google.com
3. You can create charts and analyses
4. Your Google account keeps automatic daily backups
5. You can share with family (read-only if you want)

**Congratulations! You've successfully integrated Google Sheets with Track Your Money!** 🎊

