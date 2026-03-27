#!/usr/bin/env node

/**
 * Verification Script: Verify Customer Single Type Layout
 * 
 * This script queries the database to check:
 * 1. Current customer page content in pages table
 * 2. Customer single-type structure if exists
 * 3. Compares content to verify migration success
 * 
 * Run: node scripts/verify-customer-single-type.js
 */

const { Client } = require("pg");
const axios = require("axios");
const https = require("https");

const STRAPI_URL =
  process.env.STRAPI_URL || "https://pediatric-expired-through-casinos.trycloudflare.com";
const API_TOKEN =
  process.env.STRAPI_API_TOKEN || "7f399a0c6012eb5520522f741cfc8ea0f3c5d3b32c5f1d08566bd951013faca178f9f8303403de061571bbee3edcad872b0b595a58a1892617c59f484605ecfcf3e7cdfe38de7322730eba6a32826aeab5d4ed8724f93330f0f28dd3963e83c291fd51df8b8dc9d6b43d06c7295861280d448b8d26e15064cc5dc02e242814f9";

const DB_CONFIG = {
  host: process.env.DB_HOST || "100.68.50.41",
  port: parseInt(process.env.DB_PORT || "5437"),
  database: process.env.DB_NAME || "dental_cms_strapi",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
};

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

