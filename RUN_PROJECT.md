# How to Run the CBT Practice Platform

## Prerequisites

Make sure you have Node.js installed on your system.
Check by running:
```bash
node --version
```

If not installed, download from: https://nodejs.org/

## Step-by-Step Instructions

### 1. Install Dependencies

Open a terminal in the project root directory and run:

```bash
npm run install-all
```

This will install dependencies for both backend and frontend.

### 2. Start the Backend Server

Open a terminal and run:

```bash
cd backend
npm start
```

You should see: "Server running on port 5000"

Keep this terminal open.

### 3. Start the Frontend

Open a NEW terminal (keep the backend running) and run:

```bash
cd frontend
npm start
```

The browser should automatically open to http://localhost:3000

If not, manually open your browser and go to: http://localhost:3000

### 4. Use the Application

1. Click "Sign Up" to create a new account
2. Fill in your details:
   - First Name
   - Last Name
   - Email
   - Password (at least 6 characters)
3. Click "Create Account"
4. You'll be redirected to the Dashboard
5. Click "Start Practice" to begin
6. Select a subject and number of questions
7. Take the test!

## Troubleshooting

### "npm is not recognized"

You need to install Node.js first. Download from https://nodejs.org/

### Port 3000 or 5000 already in use

The terminal will ask if you want to use a different port. Type 'Y' and press Enter.

### Backend not connecting

1. Make sure the backend terminal is still running
2. Check that it says "Server running on port 5000"
3. Try restarting the backend:
   - Press Ctrl+C in the backend terminal
   - Run `npm start` again

### Frontend shows errors

1. Make sure you ran `npm run install-all` first
2. Try clearing the cache:
   ```bash
   cd frontend
   rm -rf node_modules
   npm install
   npm start
   ```

### Database errors

The app uses SQLite which creates a local database file automatically. No setup needed.

## Stopping the Application

To stop the servers:
1. Go to each terminal
2. Press `Ctrl + C`
3. Type 'Y' if asked to confirm

## Development Mode

Both servers run in development mode with:
- Auto-reload on file changes (frontend)
- Error messages in console
- Detailed logging

## Production Build

To create a production build:

```bash
cd frontend
npm run build
```

This creates an optimized build in the `frontend/build` folder.

## Need Help?

Check the following files:
- README.md - General project information
- QUICK_START.md - Quick start guide
- CHANGES.md - What was changed in the simplification

## Common Issues

**Issue**: "Cannot find module"
**Solution**: Run `npm install` in the affected directory (backend or frontend)

**Issue**: Blank white screen
**Solution**: Check browser console (F12) for errors, ensure backend is running

**Issue**: Login not working
**Solution**: Check that backend is running on port 5000, check browser console for API errors
