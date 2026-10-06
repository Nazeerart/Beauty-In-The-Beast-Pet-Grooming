// ============ EDIT YOUR BUSINESS DETAILS & IMAGES HERE ============
export const PHONE_DISPLAY = "+91 79891 69551";
export const PHONE_LINK = "tel:+917989169551";
export const MAPS_URL = "https://maps.app.goo.gl/aRxRUcNyqnGAEpTs8";

export const wa = (msg) =>
  `https://wa.me/917989169551?text=${encodeURIComponent(msg)}`;

export const WA_BOOK = wa(
  "Hi Beauty in the Beast! I would like to book a grooming appointment for my pet."
);

// NOTE: These are TEMPORARY generic stock images, NOT photos of the business.
// Replace them with the owner's original photos: put files in /public/images
// and use paths like "/images/groom1.jpg". Keep exactly this array shape.
const u = (id, w) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const IMAGES = {
  hero: u("photo-1516734212186-a967f81ad0d7", 1000),
  why: u("photo-1587300003388-59208cc962cb", 900),
  gallery: [
    { src: u("photo-1516734212186-a967f81ad0d7", 900), alt: "Dog during a grooming session (sample image)" },
    { src: u("photo-1587300003388-59208cc962cb", 600), alt: "Well-groomed golden dog (sample image)" },
    { src: u("photo-1583337130417-3346a1be7dee", 600), alt: "Happy dog (sample image)" },
    { src: u("photo-1601758228041-f3b2795255f1", 600), alt: "Clean fluffy pet (sample image)" },
    { src: u("photo-1450778869180-41d0601e046e", 600), alt: "Pet portrait (sample image)" },
    { src: u("photo-1548199973-03cce0bbc87b", 600), alt: "Dogs enjoying a day out (sample image)" },
  ],
};
