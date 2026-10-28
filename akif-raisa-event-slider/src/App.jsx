import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, CalendarDays, Clock, Sparkles, ArrowDown, Flower2, Users, Quote, PartyPopper, Music2, Volume2, Navigation, ArrowUp, Instagram, Share2, Copy, Check, X, ChevronLeft, ChevronRight, CalendarPlus } from "lucide-react";
import weddingData from "./data/weddingData";

function GoldDivider() {
  return <div className="my-5 flex items-center justify-center gap-3 text-gold"><span className="h-px w-12 bg-gold/60" /><span>✦</span><span className="h-px w-12 bg-gold/60" /></div>;
}

function InvitationOpening({ onOpen }) {
  return (
    <motion.main className="opening-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="opening-glow" />
      <motion.div className="opening-card" initial={{ y: 28, scale: .96 }} animate={{ y: 0, scale: 1 }} transition={{ duration: .8 }}>
        <div className="ornament">❧</div>
        <p className="arabic" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <p className="eyebrow">WITH THE BLESSINGS OF THE ALMIGHTY</p>
        <div className="monogram">A <span>&</span> R</div>
        <p className="script-line">Together with our families</p>
        <h1 className="opening-names">Sheikh Akif <span>&</span><br />Raisa Fareen</h1>
        <GoldDivider />
        <p className="opening-copy">Invite you to share in the joy<br />of their wedding celebration</p>
        <p className="date-pill">14 — 16 DECEMBER 2026</p>
        <motion.button className="gold-button" onClick={() => { startWeddingMusic(); onOpen(); }} whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }}>
          Open Invitation <Heart size={16} fill="currentColor" />
        </motion.button>
        <div className="ornament bottom">❧</div>
      </motion.div>
      <p className="opening-footer">A NEW CHAPTER • A FOREVER PROMISE</p>
    </motion.main>
  );
}

function Hero() {
  return <section className="hero section-pad" id="home">
    <div className="hero-cinematic-photo" style={{ backgroundImage: `url(${weddingData.couple.couplePhoto})` }} aria-hidden="true" /><div className="hero-pattern" />
    <motion.div className="hero-inner" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
      <p className="arabic" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      <p className="eyebrow">A CELEBRATION OF LOVE & DESTINY</p>
      <div className="hero-monogram">A <span>&</span> R</div>
      <h1 className="hero-names">Sheikh Akif <span>&</span><br /><em>Raisa Fareen</em></h1>
      <GoldDivider />
      <p className="hero-subtitle">With the blessings of Allah and our beloved families,<br className="desktop-break" /> we invite you to celebrate our wedding.</p>
      <p className="hero-date"><CalendarDays size={17} /> 14 – 16 December 2026</p>
      <a className="outline-button" href="#events">Explore the celebration <ArrowDown size={16} /></a>
    </motion.div>
    <div className="hero-corner corner-one">✧</div><div className="hero-corner corner-two">✧</div><div className="hero-orb orb-one" /><div className="hero-orb orb-two" /><div className="hero-orb orb-three" />
  </section>;
}

