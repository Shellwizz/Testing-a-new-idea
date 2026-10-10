// Static site generator, no dependencies. Run:  node build.mjs
// Output goes to ./dist (upload that folder to any static host).
import { mkdir, writeFile, copyFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import config from "./site.config.mjs";
import { pages } from "./content/pages.mjs";
import { states } from "./content/locations.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, "dist");
const today = new Date().toISOString().slice(0, 10);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const stripTags = (s) => String(s).replace(/<[^>]+>/g, "");
const slugify = (s) => s.toLowerCase().replace(/\(.*?\)/g, "").trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const fill = (s) =>
  String(s)
    .replaceAll("{biz}", config.businessName)
    .replaceAll("{phone}", config.phone)
    .replaceAll("{city}", config.address.city)
    .replaceAll("{state}", config.address.state)
    .replaceAll("{owner}", config.ownerName)
    .replaceAll("{role}", config.ownerRole);
const addressLine = [config.address.street, config.address.city, config.address.state].filter(Boolean).map(esc).join(", ");
const url = (slug) => `${config.siteUrl}/${slug ? slug + "/" : ""}`;
const waLink = (text) => `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`;

// ───────────── Location pages (generated from states list) ─────────────
const stateSlug = (s) => `moniepoint-pos-in-${s.slug || slugify(s.name)}`;
const intros = [
  (s) => `Need a Moniepoint POS in ${s.name}? I’m {owner}, a Business Relationship Manager at Moniepoint. I help shop owners and POS agents in ${s.towns.slice(0, 3).join(", ")} and across ${s.name} get their terminal, open a business account and start earning.`,
  (s) => `Looking for where to get a Moniepoint (Money Point) POS machine in ${s.name}? Whether you’re in ${s.towns[0]} or ${s.towns[s.towns.length - 1]}, I’ll take you from registration to your first transaction. I’m a Business Relationship Manager at Moniepoint.`,
  (s) => `Thinking of starting a POS business in ${s.name}? Moniepoint is one of the most trusted POS networks for agents in ${s.towns.slice(0, 2).join(" and ")}. As a Moniepoint BRM, I can get you set up quickly.`,
];
const locationPages = states.map((s, i) => ({
  slug: stateSlug(s),
  isLocation: true,
  stateName: s.name,
  title: `Moniepoint POS in ${s.name}: Get Yours Fast | {biz}`,
  description: `Get a Moniepoint POS machine in ${s.name} (${s.towns.slice(0, 4).join(", ")}). Price, requirements, account opening and loan guidance. Talk to a Moniepoint BRM on WhatsApp.`,
  h1: `Moniepoint POS in ${s.name}`,
  lead: intros[i % intros.length](s),
  sections: [
    {
      h: `Areas I cover in ${s.name}`,
      body: `<ul class="towns">${s.towns.map((t) => `<li>Moniepoint POS ${esc(t)}</li>`).join("")}</ul><p>Don’t see your town? I can still help. Just send your location on WhatsApp.</p>`,
    },
    {
      h: `How to get a Moniepoint POS in ${s.name}`,
      body: `<ol class="steps"><li>Message me with your town in ${s.name}.</li><li>Get your documents ready. <a href="/moniepoint-pos-requirements/">See the requirements</a>.</li><li>I help you open your Moniepoint business account and request your terminal.</li><li>Receive, activate and start earning.</li></ol>`,
    },
    {
      h: `Starting a POS business in ${s.name}`,
      body: `<p>Busy markets, motor parks, campuses and estates in ${s.towns.slice(0, 3).join(", ")} have steady demand for cash withdrawals and transfers. Read my <a href="/start-pos-business-nigeria/">POS business guide</a> and <a href="/pos-business-profit/">profit guide</a> before you start.</p>`,
    },
  ],
  faqs: [
    { q: `How much is Moniepoint POS in ${s.name}?`, a: `Prices depend on terminal type and current offers. Message me with your town in ${s.name} for today’s price.` },
    { q: `Where can I get Moniepoint POS in ${s.towns[0]}?`, a: `Send me a message on WhatsApp and I’ll guide you to get your Moniepoint POS in ${s.towns[0]} quickly.` },
    { q: `Can I get a Moniepoint loan in ${s.name}?`, a: `Moniepoint loans are offered to eligible active users in the app, wherever you are in Nigeria. See my Moniepoint loan guide.` },
  ],
  related: ["moniepoint-pos-price", "how-to-get-moniepoint-pos", "moniepoint-loan", "money-point-pos"],
}));

const allPages = [...pages, ...(config.nationwide ? locationPages : locationPages.filter((p) => p.stateName === config.address.state))];
const bySlug = Object.fromEntries(allPages.map((p) => [p.slug, p]));

// ───────────── Reusable blocks ─────────────
const stateLinks = `<ul class="state-grid">${allPages
  .filter((p) => p.isLocation)
  .map((p) => `<li><a href="/${p.slug}/">Moniepoint POS in ${esc(p.stateName)}</a></li>`)
  .join("")}</ul>`;

const contactBlock = () => `<div class="contact-card">
<p><a class="btn btn-wa" href="${waLink("Hello, I want to get started with Moniepoint.")}" rel="nofollow">${icon.chat} Chat on WhatsApp</a>
<a class="btn btn-ghost" href="tel:${esc(config.phone)}">${icon.phone} Call ${esc(config.phone)}</a></p>
<p><strong>Email:</strong> <a href="mailto:${esc(config.email)}">${esc(config.email)}</a><br>
${addressLine ? `<strong>Address:</strong> ${addressLine}<br>` : ""}
<strong>Hours:</strong> ${esc(config.hours)}</p></div>`;

const navItems = [
  ["how-to-get-moniepoint-pos", "Get a POS"],
  ["moniepoint-pos-price", "Price"],
  ["moniepoint-loan", "Loans"],
  ["moniebook", "Moniebook"],
  ["moniepoint-near-me", "Near Me"],
  ["contact", "Contact"],
];

function schema(page) {
  const business = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${config.siteUrl}/#business`,
    name: config.businessName,
    url: config.siteUrl + "/",
    telephone: config.phone,
    email: config.email,
    description: `${config.ownerName}, ${config.ownerRole}, helps businesses get Moniepoint POS terminals, business accounts, loans and Moniebook in Nigeria.`,
    founder: { "@type": "Person", name: config.ownerName, jobTitle: config.ownerRole },
    address: {
      "@type": "PostalAddress",
      ...(config.address.street ? { streetAddress: config.address.street } : {}),
      ...(config.address.city ? { addressLocality: config.address.city } : {}),
      ...(config.address.state ? { addressRegion: config.address.state } : {}),
      addressCountry: config.address.country,
    },
    areaServed: page.isLocation ? { "@type": "State", name: page.stateName } : { "@type": "Country", name: "Nigeria" },
    openingHoursSpecification: config.openingHoursSpec.map((o) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: o.days, opens: o.opens, closes: o.closes })),
    ...(config.socialLinks.length ? { sameAs: config.socialLinks } : {}),
  };
  const blocks = [business];
  if (page.slug) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: url("") },
        { "@type": "ListItem", position: 2, name: stripTags(fill(page.h1)), item: url(page.slug) },
      ],
    });
  }
  if (page.faqs?.length) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: fill(f.q), acceptedAnswer: { "@type": "Answer", text: fill(f.a) } })),
    });
  }
  return blocks.map((b) => `<script type="application/ld+json">${JSON.stringify(b).replace(/</g, "\\u003c")}</script>`).join("\n");
}

