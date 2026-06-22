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

  // Additional colours referenced in section data
  green: '#3D7A4A',
  greenLight: '#EAF4EC',
  red: '#C0392B',
  redLight: '#FDECEA',
  rust: '#B5451B',

  bg: '#FEFEFE',
};

// ─── Scroll reveal ───────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
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
const SECTIONS = [
  {
    id: 'preamble',
    icon: '📜',
    label: 'Preamble',
    title: 'Our Shared Commitment',
    color: C.accent,
    intro: 'National Deaf Technical And Vocational Academy is a community built on Ubuntu — the belief that we are because of one another. This Code of Conduct defines the standards of behaviour, respect, and responsibility expected of every member of our community: students, staff, visitors, and partners alike.',
    items: [],
    isFull: true,
    fullContent: `
      This Code applies on campus, during off-campus activities representing the Academy, in all digital spaces including the student portal, email, and social media, and during any interaction — signed, written, or otherwise — between members of our community.

      Every student who enrols at National Deaf Technical And Vocational Academy agrees to uphold this Code. Ignorance of its contents is not a valid defence. We encourage every member to read this document carefully, ask questions, and raise concerns through the appropriate channels.

      Our Deaf-centred culture means we especially honour South African Sign Language (SASL) as a full, legitimate language. Any act that demeans, mocks, or suppresses signed communication will be treated as a serious violation.
    `,
  },
  {
    id: 'values',
    icon: '🌿',
    label: 'Core Values',
    title: 'The Values We Live By',
    color: C.green,
    intro: 'Every rule in this Code flows from these foundational values. When in doubt, ask yourself: does this action honour these principles?',
    items: [
      { title: 'Ubuntu', desc: 'I am because we are. We recognise our humanity through our relationships with others. No student or staff member is an island.' },
      { title: 'Respect', desc: 'Every person — regardless of age, gender, hearing status, disability, language, race, or religion — deserves dignity and courtesy at all times.' },
      { title: 'Integrity', desc: 'We act honestly and transparently. We do not cheat, plagiarise, deceive, or misrepresent ourselves or our work.' },
      { title: 'Inclusion', desc: 'NDTVA exists to break barriers. We actively create environments where every person can participate fully and without shame.' },
      { title: 'Accountability', desc: 'We own our actions and their consequences. We do not shift blame or minimise harm we have caused.' },
      { title: 'Excellence', desc: 'We pursue our best in academics, sport, and character. Mediocrity is not our standard — growth always is.' },
    ],
  },
  {
    id: 'rights',
    icon: '⚖️',
    label: 'Rights & Responsibilities',
    title: 'Your Rights & Responsibilities',
    color: C.primary,
    intro: 'Membership in this community comes with both protections and obligations. Rights without responsibility lead to harm; responsibility without rights is oppression.',
    items: [
      { title: 'Right to Safe Learning', desc: 'Every student has the right to learn in an environment free from harassment, intimidation, discrimination, or abuse of any kind.', isRight: true },
      { title: 'Right to SASL Communication', desc: 'Every Deaf or hard-of-hearing student has the right to communicate in SASL in all academic and social settings without restriction.', isRight: true },
      { title: 'Right to Fair Process', desc: 'Any student facing disciplinary proceedings has the right to be heard, to know the charges against them, and to appeal a decision.', isRight: true },
      { title: 'Responsibility to Attend', desc: 'Students must attend at least 80% of scheduled classes. Unexplained absences affect your academic record and classmates who depend on group work.' },
      { title: 'Responsibility to Academic Honesty', desc: 'All submitted work must be your own. Plagiarism, contract cheating, and unauthorised collaboration are serious violations.' },
      { title: 'Responsibility to Report', desc: 'If you witness harassment, abuse, or a safety threat, you have a moral and community responsibility to report it to the appropriate authority.' },
    ],
  },
  {
    id: 'rules',
    icon: '📋',
    label: 'Campus Rules',
    title: 'Campus Rules & Standards',
    color: C.accent,
    intro: 'These rules govern day-to-day life at National Deaf Technical And Vocational Academy. They exist to ensure a productive, safe, and respectful environment for everyone.',
    groups: [
      {
        heading: 'Academic Conduct',
        icon: '📚',
        rules: [
          'Submit all assignments by the stated deadline. Late submissions without prior approval receive a 10% deduction per day.',
          'Use of generative AI tools in assessed work must be disclosed to your lecturer in advance.',
          'Plagiarism detection software is used on all written submissions. A confirmed first offence results in zero for the submission.',
          'Devices used in class must be for academic purposes only unless the lecturer specifies otherwise.',
          'Examination venues are silent except for signed communication between a student and an approved SASL invigilator.',
        ],
      },
      {
        heading: 'Respect & Inclusion',
        icon: '🤝',
        rules: [
          'Mocking, mimicking, or deliberately misrepresenting SASL is a serious act of cultural disrespect and will be treated as a hate incident.',
          'Discriminatory language, gestures, or behaviour based on disability, race, gender, sexual orientation, or religion will not be tolerated.',
          'Do not photograph or record another person — in sign language conversation or otherwise — without explicit consent.',
          'Hearing students must not speak over or interrupt Deaf students during interpreted sessions.',
          'All campus notices, digital communications, and events must be accessible: visual alerts, captioning, and/or SASL interpretation where applicable.',
        ],
      },
      {
        heading: 'Campus Safety',
        icon: '🛡️',
        rules: [
          'Alcohol is prohibited in all academic buildings and residences during the week (Monday–Thursday).',
          'Illegal substances are prohibited at all times, on and off campus during official Academy activities.',
          'Violence, threats of violence, or possession of weapons on campus result in immediate suspension pending investigation.',
          'Visitors must register at the security gate. Students are responsible for the conduct of their guests.',
          'Emergency evacuation routes must remain unobstructed at all times. Visual fire alarms are installed throughout campus.',
        ],
      },
      {
        heading: 'Digital & Social Media',
        icon: '💻',
        rules: [
          "The Academy's name, logo, or reputation must not be brought into disrepute through personal social media activity.",
          'Sharing private or identifying information about another student or staff member online without consent is a privacy violation.',
          'Cyberbullying — including harassment, defamation, or hate directed at community members online — is treated the same as in-person misconduct.',
          'Student portal credentials are personal and must not be shared. Report suspected unauthorised access immediately.',
        ],
      },
    ],
  },
  {
    id: 'penalties',
    icon: '⚠️',
    label: 'Penalties',
    title: 'Violations & Penalties',
    color: C.red,
    intro: 'National Deaf Technical And Vocational Academy applies a fair, proportionate, and consistent disciplinary process. The severity of the penalty corresponds to the nature and repetition of the offence.',
    tiers: [
      {
        level: 'Level 1',
        label: 'Minor Violations',
        color: C.accent,
        bg: '#FFF8E1',
        examples: ['Late submission (first occurrence)', 'Dress code non-compliance', 'Disrupting class', 'Unauthorised device use'],
        penalties: ['Verbal or written warning', 'Compulsory meeting with Student Affairs officer', 'Academic penalty (mark deduction)'],
      },
      {
        level: 'Level 2',
        label: 'Moderate Violations',
        color: C.primary,
        bg: '#EEF0FF',
        examples: ['Repeated Level 1 offences', 'Unauthorised absence exceeding 20%', 'Academic dishonesty (first offence)', 'Disrespectful conduct toward staff or peers'],
        penalties: ['Formal written warning', 'Community service (8–20 hours)', 'Suspension from specific classes or activities', 'Mandatory counselling or training'],
      },
      {
        level: 'Level 3',
        label: 'Serious Violations',
        color: C.rust,
        bg: '#FDECEA',
        examples: ['Plagiarism or contract cheating (confirmed)', 'Bullying or harassment (first confirmed)', 'SASL mocking or hate-based conduct', 'Possession of alcohol in prohibited areas'],
        penalties: ['Disciplinary hearing (within 10 working days)', 'Suspension of 1–4 weeks', 'Zero for affected module or assessment', 'Conditions placed on continued enrolment'],
      },
      {
        level: 'Level 4',
        label: 'Gross Misconduct',
        color: '#7B0000',
        bg: '#F9E8E8',
        examples: ['Violence or assault on campus', 'Sexual harassment or assault', 'Illegal substance dealing', 'Fraud or impersonation', 'Repeated Level 3 offences'],
        penalties: ['Immediate suspension pending formal hearing', 'Possible permanent expulsion', 'Referral to SAPS where applicable', 'Academic record notation'],
      },
    ],
  },
  {
    id: 'process',
    icon: '🔍',
    label: 'Reporting Process',
    title: 'How to Report a Concern',
    color: C.green,
    intro: 'We are committed to a safe, accessible reporting process. Reports can be made in SASL via video, in writing, or in person. All reports are treated with confidentiality and seriousness.',
    steps: [
      { num: '01', title: 'Report the Incident', desc: 'Speak to your Student Affairs officer, lodge a written report via the student portal, or book a confidential SASL video meeting. Anonymous reporting is also available via the campus suggestion box or online form.' },
      { num: '02', title: 'Acknowledgement', desc: 'You will receive a written acknowledgement of your report within 2 working days. A reference number is assigned. You are entitled to request a SASL interpreter for all subsequent meetings.' },
      { num: '03', title: 'Investigation', desc: 'A neutral investigator reviews evidence, interviews witnesses, and compiles a report. Both the complainant and the respondent have the right to submit statements and request representation.' },
      { num: '04', title: 'Hearing & Decision', desc: 'For Level 3 and 4 matters, a formal Disciplinary Committee hearing is held. The outcome — including any penalty — is communicated in writing and SASL video format within 5 working days of the hearing.' },
      { num: '05', title: 'Appeal', desc: 'Any party may appeal the decision within 10 working days of the outcome. Appeals are reviewed by the Office of the Rector. The decision of the appeal is final.' },
    ],
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

  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

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
            <div style={{ fontFamily: '"DM Sans", sans-serif', color: '#fff', fontWeight: 700, fontSize: isMobile ? 13 : 15, lineHeight: 1.2 }}>
              {isMobile ? 'NDTVA' : 'National Deaf Technical And Vocational Academy'}
            </div>
            <div style={{ color: C.accent, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>South Africa</div>
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
                  color: l.label === 'Code of Conduct' ? C.accent : 'rgba(255,255,255,0.78)',
                  textDecoration: 'none', fontSize: 13.5, letterSpacing: '0.04em',
                  fontFamily: '"DM Sans", sans-serif', fontWeight: 500, transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = C.accent)}
                onMouseLeave={e =>
                  (e.currentTarget.style.color = l.label === 'Code of Conduct' ? C.accent : 'rgba(255,255,255,0.78)')}
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
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', alignItems: 'center' }}
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
                color: l.label === 'Code of Conduct' ? C.accent : 'rgba(255,255,255,0.88)',
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

  return (
    <section style={{
      background: C.navyDark,
      padding: isMobile ? '100px 1.25rem 0' : isTablet ? '120px 1.5rem 0' : '140px 2rem 0',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `radial-gradient(circle, ${C.accent} 1px, transparent 1px)`,
        backgroundSize: '36px 36px',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', left: '5%', width: 700, height: 700,
        borderRadius: '50%', background: `radial-gradient(circle, ${C.primary}20 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* breadcrumb */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: isMobile ? 24 : 32,
          opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease',
        }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: '"DM Sans", sans-serif', textDecoration: 'none' }}>Home</a>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>›</span>
          <span style={{ color: C.accent, fontSize: 13, fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>Code of Conduct</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile || isTablet ? '1fr' : '1.1fr 0.9fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'end',
          paddingBottom: isMobile ? 60 : 80,
        }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(240,165,0,0.1)', border: '1px solid rgba(240,165,0,0.25)',
              borderRadius: 100, padding: '6px 18px', marginBottom: 20,
              opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(12px)',
              transition: 'opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s',
            }}>
              <span style={{ fontSize: 16 }}>⚖️</span>
              <span style={{ color: C.accent, fontSize: 12, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                Ethics & Conduct
              </span>
            </div>

            <h1 style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: isMobile ? '2.6rem' : 'clamp(2.8rem, 5vw, 5rem)',
              fontWeight: 900, color: '#fff', lineHeight: 1.0, margin: '0 0 20px',
              opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}>
              Code of<br />
              <span style={{ color: C.accent, fontStyle: 'italic' }}>Conduct</span> &<br />
              Ethics
            </h1>

            <p style={{
              color: 'rgba(255,255,255,0.58)', fontSize: isMobile ? 15 : 17, lineHeight: 1.8,
              fontFamily: '"DM Sans", sans-serif', maxWidth: 520, margin: 0,
              opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s',
            }}>
              A living document that defines who we are as a community — our values, our expectations, our commitments, and how we hold each other accountable.
            </p>

            <div style={{
              display: 'flex', gap: 12, marginTop: 32,
              flexDirection: isMobile ? 'column' : 'row',
              opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease 0.28s',
            }}>
              <a href="#rules" style={{
                background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
                color: '#fff', padding: '13px 28px', borderRadius: 10,
                fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14,
                textDecoration: 'none', boxShadow: `0 6px 24px rgba(240,165,0,0.35)`,
                textAlign: 'center',
              }}>Read the Rules</a>
              <a href="#penalties" style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', padding: '13px 28px', borderRadius: 10,
                fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 14,
                textDecoration: 'none', textAlign: 'center',
              }}>View Penalties</a>
            </div>
          </div>

          {/* Quick fact cards */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
            opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease 0.3s',
          }}>
            {[
              { icon: '🌿', title: '6', sub: 'Core Values' },
              { icon: '📋', title: '4', sub: 'Rule Categories' },
              { icon: '⚠️', title: '4', sub: 'Penalty Tiers' },
              { icon: '🔍', title: '5', sub: 'Step Process' },
            ].map(({ icon, title, sub }) => (
              <div key={sub} style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 16, padding: isMobile ? '18px 14px' : '24px 20px',
                display: 'flex', flexDirection: 'column', gap: 4,
              }}>
                <span style={{ fontSize: isMobile ? 22 : 28 }}>{icon}</span>
                <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: isMobile ? 26 : 34, fontWeight: 900, color: C.accent }}>{title}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
          <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 15C480 30 240 60 0 30L0 60Z" fill={C.white} />
        </svg>
      </div>
    </section>
  );
}

// ─── Mobile Tab Strip ─────────────────────────────────────────────────────────
function MobileTabStrip({ active, onChange }) {
  return (
    <div style={{
      position: 'sticky', top: 72, zIndex: 80,
      background: 'rgba(254,254,254,0.97)', backdropFilter: 'blur(12px)',
      borderBottom: '2px solid rgba(28,15,5,0.07)',
    }}>
      <div style={{
        display: 'flex', gap: 4, overflowX: 'auto',
        padding: '10px 1.25rem',
        scrollbarWidth: 'none', msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}>
        {SECTIONS.map(s => {
          const isActive = active === s.id;
          return (
            <button key={s.id} onClick={() => onChange(s.id)} style={{
              padding: '8px 14px', borderRadius: 100, border: 'none', cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif', fontWeight: isActive ? 700 : 500,
              fontSize: 13, whiteSpace: 'nowrap', flexShrink: 0,
              background: isActive ? C.navyDark : 'transparent',
              color: isActive ? '#fff' : C.textSecondary,
              transition: 'background 0.2s, color 0.2s',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 15 }}>{s.icon}</span>
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Desktop Sidebar Nav ──────────────────────────────────────────────────────
function SideNav({ active, onChange }) {
  return (
    <nav style={{
      position: 'sticky', top: 96, alignSelf: 'flex-start',
      background: '#fff', borderRadius: 20, padding: '8px',
      boxShadow: '0 4px 32px rgba(28,15,5,0.08)',
      border: '1px solid rgba(28,15,5,0.06)',
    }}>
      {SECTIONS.map(s => (
        <button key={s.id} onClick={() => onChange(s.id)} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '13px 16px', borderRadius: 12, border: 'none', cursor: 'pointer',
          background: active === s.id ? `${s.color}14` : 'transparent',
          textAlign: 'left', transition: 'background 0.2s',
          borderLeft: active === s.id ? `3px solid ${s.color}` : '3px solid transparent',
          marginBottom: 2,
        }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>{s.icon}</span>
          <span style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: 14,
            fontWeight: active === s.id ? 700 : 500,
            color: active === s.id ? s.color : C.textSecondary,
            transition: 'color 0.2s',
          }}>{s.label}</span>
        </button>
      ))}
    </nav>
  );
}

// ─── Section Header (shared) ──────────────────────────────────────────────────
function SectionHeader({ section }) {
  const width = useWindowWidth();
  const isMobile = width < 600;
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: `${section.color}18`, border: `1px solid ${section.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
        }}>{section.icon}</div>
        <span style={{ color: section.color, fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{section.label}</span>
      </div>
      <h2 style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: isMobile ? '1.7rem' : 'clamp(1.8rem, 3vw, 2.6rem)',
        fontWeight: 900, color: C.navyDark, margin: 0, lineHeight: 1.1,
      }}>
        {section.title}
      </h2>
    </div>
  );
}

// ─── Section: Preamble ───────────────────────────────────────────────────────
function Preamble({ section }) {
  const [ref, visible] = useReveal();
  const width = useWindowWidth();
  const isMobile = width < 600;
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
    }}>
      <SectionHeader section={section} />
      <div style={{
        background: `linear-gradient(135deg, ${C.accent}10, ${C.primary}08)`,
        border: `1px solid ${C.accent}30`,
        borderRadius: 18, padding: isMobile ? '22px 18px' : '36px 40px',
        borderLeft: `4px solid ${C.accent}`,
        marginBottom: 24,
      }}>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: isMobile ? 16 : 20, lineHeight: 1.7, color: C.navyDark, fontStyle: 'italic', margin: 0 }}>
          "{section.intro}"
        </p>
      </div>
      {section.fullContent.trim().split('\n\n').map((para, i) => (
        <p key={i} style={{ color: C.textSecondary, fontSize: 15, lineHeight: 1.85, fontFamily: '"DM Sans", sans-serif', marginBottom: 18 }}>
          {para.trim()}
        </p>
      ))}
    </div>
  );
}