function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date("2026-12-15T12:00:00+05:30").getTime() - now);
  const parts = [
    ["Days", Math.floor(diff / 86400000)],
    ["Hours", Math.floor((diff % 86400000) / 3600000)],
    ["Minutes", Math.floor((diff % 3600000) / 60000)],
    ["Seconds", Math.floor((diff % 60000) / 1000)]
  ];
  return <div className="countdown">{parts.map(([label, value]) => <div className="countdown-unit" key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div>;
}

function Events() {
  const [activeEvent, setActiveEvent] = useState(0);
  const touchStartX = React.useRef(null);
  const active = weddingData.events[activeEvent];

  const showPrevious = () => setActiveEvent((current) => (current - 1 + weddingData.events.length) % weddingData.events.length);
  const showNext = () => setActiveEvent((current) => (current + 1) % weddingData.events.length);
  const onTouchStart = (event) => { touchStartX.current = event.touches[0].clientX; };
  const onTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (delta < -45) showNext();
    if (delta > 45) showPrevious();
    touchStartX.current = null;
  };

  return <section className="section-pad events-section" id="events">
    <div className="section-heading">
      <p className="eyebrow">SAVE THE DATES</p>
      <h2>Wedding <em>Celebrations</em></h2>
      <GoldDivider />
      <p>Swipe through the moments that make our beginning unforgettable.</p>
    </div>

    <div className="event-slider-shell" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="event-slider-topline">
        <span className="event-slider-label"><Sparkles size={15} /> OUR SPECIAL DAYS</span>
        <span className="event-counter">0{activeEvent + 1} <i>/</i> 0{weddingData.events.length}</span>
      </div>

      <div className="event-slider-stage">
        {weddingData.events.map((event, index) => {
          const position = (index - activeEvent + weddingData.events.length) % weddingData.events.length;
          const isActive = index === activeEvent;
          return <motion.article
            key={event.id}
            className={`event-slide-card ${isActive ? "active" : ""} ${event.id}`}
            initial={false}
            animate={{
              x: position === 0 ? "0%" : position === 1 ? "78%" : "-78%",
              scale: isActive ? 1 : 0.84,
              opacity: isActive ? 1 : 0.38,
              rotateY: isActive ? 0 : position === 1 ? -12 : 12,
              zIndex: isActive ? 3 : 1
            }}
            transition={{ type: "spring", stiffness: 160, damping: 22 }}
            aria-hidden={!isActive}
          >
            <div className="event-slide-glow" />
            <div className="event-slide-content">
              <div className="event-slide-icon">{event.icon}</div>
              <p className="event-number">CELEBRATION 0{index + 1}</p>
              <h3>{event.title}</h3>
              <p className="event-slide-note">{event.note}</p>
              <div className="event-slide-rule"><span>✦</span></div>
              <div className="event-slide-detail"><CalendarDays size={17} /><span>{event.date}</span></div>
              <div className="event-slide-detail"><Clock size={17} /><span>{event.time}</span></div>
              <div className="event-slide-detail"><MapPin size={17} /><span>{event.venue}</span></div>
              <a
                className="event-map-cta"
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open Google Maps for ${event.title} at ${event.venue}`}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <Navigation size={16} /> Open in Google Maps <span>↗</span>
              </a>
            </div>
            <div className="event-slide-bottom">SHEIKH AKIF <span>&</span> RAISA FAREEN</div>
          </motion.article>;
        })}
      </div>

      <div className="event-slider-controls">
        <button className="event-arrow" onClick={showPrevious} aria-label="Previous event">←</button>
        <div className="event-dots" role="tablist" aria-label="Choose wedding event">
          {weddingData.events.map((event, index) => <button key={event.id} className={`event-dot ${index === activeEvent ? "selected" : ""}`} onClick={() => setActiveEvent(index)} aria-label={`Show ${event.title}`} aria-selected={index === activeEvent} />)}
        </div>
        <button className="event-arrow" onClick={showNext} aria-label="Next event">→</button>
      </div>
      <p className="event-swipe-hint"><span>←</span> Swipe or use arrows to explore <span>→</span></p>
    </div>
  </section>;
}


function GuestTools() {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText("Mayuree Palace, Garapur, Kendrapara, Odisha");
      setCopied(true); window.setTimeout(() => setCopied(false), 2200);
    } catch { window.prompt("Copy venue address:", "Mayuree Palace, Garapur, Kendrapara, Odisha"); }
  };
  const shareInvite = async () => {
    const shareData = { title: "Sheikh Akif & Raisa Fareen — Wedding Invitation", text: "Join us to celebrate the wedding of Sheikh Akif & Raisa Fareen, 14–16 December 2026.", url: window.location.href };
    try { if (navigator.share) await navigator.share(shareData); else { await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`); setShared(true); window.setTimeout(() => setShared(false), 2200); } }
    catch (error) { if (error?.name !== "AbortError") { try { await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`); setShared(true); window.setTimeout(() => setShared(false), 2200); } catch {} } }
  };
  const addCalendar = () => {
    const events = [
      ["Haldi Ceremony", "20261214", "20261215", "Residency", "https://maps.app.goo.gl/Wn6P7XpYpKWhhgEw8?g_st=aw"],
      ["Barat & Nikah", "20261215", "20261216", "Mayuree Palace, Garapur, Kendrapara", "https://maps.app.goo.gl/yZE3mc4TZZqcAJc56?g_st=aw"],
      ["Reception / Walima", "20261216", "20261217", "The Palace, Garapur, Kendrapara", "https://maps.app.goo.gl/ZtWcTu4xXAq8yp9F8?g_st=aw"]
    ];
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Akif and Raisa//Wedding Invitation//EN", "CALSCALE:GREGORIAN", ...events.flatMap(([title,start,end,venue,url]) => ["BEGIN:VEVENT", `UID:${title.replace(/[^a-z]/gi, "")}-${start}@akif-raisa`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`, `DTSTART;VALUE=DATE:${start}`, `DTEND;VALUE=DATE:${end}`, `SUMMARY:${title} — Akif & Raisa`, `LOCATION:${venue}`, `DESCRIPTION:${url}`, "END:VEVENT"]), "END:VCALENDAR"].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "akif-raisa-wedding-events.ics"; a.click(); URL.revokeObjectURL(url);
  };
  return <section className="guest-tools-section section-pad" id="guest-info"><div className="section-heading"><p className="eyebrow">FOR OUR BELOVED GUESTS</p><h2>Celebrate With <em>Ease</em></h2><GoldDivider /><p>Keep the important details close and share our invitation with family and friends.</p></div><div className="guest-tools-grid"><button onClick={shareInvite} className="guest-tool-card"><span className="guest-tool-icon"><Share2 /></span><strong>{shared ? "Invitation copied" : "Share invitation"}</strong><small>Send our celebration to someone special</small></button><button onClick={copyAddress} className="guest-tool-card"><span className="guest-tool-icon">{copied ? <Check /> : <Copy />}</span><strong>{copied ? "Address copied" : "Copy Nikah venue"}</strong><small>Mayuree Palace, Garapur, Kendrapara</small></button><button onClick={addCalendar} className="guest-tool-card"><span className="guest-tool-icon"><CalendarPlus /></span><strong>Add dates to calendar</strong><small>Save all three celebrations to your calendar</small></button></div></section>;
}

