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

// ─── Scroll reveal hook ──────────────────────────────────────────────────────
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

// ─── Data ────────────────────────────────────────────────────────────────────
const FACULTIES = [
  {
    id: 'technology',
    name: 'Faculty of Technology & Computing',
    icon: '💻',
    color: C.primary,
    description: 'Equipping students with cutting-edge digital skills in a fully SASL-accessible environment. All labs are captioned and visual-first.',
    courses: [
      {
        name: 'National Diploma: Software Development',
        duration: '3 Years',
        intake: 'February & July',
        nqf: 'NQF Level 6',
        accreditation: 'MICT SETA · CHE Registered',
        credits: 360,
        price: 'R 28 500 / year',
        bursary: true,
        mode: 'Full-time · On Campus',
        jobs: ['Junior Developer', 'Web Developer', 'Mobile App Developer', 'QA Tester', 'IT Support Specialist'],
        description: 'Covers full-stack web development, mobile applications, databases, and software engineering principles. Final year includes a workplace-integrated learning (WIL) component.',
        modules: ['Programming Fundamentals', 'Web Technologies', 'Database Design', 'Mobile Development', 'Software Engineering', 'Cybersecurity Basics', 'WIL Project'],
      },
      {
        name: 'Short Course: UI/UX & Accessible Design',
        duration: '6 Months',
        intake: 'February, July & October',
        nqf: 'NQF Level 5',
        accreditation: 'MICT SETA',
        credits: 120,
        price: 'R 9 800',
        bursary: false,
        mode: 'Part-time · Blended',
        jobs: ['UI Designer', 'Accessibility Consultant', 'Product Designer', 'Freelance Designer'],
        description: 'Focused on human-centred design with a special emphasis on designing for Deaf, hard-of-hearing, and blind users. Internationally applicable skills.',
        modules: ['Design Thinking', 'Figma & Prototyping', 'Accessibility Standards (WCAG)', 'User Research', 'Visual Communication'],
      },
      {
        name: 'Certificate: IT Technician & Networking',
        duration: '1 Year',
        intake: 'February',
        nqf: 'NQF Level 5',
        accreditation: 'CompTIA · MICT SETA',
        credits: 240,
        price: 'R 14 200 / year',
        bursary: true,
        mode: 'Full-time · On Campus',
        jobs: ['Network Technician', 'IT Support', 'Systems Administrator', 'Hardware Technician'],
        description: 'Practical-first programme covering computer hardware, networking, and help-desk support. Prepares students for CompTIA A+ and Network+ certification exams.',
        modules: ['Hardware Fundamentals', 'Operating Systems', 'Networking Essentials', 'Troubleshooting', 'CompTIA Exam Prep'],
      },
    ],
  },
  {
    id: 'business',
    name: 'Faculty of Business & Management',
    icon: '📊',
    color: C.accent,
    description: 'Developing entrepreneurial Deaf leaders. All coursework is available in SASL video format with written transcripts.',
    courses: [
      {
        name: 'National Diploma: Business Management',
        duration: '3 Years',
        intake: 'February',
        nqf: 'NQF Level 6',
        accreditation: 'SABPP · CHE Registered',
        credits: 360,
        price: 'R 22 000 / year',
        bursary: true,
        mode: 'Full-time · On Campus',
        jobs: ['Business Analyst', 'Operations Manager', 'HR Officer', 'Project Coordinator', 'Entrepreneur'],
        description: 'Comprehensive business education covering finance, human resources, marketing, and operations. Strong focus on Deaf entrepreneurship and inclusive workplace leadership.',
        modules: ['Business Communication (SASL)', 'Financial Accounting', 'Marketing Management', 'Human Resources', 'Business Law', 'Entrepreneurship', 'Project Management'],
      },
      {
        name: 'Higher Certificate: Bookkeeping & Finance',
        duration: '1 Year',
        intake: 'February & July',
        nqf: 'NQF Level 5',
        accreditation: 'ICB · FASSET SETA',
        credits: 120,
        price: 'R 11 500',
        bursary: false,
        mode: 'Part-time · Blended',
        jobs: ['Bookkeeper', 'Payroll Administrator', 'Accounts Clerk', 'Finance Assistant'],
        description: 'Practical bookkeeping and financial administration skills aligned with ICB standards. Graduates can write the ICB Bookkeeping to Trial Balance exam.',
        modules: ['Basic Accounting', 'Payroll & EMP201', 'Financial Statements', 'Sage Accounting Software', 'Taxation Basics'],
      },
      {
        name: 'Short Course: Digital Marketing',
        duration: '4 Months',
        intake: 'February, June & September',
        nqf: 'NQF Level 4',
        accreditation: 'MICT SETA',
        credits: 60,
        price: 'R 6 500',
        bursary: false,
        mode: 'Online · Self-paced',
        jobs: ['Social Media Manager', 'Content Creator', 'SEO Specialist', 'Digital Marketer'],
        description: 'Covers social media strategy, SEO, paid advertising, and content creation — with a focus on building Deaf-owned brands and online presence.',
        modules: ['Social Media Strategy', 'SEO & Google Ads', 'Content Creation', 'Analytics', 'Brand Building'],
      },
    ],
  },
  {
    id: 'health',
    name: 'Faculty of Health & Community Services',
    icon: '🏥',
    color: C.success,
    description: 'Training compassionate, qualified health workers who understand the unique needs of Deaf and disability communities.',
    courses: [
      {
        name: 'National Diploma: Social Auxiliary Work',
        duration: '2 Years',
        intake: 'February',
        nqf: 'NQF Level 5',
        accreditation: 'SACSSP · HWSETA',
        credits: 240,
        price: 'R 18 000 / year',
        bursary: true,
        mode: 'Full-time · On Campus + Fieldwork',
        jobs: ['Social Auxiliary Worker', 'Community Development Officer', 'NGO Coordinator', 'Youth Worker'],
        description: 'Prepares students to work in communities, child welfare organisations, and disability NGOs. Includes fieldwork placements in Gauteng communities.',
        modules: ['Social Work Principles', 'Community Development', 'Child & Youth Care', 'Disability & Inclusion', 'Counselling Basics', 'Ethics in Practice', 'Fieldwork Placement'],
      },
      {
        name: 'Certificate: SASL Interpreting',
        duration: '2 Years',
        intake: 'February',
        nqf: 'NQF Level 6',
        accreditation: 'SLIASA · DHET',
        credits: 240,
        price: 'R 19 500 / year',
        bursary: true,
        mode: 'Full-time · On Campus',
        jobs: ['Educational Interpreter', 'Community Interpreter', 'Legal & Medical Interpreter', 'Freelance SASL Interpreter'],
        description: 'South Africa\'s Deaf community needs qualified SASL interpreters urgently. This programme trains hearing students to become proficient, ethical, professional interpreters across sectors.',
        modules: ['SASL Levels 1–4', 'Interpreting Theory', 'Educational Settings', 'Legal Interpreting', 'Medical Interpreting', 'Deaf Culture & History', 'Practical Interpreting'],
      },
    ],
  },
  {
    id: 'creative',
    name: 'Faculty of Creative Arts',
    icon: '🎨',
    color: '#7B5EA7',
    description: 'Visual storytelling, design, and performance arts for Deaf creatives who communicate through sight and movement.',
    courses: [
      {
        name: 'National Diploma: Visual Communication Design',
        duration: '3 Years',
        intake: 'February',
        nqf: 'NQF Level 6',
        accreditation: 'CHE · CATHSSETA',
        credits: 360,
        price: 'R 24 000 / year',
        bursary: true,
        mode: 'Full-time · On Campus',
        jobs: ['Graphic Designer', 'Illustrator', 'Brand Designer', 'Multimedia Specialist', 'Visual Artist'],
        description: 'Develops Deaf visual artists and designers through studio practice, digital design, typography, and conceptual thinking. Final year includes a public portfolio exhibition.',
        modules: ['Drawing & Composition', 'Typography', 'Digital Design (Adobe Suite)', 'Photography', 'Branding & Identity', 'Motion Graphics', 'Graduate Exhibition'],
      },
      {
        name: 'Short Course: Sign Language Performance Arts',
        duration: '6 Months',
        intake: 'February & July',
        nqf: 'NQF Level 4',
        accreditation: 'CATHSSETA',
        credits: 60,
        price: 'R 7 200',
        bursary: false,
        mode: 'Part-time · On Campus',
        jobs: ['Deaf Theatre Performer', 'SASL Storyteller', 'Cultural Ambassador', 'Arts Educator'],
        description: 'Explores the rich tradition of Deaf theatre, signed storytelling, and visual vernacular. Open to Deaf and hearing students who are proficient in SASL.',
        modules: ['Visual Vernacular', 'Deaf Theatre History', 'Performance Technique', 'Storytelling in SASL', 'Stage Production'],
      },
    ],
  },
];

