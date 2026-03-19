# Strapi Preview Mode - Setup Fix Guide

## Problem

The preview button is not showing because:
1. Your content type "Bài viết" doesn't have a `slug` field
2. The preview configuration expects a `slug` field to generate the preview URL

## Solution

You have two options:

---

## Option 1: Add Slug Field to "Bài viết" (Recommended if you want to keep current content)

### Step 1: Add Slug Field in Strapi Admin

1. Open Strapi admin: http://localhost:1337/admin
2. Go to **Content-Type Builder** (left sidebar)
3. Click on **Bài viết** content type
4. Click **Add another field**
5. Select **Text** field type
6. Configure:
   - **Name:** `slug`
   - **Type:** Short text
   - **Advanced settings:**
     - Check "Required field"
     - Check "Unique field"
     - RegExp pattern: `^[a-z0-9]+(?:-[a-z0-9]+)*$` (optional, for URL-safe slugs)
7. Click **Finish**
8. Click **Save** (top right)
9. **Restart Strapi** (required after schema changes)

### Step 2: Update Preview Configuration

Edit `strapi-cms/config/admin.ts`:

```typescript
export default ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
  // Preview configuration for Bài viết
  preview: {
    enabled: true,
    config: {
      "bai-viet": {  // Changed from "page" to "bai-viet"
        url: `${env("FRONTEND_URL", "http://localhost:3000")}/api/preview`,
        query: {
          slug: "{slug}",
          secret: env("PREVIEW_SECRET", "your-secure-preview-secret-change-in-production"),
        },
      },
    },
  },
});
```

### Step 3: Update Existing Entries

1. Go to **Content Manager** → **Bài viết**
2. Edit each entry
3. Add a slug value (e.g., "xin-chao-dental" for "Xin chào Dental")
4. Save

### Step 4: Restart Strapi

```bash
# Stop Strapi (Ctrl+C)
# Start again
npm run develop
```

---

## Option 2: Create New "Page" Content Type (Recommended for new projects)

### Step 1: Create Page Content Type

1. Open Strapi admin: http://localhost:1337/admin
2. Go to **Content-Type Builder**
3. Click **Create new collection type**
4. Name: `page` (singular), `pages` (plural)
5. Click **Continue**

### Step 2: Add Fields

Add these fields one by one:

**1. Title (Text - Short text)**
- Name: `title`
- Type: Short text
- Required: Yes

**2. Slug (Text - Short text)**
- Name: `slug`
- Type: Short text
- Required: Yes
- Unique: Yes
- RegExp: `^[a-z0-9]+(?:-[a-z0-9]+)*$`

**3. Layout (Dynamic Zone)**
- Name: `layout`
- Components: (create these)
  - `blocks.hero`
  - `blocks.services`
  - `blocks.cta`

**4. SEO (Component - repeatable: No)**
- Create SEO component with:
  - `metaTitle` (Text)
  - `metaDescription` (Text - Long text)
  - `keywords` (Text)

### Step 3: Enable Draft & Publish

1. Click on **Page** content type
2. Click **Edit**
3. Go to **Advanced settings** tab
4. Enable **Draft & Publish**
5. Click **Save**

### Step 4: Configure Preview

The preview configuration in `admin.ts` is already set for "page" content type.

### Step 5: Create Test Page

1. Go to **Content Manager** → **Page**
2. Click **Create new entry**
3. Fill in:
   - Title: "Test Page"
   - Slug: "test-page"
   - Layout: Add some blocks
4. **Save as draft** (don't publish)
5. Look for **Preview** button (should appear now)

---

## Troubleshooting

### Preview Button Still Not Showing

**Cause 1: Strapi v5 doesn't support preview config in admin.ts**

Strapi v5 changed how preview works. The `preview` configuration in `admin.ts` might not be supported.

**Solution:** Use manual preview URL

1. Copy this URL template:
```
http://localhost:3000/api/preview?slug=YOUR_SLUG_HERE&secret=your-secure-preview-secret-change-in-production
```

2. Replace `YOUR_SLUG_HERE` with your actual slug
3. Open in browser

**Example:**
```
http://localhost:3000/api/preview?slug=test-page&secret=your-secure-preview-secret-change-in-production
```

### Cause 2: Need to Install Preview Plugin

Strapi v5 might require a plugin for preview functionality.

**Check if preview plugin exists:**
```bash
cd strapi-cms
npm search @strapi/plugin-preview
```

If it exists, install it:
```bash
npm install @strapi/plugin-preview
```

Then add to `config/plugins.ts`:
```typescript
export default {
  preview: {
    enabled: true,
    config: {
      contentTypes: {
        'api::bai-viet.bai-viet': {
          previewUrl: `${process.env.FRONTEND_URL}/api/preview`,
          query: {
            slug: '{slug}',
            secret: process.env.PREVIEW_SECRET,
          },
        },
      },
    },
  },
};
```

---

## Alternative: Manual Preview Workflow

If automatic preview button doesn't work, use this manual workflow:

### Step 1: Create Preview Bookmark

Create a browser bookmark with this URL:
```
javascript:(function(){const slug=prompt('Enter slug:');if(slug){window.open(`http://localhost:3000/api/preview?slug=${slug}&secret=your-secure-preview-secret-change-in-production`,'_blank');}})();
```

### Step 2: Use Bookmark

1. Edit content in Strapi
2. Note the slug value
3. Click the bookmark
4. Enter the slug
5. Preview opens in new tab

### Step 3: Or Use Direct URL

Manually construct the URL:
```
http://localhost:3000/api/preview?slug={your-slug}&secret={your-secret}
```

---

## Verify Preview System Works

### Test Without Strapi Button

1. Create a draft entry with slug: `test-preview`
2. Open this URL in browser:
```
http://localhost:3000/api/preview?slug=test-preview&secret=your-secure-preview-secret-change-in-production
```

3. Should see:
   - Yellow banner: "Preview Mode Enabled"
   - Draft content displayed
   - "Exit Preview" button

If this works, the preview system is functional. The issue is just the Strapi admin button configuration.

---

## Next Steps

1. Choose Option 1 or Option 2 above
2. Add slug field to your content type
3. Test manual preview URL first
4. If manual preview works, investigate Strapi v5 preview button configuration
5. Consider creating a custom Strapi plugin for preview button if needed

---

## Summary

The preview API routes in Next.js are working correctly. The issue is:
- **Missing `slug` field** in your content type
- **Strapi v5 preview button** configuration might work differently

**Quick Fix:** Add slug field and use manual preview URLs until we configure the Strapi button properly.
