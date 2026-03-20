# AI Execution Rules

## 🎯 Purpose

This document defines **mandatory rules** that all AI agents MUST follow when working on this codebase. These rules ensure consistency, quality, and prevent regressions.

---

## ⚠️ CRITICAL: MANDATORY STATEMENT

**Before performing ANY task, the AI agent MUST state EXACTLY:**

```
"I have fully understood the system through the provided documentation."
```

**This statement MUST:**
- Be written in English
- Appear BEFORE any action or response
- Confirm that all `.ai/` documentation has been read
- Indicate understanding of system architecture

**If this statement is missing, the AI has NOT followed the rules.**

---

## 📚 RULE 1: CONTEXT LOADING (MANDATORY)

### Before ANY Action

**The AI agent MUST:**

1. **Read ALL files in `.ai/` directory:**
   - `.ai/SYSTEM.md` - System overview
   - `.ai/ARCHITECTURE.md` - Architecture details
   - `.ai/DATA_FLOW.md` - Data flow and API contracts
   - `.ai/FRONTEND_GUIDE.md` - Frontend development guide
   - `.ai/CMS_GUIDE.md` - CMS usage guide
   - `.ai/AI_RULES.md` - This file

2. **Understand the system:**
   - Tech stack (Next.js 15 + Strapi v5)
   - Architecture (decoupled headless CMS)
   - Data flow (Strapi → API → Next.js)
   - Component structure
   - Block system
   - Preview mode
   - Revalidation system

3. **Verify understanding:**
   - Can explain how data flows
   - Can explain preview mode
   - Can explain cache strategy
   - Can explain block system

### Verification Checklist

Before proceeding, the AI MUST be able to answer:

- [ ] What is the tech stack?
- [ ] How does data flow from Strapi to Next.js?
- [ ] How does preview mode work?
- [ ] How does cache revalidation work?
- [ ] What is the block system?
- [ ] What are the API parameters for draft vs published?
- [ ] Where are components located?
- [ ] What is the cache strategy?

**If ANY answer is unclear, STOP and re-read documentation.**

---

## 🚫 RULE 2: NO ASSUMPTIONS

### Never Assume

**The AI agent MUST NOT assume:**

❌ API endpoints or parameters  
❌ File locations or structure  
❌ Component names or props  
❌ Environment variable names  
❌ Cache behavior  
❌ Data transformation logic  
❌ Strapi version or API syntax  

### Always Verify

**The AI agent MUST:**

✅ Read actual code before making changes  
✅ Check existing patterns  
✅ Verify file locations  
✅ Confirm API contracts  
✅ Test assumptions against documentation  

### Example: Wrong vs Right

**❌ WRONG (Assumption):**
```typescript
// Assuming Strapi v4 syntax
url.searchParams.append('publicationState', 'preview');
```

**✅ RIGHT (Verified):**
```typescript
// Checked documentation: Strapi v5 uses 'status'
url.searchParams.append('status', 'draft');
```

---

## 🎯 RULE 3: CONSISTENCY

### Follow Existing Patterns

**The AI agent MUST:**

1. **Match existing code style:**
   - Use same naming conventions
   - Follow same file structure
   - Use same import patterns
   - Match formatting

2. **Use established patterns:**
   - Server Components by default
   - Client Components only when needed
   - API client for all Strapi requests
   - Transformers for data transformation

3. **Maintain architecture:**
   - Don't introduce new layers
   - Don't bypass existing abstractions
   - Don't create duplicate functionality

### Code Style Examples

**Component Naming:**
```typescript
// ✅ Correct: PascalCase for components
export function HeroBlock() {}

// ❌ Wrong: camelCase
export function heroBlock() {}
```

**File Naming:**
```typescript
// ✅ Correct: PascalCase for components
HeroBlock.tsx

// ❌ Wrong: kebab-case
hero-block.tsx
```

