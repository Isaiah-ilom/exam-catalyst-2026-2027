# Complete Guide - CBT Practice Platform

## Table of Contents
1. [What is This?](#what-is-this)
2. [Installation](#installation)
3. [Running the App](#running-the-app)
4. [Using the App](#using-the-app)
5. [Features](#features)
6. [Troubleshooting](#troubleshooting)

## What is This?

A simple, clean CBT (Computer-Based Testing) platform for UTME exam preparation. Students can:
- Practice with multiple-choice questions
- Take timed mock exams
- Track their performance
- Study different subjects

## Installation

### Step 1: Check Node.js

Open a terminal and type:
```bash
node --version
```

If you see a version number (like v18.0.0), you're good!
If not, download Node.js from: https://nodejs.org/

### Step 2: Install Dependencies

In the project folder, run:
```bash
npm run install-all
```

This installs everything needed for both backend and frontend.

Wait for it to complete (may take a few minutes).

## Running the App

### Method 1: Two Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

Wait until you see: "Server running on port 5000"

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Browser should open automatically to http://localhost:3000

### Method 2: Using npm scripts

**Terminal 1:**
```bash
npm run dev:backend
```

**Terminal 2:**
```bash
npm run dev:frontend
```

## Using the App

### First Time Setup

1. **Open the App**
   - Go to http://localhost:3000
   - You'll see the home page

2. **Create an Account**
   - Click "Sign Up" button
   - Fill in:
     - First Name: Your first name
     - Last Name: Your last name
     - Email: Your email address
     - Password: At least 6 characters
     - Confirm Password: Same as password
   - Click "Create Account"

3. **Login**
   - If you already have an account, click "Login"
   - Enter your email and password
   - Click "Sign In"

### Taking a Practice Test

1. **Go to Dashboard**
   - After login, you'll see the dashboard
   - Shows quick action cards

2. **Start Practice**
   - Click "Start Practice" card
   - Or click "Practice" in the sidebar

3. **Select Subject**
   - Choose from dropdown:
     - Mathematics
     - English
     - Physics
     - Chemistry
     - Biology
     - Economics
     - Geography
     - Government

4. **Choose Question Count**
   - Use the slider to select: 10, 20, 30, 40, or 50 questions
   - More questions = longer test

5. **Start the Test**
   - Click "Start Practice"
   - You'll see the exam interface

### During the Test

1. **Read the Question**
   - Question appears at the top
   - Read carefully

2. **Select an Answer**
   - Click on one of the options (A, B, C, or D)
   - Selected answer will be highlighted in blue

3. **Navigate Questions**
   - Click "Next" to go to next question
   - Click "Previous" to go back
   - Or click question numbers at the bottom

4. **Flag Questions**
   - Click the flag icon to mark questions for review
   - Flagged questions show in yellow

5. **Watch the Timer**
   - Timer shows at the top
   - Format: MM:SS (minutes:seconds)
   - Test auto-submits when time runs out

6. **Question Navigator**
   - Shows all questions at bottom
   - Blue = answered
   - White = not answered
   - Dark blue = current question

7. **Submit Test**
   - Click "Submit Exam" on last question
   - Or submit anytime from the interface

### Viewing Results

1. **After Submission**
   - Automatically redirected to results page
   - Shows your score

2. **Results Display**
   - Percentage score (large number)
   - Correct answers count
   - Wrong answers count
   - Total questions

3. **Next Steps**
   - Click "Practice Again" to take another test
   - Click "Back to Dashboard" to return home

## Features

### Dashboard
- Welcome message with your name
- Quick action cards:
  - Start Practice
  - Take Mock Exam
  - View Results
  - Study Materials
- Basic statistics (tests taken, average score, study time)

### Practice Mode
- Choose any subject
- Select question count (10-50)
- No pressure, practice at your own pace

### Exam Interface
- Clean question display
- Multiple choice options (A, B, C, D)
- Timer countdown
- Question navigation
- Flag questions for review
- Progress tracking

### Results
- Clear score display
- Performance breakdown
- Quick actions to retry or return

### Profile
- View your information
- Name, email, member since date

### Settings
- Logout option
- (More settings can be added)

## Troubleshooting

### Problem: "npm is not recognized"
**Solution:** Install Node.js from https://nodejs.org/

### Problem: Port already in use
**Solution:** 
- Terminal will ask if you want to use different port
- Type 'Y' and press Enter
- Or close other apps using ports 3000/5000

### Problem: Backend not connecting
**Solution:**
1. Check backend terminal is running
2. Should say "Server running on port 5000"
3. If not, restart:
   - Press Ctrl+C
   - Run `npm start` again

### Problem: White screen on frontend
**Solution:**
1. Check browser console (press F12)
2. Look for error messages
3. Make sure backend is running
4. Try refreshing the page (Ctrl+R)

### Problem: Can't login
**Solution:**
1. Make sure you registered first
2. Check email and password are correct
3. Password is at least 6 characters
4. Check backend is running

### Problem: Questions not loading
**Solution:**
1. Check browser console for errors
2. Make sure backend is running
3. Check network tab in browser dev tools
4. Try refreshing the page

### Problem: Timer not working
**Solution:**
1. Refresh the page
2. Check browser console for errors
3. Make sure JavaScript is enabled

### Problem: Can't submit exam
**Solution:**
1. Make sure you answered at least one question
2. Check browser console for errors
3. Try clicking submit again
4. Check backend is running

## Tips for Best Experience

1. **Use Chrome or Firefox**
   - Best compatibility
   - Better developer tools

2. **Keep Backend Running**
   - Don't close backend terminal
   - Frontend needs it to work

3. **Check Console for Errors**
   - Press F12 in browser
   - Look at Console tab
   - Shows helpful error messages

4. **Clear Browser Cache**
   - If things look broken
   - Press Ctrl+Shift+Delete
   - Clear cache and reload

5. **Use Fullscreen**
   - Press F11 for fullscreen
   - Better exam experience
   - Less distractions

## Keyboard Shortcuts

- **F11**: Fullscreen mode
- **F12**: Open developer tools
- **Ctrl+R**: Refresh page
- **Ctrl+Shift+Delete**: Clear cache

## Sample Test Flow

1. Login → Dashboard
2. Click "Start Practice"
3. Select "Mathematics"
4. Choose "20 questions"
5. Click "Start Practice"
6. Answer questions
7. Click "Next" between questions
8. Click "Submit Exam" when done
9. View results
10. Click "Practice Again" or "Back to Dashboard"

## Need More Help?

Check these files:
- `README.md` - Project overview
- `QUICK_START.md` - Quick start
- `RUN_PROJECT.md` - Detailed instructions
- `PROJECT_SUMMARY.md` - Technical details
- `CHANGES.md` - What was simplified

## Common Questions

**Q: Can I use this offline?**
A: No, you need both backend and frontend running.

**Q: Where is my data stored?**
A: In a local SQLite database in the backend folder.

**Q: Can I add more questions?**
A: Yes, modify the sample questions in ExamInterface.jsx.

**Q: Can I change the timer duration?**
A: Yes, modify the initial timeLeft value in ExamInterface.jsx.

**Q: Can I add more subjects?**
A: Yes, add them to the subjects array in Practice.jsx.

**Q: Is this production-ready?**
A: No, this is a simplified version for learning/demo purposes.

**Q: Can I deploy this online?**
A: Yes, but you'll need to set up proper hosting and database.

## Support

If you're still stuck:
1. Read error messages carefully
2. Check all terminals are running
3. Try restarting both servers
4. Clear browser cache
5. Check browser console (F12)

## Happy Testing!

Good luck with your UTME preparation! 🎓
