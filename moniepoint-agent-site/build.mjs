// Static site generator — no dependencies. Run:  node build.mjs
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
    .replaceAll("{state}", config.address.state);
const url = (slug) => `${config.siteUrl}/${slug ? slug + "/" : ""}`;
const waLink = (text) => `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`;

// ───────────── Location pages (generated from states list) ─────────────
const stateSlug = (s) => `moniepoint-pos-in-${s.slug || slugify(s.name)}`;
const intros = [
  (s) => `Need a Moniepoint POS in ${s.name}? {biz} helps business owners and POS agents in ${s.towns.slice(0, 3).join(", ")} and across ${s.name} get their Moniepoint terminal, open a business account and start earning.`,
  (s) => `Looking for where to get a Moniepoint (Money Point) POS machine in ${s.name}? Whether you’re in ${s.towns[0]} or ${s.towns[s.towns.length - 1]}, we’ll guide you from registration to your first transaction.`,
  (s) => `Thinking of starting a POS business in ${s.name}? Moniepoint is one of the most trusted POS networks for agents in ${s.towns.slice(0, 2).join(" and ")}. Here’s how {biz} gets you set up quickly.`,
];
const locationPages = states.map((s, i) => ({
  slug: stateSlug(s),
  isLocation: true,
  stateName: s.name,
  title: `Moniepoint POS in ${s.name} – Get Yours Fast | {biz}`,
  description: `Get a Moniepoint POS machine in ${s.name} (${s.towns.slice(0, 4).join(", ")}). Price, requirements, account opening and loan guidance. Chat with {biz} on WhatsApp.`,
  h1: `Moniepoint POS in ${s.name}`,
  lead: intros[i % intros.length](s),
  sections: [
    {
      h: `Areas we help in ${s.name}`,
      body: `<ul class="towns">${s.towns.map((t) => `<li>Moniepoint POS ${esc(t)}</li>`).join("")}</ul><p>Don’t see your town? We still help — just send your location on WhatsApp.</p>`,
    },
    {
      h: `How to get a Moniepoint POS in ${s.name}`,
      body: `<ol class="steps"><li>Message {biz} with your town in ${s.name}.</li><li>Get your documents ready — <a href="/moniepoint-pos-requirements/">see requirements</a>.</li><li>We help you open your Moniepoint business account and request your terminal.</li><li>Receive, activate and start earning.</li></ol>`,
    },
    {
      h: `Starting a POS business in ${s.name}`,
      body: `<p>Busy markets, motor parks, campuses and estates in ${s.towns.slice(0, 3).join(", ")} have steady demand for cash withdrawals and transfers. Read our <a href="/start-pos-business-nigeria/">POS business guide</a> and <a href="/pos-business-profit/">profit calculator</a> before you start.</p>`,
    },
  ],
  faqs: [
    { q: `How much is Moniepoint POS in ${s.name}?`, a: `Prices depend on terminal type and current offers. Message {biz} with your town in ${s.name} for today’s price.` },
    { q: `Where can I get Moniepoint POS in ${s.towns[0]}?`, a: `Chat with {biz} on WhatsApp — we’ll guide you to get your Moniepoint POS in ${s.towns[0]} quickly.` },
    { q: `Can I get a Moniepoint loan in ${s.name}?`, a: `Moniepoint loans are offered to eligible active users in the app, wherever you are in Nigeria. See our Moniepoint loan guide.` },
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
<p><a class="btn btn-wa" href="${waLink("Hello, I want a Moniepoint POS.")}" rel="nofollow">💬 Chat on WhatsApp</a>
<a class="btn btn-call" href="tel:${esc(config.phone)}">📞 Call ${esc(config.phone)}</a></p>
<p><strong>Email:</strong> <a href="mailto:${esc(config.email)}">${esc(config.email)}</a><br>
<strong>Address:</strong> ${esc(config.address.street)}, ${esc(config.address.city)}, ${esc(config.address.state)}<br>
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
    description: `Independent business helping customers get Moniepoint POS terminals, business accounts and POS business support in Nigeria.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      addressRegion: config.address.state,
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

function render(page) {
  const title = fill(page.title);
  const desc = fill(page.description);
  const canonical = url(page.slug);
  const waText = `Hello ${config.businessName}, I saw "${stripTags(fill(page.h1))}" on your website. I need help.`;
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
<meta name="theme-color" content="#0b5d3b">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/style.css">
${schema(page)}
</head>
<body>
<header class="top">
  <div class="wrap bar">
    <a class="brand" href="/">${esc(config.businessName)}</a>
    <nav aria-label="Main">${navItems.map(([s, l]) => `<a href="/${s}/">${l}</a>`).join("")}</nav>
  </div>
</header>
<main class="wrap">
  ${page.slug ? `<nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <span>${stripTags(fill(page.h1))}</span></nav>` : ""}
  <article>
    <h1>${fill(page.h1)}</h1>
    <p class="lead">${fill(page.lead)}</p>
    <p class="cta-row">
      <a class="btn btn-wa" href="${waLink(waText)}" rel="nofollow">💬 Chat on WhatsApp</a>
      <a class="btn btn-call" href="tel:${esc(config.phone)}">📞 Call Now</a>
    </p>
    ${body}
    ${faqs}
    <section class="cta-box">
      <h2>Ready to get your Moniepoint POS?</h2>
      <p>Message ${esc(config.businessName)} now — we reply fast. ${esc(config.hours)}.</p>
      <p><a class="btn btn-wa" href="${waLink(waText)}" rel="nofollow">💬 Chat on WhatsApp</a></p>
    </section>
    ${related ? `<aside class="related"><h2>Related guides</h2><ul>${related}</ul></aside>` : ""}
  </article>
</main>
<footer class="foot">
  <div class="wrap">
    <div class="cols">
      <div><h3>Guides</h3><ul>${footerTopics}</ul></div>
      <div><h3>Popular locations</h3><ul>${allPages
        .filter((p) => p.isLocation)
        .slice(0, 8)
        .map((p) => `<li><a href="/${p.slug}/">Moniepoint POS ${esc(p.stateName)}</a></li>`)
        .join("")}<li><a href="/moniepoint-near-me/">All states →</a></li></ul></div>
      <div><h3>Contact</h3><p>${esc(config.businessName)}<br>${esc(config.address.city)}, ${esc(config.address.state)}<br><a href="tel:${esc(config.phone)}">${esc(config.phone)}</a><br>${esc(config.hours)}</p></div>
    </div>
    <p class="disclaimer"><strong>Disclaimer:</strong> ${esc(config.businessName)} is an independent business and is not Moniepoint Inc., Moniepoint Microfinance Bank or an official Moniepoint customer care channel. “Moniepoint” and “Moniebook” are trademarks of their respective owners and are used here only to describe the products we help customers with. For account issues, use the official Moniepoint app. We will never ask for your PIN, OTP or password.</p>
    <p class="copy">© ${new Date().getFullYear()} ${esc(config.businessName)}</p>
  </div>
</footer>
<a class="wa-float" href="${waLink(waText)}" rel="nofollow" aria-label="Chat on WhatsApp">💬</a>
</body>
</html>`;
}

// ───────────── Write output ─────────────
await rm(out, { recursive: true, force: true });
await mkdir(join(out, "assets"), { recursive: true });
await copyFile(join(root, "assets/style.css"), join(out, "assets/style.css"));
await copyFile(join(root, "assets/favicon.svg"), join(out, "assets/favicon.svg"));

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
if (config.siteUrl.includes("example.com")) console.warn("⚠  siteUrl is still example.com — update site.config.mjs before deploying.");
if (config.phone.includes("8000000000")) console.warn("⚠  phone/WhatsApp are placeholders — update site.config.mjs.");
