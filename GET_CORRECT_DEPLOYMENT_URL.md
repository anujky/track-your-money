# 🚀 Get Your Correct Google Apps Script Deployment URL

## ❌ What You Have (WRONG)
```
https://script.google.com/macros/library/d/1KiK8HiC1-DGPXT0rs3QtaX5i1-LpblcvWgbaGZKpMvOBnNa-g4fS4IPl/2
                          ↑
                      /library/ (This is a LIBRARY, not a web app)
```

## ✅ What You Need (CORRECT)
```
https://script.google.com/macros/d/[DEPLOYMENT_ID]/userweb?v=1
                          ↑
                      /macros/d/ (This is a WEB APP deployment)
```

---

## 📋 Step-by-Step: Get the Correct Deployment URL

### Step 1: Open Your Google Sheet
1. Go to https://sheets.google.com
2. Find and open your **"Track Your Money"** spreadsheet
3. Click **Extensions** (top menu)
4. Click **Apps Script**

### Step 2: Look at the Top Right
In the Apps Script editor, look at the **top right area**. You should see buttons like:
- **Untitled project** (or project name)
- **Run** button
- **Deploy** button (or dropdown)

### Step 3: Click Deploy Button
1. Click the **Deploy** button (or dropdown next to it)
2. You'll see options:
   - **Manage deployments**
   - **New deployment**
   - (Possibly your old library URL)

### Step 4: Go to Manage Deployments
1. Click **Manage deployments** (or similar option)
2. You'll see a list of all deployments:
   - Might show **Library** (the one you just showed me)
   - Might show **Web app** (if you deployed before)
   - Might be empty

### Step 5: Delete Old Deployment (if exists)
1. Look for any **Library** or old **Web app** deployments
2. Click the **trash icon** or **delete** button next to it
3. Confirm deletion

### Step 6: Create New Web App Deployment
1. Click **"+ Create deployment"** or **"New deployment"** button
2. Click the **dropdown** that says "Select type"
3. Select **"Web app"** (NOT "Library")
4. You'll see two more fields:

   **Field 1: "Execute as"**
   - Should already show your Google account email
   - Keep it as is

   **Field 2: "Who has access"**
   - Click the dropdown
   - Select **"Anyone"** (⚠️ IMPORTANT!)
   - If you select "Only you" it won't work

5. Click the blue **"Deploy"** button

### Step 7: Copy Your Deployment URL
1. A popup appears with your **Deployment URL**
2. The URL will look like:
```
https://script.google.com/macros/d/AKfycbw1234567890abcdefghijklmnop/userweb?v=1
                          ↑ /macros/d/ ← KEY!
                          ↑ /userweb?v=1 ← KEY!
```

3. **Click "Copy" or select all and copy (Ctrl+C)**
4. Save this URL somewhere (notepad, etc.) for a moment

### Step 8: Update Your Web App
1. Go back to your **Track Your Money web app** folder
2. Open **script.js** file
3. Find line around **681** - it should say:
```javascript
const APPS_SCRIPT_URL = '...';
```

4. **Replace the entire URL** with your new URL:
```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/d/AKfycbw1234567890abcdefghijklmnop/userweb?v=1';
```

5. **Save the file** (Ctrl+S)

### Step 9: Reload Your Web App
1. Go to your web app in browser
2. Press **F5** or **Ctrl+R** to reload
3. Clear cache if needed (Ctrl+Shift+Delete)

### Step 10: Test the Sync
1. Add a test transaction (e.g., "Test Income" - amount 100)
2. Click **"Sync to Google Sheets"** button
3. Wait a few seconds
4. Should see: **"✅ Successfully synced..."**

---

## 🆘 If You're Stuck Finding Deploy Button

### In NEW Google Apps Script Editor (Recommended)
1. Top right corner, you'll see: **[Project name] ⋮** (three dots)
2. Click the **⋮** (three dots)
3. Click **Deployments**
4. Click **⚙️** (manage) to see existing
5. Click **"+ Create deployment"** to make new one

