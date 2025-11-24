# 🔧 Quick Fix: Connect Frontend to Backend

## Your Backend URL
✅ **https://mini-copilot.onrender.com**

## ✅ Steps to Fix (Do This Now!)

### Step 1: Update Vercel Environment Variable

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **frontend project**
3. Go to **Settings** → **Environment Variables**
4. Find `VITE_API_URL` and click **Edit** (or delete and create new)
5. Set the value to:
   ```
   https://mini-copilot.onrender.com/api/generate
   ```
6. Make sure all environments are checked (Production, Preview, Development)
7. Click **Save**

### Step 2: Redeploy Your Frontend

**Option A: Via Dashboard**
- Go to **Deployments** tab
- Click the **three dots (⋯)** on the latest deployment
- Click **Redeploy**

**Option B: Push a New Commit**
- Make any small change (or just commit the updated files)
- Push to GitHub
- Vercel will auto-deploy

### Step 3: Verify It Works

1. Open your Vercel frontend URL
2. Open browser **DevTools** (F12)
3. Go to **Console** tab
4. You should see: `API URL: https://mini-copilot.onrender.com/api/generate`
5. Try generating code - it should work now!

---

## 🐛 If It Still Doesn't Work

### Check 1: Verify Environment Variable
- In Vercel Dashboard → Settings → Environment Variables
- Make sure `VITE_API_URL` = `https://mini-copilot.onrender.com/api/generate`
- **NOT** `https://your-backend-name.onrender.com/api/generate` (this was the placeholder!)

### Check 2: Check Browser Console
- Open DevTools → Console
- Look for the logged API URL
- If it shows `http://localhost:5000/api/generate`, the env variable isn't set correctly

### Check 3: Check Network Tab
- Open DevTools → Network tab
- Try generating code
- See if requests go to `https://mini-copilot.onrender.com/api/generate`
- Check for CORS errors (red requests)

### Check 4: Test Backend Directly
- Visit: `https://mini-copilot.onrender.com/api/generate`
- Should return an error (method not allowed for GET, but server should respond)
- Or test with: `https://mini-copilot.onrender.com/` (should show "Server is running")

---

## 📝 Summary

**The Problem:** You set the environment variable to a placeholder value instead of your actual backend URL.

**The Solution:** 
1. Update `VITE_API_URL` to `https://mini-copilot.onrender.com/api/generate`
2. Redeploy your frontend
3. Done! ✅

---

**After fixing, your frontend will connect to:**
`https://mini-copilot.onrender.com/api/generate`

