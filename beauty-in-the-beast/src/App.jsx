import { useState, useEffect } from "react";
import {
  MessageCircle, Phone, MapPin, Menu, X, Check, Star, Scissors,
  Droplets, PawPrint, Sparkles, Ear, Wind, Heart,
} from "lucide-react";
import { IMAGES, MAPS_URL, PHONE_DISPLAY, PHONE_LINK, WA_BOOK, wa } from "./config.js";

const NAV = ["Home", "Services", "About", "Gallery", "Reviews", "Contact"];

const SERVICES = [
  { name: "Full Grooming", icon: Sparkles, text: "Bath, trim, brush-out and finishing touches in one complete session." },
  { name: "Bath & Blow Dry", icon: Droplets, text: "A gentle, thorough wash with a careful, comfortable blow dry." },
  { name: "Haircut & Styling", icon: Scissors, text: "Breed-appropriate cuts and tidy styling, shaped to suit your pet." },
  { name: "Nail & Paw Care", icon: PawPrint, text: "Careful nail trimming and paw tidying for comfortable walking." },
  { name: "Ear & Teeth Care", icon: Ear, text: "Gentle ear cleaning and basic oral hygiene care." },
  { name: "De-shedding & De-matting", icon: Wind, text: "Patient brushing to reduce loose fur and ease tangles and mats." },
];

const Img = ({ src, alt, eager, className }) => (
  <img
    className={className}
    src={src}
    alt={alt}
    loading={eager ? "eager" : "lazy"}
    decoding="async"
    onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
  />
);

const Btn = ({ href, children, variant = "wa", icon: Icon }) => (
  <a className={`btn btn-${variant}`} href={href} target="_blank" rel="noopener noreferrer">
    {Icon && <Icon size={20} aria-hidden="true" />}
    {children}
  </a>
);

