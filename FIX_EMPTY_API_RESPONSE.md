# Fix: API Returns Empty Data

## Problem

The Strapi API returns `{"data":[],"meta":{...}}` even though you have a page created.

This means either:
1. The API token doesn't have permission to read the Page content type
2. The page wasn't actually saved to the database
3. Strapi needs to be restarted after creating the Page content type

## Solution 1: Verify API Token Permissions

### Step 1: Check Token Permissions in Strapi

1. Open http://localhost:1337/admin
2. Go to **Settings** → **API Tokens**
3. Click on your token (the one you're using)
4. Verify it shows **"Full access"** OR has these permissions:
   - ✅ Page → find
   - ✅ Page → findOne

### Step 2: If Token is NOT Full Access

1. **Delete the old token**
2. **Create new token:**
   - Name: `Frontend Full Access`
   - Token type: **Full access** (important!)
   - Token duration: Unlimited
3. **Copy the new token**
4. **Update `dental-frontend/.env.local`:**
   ```env
   STRAPI_API_TOKEN=YOUR_NEW_FULL_ACCESS_TOKEN
   ```
5. **Restart Next.js**

## Solution 2: Restart Strapi

The Page content type was created while Strapi was running. Strapi needs to be restarted to register it properly.

### Restart Strapi:

```bash
cd strapi-cms
# Press Ctrl+C to stop
npm run develop
```

Wait for Strapi to fully start, then test the API again.

## Solution 3: Verify Page is Saved

### Check in Strapi Admin:

1. Go to Content Manager → Page
2. You should see "Test Page" in the list
3. Click on it to edit
4. Make sure:
   - Title: `Test Page`
   - Slug: `test-page`
   - Content: Has some text
5. Click **Save** again

### Check Database Directly:

```bash
# Connect to PostgreSQL
docker exec -it strapi-postgres psql -U postgres -d dental_cms_strapi

# Check if pages table exists
\dt

# Check if page exists
SELECT id, title, slug, published_at FROM pages;

# Exit
\q
```

## Solution 4: Publish the Page (Temporary Test)

To verify the API works, try publishing the page:

1. Open the page in Strapi
2. Click **Publish** button
3. Test API without `publicationState=preview`:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
     "http://localhost:1337/api/pages?filters[slug][\$eq]=test-page&populate=*"
   ```

If this returns data, the issue is with draft content permissions.

## Test API Manually

### Test 1: Get all pages (published only)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:1337/api/pages"
```

### Test 2: Get all pages (including drafts)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:1337/api/pages?publicationState=preview"
```

### Test 3: Get specific page by slug (draft)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:1337/api/pages?filters[slug][\$eq]=test-page&publicationState=preview&populate=*"
```

All three should return data if everything is configured correctly.

## Most Likely Solution

**The API token needs to be "Full Access" type to read draft content.**

1. Create new Full Access token in Strapi
2. Update `.env.local` with new token
3. Restart Next.js
4. Test preview URL again

---

## Quick Fix Steps

1. ✅ Strapi admin → Settings → API Tokens
2. ✅ Create new token with **Full access**
3. ✅ Copy token
4. ✅ Update `dental-frontend/.env.local`
5. ✅ Restart Next.js: `Ctrl+C` then `npm run dev`
6. ✅ Test: `http://localhost:3000/api/preview?slug=test-page&secret=your-secure-preview-secret-change-in-production`
