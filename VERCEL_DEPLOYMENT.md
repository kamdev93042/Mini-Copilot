# Vercel Deployment Guide for Frontend

Since your backend is already deployed on Render, follow these steps to deploy your frontend on Vercel.

## Prerequisites
- Your backend URL from Render (e.g., `https://your-backend-name.onrender.com`)
- GitHub repository connected to Vercel

## Step-by-Step Deployment

### 1. Prepare Your Repository
Make sure all your frontend code is committed and pushed to GitHub.

### 2. Deploy on Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `kamdev93042/Mini-Copilot`
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: Click "Edit" and set to `frontend`
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add a new variable:
     - **Name**: `VITE_API_URL`
     - **Value**: `https://your-backend-name.onrender.com/api/generate`
     - Replace `your-backend-name` with your actual Render backend service name
   - Make sure to select all environments (Production, Preview, Development)
   - Click "Save"

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at: `https://your-project-name.vercel.app`

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to Frontend Directory**
   ```bash
   cd frontend
   ```

3. **Login to Vercel**
   ```bash
   vercel login
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - When asked for root directory, specify: `frontend`
   - Add environment variable when prompted:
     - `VITE_API_URL=https://your-backend-name.onrender.com/api/generate`

5. **For Production Deployment**
   ```bash
   vercel --prod
   ```

## Important Configuration

### Environment Variable
Make sure to set `VITE_API_URL` to your Render backend URL:
```
VITE_API_URL=https://your-backend-name.onrender.com/api/generate
```

### Root Directory
Since your frontend is in a `frontend` subdirectory, you must set the **Root Directory** to `frontend` in Vercel project settings.

## Verifying Deployment

1. **Check Build Logs**
   - Go to your project on Vercel dashboard
   - Check the "Deployments" tab
   - View build logs to ensure no errors

2. **Test Your Application**
   - Visit your Vercel deployment URL
   - Try generating code
   - Check browser console for any API errors

3. **Check Network Requests**
   - Open browser DevTools → Network tab
   - Generate code and verify API calls go to your Render backend

## Troubleshooting

### Issue: API calls failing
**Solution**: 
- Verify `VITE_API_URL` environment variable is set correctly
- Check that your Render backend URL is correct
- Ensure CORS is enabled on your Render backend

### Issue: Build fails
**Solution**:
- Check that Root Directory is set to `frontend`
- Verify all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### Issue: 404 errors on page refresh
**Solution**: 
- The `vercel.json` file includes rewrites to handle this
- If issues persist, check the rewrites configuration

### Issue: Environment variable not working
**Solution**:
- Vite requires `VITE_` prefix for environment variables
- Make sure variable is set in Vercel dashboard
- Redeploy after adding environment variables

## Updating Your Backend URL

If you need to change your backend URL:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Edit `VITE_API_URL` with the new backend URL
3. Redeploy your project

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

---

## Quick Reference

- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variable**: `VITE_API_URL=https://your-backend-name.onrender.com/api/generate`

---

**Note**: Your frontend code already uses `import.meta.env.VITE_API_URL`, so it will automatically use your Render backend URL when deployed on Vercel.

