// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE WITH YOUR REAL BUSINESS DETAILS, then run:
//      node build.mjs
//  Every page, the sitemap and the Google structured data are
//  generated from these values.
// ─────────────────────────────────────────────────────────────
export default {
  // Your business / brand name as customers should see it.
  businessName: "PointPro POS Services",

  // You, the person customers will deal with, and your role at Moniepoint.
  ownerName: "Your Name",
  ownerRole: "Moniepoint Business Relationship Manager (BRM)",

  // The live web address you will deploy to (no trailing slash).
  // Needed for the sitemap and canonical links — update before going live.
  siteUrl: "https://www.example.com",

  // Phone number in international format, digits only after the +.
  phone: "+2348000000000",
  // WhatsApp number, digits only, with country code (no +).
  whatsapp: "2348000000000",
  email: "hello@example.com",

  // Where you are based.
  address: {
    street: "12 Example Street",
    city: "Ikeja",
    state: "Lagos",
    country: "NG",
  },

  // Areas you deliver POS terminals / help customers.
  // "nationwide" adds every state page; set false to only use `states` below.
  nationwide: true,

  // Opening hours (shown on site + in Google structured data).
  hours: "Mon–Sat, 8:00am – 7:00pm",
  openingHoursSpec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "19:00" },
  ],

  // Optional: your Google Business Profile, Facebook, Instagram, TikTok links.
  socialLinks: [
    // "https://www.facebook.com/yourpage",
    // "https://www.instagram.com/yourpage",
  ],

  // Real customer reviews (shown on every page when filled in). Only use
  // genuine reviews from real customers, with their permission.
  reviews: [
    // { name: "Amaka O.", place: "Onitsha", text: "Got my POS set up in two days. Very helpful." },
  ],

  // Optional: Google Search Console verification code (the content="..." value).
  googleVerification: "",
};
