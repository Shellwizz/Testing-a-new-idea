// Keyword-targeted pages. Each page aims at one cluster of searches people
// actually type ("moniepoint pos price", "money point loan", ...).
//
// Placeholders replaced at build time:
//   {biz}  business name      {phone}  phone number
//   {city} your city          {state}  your state
//
// Keep facts general and honest. Don't publish exact fees or loan rates
// unless you have confirmed them — wrong numbers lose customers' trust and
// Google's.

export const pages = [
  // ───────────────────────────── HOME ─────────────────────────────
  {
    slug: "",
    title: "Moniepoint POS Agent – Get Your Moniepoint POS Fast | {biz}",
    description:
      "Get a Moniepoint POS machine, open a Moniepoint business account, and get help with Moniepoint loans and Moniebook. Fast setup and delivery across Nigeria. Chat on WhatsApp.",
    h1: "Get Your Moniepoint POS Machine — Fast, Simple, Delivered",
    lead:
      "Whether you typed “Moniepoint POS”, “Money Point POS”, “Monie Point” or “Moniepoint agent near me” — you’re in the right place. {biz} helps you get a Moniepoint POS terminal, set up your business account and start earning, without stress.",
    sections: [
      {
        h: "What we do for you",
        body: `<ul class="ticks">
<li><strong>Get a Moniepoint POS terminal</strong> — we guide you from request to activation.</li>
<li><strong>Open your Moniepoint business account</strong> — we help you get your documents right the first time.</li>
<li><strong>Start a POS business</strong> — location tips, cash management, pricing your services.</li>
<li><strong>Moniepoint loan guidance</strong> — how to build the transaction history that qualifies you.</li>
<li><strong>Moniebook setup</strong> — track sales, stock and debts in one app.</li>
<li><strong>After-sales support</strong> — we don’t disappear after you get your terminal.</li>
</ul>`,
      },
      {
        h: "Why people choose Moniepoint POS",
        body: `<p>Moniepoint is one of the most widely used POS networks in Nigeria. Agents and shop owners pick it for <strong>fast settlement</strong>, <strong>reliable transaction success rates</strong>, a strong business banking app, and access to <strong>business loans</strong> for active users. Moniepoint Microfinance Bank is licensed by the CBN and deposits are insured by the NDIC.</p>`,
      },
      {
        h: "How it works with {biz}",
        body: `<ol class="steps">
<li><strong>Chat with us</strong> on WhatsApp or call — tell us your location and what you need.</li>
<li><strong>Send your details</strong> — we tell you exactly what documents are needed.</li>
<li><strong>Get set up</strong> — account opening, terminal request and activation.</li>
<li><strong>Start earning</strong> — we show you how to price withdrawals and transfers profitably.</li>
</ol>`,
      },
    ],
    faqs: [
      {
        q: "Is it Money Point or Moniepoint?",
        a: "The correct spelling is Moniepoint. Many people search “Money Point”, “Monie Point” or “Moneypoint” — they all mean the same Moniepoint POS and banking service.",
      },
      {
        q: "Can I get a Moniepoint POS outside Lagos?",
        a: "Yes. We help customers across Nigeria. Message us with your state and town and we’ll tell you the fastest way to get your terminal.",
      },
      {
        q: "Is {biz} Moniepoint?",
        a: "No. {biz} is an independent business that helps customers get and use Moniepoint POS terminals and services. For issues with your Moniepoint account itself, always use Moniepoint’s official app and support channels.",
      },
    ],
    related: ["moniepoint-pos-price", "how-to-get-moniepoint-pos", "moniepoint-loan", "moniepoint-pos-charges", "start-pos-business-nigeria", "money-point-pos"],
  },

  // ─────────────────────── MISSPELLING CATCHER ───────────────────────
  {
    slug: "money-point-pos",
    title: "Money Point POS (Moniepoint) – How to Get One Today | {biz}",
    description:
      "Searching for Money Point POS, Monie Point or Moneypoint? It's Moniepoint. Here's how to get a Money Point POS machine, the price, charges and loans — explained simply.",
    h1: "Money Point POS — Everything You Need to Know",
    lead:
      "“Money Point”, “Monie Point”, “Moneypoint”, “Monipoint” — however you spell it, you mean <strong>Moniepoint</strong>, the POS and business banking company used by hundreds of thousands of agents and shops in Nigeria. Here’s how to get your Money Point POS without wahala.",
    sections: [
      {
        h: "How to get a Money Point POS machine",
        body: `<ol class="steps">
<li>Open a Moniepoint business account (we help you do this correctly).</li>
<li>Request a POS terminal for your business.</li>
<li>Get your terminal delivered or picked up, then activated.</li>
<li>Start accepting card payments, withdrawals and transfers.</li>
</ol>
<p>Full guide: <a href="/how-to-get-moniepoint-pos/">How to get a Moniepoint POS</a>.</p>`,
      },
      {
        h: "Money Point POS price",
        body: `<p>The cost of a Money Point (Moniepoint) POS depends on the terminal type and current Moniepoint offers. Prices change, so we always give you the <strong>current price</strong> before you pay anything. See <a href="/moniepoint-pos-price/">Moniepoint POS price</a>.</p>`,
      },
      {
        h: "Money Point loan",
        body: `<p>Moniepoint offers business loans to eligible, active users through the app. The more consistent your transactions, the better your chances. See <a href="/moniepoint-loan/">Moniepoint loan guide</a>.</p>`,
      },
    ],
    faqs: [
      { q: "Is Money Point the same as Moniepoint?", a: "Yes. “Money Point” is a common way people spell or say Moniepoint. It is the same company and the same POS." },
      { q: "Where can I buy a Money Point POS near me?", a: "Chat with {biz} on WhatsApp with your location and we will guide you to get one quickly." },
    ],
    related: ["moniepoint-pos-price", "moniepoint-loan", "moniepoint-near-me", "moniebook"],
  },

  // ─────────────────────────── PRICE ───────────────────────────
  {
    slug: "moniepoint-pos-price",
    title: "Moniepoint POS Price in Nigeria (Updated) | {biz}",
    description:
      "How much is a Moniepoint POS machine in Nigeria? Current Moniepoint POS price, what's included, caution fee vs outright purchase, and how to get yours delivered.",
    h1: "Moniepoint POS Price in Nigeria",
    lead:
      "Want to know how much a Moniepoint POS costs? The price depends on the <strong>type of terminal</strong> (Android smart POS vs. traditional), whether it’s an <strong>outright purchase or a refundable caution fee</strong>, and any <strong>promo running at the time</strong>.",
    sections: [
      {
        h: "What affects the Moniepoint POS price",
        body: `<ul class="ticks">
<li><strong>Terminal type</strong> — Android POS terminals with printers usually cost more than basic models.</li>
<li><strong>Payment model</strong> — some terminals come with a caution fee, others are bought outright.</li>
<li><strong>Location & delivery</strong> — delivery outside major cities can add to the cost.</li>
<li><strong>Current promos</strong> — Moniepoint sometimes runs offers for new agents.</li>
</ul>`,
      },
      {
        h: "Get today’s exact price",
        body: `<p>Prices change often, and we would rather give you the <strong>correct price today</strong> than an old number from the internet. Tap the WhatsApp button and send “POS PRICE” with your location — we’ll reply with current options.</p>
<p class="warn">⚠️ Never pay money to anyone claiming to sell a Moniepoint POS without confirming who they are. Ask for a receipt and confirm activation on your own Moniepoint app.</p>`,
      },
    ],
    faqs: [
      { q: "How much is a Moniepoint POS machine?", a: "It depends on the terminal type and current offers. Message {biz} on WhatsApp for today’s price in your area." },
      { q: "Is the Moniepoint POS free?", a: "Not usually. There is typically a purchase price or caution fee. Occasionally there are promotions — ask us what is available right now." },
      { q: "Can I pay for a Moniepoint POS in instalments?", a: "Ask us — options vary by location and time." },
    ],
    related: ["how-to-get-moniepoint-pos", "moniepoint-pos-requirements", "moniepoint-pos-charges"],
  },

  // ─────────────────────────── HOW TO GET ───────────────────────────
  {
    slug: "how-to-get-moniepoint-pos",
    title: "How to Get a Moniepoint POS Machine (Step-by-Step) | {biz}",
    description:
      "Step-by-step guide to getting a Moniepoint POS in Nigeria: requirements, account opening, terminal request, delivery and activation. Get help on WhatsApp.",
    h1: "How to Get a Moniepoint POS Machine — Step by Step",
    lead: "Getting a Moniepoint POS is simple when you know the steps. Here’s the full process — or let {biz} handle it with you.",
    sections: [
      {
        h: "Step-by-step",
        body: `<ol class="steps">
<li><strong>Prepare your documents</strong> — see <a href="/moniepoint-pos-requirements/">Moniepoint POS requirements</a>.</li>
<li><strong>Open a Moniepoint business account</strong> — on the app or with help from us.</li>
<li><strong>Complete verification</strong> — BVN/NIN, selfie, and address details.</li>
<li><strong>Request your POS terminal</strong> — choose your terminal type.</li>
<li><strong>Pay and receive your terminal</strong> — delivery or pickup.</li>
<li><strong>Activate and test</strong> — do a small test transaction before customers arrive.</li>
</ol>`,
      },
      {
        h: "How long does it take?",
        body: `<p>When your documents are correct, the process can be quick. Most delays come from <strong>mismatched names</strong> between BVN, NIN and ID, or <strong>unclear photos</strong>. We check these with you before you submit.</p>`,
      },
    ],
    faqs: [
      { q: "Can I get a Moniepoint POS without a shop?", a: "Many agents start from a small kiosk, stand or umbrella spot. You need a clear business location you can describe for verification." },
      { q: "Do I need a CAC registration?", a: "Not always to start. A registered business name can help with higher limits and loans later. Ask us what fits your case." },
    ],
    related: ["moniepoint-pos-requirements", "moniepoint-pos-price", "moniepoint-business-account", "become-moniepoint-agent"],
  },

  // ─────────────────────────── REQUIREMENTS ───────────────────────────
  {
    slug: "moniepoint-pos-requirements",
    title: "Moniepoint POS Requirements – Documents You Need | {biz}",
    description:
      "What documents do you need for a Moniepoint POS? BVN, NIN, valid ID, passport photo, address and business location. Full checklist for Moniepoint POS registration.",
    h1: "Moniepoint POS Requirements (Checklist)",
    lead: "Have these ready before you apply and your Moniepoint POS registration will go much faster.",
    sections: [
      {
        h: "Basic requirements",
        body: `<ul class="ticks">
<li>Bank Verification Number (<strong>BVN</strong>)</li>
<li>National Identification Number (<strong>NIN</strong>)</li>
<li>A <strong>valid ID</strong> (NIN slip, voter’s card, driver’s licence or international passport)</li>
<li>A clear <strong>passport photo / selfie</strong></li>
<li>Your <strong>home address</strong> and <strong>business location</strong></li>
<li>An active <strong>phone number</strong> linked to your BVN</li>
<li>Optional: <strong>CAC</strong> business registration for higher limits</li>
</ul>`,
      },
      {
        h: "Common mistakes that delay approval",
        body: `<ul>
<li>Name spelt differently on BVN and NIN.</li>
<li>Phone number on BVN no longer active.</li>
<li>Blurry or dark selfie.</li>
<li>Vague business address (“beside the junction”) — add landmarks and street names.</li>
</ul>`,
      },
    ],
    faqs: [
      { q: "Can I register for Moniepoint POS without NIN?", a: "Identity verification is required. If you don’t have your NIN yet, get it first — it saves time later." },
    ],
    related: ["how-to-get-moniepoint-pos", "moniepoint-business-account", "moniepoint-pos-price"],
  },

  // ─────────────────────────── CHARGES ───────────────────────────
  {
    slug: "moniepoint-pos-charges",
    title: "Moniepoint POS Charges & How Much to Charge Customers | {biz}",
    description:
      "Understand Moniepoint POS charges on withdrawals and transfers, and how POS agents set their own customer fees to make profit. Simple examples inside.",
    h1: "Moniepoint POS Charges Explained",
    lead: "There are two different “charges” people talk about: what <strong>Moniepoint charges you</strong> per transaction, and what <strong>you charge your customers</strong>. Your profit is the gap between them.",
    sections: [
      {
        h: "1. What Moniepoint charges you",
        body: `<p>Moniepoint takes a small fee on card transactions (usually a percentage, often with a cap) and on some transfers. Exact rates can change and may depend on your account type — check the current rates in your Moniepoint app, or ask us.</p>`,
      },
      {
        h: "2. What you charge your customers",
        body: `<p>POS agents set their own service fee, usually as a <strong>flat amount per withdrawal band</strong>. Your price should depend on your area, competition, and how hard it is for you to get cash.</p>
<div class="example"><strong>Illustrative example (not real rates):</strong><br>
Customer withdraws ₦10,000. Moniepoint fee to you: ₦X. You charge the customer ₦Y. <strong>Your profit = ₦Y − ₦X.</strong><br>
Do 60 withdrawals a day and small profits add up fast.</div>`,
      },
      {
        h: "Tips to stay profitable",
        body: `<ul class="ticks">
<li>Know your cost per transaction before you set prices.</li>
<li>Display your price list clearly — customers trust agents who are upfront.</li>
<li>Offer transfers, airtime, data and bill payments to earn more per customer.</li>
<li>Track every day’s profit in <a href="/moniebook/">Moniebook</a> or a notebook.</li>
</ul>`,
      },
    ],
    faqs: [
      { q: "How much does Moniepoint charge per withdrawal?", a: "It’s a small percentage that can be capped and may change. Check your Moniepoint app for your current rate, or ask {biz}." },
      { q: "How much should I charge for ₦5,000 POS withdrawal?", a: "It depends on your area. Check what other agents nearby charge and make sure your fee is above your Moniepoint cost." },
    ],
    related: ["pos-business-profit", "start-pos-business-nigeria", "moniepoint-pos-price"],
  },

  // ─────────────────────────── LOAN ───────────────────────────
  {
    slug: "moniepoint-loan",
    title: "Moniepoint Loan – How to Qualify & Apply (Guide) | {biz}",
    description:
      "How to get a Moniepoint loan for your POS or business: eligibility, how to apply in the app, and how to build the transaction history that gets you approved.",
    h1: "Moniepoint Loan — How to Qualify and Apply",
    lead: "Moniepoint offers <strong>business loans</strong> to eligible users. Loans are offered and approved by Moniepoint itself in the app — nobody outside Moniepoint can approve a loan for you. What {biz} can do is help you <strong>set up properly and build the record</strong> that improves your chances.",
    sections: [
      {
        h: "Who qualifies for a Moniepoint loan?",
        body: `<p>Eligibility is decided by Moniepoint, but it generally favours businesses that:</p>
<ul class="ticks">
<li>Use their Moniepoint account <strong>actively and consistently</strong>.</li>
<li>Have <strong>steady transaction volume</strong> over several months.</li>
<li>Have <strong>completed verification</strong> (BVN, NIN, address).</li>
<li>Repay previous loans on time.</li>
</ul>`,
      },
      {
        h: "How to apply",
        body: `<ol class="steps">
<li>Open your Moniepoint business app.</li>
<li>Look for the loans/credit section — if you’re eligible, an offer will show.</li>
<li>Review the amount, interest and repayment terms carefully.</li>
<li>Accept only if the repayment fits your daily earnings.</li>
</ol>`,
      },
      {
        h: "Beware of loan scams",
        body: `<p class="warn">⚠️ Moniepoint loans are offered inside the official app. <strong>Anyone asking you to pay a “processing fee” to get a Moniepoint loan approved is a scammer.</strong> {biz} will never ask you for money to approve a loan.</p>`,
      },
    ],
    faqs: [
      { q: "How do I get a loan from Moniepoint?", a: "If you are eligible, a loan offer appears in your Moniepoint business app. Consistent transactions over time improve eligibility." },
      { q: "Why am I not eligible for a Moniepoint loan?", a: "Usually not enough transaction history yet, incomplete verification, or a previous late repayment. Keep transacting consistently." },
      { q: "Does Moniepoint give loans to POS agents?", a: "Moniepoint offers credit to eligible business users, including many POS agents. Eligibility is decided by Moniepoint." },
    ],
    related: ["moniepoint-business-account", "pos-business-profit", "moniebook"],
  },

  // ─────────────────────────── BECOME AGENT ───────────────────────────
  {
    slug: "become-moniepoint-agent",
    title: "How to Become a Moniepoint Agent in Nigeria | {biz}",
    description:
      "Become a Moniepoint POS agent: registration steps, requirements, startup capital, and how much agents earn. Start your POS business with help from {biz}.",
    h1: "How to Become a Moniepoint Agent",
    lead: "Becoming a Moniepoint agent is one of the most popular small businesses in Nigeria. You provide cash withdrawals, transfers and bill payments to your community — and earn on every transaction.",
    sections: [
      {
        h: "What you need",
        body: `<ul class="ticks">
<li>Documents for <a href="/moniepoint-pos-requirements/">Moniepoint registration</a>.</li>
<li>A busy spot — market, bus stop, school, estate gate.</li>
<li><strong>Startup capital</strong> for float (cash on hand + money in your account).</li>
<li>A table, umbrella or kiosk, and a price list.</li>
</ul>`,
      },
      {
        h: "Steps",
        body: `<ol class="steps">
<li>Open your Moniepoint business account.</li>
<li>Get your POS terminal (<a href="/how-to-get-moniepoint-pos/">full guide</a>).</li>
<li>Choose your location and set your prices.</li>
<li>Promote your stand — signboard, WhatsApp status, word of mouth.</li>
</ol>`,
      },
    ],
    faqs: [
      { q: "How much do I need to start a Moniepoint POS business?", a: "You need the terminal cost plus float (cash). Many agents start small and grow their float from profit. Read our guide to starting a POS business." },
    ],
    related: ["start-pos-business-nigeria", "pos-business-profit", "moniepoint-pos-charges"],
  },

  // ─────────────────────────── START POS BUSINESS ───────────────────────────
  {
    slug: "start-pos-business-nigeria",
    title: "How to Start a POS Business in Nigeria (Moniepoint Guide) | {biz}",
    description:
      "Complete guide to starting a POS business in Nigeria with Moniepoint: capital, location, pricing, security, and growing daily profit.",
    h1: "How to Start a POS Business in Nigeria",
    lead: "A POS business can bring in daily income with low setup costs. Here is a practical guide from people who do this every day.",
    sections: [
      { h: "1. Pick the right location", body: `<p>Busy places where people need cash: markets, motor parks, schools, hospitals, estates and areas with few bank ATMs. Watch the area for a few days before you settle.</p>` },
      { h: "2. Plan your capital", body: `<p>You need: POS terminal cost, float (cash + account balance), a stand or kiosk, signage, and a small buffer. Bigger float = you can serve bigger withdrawals = more profit.</p>` },
      { h: "3. Set your prices", body: `<p>See <a href="/moniepoint-pos-charges/">Moniepoint POS charges</a> to calculate your cost and set a profitable fee.</p>` },
      { h: "4. Stay safe", body: `<ul class="ticks"><li>Never keep all your cash in one place.</li><li>Confirm every transfer in your app before giving cash — fake transfer alerts are common.</li><li>Close before it gets too dark in risky areas.</li></ul>` },
      { h: "5. Grow", body: `<p>Add airtime, data, electricity and TV payments. Keep records in <a href="/moniebook/">Moniebook</a>. Consistent volume can also make you eligible for a <a href="/moniepoint-loan/">Moniepoint loan</a> to expand.</p>` },
    ],
    faqs: [
      { q: "Is POS business profitable in Nigeria?", a: "It can be, especially in busy areas with good float management. Profit depends on volume, pricing and location." },
    ],
    related: ["pos-business-profit", "become-moniepoint-agent", "moniepoint-pos-charges"],
  },

  // ─────────────────────────── PROFIT ───────────────────────────
  {
    slug: "pos-business-profit",
    title: "How Much Do Moniepoint POS Agents Make Daily? | {biz}",
    description:
      "How much profit can you make with a Moniepoint POS? Simple daily and monthly profit calculation for POS agents in Nigeria.",
    h1: "How Much Can You Make With a Moniepoint POS?",
    lead: "Your earnings depend on three numbers: <strong>how many transactions</strong> you do, <strong>your fee per transaction</strong>, and <strong>your Moniepoint cost</strong>.",
    sections: [
      {
        h: "Simple profit formula",
        body: `<div class="example"><strong>Daily profit = (Your fee − Moniepoint cost) × Number of transactions</strong><br><br>
Illustrative only: if your average profit per transaction is ₦100 and you do 50 transactions a day, that’s ₦5,000/day — about ₦130,000 in a 26-day month, before expenses.</div>`,
      },
      { h: "How to increase profit", body: `<ul class="ticks"><li>More float = serve bigger withdrawals.</li><li>Better location = more customers.</li><li>Extra services: transfers, bills, airtime.</li><li>Open longer hours on busy days (market days, month end).</li></ul>` },
    ],
    faqs: [{ q: "Can POS business make ₦10,000 daily?", a: "Many busy agents do. It depends on your location, float and pricing." }],
    related: ["moniepoint-pos-charges", "start-pos-business-nigeria", "moniepoint-loan"],
  },

  // ─────────────────────────── BUSINESS ACCOUNT ───────────────────────────
  {
    slug: "moniepoint-business-account",
    title: "Moniepoint Business Account Opening – Requirements & Steps | {biz}",
    description:
      "How to open a Moniepoint business account: requirements, steps, account limits and how it connects to your POS, loans and Moniebook.",
    h1: "Open a Moniepoint Business Account",
    lead: "Your Moniepoint business account is the centre of everything — POS settlements, transfers, loans and records all run through it.",
    sections: [
      { h: "What you get", body: `<ul class="ticks"><li>Business account for receiving payments and POS settlements.</li><li>Transfers to any Nigerian bank.</li><li>Access to POS terminals and, if eligible, loans.</li><li>Integration with Moniebook for records.</li></ul>` },
      { h: "How to open it", body: `<ol class="steps"><li>Download the official Moniepoint business app from the Play Store or App Store.</li><li>Sign up with your phone number and BVN.</li><li>Complete NIN, ID and selfie verification.</li><li>Add your business details and address.</li></ol><p>Stuck? Message {biz} and we’ll walk you through it.</p>` },
    ],
    faqs: [{ q: "Can I open a Moniepoint account without a registered business?", a: "Yes, you can start as an individual/sole business. CAC registration can unlock more features and limits later." }],
    related: ["moniepoint-pos-requirements", "moniepoint-loan", "moniebook"],
  },

  // ─────────────────────────── MONIEBOOK ───────────────────────────
  {
    slug: "moniebook",
    title: "Moniebook by Moniepoint – What It Is & How to Use It | {biz}",
    description:
      "Moniebook (sometimes searched as Money Book) is Moniepoint's app for tracking sales, stock, debts and invoices. Here's how small businesses use it.",
    h1: "Moniebook — Simple Bookkeeping for Your Business",
    lead: "<strong>Moniebook</strong> (often searched as “Money Book” or “Monie Book”) is Moniepoint’s app for small business records: sales, expenses, inventory, customer debts and invoices — all on your phone.",
    sections: [
      { h: "What you can do with Moniebook", body: `<ul class="ticks"><li>Record sales and expenses daily.</li><li>Track stock so you know when to restock.</li><li>Keep a list of customers who owe you.</li><li>Send invoices and receipts.</li><li>See your real profit — not just money in and out.</li></ul>` },
      { h: "Why it matters for POS agents", body: `<p>Good records show you which days and services make money, help you plan your float, and support a strong business history.</p>` },
    ],
    faqs: [
      { q: "Is Money Book the same as Moniebook?", a: "Yes — “Money Book” is a common spelling people search for Moniebook by Moniepoint." },
      { q: "Is Moniebook free?", a: "Check the current plans in the app. We can help you set it up." },
    ],
    related: ["moniepoint-business-account", "pos-business-profit", "moniepoint-loan"],
  },

  // ─────────────────────────── CUSTOMER CARE (honest) ───────────────────────────
  {
    slug: "moniepoint-customer-care",
    title: "Moniepoint Customer Care – Who to Contact for What | {biz}",
    description:
      "Need Moniepoint customer care? Here's how to reach official Moniepoint support for account issues, and when {biz} can help with POS setup and agent questions.",
    h1: "Moniepoint Customer Care — Who to Contact",
    lead: "<strong>{biz} is not Moniepoint customer care.</strong> We’re an independent business that helps people get and use Moniepoint POS. Here’s who to contact for what, so you get help faster and stay safe.",
    sections: [
      { h: "Contact official Moniepoint support for", body: `<ul><li>Failed or pending transactions and reversals</li><li>Blocked or restricted accounts</li><li>Disputes and chargebacks</li><li>Loan repayments and account statements</li></ul><p>Use the <strong>support/help section inside the official Moniepoint app</strong>, or the contact details on Moniepoint’s official website.</p>` },
      { h: "Contact {biz} for", body: `<ul class="ticks"><li>Getting a new Moniepoint POS terminal</li><li>Help opening your business account</li><li>Starting or growing a POS business</li><li>Setting up Moniebook</li><li>General “how do I…” questions</li></ul>` },
      { h: "Stay safe", body: `<p class="warn">⚠️ Nobody genuine will ask for your <strong>PIN, OTP or password</strong> — not Moniepoint, not us. Never share them.</p>` },
    ],
    faqs: [{ q: "What is Moniepoint customer care number?", a: "Use the contact options inside the official Moniepoint app or on Moniepoint’s official website. Be careful of fake numbers posted online." }],
    related: ["moniepoint-failed-transaction", "moniepoint-pos-not-working", "how-to-get-moniepoint-pos"],
  },

  // ─────────────────────────── FAILED TRANSACTION ───────────────────────────
  {
    slug: "moniepoint-failed-transaction",
    title: "Moniepoint Failed Transaction or Debit – What to Do | {biz}",
    description:
      "Customer debited but POS transaction failed? Moniepoint transfer pending? Here's what to do, how reversals work, and how to protect yourself as an agent.",
    h1: "Moniepoint Failed Transaction — What To Do",
    lead: "A customer was debited but the POS says failed? Don’t panic. Here’s the right way to handle it.",
    sections: [
      { h: "For POS agents", body: `<ol class="steps"><li><strong>Don’t pay cash</strong> for a failed transaction — even if the customer got a debit alert.</li><li>Print or screenshot the failed receipt.</li><li>Check transaction status in your Moniepoint app.</li><li>Tell the customer reversals go back to their bank automatically, usually within a short period.</li><li>If it doesn’t resolve, raise it with official Moniepoint support from the app.</li></ol>` },
      { h: "For customers", body: `<p>If your card was debited for a failed POS transaction, the reversal is handled by <strong>your own bank</strong> and the card network. Contact your bank with the date, amount and the agent’s receipt.</p>` },
    ],
    faqs: [{ q: "How long does Moniepoint reversal take?", a: "Most reversals happen automatically within a short time, but some take longer depending on the customer’s bank." }],
    related: ["moniepoint-customer-care", "moniepoint-pos-not-working"],
  },

  // ─────────────────────────── NOT WORKING ───────────────────────────
  {
    slug: "moniepoint-pos-not-working",
    title: "Moniepoint POS Not Working? Quick Fixes | {biz}",
    description:
      "Moniepoint POS not connecting, not printing, or showing errors? Try these quick fixes for network, paper, battery and card-reading problems.",
    h1: "Moniepoint POS Not Working? Try These Fixes",
    lead: "Most POS problems can be fixed in a few minutes.",
    sections: [
      { h: "Network / not connecting", body: `<ul class="ticks"><li>Restart the terminal.</li><li>Check SIM data or switch to Wi-Fi.</li><li>Move to an area with better signal.</li></ul>` },
      { h: "Not printing", body: `<ul class="ticks"><li>Check paper roll direction (shiny side faces the print head).</li><li>Clean the print head gently.</li><li>Use the correct paper roll size.</li></ul>` },
      { h: "Card not reading", body: `<ul class="ticks"><li>Try chip instead of tap (or the other way).</li><li>Clean the card chip.</li><li>Try another card to check if it’s the card or the terminal.</li></ul>` },
      { h: "Still not working?", body: `<p>Contact official Moniepoint support from your app for terminal faults. For general setup help, message {biz}.</p>` },
    ],
    faqs: [],
    related: ["moniepoint-failed-transaction", "moniepoint-customer-care"],
  },

  // ─────────────────────────── COMPARISON ───────────────────────────
  {
    slug: "moniepoint-vs-opay-vs-palmpay",
    title: "Moniepoint vs OPay vs PalmPay POS – Which Is Best? | {biz}",
    description:
      "Comparing Moniepoint, OPay and PalmPay POS for agents in Nigeria: reliability, settlement, loans, and business tools. Find out which suits your business.",
    h1: "Moniepoint vs OPay vs PalmPay POS",
    lead: "All three are popular in Nigeria. The best one is the one that fits your business — here is what to compare.",
    sections: [
      { h: "What to compare", body: `<ul class="ticks"><li><strong>Transaction success rate</strong> in your area.</li><li><strong>Settlement speed</strong> — how fast your money lands.</li><li><strong>Charges</strong> per withdrawal and transfer.</li><li><strong>Loans/credit</strong> for active agents.</li><li><strong>Business tools</strong> — record keeping, multiple terminals, staff accounts.</li><li><strong>Support</strong> when things go wrong.</li></ul>` },
      { h: "Why many agents choose Moniepoint", body: `<p>Moniepoint is built around businesses: a dedicated business banking app, POS terminals, <a href="/moniepoint-loan/">business loans</a> for eligible users and <a href="/moniebook/">Moniebook</a> for records. Many agents value its reliability on busy days.</p><p>Plenty of agents also keep a second terminal as a backup. Talk to us about what works best where you are.</p>` },
    ],
    faqs: [{ q: "Which POS is best in Nigeria?", a: "It depends on your location and needs. Moniepoint is a strong choice for agents who want reliability, business tools and access to credit." }],
    related: ["moniepoint-pos-price", "moniepoint-pos-charges", "become-moniepoint-agent"],
  },

  // ─────────────────────────── NEAR ME ───────────────────────────
  {
    slug: "moniepoint-near-me",
    title: "Moniepoint POS Near Me – Get One in Your Area | {biz}",
    description:
      "Looking for a Moniepoint office, agent or POS seller near you? {biz} helps customers across Nigeria get a Moniepoint POS. Find your state below.",
    h1: "Moniepoint POS Near Me",
    lead: "Searching for a Moniepoint office or POS seller near you? Choose your state below or message us with your location.",
    sections: [{ h: "Find your state", body: `{{STATE_LINKS}}` }],
    faqs: [{ q: "Where is the nearest Moniepoint office?", a: "Moniepoint has offices in several cities. If you want to get a POS, message {biz} — it is often faster than visiting an office." }],
    related: ["how-to-get-moniepoint-pos", "moniepoint-pos-price"],
  },

  // ─────────────────────────── CONTACT ───────────────────────────
  {
    slug: "contact",
    title: "Contact {biz} – Get Your Moniepoint POS",
    description: "Call or WhatsApp {biz} to get a Moniepoint POS, open your business account or get help with your POS business.",
    h1: "Contact {biz}",
    lead: "The fastest way to reach us is WhatsApp. Tell us your location and what you need.",
    sections: [{ h: "Reach us", body: `{{CONTACT_BLOCK}}` }],
    faqs: [],
    related: ["moniepoint-pos-price", "how-to-get-moniepoint-pos"],
  },
];