function Story() {
  return <section className="section-pad story-section" id="story">
    <div className="section-heading"><p className="eyebrow">A JOURNEY OF TWO HEARTS</p><h2>Our Love <em>Story</em></h2><GoldDivider /><p>A decade of memories, leading to forever.</p></div>
    <div className="story-feature">
      <motion.div className="story-photo-wrap" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <img src={weddingData.couple.couplePhoto} alt="Akif and Raisa together" className="story-photo" />
        <span className="photo-caption">The beginning of forever</span>
      </motion.div>
      <div className="story-copy"><Quote size={32} className="quote-icon" /><p>{weddingData.couple.story}</p><div className="years"><strong>{weddingData.couple.yearsTogether}</strong><span>years of love<br />and friendship</span></div></div>
    </div>
    <div className="timeline">{weddingData.couple.timeline.map((item, i) => <motion.div className={`timeline-item ${i % 2 ? "right" : "left"}`} key={item.year} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="timeline-dot"><Heart size={13} fill="currentColor" /></div><div className="timeline-card"><span className="timeline-year">{item.year}</span><h3>{item.title}</h3><p>{item.description}</p>{item.image && <img src={item.image} alt={`${item.title} memory`} loading="lazy" />}</div>
    </motion.div>)}</div>
  </section>;
}

function Family() {
  const groups = [
    { title: "Groom's Family", name: weddingData.groom.name, address: weddingData.groom.address, people: [weddingData.groom.family.father, weddingData.groom.family.mother, ...weddingData.groom.family.brothers] },
    { title: "Bride's Family", name: weddingData.bride.name, address: weddingData.bride.address, people: [weddingData.bride.family.father, weddingData.bride.family.mother] }
  ];
  return <section className="section-pad family-section" id="families">
    <div className="section-heading"><p className="eyebrow">WITH LOVE & BLESSINGS</p><h2>Two Families, <em>One Union</em></h2><GoldDivider /><p>With gratitude to the families who shaped our journey.</p></div>
    <div className="family-grid">{groups.map(group => <article className="family-card" key={group.title}><div className="family-icon"><Users size={22} /></div><p className="eyebrow">{group.title}</p><h3>{group.name}</h3><p className="family-address"><MapPin size={15} />{group.address} • {group.title.startsWith("Groom") ? weddingData.groom.pin : weddingData.bride.pin}</p><div className="family-list">{group.people.map(person => <div className="family-person" key={person.name}><span>{person.name}</span><small>{person.relation}</small></div>)}</div></article>)}</div>
  </section>;
}