// ───────────── Brand: logo, icons, illustration ─────────────
const initials = config.businessName.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
const logoSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 40 40"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f4fd8"/><stop offset="1" stop-color="#16a3c4"/></linearGradient></defs><rect width="40" height="40" rx="11" fill="url(#lg)"/><text x="20" y="26" text-anchor="middle" font-family="Sora, Arial, sans-serif" font-weight="800" font-size="15" fill="#fff">${esc(initials)}</text><circle cx="32" cy="9" r="3" fill="#f5b544"/></svg>`;
const logoMark = `<span class="logo">${logoSvg(36)}</span>`;
const icon = {
  chat: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7a11.4 11.4 0 0 1-4.6-4.1c-.4-.5-1-1.6-1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.6 2a7.6 7.6 0 0 0 2.3 1.5c.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.1.1.6-.1 1.2Z"/></svg>`,
  phone: `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>`,
  check: `<svg class="ic ic-check" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor" opacity=".14"/><path d="m7 12.5 3.2 3.2L17.5 8.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};
const trustItems = [
  ["Direct onboarding", "Handled by a Moniepoint BRM"],
  ["Nationwide", "All 36 states + FCT"],
  ["Quick replies", "Call or WhatsApp me directly"],
  ["Safe and honest", "I never ask for your PIN or OTP"],
];
const terminalArt = `<svg viewBox="0 0 320 340" class="terminal">
  <defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfe7fb"/></linearGradient></defs>
  <rect x="150" y="18" width="150" height="96" rx="16" fill="#ffffff" opacity=".12"/>
  <text x="166" y="50" font-family="Nunito Sans, Arial" font-size="12" fill="#cfe0ff">Today’s earnings</text>
  <text x="166" y="80" font-family="Sora, Arial" font-weight="800" font-size="24" fill="#ffffff">₦24,500</text>
  <rect x="166" y="92" width="80" height="6" rx="3" fill="#f5b544"/>
  <g transform="translate(40 70)">
    <rect width="170" height="260" rx="26" fill="url(#tg)"/>
    <rect x="18" y="-14" width="134" height="30" rx="6" fill="#f2f5fc"/>
    <rect x="18" y="20" width="134" height="92" rx="12" fill="#0f1f44"/>
    <text x="34" y="52" font-family="Nunito Sans, Arial" font-size="11" fill="#9fb4e8">Withdrawal</text>
    <text x="34" y="82" font-family="Sora, Arial" font-weight="800" font-size="22" fill="#ffffff">₦10,000</text>
    <text x="34" y="100" font-family="Nunito Sans, Arial" font-size="10" fill="#4ade80">✓ Approved</text>
    ${[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => `<rect x="${24 + c * 44}" y="${128 + r * 30}" width="34" height="22" rx="7" fill="${r === 3 && c === 2 ? "#2f4fd8" : "#c9d5f3"}"/>`).join("")).join("")}
  </g>
  <circle cx="262" cy="250" r="38" fill="#25c26e"/>
  <path d="m246 250 11 11 20-22" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const products = ["POS terminal", "Business account", "Business loan", "Moniebook", "Personal account", "Something else"];
