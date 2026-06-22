'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ─── Tokens ──────────────────────────────────────────────────────────────────
const C = {
  primary: '#1A1556',
  secondary: '#5C597C',
  accent: '#998426',
  white: '#FEFEFE',
  lightGray: '#D4D1CE',
  border: '#ACA697',
  textSecondary: '#6F6B66',
  navyTint: '#2A276F',
  navyDark: '#0F0C3A',
  goldTint: '#C2AD4A',
  success: '#3D7A4A',
  successLight: '#EAF4EC',
  danger: '#C0392B',
  dangerLight: '#FDECEA',
  info: '#2C6FAC',
  infoLight: '#E8F1F9',
  purple: '#7B5EA7',
  purpleLight: '#F0EBF8',
  bg: '#FEFEFE',
};

// ─── Scroll reveal ───────────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Window Width ─────────────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(1200);
  useEffect(() => {
    setWidth(window.innerWidth);
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const CATEGORIES = ['All', 'Academic', 'Cultural', 'Sports', 'Community', 'Achievement'];

const EVENTS = [
  {
    id: 1,
    title: 'SASL Storytelling Festival',
    category: 'Cultural',
    date: '2025-03-08',
    displayDate: '8 March 2025',
    time: '10:00 – 17:00',
    location: 'Main Auditorium',
    color: C.purple,
    colorLight: C.purpleLight,
    emoji: '🎭',
    tag: 'Upcoming',
    tagColor: C.success,
    description: 'An immersive afternoon of Deaf storytelling, visual vernacular performances, and SASL poetry. Open to students, families, and the broader Deaf community. Captioning provided throughout.',
    highlights: ['Live SASL performances', 'Open mic for students', 'Community art exhibition', 'Cultural food stalls'],
    rsvp: true,
  },
  {
    id: 2,
    title: 'Inter-Faculty Deaf Sports Day',
    category: 'Sports',
    date: '2025-03-22',
    displayDate: '22 March 2025',
    time: '08:00 – 16:00',
    location: 'Sports Grounds & Gymnasium',
    color: C.primary,
    colorLight: '#EEF0FF',
    emoji: '🏆',
    tag: 'Upcoming',
    tagColor: C.success,
    description: 'Annual inter-faculty sports competition across football, netball, athletics, and chess. All events are conducted with visual signals and SASL commentary. Prizes awarded at the closing ceremony.',
    highlights: ['5 sport codes', 'Faculty point scoring', 'Guest Deaflympian speaker', 'Medal ceremony'],
    rsvp: true,
  },
  {
    id: 3,
    title: 'Tech & Innovation Expo',
    category: 'Academic',
    date: '2025-04-05',
    displayDate: '5 April 2025',
    time: '09:00 – 15:00',
    location: 'Technology Faculty Building',
    color: C.accent,
    colorLight: '#FFF8E1',
    emoji: '💡',
    tag: 'Upcoming',
    tagColor: C.success,
    description: 'Final-year Software Development and UI/UX students present their capstone projects. Employers, NGOs, and industry partners are invited to discover Deaf tech talent.',
    highlights: ['12 graduate project showcases', 'Industry networking session', 'Live demos & prototypes', 'Best Project Award'],
    rsvp: true,
  },
  {
    id: 4,
    title: 'Heritage Month Celebration',
    category: 'Cultural',
    date: '2025-09-24',
    displayDate: '24 September 2025',
    time: '11:00 – 19:00',
    location: 'Campus Quad & Amphitheatre',
    color: C.accent,
    colorLight: '#FFF8E1',
    emoji: '🇿🇦',
    tag: 'Planned',
    tagColor: C.textSecondary,
    description: "Celebrating South Africa's 11 official languages and the rich heritage of the Deaf community. Traditional food, dance, music, and a special Deaf Heritage exhibition curated by students.",
    highlights: ['SASL heritage exhibition', 'Traditional food market', 'Cultural fashion show', 'Guest speakers from Deaf history'],
    rsvp: false,
  },
  {
    id: 5,
    title: 'Graduate Employment Fair',
    category: 'Academic',
    date: '2025-05-15',
    displayDate: '15 May 2025',
    time: '09:00 – 14:00',
    location: 'Conference Centre',
    color: C.success,
    colorLight: C.successLight,
    emoji: '💼',
    tag: 'Upcoming',
    tagColor: C.success,
    description: 'Connect final-year and recent graduate students with employers committed to Deaf inclusion. Partnered companies include tech firms, NGOs, government departments, and creative agencies.',
    highlights: ['30+ employers attending', 'CV clinic with SASL support', 'On-the-spot interviews', 'SASL interpreters provided'],
    rsvp: true,
  },
  {
    id: 6,
    title: 'National Deaf Technical And Vocational Annual Graduation',
    category: 'Academic',
    date: '2025-06-28',
    displayDate: '28 June 2025',
    time: '10:00 – 13:00',
    location: 'Grand Hall · Johannesburg Convention Centre',
    color: C.primary,
    colorLight: '#EEF0FF',
    emoji: '🎓',
    tag: 'Upcoming',
    tagColor: C.success,
    description: 'The highlight of the academic calendar — celebrating the achievements of graduating students across all four faculties. Conducted fully in SASL with written ceremony programme.',
    highlights: ['SASL-led ceremony', 'Live captioning', 'Family-friendly with visual alerts', 'Reception & photography after'],
    rsvp: true,
  },
  {
    id: 7,
    title: 'Mental Health Awareness Week',
    category: 'Community',
    date: '2025-10-06',
    displayDate: '6–10 October 2025',
    time: 'Various times',
    location: 'Counselling Centre & Lawns',
    color: C.purple,
    colorLight: C.purpleLight,
    emoji: '🧠',
    tag: 'Planned',
    tagColor: C.textSecondary,
    description: 'A week of workshops, open conversations, and creative activities focused on mental wellness in the Deaf community. All sessions SASL-led by Deaf-positive mental health practitioners.',
    highlights: ['Daily wellness workshops', 'Peer support group sessions', 'Art therapy drop-ins', 'SASL mindfulness classes'],
    rsvp: false,
  },
  {
    id: 8,
    title: 'Deaflympics Qualifier Send-Off',
    category: 'Sports',
    date: '2025-02-14',
    displayDate: '14 February 2025',
    time: '15:00 – 18:00',
    location: 'Sports Grounds',
    color: C.primary,
    colorLight: '#EEF0FF',
    emoji: '🏅',
    tag: 'Past',
    tagColor: '#aaa',
    description: 'National Deaf Technical And Vocational Academy hosted a send-off event for three of its students selected to represent South Africa at the International Deaflympics qualifiers. A proud moment for the entire campus community.',
    highlights: ['3 students selected nationally', 'Track & football squads', 'Live SASL broadcast on campus screens', 'Community celebration braai'],
    rsvp: false,
  },
];

const ACHIEVEMENTS = [
  {
    year: '2024',
    icon: '🏆',
    color: C.accent,
    title: 'National Deaf Sports Champions',
    desc: 'Our football team won the National Deaf League for the second consecutive year, defeating 14 other institutions.',
  },
  {
    year: '2024',
    icon: '🎓',
    color: C.success,
    title: '100% Pass Rate — Software Development',
    desc: "The Class of 2024 achieved a 100% pass rate in the National Diploma: Software Development — a first in the Academy's history.",
  },
  {
    year: '2023',
    icon: '🌍',
    color: C.primary,
    title: 'Deaflympics Representation',
    desc: 'Three NDTVA students represented South Africa at the International Deaflympics Qualifiers, with one placing in the top 5.',
  },
  {
    year: '2024',
    icon: '🤟',
    color: C.purple,
    title: 'SASL Interpreter of the Year',
    desc: 'NDTVA graduate Nomsa Dlamini won the SLIASA Interpreter of the Year Award for her work in the legal sector.',
  },
  {
    year: '2023',
    icon: '💼',
    color: C.info,
    title: '95% Graduate Employment Rate',
    desc: 'For the third consecutive year, over 95% of our graduates entered the workforce or further study within 6 months of graduating.',
  },
  {
    year: '2024',
    icon: '🎨',
    color: C.info,
    title: 'Best Visual Arts Exhibition — Gauteng',
    desc: 'The Creative Arts Faculty won the Gauteng Provincial Best Inclusive Exhibition Award for their "Hands That Speak" gallery show.',
  },
];

// ─── NavBar ──────────────────────────────────────────────────────────────────
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const width = useWindowWidth();
  const isMobile = width < 900;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Faculties', href: '/faculties' },
    { label: 'Campus Life', href: '/events' },
    { label: 'Code of Conduct', href: '/code-of-conduct' },
    { label: 'Contact', href: '/contact' },
    { label: 'Login', href: '/login' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled || menuOpen ? 'rgba(15,12,58,0.98)' : 'rgba(28,15,5,0.82)',
      backdropFilter: 'blur(12px)', transition: 'background 0.4s ease',
    }}>
      {/* Main bar */}
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 72, padding: '0 1.5rem',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"DM Sans", sans-serif', fontWeight: 900, color: '#fff', fontSize: 18,
          }}>SA</div>
          <div>
            <div style={{
              fontFamily: '"DM Sans", sans-serif', color: '#fff', fontWeight: 700,
              fontSize: isMobile ? 13 : 15, lineHeight: 1.2,
            }}>
              {isMobile ? 'NDTVA' : 'National Deaf Technical And Vocational Academy'}
            </div>
            <div style={{ color: C.accent, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              South Africa
            </div>
          </div>
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {links.map(l => (
              <Link
                key={l.label}
                href={l.href}
                style={{
                  color: l.label === 'Campus Life' ? C.accent : 'rgba(255,255,255,0.78)',
                  textDecoration: 'none', fontSize: 13.5, letterSpacing: '0.04em',
                  fontFamily: '"DM Sans", sans-serif', fontWeight: 500, transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = C.accent)}
                onMouseLeave={e =>
                  (e.currentTarget.style.color = l.label === 'Campus Life' ? C.accent : 'rgba(255,255,255,0.78)')}
              >{l.label}</Link>
            ))}
            <a href="#apply" style={{
              background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
              color: '#fff', padding: '9px 22px', borderRadius: 8,
              fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 13,
              textDecoration: 'none', letterSpacing: '0.04em',
              boxShadow: `0 4px 20px rgba(240,165,0,0.35)`,
            }}>Apply Now</a>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {menuOpen ? (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M20 6L6 20M6 6l14 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M4 13h18M4 7h18M4 19h18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Mobile drawer */}
      {isMobile && menuOpen && (
        <div style={{
          background: 'rgba(15,12,58,0.99)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '8px 1.5rem 32px',
          display: 'flex', flexDirection: 'column',
          maxHeight: 'calc(100vh - 72px)', overflowY: 'auto',
        }}>
          {links.map(l => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: l.label === 'Campus Life' ? C.accent : 'rgba(255,255,255,0.88)',
                textDecoration: 'none', fontSize: 16,
                fontFamily: '"DM Sans", sans-serif', fontWeight: 500,
                padding: '14px 0',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}
            >
              {l.label}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5 8h6M9 6l2 2-2 2" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
          <a
            href="#apply"
            onClick={() => setMenuOpen(false)}
            style={{
              background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
              color: '#fff', padding: '14px 24px', borderRadius: 10,
              fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 15,
              textDecoration: 'none', textAlign: 'center', marginTop: 20,
              display: 'block', boxShadow: `0 4px 20px rgba(240,165,0,0.3)`,
            }}
          >Apply Now</a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const upcoming = EVENTS.filter(e => e.tag === 'Upcoming').length;

  return (
    <section style={{
      background: C.navyDark,
      padding: isMobile ? '100px 1.25rem 0' : isTablet ? '120px 1.5rem 0' : '140px 2rem 0',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* dot grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `radial-gradient(circle, ${C.info} 1px, transparent 1px)`,
        backgroundSize: '36px 36px',
      }} />
      {/* glow blobs */}
      <div style={{ position: 'absolute', top: '-15%', right: '15%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${C.purple}25 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: '5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${C.primary}22 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* breadcrumb */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: isMobile ? 24 : 32,
          opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease',
        }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: '"DM Sans", sans-serif', textDecoration: 'none' }}>Home</a>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>›</span>
          <span style={{ color: C.info, fontSize: 13, fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>Events & Campus Life</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile || isTablet ? '1fr' : '1fr 1fr',
          gap: isMobile ? 36 : 80,
          alignItems: 'end',
          paddingBottom: isMobile ? 60 : 100,
        }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(240,165,0,0.1)', border: '1px solid rgba(240,165,0,0.25)',
              borderRadius: 100, padding: '6px 18px', marginBottom: 20,
              opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(12px)',
              transition: 'opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.success, display: 'inline-block', boxShadow: `0 0 8px ${C.success}` }} />
              <span style={{ color: C.accent, fontSize: 12, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                {upcoming} Upcoming Events
              </span>
            </div>

            <h1 style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: isMobile ? '2.6rem' : 'clamp(2.8rem, 5vw, 5rem)',
              fontWeight: 900, color: '#fff', lineHeight: 1.0, margin: '0 0 20px',
              opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}>
              Campus<br />
              <span style={{ color: C.accent, fontStyle: 'italic' }}>Events</span> &<br />
              Achievements
            </h1>

            <p style={{
              color: 'rgba(255,255,255,0.58)', fontSize: isMobile ? 15 : 17, lineHeight: 1.8,
              fontFamily: '"DM Sans", sans-serif', maxWidth: 500, margin: '0 0 32px',
              opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s',
            }}>
              From Deaflympic send-offs to graduation ceremonies — life at NDTVA is vibrant, visual, and community-driven.
            </p>

            <div style={{
              display: 'flex', gap: 12,
              flexDirection: isMobile ? 'column' : 'row',
              opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease 0.28s',
            }}>
              <a href="#events" style={{
                background: `linear-gradient(135deg, ${C.info}, ${C.accent})`,
                color: '#fff', padding: '13px 28px', borderRadius: 10,
                fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14,
                textDecoration: 'none', boxShadow: `0 6px 24px rgba(240,165,0,0.35)`,
                textAlign: 'center',
              }}>Browse Events</a>
              <a href="#achievements" style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', padding: '13px 28px', borderRadius: 10,
                fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 14,
                textDecoration: 'none', textAlign: 'center',
              }}>Our Achievements 🏆</a>
            </div>
          </div>

          {/* Featured event card — always shown; stacks below on mobile */}
          <FeaturedEventCard event={EVENTS[0]} loaded={loaded} isMobile={isMobile} />
        </div>
      </div>

      {/* wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
          <path d="M0 60L1440 60L1440 20C1100 65 800 0 500 30C300 50 150 60 0 30L0 60Z" fill={C.white} />
        </svg>
      </div>
    </section>
  );
}

function FeaturedEventCard({ event, loaded, isMobile }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24,
      padding: isMobile ? '24px 20px' : '32px', position: 'relative', overflow: 'hidden',
      opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(24px)',
      transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${event.color}, ${C.info})` }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <span style={{
          background: `${C.success}22`, color: C.success,
          fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 800,
          letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 100,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.success, display: 'inline-block', boxShadow: `0 0 6px ${C.success}` }} />
          Featured · Upcoming
        </span>
        <span style={{ fontSize: 36 }}>{event.emoji}</span>
      </div>

      <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: isMobile ? 20 : 26, fontWeight: 900, color: '#fff', margin: '0 0 10px', lineHeight: 1.15 }}>
        {event.title}
      </h3>
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.7, marginBottom: 20 }}>
        {event.description.slice(0, 120)}…
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {[['📅', event.displayDate], ['🕐', event.time], ['📍', event.location]].map(([icon, val]) => (
          <div key={val} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{icon}</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13.5, fontFamily: '"DM Sans", sans-serif' }}>{val}</span>
          </div>
        ))}
      </div>

      <a href="#events" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: `linear-gradient(135deg, ${event.color}, ${event.color}bb)`,
        color: '#fff', padding: '11px 24px', borderRadius: 10,
        fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14,
        textDecoration: 'none', boxShadow: `0 4px 18px ${event.color}55`,
      }}>RSVP Now →</a>
    </div>
  );
}

// ─── Category Filter Strip ────────────────────────────────────────────────────
function FilterStrip({ active, onChange, counts }) {
  return (
    <div style={{
      position: 'sticky', top: 72, zIndex: 80,
      background: 'rgba(253,243,227,0.97)', backdropFilter: 'blur(12px)',
      borderBottom: '2px solid rgba(28,15,5,0.07)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', gap: 4, alignItems: 'center',
        overflowX: 'auto', padding: '12px 1.25rem',
        scrollbarWidth: 'none', msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}>
        {CATEGORIES.map(cat => {
          const isActive = active === cat;
          const count = counts[cat] ?? 0;
          return (
            <button key={cat} onClick={() => onChange(cat)} style={{
              padding: '8px 16px', borderRadius: 100, border: 'none', cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif', fontWeight: isActive ? 700 : 500,
              fontSize: 13, whiteSpace: 'nowrap',
              background: isActive ? C.navyDark : 'transparent',
              color: isActive ? '#fff' : C.textSecondary,
              transition: 'background 0.2s, color 0.2s',
              display: 'flex', alignItems: 'center', gap: 6,
              flexShrink: 0,
            }}>
              {cat}
              <span style={{
                background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(28,15,5,0.08)',
                color: isActive ? '#fff' : C.textSecondary,
                fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 100,
                transition: 'background 0.2s, color 0.2s',
              }}>{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Event Card ───────────────────────────────────────────────────────────────
function EventCard({ event, index }) {
  const [expanded, setExpanded] = useState(false);
  const [ref, visible] = useReveal();
  const width = useWindowWidth();
  const isMobile = width < 600;

  const isPast = event.tag === 'Past';

  return (
    <div ref={ref} style={{
      background: '#fff', borderRadius: 20, overflow: 'hidden',
      boxShadow: expanded ? '0 16px 60px rgba(28,15,5,0.13)' : '0 4px 24px rgba(28,15,5,0.07)',
      border: `1px solid ${expanded ? event.color + '45' : 'rgba(28,15,5,0.07)'}`,
      opacity: isPast ? (visible ? 0.75 : 0) : (visible ? 1 : 0),
      transform: visible ? 'none' : 'translateY(28px)',
      transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s, box-shadow 0.3s ease, border-color 0.3s ease`,
      filter: isPast ? 'grayscale(0.2)' : 'none',
    }}>
      <div style={{ height: 4, background: isPast ? '#ccc' : `linear-gradient(90deg, ${event.color}, ${event.color}88)` }} />

      <div style={{ padding: isMobile ? '18px 16px' : '24px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flex: 1, minWidth: 0 }}>
            {/* emoji badge */}
            <div style={{
              width: isMobile ? 48 : 56, height: isMobile ? 48 : 56,
              borderRadius: 14, flexShrink: 0,
              background: isPast ? '#f0f0f0' : event.colorLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: isMobile ? 24 : 28,
            }}>{event.emoji}</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                <span style={{
                  background: isPast ? '#eee' : event.colorLight,
                  color: isPast ? '#999' : event.color,
                  fontSize: 10, fontFamily: '"DM Sans", sans-serif', fontWeight: 800,
                  letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100,
                }}>{event.category}</span>
                <span style={{
                  background: isPast ? '#eee' : `${event.tagColor}18`,
                  color: isPast ? '#aaa' : event.tagColor,
                  fontSize: 10, fontFamily: '"DM Sans", sans-serif', fontWeight: 800,
                  letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100,
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  {event.tag !== 'Past' && <span style={{ width: 5, height: 5, borderRadius: '50%', background: event.tagColor, display: 'inline-block' }} />}
                  {event.tag}
                </span>
              </div>
              <h3 style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: isMobile ? 16 : 20,
                fontWeight: 900, color: C.navyDark, margin: '0 0 10px', lineHeight: 1.25,
              }}>
                {event.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[['📅', event.displayDate], ['🕐', event.time], ['📍', event.location]].map(([icon, val]) => (
                  <span key={val} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 5,
                    color: C.textSecondary, fontSize: 12.5, fontFamily: '"DM Sans", sans-serif',
                  }}>
                    <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                    <span>{val}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* expand toggle */}
          <button onClick={() => setExpanded(o => !o)} style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: expanded ? event.color : `${event.color}18`,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.25s, transform 0.3s',
            transform: expanded ? 'rotate(180deg)' : 'none',
          }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 4.5L6.5 9L11 4.5" stroke={expanded ? '#fff' : event.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {!expanded && (
          <p style={{ color: C.textSecondary, fontSize: 13.5, lineHeight: 1.7, fontFamily: '"DM Sans", sans-serif', margin: 0 }}>
            {event.description.slice(0, 110)}…
          </p>
        )}

        {expanded && (
          <div style={{ animation: 'slideDown 0.3s ease', borderTop: '1px solid rgba(28,15,5,0.07)', paddingTop: 18, marginTop: 4 }}>
            <p style={{ color: C.textSecondary, fontSize: 14, lineHeight: 1.8, fontFamily: '"DM Sans", sans-serif', marginBottom: 20 }}>
              {event.description}
            </p>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: event.color, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>
                ✨ Event Highlights
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {event.highlights.map(h => (
                  <div key={h} style={{
                    background: event.colorLight, borderRadius: 10, padding: '8px 14px',
                    display: 'flex', alignItems: 'center', gap: 7,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: event.color, flexShrink: 0 }} />
                    <span style={{ color: C.navyDark, fontSize: 13, fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {event.rsvp && !isPast && (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href="#" style={{
                  background: `linear-gradient(135deg, ${event.color}, ${event.color}cc)`,
                  color: '#fff', padding: '10px 22px', borderRadius: 10,
                  fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 13.5,
                  textDecoration: 'none', boxShadow: `0 5px 20px ${event.color}44`,
                }}>RSVP Now</a>
                <a href="#" style={{
                  background: 'transparent', border: `1.5px solid ${event.color}55`,
                  color: event.color, padding: '10px 22px', borderRadius: 10,
                  fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 13.5, textDecoration: 'none',
                }}>Add to Calendar</a>
              </div>
            )}
            {isPast && (
              <div style={{
                background: '#f5f5f5', borderRadius: 10, padding: '12px 16px',
                color: '#999', fontSize: 13.5, fontFamily: '"DM Sans", sans-serif',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span>🗓️</span> This event has already taken place.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Events Grid ──────────────────────────────────────────────────────────────
function EventsGrid() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [ref, visible] = useReveal();
  const width = useWindowWidth();
  const isMobile = width < 768;

  const filtered = activeFilter === 'All' ? EVENTS : EVENTS.filter(e => e.category === activeFilter);

  const counts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === 'All' ? EVENTS.length : EVENTS.filter(e => e.category === cat).length;
    return acc;
  }, {});

  return (
    <>
      <FilterStrip active={activeFilter} onChange={setActiveFilter} counts={counts} />

      <section id="events" style={{ background: C.white, padding: isMobile ? '40px 1.25rem 80px' : '60px 2rem 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div ref={ref} style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: 32, gap: 16, flexWrap: 'wrap',
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            <div>
              <span style={{ color: C.primary, fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                {activeFilter === 'All' ? 'All Events' : activeFilter}
              </span>
              <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: isMobile ? '1.8rem' : 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, color: C.navyDark, margin: '8px 0 0' }}>
                {filtered.length} {filtered.length === 1 ? 'Event' : 'Events'} Found
              </h2>
            </div>
            {!isMobile && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>Legend:</span>
                {[['Upcoming', C.success], ['Planned', C.textSecondary], ['Past', '#aaa']].map(([l, col]) => (
                  <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: col, display: 'inline-block' }} />{l}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? 16 : 20,
          }}>
            {filtered.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontSize: 16 }}>
              No events in this category yet. Check back soon!
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ─── Achievements ─────────────────────────────────────────────────────────────
function Achievements() {
  const [ref, visible] = useReveal();
  const width = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width < 1024;

  return (
    <section id="achievements" style={{
      background: C.navyDark,
      padding: isMobile ? '72px 1.25rem' : '100px 2rem',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: `radial-gradient(circle, ${C.info} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div style={{ position: 'absolute', right: '-5%', top: '10%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${C.info}15, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div ref={ref} style={{
          textAlign: 'center', marginBottom: isMobile ? 40 : 64,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <span style={{ color: C.info, fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            Pride of NDTVA
          </span>
          <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: isMobile ? '2rem' : 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 900, color: '#fff', margin: '12px 0 16px' }}>
            Our Achievements
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, fontFamily: '"DM Sans", sans-serif', maxWidth: 540, margin: '0 auto', lineHeight: 1.75 }}>
            A testament to the talent, resilience, and drive of our students, graduates, and faculty.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: isMobile ? 16 : 24,
        }}>
          {ACHIEVEMENTS.map((ach, i) => (
            <AchievementCard key={i} ach={ach} index={i} />
          ))}
        </div>

        {/* Stats strip */}
        <div ref={ref} style={{
          marginTop: isMobile ? 48 : 64,
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? 24 : 48,
          opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.3s',
        }}>
          {[['🏆', '8', 'Awards Won'], ['🎓', '1 200+', 'Graduates'], ['🤟', '3', 'Deaflympians'], ['🌍', '95%', 'Employment Rate']].map(([icon, n, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: isMobile ? '16px 8px' : 0 }}>
              <div style={{ fontSize: isMobile ? 26 : 32, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: isMobile ? 28 : 36, fontWeight: 900, color: C.accent }}>{n}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementCard({ ach, index }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 20, padding: '28px 24px',
      borderTop: `3px solid ${ach.color}`,
      opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
      transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      cursor: 'default',
    }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = ''; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ fontSize: 36 }}>{ach.icon}</div>
        <span style={{
          background: `${ach.color}22`, color: ach.color,
          fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 800,
          letterSpacing: '0.1em', padding: '4px 12px', borderRadius: 100,
        }}>{ach.year}</span>
      </div>
      <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 17, fontWeight: 800, color: '#fff', margin: '0 0 10px', lineHeight: 1.25 }}>{ach.title}</h3>
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13.5, lineHeight: 1.75, fontFamily: '"DM Sans", sans-serif', margin: 0 }}>{ach.desc}</p>
    </div>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
function Newsletter() {
  const [ref, visible] = useReveal();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const width = useWindowWidth();
  const isMobile = width < 600;

  return (
    <section ref={ref} style={{ background: C.white, padding: isMobile ? '60px 1.25rem' : '80px 2rem' }}>
      <div style={{
        maxWidth: 720, margin: '0 auto', textAlign: 'center',
        opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        <span style={{ fontSize: 40 }}>📬</span>
        <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: isMobile ? '1.8rem' : 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, color: C.navyDark, margin: '16px 0 12px' }}>
          Never Miss an Event
        </h2>
        <p style={{ color: C.textSecondary, fontSize: 15, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.75, marginBottom: 32 }}>
          Subscribe to the NDTVA campus bulletin. We'll send you event announcements, RSVP reminders, and achievement highlights — no spam, ever.
        </p>

        {!submitted ? (
          <div style={{
            display: 'flex', gap: 12,
            maxWidth: 480, margin: '0 auto',
            flexDirection: isMobile ? 'column' : 'row',
          }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                flex: 1, padding: '13px 18px', borderRadius: 10,
                border: '1.5px solid rgba(28,15,5,0.15)', outline: 'none',
                fontFamily: '"DM Sans", sans-serif', fontSize: 15, color: C.navyDark,
                background: '#fff', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = C.info}
              onBlur={e => e.target.style.borderColor = 'rgba(28,15,5,0.15)'}
            />
            <button onClick={() => email && setSubmitted(true)} style={{
              background: `linear-gradient(135deg, ${C.info}, ${C.primary})`,
              color: '#fff', padding: '13px 28px', borderRadius: 10,
              fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14,
              border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              boxShadow: `0 6px 24px rgba(240,165,0,0.35)`,
              width: isMobile ? '100%' : 'auto',
            }}>Subscribe →</button>
          </div>
        ) : (
          <div style={{
            background: C.successLight, border: `1px solid ${C.success}30`,
            borderRadius: 14, padding: '20px 28px', display: 'inline-flex',
            alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 28 }}>🤟</span>
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 15, fontWeight: 700, color: C.success }}>
              You're subscribed! Welcome to the community.
            </span>
          </div>
        )}

        <p style={{ color: C.textSecondary, fontSize: 12, fontFamily: '"DM Sans", sans-serif', marginTop: 16, opacity: 0.7 }}>
          You can also follow us on social media for live SASL updates and behind-the-scenes campus content.
        </p>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const width = useWindowWidth();
  const isMobile = width < 640;

  return (
    <footer style={{
      background: C.navyDark, borderTop: '1px solid rgba(255,255,255,0.06)',
      color: 'rgba(255,255,255,0.45)', padding: isMobile ? '28px 1.25rem' : '36px 2rem',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'center' : 'center',
        textAlign: isMobile ? 'center' : 'left',
        gap: isMobile ? 8 : 16,
      }}>
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 12.5 }}>
          © 2025 National Deaf Technical And Vocational Academy · All Rights Reserved
        </span>
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 12.5 }}>
          Events calendar updated monthly.{' '}
          {isMobile ? <br /> : null}
          Contact events@NDTAV.ac.za for enquiries.
        </span>
      </div>
    </footer>
  );
}

// ─── Page Root ───────────────────────────────────────────────────────────────
export default function CampusEventsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.white}; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        button:focus-visible { outline: 2px solid ${C.info}; outline-offset: 2px; }
        a:focus-visible { outline: 2px solid ${C.info}; outline-offset: 2px; }
        /* Hide scrollbar on filter strip */
        div::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
      <NavBar />
      <Hero />
      <EventsGrid />
      <Achievements />
      <Newsletter />
      <Footer />
    </>
  );
}