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
};;

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
    colorLight: '#FDF0EA',
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
    colorLight: C.accentLight,
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
    description: 'Celebrating South Africa\'s 11 official languages and the rich heritage of the Deaf community. Traditional food, dance, music, and a special Deaf Heritage exhibition curated by students.',
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
    title: 'National Deaf Technincal And Vocational Annual Graduation',
    category: 'Academic',
    date: '2025-06-28',
    displayDate: '28 June 2025',
    time: '10:00 – 13:00',
    location: 'Grand Hall · Johannesburg Convention Centre',
    color: C.primary,
    colorLight: '#FDF0EA',
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
    colorLight: '#FDF0EA',
    emoji: '🏅',
    tag: 'Past',
    tagColor: '#aaa',
    description: 'National Deaf Technincal And Vocational Academy hosted a send-off event for three of its students selected to represent South Africa at the International Deaflympics qualifiers. A proud moment for the entire campus community.',
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
    desc: 'The Class of 2024 achieved a 100% pass rate in the National Diploma: Software Development — a first in the Academy\'s history.',
  },
  {
    year: '2023',
    icon: '🌍',
    color: C.primary,
    title: 'Deaflympics Representation',
    desc: 'Three National Deaf Technincal And Vocational students represented South Africa at the International Deaflympics Qualifiers, with one placing in the top 5.',
  },
  {
    year: '2024',
    icon: '🤟',
    color: C.purple,
    title: 'SASL Interpreter of the Year',
    desc: 'National Deaf Technincal And Vocational graduate Nomsa Dlamini won the SLIASA Interpreter of the Year Award for her work in the legal sector.',
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
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
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
      background: scrolled ? 'rgba(28,15,5,0.96)' : 'rgba(28,15,5,0.82)',
      backdropFilter: 'blur(12px)', transition: 'background 0.4s ease', padding: '0 2rem',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"DM Sans", sans-serif', fontWeight: 900, color: '#fff', fontSize: 20,
          }}>SA</div>
          <div>
            <div style={{ fontFamily: '"DM Sans", sans-serif', color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.1 }}>National Deaf Technincal And Vocational Academy</div>
            <div style={{ color: C.accent, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>South Africa</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {links.map(l => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                color: l.label === 'Campus Life' ? C.accent: 'rgba(255,255,255,0.78)',
                textDecoration: 'none',
                fontSize: 13.5,
                letterSpacing: '0.04em',
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = C.accent)}
              onMouseLeave={e =>
                (e.currentTarget.style.color =
                  l.label === 'Campus Life' ? C.accent: 'rgba(255,255,255,0.78)')
              }
            >
              {l.label}
            </Link>
          ))}

          <a href="#apply" style={{
            background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
            color: '#fff',
            padding: '9px 22px',
            borderRadius: 8,
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: 13,
            textDecoration: 'none',
            letterSpacing: '0.04em',
            boxShadow: `0 4px 20px rgba(240,165,0,0.35)`,
          }}>
            Apply Now
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const upcoming = EVENTS.filter(e => e.tag === 'Upcoming').length;

  return (
    <section style={{ background: C.navyDark, padding: '140px 2rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* animated dot grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `radial-gradient(circle, ${C.info} 1px, transparent 1px)`,
        backgroundSize: '36px 36px',
      }} />
      {/* glow blobs */}
      <div style={{ position: 'absolute', top: '-15%', right: '15%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${C.purple}25 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '0', left: '5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${C.primary}22 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: '"DM Sans", sans-serif', textDecoration: 'none' }}>Home</a>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>›</span>
          <span style={{ color: C.info, fontSize: 13, fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>Events & Campus Life</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end', paddingBottom: 100 }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(240,165,0,0.1)', border: '1px solid rgba(240,165,0,0.25)',
              borderRadius: 100, padding: '6px 18px', marginBottom: 24,
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
              fontSize: 'clamp(2.8rem, 5vw, 5rem)',
              fontWeight: 900, color: '#fff', lineHeight: 1.0, margin: '0 0 24px',
              opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}>
              Campus<br />
              <span style={{ color: C.accent, fontStyle: 'italic' }}>Events</span> &<br />
              Achievements
            </h1>

            <p style={{
              color: 'rgba(255,255,255,0.58)', fontSize: 17, lineHeight: 1.8,
              fontFamily: '"DM Sans", sans-serif', maxWidth: 500, margin: '0 0 36px',
              opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s',
            }}>
              From Deaflympic send-offs to graduation ceremonies — life at National Deaf Technincal And Vocational Academy is vibrant, visual, and community-driven. Explore what's on and what we've accomplished.
            </p>

            <div style={{ display: 'flex', gap: 12, opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease 0.28s' }}>
              <a href="#events" style={{
                background: `linear-gradient(135deg, ${C.info}, ${C.accent})`,
                color: '#fff', padding: '12px 28px', borderRadius: 10,
                fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14,
                textDecoration: 'none', boxShadow: `0 6px 24px rgba(240,165,0,0.35)`,
              }}>Browse Events</a>
              <a href="#achievements" style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', padding: '12px 28px', borderRadius: 10,
                fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 14, textDecoration: 'none',
              }}>Our Achievements 🏆</a>
            </div>
          </div>

          {/* Featured upcoming event card */}
          <FeaturedEventCard event={EVENTS[0]} loaded={loaded} />
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

function FeaturedEventCard({ event, loaded }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24,
      padding: '32px', position: 'relative', overflow: 'hidden',
      opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(24px)',
      transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, ${event.color}, ${C.info})`,
      }} />
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
        <span style={{ fontSize: 40 }}>{event.emoji}</span>
      </div>

      <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 26, fontWeight: 900, color: '#fff', margin: '0 0 12px', lineHeight: 1.15 }}>
        {event.title}
      </h3>
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.7, marginBottom: 24 }}>
        {event.description.slice(0, 120)}…
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {[
          ['📅', event.displayDate],
          ['🕐', event.time],
          ['📍', event.location],
        ].map(([icon, val]) => (
          <div key={val} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontFamily: '"DM Sans", sans-serif' }}>{val}</span>
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
      borderBottom: '2px solid rgba(28,15,5,0.07)', padding: '0 2rem',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 4, alignItems: 'center', overflowX: 'auto', padding: '14px 0' }}>
        {CATEGORIES.map(cat => {
          const isActive = active === cat;
          const count = counts[cat] ?? 0;
          return (
            <button key={cat} onClick={() => onChange(cat)} style={{
              padding: '8px 18px', borderRadius: 100, border: 'none', cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif', fontWeight: isActive ? 700 : 500,
              fontSize: 13.5, whiteSpace: 'nowrap',
              background: isActive ? C.navyDark : 'transparent',
              color: isActive ? '#fff' : C.textSecondary,
              transition: 'background 0.2s, color 0.2s',
              display: 'flex', alignItems: 'center', gap: 6,
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

  const isPast = event.tag === 'Past';

  return (
    <div ref={ref} style={{
      background: '#fff', borderRadius: 22, overflow: 'hidden',
      boxShadow: expanded ? '0 16px 60px rgba(28,15,5,0.13)' : '0 4px 24px rgba(28,15,5,0.07)',
      border: `1px solid ${expanded ? event.color + '45' : 'rgba(28,15,5,0.07)'}`,
      opacity: isPast ? (visible ? 0.75 : 0) : (visible ? 1 : 0),
      transform: visible ? 'none' : 'translateY(28px)',
      transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s, box-shadow 0.3s ease, border-color 0.3s ease`,
      filter: isPast ? 'grayscale(0.2)' : 'none',
    }}>
      {/* colour bar */}
      <div style={{ height: 4, background: isPast ? '#ccc' : `linear-gradient(90deg, ${event.color}, ${event.color}88)` }} />

      <div style={{ padding: '24px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flex: 1 }}>
            {/* emoji badge */}
            <div style={{
              width: 56, height: 56, borderRadius: 16, flexShrink: 0,
              background: isPast ? '#f0f0f0' : event.colorLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
            }}>{event.emoji}</div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <span style={{
                  background: isPast ? '#eee' : event.colorLight,
                  color: isPast ? '#999' : event.color,
                  fontSize: 10, fontFamily: '"DM Sans", sans-serif', fontWeight: 800,
                  letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 12px', borderRadius: 100,
                }}>{event.category}</span>
                <span style={{
                  background: isPast ? '#eee' : `${event.tagColor}18`,
                  color: isPast ? '#aaa' : event.tagColor,
                  fontSize: 10, fontFamily: '"DM Sans", sans-serif', fontWeight: 800,
                  letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 12px', borderRadius: 100,
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  {event.tag !== 'Past' && <span style={{ width: 5, height: 5, borderRadius: '50%', background: event.tagColor, display: 'inline-block' }} />}
                  {event.tag}
                </span>
              </div>
              <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 20, fontWeight: 900, color: C.navyDark, margin: '0 0 10px', lineHeight: 1.2 }}>
                {event.title}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                {[['📅', event.displayDate], ['🕐', event.time], ['📍', event.location]].map(([icon, val]) => (
                  <span key={val} style={{ display: 'flex', alignItems: 'center', gap: 5, color: C.textSecondary, fontSize: 13, fontFamily: '"DM Sans", sans-serif' }}>
                    <span style={{ fontSize: 14 }}>{icon}</span>{val}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* expand toggle */}
          <button onClick={() => setExpanded(o => !o)} style={{
            width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
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

        {/* Collapsed preview */}
        {!expanded && (
          <p style={{ color: C.textSecondary, fontSize: 14, lineHeight: 1.75, fontFamily: '"DM Sans", sans-serif', margin: 0 }}>
            {event.description.slice(0, 110)}…
          </p>
        )}

        {/* Expanded content */}
        {expanded && (
          <div style={{ animation: 'slideDown 0.3s ease', borderTop: '1px solid rgba(28,15,5,0.07)', paddingTop: 20, marginTop: 4 }}>
            <p style={{ color: C.textSecondary, fontSize: 15, lineHeight: 1.8, fontFamily: '"DM Sans", sans-serif', marginBottom: 24 }}>
              {event.description}
            </p>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: event.color, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
                ✨ Event Highlights
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {event.highlights.map(h => (
                  <div key={h} style={{
                    background: event.colorLight, borderRadius: 10, padding: '10px 16px',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: event.color, flexShrink: 0 }} />
                    <span style={{ color: C.navyDark, fontSize: 13.5, fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {event.rsvp && !isPast && (
              <div style={{ display: 'flex', gap: 12 }}>
                <a href="#" style={{
                  background: `linear-gradient(135deg, ${event.color}, ${event.color}cc)`,
                  color: '#fff', padding: '11px 24px', borderRadius: 10,
                  fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14,
                  textDecoration: 'none', boxShadow: `0 5px 20px ${event.color}44`,
                  transition: 'transform 0.2s',
                }}
                  onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.target.style.transform = ''}
                >RSVP Now</a>
                <a href="#" style={{
                  background: 'transparent', border: `1.5px solid ${event.color}55`,
                  color: event.color, padding: '11px 24px', borderRadius: 10,
                  fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 14, textDecoration: 'none',
                }}>Add to Calendar</a>
              </div>
            )}
            {isPast && (
              <div style={{
                background: '#f5f5f5', borderRadius: 10, padding: '12px 18px',
                color: '#999', fontSize: 14, fontFamily: '"DM Sans", sans-serif',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span>🗓️</span> This event has already taken place. Check out our achievements below.
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

  const filtered = activeFilter === 'All' ? EVENTS : EVENTS.filter(e => e.category === activeFilter);

  const counts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === 'All' ? EVENTS.length : EVENTS.filter(e => e.category === cat).length;
    return acc;
  }, {});

  return (
    <>
      <FilterStrip active={activeFilter} onChange={setActiveFilter} counts={counts} />

      <section id="events" style={{ background: C.white, padding: '60px 2rem 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div ref={ref} style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: 40, gap: 20, flexWrap: 'wrap',
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            <div>
              <span style={{ color: C.primary, fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                {activeFilter === 'All' ? 'All Events' : activeFilter}
              </span>
              <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, color: C.navyDark, margin: '8px 0 0' }}>
                {filtered.length} {filtered.length === 1 ? 'Event' : 'Events'} Found
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>Legend:</span>
              {[['Upcoming', C.success], ['Planned', C.textSecondary], ['Past', '#aaa']].map(([l, col]) => (
                <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: col, display: 'inline-block' }} />{l}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
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

// ─── Achievements Section ─────────────────────────────────────────────────────
function Achievements() {
  const [ref, visible] = useReveal();

  return (
    <section id="achievements" style={{ background: C.navyDark, padding: '100px 2rem', position: 'relative', overflow: 'hidden' }}>
      {/* bg dots */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: `radial-gradient(circle, ${C.info} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div style={{ position: 'absolute', right: '-5%', top: '10%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${C.info}15, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div ref={ref} style={{
          textAlign: 'center', marginBottom: 64,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <span style={{ color: C.info, fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            Pride of National Deaf Technincal And Vocational
          </span>
          <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 900, color: '#fff', margin: '12px 0 16px' }}>
            Our Achievements
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, fontFamily: '"DM Sans", sans-serif', maxWidth: 540, margin: '0 auto', lineHeight: 1.75 }}>
            A testament to the talent, resilience, and drive of our students, graduates, and faculty.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {ACHIEVEMENTS.map((ach, i) => (
            <AchievementCard key={i} ach={ach} index={i} />
          ))}
        </div>

        {/* Bottom trophy strip */}
        <div ref={ref} style={{
          marginTop: 64, display: 'flex', justifyContent: 'center',
          gap: 48, flexWrap: 'wrap',
          opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.3s',
        }}>
          {[['🏆', '8', 'Awards Won'], ['🎓', '1 200+', 'Graduates'], ['🤟', '3', 'Deaflympians'], ['🌍', '95%', 'Employment Rate']].map(([icon, n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 36, fontWeight: 900, color: C.accent}}>{n}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{l}</div>
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
      borderRadius: 20, padding: '32px 28px',
      borderTop: `3px solid ${ach.color}`,
      opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
      transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      cursor: 'default',
    }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = ''; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ fontSize: 40 }}>{ach.icon}</div>
        <span style={{
          background: `${ach.color}22`, color: ach.color,
          fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 800,
          letterSpacing: '0.1em', padding: '4px 14px', borderRadius: 100,
        }}>{ach.year}</span>
      </div>
      <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 0 12px', lineHeight: 1.25 }}>{ach.title}</h3>
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.75, fontFamily: '"DM Sans", sans-serif', margin: 0 }}>{ach.desc}</p>
    </div>
  );
}

// ─── Newsletter / Stay Updated ────────────────────────────────────────────────
function Newsletter() {
  const [ref, visible] = useReveal();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section ref={ref} style={{ background: C.white, padding: '80px 2rem' }}>
      <div style={{
        maxWidth: 720, margin: '0 auto', textAlign: 'center',
        opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        <span style={{ fontSize: 40 }}>📬</span>
        <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, color: C.navyDark, margin: '16px 0 12px' }}>
          Never Miss an Event
        </h2>
        <p style={{ color: C.textSecondary, fontSize: 16, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.75, marginBottom: 36 }}>
          Subscribe to the National Deaf Technincal And Vocational campus bulletin. We'll send you event announcements, RSVP reminders, and achievement highlights — no spam, ever.
        </p>

        {!submitted ? (
          <div style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                flex: 1, minWidth: 200, padding: '13px 18px', borderRadius: 10,
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
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.target.style.transform = ''}
            >Subscribe →</button>
          </div>
        ) : (
          <div style={{
            background: C.successLight, border: `1px solid ${C.success}30`,
            borderRadius: 14, padding: '20px 32px', display: 'inline-flex',
            alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 28 }}>🤟</span>
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 16, fontWeight: 700, color: C.success }}>
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
  return (
    <footer style={{ background: C.navyDark, borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)', padding: '36px 2rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 13 }}>© 2025 National Deaf Technincal And Vocational Academy · All Rights Reserved</span>
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 13 }}>Events calendar updated monthly. Contact events@NDTAV.ac.za for enquiries.</span>
      </div>
    </footer>
  );
}

// ─── Page Root ───────────────────────────────────────────────────────────────
export default function CampusEventsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700;1,9..144,900&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.white}; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        button:focus-visible { outline: 2px solid ${C.info}; outline-offset: 2px; }
        a:focus-visible { outline: 2px solid ${C.info}; outline-offset: 2px; }
        @media (max-width: 900px) {
          .events-grid { grid-template-columns: 1fr !important; }
          .achievements-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .achievements-grid { grid-template-columns: 1fr !important; }
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
