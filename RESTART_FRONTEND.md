# Fix: Restart Next.js to Load New Token

## Problem

The console shows: `Token loaded: your-strap...token-here`

This means Next.js is NOT reading your actual token from `.env` - it's using a cached/old value.

## Solution: Restart Next.js Dev Server

### Step 1: Stop Next.js

In the terminal where Next.js is running:
```bash
# Press Ctrl+C to stop the server
```

### Step 2: Clear Next.js Cache (Optional but Recommended)

```bash
cd dental-frontend
rm -rf .next
```

### Step 3: Start Next.js Again

```bash
npm run dev
```

### Step 4: Verify Token is Loaded

Look for this line in the console:
```
[API Client] Token loaded: 1faf8bfa7c...db7eab
```

Should show your actual token (first 10 and last 10 characters).

## Quick Test

After restarting, test the API:

```bash
# In a new terminal
cd dental-frontend
node -e "require('dotenv').config(); console.log('Token:', process.env.STRAPI_API_TOKEN?.substring(0, 20) + '...');"
```

Should output:
```
Token: 1faf8bfa7c25bd5e80d8...
```

## If Still Not Working

### Check .env File Location

Make sure `.env` is in the correct location:
```bash
cd dental-frontend
ls -la .env
```

Should show:
```
-rw-r--r--  1 user  staff  XXX  dental-frontend/.env
```

### Check .env Content

```bash
cat .env | grep STRAPI_API_TOKEN
```

Should show your full token (not placeholder text).

### Try .env.local Instead

Next.js prioritizes `.env.local` over `.env`:

```bash
cd dental-frontend
cp .env .env.local
```

Then restart Next.js.

## Summary

1. ✅ Stop Next.js (Ctrl+C)
2. ✅ Clear cache: `rm -rf .next`
3. ✅ Start Next.js: `npm run dev`
4. ✅ Check console for actual token
5. ✅ Test preview URL

The token is in your `.env` file - Next.js just needs to be restarted to read it!