function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const images = [
    { src: weddingData.couple.groomPhoto, alt: "Akif outdoors", label: "A moment of calm" },
    { src: weddingData.couple.couplePhoto, alt: "Akif and Raisa together", label: "Together" },
    { src: weddingData.couple.bridePhoto, alt: "Raisa in bridal attire", label: "Grace & beauty" },
    { src: weddingData.couple.timeline[1].image, alt: "A cherished memory", label: "A cherished memory" }
  ];
  return <section className="section-pad gallery-section" id="gallery"><div className="section-heading"><p className="eyebrow">LITTLE MOMENTS, BIG MEMORIES</p><h2>Our <em>Memories</em></h2><GoldDivider /><p>Every photograph holds a piece of our story.</p></div><div className="gallery-grid">{images.map((img, i) => <motion.figure key={img.label} className={`gallery-item gallery-item-${i + 1}`} whileHover={{ y: -5 }}><button className="gallery-open" onClick={() => setLightboxIndex(i)} aria-label={`Open photo: ${img.label}`}><img src={img.src} alt={img.alt} loading="lazy" /><span className="gallery-zoom">View memory ↗</span></button><figcaption>{img.label}</figcaption></motion.figure>)}</div>
    <AnimatePresence>{lightboxIndex >= 0 && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Photo gallery" onClick={() => setLightboxIndex(-1)}><button className="lightbox-close" onClick={() => setLightboxIndex(-1)} aria-label="Close gallery"><X /></button><button className="lightbox-arrow lightbox-prev" onClick={e => {e.stopPropagation();setLightboxIndex(i => (i - 1 + images.length) % images.length)}} aria-label="Previous photo"><ChevronLeft /></button><motion.img key={lightboxIndex} src={images[lightboxIndex].src} alt={images[lightboxIndex].alt} initial={{ scale: .96, opacity: .6 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()} /><button className="lightbox-arrow lightbox-next" onClick={e => {e.stopPropagation();setLightboxIndex(i => (i + 1) % images.length)}} aria-label="Next photo"><ChevronRight /></button><p>{images[lightboxIndex].label}</p></motion.div>}</AnimatePresence></section>;
}

function Footer() {
  return <footer className="footer"><div className="footer-ornament">✦</div><p className="arabic" dir="rtl">بارك الله لكما وبارك عليكما وجمع بينكما في خير</p><h2>Akif <span>&</span> Raisa</h2><p>May Allah bless this union with love, mercy and happiness.</p><GoldDivider /><p className="footer-date">14 – 16 DECEMBER 2026 • KENDRAPARA, ODISHA</p><p className="copyright">Made with <Heart size={13} fill="currentColor" /> and love for the happy couple</p><div className="designer-credit"><span>Website designed by <strong>Shahbaz Khan</strong></span><a href="https://www.instagram.com/khan_shahbaz__7/?hl=en" target="_blank" rel="noreferrer" aria-label="Follow Shahbaz Khan on Instagram" title="Instagram — Shahbaz Khan"><Instagram size={17} /><span>@khan_shahbaz__7</span></a></div></footer>;
}


// Shared browser-generated ambient soundtrack. Browsers require a user gesture for audible playback,
// so it starts when the visitor presses "Open Invitation".
let weddingAudioContext = null;
let weddingAudioMaster = null;
let weddingAudioNodes = [];
let weddingAudioLfo = null;
let weddingMusicPlaying = false;
let weddingMelodyTimer = null;

function playWeddingNote(frequency, duration = 1.8, volume = 0.05) {
  if (!weddingAudioContext || !weddingAudioMaster) return;
  const now = weddingAudioContext.currentTime;
  const osc = weddingAudioContext.createOscillator();
  const gain = weddingAudioContext.createGain();
  const filter = weddingAudioContext.createBiquadFilter();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(frequency, now);
  filter.type = "lowpass";
  filter.frequency.value = 1800;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(weddingAudioMaster);
  osc.start(now);
  osc.stop(now + duration + 0.05);
  weddingAudioNodes.push(osc);
}