const leadForm = `<section class="lead-form" id="enquire">
  <h2>Tell me what you need</h2>
  <p>Fill this in and it opens WhatsApp with your message ready to send. I reply fast.</p>
  <form data-wa="${config.whatsapp}">
    <label for="lf-name">Your name</label><input id="lf-name" name="name" required autocomplete="name" placeholder="e.g. Chidi">
    <label for="lf-town">Town / area</label><input id="lf-town" name="town" required placeholder="e.g. Ikeja, Lagos">
    <label for="lf-need">I’m interested in</label><select id="lf-need" name="need">${products.map((p) => `<option>${p}</option>`).join("")}</select>
    <button class="btn btn-wa" type="submit">${icon.chat} Send on WhatsApp</button>
  </form>
</section>
<script>document.querySelectorAll(".lead-form form").forEach(function(f){f.addEventListener("submit",function(e){e.preventDefault();var d=new FormData(f);var msg="Hello ${esc(config.ownerName)}, my name is "+d.get("name")+" from "+d.get("town")+". I'm interested in: "+d.get("need")+" (Moniepoint). Page: "+document.title;window.location.href="https://wa.me/"+f.dataset.wa+"?text="+encodeURIComponent(msg);});});</script>`;
const avatar = config.photo
  ? `<img class="avatar" src="/assets/${esc(config.photo)}" alt="${esc(config.ownerName)}" width="96" height="96">`
  : `<span class="avatar avatar-initials" aria-hidden="true">${esc(config.ownerName.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase())}</span>`;