**Import Order:**
```typescript
// ✅ Correct order:
import { useState } from 'react';           // 1. External
import { Button } from '@/components/ui';   // 2. Internal
import type { Page } from '@/types';        // 3. Types
import './styles.css';                      // 4. Styles
```

---

## 🏢 RULE 4: ENTERPRISE STANDARDS

### All Solutions MUST Follow

**1. Scalability**
- Code must handle growth
- No hardcoded limits
- Efficient algorithms
- Proper pagination

**2. Security**
- Validate all inputs
- Sanitize user data
- Use environment variables for secrets
- Never expose sensitive data

**3. Maintainability**
- Clear, descriptive names
- Comprehensive comments
- Modular structure
- Easy to understand

**4. Performance**
- Optimize data fetching
- Minimize client JavaScript
- Use proper caching
- Optimize images

**5. Accessibility**
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Alt text for images

**6. Error Handling**
- Try-catch blocks
- Graceful degradation
- User-friendly messages
- Comprehensive logging

### Example: Enterprise-Grade Code

```typescript
/**
 * Fetch page by slug with error handling and caching
 * 
 * @param slug - Page slug
 * @param isDraftMode - Whether to fetch draft content
 * @returns Page data or null if not found
 */
export async function getPageBySlug(
  slug: string,
  isDraftMode: boolean = false
): Promise<Page | null> {
  try {
    // Validate input
    if (!slug || typeof slug !== 'string') {
      console.error('[getPageBySlug] Invalid slug:', slug);
      return null;
    }

    // Fetch with proper caching
    const response = await apiClient<StrapiPages>('/api/pages', {
      params: {
        'filters[slug][$eq]': slug,
        populate: '*',
      },
      isDraftMode,
      tags: ['pages', 'page'],
    });

    // Handle empty response
    if (!response.data || response.data.length === 0) {
      console.warn(`[getPageBySlug] Page not found: ${slug}`);
      return null;
    }

    // Transform and return
    return transformPage({
      data: response.data[0],
      meta: response.meta,
    });
  } catch (error) {
    // Log error with context
    console.error('[getPageBySlug] Error fetching page:', {
      slug,
      isDraftMode,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return null;
  }
}
```

---

## ✅ RULE 5: VALIDATION FIRST

### Before Making Changes

**The AI agent MUST validate:**

1. **Data Flow**
   - Understand current flow
   - Identify impact of changes
   - Verify no breaking changes

2. **Preview Logic**
   - Check draft mode detection
   - Verify status parameter
   - Test preview flow

3. **Revalidation Logic**
   - Check webhook handling
   - Verify cache invalidation
   - Test tag/path revalidation

4. **Component Integration**
   - Check component hierarchy
   - Verify prop types
   - Test rendering

### Validation Checklist

Before committing changes:

- [ ] Code compiles without errors
- [ ] TypeScript types are correct
- [ ] No console errors
- [ ] Preview mode works
- [ ] Published content works
- [ ] Cache invalidation works
- [ ] No regressions in existing features

---

## 🔄 RULE 6: STRAPI V5 COMPATIBILITY

### Critical: API Parameter Syntax

**ALWAYS use Strapi v5 syntax:**

```typescript
// ✅ CORRECT (Strapi v5)
status=draft          // For draft content
status=published      // For published content

// ❌ WRONG (Strapi v4 - deprecated)
publicationState=preview
publicationState=live
```

### Verification

**Before using any Strapi API parameter:**

1. Check `.ai/DATA_FLOW.md` for correct syntax
2. Verify in existing code
3. Test with actual API call

### Breaking Change Alert

**Strapi v4 → v5 Breaking Changes:**
- `publicationState` → `status`
- `preview` → `draft`
- `live` → `published`

**If you see old syntax, it's a BUG that needs fixing.**

---

## 🎨 RULE 7: COMPONENT PATTERNS

### Server Components (Default)

**Use Server Components for:**
- Data fetching
- Static content
- SEO-critical content
- Non-interactive UI

