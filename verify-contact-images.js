const STRAPI_URL = 'https://pediatric-expired-through-casinos.trycloudflare.com';

const images = [
  'dental_consultation_d555f4a87c.jpg',  // Form section image
  'clinic_interior_d7_81acf81d4a.jpg',   // Location fallback image
  'clinic_reception_d1_a7f717d93a.jpg'   // Alternative clinic image
];

async function verifyImages() {
  console.log('🔍 Verifying Contact Us page images...\n');
  
  for (const image of images) {
    const url = `${STRAPI_URL}/uploads/${image}`;
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        console.log(`✅ ${image} - OK`);
      } else {
        console.log(`❌ ${image} - Status: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${image} - Error: ${error.message}`);
    }
  }
  
  console.log('\n✨ Verification complete!');
  console.log('\n📝 Images used in Contact page:');
  console.log('  - Form section: dental_consultation_d555f4a87c.jpg');
  console.log('  - Location cards: clinic_interior_d7_81acf81d4a.jpg (fallback)');
}

verifyImages();
