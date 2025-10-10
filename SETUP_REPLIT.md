# Replit Setup Guide - Exam Catalyst 2026

## ⚠️ IMPORTANT: Environment Variables Setup

The application requires environment variables to run. The `.env` files have been cleared for security.

### Required Secrets

Use Replit's Secrets tab (🔒 in the left sidebar) to add these environment variables:

#### Backend Secrets:
1. `MONGODB_URI` - Your MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/exam_catalyst?retryWrites=true&w=majority`
   - **Important**: URL-encode special characters in password (@ becomes %40, etc.)
   
2. `JWT_SECRET` - Secret key for JWT tokens (minimum 32 characters)
   - Example: `your_random_secure_secret_key_here_min_32_chars`

3. `ALOC_API_KEY` - API key for ALOC question database (optional for now)
4. `EMAIL_SERVICE_KEY` - Email service API key (optional for now)

### Quick Setup Steps:

1. **Add MongoDB URI:**
   - Go to Secrets tab in Replit
   - Add key: `MONGODB_URI`
   - Add your MongoDB connection string as value

2. **Add JWT Secret:**
   - Add key: `JWT_SECRET`
   - Generate a random 32+ character string as value

3. **Restart the Backend:**
   - The backend will automatically pick up the secrets
   - Check the console to verify connection

### Testing Without Database (Optional)

If you want to test without MongoDB:
- The backend is configured to continue running even if MongoDB connection fails
- You'll see a warning in logs, but the server will still start
- Some features won't work without a database

### Port Configuration

- **Frontend**: http://localhost:5000 (visible in webview)
- **Backend API**: http://localhost:3001 (internal only)
- Backend is now bound to 0.0.0.0:3001 for Replit compatibility

### Verifying Setup

1. Check backend logs for "Server running on port 3001"
2. Check frontend compiles successfully
3. Visit the webview to see the homepage
4. Open browser console to check for errors

## Security Notes

✅ **What's Safe:**
- The `.env` files are in `.gitignore`
- Use Replit Secrets for sensitive data
- Secrets are injected as environment variables

❌ **Never Do This:**
- Don't commit `.env` files with real credentials
- Don't hardcode API keys in source code
- Don't share your secrets publicly

## Need Help?

See `replit.md` for full documentation and troubleshooting.
