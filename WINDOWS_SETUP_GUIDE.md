# Windows Setup Guide - Complete Instructions

## 🎯 What You Need to Do

Follow these steps **in order**:

---

## Step 1: Install Node.js (REQUIRED)

### Why?
Node.js is required to run this application. Without it, nothing will work.

### How to Install:

1. **Open your web browser**

2. **Go to this website**: 
   ```
   https://nodejs.org/
   ```

3. **You'll see two big buttons**:
   - One says "LTS" (Long Term Support) - **CLICK THIS ONE** ✅
   - One says "Current" - Don't click this

4. **Download will start** (file is about 30MB)
   - File name will be like: `node-v18.19.0-x64.msi`
   - It will be in your Downloads folder

5. **Find the downloaded file** and **double-click it**

6. **Installation Wizard will open**:
   - Click "Next"
   - Click "I accept" (license agreement)
   - Click "Next" (keep default location)
   - **IMPORTANT**: Make sure "Add to PATH" is checked ✓
   - Click "Next"
   - Click "Install"
   - Wait 2-3 minutes
   - Click "Finish"

7. **Restart your computer** (important!)

### Verify Installation:

After restarting:

1. **Press Windows Key + R**
2. **Type**: `cmd`
3. **Press Enter**
4. **Type**: `node --version`
5. **Press Enter**

**You should see**: `v18.19.0` or similar

If you see this, **Node.js is installed!** ✅

If you see "not recognized", restart your computer and try again.

---

## Step 2: Install Project Dependencies

### Option A: Using Batch Files (EASIEST)

1. **Open File Explorer**
2. **Navigate to your project folder**:
   ```
   C:\Users\Raphael Ilom\Desktop\CBT PRACTICE\exam-catalyst-2026-2027
   ```
3. **Double-click**: `install-dependencies.bat`
4. **Wait** (5-10 minutes) - it will download everything
5. **When done**, you'll see "Installation Complete!"

### Option B: Using Command Line

1. **Press Windows Key + R**
2. **Type**: `cmd`
3. **Press Enter**
4. **Copy and paste these commands one by one**:

```bash
cd "C:\Users\Raphael Ilom\Desktop\CBT PRACTICE\exam-catalyst-2026-2027"

cd backend
npm install

cd ..
cd frontend
npm install
```

Wait for each command to complete before running the next one.

---

## Step 3: Run the Application

### Option A: Using Batch Files (EASIEST)

1. **Open File Explorer**
2. **Go to project folder**
3. **Double-click**: `start-backend.bat`
   - A black window will open
   - Wait until you see "Server running on port 5000"
   - **Keep this window open!**

4. **Double-click**: `start-frontend.bat`
   - Another black window will open
   - Your browser will automatically open
   - You'll see the CBT Practice app!

### Option B: Using Command Line

**Open TWO Command Prompt windows**:

**Window 1 - Backend:**
```bash
cd "C:\Users\Raphael Ilom\Desktop\CBT PRACTICE\exam-catalyst-2026-2027\backend"
npm start
```

**Window 2 - Frontend:**
```bash
cd "C:\Users\Raphael Ilom\Desktop\CBT PRACTICE\exam-catalyst-2026-2027\frontend"
npm start
```

---

## Step 4: Use the Application

1. **Browser opens** to http://localhost:3000
2. **Click "Sign Up"**
3. **Fill in your details**:
   - First Name
   - Last Name
   - Email
   - Password (at least 6 characters)
4. **Click "Create Account"**
5. **You're in!** Start practicing

---

## 🎓 What's Available

### 15 UTME Subjects:

**Science:**
- Mathematics
- Physics
- Chemistry
- Biology

**Arts:**
- English
- Literature
- CRK
- History

**Social Science:**
- Economics
- Commerce
- Accounting
- Government
- Geography
- Civics
- Insurance

---

## 🔧 Troubleshooting

### Problem: "npm is not recognized"

**Cause**: Node.js not installed

**Solution**:
1. Install Node.js from https://nodejs.org/
2. Restart computer
3. Try again

