const axios = require('axios');

const STRAPI_URL = 'https://pediatric-expired-through-casinos.trycloudflare.com';
const API_TOKEN = '7f399a0c6012eb5520522f741cfc8ea0f3c5d3b32c5f1d08566bd951013faca178f9f8303403de061571bbee3edcad872b0b595a58a1892617c59f484605ecfcf3e7cdfe38de7322730eba6a32826aeab5d4ed8724f93330f0f28dd3963e83c291fd51df8b8dc9d6b43d06c7295861280d448b8d26e15064cc5dc02e242814f9';

async function checkContactData() {
  console.log('🔍 Checking Contact page data from Strapi...\n');
  
  try {
    const response = await axios.get(
      `${STRAPI_URL}/api/pages?filters[slug][$eq]=contact`,
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      }
    );

    if (response.data.data && response.data.data.length > 0) {
      const page = response.data.data[0];
      console.log('✅ Contact page found');
      console.log('📄 Page ID:', page.id);
      console.log('📄 Page documentId:', page.documentId);
      console.log('📄 Page title:', page.title);
      console.log('📄 Page slug:', page.slug);
      console.log('\n📦 Content field type:', typeof page.content);
      console.log('📦 Content length:', page.content?.length || 0);
      
      // Try to parse content
      let parsedContent;
      try {
        if (typeof page.content === 'string') {
          parsedContent = JSON.parse(page.content);
          console.log('\n✅ Content is JSON string - parsed successfully');
        } else {
          parsedContent = page.content;
          console.log('\n✅ Content is already an object');
        }
        
        console.log('\n📋 Content structure:');
        console.log('  - hero:', parsedContent.hero ? '✅' : '❌');
        console.log('  - quickContact:', parsedContent.quickContact ? '✅' : '❌');
        console.log('  - contactForm:', parsedContent.contactForm ? '✅' : '❌');
        console.log('  - clinicLocations:', parsedContent.clinicLocations ? '✅' : '❌');
        console.log('  - mapSection:', parsedContent.mapSection ? '✅' : '❌');
        console.log('  - cta:', parsedContent.cta ? '✅' : '❌');
        
        if (parsedContent.quickContact) {
          console.log('\n📞 Quick Contact Cards:', parsedContent.quickContact.cards?.length || 0);
        }
        
        if (parsedContent.contactForm) {
          console.log('📝 Contact Form Fields:', parsedContent.contactForm.fields?.length || 0);
        }
        
        if (parsedContent.clinicLocations) {
          console.log('📍 Clinic Locations:', parsedContent.clinicLocations.locations?.length || 0);
        }
        
        console.log('\n📄 Full content preview (first 500 chars):');
        console.log(JSON.stringify(parsedContent, null, 2).substring(0, 500));
        
      } catch (parseError) {
        console.error('❌ Failed to parse content:', parseError.message);
        console.log('\n📄 Raw content preview (first 500 chars):');
        console.log(page.content.substring(0, 500));
      }
      
    } else {
      console.log('❌ Contact page not found in Strapi');
    }
    
  } catch (error) {
    console.error('❌ Error fetching contact page:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

checkContactData();