const aboutBlock = `<section class="about">
  ${avatar}
  <div>
    <p class="about-role">Business Relationship Manager, Moniepoint</p>
    <h2>Hi, I’m ${esc(config.ownerName)}</h2>
    <p>I work with Moniepoint as a Business Relationship Manager. My job is to get businesses set up properly and to be the person they call when they need something. I work with shop owners, POS agents and traders across ${config.address.state ? `${esc(config.address.state)} and beyond` : "Nigeria"}.</p>
    <p>Call or WhatsApp me on <a href="tel:${esc(config.phone)}">${esc(config.phone)}</a>.</p>
  </div>
</section>`;
const reviewsBlock = (config.reviews || []).length
  ? `<section class="reviews"><h2>What my customers say</h2><div class="review-grid">${config.reviews
      .map((r) => `<figure class="review"><blockquote>“${esc(r.text)}”</blockquote><figcaption>${esc(r.name)}${r.place ? `, ${esc(r.place)}` : ""}</figcaption></figure>`)
      .join("")}</div></section>`
  : "";

function render(page) {
  const title = fill(page.title);
  const desc = fill(page.description);
  const canonical = url(page.slug);
  const waText = `Hello ${config.ownerName}, I saw "${stripTags(fill(page.h1))}" on your website and I need help.`;
  const body = page.sections
    .map((s) => `<section><h2>${fill(s.h)}</h2>${fill(s.body).replace("{{STATE_LINKS}}", stateLinks).replace("{{CONTACT_BLOCK}}", contactBlock())}</section>`)
    .join("\n");
  const faqs = page.faqs?.length
    ? `<section class="faq"><h2>Frequently asked questions</h2>${page.faqs
        .map((f) => `<details><summary>${fill(f.q)}</summary><p>${fill(f.a)}</p></details>`)
        .join("")}</section>`
    : "";
  const related = (page.related || [])
    .filter((s) => bySlug[s] !== undefined && s !== page.slug)
    .map((s) => `<li><a href="/${s ? s + "/" : ""}">${stripTags(fill(bySlug[s].h1))}</a></li>`)
    .join("");
  const footerTopics = pages
    .filter((p) => p.slug && p.slug !== "contact")
    .map((p) => `<li><a href="/${p.slug}/">${stripTags(fill(p.h1))}</a></li>`)
    .join("");

  const isHome = page.slug === "";
  const hero = `<section class="hero${isHome ? " hero-home" : ""}">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${page.slug && page.slug !== "404" ? `<nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>${stripTags(fill(page.h1))}</span></nav>` : ""}
      <p class="eyebrow">${page.isLocation ? `Serving ${esc(page.stateName)} · ` : ""}${esc(config.ownerName)} · Business Relationship Manager, Moniepoint</p>
      <h1>${fill(page.h1)}</h1>
      <p class="lead">${fill(page.lead)}</p>
      <div class="cta-row">
        <a class="btn btn-wa" href="${waLink(waText)}" rel="nofollow">${icon.chat} Chat on WhatsApp</a>
        <a class="btn btn-ghost" href="tel:${esc(config.phone)}">${icon.phone} Call ${esc(config.phone)}</a>
      </div>
    </div>
    ${isHome ? `<div class="hero-art" aria-hidden="true">${terminalArt}</div>` : ""}
  </div>
</section>
<div class="trust"><div class="wrap trust-grid">${trustItems.map(([t, d]) => `<div class="trust-item">${icon.check}<div><strong>${t}</strong><span>${d}</span></div></div>`).join("")}</div></div>`;

  return `<!doctype html>
<html lang="en-NG">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow, max-image-preview:large">
${config.googleVerification ? `<meta name="google-site-verification" content="${esc(config.googleVerification)}">` : ""}
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="${esc(config.businessName)}">
<meta property="og:locale" content="en_NG">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#0f1f44">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Nunito+Sans:wght@400;600;700&display=swap">
<link rel="stylesheet" href="/assets/style.css">
${schema(page)}
</head>
<body>
<header class="top">
  <div class="wrap bar">
    <a class="brand" href="/">${logoMark}<span>${esc(config.businessName)}</span></a>
    <nav aria-label="Main">${navItems.map(([s, l]) => `<a href="/${s}/"${s === page.slug ? ' aria-current="page"' : ""}>${l}</a>`).join("")}</nav>
  </div>
</header>
${hero}
<main class="wrap">
  <article class="content">
    ${isHome || page.slug === "contact" ? aboutBlock : ""}
    ${body}
    ${reviewsBlock}
    ${page.slug === "404" ? "" : leadForm}
    ${faqs}
  </article>
  <section class="cta-box">
    <div>
      <h2>Ready to get your Moniepoint POS?</h2>
      <p>Send me a message. I’m available ${esc(config.hours)}.</p>
    </div>
    <a class="btn btn-wa" href="${waLink(waText)}" rel="nofollow">${icon.chat} Chat on WhatsApp</a>
  </section>
  ${related ? `<aside class="related"><h2>Related guides</h2><ul>${related}</ul></aside>` : ""}
</main>
<footer class="foot">
  <div class="wrap">
    <div class="cols">
      <div><a class="brand foot-brand" href="/">${logoMark}<span>${esc(config.businessName)}</span></a><p>${addressLine ? `${addressLine}<br>` : ""}<a href="tel:${esc(config.phone)}">${esc(config.phone)}</a><br><a href="mailto:${esc(config.email)}">${esc(config.email)}</a><br>${esc(config.hours)}</p></div>
      <div><h3>Guides</h3><ul>${footerTopics}</ul></div>
      <div><h3>Popular locations</h3><ul>${allPages
        .filter((p) => p.isLocation)
        .slice(0, 8)
        .map((p) => `<li><a href="/${p.slug}/">Moniepoint POS ${esc(p.stateName)}</a></li>`)
        .join("")}<li><a href="/moniepoint-near-me/">All states →</a></li></ul></div>
    </div>
    <p class="disclaimer"><strong>About this site:</strong> ${esc(config.businessName)} is the personal website of ${esc(config.ownerName)}, a ${esc(config.ownerRole)}. It is not Moniepoint’s official website or customer care channel. “Moniepoint” and “Moniebook” are trademarks of Moniepoint Inc. For account issues, use the official Moniepoint app. I will never ask for your PIN, OTP or password.</p>
    <p class="copy">© ${new Date().getFullYear()} ${esc(config.businessName)}</p>
  </div>
</footer>
<a class="wa-float" href="${waLink(waText)}" rel="nofollow" aria-label="Chat on WhatsApp">${icon.chat}</a>
</body>
</html>`;
}

