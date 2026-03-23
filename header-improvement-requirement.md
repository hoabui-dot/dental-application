You are a senior fullstack engineer (Next.js + Strapi + PostgreSQL) and UI/UX designer.

Your task is to **completely refactor the Header system** of a dental website ("Nha Khoa Quốc Tế") to support:

* Dropdown menu (multi-level navigation)
* Modern 2026 UI design
* CMS-driven structure (Strapi)
* Clean database + migration consistency

---

# ⚠️ CRITICAL WORKFLOW (STRICT)

You MUST execute in this exact order:

---

# 🧩 STEP 1 — AUDIT CURRENT HEADER SYSTEM

1. Check Strapi:

   * Single Type: Header or Global
   * Existing fields: menu_links

2. Check database:

   * Locate header-related data

3. Check migration_scripts:

   * Identify scripts related to header creation

---

# 🧨 STEP 2 — CLEANUP (MANDATORY)

## 2.1 DELETE HEADER DATA FROM DATABASE

Write SQL query to remove existing header data:

```sql id="delete-header"
DELETE FROM headers;
-- or correct table depending on schema
```

If using components:

```sql id="delete-components"
DELETE FROM components_shared_menu_links;
```

---

## 2.2 CLEAN MIGRATION SCRIPTS

* Locate all migration scripts related to header
* REMOVE or UPDATE them to avoid conflicts

Example:

```id="remove"
migration_scripts/001-init-header.ts
```

* Ensure no duplicate schema creation

---

# 🧱 STEP 3 — CREATE NEW HEADER SCHEMA (STRAPI)

You MUST design a scalable navigation system.

---

## CREATE COMPONENT: NavItem

```id="component-nav"
NavItem
```

FIELDS:

* label (string)
* href (string)
* children (repeatable component: NavItem) ← enables dropdown
* isExternal (boolean)
* icon (optional)

---

## UPDATE SINGLE TYPE: Global / Header

Replace old structure with:

```id="header-schema"
navigation (repeatable NavItem)
logo (media)
ctaText (string)
ctaLink (string)
```

---

# 🧩 STEP 4 — MIGRATION SCRIPT (NEW)

Create:

```id="script"
006-refactor-header-navigation.ts
```

Location:

```id="folder"
migration_scripts/
```

---

## SCRIPT MUST:

* Be idempotent
* Insert new navigation structure
* Support dropdown

---

## SAMPLE DATA:

```json id="data"
[
  {
    "label": "Trang chủ",
    "href": "/"
  },
  {
    "label": "Dịch vụ",
    "href": "/services",
    "children": [
      { "label": "Implant", "href": "/services/implant" },
      { "label": "Niềng răng", "href": "/services/orthodontics" }
    ]
  },
  {
    "label": "Liên hệ",
    "href": "/contact"
  }
]
```

---

# 🧪 STEP 5 — RUN & VERIFY

You MUST:

* Run migration
* Verify:

  * Header data exists
  * Dropdown structure works
  * No old data remains

Then confirm:

```id="status"
STATUS: DONE
```

🚫 DO NOT proceed to frontend before DONE

---

# 🎨 STEP 6 — UI REDESIGN (2026 TREND)

## REMOVE:

* Text logo "Dental CMS"

---

## ADD:

* Logo image (from CMS)
* Sky Blue theme (#38BDF8)

---

## STYLE DIRECTION:

* Clean
* Minimal
* Premium (Apple / Stripe style)

---

## HEADER STYLE:

* Height: ~72px
* Background:

  * transparent (top)
  * white + blur on scroll

---

## NAVIGATION:

* Horizontal menu
* Dropdown on hover

---

## DROPDOWN STYLE:

* Smooth animation
* Shadow + rounded-xl
* White background

---

## CTA BUTTON:

* "Đặt lịch"
* Sky Blue background
* Rounded-xl
* Hover glow

---

# ⚙️ STEP 7 — FRONTEND IMPLEMENTATION (Next.js)

## CREATE:

```id="path"
/components/layout/header/
```

---

## REQUIREMENTS:

* Fetch data from Strapi
* Recursive rendering for dropdown
* No hardcoded menu

---

## DROPDOWN LOGIC:

* If item.children exists → render dropdown

---

## OPTIONAL:

* Mobile menu (hamburger)
* Sticky header
* Scroll effect

---

# ⚡ PERFORMANCE

* Memoize menu rendering
* Avoid unnecessary re-renders

---

# 🧪 OUTPUT REQUIREMENTS

You MUST provide:

1. SQL cleanup queries
2. Updated Strapi schema
3. Migration script (006)
4. Verification steps
5. Next.js header component
6. Dropdown rendering logic

---

# 🚀 FINAL RESULT

* Modern 2026 header
* Dropdown supported
* CMS fully controls navigation
* Clean, scalable architecture

---

# 🔥 IMPORTANT

* REMOVE old header completely
* NO legacy code
* NO hardcoded menu
* FOLLOW data-first strictly

---

Think like a system architect and UI designer.
