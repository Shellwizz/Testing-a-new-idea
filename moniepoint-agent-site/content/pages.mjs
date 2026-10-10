// Keyword-targeted pages. Each page aims at one cluster of searches people
// actually type ("moniepoint pos price", "money point loan", ...).
//
// Placeholders replaced at build time:
//   {biz}  site name          {phone}  phone number
//   {city} your city          {state}  your state
//   {owner} your name         {role}   your Moniepoint role
//
// Writing style: first person ("I"), short sentences, no dashes, no emoji.
// Don't publish exact fees or loan rates unless you have confirmed them.

export const pages = [
  // ───────────────────────────── HOME ─────────────────────────────
  {
    slug: "",
    title: "Moniepoint POS, Business Account and Loans | {owner}, Moniepoint BRM",
    description:
      "Get your Moniepoint POS, open a Moniepoint business account and get help with loans and Moniebook. Talk directly to {owner}, a Business Relationship Manager at Moniepoint.",
    h1: "Get your Moniepoint POS through a Moniepoint BRM",
    lead:
      "I’m {owner}, a Business Relationship Manager at Moniepoint. I help shop owners, POS agents and growing businesses get set up on Moniepoint and stay set up. If you searched “Moniepoint POS”, “Money Point POS” or “Moniepoint near me”, you can talk to me directly.",
    sections: [
      {
        h: "What I can help you with",
        body: `<ul class="ticks">
<li><strong>POS terminal.</strong> I take you from request to activation.</li>
<li><strong>Business account.</strong> I make sure your documents are right the first time.</li>
<li><strong>Starting a POS business.</strong> Location, cash flow and how to price your service.</li>
<li><strong>Loans.</strong> How Moniepoint credit works and what helps you qualify.</li>
<li><strong>Moniebook.</strong> Track your sales, stock and who owes you.</li>
<li><strong>After you start.</strong> I stay your contact when you need help.</li>
</ul>`,
      },
      {
        h: "Why go through a BRM",
        body: `<p>Anyone can download the app. The difference is having one person who knows your business, answers your calls and follows up when something is stuck. That is my job at Moniepoint.</p>
<p>Moniepoint Microfinance Bank is licensed by the CBN and deposits are insured by the NDIC.</p>`,
      },
      {
        h: "You may have searched for",
        body: `<p class="variants">Moniepoint POS · Money Point POS · Monie Point · Moneypoint · Moniepoint agent · Moniepoint BRM · Moniepoint near me · Moniepoint business account · Moniepoint loan · Money Point loan · Moniebook · Money Book · Moniepoint POS price · Moniepoint charges</p><p>They all lead to the same place. I can help with every one of them.</p>`,
      },
      {
        h: "How it works",
        body: `<ol class="steps">
<li>Send me a message on WhatsApp or call. Tell me where you are and what you need.</li>
<li>I tell you exactly which documents to get ready.</li>
<li>We open your account and request your terminal together.</li>
<li>You start taking payments. I show you how to price withdrawals and transfers.</li>
</ol>`,
      },
    ],
    faqs: [
      {
        q: "Is it Money Point or Moniepoint?",
        a: "It is Moniepoint. Many people type Money Point, Monie Point or Moneypoint. They all mean the same company and the same POS.",
      },
      {
        q: "Can I get a Moniepoint POS outside Lagos?",
        a: "Yes. Send me your state and town on WhatsApp and I will tell you the fastest way to get your terminal.",
      },
      {
        q: "Who runs this website?",
        a: "I do. I’m {owner}, a {role}. This is my own website, not Moniepoint’s official website. I can onboard you to Moniepoint directly.",
      },
    ],
    related: ["moniepoint-pos-price", "how-to-get-moniepoint-pos", "moniepoint-loan", "moniepoint-pos-charges", "start-pos-business-nigeria", "money-point-pos"],
  },

  // ─────────────────────── MISSPELLING CATCHER ───────────────────────
  {
    slug: "money-point-pos",
    title: "Money Point POS (Moniepoint): How to Get One Today | {biz}",
    description:
      "Searching for Money Point POS, Monie Point or Moneypoint? It is Moniepoint. Here is how to get the POS, what it costs, the charges and how loans work.",
    h1: "Money Point POS: how to get one",
    lead:
      "Money Point, Monie Point, Moneypoint, Monipoint. However you spell it, you mean <strong>Moniepoint</strong>, the POS and business banking company used by agents and shops all over Nigeria. I’m a Business Relationship Manager there, and I can get you set up.",
    sections: [
      {
        h: "Getting your Money Point POS",
        body: `<ol class="steps">
<li>Open a Moniepoint business account. I can do this with you.</li>
<li>Request a POS terminal for your business.</li>
<li>Collect it or have it delivered, then activate it.</li>
<li>Start taking card payments, withdrawals and transfers.</li>
</ol>
<p>Full steps: <a href="/how-to-get-moniepoint-pos/">How to get a Moniepoint POS</a>.</p>`,
      },
      {
        h: "Price",
        body: `<p>The price depends on the type of terminal and any offer running at the time. Prices change, so I give you today’s price before you pay anything. More on the <a href="/moniepoint-pos-price/">Moniepoint POS price</a> page.</p>`,
      },
      {
        h: "Money Point loan",
        body: `<p>Moniepoint offers business loans to eligible users inside the app. Steady transactions over time help a lot. Read the <a href="/moniepoint-loan/">Moniepoint loan guide</a>.</p>`,
      },
    ],
    faqs: [
      { q: "Is Money Point the same as Moniepoint?", a: "Yes. Money Point is just how many people say or spell Moniepoint. Same company, same POS." },
      { q: "Where can I get a Money Point POS near me?", a: "Message me on WhatsApp with your location and I will guide you." },
    ],
    related: ["moniepoint-pos-price", "moniepoint-loan", "moniepoint-near-me", "moniebook"],
  },

  // ─────────────────────────── PRICE ───────────────────────────
  {
    slug: "moniepoint-pos-price",
    title: "Moniepoint POS Price in Nigeria Today | {biz}",
    description:
      "How much is a Moniepoint POS machine in Nigeria? What affects the price, caution fee or outright purchase, and how to get today’s price from a Moniepoint BRM.",
    h1: "Moniepoint POS price in Nigeria",
    lead:
      "The price of a Moniepoint POS depends on three things: the <strong>type of terminal</strong>, whether you pay a <strong>caution fee or buy it outright</strong>, and any <strong>promo</strong> running at the time.",
    sections: [
      {
        h: "What changes the price",
        body: `<ul class="ticks">
<li><strong>Terminal type.</strong> Android terminals with a printer cost more than basic ones.</li>
<li><strong>How you pay.</strong> Some terminals come with a caution fee, others are bought outright.</li>
<li><strong>Your location.</strong> Delivery outside the big cities can add a little.</li>
<li><strong>Promos.</strong> Moniepoint sometimes runs offers for new customers.</li>
</ul>`,
      },
      {
        h: "Get today’s price",
        body: `<p>Prices online go out of date quickly. Send me “POS PRICE” and your town on WhatsApp and I will reply with the current options.</p>
<p class="warn"><strong>Be careful:</strong> don’t pay anyone for a Moniepoint POS until you know who they are. Ask for a receipt and confirm activation on your own Moniepoint app.</p>`,
      },
    ],
    faqs: [
      { q: "How much is a Moniepoint POS machine?", a: "It depends on the terminal and current offers. Message me on WhatsApp for today’s price in your area." },
      { q: "Is the Moniepoint POS free?", a: "Usually not. There is a purchase price or caution fee. Sometimes there are promos. Ask me what is available now." },
      { q: "Can I pay in instalments?", a: "Ask me. Options depend on your location and the time." },
    ],
    related: ["how-to-get-moniepoint-pos", "moniepoint-pos-requirements", "moniepoint-pos-charges"],
  },

  // ─────────────────────────── HOW TO GET ───────────────────────────
  {
    slug: "how-to-get-moniepoint-pos",
    title: "How to Get a Moniepoint POS Machine, Step by Step | {biz}",
    description:
      "How to get a Moniepoint POS in Nigeria: documents, account opening, terminal request, delivery and activation. Get help from a Moniepoint BRM.",
    h1: "How to get a Moniepoint POS machine",
    lead: "It is a simple process when you know the steps. Here they are. Or send me a message and we do it together.",
    sections: [
      {
        h: "The steps",
        body: `<ol class="steps">
<li><strong>Get your documents ready.</strong> See the <a href="/moniepoint-pos-requirements/">requirements list</a>.</li>
<li><strong>Open a Moniepoint business account</strong> on the app, or with me.</li>
<li><strong>Verify your identity</strong> with BVN, NIN, a selfie and your address.</li>
<li><strong>Request your terminal</strong> and choose the type you want.</li>
<li><strong>Pay and receive it</strong> by delivery or pickup.</li>
<li><strong>Activate and test</strong> with a small transaction before customers come.</li>
</ol>`,
      },
      {
        h: "How long it takes",
        body: `<p>When your documents are right, it moves fast. Most delays come from names spelt differently on BVN, NIN and ID, or from blurry photos. I check these with you before you submit.</p>`,
      },
    ],
    faqs: [
      { q: "Can I get a Moniepoint POS without a shop?", a: "Yes. Many agents start from a kiosk, a table or an umbrella spot. You just need a clear location you can describe." },
      { q: "Do I need CAC registration?", a: "Not always to start. A registered business name can help with higher limits and loans later. Ask me what fits your case." },
    ],
    related: ["moniepoint-pos-requirements", "moniepoint-pos-price", "moniepoint-business-account", "become-moniepoint-agent"],
  },

  // ─────────────────────────── REQUIREMENTS ───────────────────────────
  {
    slug: "moniepoint-pos-requirements",
    title: "Moniepoint POS Requirements: Documents You Need | {biz}",
    description:
      "Documents for a Moniepoint POS: BVN, NIN, valid ID, passport photo, address and business location. A simple checklist from a Moniepoint BRM.",
    h1: "Moniepoint POS requirements",
    lead: "Have these ready before you apply and your registration will go much faster.",
    sections: [
      {
        h: "What you need",
        body: `<ul class="ticks">
<li>Your <strong>BVN</strong></li>
<li>Your <strong>NIN</strong></li>
<li>A <strong>valid ID</strong>: NIN slip, voter’s card, driver’s licence or international passport</li>
<li>A clear <strong>passport photo or selfie</strong></li>
<li>Your <strong>home address</strong> and <strong>business location</strong></li>
<li>The <strong>phone number</strong> linked to your BVN, and it must be active</li>
<li>Optional: <strong>CAC</strong> registration for higher limits</li>
</ul>`,
      },
      {
        h: "Mistakes that slow things down",
        body: `<ul>
<li>Your name is spelt differently on BVN and NIN.</li>
<li>The phone number on your BVN is no longer working.</li>
<li>The selfie is dark or blurry.</li>
<li>The address just says “beside the junction”. Add the street name and a landmark.</li>
</ul>`,
      },
    ],
    faqs: [
      { q: "Can I register without NIN?", a: "No. Identity checks need it. If you don’t have your NIN yet, get it first. It will save you time." },
    ],
    related: ["how-to-get-moniepoint-pos", "moniepoint-business-account", "moniepoint-pos-price"],
  },

  // ─────────────────────────── CHARGES ───────────────────────────
  {
    slug: "moniepoint-pos-charges",
    title: "Moniepoint POS Charges and What to Charge Customers | {biz}",
    description:
      "How Moniepoint POS charges work on withdrawals and transfers, and how POS agents set their own fees to make a profit. Simple examples.",
    h1: "Moniepoint POS charges explained",
    lead: "People mean two different things by “charges”. There is what <strong>Moniepoint charges you</strong>, and what <strong>you charge your customer</strong>. Your profit is the difference.",
    sections: [
      {
        h: "What Moniepoint charges you",
        body: `<p>Moniepoint takes a small fee on card transactions, usually a percentage with a cap, and on some transfers. Rates can change and can depend on your account. Check the current rate in your app, or ask me.</p>`,
      },
      {
        h: "What you charge your customer",
        body: `<p>Agents set their own fee, usually a flat amount for each withdrawal range. Base it on your area, how many agents are nearby, and how easy it is for you to get cash.</p>
<div class="example"><strong>Example only, not real rates:</strong><br>
A customer withdraws ₦10,000. Moniepoint’s fee to you is ₦X. You charge the customer ₦Y. <strong>Your profit is ₦Y minus ₦X.</strong><br>
Do 60 withdrawals a day and it adds up.</div>`,
      },
      {
        h: "Staying profitable",
        body: `<ul class="ticks">
<li>Know your cost per transaction before you set prices.</li>
<li>Put your price list where customers can see it.</li>
<li>Add transfers, airtime, data and bills to earn more per customer.</li>
<li>Write down each day’s profit, in <a href="/moniebook/">Moniebook</a> or a notebook.</li>
</ul>`,
      },
    ],
    faqs: [
      { q: "How much does Moniepoint charge per withdrawal?", a: "A small percentage with a cap, and it can change. Check your app for your current rate, or ask me." },
      { q: "How much should I charge for a ₦5,000 withdrawal?", a: "It depends on your area. See what agents near you charge and make sure your fee is above your Moniepoint cost." },
    ],
    related: ["pos-business-profit", "start-pos-business-nigeria", "moniepoint-pos-price"],
  },

  // ─────────────────────────── LOAN ───────────────────────────
  {
    slug: "moniepoint-loan",
    title: "Moniepoint Loan: How to Qualify and Apply | {biz}",
    description:
      "How Moniepoint business loans work, who qualifies, how to apply in the app, and how to build the transaction history that gets you approved.",
    h1: "Moniepoint loan: how to qualify and apply",
    lead: "Moniepoint offers <strong>business loans</strong> to eligible customers. Offers show up inside the app, and Moniepoint decides who qualifies. What I can do is help you set up properly and build the kind of record that improves your chances.",
    sections: [
      {
        h: "Who usually qualifies",
        body: `<p>Moniepoint makes the decision, but it generally favours businesses that:</p>
<ul class="ticks">
<li>Use their Moniepoint account <strong>actively and every day</strong>.</li>
<li>Have <strong>steady transactions</strong> over a few months.</li>
<li>Have <strong>finished verification</strong>: BVN, NIN and address.</li>
<li>Paid back any earlier loan on time.</li>
</ul>`,
      },
      {
        h: "How to apply",
        body: `<ol class="steps">
<li>Open your Moniepoint business app.</li>
<li>Go to the loans section. If you are eligible, you will see an offer.</li>
<li>Read the amount, interest and repayment terms carefully.</li>
<li>Accept only if the daily repayment fits what you earn.</li>
</ol>`,
      },
      {
        h: "Watch out for loan scams",
        body: `<p class="warn"><strong>Important:</strong> Moniepoint loans are offered inside the official app. Anyone asking you to pay a “processing fee” to approve your loan is a scammer. I will never ask you for money to approve a loan.</p>`,
      },
    ],
    faqs: [
      { q: "How do I get a loan from Moniepoint?", a: "If you qualify, an offer appears in your Moniepoint business app. Steady transactions over time help." },
      { q: "Why am I not eligible yet?", a: "Usually not enough transaction history, unfinished verification, or a late repayment before. Keep transacting steadily." },
      { q: "Does Moniepoint give loans to POS agents?", a: "Moniepoint offers credit to eligible business customers, including many POS agents. Moniepoint decides who qualifies." },
    ],
    related: ["moniepoint-business-account", "pos-business-profit", "moniebook"],
  },

  // ─────────────────────────── BECOME AGENT ───────────────────────────
  {
    slug: "become-moniepoint-agent",
    title: "How to Become a Moniepoint Agent in Nigeria | {biz}",
    description:
      "Become a Moniepoint POS agent: what you need, the steps, startup capital and what agents earn. Get started with a Moniepoint BRM.",
    h1: "How to become a Moniepoint agent",
    lead: "Running a POS stand is one of the most common small businesses in Nigeria. You give people cash, send transfers and pay bills for them, and you earn on every transaction.",
    sections: [
      {
        h: "What you need",
        body: `<ul class="ticks">
<li>Your documents. See the <a href="/moniepoint-pos-requirements/">requirements</a>.</li>
<li>A busy spot: a market, bus stop, school, hospital or estate gate.</li>
<li><strong>Startup cash</strong> for your float, both cash at hand and money in your account.</li>
<li>A table, umbrella or kiosk, and a price list.</li>
</ul>`,
      },
      {
        h: "Steps",
        body: `<ol class="steps">
<li>Open your Moniepoint business account.</li>
<li>Get your POS terminal. See <a href="/how-to-get-moniepoint-pos/">how</a>.</li>
<li>Choose your spot and set your prices.</li>
<li>Let people know: a signboard, your WhatsApp status, word of mouth.</li>
</ol>`,
      },
    ],
    faqs: [
      { q: "How much do I need to start?", a: "The terminal cost plus your float. Many agents start small and grow the float from profit. My POS business guide explains it." },
    ],
    related: ["start-pos-business-nigeria", "pos-business-profit", "moniepoint-pos-charges"],
  },

  // ─────────────────────────── START POS BUSINESS ───────────────────────────
  {
    slug: "start-pos-business-nigeria",
    title: "How to Start a POS Business in Nigeria with Moniepoint | {biz}",
    description:
      "A practical guide to starting a POS business in Nigeria with Moniepoint: capital, location, pricing, safety and growing your daily profit.",
    h1: "How to start a POS business in Nigeria",
    lead: "A POS business can bring daily income without a big setup cost. This is what I tell the new agents I work with.",
    sections: [
      { h: "1. Pick the right spot", body: `<p>Go where people need cash: markets, motor parks, schools, hospitals, estates, and areas without many ATMs. Watch the place for a few days before you settle.</p>` },
      { h: "2. Plan your money", body: `<p>You need the terminal, your float (cash and account balance), a stand or kiosk, a signboard, and a little extra. A bigger float lets you serve bigger withdrawals, and that means more profit.</p>` },
      { h: "3. Set your prices", body: `<p>Use the <a href="/moniepoint-pos-charges/">charges page</a> to work out your cost, then set a fee that leaves you a profit.</p>` },
      { h: "4. Stay safe", body: `<ul class="ticks"><li>Don’t keep all your cash in one place.</li><li>Check every transfer in your app before you give cash. Fake alerts are common.</li><li>Close before dark if your area is risky.</li></ul>` },
      { h: "5. Grow", body: `<p>Add airtime, data, electricity and TV payments. Keep records in <a href="/moniebook/">Moniebook</a>. Steady volume can also make you eligible for a <a href="/moniepoint-loan/">Moniepoint loan</a> to expand.</p>` },
    ],
    faqs: [
      { q: "Is POS business profitable in Nigeria?", a: "It can be, especially in a busy area with good float. Profit depends on your volume, prices and location." },
    ],
    related: ["pos-business-profit", "become-moniepoint-agent", "moniepoint-pos-charges"],
  },

  // ─────────────────────────── PROFIT ───────────────────────────
  {
    slug: "pos-business-profit",
    title: "How Much Do Moniepoint POS Agents Make Daily? | {biz}",
    description:
      "How much profit can you make with a Moniepoint POS? A simple daily and monthly calculation for POS agents in Nigeria.",
    h1: "How much can you make with a Moniepoint POS?",
    lead: "Your earnings come down to three numbers: <strong>how many transactions</strong> you do, <strong>your fee</strong>, and <strong>your Moniepoint cost</strong>.",
    sections: [
      {
        h: "The simple sum",
        body: `<div class="example"><strong>Daily profit = (your fee minus Moniepoint cost) × number of transactions</strong><br><br>
Example only: if you make ₦100 on each transaction and do 50 a day, that is ₦5,000 a day, about ₦130,000 in a 26 day month before expenses.</div>`,
      },
      { h: "How to make more", body: `<ul class="ticks"><li>More float so you can serve bigger withdrawals.</li><li>A better spot with more people passing.</li><li>Extra services: transfers, bills, airtime.</li><li>Longer hours on busy days like market days and month end.</li></ul>` },
    ],
    faqs: [{ q: "Can a POS business make ₦10,000 a day?", a: "Many busy agents do. It depends on your location, float and prices." }],
    related: ["moniepoint-pos-charges", "start-pos-business-nigeria", "moniepoint-loan"],
  },

  // ─────────────────────────── BUSINESS ACCOUNT ───────────────────────────
  {
    slug: "moniepoint-business-account",
    title: "Open a Moniepoint Business Account: Requirements and Steps | {biz}",
    description:
      "How to open a Moniepoint business account: what you need, the steps, and how it connects to your POS, loans and Moniebook.",
    h1: "Open a Moniepoint business account",
    lead: "Your business account is where everything happens. POS settlements, transfers, loans and records all run through it.",
    sections: [
      { h: "What you get", body: `<ul class="ticks"><li>An account for payments and POS settlements.</li><li>Transfers to any bank in Nigeria.</li><li>Access to POS terminals and, if you qualify, loans.</li><li>Moniebook for your records.</li></ul>` },
      { h: "How to open it", body: `<ol class="steps"><li>Download the official Moniepoint business app from the Play Store or App Store.</li><li>Sign up with your phone number and BVN.</li><li>Complete NIN, ID and selfie verification.</li><li>Add your business details and address.</li></ol><p>Stuck at any step? Send me a message and I will walk you through it.</p>` },
    ],
    faqs: [{ q: "Can I open one without a registered business?", a: "Yes. You can start as a sole business. CAC registration can unlock more features and limits later." }],
    related: ["moniepoint-pos-requirements", "moniepoint-loan", "moniebook"],
  },

  // ─────────────────────────── MONIEBOOK ───────────────────────────
  {
    slug: "moniebook",
    title: "Moniebook by Moniepoint: What It Is and How to Use It | {biz}",
    description:
      "Moniebook, often searched as Money Book, is Moniepoint’s app for tracking sales, stock, debts and invoices. Here is how small businesses use it.",
    h1: "Moniebook: simple records for your business",
    lead: "<strong>Moniebook</strong>, which many people search as “Money Book”, is Moniepoint’s app for keeping your business records on your phone: sales, expenses, stock, customer debts and invoices.",
    sections: [
      { h: "What you can do with it", body: `<ul class="ticks"><li>Record sales and expenses every day.</li><li>Track stock so you know when to restock.</li><li>Keep a list of customers who owe you.</li><li>Send invoices and receipts.</li><li>See your real profit, not just money in and money out.</li></ul>` },
      { h: "Why it helps POS agents", body: `<p>Good records show you which days and services make money and help you plan your float. They also build a clear history for your business.</p>` },
    ],
    faqs: [
      { q: "Is Money Book the same as Moniebook?", a: "Yes. Money Book is a common way people search for Moniebook by Moniepoint." },
      { q: "Is Moniebook free?", a: "Check the current plans in the app. I can help you set it up." },
    ],
    related: ["moniepoint-business-account", "pos-business-profit", "moniepoint-loan"],
  },

  // ─────────────────────────── CUSTOMER CARE (honest) ───────────────────────────
  {
    slug: "moniepoint-customer-care",
    title: "Moniepoint Customer Care: Who to Contact for What | {biz}",
    description:
      "How to reach official Moniepoint support for account problems, and when to contact {owner}, a Moniepoint BRM, for onboarding and POS help.",
    h1: "Moniepoint customer care: who to contact",
    lead: "<strong>This website is not Moniepoint customer care.</strong> I’m {owner}, a {role}, and I help new customers get onboarded and grow. Here is who to contact for what, so you get help faster.",
    sections: [
      { h: "Use official Moniepoint support for", body: `<ul><li>Failed or pending transactions and reversals</li><li>Blocked or restricted accounts</li><li>Disputes and chargebacks</li><li>Loan repayments and statements</li></ul><p>Use the <strong>help section inside the official Moniepoint app</strong>, or the contact details on Moniepoint’s official website.</p>` },
      { h: "Contact me for", body: `<ul class="ticks"><li>Getting a new POS terminal</li><li>Opening your business account</li><li>Starting or growing a POS business</li><li>Setting up Moniebook</li><li>Any “how do I” question</li></ul>` },
      { h: "Stay safe", body: `<p class="warn">No genuine person will ask for your <strong>PIN, OTP or password</strong>. Not Moniepoint, not me. Never share them.</p>` },
    ],
    faqs: [{ q: "What is the Moniepoint customer care number?", a: "Use the contact options in the official Moniepoint app or on Moniepoint’s official website. Be careful with numbers posted on random pages." }],
    related: ["moniepoint-failed-transaction", "moniepoint-pos-not-working", "how-to-get-moniepoint-pos"],
  },

  // ─────────────────────────── FAILED TRANSACTION ───────────────────────────
  {
    slug: "moniepoint-failed-transaction",
    title: "Moniepoint Failed Transaction or Debit: What to Do | {biz}",
    description:
      "Customer debited but the POS transaction failed? Transfer pending? What to do, how reversals work, and how to protect yourself as an agent.",
    h1: "Moniepoint failed transaction: what to do",
    lead: "The customer got a debit alert but the POS says failed? Stay calm. Here is how to handle it.",
    sections: [
      { h: "If you are the agent", body: `<ol class="steps"><li><strong>Don’t pay cash</strong> for a failed transaction, even if the customer shows you a debit alert.</li><li>Print or screenshot the failed receipt.</li><li>Check the transaction status in your Moniepoint app.</li><li>Tell the customer the money goes back to their bank automatically, usually quickly.</li><li>If it doesn’t clear, raise it with official Moniepoint support in the app.</li></ol>` },
      { h: "If you are the customer", body: `<p>If your card was debited for a failed POS transaction, <strong>your own bank</strong> handles the reversal. Contact them with the date, the amount and the agent’s receipt.</p>` },
    ],
    faqs: [{ q: "How long does a Moniepoint reversal take?", a: "Most happen automatically and quickly. Some take longer depending on the customer’s bank." }],
    related: ["moniepoint-customer-care", "moniepoint-pos-not-working"],
  },

  // ─────────────────────────── NOT WORKING ───────────────────────────
  {
    slug: "moniepoint-pos-not-working",
    title: "Moniepoint POS Not Working? Quick Fixes | {biz}",
    description:
      "Moniepoint POS not connecting, not printing or not reading cards? Try these quick fixes for network, paper, battery and card problems.",
    h1: "Moniepoint POS not working? Try these",
    lead: "Most POS problems can be fixed in a few minutes.",
    sections: [
      { h: "Not connecting", body: `<ul class="ticks"><li>Restart the terminal.</li><li>Check the SIM data, or switch to Wi-Fi.</li><li>Move to a spot with better signal.</li></ul>` },
      { h: "Not printing", body: `<ul class="ticks"><li>Check the paper roll. The shiny side faces the print head.</li><li>Clean the print head gently.</li><li>Use the right paper roll size.</li></ul>` },
      { h: "Not reading cards", body: `<ul class="ticks"><li>Try chip instead of tap, or the other way round.</li><li>Clean the card chip.</li><li>Try another card to see if the problem is the card or the terminal.</li></ul>` },
      { h: "Still not working?", body: `<p>Report terminal faults to official Moniepoint support in your app. For setup questions, message me.</p>` },
    ],
    faqs: [],
    related: ["moniepoint-failed-transaction", "moniepoint-customer-care"],
  },

  // ─────────────────────────── COMPARISON ───────────────────────────
  {
    slug: "moniepoint-vs-opay-vs-palmpay",
    title: "Moniepoint vs OPay vs PalmPay POS: Which Is Best? | {biz}",
    description:
      "Comparing Moniepoint, OPay and PalmPay POS for agents in Nigeria: reliability, settlement, loans and business tools.",
    h1: "Moniepoint vs OPay vs PalmPay POS",
    lead: "All three are popular in Nigeria. The right one is the one that fits your business. Here is what to compare.",
    sections: [
      { h: "What to compare", body: `<ul class="ticks"><li><strong>Success rate</strong> of transactions in your area.</li><li><strong>Settlement speed</strong>, meaning how fast your money lands.</li><li><strong>Charges</strong> on withdrawals and transfers.</li><li><strong>Loans</strong> for active agents.</li><li><strong>Business tools</strong> like records, extra terminals and staff accounts.</li><li><strong>Support</strong> when something goes wrong.</li></ul>` },
      { h: "Why many agents pick Moniepoint", body: `<p>Moniepoint is built for businesses. You get a business banking app, POS terminals, <a href="/moniepoint-loan/">business loans</a> for those who qualify, and <a href="/moniebook/">Moniebook</a> for records. Many agents tell me they value how reliable it is on busy days.</p><p>Plenty of agents keep a second terminal as a backup. Talk to me about what works best where you are.</p>` },
    ],
    faqs: [{ q: "Which POS is best in Nigeria?", a: "It depends on your location and needs. Moniepoint is a strong choice if you want reliability, business tools and access to credit." }],
    related: ["moniepoint-pos-price", "moniepoint-pos-charges", "become-moniepoint-agent"],
  },

  // ─────────────────────────── NEAR ME ───────────────────────────
  {
    slug: "moniepoint-near-me",
    title: "Moniepoint POS Near Me: Find Your State | {biz}",
    description:
      "Looking for a Moniepoint office or POS near you? A Moniepoint BRM can help you anywhere in Nigeria. Find your state below.",
    h1: "Moniepoint POS near me",
    lead: "Looking for a Moniepoint office or someone to get you a POS near you? Pick your state below, or send me your location.",
    sections: [{ h: "Find your state", body: `{{STATE_LINKS}}` }],
    faqs: [{ q: "Where is the nearest Moniepoint office?", a: "Moniepoint has offices in several cities. If you want a POS, messaging me is usually faster than going to an office." }],
    related: ["how-to-get-moniepoint-pos", "moniepoint-pos-price"],
  },

  // ─────────────────────────── MERCHANT POS (shops) ───────────────────────────
  {
    slug: "moniepoint-pos-for-shops",
    title: "Moniepoint POS for Shops, Supermarkets and Restaurants | {biz}",
    description:
      "Accept card payments and transfers in your shop with a Moniepoint POS. For supermarkets, pharmacies, restaurants, boutiques and any business that sells to customers.",
    h1: "Moniepoint POS for shops and businesses",
    answer: {
      q: "Can I use a Moniepoint POS to collect payment in my shop?",
      a: "Yes. A Moniepoint POS lets your shop accept card payments and transfers, and the money settles into your Moniepoint business account. Message me to get one set up.",
    },
    lead: "Not every POS is for cash withdrawals. If you run a shop, supermarket, pharmacy, restaurant or boutique, a Moniepoint POS lets customers <strong>pay you by card or transfer</strong>, so you lose fewer sales to “I don’t have cash”.",
    sections: [
      {
        h: "Who it is for",
        body: `<ul class="ticks">
<li>Supermarkets and provision stores</li>
<li>Pharmacies and hospitals</li>
<li>Restaurants, bars and fast food spots</li>
<li>Fashion, phone and electronics shops</li>
<li>Schools, hotels and service businesses</li>
</ul>`,
      },
      {
        h: "What you get",
        body: `<ul class="ticks">
<li><strong>Card and transfer payments</strong> straight into your business account.</li>
<li><strong>Receipts</strong> printed for customers.</li>
<li><strong>Records</strong> of every sale in the app, and in <a href="/moniebook/">Moniebook</a> if you use it.</li>
<li><strong>Room to grow.</strong> Steady sales can make you eligible for <a href="/moniepoint-loan/">Moniepoint business loans</a>.</li>
</ul>`,
      },
      {
        h: "How to get one",
        body: `<p>Open a <a href="/moniepoint-business-account/">Moniepoint business account</a>, request a terminal, and start taking payments. I can do the whole process with you. Send me your business type and location on WhatsApp.</p>`,
      },
    ],
    faqs: [
      { q: "Do I need a CAC certificate to get a Moniepoint POS for my shop?", a: "Not always to start, but a registered business can unlock higher limits. Tell me about your business and I will advise you." },
      { q: "Can I have more than one Moniepoint POS?", a: "Yes. Many shops run several terminals, for example one per till. Ask me about your setup." },
    ],
    related: ["moniepoint-business-account", "moniepoint-pos-price", "moniebook", "moniepoint-loan"],
  },

  // ─────────────────────────── CONTACT ───────────────────────────
  {
    slug: "contact",
    title: "Contact {owner}, Moniepoint BRM | {biz}",
    description: "Call or WhatsApp {owner}, a Business Relationship Manager at Moniepoint, to get a POS, open a business account or grow your business.",
    h1: "Talk to me",
    lead: "WhatsApp is the fastest way to reach me. Tell me where you are and what you need.",
    sections: [{ h: "Reach me", body: `{{CONTACT_BLOCK}}` }],
    faqs: [],
    related: ["moniepoint-pos-price", "how-to-get-moniepoint-pos"],
  },
];