export default function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-in">
          <a href="#home" className="brand" onClick={() => setOpen(false)}>
            <img className="logo-img" src="/logo.png" alt="Beauty in the Beast logo" width="64" height="59" />
            <span className="brand-t"><b>Beauty in the Beast</b><small>Pet Grooming Parlour</small></span>
          </a>
          <nav className={`nav ${open ? "open" : ""}`} aria-label="Main">
            {NAV.map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)}>{n}</a>
            ))}
          </nav>
          <div className="header-r">
            <a className="btn btn-wa btn-sm" href={WA_BOOK} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} /><span className="hide-xs">Chat on WhatsApp</span><span className="show-xs">Chat</span>
            </a>
            <button className="burger" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Professional pet grooming · Uppal</p>
              <h1>Where every pet <em>leaves looking</em> their best.</h1>
              <p className="lead">Gentle grooming, careful handling and a clean, comfortable experience for your furry family members.</p>
              <div className="btn-row">
                <Btn href={WA_BOOK} icon={MessageCircle}>Chat on WhatsApp</Btn>
                <Btn href={MAPS_URL} variant="ghost" icon={MapPin}>Get Directions</Btn>
              </div>
            </div>
            <div className="hero-img">
              <Img src={IMAGES.hero} alt="Dog being groomed (sample image)" eager />
              <div className="float f1"><Star size={18} fill="#c9a24b" stroke="#c9a24b" /><div><b>4.9 ★</b><small>Google Rating</small></div></div>
              <div className="float f2"><Heart size={18} color="#1f3d2e" /><div><b>Gentle Care</b><small>Every Visit</small></div></div>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="container stats-grid">
            {[["4.9★", "Google Rating"], ["180+", "Customer Reviews"], ["6+", "Grooming Services"], ["100%", "Care & Attention"]].map(([n, l]) => (
              <div key={l}><b>{n}</b><span>{l}</span></div>
            ))}
          </div>
        </section>

        <section id="about" className="section">
          <div className="container about">
            <h2>More than grooming. A better experience.</h2>
            <div>
              <p className="lead dark">At Beauty in the Beast, we focus on comfortable, hygienic and careful grooming. We take our time with every pet, handle them gently and keep the space clean, so your companion goes home looking fresh and feeling relaxed.</p>
              <p className="lead dark">Message us with your pet's details and we'll help you choose the right service.</p>
              <Btn href={WA_BOOK} icon={MessageCircle}>Talk to us on WhatsApp</Btn>
            </div>
          </div>
        </section>

        <section id="services" className="section alt">
          <div className="container">
            <div className="sec-head"><h2>Our grooming services</h2><p>Everything your pet needs to look and feel their best.</p></div>
            <div className="grid-3">
              {SERVICES.map(({ name, icon: Icon, text }) => (
                <article className="card" key={name}>
                  <span className="ico"><Icon size={28} /></span>
                  <h3>{name}</h3>
                  <p>{text}</p>
                  <a className="link" target="_blank" rel="noopener noreferrer" href={wa(`Hi! I am interested in ${name} for my pet.`)}>Ask on WhatsApp</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="why">
          <div className="container why-grid">
            <Img className="why-img" src={IMAGES.why} alt="Groomed dog (sample image)" />
            <div>
              <h2>Clean care. Gentle hands. Happy tails.</h2>
              <ul className="checks">
                {["Patient handling", "Hygiene-focused grooming", "Care suited to your pet", "Easy WhatsApp booking"].map((t) => (
                  <li key={t}><Check size={20} />{t}</li>
                ))}
              </ul>
              <Btn href={WA_BOOK} icon={MessageCircle}>Start a WhatsApp chat</Btn>
            </div>
          </div>
        </section>

        <section id="gallery" className="section">
          <div className="container">
            <div className="sec-head"><h2>Gallery</h2><p>Sample imagery shown until our own photos are added.</p></div>
            <div className="gallery">
              {IMAGES.gallery.map((g, i) => (
                <figure key={i} className={`g g${i + 1}`}><Img src={g.src} alt={g.alt} /></figure>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="section alt">
          <div className="container reviews">
            <div className="score">4.9</div>
            <div className="stars" aria-label="5 stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={30} fill="#c9a24b" stroke="#c9a24b" />)}</div>
            <p className="lead dark">Rated by local pet parents</p>
            <p className="muted">Read the latest customer reviews directly on Google.</p>
            <Btn href={MAPS_URL} icon={Star}>View reviews on Google</Btn>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <div className="sec-head">
              <h2>Visit or contact us</h2>
              <p>Beauty in the Beast Pet Grooming Parlour<br />Uppal, Hyderabad, Telangana, India</p>
            </div>
            <div className="grid-3">
              <a className="contact" href={WA_BOOK} target="_blank" rel="noopener noreferrer"><MessageCircle size={34} /><h3>WhatsApp</h3><p>Chat with us</p></a>
              <a className="contact" href={PHONE_LINK}><Phone size={34} /><h3>Call</h3><p>{PHONE_DISPLAY}</p></a>
              <a className="contact" href={MAPS_URL} target="_blank" rel="noopener noreferrer"><MapPin size={34} /><h3>Directions</h3><p>Get directions</p></a>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <h2>Ready for a fresh new look?</h2>
            <p className="lead">Send us a WhatsApp message with your pet's breed, age and grooming requirement. We'll guide you from there.</p>
            <Btn href={WA_BOOK} icon={MessageCircle}>Chat on WhatsApp</Btn>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container foot">
          <div><b>Beauty in the Beast</b><p>Pet Grooming Parlour<br />Uppal, Hyderabad</p></div>
          <div className="foot-links">
            <a href={WA_BOOK} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={PHONE_LINK}>Call</a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">Directions</a>
          </div>
        </div>
        <p className="copy">© 2026 Beauty in the Beast. All rights reserved.</p>
      </footer>

      <a className="fab" href={WA_BOOK} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <MessageCircle size={30} />
      </a>
    </>
  );
}
