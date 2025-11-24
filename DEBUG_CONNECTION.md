# 🔍 Debug: Why Frontend and Backend Are Not Connected

## Your URLs:
- **Backend (Render)**: `https://mini-copilot.onrender.com`
- **Frontend (Vercel)**: `https://mini-copilot-ten.vercel.app`

## 🔴 Most Common Issue: Environment Variable Not Set

### Check 1: Verify Environment Variable in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project: **mini-copilot-ten**
3. Go to **Settings** → **Environment Variables**
4. **Check if `VITE_API_URL` exists:**
   - If it doesn't exist → **CREATE IT**
   - If it exists → **CHECK THE VALUE**

5. **Correct Value Should Be:**
   ```
   https://mini-copilot.onrender.com/api/generate
   ```
   **NOT:**
   - ❌ `https://mini-copilot.onrender.com` (missing `/api/generate`)
   - ❌ `https://your-backend-name.onrender.com/api/generate` (placeholder)
   - ❌ `http://localhost:5000/api/generate` (local URL)

6. **Make sure ALL environments are selected:**
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

7. **After updating, you MUST redeploy!**

---

## 🔴 Check 2: Test in Browser Console

1. Open your frontend: `https://mini-copilot-ten.vercel.app`
2. Open **DevTools** (F12)
3. Go to **Console** tab
4. Look for: `API URL: ...`
5. **What does it show?**
   - ✅ If it shows: `API URL: https://mini-copilot.onrender.com/api/generate` → Good!
   - ❌ If it shows: `API URL: http://localhost:5000/api/generate` → Environment variable not set!

---

## 🔴 Check 3: Test Backend Directly

### Test 1: Root Endpoint
Visit: `https://mini-copilot.onrender.com/`
- Should show: `{"message":"Server is running"}` ✅

### Test 2: API Endpoint (using browser or Postman)
Try this in browser console on your Vercel site:
```javascript
fetch('https://mini-copilot.onrender.com/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'reverse string',
    language: 'python'
  })
})
.then(res => res.json())
.then(data => console.log('✅ Backend works:', data))
.catch(err => console.error('❌ Backend error:', err));
```

---

## 🔴 Check 4: Network Tab

1. Open your frontend: `https://mini-copilot-ten.vercel.app`
2. Open **DevTools** (F12) → **Network** tab
3. Try to generate code
4. **Look for the request:**
   - What URL is it trying to reach?
   - Is it going to `https://mini-copilot.onrender.com/api/generate`?
   - What's the status code? (200 = success, 404/500 = error)
   - Any CORS errors? (red request with CORS error message)

---

## 🔴 Check 5: CORS Issues

If you see CORS errors in console:
- Error: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:** I've updated the backend to explicitly allow your Vercel domain. You need to:
1. Commit the backend changes
2. Push to GitHub
3. Redeploy on Render

---

## ✅ Step-by-Step Fix

### Step 1: Set Environment Variable in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select project: **mini-copilot-ten**
3. **Settings** → **Environment Variables**
4. Click **"Add New"**
5. **Name**: `VITE_API_URL`
6. **Value**: `https://mini-copilot.onrender.com/api/generate`
7. Select all environments (Production, Preview, Development)
8. Click **Save**

### Step 2: Redeploy Frontend

**Option A: Via Dashboard**
- Go to **Deployments** tab
- Click **three dots (⋯)** on latest deployment
- Click **Redeploy**

**Option B: Push a commit**
- Make any small change
- Commit and push
- Vercel will auto-deploy

### Step 3: Update Backend CORS (if needed)

The backend code has been updated to allow your Vercel domain. If you haven't deployed it yet:

1. Commit backend changes:
   ```bash
   cd copilot
   git add backend/server.js
   git commit -m "Update CORS to allow Vercel frontend"
   git push origin main
   ```

2. Redeploy on Render:
   - Go to Render Dashboard
   - Find your backend service
   - Click "Manual Deploy" → "Deploy latest commit"

### Step 4: Test Again

1. Open: `https://mini-copilot-ten.vercel.app`
2. Open DevTools → Console
3. Check: `API URL: https://mini-copilot.onrender.com/api/generate`
4. Try generating code
5. Check Network tab for successful requests

---

## 🐛 Still Not Working?

### Debug Checklist:

- [ ] Environment variable `VITE_API_URL` is set in Vercel
- [ ] Value is exactly: `https://mini-copilot.onrender.com/api/generate`
- [ ] All environments are selected (Production, Preview, Development)
- [ ] Frontend has been redeployed AFTER setting environment variable
- [ ] Browser console shows correct API URL
- [ ] Backend is accessible at `https://mini-copilot.onrender.com/`
- [ ] No CORS errors in browser console
- [ ] Network tab shows requests going to Render backend

### Common Mistakes:

1. ❌ Setting environment variable but not redeploying
2. ❌ Wrong URL format (missing `/api/generate`)
3. ❌ Using placeholder URL instead of actual backend URL
4. ❌ Not selecting all environments in Vercel
5. ❌ Backend sleeping (Render free tier - wait 30-60 seconds)

---

## 🎯 Quick Test

Run this in your browser console on the Vercel site:

```javascript
// Check environment variable
console.log('API URL:', import.meta.env.VITE_API_URL);

// Test backend connection
fetch('https://mini-copilot.onrender.com/api/generate', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({prompt: 'test', language: 'python'})
})
.then(r => r.json())
.then(d => console.log('✅ Success:', d))
.catch(e => console.error('❌ Error:', e));
```

---

**Most likely issue: Environment variable not set or frontend not redeployed after setting it!**

