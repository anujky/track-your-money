# 🔧 Fix: Deploy Apps Script Correctly (Get New URL Format)

## Problem
Your current URL format is **OLD**:
```
https://script.google.com/macros/s/AKfycbxnMHdvjpG-EYAhTYjEmdXKfJQWZ0TKjzI8OzAbBXJncXu1w_yKsZy1jo2MZm75al9-/exec
                                     ↑ /macros/s/ ← OLD FORMAT (doesn't work for web apps)
```

Your URL needs to be **NEW format**:
```
https://script.google.com/macros/d/[DEPLOYMENT_ID]/userweb?v=1
                                     ↑ /macros/d/ ← NEW FORMAT (web app deployment)
```

---

## ✅ Fix: Create a NEW Deployment (5 minutes)

### Step 1: Open Google Apps Script

1. Open your **Google Sheet** (Track Your Money)
2. Click **Extensions** (top menu)
3. Click **Apps Script**
4. You should see your code in the editor

### Step 2: Delete OLD Deployment

1. Look for **"Deployments"** section (top right area)
2. You might see a dropdown or button
3. Click on existing deployment/dropdown
4. Look for settings or manage deployments
5. **Delete the old deployment** (the one ending with `/exec`)

**How to find Deployments:**
- Click the dropdown arrow next to your project name (top left)
- OR click the **"Deploy"** button → look for **"Manage deployments"**

### Step 3: Create NEW Deployment

1. Click **"Deploy"** button (top right)
2. Click **"New deployment"** (or **"+ New"**)
3. Click the **dropdown** and select **"Web app"**

### Step 4: Configure Deployment

Fill in these settings:

```
Execute as: [Your Google Account Name]
        ↓
       (This should be pre-selected)

Who has access: Anyone
        ↓
    (IMPORTANT - must be "Anyone")
```

### Step 5: Deploy

1. Click the blue **"Deploy"** button
2. A dialog shows your **Deployment URL**
3. **Copy the FULL URL** - it will look like:

```
https://script.google.com/macros/d/[LONG_ID_STRING]/userweb?v=1
```

**⚠️ IMPORTANT:** 
- Make sure you see `/macros/d/` (not `/macros/s/`)
- Make sure you see `/userweb?v=1` (not `/exec`)
- Copy the ENTIRE URL exactly as shown

### Step 6: Update Your Web App

1. Open `script.js` in your project
2. Find line ~681:
```javascript
const APPS_SCRIPT_URL = '...';
```

3. Replace with your NEW URL:
```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/d/[YOUR_NEW_ID]/userweb?v=1';
```

Example:
```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/d/AKfycbw1234567890ABCDEFGHIJ/userweb?v=1';
```

### Step 7: Test

1. Save `script.js`
2. Reload your web app in browser (F5 or Ctrl+R)
3. Add a test transaction
4. Click **"Sync to Google Sheets"**
5. Should see: **"✅ Successfully synced..."**

---

## 🚨 If You Can't Find Deployments

Sometimes the UI is hidden. Here's an alternative:

### Method A: Use Deployment Sidebar
1. In Apps Script editor, click the **"Deployments"** icon (left sidebar)
2. You'll see all deployments
3. Delete old ones
4. Click **"+ Create deployment"**
5. Choose **Web app**
6. Configure and deploy

### Method B: New Editor
1. If you're using **old Google Apps Script editor**
2. Try switching to **new Apps Script editor** (there's a toggle option)
3. Repeat deployment steps above

---

## 🔍 Verify Your Deployment Works

After deploying with new URL:

1. **Check that "Anyone" can access:**
   - Deployments → Find your deployment
   - Click settings (gear icon)
   - Verify: "Who has access" = **"Anyone"**
   - If not, change it and save

2. **Check Apps Script Code:**
   - Make sure `doPost()` function exists
   - Make sure `syncTransactions()` function exists
   - If missing, you didn't paste the code correctly
   - Re-paste `GoogleAppsScript.gs` code

3. **Run initializeSpreadsheet:**
   - Function dropdown → select "initializeSpreadsheet"
   - Click **Run**
   - Check your Google Sheet now has 4 tabs:
     - Transactions
     - Loans
     - EMI Payments
     - Summary

---

## 📋 Checklist Before Testing

- [ ] Deleted old deployment (ending with `/exec`)
- [ ] Created new deployment as "Web app"
- [ ] Set access to "Anyone"
- [ ] Copied new URL with `/macros/d/` and `/userweb?v=1`
- [ ] Updated `APPS_SCRIPT_URL` in script.js
- [ ] Saved script.js
- [ ] Reloaded web app in browser
- [ ] Verified 4 tabs exist in Google Sheet
- [ ] Added test data to web app

---

## 🎯 Quick Visual Reference

**OLD URL (DOESN'T WORK):**
```
https://script.google.com/macros/s/[ID]/exec
                                    ↑      ↑
                              /macros/s/   /exec
                              (WRONG)      (WRONG)
```

**NEW URL (WORKS):**
```
https://script.google.com/macros/d/[ID]/userweb?v=1
                                    ↑              ↑
                              /macros/d/    /userweb?v=1
                              (CORRECT)     (CORRECT)
```

---

## 🆘 Still Not Working?

1. **Check browser console (F12):**
   - Look for error messages
   - Copy error and share with me

2. **Check Apps Script Executions:**
   - Apps Script → Executions tab
   - Look for RED entries (errors)
   - Click to see what went wrong

3. **Verify deployment settings:**
   - Deployments → Your deployment → Settings
   - Make sure "Anyone" is set
   - Deployment type = "Web app"

4. **Try in Incognito:**
   - Even though you tried, try again with new URL
   - No cache issues in incognito mode

---

## ✅ Success Indicators

When it works, you'll see:

1. Browser notification: **"✅ Successfully synced X transactions..."**
2. Google Sheet **Transactions** tab has your data
3. Browser console shows: `"Sync Details: {success: true, count: X, ...}"`

---

**Do this now and let me know if the sync works!** 🚀

