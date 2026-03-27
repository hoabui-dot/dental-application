#!/usr/bin/env node

/**
 * Migration Script: Upload Customer Images to Strapi Media Library
 * 
 * This script reads local image files and uploads them to the active Strapi instance
 * via the REST API to ensure physical files are correctly stored on the server.
 */

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const STRAPI_URL = "https://pediatric-expired-through-casinos.trycloudflare.com";
const API_TOKEN = "17d23dee39bfcd47d333c413e295deee0995354746a0043cd32eed8cadbcf796739ca2627a7f966ad4d6d01a4f3b741efcffab944ee56d9a4961c61c48c4b4746406092c04ccadd7267242d253d8e53597d4433bb481f858ebb651d239f86e5d58bc43eb20b4abbe85170494c046b353a922b65dac0b939485a5f56871edafa1";

const IMAGES_DIR = path.join(__dirname, "../strapi-cms/public/uploads");
const IMAGE_FILES = [
  "happy_customers_hero.jpg",
  "patient_smile.jpg",
  "family_dental.jpg",
  "patient_consultation.jpg"
];

const axiosInstance = axios.create({
  headers: { Authorization: `Bearer ${API_TOKEN}` },
});

async function uploadImages() {
  console.log("=".repeat(80));
  console.log("UPLOADING CUSTOMER IMAGES TO MEDIA LIBRARY");
  console.log("=".repeat(80));

  const mediaIds = {};

  try {
    for (const fileName of IMAGE_FILES) {
      const filePath = path.join(IMAGES_DIR, fileName);
      
      if (!fs.existsSync(filePath)) {
        console.error(`[ERROR] File missing: ${filePath}`);
        continue;
      }

      console.log(`Uploading ${fileName}...`);
      
      const form = new FormData();
      form.append("files", fs.createReadStream(filePath));

      const res = await axiosInstance.post(`${STRAPI_URL}/api/upload`, form, {
        headers: {
          ...form.getHeaders(),
        },
      });

      if (res.data && res.data[0]) {
        const fileId = res.data[0].id;
        mediaIds[fileName] = fileId;
        console.log(`  [OK] Successfully uploaded: ${fileName} (ID: ${fileId})`);
      }
    }

    console.log("\n" + "=".repeat(80));
    console.log("UPLOAD COMPLETE");
    console.log("Summary of Media IDs:");
    console.log(JSON.stringify(mediaIds, null, 2));
    console.log("=".repeat(80));

    // Save mapping to a temp file for the next script
    fs.writeFileSync(path.join(__dirname, "uploaded_media_mapping.json"), JSON.stringify(mediaIds, null, 2));

  } catch (error) {
    if (error.response) {
      console.error("\n[ERROR] Upload Failure:", error.response.status, error.response.data);
    } else {
      console.error("\n[ERROR] Upload failed:", error.message);
    }
  }
}

uploadImages();
