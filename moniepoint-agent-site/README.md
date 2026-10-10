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

## 4. Get found by Google, Bing and AI assistants (most important)

Built in already: unique titles and descriptions, a quick answer at the top of
every page, an author byline with an updated date, FAQ, Person,
LocalBusiness, Article and breadcrumb structured data, a FAQ hub page,
`llms.txt` for AI assistants, a `robots.txt` that welcomes Google, Bing,
ChatGPT, Claude and Perplexity crawlers, a social share image, and an
IndexNow key for fast Bing indexing.

After you go live:
1. Set `siteUrl` in `site.config.mjs` to your live address and rebuild.
2. **Google Search Console**: add the site, submit `/sitemap.xml`.
3. **Bing Webmaster Tools**: import from Google Search Console, submit the
   sitemap. Bing powers ChatGPT search and Copilot answers.
4. Run `node ping-indexnow.mjs` every time you publish changes.
5. Create a **Google Business Profile** for your shop. This is what wins
   "moniepoint near me" searches on Google Maps. Link it in `socialLinks`.
6. Get real reviews from customers on that profile.
7. Share page links on your WhatsApp status, Facebook groups, TikTok.
8. Add a new helpful page every week or two (in `content/pages.mjs`) and
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
