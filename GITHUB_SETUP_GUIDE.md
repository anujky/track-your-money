# 📦 GitHub Setup Guide - Track Your Money

## Overview

This guide shows you how to create a GitHub repository and push your Track Your Money app code.

---

## ✨ Why GitHub?

```
✅ Free code hosting
✅ Version control
✅ Integrates with Vercel
✅ Collaboration ready
✅ Automatic deployment
✅ Code backup
✅ Easy to update
```

---

## 🎯 Step 1: Create GitHub Account

### Sign Up

1. Go to **https://github.com**
2. Click **"Sign up"** button
3. Enter your **email**
4. Create **password**
5. Choose **username** (e.g., `yourname`)
6. Verify email
7. ✅ Account created!

---

## 📁 Step 2: Create Repository

### Via Web Browser (Easiest)

1. **Login to GitHub**
   - Go to https://github.com
   - Click your avatar (top right)
   - Click "Your repositories"

2. **Click "New" Button**
   - Green button on left side
   - Click it

3. **Fill Repository Details**
   - **Repository name:** `track-your-money`
   - **Description:** "Personal Finance Manager"
   - **Visibility:** Choose "Public" or "Private"
     - Public: Anyone can see
     - Private: Only you can see
   - **Initialize with README:** Check this box

4. **Click "Create Repository"**
   - ✅ Repository created!

---

## 📤 Step 3: Upload Your Files

### Option A: GitHub Web Upload (Easiest)

**Perfect if you just want to upload files once:**

1. **Go to your repository**
2. **Click "Add file"** → **"Upload files"**
3. **Drag and drop files or click to browse:**
   - `index.html`
   - `script.js`
   - `styles.css`
   - `GoogleAppsScript.gs`
   - Any other files

4. **Scroll down**
   - Add commit message: "Add Track Your Money app"
   - Click "Commit changes"
   - ✅ Files uploaded!

### Option B: Git Command Line (Recommended)

**Better if you plan to update frequently:**

#### Step 1: Install Git

1. Download: https://git-scm.com/download/win
2. Install with default options
3. Restart your computer
4. Open PowerShell and verify:

```powershell
git --version
```

Should show: `git version 2.x.x...`

#### Step 2: Configure Git

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual name and GitHub email.

#### Step 3: Upload Files

**In PowerShell, navigate to your project folder:**

```powershell
cd "C:\Users\Anuj Kumar\OneDrive\Desktop\Track Your Money"
```

**Run these commands:**

```powershell
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Track Your Money app"

# Add GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/track-your-money.git

# Rename branch to main (GitHub default)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username**

#### What Each Command Does

```
git init                          → Initialize git in folder
git add .                         → Stage all files for commit
git commit -m "message"           → Save changes with message
git remote add origin URL         → Connect to GitHub repository
git branch -M main                → Rename master to main
git push -u origin main           → Upload to GitHub
```

---

## 🔑 GitHub Access Token (If Git Command Fails)

If you get authentication error:

### Create Personal Access Token

1. Go to GitHub Settings
2. Click "Developer settings" (bottom left)
3. Click "Personal access tokens"
4. Click "Generate new token"
5. **Token name:** `git-access`
6. **Expiration:** 90 days
7. **Select scopes:** Check `repo`
8. Click "Generate token"
9. **Copy the token** (you won't see it again!)

### Use Token for Git

```powershell
# When Git asks for password, use the token instead
# Paste the token you copied above
```

---

## 📝 Repository Structure

After uploading, your GitHub repo should look like:

```
track-your-money/
├── index.html
├── script.js
├── styles.css
├── GoogleAppsScript.gs
├── README.md
└── .gitignore (optional)
```

---

## 📄 Create README.md (Optional but Recommended)

This file shows when people visit your repo:

1. In your GitHub repo
2. Click "Add file" → "Create new file"
3. Name: `README.md`
4. Paste this content:

```markdown
# 💰 Track Your Money - Personal Finance Manager

A web app to track your income, expenses, savings, and investments with Google Sheets integration.

## Features

- 📊 Dashboard with charts
- 💰 Track transactions (income, expenses, savings, investments)
- 🏦 Loan management with EMI calculation
- 📈 Monthly and yearly reports
- 📱 Mobile responsive
- ☁️ Google Sheets sync
- 💾 Automatic backup

## Quick Start

1. Open `index.html` in browser
2. Add transactions
3. View dashboard
4. Sync to Google Sheets

## Files

- `index.html` - Main HTML file
- `script.js` - JavaScript logic
- `styles.css` - Styling

## Links

