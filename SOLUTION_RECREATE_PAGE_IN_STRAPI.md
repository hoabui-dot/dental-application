# Solution: News Page Not Visible in Strapi Admin UI

## Problem
The news-listing page exists in the database and is accessible via API, but is not visible in the Strapi admin Content Manager UI.

## Root Cause
**Pagination Issue**: The Strapi admin panel has a default "Entries per page" setting of 5, but there are 12 total pages in the database. The news-listing page (ID: 27) is at the end of the list and appears on page 2 or 3 of the pagination.

## Database Status
```
Total pages: 12
- Published: 7
- Drafts: 5

Page IDs: 2, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27

news-listing page:
- ID: 27 (last page in database)
- Document ID: news-1774333280752
- Published: YES (2026-03-24T00:08:11.234Z)
- Locale: NULL (same as all other pages)
- All metadata present and correct
```

## Solution Steps

### Option 1: Change Pagination Settings (Recommended)
1. Go to Strapi admin: http://localhost:1337/admin/content-manager/collection-types/api::page.page
2. Look at the bottom of the page list
3. Find the "Entries per page" dropdown (currently set to 5)
4. Change it to 10 or 25
5. The news-listing page should now be visible

### Option 2: Use Pagination Controls
1. Scroll to the bottom of the page list
2. Look for pagination controls (Page 1, 2, 3, etc.)
3. Click on page 2 or 3
4. The news-listing page should appear

### Option 3: Use Search
1. In the Strapi admin Content Manager
2. Use the search box at the top
3. Search for "news-listing" or "News & Blog"
4. The page should appear in search results

### Option 4: Hard Refresh Browser
1. Press Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
2. This clears any cached admin panel state
3. Then try the pagination options above

## Verification
The page is confirmed to be:
- ✅ In the database (ID: 27)
- ✅ Published (published_at set)
- ✅ Has all required metadata (created_at, updated_at)
- ✅ Accessible via API
- ✅ Has correct structure (same as services-listing)
- ✅ Frontend can fetch and display it

## API Access
The page is accessible via:
```bash
curl -H "Authorization: Bearer <token>" \
  "https://pediatric-expired-through-casinos.trycloudflare.com/api/pages?filters[slug][$eq]=news-listing"
```

## Next Steps
1. Check the Strapi admin UI pagination controls
2. Change "Entries per page" to 10 or 25
3. Verify the news-listing page is now visible
4. Edit the page content as needed in the admin panel

## Technical Details
- Strapi Version: v5 (uses document system)
- Database: PostgreSQL at 100.68.50.41:5437
- All pages have locale=NULL (this is correct and consistent)
- The admin UI default pagination is 5 entries per page
- This is a UI display issue, not a database or API issue
