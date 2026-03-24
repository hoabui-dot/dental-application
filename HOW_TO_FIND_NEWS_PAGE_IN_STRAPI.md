# How to Find News Page in Strapi Admin

## ✅ The News Page EXISTS!

The news page is successfully created and accessible. Here's where to find it:

## Location in Strapi Admin

### Step 1: Navigate to Content Manager
1. Click on **"Content Manager"** in the left sidebar
2. Look under **"COLLECTION TYPES"** section

### Step 2: Click on "Page" (NOT "Blog")
- You should see:
  - Blog (6 entries) ← This is for blog posts
  - **Page** ← This is where the news page is!
  - User

### Step 3: Find the News Page
In the Page collection, you'll see 7 pages:
1. Nha Khoa Quốc Tế SG Thực Hiện Nâng Cấp Cơ Sở Vật Chất
2. Niềng răng Invisalign
3. Bọc răng sứ thẩm mỹ
4. Dịch vụ nha khoa
5. Cấy ghép Implant
6. Tẩy trắng răng
7. **News & Blog Listing Page** ← This is it!

## Page Details

**Title:** News & Blog Listing Page
**Slug:** news-listing
**Status:** Published ✅
**ID:** 27
**Document ID:** news-1774333280752

## Content Structure

The page contains a JSON object in the `content` field with:

```json
{
  "hero": {
    "title": "Tin tức & Kiến thức nha khoa",
    "description": "Cập nhật những thông tin mới nhất...",
    "searchPlaceholder": "Tìm kiếm bài viết..."
  },
  "categories": [
    { "id": "all", "label": "Tất cả" },
    { "id": "implant", "label": "Implant" },
    { "id": "nieng-rang", "label": "Niềng răng" },
    { "id": "tay-trang", "label": "Tẩy trắng" },
    { "id": "rang-su", "label": "Răng sứ" },
    { "id": "cham-soc-rang", "label": "Chăm sóc răng" }
  ],
  "sidebar": {
    "popularPostsTitle": "Bài viết phổ biến",
    "tagsTitle": "Thẻ phổ biến",
    "tags": [...],
    "cta": {
      "title": "Đặt lịch tư vấn miễn phí",
      "description": "Nhận tư vấn chuyên sâu...",
      "buttonText": "Đặt lịch ngay",
      "buttonLink": "/booking"
    }
  },
  "emptyState": {
    "message": "Không tìm thấy bài viết nào"
  },
  "readMoreText": "Đọc thêm",
  "readNowText": "Đọc ngay"
}
```

## How to Edit

1. Go to Content Manager → Page
2. Click on "News & Blog Listing Page"
3. Edit the `content` field (it's a JSON text field)
4. Click "Save" and "Publish"

## API Access

The page is accessible via:
```
GET /api/pages?filters[slug][$eq]=news-listing
```

## Verification

✅ Database: Page exists in `pages` table
✅ API: Page is accessible via Strapi API
✅ Frontend: Page content is fetched and displayed
✅ Published: Page is published and live

## Why It's in "Page" Not "Blog"

- **Blog** collection = Individual blog posts (articles)
- **Page** collection = Static pages (homepage, services, news listing, etc.)

The news listing page is a static page that displays blog posts, so it belongs in the Page collection!