---

### Problem: "node is not recognized" after installing

**Solution**:
1. Restart your computer
2. Open a NEW command prompt
3. Try `node --version` again

---

### Problem: Installation is very slow

**This is normal!**
- npm downloads thousands of files
- Can take 5-10 minutes
- Don't close the window
- Wait patiently

---

### Problem: "EACCES" or permission errors

**Solution**:
1. Right-click Command Prompt
2. Select "Run as Administrator"
3. Try installation again

---

### Problem: Port 3000 or 5000 already in use

**Solution**:
- When starting, it will ask: "Would you like to run on another port?"
- Type `Y` and press Enter
- It will use a different port

---

### Problem: Backend window closes immediately

**Cause**: Error in backend

**Solution**:
1. Check if `backend/node_modules` folder exists
2. If not, run `install-dependencies.bat` again
3. Check `backend/.env` file exists

---

### Problem: Frontend shows blank white screen

**Solution**:
1. Make sure backend is running first
2. Check browser console (press F12)
3. Look for error messages
4. Make sure both servers are running

---

## 📁 Important Files

### Batch Files (Double-click to run):
- `install-dependencies.bat` - Install everything
- `start-backend.bat` - Start backend server
- `start-frontend.bat` - Start frontend app

### Configuration Files:
- `backend/.env` - Backend settings
- `frontend/.env` - Frontend settings

### Documentation:
- `START_HERE.md` - Quick start guide
- `INSTALLATION_GUIDE.md` - Detailed installation
- `COMPLETE_GUIDE.md` - Full user guide
- `ALOC_API_SETUP.md` - API setup guide

---

## 🚀 Quick Start Summary

1. **Install Node.js** → https://nodejs.org/ (LTS version)
2. **Restart computer**
3. **Double-click** `install-dependencies.bat`
4. **Double-click** `start-backend.bat`
5. **Double-click** `start-frontend.bat`
6. **Browser opens** → Register → Start practicing!

---

## ✅ Checklist

- [ ] Node.js installed from https://nodejs.org/
- [ ] Computer restarted
- [ ] `node --version` works in command prompt
- [ ] Ran `install-dependencies.bat` successfully
- [ ] Backend started (port 5000)
- [ ] Frontend started (port 3000)
- [ ] Browser opened to http://localhost:3000
- [ ] Registered an account
- [ ] Started practicing!

---

## 🆘 Still Having Issues?

### Check Node.js Installation:

Open Command Prompt and type:
```bash
where node
where npm
```

You should see file paths. If not, Node.js isn't installed correctly.

### Check Project Files:

Make sure these folders exist:
- `backend/node_modules` (after installation)
- `frontend/node_modules` (after installation)

If they don't exist, run `install-dependencies.bat` again.

### Check Servers:

When backend starts, you should see:
```
Server running on port 5000
```

When frontend starts, browser should open automatically.

---

## 📞 Need More Help?

1. **Read**: `START_HERE.md` - Simplest guide
2. **Read**: `INSTALLATION_GUIDE.md` - Detailed steps
3. **Read**: `COMPLETE_GUIDE.md` - Everything explained
4. **Check**: Browser console (F12) for errors
5. **Check**: Command prompt for error messages

---

## 🎉 Success!

Once you see the CBT Practice app in your browser:

1. **Register** your account
2. **Login**
3. **Go to Dashboard**
4. **Click "Start Practice"**
5. **Select a subject**
6. **Choose question count**
7. **Start your test!**

---

## 💡 Pro Tips

- **Keep both windows open** while using the app
- **Don't close** the black command windows
- **Bookmark** http://localhost:3000 for easy access
- **Use Chrome or Firefox** for best experience
- **Press F11** for fullscreen during tests

---

## 🔄 To Stop the Application

1. **Go to each black window**
2. **Press Ctrl + C**
3. **Type Y** when asked
4. **Press Enter**

Or just close the windows.

---

**That's it! Follow these steps and you'll be practicing in no time!** 🚀
