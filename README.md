# 10xBizFunnel — WhatsApp API Smart Funnel (दिवाळी)

दुकानदारांसाठी quiz funnel: **Landing → WhatsApp-chat Quiz → Result (किंमत + ₹9 Demo) / Free Guide**.
Quiz मधली सगळी उत्तरं, Lead Score आणि HOT/WARM/COLD category थेट GoHighLevel मध्ये contact च्या custom fields मध्ये जातात.

## Files

| File | काय आहे |
|---|---|
| `index.html` | Landing page (trust + filter + quiz CTA) |
| `quiz.html` | 9 questions चा "Diwali WhatsApp Check" (एका screen वर एक question), plan-building screen, नंतर नाव/नंबर form. Score मोजतो आणि GHL ला पाठवतो |
| `result.html` | Personalized diagnosis (customers ची संख्या, आत्ताची पद्धत, मुख्य problem वरून), ad creative सारखे 10 features (⭐ priority), ₹18K / ₹30K किंमत, ₹9 Demo |
| `free.html` | "फक्त free माहिती" किंवा Udyam/GST नसलेल्यांसाठी |
| `assets/config.js` | **फक्त हीच फाईल बदला** (webhook, payment link, logo, फोटो, किंमत, testimonials) |
| `assets/style.css`, `assets/common.js` | Design आणि shared code |

---

## 1. `assets/config.js` भरा

- `ghlWebhookUrl` — खालच्या step 3 मधून मिळेल
- `demoPaymentUrl` — ₹9 चा GHL order form / Razorpay link (रिकामं असेल तर बटण WhatsApp उघडेल)
- `logoUrl` — `assets/` मध्ये logo टाकून path द्या
- `metaPixelId` — quiz submit वर **Lead**, ₹9 बटणावर **InitiateCheckout** event
- `testimonials` — **फक्त खऱ्या clients चे**. रिकामा असेल तर section दिसत नाही.

---

## 2. GHL Custom Fields बनवा

Settings → Custom Fields → नवीन folder **"Diwali WA Quiz"** (Contact object). खालचे fields बनवा.
**Field key अगदी असाच ठेवा** (GHL मध्ये `contact.business_type` असा दिसेल).
Radio fields चे options quiz मधल्या text सारखेच copy-paste करा.

| Field name | Key | Type | Options (exact) |
|---|---|---|---|
| Business Type | `business_type` | Radio | Jewellery · Saree · Clothing · Electronics · Furniture · Home Appliances · Other |
| Customer Database Size | `customer_database_size` | Radio | 500 पेक्षा कमी · 500 ते 2,000 · 2,000 ते 10,000 · 10,000 पेक्षा जास्त |
| Current Offer Method | `current_offer_method` | Radio | Personal WhatsApp वरून एकेकाला · WhatsApp Broadcast list · SMS · अजून काहीच पाठवत नाही |
| Diwali Main Problem | `diwali_main_problem` | Radio | Inquiries ना वेळेवर reply देता येत नाही · जुने customers परत येत नाहीत · Staff ला सगळं manage होत नाही · Payment आणि follow-up राहून जातं |
| Staff Size | `staff_size` | Radio | मी एकटाच · 1 ते 3 · 4 ते 10 · 10 पेक्षा जास्त / branches आहेत |
| Decision Maker | `decision_maker` | Radio | मी स्वतः (owner) · मी आणि partner मिळून · मी staff आहे, decision owner घेतात |
| Business Document | `business_document` | Radio | हो, Udyam Aadhaar आहे · Udyam नाही, पण GST आहे · दोन्ही नाही |
| Start Timeline | `start_timeline` | Radio | Diwali पूर्वी, लगेच · Diwali नंतर 1-2 महिन्यांत · अजून ठरवलं नाही |
| Budget Readiness | `budget_readiness` | Radio | हो, योग्य वाटलं तर लगेच start करायचं · आधी नीट समजून घ्यायचं आहे · नाही, मला फक्त free information हवी |
| City | `city` | Single line | — (GHL चं standard City field असेल तर तेच वापरा) |
| **Lead Score** | `lead_score` | **Number** | — |
| **Lead Category** | `lead_category` | **Single option** | HOT · WARM · COLD |
| Quiz Route | `quiz_route` | Single line | — |

दुकानाचं नाव GHL च्या standard **Business Name** field मध्ये जाईल.

> Radio ऐवजी सगळे Single line text ठेवले तरी चालतात — mapping सोपं होतं. पण Smart List filter साठी Radio चांगले.

---

## 3. GHL Workflow: Quiz → Contact

Automation → Workflows → New → **"Diwali WA Quiz – Inbound"**

**Trigger:** Inbound Webhook → URL copy करा → `config.js` मध्ये `ghlWebhookUrl` ला paste करा.
एकदा quiz test करून submit करा, म्हणजे GHL ला sample data मिळेल (Fetch sample request).

**Action 1: Create / Update Contact** — mapping:

