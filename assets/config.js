/*
 * ====================================================================
 *  10xBizFunnel — WhatsApp API Smart Funnel : CONFIG
 *  फक्त ही फाईल बदला. बाकी pages ना हात लावायची गरज नाही.
 * ====================================================================
 */
window.FUNNEL_CONFIG = {
  brandName: "10xBizFunnel",

  // तुमचा logo (PNG/SVG) assets/ मध्ये टाका आणि path इथे द्या.
  // रिकामं ठेवलं तर text logo दिसेल.
  logoUrl: "",

  // संपर्क
  phone: "8208412720",            // Call साठी
  whatsappNumber: "918208412720", // wa.me link साठी (91 + नंबर)

  // GHL Inbound Webhook URL (Automation → Workflow → Trigger: Inbound Webhook)
  // README मध्ये steps दिल्या आहेत.
  ghlWebhookUrl: "",

  // ₹9 Demo booking चा payment / order form link (GHL order form, Razorpay page इ.)
  // रिकामं ठेवलं तर बटण WhatsApp वर घेऊन जाईल.
  demoPaymentUrl: "https://rzp.io/rzp/CgsMquRq",

  // Free guide page वरचा video (YouTube embed URL), रिकामं = video box लपेल
  freeVideoEmbedUrl: "",

  // Meta Pixel ID (रिकामं = pixel बंद). Quiz submit वर "Lead" event जातो.
  metaPixelId: "",

  // किंमत
  priceBasic: "₹18,000",
  pricePro: "₹30,000",
  demoPrice: "₹9",

  // Group support call ची वेळ (FAQ मध्ये दिसेल)
  supportCallTime: "सोमवार ते शुक्रवार, रोज 1 तास",

  // Deadline ओळ (Result page वर). उदा. "दिवाळीपूर्वी setup हवा असेल तर 28 ऑक्टोबरपर्यंत demo book करा."
  deadlineText: "दिवाळीपूर्वी setup हवा असेल तर लवकर demo book करा. Meta verification ला काही दिवस लागतात.",

  /*
   * TESTIMONIALS — फक्त खऱ्या clients चे.
   * Array रिकामा असेल तर testimonials section page वर दिसणार नाही.
   * उदाहरण:
   * { name: "क्लायंटचं नाव", business: "दुकानाचं नाव", city: "शहर",
   *   photo: "assets/clients/client1.jpg", quote: "क्लायंटचे स्वतःचे शब्द" }
   */
  testimonials: []
};
