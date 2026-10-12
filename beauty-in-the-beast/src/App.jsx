import { useState, useEffect, useRef, useCallback } from "react";
import {
  Phone, MapPin, Menu, X, Check, Star, Scissors, Droplets, PawPrint, Sparkles,
  Ear, Wind, Heart, ShieldCheck, IndianRupee, Play, ZoomIn, ChevronLeft,
  ChevronRight, Quote, ArrowRight, Navigation,
} from "lucide-react";
import {
  IMAGES, VIDEOS, MAPS_URL, MAPS_DIRECTIONS, MAPS_EMBED, ADDRESS,
  PHONE_DISPLAY, PHONE_LINK, WA_BOOK, wa,
} from "./config.js";

/* ---------- small helpers ---------- */

const NAV = [
  ["Services", "services"],
  ["About", "about"],
  ["Gallery", "gallery"],
  ["Videos", "videos"],
  ["Reviews", "reviews"],
  ["Visit", "contact"],
];

const SERVICES = [
  { name: "Full Grooming", icon: Sparkles, g: "pink", text: "Bath, trim, brush-out and finishing touches in one complete session." },
  { name: "Bath & Blow Dry", icon: Droplets, g: "blue", text: "A gentle, thorough wash with a careful, comfortable blow dry." },
  { name: "Haircut & Styling", icon: Scissors, g: "sun", text: "Breed-appropriate cuts and tidy styling, shaped to suit your pet." },
  { name: "Nail & Paw Care", icon: PawPrint, g: "mint", text: "Careful nail trimming and paw tidying for comfortable walking." },
  { name: "Ear & Teeth Care", icon: Ear, g: "violet", text: "Gentle ear cleaning and basic oral hygiene care." },
  { name: "De-shedding & De-matting", icon: Wind, g: "coral", text: "Patient brushing to reduce loose fur and ease tangles and mats." },
];

const WHY = [
  { icon: Heart, g: "pink", title: "Caring treatment", text: "Pet parents often highlight the patient, friendly way their companions are handled." },
  { icon: Scissors, g: "blue", title: "Professional grooming", text: "Careful work and a polished finish are recurring themes across customer feedback." },
  { icon: ShieldCheck, g: "mint", title: "Clean & hygienic", text: "A clean environment and attention to hygiene help every visit feel reassuring." },
  { icon: IndianRupee, g: "sun", title: "Fairly valued", text: "Customers frequently describe the experience as reasonably priced for the care received." },
];

const THEMES = [
  { g: "pink", title: "Friendly & caring", text: "Customers appreciate the friendly approach and caring treatment their pets receive." },
  { g: "blue", title: "Professional finish", text: "Professional grooming and a neat, fresh result are often highlighted." },
  { g: "mint", title: "Clean, fair & reassuring", text: "Reviewers mention hygiene, reasonable pricing and a comfortable overall experience." },
];

const MARQUEE = ["Gentle handling", "Professional care", "Hygiene focused", "Loved locally", "Rated 4.9 on Google", "Happy tails guaranteed"];

/** WhatsApp-style glyph (lucide has no brand icons) */
const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <g transform="translate(6.6 6.4) scale(.45)">
      <path strokeWidth="3.8" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </g>
  </svg>
);

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

const Btn = ({ href, children, variant = "wa", icon: Icon, external = true, className = "" }) => (
  <a
    className={`btn btn-${variant} ${className}`}
    href={href}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
  >
    {Icon && <Icon size={20} aria-hidden="true" />}
    {children}
  </a>
);

/** Scroll-triggered "pop up" entrance */
function Reveal({ as: Tag = "div", variant = "up", delay = 0, className = "", style, children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!("IntersectionObserver" in window)) { setShown(true); return undefined; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`rv rv-${variant} ${shown ? "in" : ""} ${className}`}
      style={{ "--d": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Number that counts up when it scrolls into view */
function CountUp({ to, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { setVal(to); return undefined; }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const dur = 1500;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        setVal(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}

const SecHead = ({ eyebrow, title, text, light }) => (
  <Reveal className={`sec-head ${light ? "light" : ""}`}>
    <span className="pill">{eyebrow}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </Reveal>
);

/** Pop-up viewer shared by the photo gallery and the video gallery */
function Lightbox({ items, index, setIndex, kind }) {
  const open = index !== null;
  const touchX = useRef(null);
  const close = useCallback(() => setIndex(null), [setIndex]);
  const go = useCallback(
    (d) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length, setIndex]
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, go]);

  if (!open) return null;
  const item = items[index];
  const label = kind === "video" ? item.title : item.alt;

  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
      }}
    >
      <button className="lb-btn lb-close" onClick={close} aria-label="Close"><X size={24} /></button>
      <button className="lb-btn lb-prev" onClick={() => go(-1)} aria-label="Previous"><ChevronLeft size={28} /></button>
      <button className="lb-btn lb-next" onClick={() => go(1)} aria-label="Next"><ChevronRight size={28} /></button>

      <figure className="lb-panel" key={item.src}>
        {kind === "video" ? (
          <video className="lb-media" src={item.src} poster={item.poster} controls autoPlay muted loop playsInline />
        ) : (
          <img className="lb-media" src={item.src} alt={item.alt} />
        )}
        <figcaption>
          <span>{label}</span>
          <small>{index + 1} / {items.length}</small>
        </figcaption>
      </figure>
    </div>
  );
}

