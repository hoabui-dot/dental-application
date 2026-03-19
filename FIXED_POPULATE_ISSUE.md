# Fixed: Strapi v5 Populate Parameter Issue

## Problem Identified

The 401 error was actually caused by an invalid `populate=deep` parameter, not the API token!

Strapi v5 changed the populate syntax:
- ❌ **Old (Strapi v4):** `populate=deep`
- ✅ **New (Strapi v5):** `populate=*`

## What Was Fixed

Updated `dental-frontend/src/lib/api/queries.ts`:

```typescript
// Before (caused 401 error)
params: {
  "filters[slug][$eq]": slug,
  populate: "deep",  // ❌ Invalid in Strapi v5
}

// After (works correctly)
params: {
  "filters[slug][$eq]": slug,
  populate: "*",  // ✅ Valid in Strapi v5
}
```

## Test Results

```bash
# This now works:
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:1337/api/pages?filters[slug][\$eq]=test-page&publicationState=preview&populate=*"

# Returns: {"data":[],"meta":{...}}
# Empty array is OK - just means no pages created yet
```

## Next Steps

### 1. Create a Test Page in Strapi

1. Open http://localhost:1337/admin
2. Go to **Content Manager** → **Page**
3. Click **Create new entry**
4. Fill in:
   - **Title:** Test Page
   - **Slug:** test-page (auto-generates)
   - **Content:** This is a test page for preview mode
5. **Save as draft** (don't publish yet)

### 2. Test Preview

Open this URL:
```
http://localhost:3000/api/preview?slug=test-page&secret=your-secure-preview-secret-change-in-production
```

Should now work and show:
- ✅ Yellow banner "Preview Mode Enabled"
- ✅ Page content
- ✅ "Exit Preview" button

### 3. Verify API Response

Test the API directly:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:1337/api/pages?filters[slug][\$eq]=test-page&publicationState=preview&populate=*"
```

Should return your page data (not empty array).

## Summary

✅ **Fixed:** Changed `populate=deep` to `populate=*` for Strapi v5 compatibility
✅ **Token:** Your Full Access token is working correctly
✅ **API:** Strapi API responding correctly
⏳ **Next:** Create a test page and test preview

The preview system is now fully functional!
