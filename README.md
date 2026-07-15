# BrandKarlo — Digital Marketing Agency Website

A fast, SEO-optimized, static multi-page website for **BrandKarlo**, a digital marketing agency based in New Delhi, India. Built with plain HTML, CSS, and vanilla JavaScript — no build step, no framework, no backend.

**Live Site:** [https://brandkarlo.vercel.app/](https://brandkarlo.vercel.app/)

---

## How It's Built

The site is a **static HTML site** — every page is a self-contained `.html` file that shares common CSS/JS assets. There is no templating engine, no server-side rendering, and no JavaScript framework. This keeps the site extremely fast, easy to host anywhere, and simple to edit (any page can be opened directly and edited in a text editor).

**Why static HTML instead of a framework?**
- Zero build tooling — no `npm install`, no bundler, no compile step
- Near-instant page loads (no JS framework to hydrate)
- Deploys as-is to any static host (Vercel, Netlify, GitHub Pages, S3, etc.)
- Easy for non-developers to hand-edit content directly in the HTML

### Layout pattern

Every page follows the same structure:

```
<head>  → SEO meta tags, Open Graph/Twitter tags, canonical URL, JSON-LD structured data, CSS
<body>
  Navbar (shared markup, duplicated per page)
  Page-specific content
  Footer (shared markup, duplicated per page)
  <script> tags (jQuery, Bootstrap JS, WOW.js, main.js)
```

Because there's no templating engine, the navbar and footer are **duplicated in every HTML file**. When editing shared elements (like the footer), changes must be applied consistently across all 11 pages — this repo includes Python scripts used during development to make those bulk edits safely and consistently.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styling | [Bootstrap 5.3](https://getbootstrap.com/) (compiled, in `css/bootstrap.min.css`) + custom styles in `css/style.css` and `css/blog.css` |
| Icons | Font Awesome 6.5 + Bootstrap Icons |
| Fonts | Google Fonts — Heebo (body) & Roboto (headings) |
| Animation | [WOW.js](https://github.com/matthieua/WOW) + [Animate.css](https://animate.style/) for scroll-reveal effects, [Waypoints](http://imakewebthings.com/waypoints/) for scroll-triggered counters |
| Interactivity | jQuery 3.7 + Bootstrap 5.3 JS bundle (navbar, accordions, carousels) + `js/main.js` (custom nav/scroll behavior) |
| Hosting | [Vercel](https://vercel.com) (static deployment, auto-deploys from GitHub `main` branch) |
| Headers | `vercel.json` — sets HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and long-term caching for static assets |

All third-party libraries are loaded via CDN (jQuery, Bootstrap, Font Awesome, Bootstrap Icons) except animation/scroll libraries, which are vendored locally in `lib/` for reliability and speed.

---

## Project Structure

```
seo-website/
├── index.html                    # Home
├── about.html                    # About BrandKarlo
├── service.html                  # All services + detailed breakdown
├── project.html                  # Portfolio / case studies
├── blog.html                     # Blog listing
├── faq.html                      # Frequently asked questions
├── careers.html                  # Open roles
├── contact.html                  # Contact form + business info
├── Get-Free-Consultation.html    # Lead-gen consultation form
├── privacy-policy.html
├── terms-and-conditions.html
│
├── css/
│   ├── bootstrap.min.css         # Bootstrap 5.3 (compiled)
│   ├── style.css                 # Site-wide custom styles, color theme, section-kicker/heading styles
│   └── blog.css                  # Blog-page-specific styles
│
├── js/
│   └── main.js                   # Navbar scroll behavior, back-to-top button, etc.
│
├── lib/                          # Vendored third-party JS/CSS
│   ├── animate/                  # Animate.css
│   ├── easing/                   # jQuery easing plugin
│   ├── waypoints/                # Waypoints.js (scroll triggers)
│   └── wow/                      # WOW.js (scroll-reveal animation)
│
├── img/                          # All images, icons (SVG), and illustrations
│
├── sitemap.xml                   # XML sitemap for search engines
├── robots.txt                    # Crawler rules + sitemap/llms.txt pointers
├── llms.txt                      # Structured site summary for AI/LLM discovery tools
└── vercel.json                   # Security headers + caching rules for deployment
```

---

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, performance snapshot, about summary, services grid, why-choose-us, process, featured projects, testimonials, contact form |
| About | `about.html` | Agency story, approach, mission |
| Services | `service.html` | All 6 services with anchored deep-link sections (`#seo-detail`, `#web-design-detail`, etc.) |
| Projects | `project.html` | Portfolio / case studies of past client work |
| Blog | `blog.html` | Articles on SEO, PPC, social media, branding, content & email marketing |
| FAQ | `faq.html` | Common client questions |
| Careers | `careers.html` | Open job roles |
| Contact | `contact.html` | Contact form + business details |
| Get Free Consultation | `Get-Free-Consultation.html` | Lead capture form for a free strategy call |
| Privacy Policy | `privacy-policy.html` | Legal |
| Terms & Conditions | `terms-and-conditions.html` | Legal |

---

## SEO & Discoverability

- Unique `<title>`, meta description, and canonical URL on every page
- Open Graph + Twitter Card tags for social sharing previews
- JSON-LD structured data (Service and BreadcrumbList schema) for rich search results
- `sitemap.xml` listing all pages
- `robots.txt` allowing full crawl access and pointing to the sitemap
- `llms.txt` — a machine-readable summary of the site's purpose, services, and page links, intended for AI assistants (e.g. ChatGPT, Claude) that reference `llms.txt` when recommending or summarizing a business

## Accessibility & Performance

- Every page has exactly one `<h1>` with a clean, sequential heading hierarchy (no skipped levels) — verified programmatically across all pages
- Decorative "kicker" labels use non-heading elements (`<span>`/`<p>`) styled via a `.section-kicker` class instead of misused heading tags
- All images have descriptive `alt` text
- Form inputs use properly associated `<label for="...">` elements
- Images are lazy-loaded where appropriate and served at optimized sizes
- Security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) are set via `vercel.json`
- Long-term caching headers on static assets (images, fonts, CSS, JS)

---

## Running Locally

No build step is required — this is a static site.

```bash
# Option 1: just open the file directly
open index.html

# Option 2: serve it locally (recommended, avoids CORS/file:// quirks)
npx serve .
# or
python3 -m http.server 8000
```

Then visit `http://localhost:8000` (or whichever port your server prints).

## Deployment

The site auto-deploys to **Vercel** on every push to the `main` branch of the connected GitHub repository. No environment variables or build command are needed — Vercel serves the static files directly, using the headers/caching rules defined in `vercel.json`.

## Editing Content

Since there's no CMS or templating layer, content changes are made by editing the relevant `.html` file directly:

- **Shared elements** (navbar, footer) exist in every page — a change to one must be repeated across all 11 pages to stay consistent.
- **Service links, contact details, and social links** live in the footer block near the bottom of each HTML file.
- **Images** go in `img/`; reference them with a relative path (e.g. `img/portfolio-1.jpg`) and always include descriptive `alt` text.

---

## License

MIT License — © 2026 Nitin Singh. See [`LICENSE`](./LICENSE) for full terms.