function VideoCard({ video, onOpen, delay }) {
  const ref = useRef(null);
  const canHover = () => window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
  const start = () => { if (canHover() && ref.current) ref.current.play().catch(() => {}); };
  const stop = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };
  return (
    <Reveal
      variant="zoom"
      delay={delay}
      className="vcard"
      role="button"
      tabIndex={0}
      aria-label={`Play video: ${video.title}`}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }}
      onMouseEnter={start}
      onMouseLeave={stop}
    >
      <div className="vthumb">
        <video ref={ref} poster={video.poster} muted loop playsInline preload="none" src={video.src} />
        <span className="vdur">{video.duration}</span>
        <span className="vplay"><Play size={26} fill="currentColor" /></span>
      </div>
      <div className="vmeta">
        <h3>{video.title}</h3>
        <span>Watch <ArrowRight size={16} /></span>
      </div>
    </Reveal>
  );
}

/* ---------- page ---------- */

export default function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(null);
  const [videoIdx, setVideoIdx] = useState(null);
  const progress = useRef(null);

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 10);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <div className="progress" ref={progress} aria-hidden="true" />

      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-in">
          <a href="#home" className="brand" onClick={() => setOpen(false)}>
            <img className="logo-img" src="/logo.png" alt="Beauty in the Beast logo" width="64" height="59" />
            <span className="brand-t"><b>Beauty in the Beast</b><small>Pet Grooming Parlour</small></span>
          </a>
          <nav className={`nav ${open ? "open" : ""}`} aria-label="Main">
            {NAV.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </nav>
          <div className="header-r">
            <a className="btn btn-call btn-sm" href={PHONE_LINK}><Phone size={17} />Call now</a>
            <a className="btn btn-wa btn-sm" href={WA_BOOK} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} />WhatsApp</a>
            <button className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section id="home" className="hero">
          <span className="blob b1" aria-hidden="true" />
          <span className="blob b2" aria-hidden="true" />
          <PawPrint className="paw p1" size={44} aria-hidden="true" />
          <PawPrint className="paw p2" size={32} aria-hidden="true" />
          <PawPrint className="paw p3" size={38} aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <Reveal variant="up"><span className="pill">🐾 Pet grooming in Uppal</span></Reveal>
              <Reveal variant="up" delay={90}><h1>Where every pet <em>leaves looking</em> beautiful.</h1></Reveal>
              <Reveal variant="up" delay={180}>
                <p className="lead">Professional grooming, gentle care and thoughtful handling for the companions who make your home complete.</p>
              </Reveal>
              <Reveal variant="up" delay={270} className="btn-row">
                <Btn href={WA_BOOK} icon={WhatsAppIcon}>Enquire on WhatsApp</Btn>
                <Btn href={PHONE_LINK} variant="call" icon={Phone} external={false}>Call {PHONE_DISPLAY}</Btn>
              </Reveal>
              <Reveal variant="up" delay={360} className="hero-proof">
                <div className="stars-sm">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={18} fill="#ffc233" stroke="#ffc233" />)}</div>
                <span><b>4.9</b> Google rating · <b>180</b> reviews</span>
              </Reveal>
            </div>

            <Reveal variant="zoom" delay={150} className="hero-img-wrap">
              <div className="hero-img">
                <Img src={IMAGES.hero} alt="Freshly groomed dog at Beauty in the Beast" eager />
                <div className="hero-cap"><b>Gentle hands. Beautiful results.</b><small>Beerappagadda · Uppal</small></div>
              </div>
              <div className="float f1"><span className="fi sun"><Star size={18} fill="#fff" stroke="#fff" /></span><div><b>4.9 Google</b><small>Rated by pet parents</small></div></div>
              <div className="float f2"><span className="fi pink"><Heart size={18} fill="#fff" stroke="#fff" /></span><div><b>Gentle Care</b><small>Every single visit</small></div></div>
            </Reveal>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((t, i) => (<span key={i}><PawPrint size={18} />{t}</span>))}
          </div>
        </div>

        {/* STATS */}
        <section className="stats">
          <div className="container stats-grid">
            <Reveal variant="pop"><b><CountUp to={4.9} decimals={1} />★</b><span>Google Rating</span></Reveal>
            <Reveal variant="pop" delay={80}><b><CountUp to={180} suffix="+" /></b><span>Customer Reviews</span></Reveal>
            <Reveal variant="pop" delay={160}><b><CountUp to={6} suffix="+" /></b><span>Grooming Services</span></Reveal>
            <Reveal variant="pop" delay={240}><b><CountUp to={100} suffix="%" /></b><span>Care & Attention</span></Reveal>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section">
          <div className="container">
            <SecHead eyebrow="Our care" title={<>A fresher coat. <em>A happier companion.</em></>}
              text="From regular grooming to a refreshing clean, every visit is approached with care, patience and respect for your pet." />
            <div className="grid-3">
              {SERVICES.map(({ name, icon: Icon, text, g }, i) => (
                <Reveal as="article" variant="pop" delay={(i % 3) * 110} className="card" key={name} style={{ "--g": `var(--g-${g})`, "--c": `var(--${g})` }}>
                  <span className="num">0{i + 1}</span>
                  <span className="ico"><Icon size={28} /></span>
                  <h3>{name}</h3>
                  <p>{text}</p>
                  <a className="link" target="_blank" rel="noopener noreferrer" href={wa(`Hi! I am interested in ${name} for my pet.`)}>
                    Ask on WhatsApp <ArrowRight size={17} />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT / WHY US */}
        <section id="about" className="section why">
          <div className="container why-grid">
            <Reveal variant="left" className="why-media">
              <Img className="why-img" src={IMAGES.why} alt="Groomer caring for a dog at the parlour" />
              <div className="float f3"><span className="fi mint"><Check size={18} stroke="#fff" /></span><div><b>Hygiene focused</b><small>Clean, calm space</small></div></div>
              <div className="why-score"><b>4.9</b><span>Highly rated on Google<br />across 180 reviews</span></div>
            </Reveal>
            <div>
              <Reveal variant="right"><span className="pill pill-w">Why pet parents choose us</span></Reveal>
              <Reveal variant="right" delay={80}><h2>Care they can feel. <em>Quality you can see.</em></h2></Reveal>
              <Reveal variant="right" delay={160}>
                <p className="lead dark">At Beauty in the Beast, we focus on comfortable, hygienic and careful grooming. We take our time with every pet, handle them gently and keep the space clean, so your companion goes home looking fresh and feeling relaxed.</p>
              </Reveal>
              <div className="why-cards">
                {WHY.map(({ icon: Icon, g, title, text }, i) => (
                  <Reveal variant="pop" delay={200 + i * 90} className="why-card" key={title} style={{ "--g": `var(--g-${g})` }}>
                    <span className="ico sm"><Icon size={22} /></span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="section gallery-sec">
          <div className="container">
            <SecHead eyebrow="The grooming room" title={<>Fresh faces, <em>happy tails.</em></>}
              text="Real pets from our parlour. Tap any photo to see it up close." />
            <div className="masonry">
              {IMAGES.gallery.map((g, i) => (
                <Reveal
                  as="button" type="button" variant="pop" delay={(i % 3) * 100}
                  className="m-item" key={g.src} onClick={() => setPhotoIdx(i)}
                  aria-label={`Open photo: ${g.alt}`}
                >
                  <Img src={g.src} alt={g.alt} />
                  <span className="m-over"><span className="m-zoom"><ZoomIn size={22} /></span><em>{g.alt}</em></span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* VIDEOS */}
        <section id="videos" className="section video-sec">
          <div className="container">
            <SecHead light eyebrow="Behind the scenes" title={<>See the care <em>in action.</em></>}
              text="Short clips of the gentle, patient grooming that makes every visit special. Tap to watch." />
            <div className="video-grid">
              {VIDEOS.map((v, i) => (
                <VideoCard key={v.src} video={v} delay={(i % 3) * 110} onOpen={() => setVideoIdx(i)} />
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="section">
          <div className="container">
            <SecHead eyebrow="What pet parents notice" title={<>Small details. <em>Lasting trust.</em></>}
              text="Recurring themes shared by customers in Google reviews." />
            <div className="reviews-grid">
              <Reveal variant="pop" className="score-card">
                <div className="score">4.9</div>
                <div className="stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={28} fill="#ffc233" stroke="#ffc233" />)}</div>
                <p>Rated by local pet parents<br /><small>180 Google reviews</small></p>
                <Btn href={MAPS_URL} variant="white" icon={Star}>Read reviews on Google</Btn>
              </Reveal>
              <div className="themes">
                {THEMES.map((t, i) => (
                  <Reveal variant="right" delay={i * 110} className="theme" key={t.title} style={{ "--g": `var(--g-${t.g})` }}>
                    <span className="qmark"><Quote size={20} /></span>
                    <p>“{t.text}”</p>
                    <div><b>{t.title}</b><small>A recurring Google review theme</small></div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact-sec">
          <div className="container">
            <SecHead eyebrow="Visit the parlour" title={<>Ready for their <em>fresh look?</em></>}
              text="Call or send a WhatsApp message to ask about grooming care for your pet." />
            <div className="contact-grid">
              <Reveal variant="left" className="contact-cards">
                <a className="c-card" href={PHONE_LINK}>
                  <span className="ico sm" style={{ "--g": "var(--g-blue)" }}><Phone size={22} /></span>
                  <div><small>Call us</small><b>{PHONE_DISPLAY}</b></div>
                </a>
                <a className="c-card" href={WA_BOOK} target="_blank" rel="noopener noreferrer">
                  <span className="ico sm" style={{ "--g": "linear-gradient(135deg,#25d366,#128c4a)" }}><WhatsAppIcon size={22} /></span>
                  <div><small>WhatsApp</small><b>Chat with us</b></div>
                </a>
                <a className="c-card" href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer">
                  <span className="ico sm" style={{ "--g": "var(--g-pink)" }}><MapPin size={22} /></span>
                  <div><small>Find us</small><b className="addr">{ADDRESS}</b></div>
                </a>
                <div className="btn-row">
                  <Btn href={WA_BOOK} icon={WhatsAppIcon}>WhatsApp us</Btn>
                  <Btn href={MAPS_DIRECTIONS} variant="ghost" icon={Navigation}>Get directions</Btn>
                </div>
              </Reveal>
              <Reveal variant="right" className="map">
                <iframe
                  title="Beauty in the Beast on Google Maps"
                  src={MAPS_EMBED}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a className="map-link" href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer"><MapPin size={16} />Open in Google Maps</a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="cta">
          <PawPrint className="paw p1" size={60} aria-hidden="true" />
          <PawPrint className="paw p3" size={44} aria-hidden="true" />
          <div className="container">
            <Reveal variant="pop"><h2>Give your pet a fresh new look today.</h2></Reveal>
            <Reveal variant="up" delay={100}><p className="lead">Send us a message with your pet's breed, age and grooming requirement. We'll guide you from there.</p></Reveal>
            <Reveal variant="up" delay={200} className="btn-row center">
              <Btn href={WA_BOOK} icon={WhatsAppIcon}>Chat on WhatsApp</Btn>
              <Btn href={PHONE_LINK} variant="white" icon={Phone} external={false}>Call now</Btn>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container foot">
          <div className="foot-brand">
            <img src="/logo.png" alt="" width="64" height="59" />
            <div><b>Beauty in the Beast</b><p>Pet Grooming Parlour · Uppal<br />Beerappagadda, Hyderabad</p></div>
          </div>
          <div className="foot-links">
            {NAV.map(([label, id]) => (<a key={id} href={`#${id}`}>{label}</a>))}
          </div>
        </div>
        <p className="copy">© 2026 Beauty in the Beast Pet Grooming Parlour · Made with care for pets & their people.</p>
      </footer>

      {/* desktop floating Call + WhatsApp */}
      <div className="fab-stack">
        <a className="fab fab-call" href={PHONE_LINK} aria-label="Call now"><Phone size={26} /><span>Call now</span></a>
        <a className="fab fab-wa" href={WA_BOOK} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><WhatsAppIcon size={30} /><span>WhatsApp</span></a>
      </div>

      {/* mobile sticky bottom Call + WhatsApp bar */}
      <div className="mobile-bar">
        <a className="mb mb-call" href={PHONE_LINK}><Phone size={20} />Call</a>
        <a className="mb mb-wa" href={WA_BOOK} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={22} />WhatsApp</a>
      </div>

      <Lightbox kind="photo" items={IMAGES.gallery} index={photoIdx} setIndex={setPhotoIdx} />
      <Lightbox kind="video" items={VIDEOS} index={videoIdx} setIndex={setVideoIdx} />
    </>
  );
}