// ─── NavBar with mobile support ──────────────────────────────────────────────
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
      backdropFilter: 'blur(12px)',
      transition: 'background 0.4s ease',
      padding: '0 clamp(12px, 4vw, 2rem)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'clamp(60px, 12vw, 72px)' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 3vw, 12px)', minWidth: 0, flex: 1 }}>
          <div style={{
            width: 'clamp(36px, 8vw, 44px)', height: 'clamp(36px, 8vw, 44px)', borderRadius: 10,
            background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"DM Sans", sans-serif', fontWeight: 900, color: '#fff', fontSize: 'clamp(14px, 3vw, 20px)', flexShrink: 0,
          }}>SA</div>
          <div style={{ minWidth: 0, display: 'block' }}>
            <div style={{ fontFamily: '"DM Sans", sans-serif', color: '#fff', fontWeight: 700, fontSize: 'clamp(12px, 2.5vw, 15px)', lineHeight: 1.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>NDTAV Academy</div>
            <div style={{ color: C.accent, fontSize: 'clamp(8px, 1.5vw, 10px)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>South Africa</div>
          </div>
        </div>

        {/* Desktop menu */}
        <div className="desktop-menu" style={{ gap: 'clamp(16px, 3vw, 32px)', alignItems: 'center', marginLeft: '20px' }}>
          {links.map(l => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                color: l.label === 'Faculties' ? C.accent : 'rgba(255,255,255,0.78)',
                textDecoration: 'none',
                fontSize: 'clamp(12px, 1.8vw, 13.5px)',
                letterSpacing: '0.04em',
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = C.accent)}
              onMouseLeave={e =>
                (e.currentTarget.style.color =
                  l.label === 'Faculties' ? C.accent : 'rgba(255,255,255,0.78)')
              }
            >
              {l.label}
            </Link>
          ))}
          <a href="#apply" style={{
            background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
            color: '#fff',
            padding: 'clamp(7px, 1.5vw, 9px) clamp(16px, 3vw, 22px)',
            borderRadius: 8,
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(12px, 1.8vw, 13px)',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            boxShadow: `0 4px 20px rgba(240,165,0,0.35)`,
            whiteSpace: 'nowrap',
          }}>
            Apply Now
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 'clamp(20px, 5vw, 24px)',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          padding: '12px 0',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          animation: 'slideDown 0.3s ease',
        }}>
          {links.map(l => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                color: l.label === 'Faculties' ? C.accent : 'rgba(255,255,255,0.78)',
                textDecoration: 'none',
                fontSize: '14px',
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                padding: '12px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'background 0.2s',
              }}
            >
              {l.label}
            </Link>
          ))}
          <a href="#apply" style={{
            background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
            color: '#fff',
            padding: '12px 16px',
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            textDecoration: 'none',
            textAlign: 'center',
            marginTop: '8px',
            margin: '8px 16px 16px',
            borderRadius: '8px',
          }}>
            Apply Now
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Page Hero ───────────────────────────────────────────────────────────────
function FacultiesHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);
  return (
    <section style={{
      background: C.navyDark,
      padding: 'clamp(100px, 15vw, 140px) clamp(16px, 5vw, 2rem) clamp(50px, 10vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
      marginTop: 'clamp(60px, 12vw, 72px)',
    }}>
      {/* bg dots */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05,
        backgroundImage: `radial-gradient(circle, ${C.accent} 1px, transparent 1px)`,
        backgroundSize: '36px 36px',
      }} />
      {/* warm glow */}
      <div style={{
        position: 'absolute', top: '-15%', right: '5%', width: 'min(600px, 80vw)', height: 'min(600px, 80vw)', borderRadius: '50%',
        background: `radial-gradient(circle, ${C.primary}28 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* breadcrumb */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'clamp(20px, 5vw, 32px)',
          opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease',
          flexWrap: 'wrap',
        }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(12px, 3vw, 13px)', fontFamily: '"DM Sans", sans-serif', textDecoration: 'none' }}>Home</a>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 'clamp(12px, 3vw, 13px)' }}>›</span>
          <span style={{ color: C.accent, fontSize: 'clamp(12px, 3vw, 13px)', fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>Faculties & Courses</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(40px, 10vw, 80px)', alignItems: 'end' }}>
          <div>
            <span style={{
              display: 'inline-block', color: C.accent, fontSize: 'clamp(10px, 2.5vw, 12px)', fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 'clamp(12px, 3vw, 16px)',
              opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s',
            }}>Academic Programmes</span>
            <h1 style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 'clamp(2rem, 6vw, 4.8rem)',
              fontWeight: 900, color: '#fff', lineHeight: 1.05, margin: '0 0 clamp(16px, 5vw, 24px)',
              opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}>
              Faculties &<br />
              <span style={{ color: C.accent, fontStyle: 'italic' }}>Courses</span>
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(14px, 4vw, 16px)', lineHeight: 1.8,
              fontFamily: '"DM Sans", sans-serif', maxWidth: 500,
              opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s',
            }}>
              Four faculties, eighteen accredited programmes — all delivered in South African Sign Language with full written support. Choose your future below.
            </p>
          </div>

          {/* Quick stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: 'clamp(12px, 3vw, 16px)',
            opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease 0.3s',
          }}>
            {[
              { n: '4', label: 'Faculties', icon: '🏛️' },
              { n: '18', label: 'Programmes', icon: '📋' },
              { n: 'NQF 4–6', label: 'Qualification Levels', icon: '🎓' },
              { n: '95%', label: 'Employment Rate', icon: '💼' },
            ].map(({ n, label, icon }) => (
              <div key={label} style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16, padding: 'clamp(16px, 4vw, 24px) clamp(14px, 3vw, 20px)',
                display: 'flex', flexDirection: 'column', gap: 6,
              }}>
                <span style={{ fontSize: 'clamp(20px, 5vw, 28px)' }}>{icon}</span>
                <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 900, color: C.accent }}>{n}</div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(10px, 2.5vw, 12px)', fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
          <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 15C480 30 240 60 0 30L0 60Z" fill={C.white} />
        </svg>
      </div>
    </section>
  );
}

// ─── Faculty Tab Strip ───────────────────────────────────────────────────────
function FacultyTabs({ active, onChange }) {
  return (
    <div style={{
      position: 'sticky', top: 'clamp(60px, 12vw, 72px)', zIndex: 90,
      background: 'rgba(253,243,227,0.96)', backdropFilter: 'blur(12px)',
      borderBottom: `2px solid rgba(28,15,5,0.08)`,
      padding: '0 clamp(12px, 4vw, 2rem)',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 0, minWidth: 'min-content' }}>
        {FACULTIES.map(f => (
          <button key={f.id} onClick={() => onChange(f.id)} style={{
            padding: 'clamp(14px, 3vw, 18px) clamp(14px, 4vw, 24px)', border: 'none', cursor: 'pointer',
            background: 'transparent', display: 'flex', alignItems: 'center', gap: 'clamp(6px, 2vw, 8px)',
            fontFamily: '"DM Sans", sans-serif', fontWeight: active === f.id ? 700 : 500,
            fontSize: 'clamp(12px, 3vw, 14px)', whiteSpace: 'nowrap',
            color: active === f.id ? f.color : C.textSecondary,
            borderBottom: active === f.id ? `3px solid ${f.color}` : '3px solid transparent',
            marginBottom: -2, transition: 'color 0.2s, border-color 0.2s',
          }}>
            <span style={{ fontSize: 'clamp(16px, 4vw, 18px)' }}>{f.icon}</span>
            <span style={{ display: 'none', '@media (minWidth: 640px)': { display: 'inline' } }}>
              {f.name.replace('Faculty of ', '')}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Course Accordion Card ───────────────────────────────────────────────────
function CourseCard({ course, accentColor, index }) {
  const [open, setOpen] = useState(index === 0);
  const [ref, visible] = useReveal();

  return (
    <div ref={ref} style={{
      background: '#fff', borderRadius: 20, overflow: 'hidden',
      boxShadow: open ? '0 12px 48px rgba(28,15,5,0.12)' : '0 4px 20px rgba(28,15,5,0.06)',
      border: `1px solid ${open ? accentColor + '40' : 'rgba(28,15,5,0.08)'}`,
      transition: 'box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.6s ease, transform 0.6s ease',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transitionDelay: `${index * 0.08}s`,
    }}>
      {/* Header — always visible */}
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        padding: 'clamp(18px, 4vw, 28px) clamp(16px, 4vw, 32px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 'clamp(12px, 3vw, 24px)', textAlign: 'left', flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'clamp(6px, 2vw, 10px)' }}>
            <span style={{
              background: accentColor + '18', color: accentColor,
              fontSize: 'clamp(9px, 2.5vw, 11px)', fontFamily: '"DM Sans", sans-serif', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100,
            }}>{course.nqf}</span>
            <span style={{
              background: `${C.navyDark}10`, color: C.textSecondary,
              fontSize: 'clamp(9px, 2.5vw, 11px)', fontFamily: '"DM Sans", sans-serif', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100,
            }}>{course.duration}</span>
            {course.bursary && (
              <span style={{
                background: `${C.success}18`,
                color: C.success,
                fontSize: 'clamp(9px, 2.5vw, 11px)', fontFamily: '"DM Sans", sans-serif', fontWeight: 700,
                letterSpacing: '0.06em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100,
              }}>Bursary Available</span>
            )}
          </div>
          <h3 style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(16px, 4vw, 21px)', fontWeight: 800, color: C.navyDark, margin: 0,
            lineHeight: 1.2,
          }}>{course.name}</h3>
          {!open && (
            <p style={{ margin: '8px 0 0', color: C.textSecondary, fontSize: 'clamp(12px, 3vw, 14px)', fontFamily: '"DM Sans", sans-serif', lineHeight: 1.6, display: 'none', '@media (minWidth: 640px)': { display: 'block' } }}>
              {course.description.slice(0, 100)}…
            </p>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 20px)', flexShrink: 0 }}>
          <div style={{ textAlign: 'right', display: 'none', '@media (minWidth: 640px)': { display: 'block' } }}>
            <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 900, color: accentColor }}>{course.price}</div>
            <div style={{ color: C.textSecondary, fontSize: '11px', fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.06em' }}>{course.mode.split(' · ')[0]}</div>
          </div>
          <div style={{
            width: 'clamp(32px, 8vw, 36px)', height: 'clamp(32px, 8vw, 36px)', borderRadius: '50%',
            background: open ? accentColor : `${accentColor}18`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.25s, transform 0.3s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 5L7 10L12 5" stroke={open ? '#fff' : accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </button>

      {/* Expanded body */}
      {open && (
        <div style={{
          borderTop: `1px solid rgba(28,15,5,0.07)`,
          padding: 'clamp(16px, 4vw, 32px) clamp(16px, 4vw, 32px)',
          animation: 'slideDown 0.3s ease',
        }}>
          <p style={{ color: C.textSecondary, fontSize: 'clamp(13px, 3vw, 15px)', lineHeight: 1.8, fontFamily: '"DM Sans", sans-serif', margin: 'clamp(16px, 4vw, 24px) 0 clamp(16px, 4vw, 28px)' }}>
            {course.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))', gap: 'clamp(12px, 3vw, 16px)', marginBottom: 'clamp(16px, 4vw, 28px)' }}>
            {[
              { label: 'Duration', value: course.duration, icon: '⏱️' },
              { label: 'Intake', value: course.intake, icon: '📅' },
              { label: 'Credits', value: `${course.credits}`, icon: '🎯' },
              { label: 'Mode', value: course.mode.split(' · ')[0], icon: '🏫' },
            ].map(({ label, value, icon }) => (
              <div key={label} style={{
                background: C.white, borderRadius: 12, padding: 'clamp(12px, 3vw, 16px) clamp(12px, 3vw, 18px)',
                border: '1px solid rgba(28,15,5,0.07)',
              }}>
                <div style={{ fontSize: 'clamp(18px, 4vw, 22px)', marginBottom: 8 }}>{icon}</div>
                <div style={{ fontSize: 'clamp(9px, 2vw, 11px)', color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: C.navyDark, fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 'clamp(16px, 4vw, 24px)' }}>
            {/* Accreditation */}
            <div style={{ background: C.white, borderRadius: 16, padding: 'clamp(16px, 4vw, 20px) clamp(14px, 4vw, 22px)', border: '1px solid rgba(28,15,5,0.07)' }}>
              <div style={{ fontSize: 'clamp(10px, 2.5vw, 12px)', color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                🏅 Accreditation
              </div>
              {course.accreditation.split(' · ').map(a => (
                <div key={a} style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor, flexShrink: 0 }} />
                  <span style={{ fontSize: 'clamp(12px, 3vw, 13.5px)', color: C.navyDark, fontFamily: '"DM Sans", sans-serif' }}>{a}</span>
                </div>
              ))}
            </div>

            {/* Modules */}
            <div style={{ background: C.white, borderRadius: 16, padding: 'clamp(16px, 4vw, 20px) clamp(14px, 4vw, 22px)', border: '1px solid rgba(28,15,5,0.07)' }}>
              <div style={{ fontSize: 'clamp(10px, 2.5vw, 12px)', color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                📚 Key Modules
              </div>
              {course.modules.slice(0, 4).map(m => (
                <div key={m} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor, marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 'clamp(12px, 3vw, 13px)', color: C.navyDark, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.5 }}>{m}</span>
                </div>
              ))}
            </div>

            {/* Job opportunities */}
            <div style={{ background: C.white, borderRadius: 16, padding: 'clamp(16px, 4vw, 20px) clamp(14px, 4vw, 22px)', border: '1px solid rgba(28,15,5,0.07)' }}>
              <div style={{ fontSize: 'clamp(10px, 2.5vw, 12px)', color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                💼 Career Opportunities
              </div>
              {course.jobs.slice(0, 4).map(j => (
                <div key={j} style={{
                  display: 'inline-block', margin: '0 4px 6px 0',
                  background: accentColor + '18', color: accentColor,
                  fontSize: 'clamp(11px, 2.5vw, 12px)', fontFamily: '"DM Sans", sans-serif', fontWeight: 600,
                  padding: '4px 10px', borderRadius: 100,
                }}>{j}</div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '12px', marginTop: 'clamp(16px, 4vw, 28px)', flexWrap: 'wrap' }}>
            <a href="#apply" style={{
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
              color: '#fff', padding: 'clamp(10px, 2.5vw, 12px) clamp(18px, 4vw, 28px)', borderRadius: 10,
              fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 'clamp(12px, 3vw, 14px)',
              textDecoration: 'none', letterSpacing: '0.03em',
              boxShadow: `0 6px 24px ${accentColor}44`,
              transition: 'transform 0.2s',
              flex: '1 1 auto',
              minWidth: '140px',
              textAlign: 'center',
            }}
              onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.target.style.transform = ''}
            >Apply</a>
            <a href="#" style={{
              background: 'transparent', border: `1.5px solid ${accentColor}55`,
              color: accentColor, padding: 'clamp(10px, 2.5vw, 12px) clamp(18px, 4vw, 28px)', borderRadius: 10,
              fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 'clamp(12px, 3vw, 14px)',
              textDecoration: 'none', letterSpacing: '0.03em',
              transition: 'background 0.2s',
              flex: '1 1 auto',
              minWidth: '140px',
              textAlign: 'center',
            }}
              onMouseEnter={e => e.target.style.background = accentColor + '12'}
              onMouseLeave={e => e.target.style.background = 'transparent'}
            >Prospectus</a>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Faculty Section ─────────────────────────────────────────────────────────
function FacultySection({ faculty, isActive }) {
  const [ref, visible] = useReveal();
  if (!isActive) return null;
  return (
    <div ref={ref} id={faculty.id} style={{ padding: 'clamp(40px, 8vw, 60px) clamp(12px, 4vw, 2rem) clamp(50px, 10vw, 100px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Faculty header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 'clamp(16px, 4vw, 28px)', marginBottom: 'clamp(32px, 8vw, 48px)',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          flexDirection: 'column', '@media (minWidth: 640px)': { flexDirection: 'row' },
        }}>
          <div style={{
            width: 'clamp(56px, 12vw, 72px)', height: 'clamp(56px, 12vw, 72px)', borderRadius: 20, flexShrink: 0,
            background: `${faculty.color}18`,
            border: `2px solid ${faculty.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 'clamp(28px, 6vw, 36px)',
          }}>{faculty.icon}</div>
          <div>
            <h2 style={{
              fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(1.5rem, 5vw, 2.8rem)',
              fontWeight: 900, color: C.navyDark, margin: '0 0 10px',
            }}>{faculty.name}</h2>
            <p style={{ color: C.textSecondary, fontSize: 'clamp(14px, 3.5vw, 16px)', fontFamily: '"DM Sans", sans-serif', lineHeight: 1.7, maxWidth: 700, margin: 0 }}>
              {faculty.description}
            </p>
          </div>
        </div>

        {/* Course cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 3vw, 20px)' }}>
          {faculty.courses.map((course, i) => (
            <CourseCard key={course.name} course={course} accentColor={faculty.color} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Apply CTA Banner ────────────────────────────────────────────────────────
function ApplyBanner() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} id="apply" style={{ background: C.navyDark, padding: 'clamp(50px, 10vw, 80px) clamp(16px, 5vw, 2rem)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.07,
        backgroundImage: `radial-gradient(circle, ${C.accent} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />
      <div style={{
        position: 'absolute', left: '-5%', top: '-20%', width: 'min(500px, 50vw)', height: 'min(500px, 50vw)',
        borderRadius: '50%', background: `radial-gradient(circle, ${C.accent}22, transparent 70%)`,
      }} />
      <div style={{
        maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2,
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        <span style={{ color: C.accent, fontSize: 'clamp(10px, 2.5vw, 12px)', fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          Ready to Start?
        </span>
        <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', margin: 'clamp(12px, 3vw, 16px) 0 clamp(12px, 3vw, 20px)' }}>
          Your Journey Begins Here
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(14px, 3.5vw, 16px)', fontFamily: '"DM Sans", sans-serif', lineHeight: 1.8, marginBottom: 'clamp(24px, 6vw, 40px)', maxWidth: 600, margin: '0 auto clamp(24px, 6vw, 40px)' }}>
          Applications open year-round for most programmes. Our admissions team is fluent in SASL and can assist via video call, email, or in person at our Johannesburg campus.
        </p>
        <div style={{ display: 'flex', gap: 'clamp(10px, 3vw, 16px)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#" style={{
            background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
            color: '#fff', padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 40px)', borderRadius: 12,
            fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 'clamp(13px, 3.5vw, 16px)',
            textDecoration: 'none', letterSpacing: '0.03em',
            boxShadow: `0 8px 32px rgba(240,165,0,0.4)`,
            transition: 'transform 0.2s',
            flex: '1 1 auto',
            minWidth: '140px',
            textAlign: 'center',
          }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform = ''}
          >Apply Now</a>
          <a href="#" style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 40px)', borderRadius: 12,
            fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 'clamp(13px, 3.5vw, 16px)',
            textDecoration: 'none', letterSpacing: '0.03em',
            transition: 'background 0.2s',
            flex: '1 1 auto',
            minWidth: '140px',
            textAlign: 'center',
          }}
            onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.14)'}
            onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.08)'}
          >🤟 SASL Video Call</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))', gap: 'clamp(20px, 5vw, 40px)', marginTop: 'clamp(40px, 8vw, 56px)', paddingTop: 'clamp(20px, 5vw, 40px)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {[['📋', 'Online Form', 'Quick & accessible'], ['📧', 'Email Us', 'admissions@NDTAV.ac.za'], ['📞', 'Call / SMS', '+27 11 000 0000']].map(([icon, label, sub]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(24px, 5vw, 28px)', marginBottom: 8 }}>{icon}</div>
              <div style={{ color: '#fff', fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 'clamp(12px, 3vw, 14px)' }}>{label}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(11px, 2.5vw, 12px)', marginTop: 4 }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.navyDark, borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)', padding: 'clamp(24px, 5vw, 36px) clamp(16px, 5vw, 2rem)', textAlign: 'center' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 'clamp(12px, 3vw, 16px)' }}>
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(11px, 2.5vw, 13px)' }}>© 2025 NDTAV Academy · All Rights Reserved</span>
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(11px, 2.5vw, 13px)' }}>DHET · SAQA · NQF Aligned</span>
      </div>
    </footer>
  );
}

// ─── Page Root ───────────────────────────────────────────────────────────────
export default function FacultiesPage() {
  const [activeFaculty, setActiveFaculty] = useState(FACULTIES[0].id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700;1,9..144,900&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.white}; overflow-x: hidden; }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        
        button:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; }
        a:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; }
        
        /* Hide scrollbar */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(28,15,5,0.2); border-radius: 3px; }

        /* Mobile menu button - hidden by default */
        .mobile-menu-btn { display: flex !important; }

        /* Desktop menu - shown by default */
        .desktop-menu { display: flex !important; }

        @media (min-width: 768px) {
          .mobile-menu-btn { display: none !important; }
          .desktop-menu { display: flex !important; }
        }

        @media (max-width: 767px) {
          .mobile-menu-btn { display: flex !important; }
          .desktop-menu { display: none !important; }
        }
      `}</style>

      <NavBar />
      <FacultiesHero />

      <div style={{ background: C.white }}>
        <FacultyTabs active={activeFaculty} onChange={setActiveFaculty} />
        {FACULTIES.map(f => (
          <FacultySection key={f.id} faculty={f} isActive={activeFaculty === f.id} />
        ))}
      </div>

      <ApplyBanner />
      <Footer />
    </>
  );
}