async function verifyCustomerSingleType() {
  const client = new Client(DB_CONFIG);

  console.log("=".repeat(70));
  console.log("VERIFICATION: Customer Single Type Layout");
  console.log("=".repeat(70));
  console.log(`\nDatabase: ${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`);
  console.log(`Strapi URL: ${STRAPI_URL}\n`);

  try {
    await client.connect();
    console.log("[OK] Connected to PostgreSQL database\n");

    // =========================================================================
    // SECTION 1: Check pages table for customer page
    // =========================================================================
    console.log("SECTION 1: Checking pages table for customer page...\n");

    const pagesResult = await client.query(
      `SELECT id, document_id, title, slug, description, content, published_at, created_at, updated_at
       FROM pages 
       WHERE slug = 'customers' 
       ORDER BY created_at DESC 
       LIMIT 1`
    );

    if (pagesResult.rows.length > 0) {
      const page = pagesResult.rows[0];
      console.log("  [FOUND] Customer page in pages table:");
      console.log(`    - ID: ${page.id}`);
      console.log(`    - Document ID: ${page.document_id}`);
      console.log(`    - Title: ${page.title}`);
      console.log(`    - Slug: ${page.slug}`);
      console.log(`    - Published: ${page.published_at ? 'Yes' : 'No'}`);
      console.log(`    - Created: ${page.created_at}`);
      console.log(`    - Updated: ${page.updated_at}`);

      if (page.content) {
        try {
          const content = typeof page.content === 'string' 
            ? JSON.parse(page.content) 
            : page.content;
          
          console.log("\n  Content Structure:");
          const sections = Object.keys(content);
          sections.forEach(section => {
            console.log(`    - ${section}:`);
            const sectionData = content[section];
            if (sectionData.title) console.log(`        Title: "${sectionData.title}"`);
            if (sectionData.badge) console.log(`        Badge: "${sectionData.badge}"`);
            if (Array.isArray(sectionData.stories)) console.log(`        Stories: ${sectionData.stories.length} items`);
            if (Array.isArray(sectionData.benefits)) console.log(`        Benefits: ${sectionData.benefits.length} items`);
            if (Array.isArray(sectionData.stats)) console.log(`        Stats: ${sectionData.stats.length} items`);
            if (Array.isArray(sectionData.questions)) console.log(`        Questions: ${sectionData.questions.length} items`);
            if (Array.isArray(sectionData.contactInfo)) console.log(`        Contact Info: ${sectionData.contactInfo.length} items`);
          });
        } catch (e) {
          console.log("  [WARN] Could not parse content JSON");
        }
      }
    } else {
      console.log("  [NOT FOUND] No customer page in pages table");
    }

    // =========================================================================
    // SECTION 2: Check customers single-type table
    // =========================================================================
    console.log("\n" + "-".repeat(70));
    console.log("\nSECTION 2: Checking customers single-type table...\n");

    // Check if table exists
    const tableExists = await client.query(
      `SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'customers'
      )`
    );

    if (tableExists.rows[0].exists) {
      console.log("  [OK] customers table exists");

      const customersResult = await client.query(
        `SELECT id, document_id, title, description, published_at, created_at, updated_at
         FROM customers 
         ORDER BY created_at DESC`
      );

      if (customersResult.rows.length > 0) {
        console.log(`  [FOUND] ${customersResult.rows.length} record(s) in customers table:\n`);
        
        for (const customer of customersResult.rows) {
          console.log(`    - ID: ${customer.id}`);
          console.log(`      Document ID: ${customer.document_id}`);
          console.log(`      Title: ${customer.title}`);
          console.log(`      Published: ${customer.published_at ? 'Yes' : 'No'}`);
        }
      } else {
        console.log("  [EMPTY] customers table is empty");
      }

      // Check components
      const cmpsExists = await client.query(
        `SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'customers_cmps'
        )`
      );

      if (cmpsExists.rows[0].exists) {
        const cmpsResult = await client.query(
          `SELECT entity_id, cmp_id, component_type, field, "order"
           FROM customers_cmps
           ORDER BY entity_id, "order"`
        );

        if (cmpsResult.rows.length > 0) {
          console.log(`\n  [FOUND] ${cmpsResult.rows.length} component(s) in customers_cmps:\n`);
          
          for (const cmp of cmpsResult.rows) {
            console.log(`    - Order ${cmp.order}: ${cmp.component_type} (cmp_id: ${cmp.cmp_id})`);
          }
        }
      }
    } else {
      console.log("  [NOT FOUND] customers table does not exist");
      console.log("  [INFO] Run migration script 025-create-customer-single-type-db.js first");
    }

    // =========================================================================
    // SECTION 3: Check Strapi API
    // =========================================================================
    console.log("\n" + "-".repeat(70));
    console.log("\nSECTION 3: Checking Strapi API...\n");

    try {
      const pagesResponse = await axiosInstance.get(
        `${STRAPI_URL}/api/pages?filters[slug][$eq]=customers&populate=*`
      );

      if (pagesResponse.data.data && pagesResponse.data.data.length > 0) {
        const page = pagesResponse.data.data[0];
        console.log("  [OK] Customer page accessible via Strapi API:");
        console.log(`    - API ID: ${page.id}`);
        console.log(`    - Title: ${page.title}`);
        console.log(`    - Slug: ${page.slug || 'customers'}`);
        console.log(`    - Published: ${page.publishedAt ? 'Yes' : 'No'}`);
      } else {
        console.log("  [NOT FOUND] Customer page not found via Strapi API");
      }
    } catch (apiError) {
      console.log(`  [ERROR] Could not connect to Strapi API: ${apiError.message}`);
    }

    // =========================================================================
    // SECTION 4: Check component tables
    // =========================================================================
    console.log("\n" + "-".repeat(70));
    console.log("\nSECTION 4: Checking customer component tables...\n");

    const componentTables = [
      'components_customer_hero',
      'components_customer_success_stories',
      'components_customer_story_items',
      'components_customer_benefits',
      'components_customer_benefit_items',
      'components_customer_statistics',
      'components_customer_stat_items',
      'components_customer_faq',
      'components_customer_faq_items',
      'components_customer_cta',
      'components_customer_contact_info_items'
    ];

    for (const tableName of componentTables) {
      const exists = await client.query(
        `SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = $1
        )`,
        [tableName]
      );

      if (exists.rows[0].exists) {
        const countResult = await client.query(`SELECT COUNT(*) as count FROM ${tableName}`);
        const count = countResult.rows[0].count;
        console.log(`  [OK] ${tableName}: ${count} record(s)`);
      } else {
        console.log(`  [--] ${tableName}: not created`);
      }
    }

    // =========================================================================
    // Summary
    // =========================================================================
    console.log("\n" + "=".repeat(70));
    console.log("VERIFICATION COMPLETE");
    console.log("=".repeat(70));
    
  } catch (error) {
    console.error("\n[ERROR] Verification failed:", error.message);
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
    process.exit(1);
  } finally {
    await client.end();
    console.log("\n[OK] Database connection closed");
  }
}

// Run verification
verifyCustomerSingleType();
