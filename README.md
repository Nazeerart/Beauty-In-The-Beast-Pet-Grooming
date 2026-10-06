# Beauty in the Beast Pet Grooming Parlour

Official website for **Beauty in the Beast Pet Grooming Parlour**, Uppal, Hyderabad, Telangana, India.

Customers can see our grooming services and contact us directly through WhatsApp, phone call or Google Maps. There is no login, database or payment system.

## Contact

- WhatsApp: [+91 79891 69551](https://wa.me/917989169551)
- Phone: +91 79891 69551
- Location: [Google Maps](https://maps.app.goo.gl/aRxRUcNyqnGAEpTs8)

## Tech

- React 18
- Vite 5
- Plain CSS
- Lucide React icons
- Hosted on Vercel (no backend, no environment variables)

## How it works

This is a single-page website. Everything loads once, and the menu links scroll to each section (Home, Services, About, Gallery, Reviews, Contact).

**Page structure.** `src/App.jsx` builds the page from sections in this order: header, hero, statistics bar, about, services, why choose us, gallery, Google reviews, contact, final call-to-action and footer. A floating WhatsApp button stays on screen while scrolling.

**Booking through WhatsApp.** There is no booking system or backend. Every "Chat on WhatsApp" button opens `https://wa.me/917989169551` with a pre-filled message. Each service card sends its own message, for example "Hi! I am interested in Full Grooming for my pet." The customer taps send, and the conversation continues in WhatsApp.

**Calls and directions.** The Call card uses a `tel:` link, which opens the phone dialer on mobile. The Directions and "View reviews on Google" buttons open the Google Maps listing.

**Reviews.** The site does not copy or store reviews. It shows the rating and sends visitors to Google to read the latest ones.

**Settings in one place.** `src/config.js` holds the phone number, WhatsApp and map links, and every image address. Changing a value there updates it everywhere on the site.

**Responsive layout.** `src/styles.css` adapts the page to the screen size. On desktop it uses multi-column layouts. On tablets and phones the menu becomes a hamburger menu, columns stack into one, buttons become full width and the gallery resizes.

**Build and hosting.** Vite bundles the React code into plain static files in the `dist` folder. Vercel runs `npm run build` and serves those files, so there is no server or database to maintain. Each `git push` to `main` rebuilds and republishes the site.

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into /dist
npm run preview    # preview the production build
```

## Project structure

```
├── index.html          SEO, Open Graph, fonts
├── vercel.json
├── public/
│   ├── favicon.svg
│   └── logo.png        Business logo
└── src/
    ├── main.jsx
    ├── App.jsx         Page sections and text
    ├── config.js       Phone, links and ALL images
    └── styles.css      Colours, fonts, layout
```

## Updating the website

- Phone number, WhatsApp, map link and images: `src/config.js`
- Text and services: `src/App.jsx`
- Colours, sizes and spacing: `src/styles.css`
- Logo: replace `public/logo.png` (keep the same file name)

## Images

The gallery, hero and "Why choose us" images are temporary generic stock photos. They are **not** photos of the business. Replace them with the owner's own photos:

1. Put the photos in `public/images/`
2. In `src/config.js`, set each entry to a path like `/images/groom1.jpg`

## Deploy to Vercel

1. Push this repository to GitHub.
2. Sign in at [vercel.com](https://vercel.com) with GitHub.
3. Click **Add New → Project** and import this repository.
4. Framework is detected as **Vite**. Leave the defaults and click **Deploy**.
5. Every `git push` to `main` redeploys the site automatically.

## License

© 2026 Beauty in the Beast. All rights reserved.
