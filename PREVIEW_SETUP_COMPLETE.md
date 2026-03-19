# Preview System Setup - Complete Guide

## Problem Identified

The error occurred because:
1. **Frontend expects `/api/pages` endpoint** - but you only had "Bài viết" content type
2. **No "Page" content type existed** in Strapi
3. **API endpoint mismatch** - Frontend looking for "pages", Strapi has "bai-viets"

## Solution Implemented

I created a new "Page" content type in Strapi that matches what the frontend expects.

### Files Created in Strapi:

```
strapi-cms/src/api/page/
├── content-types/page/
│   └── schema.json          ← Content type definition
├── controllers/
│   └── page.ts              ← API controller
├── services/
│   └── page.ts              ← Business logic
└── routes/
    └── page.ts              ← API routes
```

### Documentation Created:

1. `strapi-cms/SETUP_PAGE_CONTENT_TYPE.md` - Step-by-step setup guide
2. `strapi-cms/PREVIEW_QUICK_FIX.md` - Quick reference
3. `strapi-cms/PREVIEW_SETUP_FIX.md` - Detailed troubleshooting

## What You Need to Do Now

### Step 1: Restart Strapi (REQUIRED)

```bash
# Stop Strapi (Ctrl+C in terminal)
cd strapi-cms
npm run develop
```

Strapi will automatically detect and register the new "Page" content type.

### Step 2: Set API Permissions

1. Open http://localhost:1337/admin
2. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
3. Click **Public**
4. Find **Page** section
5. Enable:
   - ✅ `find`
   - ✅ `findOne`
6. Click **Save**

### Step 3: Create Test Page

1. Go to **Content Manager** → **Page**
2. Click **Create new entry**
3. Fill in:
   - Title: `Test Page`
   - Slug: `test-page` (auto-generates)
   - Content: `This is a test page for preview`
4. **Save as draft** (don't publish)

### Step 4: Test Preview

Open in browser:
```
http://localhost:3000/api/preview?slug=test-page&secret=your-secure-preview-secret-change-in-production
```

Expected result:
- ✅ Yellow banner "Preview Mode Enabled"
- ✅ Page content displayed
- ✅ "Exit Preview" button works

## Quick Test Commands

### Test Strapi API:
```bash
# Check if Page content type is registered
curl http://localhost:1337/api/pages

# Should return: {"data":[],"meta":{...}}
```

### Test with API Token:
```bash
# Get draft content
curl -H "Authorization: Bearer 5625204907b30642c04ed30804b533a89d5febcd08cef7e4f107867fcb6b3bbade9a1d81ccecc761add66a5341e0b2a160efa5ebebf5f1e08aa6194c9dcec9479865b7e1e136c89568e06226d8530303c75f84a57f2317722b95a53f5a342a4e23c385e89e6745dcfe8123b7076e41771abdc54e36be07bc25a08307acf84156" \
  "http://localhost:1337/api/pages?filters[slug][\$eq]=test-page&publicationState=preview&populate=deep"
```

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│  User clicks preview URL                                    │
│  http://localhost:3000/api/preview?slug=test-page&secret=X  │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  Next.js Preview API (/api/preview/route.ts)               │
│  1. Validates secret                                        │
│  2. Enables draft mode                                      │
│  3. Redirects to /test-page                                 │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  Next.js Page (/[slug]/page.tsx)                           │
│  1. Detects draft mode                                      │
│  2. Calls getPageBySlug('test-page', isDraftMode=true)      │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  API Client (lib/api/client.ts)                            │
│  Adds: publicationState=preview                             │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  Strapi API                                                 │
│  GET /api/pages?filters[slug][$eq]=test-page               │
│      &publicationState=preview&populate=deep                │
│                                                             │
│  Returns: Draft + Published content                         │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  Browser Display                                            │
│  - Yellow preview banner                                    │
│  - Draft content                                            │
│  - Exit preview button                                      │
└─────────────────────────────────────────────────────────────┘
```

## Troubleshooting

### Still getting 404 error?

1. **Check Strapi restarted:** New content type requires restart
2. **Check permissions:** Public role needs `find` and `findOne` for Page
3. **Check page exists:** Create at least one page entry
4. **Check slug matches:** URL slug must match page slug exactly

### Preview button not showing in Strapi?

Strapi v5 may not support the preview button configuration. Use manual URLs:

**Bookmark this:**
```javascript
javascript:(function(){const slug=prompt('Enter slug:');if(slug){window.open(`http://localhost:3000/api/preview?slug=${slug}&secret=your-secure-preview-secret-change-in-production`,'_blank');}})();
```

## Summary

✅ **Created:** Page content type in Strapi
✅ **Configured:** API routes, controller, service
✅ **Updated:** Admin configuration for preview
✅ **Documented:** Complete setup guide

⏳ **Next:** Restart Strapi → Set permissions → Create test page → Test preview

The preview system is ready - just needs Strapi restart and configuration!
