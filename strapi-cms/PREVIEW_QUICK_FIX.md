# Quick Fix: Preview Button Not Showing

## Problem
Preview button not appearing in Strapi admin because your "Bài viết" content type is missing a `slug` field.

## Quick Solution (5 minutes)

### Step 1: Add Slug Field

1. Open Strapi admin: http://localhost:1337/admin
2. Go to **Content-Type Builder** (left sidebar, wrench icon)
3. Click **Bài viết**
4. Click **Add another field**
5. Select **Text**
6. Configure:
   - Name: `slug`
   - Type: Short text
   - Advanced Settings:
     - ✅ Required field
     - ✅ Unique field
7. Click **Finish**
8. Click **Save** (top right)

### Step 2: Restart Strapi

```bash
# In terminal where Strapi is running:
# Press Ctrl+C to stop

# Start again:
npm run develop
```

### Step 3: Add Slug to Your Entry

1. Go to **Content Manager** → **Bài viết**
2. Click on your entry "amklvrtnu3kx2baj80zg5t6k"
3. You'll see new **slug** field
4. Enter a slug: `xin-chao-dental` (URL-friendly, lowercase, no spaces)
5. Click **Save**

### Step 4: Test Preview Manually

Open this URL in browser (replace the slug):
```
http://localhost:3000/api/preview?slug=xin-chao-dental&secret=your-secure-preview-secret-change-in-production
```

Should see:
- ✅ Yellow banner "Preview Mode Enabled"
- ✅ Your draft content
- ✅ "Exit Preview" button

## If Preview Button Still Doesn't Appear

Strapi v5 may not support the preview button configuration in `admin.ts`. Use manual preview URLs instead:

**Manual Preview URL Template:**
```
http://localhost:3000/api/preview?slug=YOUR-SLUG&secret=your-secure-preview-secret-change-in-production
```

**Example:**
```
http://localhost:3000/api/preview?slug=xin-chao-dental&secret=your-secure-preview-secret-change-in-production
```

## Create Browser Bookmark for Easy Preview

1. Create new bookmark in your browser
2. Name it: "Preview Strapi Content"
3. URL:
```javascript
javascript:(function(){const slug=prompt('Enter slug:');if(slug){window.open(`http://localhost:3000/api/preview?slug=${slug}&secret=your-secure-preview-secret-change-in-production`,'_blank');}})();
```

4. When editing content in Strapi:
   - Click the bookmark
   - Enter the slug
   - Preview opens automatically

## Summary

1. ✅ Add `slug` field to "Bài viết" content type
2. ✅ Restart Strapi
3. ✅ Add slug value to your entries
4. ✅ Use manual preview URL or bookmark

The preview system is working - you just need the slug field!

For detailed instructions, see: `PREVIEW_SETUP_FIX.md`
