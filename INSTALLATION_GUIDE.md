# Installation Guide - Fix "npm is not recognized"

## Problem

You're seeing this error:
```
npm : The term 'npm' is not recognized
```

This means **Node.js is not installed** on your computer.

## Solution: Install Node.js

### Step 1: Download Node.js

1. **Open your web browser**
2. **Go to**: https://nodejs.org/
3. **Download** the **LTS version** (Long Term Support)
   - Look for the green button that says "LTS"
   - For Windows, it will be something like "18.x.x LTS"
4. **Click Download** - it will download a file like `node-v18.x.x-x64.msi`

### Step 2: Install Node.js

1. **Find the downloaded file** (usually in your Downloads folder)
2. **Double-click** the installer file
3. **Follow the installation wizard**:
   - Click "Next"
   - Accept the license agreement
   - Click "Next" (keep default installation path)
   - **IMPORTANT**: Make sure "Add to PATH" is checked ✓
   - Click "Next"
   - Click "Install"
   - Wait for installation to complete
   - Click "Finish"

### Step 3: Verify Installation

1. **Close all open terminals/command prompts**
2. **Open a NEW terminal** (PowerShell or Command Prompt)
3. **Type this command**:
   ```bash
   node --version
   ```
4. **You should see**: `v18.x.x` or similar
5. **Type this command**:
   ```bash
   npm --version
   ```
6. **You should see**: `9.x.x` or similar

If you see version numbers, **Node.js is installed correctly!** ✅

### Step 4: Install Project Dependencies

Now that Node.js is installed, install the project dependencies:

**Open PowerShell or Command Prompt in your project folder**

1. **Navigate to your project**:
   ```bash
   cd "C:\Users\Raphael Ilom\Desktop\CBT PRACTICE\exam-catalyst-2026-2027"
   ```

2. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   ```
   Wait for it to complete (may take 2-5 minutes)

3. **Install frontend dependencies**:
   ```bash
   cd ..
   cd frontend
   npm install
   ```
   Wait for it to complete (may take 2-5 minutes)

### Step 5: Run the Application

**Open TWO separate terminals/PowerShell windows**

**Terminal 1 - Backend:**
```bash
cd "C:\Users\Raphael Ilom\Desktop\CBT PRACTICE\exam-catalyst-2026-2027\backend"
npm start
```

You should see:
```
Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd "C:\Users\Raphael Ilom\Desktop\CBT PRACTICE\exam-catalyst-2026-2027\frontend"
npm start
```

Your browser should automatically open to http://localhost:3000

## Quick Checklist

- [ ] Download Node.js from https://nodejs.org/
- [ ] Install Node.js (make sure "Add to PATH" is checked)
- [ ] Close and reopen terminal
- [ ] Verify: `node --version` works
- [ ] Verify: `npm --version` works
- [ ] Run: `cd backend && npm install`
- [ ] Run: `cd frontend && npm install`
- [ ] Start backend: `cd backend && npm start`
- [ ] Start frontend: `cd frontend && npm start`
- [ ] Open: http://localhost:3000

## Troubleshooting

### Problem: "node is not recognized" after installation

**Solution:**
1. Close ALL terminal windows
2. Restart your computer
3. Open a NEW terminal
4. Try `node --version` again

### Problem: Installation is slow

**Solution:**
- This is normal
- npm downloads many files
- Wait 5-10 minutes
- Don't close the terminal

### Problem: "EACCES" or permission errors

**Solution:**
1. Close terminal
2. Right-click PowerShell
3. Select "Run as Administrator"
4. Try installation again

### Problem: Port 3000 or 5000 already in use

**Solution:**
When starting, it will ask if you want to use a different port.
Type `Y` and press Enter.

## Alternative: Using Node Version Manager (nvm)

If you want more control over Node.js versions:

1. **Download nvm-windows**: https://github.com/coreybutler/nvm-windows/releases
2. **Install nvm**
3. **Open terminal as Administrator**
4. **Install Node.js**:
   ```bash
   nvm install 18
   nvm use 18
   ```

## Video Tutorial

If you prefer video instructions, search YouTube for:
- "How to install Node.js on Windows"
- "Install npm on Windows"

## After Installation

Once Node.js is installed and the app is running:

1. **Register an account** at http://localhost:3000
2. **Login**
3. **Go to Practice**
4. **Select a subject**
5. **Start practicing!**

## Need More Help?

If you're still having issues:

1. **Check Node.js installation**:
   ```bash
   where node
   where npm
   ```
   These should show file paths

2. **Check your PATH**:
   - Search "Environment Variables" in Windows
   - Check if Node.js path is in System PATH

3. **Reinstall Node.js**:
   - Uninstall Node.js from Control Panel
   - Restart computer
   - Install again from https://nodejs.org/

## Summary

**The main issue**: Node.js is not installed

**The solution**: 
1. Download from https://nodejs.org/
2. Install it
3. Restart terminal
4. Run `npm install` in backend and frontend folders
5. Start the servers

That's it! Once Node.js is installed, everything will work. 🚀
