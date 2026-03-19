# Fix 401 Unauthorized Error

## Problem

Getting `401 Unauthorized` when trying to preview draft content. This means the API token doesn't have permission to access draft content.

## Solution: Update API Token Permissions

### Step 1: Find Your API Token in Strapi

1. Open Strapi admin: http://localhost:1337/admin
2. Go to **Settings** (left sidebar, gear icon)
3. Click **API Tokens** (under Global Settings)
4. You should see your existing token

### Step 2: Check Token Permissions

Click on your token and verify:

**Token Type:** Should be `Full access` OR `Custom`

If **Custom**, ensure these permissions are enabled:
- ✅ **Page**
  - `find` (Find/Search)
  - `findOne` (Find one)
  
**Important:** The token needs access to BOTH published AND draft content.

### Step 3: If Token Doesn't Exist, Create New One

1. Click **Create new API Token**
2. Fill in:
   - **Name:** `Frontend Token`
   - **Description:** `Token for Next.js frontend to access draft content`
   - **Token duration:** `Unlimited`
   - **Token type:** `Full access` (recommended for development)
3. Click **Save**
4. **Copy the token** (you can only see it once!)

### Step 4: Update Frontend .env

Edit `dental-frontend/.env`:

```env
STRAPI_API_TOKEN=YOUR_NEW_TOKEN_HERE
```

### Step 5: Restart Next.js

```bash
cd dental-frontend
# Stop if running (Ctrl+C)
npm run dev
```

## Alternative: Use Full Access Token

If you're still getting 401 errors, the easiest solution for development is to use a Full Access token:

### Create Full Access Token:

1. Strapi admin → Settings → API Tokens
2. Create new API Token
3. **Token type:** Select `Full access`
4. Save and copy the token
5. Update `dental-frontend/.env` with new token
6. Restart Next.js

## Test Token Manually

Test if your token works:

```bash
# Test basic access
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:1337/api/pages

# Test with draft content
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:1337/api/pages?publicationState=preview"
```

Both should return `{"data":[],"meta":{...}}` (empty array is OK if no pages exist yet).

If you get `401`, the token is invalid or doesn't have permissions.

## Common Issues

### Issue 1: Token Expired

**Solution:** Create a new token with "Unlimited" duration.

### Issue 2: Token Has Limited Permissions

**Solution:** Use "Full access" token type for development.

### Issue 3: Token Not Found in Strapi

**Solution:** The token in your `.env` might be from old Payload CMS. Create a new Strapi token.

### Issue 4: Environment Variable Not Loaded

**Solution:** 
1. Restart Next.js dev server
2. Verify token is set: `echo $STRAPI_API_TOKEN` (in terminal where Next.js runs)
3. Check no typos in variable name

## Quick Fix Steps

1. **Create new Full Access token in Strapi**
2. **Copy token to `dental-frontend/.env`**
3. **Restart Next.js**
4. **Test preview URL again**

## Verify Setup

After fixing the token, test:

```bash
# Should work without 401 error
curl -H "Authorization: Bearer YOUR_NEW_TOKEN" \
  "http://localhost:1337/api/pages?publicationState=preview&populate=deep"
```

Then test preview URL:
```
http://localhost:3000/api/preview?slug=test-page&secret=your-secure-preview-secret-change-in-production
```

## Next Steps

Once 401 is fixed:
1. Create a test page in Strapi (Content Manager → Page)
2. Save as draft
3. Test preview URL
4. Should see yellow banner + content

---

**TL;DR:** Create a new "Full Access" API token in Strapi, update `dental-frontend/.env`, restart Next.js.