// ─── Section: Values ─────────────────────────────────────────────────────────
function Values({ section }) {
  const [ref, visible] = useReveal();
  const width = useWindowWidth();
  const isMobile = width < 640;
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
      <SectionHeader section={section} />
      <p style={{ color: C.textSecondary, fontSize: 15, lineHeight: 1.8, fontFamily: '"DM Sans", sans-serif', marginBottom: 24 }}>{section.intro}</p>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
        {section.items.map((item, i) => (
          <div key={item.title} style={{
            background: '#fff', borderRadius: 16, padding: '22px',
            boxShadow: '0 4px 20px rgba(28,15,5,0.06)',
            border: '1px solid rgba(28,15,5,0.06)',
            borderTop: `3px solid ${C.green}`,
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(28,15,5,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(28,15,5,0.06)'; }}
          >
            <div style={{
              display: 'inline-block', background: C.greenLight, color: C.green,
              fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 800,
              letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 12px', borderRadius: 100, marginBottom: 12,
            }}>Value {String(i + 1).padStart(2, '0')}</div>
            <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 19, fontWeight: 900, color: C.navyDark, margin: '0 0 8px' }}>{item.title}</h3>
            <p style={{ color: C.textSecondary, fontSize: 14, lineHeight: 1.75, fontFamily: '"DM Sans", sans-serif', margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Rights & Responsibilities ──────────────────────────────────────
function Rights({ section }) {
  const [ref, visible] = useReveal();
  const width = useWindowWidth();
  const isMobile = width < 640;
  const rights = section.items.filter(i => i.isRight);
  const resp = section.items.filter(i => !i.isRight);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
      <SectionHeader section={section} />
      <p style={{ color: C.textSecondary, fontSize: 15, lineHeight: 1.8, fontFamily: '"DM Sans", sans-serif', marginBottom: 24 }}>{section.intro}</p>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
        {/* Rights */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: C.greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>✅</div>
            <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 18, fontWeight: 800, color: C.navyDark, margin: 0 }}>Your Rights</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {rights.map(item => (
              <div key={item.title} style={{
                background: C.greenLight, borderRadius: 14, padding: '18px 18px',
                border: '1px solid rgba(61,122,74,0.15)', borderLeft: `4px solid ${C.green}`,
              }}>
                <h4 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 15, fontWeight: 800, color: C.green, margin: '0 0 6px' }}>{item.title}</h4>
                <p style={{ color: C.textSecondary, fontSize: 13.5, lineHeight: 1.7, fontFamily: '"DM Sans", sans-serif', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Responsibilities */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: C.redLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>🎯</div>
            <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 18, fontWeight: 800, color: C.navyDark, margin: 0 }}>Your Responsibilities</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {resp.map(item => (
              <div key={item.title} style={{
                background: C.redLight, borderRadius: 14, padding: '18px 18px',
                border: '1px solid rgba(192,57,43,0.12)', borderLeft: `4px solid ${C.primary}`,
              }}>
                <h4 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 15, fontWeight: 800, color: C.primary, margin: '0 0 6px' }}>{item.title}</h4>
                <p style={{ color: C.textSecondary, fontSize: 13.5, lineHeight: 1.7, fontFamily: '"DM Sans", sans-serif', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section: Campus Rules ───────────────────────────────────────────────────
function CampusRules({ section }) {
  const [openGroup, setOpenGroup] = useState(0);
  const [ref, visible] = useReveal();
  const width = useWindowWidth();
  const isMobile = width < 600;
  return (
    <div ref={ref} id="rules" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
      <SectionHeader section={section} />
      <p style={{ color: C.textSecondary, fontSize: 15, lineHeight: 1.8, fontFamily: '"DM Sans", sans-serif', marginBottom: 24 }}>{section.intro}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {section.groups.map((group, gi) => {
          const isOpen = openGroup === gi;
          return (
            <div key={group.heading} style={{
              background: '#fff', borderRadius: 18, overflow: 'hidden',
              border: `1px solid ${isOpen ? C.accent + '50' : 'rgba(28,15,5,0.08)'}`,
              boxShadow: isOpen ? '0 8px 40px rgba(28,15,5,0.1)' : '0 2px 12px rgba(28,15,5,0.05)',
              transition: 'border-color 0.3s, box-shadow 0.3s',
            }}>
              <button onClick={() => setOpenGroup(isOpen ? -1 : gi)} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: isMobile ? '16px 16px' : '22px 28px',
                background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                    background: isOpen ? `linear-gradient(135deg, ${C.accent}, ${C.primary})` : `${C.accent}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, transition: 'background 0.3s',
                  }}>{group.icon}</div>
                  <div>
                    <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: isMobile ? 15 : 19, fontWeight: 800, color: C.navyDark }}>{group.heading}</div>
                    <div style={{ color: C.textSecondary, fontSize: 12, fontFamily: '"DM Sans", sans-serif', marginTop: 2 }}>{group.rules.length} rules</div>
                  </div>
                </div>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                  background: isOpen ? C.accent : `${C.accent}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.25s, transform 0.3s',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4L6 8L10 4" stroke={isOpen ? '#fff' : C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
              {isOpen && (
                <div style={{ padding: isMobile ? '0 14px 18px' : '0 28px 28px', animation: 'slideDown 0.3s ease' }}>
                  <div style={{ height: 1, background: 'rgba(28,15,5,0.07)', marginBottom: 14 }} />
                  <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {group.rules.map((rule, ri) => (
                      <li key={ri} style={{
                        display: 'flex', gap: 12, alignItems: 'flex-start',
                        padding: '11px 0',
                        borderBottom: ri < group.rules.length - 1 ? '1px dashed rgba(28,15,5,0.08)' : 'none',
                      }}>
                        <div style={{
                          width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                          background: `${C.accent}20`, color: C.primary,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: '"DM Sans", sans-serif', fontWeight: 900, fontSize: 12, marginTop: 1,
                        }}>{ri + 1}</div>
                        <p style={{ color: C.textSecondary, fontSize: 13.5, lineHeight: 1.75, fontFamily: '"DM Sans", sans-serif', margin: 0 }}>{rule}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section: Penalties ──────────────────────────────────────────────────────
function Penalties({ section }) {
  const [ref, visible] = useReveal();
  const width = useWindowWidth();
  const isMobile = width < 640;
  return (
    <div ref={ref} id="penalties" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
      <SectionHeader section={section} />
      <p style={{ color: C.textSecondary, fontSize: 15, lineHeight: 1.8, fontFamily: '"DM Sans", sans-serif', marginBottom: 24 }}>{section.intro}</p>
      <div style={{ display: 'flex', gap: 3, borderRadius: 10, overflow: 'hidden', marginBottom: 24, height: 8 }}>
        {section.tiers.map(t => (
          <div key={t.level} style={{ flex: 1, background: t.color, opacity: 0.7 }} />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {section.tiers.map((tier, i) => (
          <div key={tier.level} style={{
            background: tier.bg, borderRadius: 18, padding: isMobile ? '18px 16px' : '28px 32px',
            border: `1px solid ${tier.color}30`, borderLeft: `5px solid ${tier.color}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <div style={{
                  background: tier.color, color: '#fff',
                  fontFamily: '"DM Sans", sans-serif', fontWeight: 800, fontSize: 11,
                  letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 100,
                }}>{tier.level}</div>
                <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: isMobile ? 17 : 22, fontWeight: 900, color: C.navyDark, margin: 0 }}>{tier.label}</h3>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {Array.from({ length: 4 }).map((_, dot) => (
                  <div key={dot} style={{ width: 10, height: 10, borderRadius: '50%', background: dot <= i ? tier.color : 'rgba(28,15,5,0.1)' }} />
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 14 : 20 }}>
              <div>
                <div style={{ fontSize: 11, color: tier.color, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Example Violations
                </div>
                {tier.examples.map(ex => (
                  <div key={ex} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 7 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: tier.color, marginTop: 7, flexShrink: 0 }} />
                    <span style={{ color: C.textSecondary, fontSize: 13.5, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.6 }}>{ex}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 11, color: tier.color, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Applicable Penalties
                </div>
                {tier.penalties.map(p => (
                  <div key={p} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 7 }}>
                    <div style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>→</div>
                    <span style={{ color: C.navyDark, fontSize: 13.5, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, lineHeight: 1.6 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Reporting Process ──────────────────────────────────────────────
function ReportingProcess({ section }) {
  const [ref, visible] = useReveal();
  const width = useWindowWidth();
  const isMobile = width < 600;
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
      <SectionHeader section={section} />
      <p style={{ color: C.textSecondary, fontSize: 15, lineHeight: 1.8, fontFamily: '"DM Sans", sans-serif', marginBottom: 32 }}>{section.intro}</p>
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 27, top: 0, bottom: 0, width: 2,
          background: `linear-gradient(to bottom, ${C.green}, ${C.accent})`,
          opacity: 0.3, borderRadius: 2,
        }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {section.steps.map((step) => (
            <div key={step.num} style={{ display: 'flex', gap: isMobile ? 14 : 28, alignItems: 'flex-start', paddingBottom: 24, position: 'relative' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
                background: `linear-gradient(135deg, ${C.green}, ${C.accent})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"DM Sans", sans-serif', fontWeight: 900, color: '#fff', fontSize: 14,
                boxShadow: `0 4px 20px rgba(61,122,74,0.35)`, position: 'relative', zIndex: 1,
              }}>{step.num}</div>
              <div style={{
                flex: 1, background: '#fff', borderRadius: 16,
                padding: isMobile ? '16px 16px' : '24px 28px',
                boxShadow: '0 4px 20px rgba(28,15,5,0.06)',
                border: '1px solid rgba(28,15,5,0.06)',
                marginTop: 4, minWidth: 0,
              }}>
                <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: isMobile ? 15 : 19, fontWeight: 800, color: C.navyDark, margin: '0 0 8px' }}>{step.title}</h3>
                <p style={{ color: C.textSecondary, fontSize: 13.5, lineHeight: 1.8, fontFamily: '"DM Sans", sans-serif', margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* emergency contact box */}
      <div style={{
        background: `linear-gradient(135deg, ${C.navyDark}, #2E1A0E)`,
        borderRadius: 20, padding: isMobile ? '22px 18px' : '32px 36px', marginTop: 12,
        border: `1px solid rgba(240,165,0,0.2)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span style={{ fontSize: 26 }}>🆘</span>
          <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: isMobile ? 17 : 22, fontWeight: 900, color: '#fff', margin: 0 }}>Urgent / Emergency Reports</h3>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.7, marginBottom: 18 }}>
          If you or someone else is in immediate danger, contact Campus Security or call emergency services. Do not wait for the formal reporting process.
        </p>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 14 : 24, flexWrap: 'wrap' }}>
          {[['📞', 'Campus Security', '011 000 0001'], ['🚔', 'SAPS Emergency', '10111'], ['🤟', 'SASL Emergency Line', 'SMS: 43000']].map(([icon, label, val]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
                <div style={{ color: C.accent, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 15 }}>{val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const width = useWindowWidth();
  const isMobile = width < 640;
  return (
    <footer style={{
      background: C.navyDark, borderTop: '1px solid rgba(255,255,255,0.06)',
      color: 'rgba(255,255,255,0.45)',
      padding: isMobile ? '28px 1.25rem' : '36px 2rem',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', alignItems: 'center',
        textAlign: isMobile ? 'center' : 'left', gap: isMobile ? 8 : 16,
      }}>
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 12.5 }}>
          © 2025 National Deaf Technical And Vocational Academy · All Rights Reserved
        </span>
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 12.5 }}>
          This Code of Conduct is reviewed annually. Last updated: January 2025.
        </span>
      </div>
    </footer>
  );
}

// ─── Page root ───────────────────────────────────────────────────────────────
export default function CodeOfConductPage() {
  const [active, setActive] = useState('preamble');
  const width = useWindowWidth();
  const isMobile = width < 900;
  const mainRef = useRef(null);

  // On mobile, scroll content into view when switching sections
  useEffect(() => {
    if (isMobile && mainRef.current) {
      const top = mainRef.current.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [active]);

  const renderSection = () => {
    const section = SECTIONS.find(s => s.id === active);
    if (!section) return null;
    switch (active) {
      case 'preamble':  return <Preamble section={section} />;
      case 'values':    return <Values section={section} />;
      case 'rights':    return <Rights section={section} />;
      case 'rules':     return <CampusRules section={section} />;
      case 'penalties': return <Penalties section={section} />;
      case 'process':   return <ReportingProcess section={section} />;
      default:          return null;
    }
  };

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
        button:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; }
        a:focus-visible      { outline: 2px solid ${C.accent}; outline-offset: 2px; }
        div::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <NavBar />
      <Hero />

      {/* Mobile horizontal tab strip replaces the sidebar */}
      {isMobile && <MobileTabStrip active={active} onChange={setActive} />}

      <div style={{ background: C.white, padding: isMobile ? '28px 1.25rem 80px' : '80px 2rem 100px' }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: isMobile ? 'block' : 'grid',
          gridTemplateColumns: isMobile ? undefined : '280px 1fr',
          gap: isMobile ? undefined : 48,
          alignItems: 'start',
        }}>
          {!isMobile && <SideNav active={active} onChange={setActive} />}
          <main ref={mainRef} style={{ minWidth: 0 }}>
            {renderSection()}
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}