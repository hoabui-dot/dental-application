const STRAPI_URL = 'https://pediatric-expired-through-casinos.trycloudflare.com';

const images = [
  'dental_team_db6d3d4f6f.jpg',
  'patient_consultation_dcf1a32d50.jpg',
  'clinic_interior_205c275757.jpg',
  'happy_patient_3d6d7753d6.jpg',
  'achievements_0a8d515d49.jpg',
  'dental_technology_127ddfeaa3.jpg',
  'patient_consultation_9a28199a36.jpg',
  'happy_patient_afecb1a4d6.jpg',
  'clinic_interior_446d260b23.jpg',
  'dental_consultation_d555f4a87c.jpg'
];

async function verifyImages() {
  console.log('🔍 Verifying About Us page images...\n');
  
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
}

verifyImages();
