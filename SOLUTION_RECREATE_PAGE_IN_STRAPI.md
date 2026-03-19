# Solution: Recreate Page in Strapi Admin

## Root Cause

The page was created while the schema was being modified, causing a mismatch between:
- Database structure (has locale column)
- Strapi's internal query logic (expects specific locale handling)
- Schema configuration (i18n disabled but plugin still active)

## Solution: Delete and Recreate Page

### Step 1: Delete Existing Page from Database

```bash
docker exec -it strapi-postgres psql -U postgres -d dental_cms_strapi -c "DELETE FROM pages WHERE slug = 'test-page';"
```

### Step 2: Restart Strapi

```bash
cd strapi-cms
# Ctrl+C to stop
npm run develop
```

### Step 3: Create Page in Strapi Admin (NOT database)

1. Open http://localhost:1337/admin
2. Go to **Content Manager** → **Page**
3. Click **Create new entry**
4. Fill in:
   - **Title:** Test Page
   - **Slug:** test-page (auto-fills)
   - **Content:** Hello from preview mode!
5. Click **Save** (keep as draft, don't publish)

### Step 4: Test Preview

```
http://localhost:3000/api/preview?slug=test-page&secret=your-secure-preview-secret-change-in-production
```

## Why This Works

When you create a page through Strapi admin:
- ✅ Strapi handles all locale/i18n logic correctly
- ✅ All required fields are populated properly
- ✅ Internal indexes are updated
- ✅ The page is queryable through the API

When you manually insert/update in the database:
- ❌ Strapi's internal state may not match
- ❌ Locale handling may be incorrect
- ❌ Indexes may not be updated

## Alternative: Publish Then Unpublish

If recreating doesn't work, try this workflow:

1. Create page in Strapi admin
2. **Publish it first**
3. Make changes
4. **Save without publishing** (now it's draft with changes)
5. Test preview - should show draft version

## Test API After Recreation

```bash
# Should return the page
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:1337/api/pages?publicationState=preview"
```

---

**TL;DR:** Delete the page from database, restart Strapi, create page through Strapi admin UI (not database), test preview.
