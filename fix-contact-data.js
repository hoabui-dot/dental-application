const axios = require('axios');
const https = require('https');

const STRAPI_URL = 'https://pediatric-expired-through-casinos.trycloudflare.com';
const API_TOKEN = '7f399a0c6012eb5520522f741cfc8ea0f3c5d3b32c5f1d08566bd951013faca178f9f8303403de061571bbee3edcad872b0b595a58a1892617c59f484605ecfcf3e7cdfe38de7322730eba6a32826aeab5d4ed8724f93330f0f28dd3963e83c291fd51df8b8dc9d6b43d06c7295861280d448b8d26e15064cc5dc02e242814f9';

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

async function fixContactData() {
  console.log('🔍 Checking and fixing Contact page data...\n');
  
  try {
    // Fetch current contact page
    const response = await axiosInstance.get(
      `${STRAPI_URL}/api/pages?filters[slug][$eq]=contact`
    );

    if (!response.data.data || response.data.data.length === 0) {
      console.log('❌ Contact page not found');
      return;
    }

    const page = response.data.data[0];
    console.log('✅ Found contact page:', page.documentId);
    
    // Parse current content
    let currentContent;
    try {
      if (typeof page.content === 'string') {
        currentContent = JSON.parse(page.content);
      } else {
        currentContent = page.content;
      }
    } catch (e) {
      console.error('❌ Failed to parse current content');
      currentContent = {};
    }

    console.log('\n📋 Current content structure:');
    console.log('  - hero:', currentContent.hero ? '✅' : '❌');
    console.log('  - quickContact:', currentContent.quickContact ? '✅' : '❌');
    console.log('  - contactForm:', currentContent.contactForm ? '✅' : '❌');
    console.log('  - clinicLocations:', currentContent.clinicLocations ? '✅' : '❌');
    console.log('  - mapSection:', currentContent.mapSection ? '✅' : '❌');
    console.log('  - cta:', currentContent.cta ? '✅' : '❌');

    // Create the correct structure
    const correctContent = {
      hero: currentContent.hero || {
        icon: "Sparkles",
        title: "Contact Us",
        subtitle: "We're here to help you achieve a healthy and confident smile."
      },
      quickContact: currentContent.quickContact || {
        cards: [
          {
            icon: "Phone",
            title: "Hotline",
            content: "1900 8059",
            subtitle: "Available 24/7"
          },
          {
            icon: "Mail",
            title: "Email",
            content: "contact@nhakhoasaigon.vn",
            subtitle: "We reply within 24h"
          },
          {
            icon: "Clock",
            title: "Working Hours",
            content: "Mon–Fri: 08:00–18:00",
            subtitle: "Sat: 09:00–15:00"
          },
          {
            icon: "MessageCircle",
            title: "Live Chat",
            content: "Chat with us",
            subtitle: "Online support"
          }
        ]
      },
      contactForm: currentContent.contactForm || {
        title: "Send us a message",
        description: "Fill out the form below and we'll get back to you as soon as possible.",
        badge: {
          title: "Trusted by 10,000+ patients",
          subtitle: "We're committed to your dental health"
        },
        fields: [
          {
            name: "fullName",
            label: "Full Name",
            type: "text",
            required: true,
            placeholder: "John Doe"
          },
          {
            name: "phone",
            label: "Phone Number",
            type: "tel",
            required: true,
            placeholder: "+84 123 456 789"
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
            placeholder: "john@example.com"
          },
          {
            name: "service",
            label: "Service",
            type: "select",
            required: true,
            options: [
              { value: "general", label: "General Checkup" },
              { value: "cleaning", label: "Teeth Cleaning" },
              { value: "whitening", label: "Teeth Whitening" },
              { value: "braces", label: "Braces & Orthodontics" },
              { value: "implants", label: "Dental Implants" },
              { value: "emergency", label: "Emergency Care" },
              { value: "other", label: "Other" }
            ]
          },
          {
            name: "message",
            label: "Message",
            type: "textarea",
            required: false,
            placeholder: "Tell us more about your needs...",
            rows: 4
          }
        ]
      },
      clinicLocations: currentContent.clinicLocations || {
        title: "Our Clinic Locations",
        subtitle: "Visit us at any of our convenient locations",
        locations: [
          {
            name: "Saigon International Dental - District 1",
            address: "123 Nguyen Hue, District 1, Ho Chi Minh City",
            phone: "1900 8059",
            mapUrl: "https://maps.google.com"
          },
          {
            name: "Saigon International Dental - District 7",
            address: "456 Nguyen Van Linh, District 7, Ho Chi Minh City",
            phone: "1900 8059",
            mapUrl: "https://maps.google.com"
          }
        ]
      },
      mapSection: currentContent.mapSection || {
        enabled: true,
        title: "Interactive Map",
        description: "Google Maps integration would be displayed here showing both clinic locations.",
        note: "(Requires Google Maps API key in production)",
        markers: [
          { name: "District 1", address: "123 Nguyen Hue" },
          { name: "District 7", address: "456 Nguyen Van Linh" }
        ]
      },
      cta: currentContent.cta || {
        title: "Book your consultation today",
        description: "Our experts are ready to help you achieve your perfect smile. Don't wait—take the first step towards better dental health.",
        primaryButtonText: "Book Appointment",
        primaryButtonLink: "#contact",
        secondaryButtonText: "Call Us: 1900 8059",
        secondaryButtonLink: "tel:19008059",
        stats: [
          { value: "10,000+", label: "Happy Patients" },
          { value: "15+", label: "Years Experience" },
          { value: "2", label: "Modern Clinics" }
        ]
      }
    };

    // Update the page
    const updateData = {
      data: {
        content: JSON.stringify(correctContent)
      }
    };

    console.log('\n🔄 Updating contact page with correct structure...');
    
    const updateResponse = await axiosInstance.put(
      `${STRAPI_URL}/api/pages/${page.documentId}`,
      updateData
    );

    console.log('✅ Contact page updated successfully!');
    console.log('\n📋 New content structure:');
    console.log('  - hero: ✅');
    console.log('  - quickContact: ✅ (4 cards)');
    console.log('  - contactForm: ✅ (5 fields)');
    console.log('  - clinicLocations: ✅ (2 locations)');
    console.log('  - mapSection: ✅');
    console.log('  - cta: ✅ (3 stats)');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

fixContactData();