function startWeddingMusic() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return false;
    if (!weddingAudioContext) {
      weddingAudioContext = new AudioContextClass();
      weddingAudioMaster = weddingAudioContext.createGain();
      weddingAudioMaster.gain.value = 0.0001;
      weddingAudioMaster.connect(weddingAudioContext.destination);

      // Soft drone inspired by Indian romantic instrumental arrangements.
      [130.81, 196.00, 261.63].forEach((frequency, index) => {
        const osc = weddingAudioContext.createOscillator();
        const voiceGain = weddingAudioContext.createGain();
        osc.type = index === 0 ? "sine" : "triangle";
        osc.frequency.value = frequency;
        voiceGain.gain.value = index === 0 ? 0.10 : 0.035;
        osc.connect(voiceGain);
        voiceGain.connect(weddingAudioMaster);
        osc.start();
        weddingAudioNodes.push(osc);
      });
      weddingAudioMaster.gain.setValueAtTime(0.0001, weddingAudioContext.currentTime);
    }
    weddingAudioContext.resume();
    weddingAudioMaster.gain.cancelScheduledValues(weddingAudioContext.currentTime);
    weddingAudioMaster.gain.setTargetAtTime(0.55, weddingAudioContext.currentTime, 1.1);

    if (!weddingMusicPlaying) {
      // Original short melodic phrase; no commercial Bollywood recording is bundled.
      const melody = [
        [392.00, 0.00], [440.00, 0.55], [493.88, 1.10], [440.00, 1.75],
        [392.00, 2.35], [329.63, 3.05], [349.23, 3.70], [392.00, 4.35],
        [440.00, 5.10], [392.00, 5.80], [349.23, 6.50], [329.63, 7.25],
        [293.66, 8.00], [329.63, 8.70], [392.00, 9.40], [349.23, 10.10]
      ];
      const playPhrase = () => {
        if (!weddingMusicPlaying) return;
        melody.forEach(([frequency, offset], index) => {
          window.setTimeout(() => {
            if (weddingMusicPlaying) playWeddingNote(frequency, index % 4 === 0 ? 1.25 : 0.9, 0.055);
          }, offset * 1000);
        });
      };
      weddingMusicPlaying = true;
      playPhrase();
      weddingMelodyTimer = window.setInterval(playPhrase, 11200);
    }
    weddingMusicPlaying = true;
    window.dispatchEvent(new CustomEvent("wedding-music-state", { detail: true }));
    return true;
  } catch (error) {
    console.warn("Ambient audio is unavailable in this browser.", error);
    return false;
  }
}

function pauseWeddingMusic() {
  if (weddingMelodyTimer) { window.clearInterval(weddingMelodyTimer); weddingMelodyTimer = null; }
  if (weddingAudioContext && weddingMusicPlaying) {
    weddingAudioMaster.gain.cancelScheduledValues(weddingAudioContext.currentTime);
    weddingAudioMaster.gain.setTargetAtTime(0.0001, weddingAudioContext.currentTime, 0.25);
    weddingMusicPlaying = false;
    window.dispatchEvent(new CustomEvent("wedding-music-state", { detail: false }));
  }
}

function MusicControl() {
  const [playing, setPlaying] = useState(weddingMusicPlaying);
  useEffect(() => {
    const onMusicState = (event) => setPlaying(Boolean(event.detail));
    window.addEventListener("wedding-music-state", onMusicState);
    return () => window.removeEventListener("wedding-music-state", onMusicState);
  }, []);

  const toggleMusic = () => {
    if (weddingMusicPlaying) {
      pauseWeddingMusic();
      setPlaying(false);
    } else {
      const started = startWeddingMusic();
      setPlaying(started);
    }
  };

  return <button className={`music-toggle ${playing ? "is-playing" : ""}`} onClick={toggleMusic} aria-label={playing ? "Pause ambient music" : "Play ambient music"} title={playing ? "Pause ambient music" : "Play ambient music"}>
    {playing ? <Volume2 size={18} /> : <Music2 size={18} />}
    <span>{playing ? "Music on" : "Play music"}</span>{playing && <i className="music-wave" aria-hidden="true"><b></b><b></b><b></b><b></b></i>}
  </button>;
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return visible ? <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUp size={18} /></button> : null;
}

export default function App() {
  const [opened, setOpened] = useState(false);
  return <AnimatePresence mode="wait">{!opened ? <InvitationOpening key="opening" onOpen={() => setOpened(true)} /> : <motion.div key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><nav className="site-nav"><a href="#home" className="nav-brand">A <span>&</span> R</a><div><a href="#events">Events</a><a href="#story">Our Story</a><a href="#gallery">Gallery</a><a href="#families">Families</a><a href="#guest-info">Guest Info</a></div></nav><MusicControl /><BackToTop /><Hero /><section className="countdown-section"><p className="eyebrow">COUNTING DOWN TO FOREVER</p><Countdown /></section><Events /><GuestTools /><Story /><Gallery /><Family /><section className="closing-quote"><Flower2 size={28} /><p>“And We created you in pairs.”</p><span>— Qur'an 78:8</span><PartyPopper size={20} /></section><section className="thank-you-section"><div className="thank-you-arch"><span>❧</span><p className="eyebrow">UNTIL WE CELEBRATE TOGETHER</p><h2>With love, <em>Akif & Raisa</em></h2><GoldDivider /><p>Thank you for being a part of our story. Your presence, prayers, and blessings mean the world to us.</p><span className="thank-you-signoff">Insha’Allah, see you there</span></div></section><Footer /></motion.div>}</AnimatePresence>;
}