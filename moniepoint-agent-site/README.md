# Moniepoint POS — SEO lead site

A fast, static, SEO-focused website that captures people searching for
Moniepoint ("Money Point", "Monie Point", "Moniebook"/"Money Book", Moniepoint
loan, POS price, charges, agent registration, "near me", every Nigerian state…)
and sends them to **your** WhatsApp and phone.

## 1. Put in your details
Edit `site.config.mjs`: business name, phone, WhatsApp, email, address,
hours and your real domain (`siteUrl`).

## 2. Build
```bash
node build.mjs      # no npm install needed
```
Output is in `dist/` (55 pages + sitemap.xml + robots.txt).

## 3. Go live (free options)
- **Netlify** / **Cloudflare Pages**: drag-and-drop the `dist` folder, or connect
  this repo with build command `node moniepoint-agent-site/build.mjs` and
  publish directory `moniepoint-agent-site/dist`.
- Connect your own domain (e.g. `yourname-pos.com.ng`).

## 4. Get Google to find you (most important)
1. Add the site to **Google Search Console**, verify, and submit `/sitemap.xml`.
2. Create a **Google Business Profile** for your shop. This is what wins
   "moniepoint near me" searches on Google Maps. Link it in `socialLinks`.
3. Get real reviews from customers on that profile.
4. Share page links on your WhatsApp status, Facebook groups, TikTok.
5. Add a new helpful page every week or two (in `content/pages.mjs`) and
   add real towns you serve in `content/locations.mjs`.

## What's inside
- `content/pages.mjs`: 18 keyword pages (price, how to get, requirements,
  charges, loan, Moniebook, agent, profit, customer care, troubleshooting,
  comparison, misspelling page "money point pos", …)
- `content/locations.mjs`: one page per state + FCT with local towns
- Every page has a unique title/description, canonical URL, FAQ rich-result
  data, LocalBusiness data, breadcrumbs, internal links, and WhatsApp buttons
  with a pre-filled message saying which page the visitor came from.

## Rules that keep the site safe
- The site clearly says it is an **independent business, not Moniepoint**.
  Keep it that way. Posing as official Moniepoint or its customer care can get
  the site removed and is illegal.
- Don't publish exact fees or loan rates unless you have confirmed them.
- Never promise loan approval; only Moniepoint approves loans.