// ───────────── Write output ─────────────
await rm(out, { recursive: true, force: true });
await mkdir(join(out, "assets"), { recursive: true });
await copyFile(join(root, "assets/style.css"), join(out, "assets/style.css"));
await writeFile(join(out, "assets/favicon.svg"), logoSvg(64));
if (config.photo) await copyFile(join(root, "assets", config.photo), join(out, "assets", config.photo));

for (const page of allPages) {
  const dir = join(out, page.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), render(page));
}

await writeFile(
  join(out, "404.html"),
  render({ slug: "404", title: "Page not found | {biz}", description: "Page not found.", h1: "Page not found", lead: "Sorry, that page doesn’t exist. Try one of these instead.", sections: [], faqs: [], related: ["", "moniepoint-pos-price", "how-to-get-moniepoint-pos", "moniepoint-near-me"] }).replace(
    '<meta name="robots" content="index, follow, max-image-preview:large">',
    '<meta name="robots" content="noindex">'
  )
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((p) => `  <url><loc>${url(p.slug)}</loc><lastmod>${today}</lastmod><priority>${p.slug === "" ? "1.0" : p.isLocation ? "0.7" : "0.9"}</priority></url>`).join("\n")}
</urlset>
`;
await writeFile(join(out, "sitemap.xml"), sitemap);
await writeFile(join(out, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${config.siteUrl}/sitemap.xml\n`);

console.log(`Built ${allPages.length} pages → ${out}`);
if (config.siteUrl.includes("example.com")) console.warn("⚠  siteUrl is still example.com. Update site.config.mjs before deploying.");
if (config.phone.includes("8000000000")) console.warn("⚠  phone/WhatsApp are placeholders. Update site.config.mjs.");