```typescript
// ✅ Server Component (default)
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

### Client Components (Opt-in)

**Use Client Components ONLY for:**
- User interactions
- React hooks (useState, useEffect)
- Browser APIs
- Event handlers

```typescript
// ✅ Client Component (opt-in)
'use client';

export function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Never Mix Incorrectly

```typescript
// ❌ WRONG: Using hooks in Server Component
export default async function Page() {
  const [state, setState] = useState(); // ERROR!
  return <div>{state}</div>;
}

// ❌ WRONG: Fetching data in Client Component
'use client';
export function Component() {
  const data = await fetchData(); // ERROR!
  return <div>{data}</div>;
}
```

---

## 📦 RULE 8: FILE ORGANIZATION

### Where to Put Files

**Components:**
```
src/components/
├── blocks/           # Content blocks (Hero, Services, CTA)
├── forms/            # Form components
├── ui/               # UI primitives (Button, Input, etc.)
└── [Component].tsx   # Shared components
```

**API Layer:**
```
src/lib/api/
├── client.ts         # API client (fetch wrapper)
├── queries.ts        # Query functions
├── transformers.ts   # Data transformers
└── debug.ts          # Debug utilities
```

**Types:**
```
src/types/
└── strapi.ts         # All Strapi-related types
```

**Pages:**
```
src/app/
├── [slug]/           # Dynamic pages
├── api/              # API routes
├── layout.tsx        # Root layout
└── page.tsx          # Homepage
```

### Naming Conventions

**Files:**
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `camelCase.ts`
- Styles: `kebab-case.css`

**Exports:**
- Components: `export function ComponentName()`
- Functions: `export function functionName()`
- Types: `export interface TypeName`
- Constants: `export const CONSTANT_NAME`

---

## 🐛 RULE 9: ERROR HANDLING

### Always Handle Errors

**Every async operation MUST have error handling:**

```typescript
// ✅ CORRECT
try {
  const data = await fetchData();
  return processData(data);
} catch (error) {
  console.error('[Context] Error:', error);
  return fallbackValue;
}

// ❌ WRONG
const data = await fetchData(); // No error handling!
return processData(data);
```

### Error Logging

**Log errors with context:**

```typescript
// ✅ CORRECT
console.error('[getPageBySlug] Error fetching page:', {
  slug,
  isDraftMode,
  error: error instanceof Error ? error.message : 'Unknown',
});

// ❌ WRONG
console.error(error); // No context!
```

### User-Facing Errors

**Show user-friendly messages:**

```typescript
// ✅ CORRECT
return (
  <div className="error-state">
    <h2>Unable to load page</h2>
    <p>Please try again later.</p>
  </div>
);

// ❌ WRONG
return <div>Error: {error.stack}</div>; // Exposes internals!
```

---

## 📝 RULE 10: DOCUMENTATION

### Code Comments

**Add comments for:**
- Complex logic
- Non-obvious decisions
- API contracts
- Important warnings

```typescript
/**
 * Transform Strapi API response to frontend format
 * 
 * Handles both Strapi v4 (nested attributes) and v5 (flat structure)
 * for backward compatibility during migration.
 * 
 * @param strapiPage - Raw API response
 * @returns Transformed page object
 */
export function transformPage(strapiPage: StrapiPage): Page {
  // Extract data (v4 has attributes, v5 is flat)
  const attributes = pageData.attributes || pageData;
  
  // ... transformation logic
}
```

### Update Documentation

**When making changes, update:**
- Code comments
- README files
- `.ai/` documentation (if architecture changes)
- Type definitions

---

## 🔍 RULE 11: TESTING MINDSET

### Before Claiming "Done"

**The AI agent MUST verify:**

1. **Code compiles:**
   ```bash
   npm run build
   ```

2. **No TypeScript errors:**
   ```bash
   npx tsc --noEmit
   ```

3. **No linting errors:**
   ```bash
   npm run lint
   ```

4. **Manual testing:**
   - Preview mode works
   - Published content works
   - Cache invalidation works
   - No console errors

