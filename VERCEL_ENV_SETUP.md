# Fix Vercel Environment Variable

## Your Backend URL
Your Render backend is deployed at: **https://mini-copilot.onrender.com**

## Steps to Fix the Connection

### 1. Update Environment Variable in Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your frontend project

2. **Go to Settings**
   - Click on "Settings" tab
   - Click on "Environment Variables" in the left sidebar

3. **Update VITE_API_URL**
   - Find `VITE_API_URL` in the list
   - Click "Edit" or delete and recreate it
   - Set the value to: `https://mini-copilot.onrender.com/api/generate`
   - Make sure all environments are selected (Production, Preview, Development)
   - Click "Save"

4. **Redeploy**
   - Go to "Deployments" tab
   - Click the three dots (⋯) on the latest deployment
   - Click "Redeploy"
   - Or push a new commit to trigger a new deployment

### 2. Verify the Environment Variable

After redeploying, you can verify it's working by:
- Opening your Vercel site
- Opening browser DevTools (F12)
- Go to Console tab
- The API calls should now go to `https://mini-copilot.onrender.com/api/generate`

### 3. Test the Connection

1. Visit your Vercel frontend URL
2. Try generating code with a prompt
3. Check the browser Network tab to see if requests are going to your Render backend
4. If you see CORS errors, we'll need to update the backend CORS settings

---

## Quick Fix Summary

**Environment Variable to Set:**
- **Name**: `VITE_API_URL`
- **Value**: `https://mini-copilot.onrender.com/api/generate`

**Important**: After updating, you MUST redeploy for the changes to take effect!

