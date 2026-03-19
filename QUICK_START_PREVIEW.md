# Quick Start - Preview System

## 🚀 3-Minute Setup

### 1. Restart Strapi
```bash
cd strapi-cms
# Press Ctrl+C to stop if running
npm run develop
```

### 2. Set Permissions
1. Open http://localhost:1337/admin
2. Settings → Users & Permissions → Roles → Public
3. Find **Page** → Enable `find` and `findOne`
4. Save

### 3. Create Test Page
1. Content Manager → Page → Create new entry
2. Title: `Test Page`
3. Slug: `test-page`
4. Content: `Hello preview!`
5. **Save as draft** (don't publish)

### 4. Test Preview
Open: http://localhost:3000/api/preview?slug=test-page&secret=your-secure-preview-secret-change-in-production

Should see yellow banner + draft content.

## ✅ Success Checklist

- [ ] Strapi restarted (sees Page content type)
- [ ] API permissions set (Public role)
- [ ] Test page created (with slug)
- [ ] Preview URL works (yellow banner appears)

## 🐛 Quick Fixes

**404 Error?**
- Restart Strapi
- Check permissions
- Verify page exists

**403 Error?**
- Set Public role permissions

**No preview button?**
- Use manual URL (see above)
- Create bookmark for easy access

## 📚 Full Documentation

- `strapi-cms/SETUP_PAGE_CONTENT_TYPE.md` - Detailed setup
- `PREVIEW_SETUP_COMPLETE.md` - Complete guide
- `dental-frontend/docs/PREVIEW_MODE_SETUP.md` - Technical docs

## 🎯 What Was Fixed

- ✅ Created "Page" content type (frontend expects this)
- ✅ Added schema, controller, service, routes
- ✅ Configured preview in admin.ts
- ✅ Frontend already has preview system working

Just restart Strapi and test!