### Test Scenarios

**Always test these scenarios:**

1. **Draft Content:**
   - Create draft page
   - Preview draft
   - Verify draft not public

2. **Published Content:**
   - Publish page
   - Verify public access
   - Check cache

3. **Updates:**
   - Update published page
   - Verify webhook triggers
   - Check cache invalidates
   - Verify new content appears

---

## 🚨 RULE 12: BREAKING CHANGES

### Never Introduce Breaking Changes

**The AI agent MUST NOT:**

❌ Change API contracts without migration  
❌ Remove existing functionality  
❌ Change component props without updating usage  
❌ Modify data structures without transformers  
❌ Change environment variable names  

### If Breaking Change is Necessary

**The AI agent MUST:**

1. **Document the change:**
   - What is changing
   - Why it's necessary
   - Migration path

2. **Provide migration:**
   - Update all usage
   - Add deprecation warnings
   - Create migration guide

3. **Test thoroughly:**
   - All affected code
   - All user flows
   - All edge cases

---

## ✅ EXECUTION CHECKLIST

### Before Starting Any Task

- [ ] Read all `.ai/` documentation
- [ ] State: "I have fully understood the system through the provided documentation."
- [ ] Understand the specific task
- [ ] Identify affected files
- [ ] Check existing patterns
- [ ] Plan the approach

### During Implementation

- [ ] Follow existing patterns
- [ ] Use correct Strapi v5 syntax
- [ ] Add proper error handling
- [ ] Add TypeScript types
- [ ] Add code comments
- [ ] Follow naming conventions
- [ ] Use Server Components by default

### After Implementation

- [ ] Code compiles
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Manual testing passed
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] No regressions

---

## 🎯 QUALITY STANDARDS

### Code Quality

**Every change MUST meet:**

- ✅ Compiles without errors
- ✅ Type-safe (no `any` types)
- ✅ Follows existing patterns
- ✅ Has error handling
- ✅ Has proper logging
- ✅ Is well-documented
- ✅ Is maintainable
- ✅ Is performant

### Architecture Quality

**Every change MUST:**

- ✅ Fit existing architecture
- ✅ Not introduce new layers
- ✅ Not bypass abstractions
- ✅ Not create tight coupling
- ✅ Be scalable
- ✅ Be testable

---

## 🚀 DEPLOYMENT READINESS

### Production-Ready Code

**Every change MUST be:**

- ✅ Secure (no vulnerabilities)
- ✅ Performant (no bottlenecks)
- ✅ Scalable (handles growth)
- ✅ Maintainable (easy to understand)
- ✅ Documented (clear comments)
- ✅ Tested (manually verified)
- ✅ Error-handled (graceful failures)

---

## 📋 SUMMARY

### The 12 Mandatory Rules

1. **Context Loading** - Read all `.ai/` docs before ANY action
2. **No Assumptions** - Always verify, never assume
3. **Consistency** - Follow existing patterns
4. **Enterprise Standards** - Scalable, secure, maintainable
5. **Validation First** - Verify data flow, preview, revalidation
6. **Strapi v5 Compatibility** - Use `status=draft/published`
7. **Component Patterns** - Server by default, Client when needed
8. **File Organization** - Follow established structure
9. **Error Handling** - Always handle errors gracefully
10. **Documentation** - Comment complex logic, update docs
11. **Testing Mindset** - Verify before claiming done
12. **Breaking Changes** - Never introduce without migration

### The Mandatory Statement

**Before ANY action, state:**

```
"I have fully understood the system through the provided documentation."
```

### Failure to Follow Rules

**If rules are not followed:**
- Code quality suffers
- Bugs are introduced
- Regressions occur
- System becomes unmaintainable
- Production issues arise

**Following these rules ensures:**
- ✅ Consistent code quality
- ✅ No regressions
- ✅ Maintainable codebase
- ✅ Production-ready changes
- ✅ Happy developers and users

---

**These rules are MANDATORY. No exceptions.**