| GHL field | Webhook value |
|---|---|
| First Name | `{{inboundWebhookRequest.first_name}}` |
| Last Name | `{{inboundWebhookRequest.last_name}}` |
| Phone | `{{inboundWebhookRequest.phone}}` |
| Email | `{{inboundWebhookRequest.email}}` |
| Business Name | `{{inboundWebhookRequest.business_name}}` |
| City | `{{inboundWebhookRequest.city}}` |
| Business Type | `{{inboundWebhookRequest.business_type}}` |
| Customer Database Size | `{{inboundWebhookRequest.customer_database_size}}` |
| Current Offer Method | `{{inboundWebhookRequest.current_offer_method}}` |
| Diwali Main Problem | `{{inboundWebhookRequest.diwali_main_problem}}` |
| Staff Size | `{{inboundWebhookRequest.staff_size}}` |
| Decision Maker | `{{inboundWebhookRequest.decision_maker}}` |
| Business Document | `{{inboundWebhookRequest.business_document}}` |
| Start Timeline | `{{inboundWebhookRequest.start_timeline}}` |
| Budget Readiness | `{{inboundWebhookRequest.budget_readiness}}` |
| Lead Score | `{{inboundWebhookRequest.lead_score}}` |
| Lead Category | `{{inboundWebhookRequest.lead_category}}` |
| Quiz Route | `{{inboundWebhookRequest.route}}` |

(Variable picker मध्ये नाव थोडं वेगळं दिसू शकतं — picker मधूनच निवडा.)

**Action 2: Add Tag** → `diwali-wa-quiz`

**Action 3: If / Else on Lead Category**
- **HOT** → Add tag `HOT` → Create Opportunity (pipeline "WhatsApp API Sales", stage "Hot – 1 तासात call") → Internal notification:
  `🔥 HOT lead: {{contact.name}} – {{contact.company_name}}, {{contact.city}}, Score {{contact.lead_score}}. 1 तासात call करा.`
- **WARM** → Add tag `WARM` → Opportunity stage "Warm – Follow up" → WhatsApp follow-up मेसेज
- **COLD** → Add tag `COLD` → stage "Cold – Nurture" (telecaller notification नाही)

**Extra tags (optional):** `quiz_tags` field मध्ये comma ने वेगळे tags येतात (`udyam-yes`, `no-documents`, `free-only`, `before-diwali`, `budget-ready`, `not-decision-maker`). हवे असतील तर If/Else → "Inbound webhook quiz_tags contains no-documents" → Add tag.

---

## 4. Contact page वर उत्तरं दिसणं

Settings → Custom Fields → folder "Diwali WA Quiz" → contact detail मध्ये हा folder दिसेल.
Contacts → Smart List → Filter **Lead Category = HOT** → "HOT Leads" नावाने save करा. Telecallers ना हीच list द्या.

---

## Lead Scoring (quiz.html मध्ये आपोआप)

| प्रश्न | Points |
|---|---|
| Customer Database Size | 0 / 5 / 10 / 15 |
| Staff Size | 0 / 5 / 10 / 15 |
| Decision Maker | 15 / 10 / 0 |
| Business Document | 15 / 10 / 0 |
| Start Timeline | 15 / 8 / 2 |
| Budget Readiness | 20 / 8 / 0 |
| **कमाल** | **95** |

- **HOT** ≥ 70 · **WARM** 40–69 · **COLD** < 40
- "फक्त free माहिती हवी" → score कितीही असो **COLD**, आणि `free.html` वर जातो
- "दोन्ही नाही" (Udyam/GST) → `free.html?reason=docs` (Udyam portal ची link दाखवतो)

Points बदलायचे असतील तर `quiz.html` मधल्या `Q` list मध्ये `pts` बदला. 50–100 leads नंतर खरं close कोण होतंय ते बघून बदला.

---

## 5. GHL मध्ये pages टाकणं (2 पर्याय)

**A. GitHub Pages / Netlify वर host करा (सोपं):** repo Settings → Pages → branch `main` → `/root`. मिळालेली link ad मध्ये वापरा. `config.js` मध्ये webhook असला की lead थेट GHL मध्ये जातो.

**B. GHL funnel मध्ये:** प्रत्येक page साठी blank funnel step → **Custom JS/HTML element** → त्या page चा पूर्ण HTML paste करा. `assets/style.css`, `config.js`, `common.js` चा code `<style>` / `<script>` मध्ये inline करा (किंवा GitHub Pages वरून link करा). Page links (`quiz.html`, `result.html`, `free.html`) तुमच्या GHL step URLs ने बदला.

---

## Live करण्याआधी checklist

- [ ] `config.js` मध्ये webhook URL, ₹9 payment link, logo
- [ ] FAQ "₹18,000 एकदाच की दरवर्षी?" चं खरं उत्तर `result.html` मध्ये लिहा
- [ ] `deadlineText` मध्ये खरी तारीख
- [ ] 3 test submissions (HOT / WARM / free) → GHL contact मध्ये fields + score दिसतायत का तपासा
- [ ] खरे testimonials मिळाल्यावर `config.js` मध्ये टाका
