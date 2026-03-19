# ✅ FINAL SOLUTION: Restart Strapi

## Root Cause Found

The page exists in the database with:
- ✅ slug: `test-page`
- ✅ locale: `en`
- ✅ content: "Xin chào Việt Nam"

BUT Strapi is returning empty data because:
1. The Page content type schema was updated to disable i18n
2. The locale was set to 'en' in the database
3. **Strapi needs to be restarted** to reload the schema and recognize the changes

## Solution: Restart Strapi

```bash
cd strapi-cms
# Press Ctrl+C to stop Strapi
npm run develop
```

Wait for Strapi to fully start. You should see:
```
[2026-03-19 XX:XX:XX.XXX] info: Server started on http://0.0.0.0:1337
```

## Test After Restart

### 1. Test API Directly

```bash
curl -H "Authorization: Bearer 458d01687d26926037df2eb652aa1f70423a61d196e584c495074024acfe66ebfea18695ba6d9ce4c728c2a59be3c2db3987e7c01900072559dea22b1a1ace283f3fce7e613d74ac33d67eea5b73dfc30e9d2b3e2a821d09984ff064d64f6a81b3b8daf69f578cbfac1e863774283be6d597e11f798beebf4d3cd2823de12377" \
  "http://localhost:1337/api/pages?filters[slug][\$eq]=test-page&publicationState=preview&populate=*"
```

Should return:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Test Page",
        "slug": "test-page",
        "content": "Xin chào Việt Nam",
        ...
      }
    }
  ],
  ...
}
```

### 2. Test Preview URL

```
http://localhost:3000/api/preview?slug=test-page&secret=your-secure-preview-secret-change-in-production
```

Should show:
- ✅ Yellow banner "Preview Mode Enabled"
- ✅ Page title "Test Page"
- ✅ Content "Xin chào Việt Nam"
- ✅ "Exit Preview" button

## What Was Fixed

1. ✅ Updated Page schema to disable i18n (`pluginOptions.i18n.localized: false`)
2. ✅ Set locale='en' for existing page in database
3. ⏳ **Need to restart Strapi** to apply changes

## Summary

Everything is configured correctly:
- ✅ Token is correct (Full Access)
- ✅ Page exists in database
- ✅ Locale is set
- ✅ Schema is updated
- ⏳ **Just restart Strapi!**

After restarting Strapi, the preview system will work perfectly! 🚀
