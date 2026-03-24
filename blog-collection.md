You are a senior fullstack engineer (Next.js + Strapi + PostgreSQL).

Your task is to implement a **Blog Collection Grid system** that aggregates multiple blog posts into a single section and displays them in a grid layout.

---

# 🎯 OBJECTIVE

* Create a reusable **BlogCollection component (Strapi)**
* Display multiple blog posts in a **grid layout on frontend**
* Follow **DATA-FIRST architecture**
* Support **production deployment with PostgreSQL**
* Separate **migration script** and **setup script**

---

# ⚠️ CRITICAL RULES

* ALWAYS implement CMS (DB + API) FIRST
* DO NOT implement frontend before data is ready
* MUST use PostgreSQL connection below
* MUST call Strapi API when needed
* CODE ONLY (no explanation)
* Frontend step: ONLY run lint + type-check

---

# 🧩 STEP 1 — ANALYZE EXISTING BLOG SYSTEM

* Identify existing blog collection type (e.g. Article / Blog)
* Ensure it has:

  * title
  * slug
  * cover image
  * excerpt
  * publishedAt

---

# 🧱 STEP 2 — CREATE NEW STRAPI COMPONENT

Create component:

```id="component"
BlogCollectionSection
```

---

## FIELDS:

* title (string)
* subtitle (text)
* posts (relation → many Blog/Article)
* layout (enum: grid_2 | grid_3 | grid_4)
* showFeatured (boolean)
* isActive (boolean)

---

# 🧩 STEP 3 — UPDATE HOMEPAGE

* Add BlogCollectionSection into Homepage Dynamic Zone
* Position:

  * after Hero section

---

# 🧪 STEP 4 — MIGRATION SCRIPT (DB + API)

Create script:

```id="migration"
migration_scripts/007-add-blog-collection-section.ts
```

---

## REQUIREMENTS:

* Use PostgreSQL connection:

```env id="env"
HOST=100.68.50.41
PORT=5437
POSTGRES_DB=dental_cms_strapi
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

---

## SCRIPT MUST:

1. Connect to PostgreSQL
2. Ensure component exists (idempotent)
3. Insert BlogCollectionSection data
4. Fetch existing blog posts (limit 6–8)
5. Attach posts to collection
6. Insert into Homepage dynamic zone

---

## MUST ALSO:

* Call Strapi API https://pediatric-expired-through-casinos.trycloudflare.com (ALWAYS use strapi with api)
* Ensure data integrity

---

# 🧩 STEP 5 — SETUP SCRIPT (SEPARATE)

Create a second script (NOT inside migration_scripts):

```id="setup"
/scripts/setup-blog-collection.ts
```

---

## PURPOSE:

* Reusable for production setup
* Can be run independently

---

## FUNCTION:

* Fetch blog posts
* Create or update BlogCollectionSection
* Link posts dynamically
* Update homepage

---

# ⚠️ IMPORTANT

* DO NOT place this script in migration_scripts
* This script is for runtime / production reuse

---

# 🧪 STEP 6 — RUN & VERIFY

You MUST:

1. Run migration script
2. Run setup script

---

## VERIFY:

* BlogCollectionSection exists
* Posts are linked
* Section appears in homepage
* Data is correct

---

## CONFIRM:

```id="status"
STATUS: DONE
```

---

# ⚙️ STEP 7 — FRONTEND (Next.js)

ONLY AFTER STATUS: DONE

---

## CREATE:

```id="path"
/components/homepage/blog-collection/
```

---

## REQUIREMENTS:

* Fetch data from Strapi
* Render grid layout
* Responsive (mobile-first)
* No hardcoded data

---

## GRID:

* 2 / 3 / 4 columns (based on CMS layout)
* Card includes:

  * image
  * title
  * excerpt
  * link

---

# ⚡ FINAL STEP

Run:

```bash id="check"
npm run lint
npm run type-check
```

---

# 🧪 OUTPUT REQUIREMENTS

You MUST provide:

1. Migration script (007)
2. Setup script (separate folder)
3. DB connection code
4. API integration
5. Verification steps
6. Frontend component
7. Lint + type-check result

---

# 🚀 FINAL GOAL

* Fully CMS-driven blog collection section
* Reusable setup script for production
* Clean architecture
* Scalable system

---

# 🔥 IMPORTANT

* NO hardcoded data
* MUST use DB + API
* MUST separate migration and setup scripts
* MUST follow DATA-FIRST strictly

---

Think like a backend architect and system designer.
