// Business details and locally hosted business media
export const PHONE_DISPLAY = "+91 79891 69551";
export const PHONE_LINK = "tel:+917989169551";
export const MAPS_URL = "https://maps.app.goo.gl/aRxRUcNyqnGAEpTs8";

const MAPS_QUERY = "Beauty in the Beast Pet Grooming Parlour Beerappagadda Uppal";
export const MAPS_DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;
export const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`;

export const ADDRESS =
  "Beside Ananya Copier Services Xerox, opposite Food Court, Balaji Enclave, Beerappagadda, Uppal, Secunderabad, Hyderabad, Telangana 500039";

export const wa = (msg) =>
  `https://wa.me/917989169551?text=${encodeURIComponent(msg)}`;
export const WA_BOOK = wa(
  "Hi Beauty in the Beast! I would like to book a grooming appointment for my pet."
);

export const IMAGES = {
  hero: "/images/grooming-portrait-blue.png",
  why: "/images/groomer-with-dog.png",
  gallery: [
    { src: "/images/grooming-portrait-blue.png", alt: "A freshly groomed Shih Tzu at the salon" },
    { src: "/images/golden-bath-groomer.png", alt: "Groomer giving a golden retriever a gentle bubble bath" },
    { src: "/images/groomer-with-dog.png", alt: "Groomer caring for a fluffy white dog" },
    { src: "/images/golden-on-grooming-table.png", alt: "Happy golden retriever on the grooming table" },
    { src: "/images/fresh-groom-white-dog.png", alt: "Freshly groomed small white dog" },
    { src: "/images/fluffy-white-spitz.png", alt: "Fluffy white dog freshly groomed and smiling" },
    { src: "/images/happy-shih-tzu.png", alt: "Happy Shih Tzu with a fresh trim" },
    { src: "/images/grooming-table-dog.png", alt: "Dog standing on the grooming table" },
  ],
};

export const VIDEOS = [
  { src: "/videos/grooming-session.mp4", poster: "/posters/grooming-session.jpg", title: "Gentle grooming in action", duration: "0:15" },
  { src: "/videos/golden-dog-grooming.mp4", poster: "/posters/golden-dog-grooming.jpg", title: "Care for every coat", duration: "0:29" },
  { src: "/videos/cat-care.mp4", poster: "/posters/cat-care.jpg", title: "Patient, gentle pet care", duration: "0:15" },
  { src: "/videos/dog-bath-time.mp4", poster: "/posters/dog-bath-time.jpg", title: "Bath time at the salon", duration: "0:20" },
  { src: "/videos/salon-pet-care.mp4", poster: "/posters/salon-pet-care.jpg", title: "A look inside our grooming care", duration: "0:25" },
];