### In OLD Google Apps Script Editor
1. Top menu: **Publish** → **Deploy as web app**
2. Or: **File** → **Manage versions** → **Save new version**
3. Then go back to **Publish** → **Deploy as web app**

---

## 📸 Visual Guide: Where to Click

```
Google Apps Script Editor (Top Right)
┌─────────────────────────────────────────┐
│  [Project Name]  Run ⋮   Deploy  🔔    │
│                                         │
│  Click here ↓                           │
│  Deploy → Manage deployments            │
│          → New deployment               │
└─────────────────────────────────────────┘
                ↓
        Deployment Settings
┌─────────────────────────────────────────┐
│  Type: [Web app ▼]   ← Select this!    │
│                                         │
│  Execute as: your@gmail.com             │
│  Who has access: [Anyone ▼]  ← Select! │
│                                         │
│  [Deploy]  [Cancel]                     │
└─────────────────────────────────────────┘
                ↓
        Deployment URL Shown
┌─────────────────────────────────────────┐
│  Your deployment is live!               │
│                                         │
│  https://script.google.com/macros/d/... │
│  [Copy]                                 │
│                                         │
│  Close this dialog ✕                    │
└─────────────────────────────────────────┘
```

---

## ✅ Checklist Before Testing

- [ ] Opened Google Sheet → Extensions → Apps Script
- [ ] Went to Deployments/Manage deployments
- [ ] Deleted old Library or Web app deployment
- [ ] Created NEW deployment as **"Web app"**
- [ ] Set **"Who has access"** to **"Anyone"**
- [ ] Clicked Deploy
- [ ] Copied the NEW URL (should have `/macros/d/` and `/userweb?v=1`)
- [ ] Updated APPS_SCRIPT_URL in script.js
- [ ] Saved script.js
- [ ] Reloaded web app in browser

---

## 🎯 Key Points to Remember

1. **URL Must Have:**
   - ✅ `/macros/d/` (NOT `/macros/s/` or `/library/`)
   - ✅ `/userweb?v=1` (NOT `/exec`)

2. **Deployment Must Have:**
   - ✅ Type: **Web app** (NOT Library or Script)
   - ✅ Access: **Anyone** (NOT "Only you")

3. **Code Must Be:**
   - ✅ Pasted from `GoogleAppsScript.gs` into Apps Script editor
   - ✅ Includes `doPost()` function
   - ✅ Includes `syncTransactions()` function
   - ✅ Includes `initializeSpreadsheet()` function

---

## 🚨 Common Mistakes

❌ **Mistake 1:** Using Library URL
- You showed: `/macros/library/d/...`
- Need: `/macros/d/.../userweb?v=1`

❌ **Mistake 2:** Using Old /exec URL
- Wrong: `/macros/s/.../exec`
- Correct: `/macros/d/.../userweb?v=1`

❌ **Mistake 3:** Access set to "Only you"
- Won't work from web app
- Must be **"Anyone"**

❌ **Mistake 4:** Wrong type selected
- Selected Library instead of Web app
- Select **Web app** type

---

## 💡 Pro Tip: Save Your URL Safely

Once you get the correct URL, save it somewhere:
- Notepad file
- Email to yourself
- Keep a backup

So if you ever need to redeploy, you have the ID reference.

---

## 🆘 Still Confused?

If you can't find the Deploy button or Deployments:

1. **Try switching editor versions:**
   - Top right, look for a switch or settings
   - Try switching to "New Apps Script experience"

2. **Ask me to guide you live:**
   - Take a screenshot of your Google Apps Script editor
   - Show me what you see
   - I can tell you exactly where to click

---

## ✅ After You Get the URL

Once you have the correct `/macros/d/.../userweb?v=1` URL:

1. Update script.js
2. Save it
3. Reload web app
4. Try sync
5. **Should work! 🎉**

Let me know your new deployment URL once you create it!