- [Deployed App](#)
- [Documentation](#)

## Author

Your Name

## License

MIT
```

5. Click "Commit new file"

---

## 🔄 Update Your Repository

### After Making Changes

**When you modify files locally:**

```powershell
# Navigate to project folder
cd "C:\Users\Anuj Kumar\OneDrive\Desktop\Track Your Money"

# Check what changed
git status

# Stage changes
git add .

# Commit with message
git commit -m "Add delete feature"

# Push to GitHub
git push
```

### Example Changes to Commit

```
git commit -m "Add delete transaction feature"
git commit -m "Fix Google Sheets sync bug"
git commit -m "Improve mobile responsiveness"
git commit -m "Update documentation"
```

---

## 🌳 Git Workflow

### Typical Workflow

```
1. Make changes to files
   └─ Edit index.html, script.js, styles.css

2. Check status
   └─ git status

3. Stage changes
   └─ git add .

4. Commit
   └─ git commit -m "Description"

5. Push
   └─ git push

6. Verify on GitHub
   └─ Go to https://github.com/username/track-your-money
   └─ See your changes!
```

### Visual Workflow

```
Local Files
    ↓
git add .       (Stage)
    ↓
git commit      (Save locally)
    ↓
git push        (Upload to GitHub)
    ↓
GitHub Repository
    ↓
Vercel Detects Change
    ↓
Auto Deploy
    ↓
Live App Updated! 🎉
```

---

## 🔒 .gitignore File (Optional)

To exclude files from Git:

1. Create file named `.gitignore`
2. Add this content:

```
# Environment files
.env
.env.local

# System files
.DS_Store
Thumbs.db

# Temp files
*.tmp
*.log

# Node modules (if used)
node_modules/
```

This prevents secrets from being uploaded to GitHub.

---

## 👥 Collaboration (Optional)

### Add Collaborators

1. Go to your repository
2. Click "Settings"
3. Click "Collaborators" (left menu)
4. Click "Add people"
5. Search GitHub username
6. Select user
7. Send invitation

Now they can collaborate on the project!

---

## 📊 Monitor Your Repository

### View Repository Stats

1. Click "Insights" tab
2. See:
   - Commit history
   - Contributors
   - Code frequency
   - Network graph

### View Commit History

1. Click "Commits" link
2. See all changes made
3. Click any commit to see details

### Compare Versions

1. Click "Compare" dropdown
2. Select two versions
3. See differences

---

## 🗑️ Delete Repository (If Needed)

**⚠️ This cannot be undone!**

1. Go to repository
2. Click "Settings"
3. Scroll to bottom
4. Click "Delete this repository"
5. Type repository name to confirm
6. Click "I understand the consequences, delete this repository"

---

## 🆘 Troubleshooting

### Git Command Not Found

**Problem:** `git` command not recognized

**Solution:**
1. Restart PowerShell
2. Reinstall Git from https://git-scm.com
3. Make sure Git is in PATH

### Authentication Failed

**Problem:** Git asks for password repeatedly

**Solution:**
1. Create Personal Access Token (see section above)
2. Use token as password when prompted
3. Or configure SSH keys

### Files Not Showing in GitHub

**Problem:** Pushed files but don't see them in GitHub

**Solution:**
1. Refresh GitHub page
2. Check you pushed to correct branch: `git branch`
3. Verify files in correct folder: `git status`
4. Push again: `git push`

### Large File Error

**Problem:** File too large to upload (>100MB)

**Solution:**
1. Don't store large files in Git
2. Use .gitignore to exclude them
3. Store large files elsewhere
4. Add link to .gitignore

---

## 💡 Best Practices

### Commit Messages

```
✅ Good:
"Add delete transaction feature"
"Fix Google Sheets sync CORS error"
"Improve mobile responsiveness"

❌ Bad:
"Update"
"Fix"
"Changes"
"asdfgh"
```

### Commit Frequency

```
✅ Good:
- Commit after completing a feature
- Commit after fixing a bug
- Commit with clear, single purpose

❌ Bad:
- Commit every 5 minutes
- Commit multiple unrelated changes
- Commit with no message
```

### File Organization

```
✅ Keep files in root:
index.html
script.js
styles.css

❌ Avoid deep folders:
src/
  ├── app/
  │   ├── index.html
  │   ├── script.js
```

---

## 🎓 Git Cheat Sheet

### Common Commands

```powershell
# Check status
git status

# See difference
git diff

# View history
git log

# View one commit
git show COMMIT_HASH

# Undo last commit (keep files)
git reset --soft HEAD~1

# Undo last commit (lose changes)
git reset --hard HEAD~1

# See all branches
git branch -a

# Create new branch
git branch feature-name

# Switch branch
git checkout feature-name

# Merge branch
git merge feature-name

# Delete branch
git branch -d feature-name
```

---

## 📞 Resources

### GitHub Help

- Official Docs: https://docs.github.com
- Git Basics: https://docs.github.com/en/get-started
- Problems: https://github.com/contact

### Git Documentation

- Official Site: https://git-scm.com
- Documentation: https://git-scm.com/doc
- Tutorials: https://git-scm.com/book

---

## ✅ Checklist

Before deploying to Vercel:

- [ ] GitHub account created
- [ ] Repository created
- [ ] Files uploaded (index.html, script.js, styles.css)
- [ ] README.md created
- [ ] .gitignore created (if needed)
- [ ] Files committed with message
- [ ] Files pushed to GitHub
- [ ] Verified files appear in GitHub repo

---

## 🎉 Summary

| Step | Time | Action |
|------|------|--------|
| 1 | 2 min | Create GitHub account |
| 2 | 2 min | Create repository |
| 3 | 2 min | Upload files |
| 4 | 1 min | Create README.md |
| 5 | 1 min | Verify on GitHub |
| **Total** | **8 min** | **Ready for Vercel!** |

---

**Your GitHub repository is ready!** 

Next step: **Deploy to Vercel** using VERCEL_DEPLOYMENT_GUIDE.md

