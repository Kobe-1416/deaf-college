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

// ─── NavBar (same as home) ───────────────────────────────────────────────────
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
      backdropFilter: 'blur(12px)',
      transition: 'background 0.4s ease',
      padding: '0 2rem',
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
                color: l.label === 'Faculties' ? C.accent : 'rgba(255,255,255,0.78)',
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
                  l.label === 'Faculties' ? C.accent : 'rgba(255,255,255,0.78)')
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

// ─── Page Hero ───────────────────────────────────────────────────────────────
function FacultiesHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);
  return (
    <section style={{
      background: C.navyDark, paddingTop: 140, paddingBottom: 80,
      padding: '140px 2rem 80px', position: 'relative', overflow: 'hidden',
    }}>
      {/* bg dots */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05,
        backgroundImage: `radial-gradient(circle, ${C.accent} 1px, transparent 1px)`,
        backgroundSize: '36px 36px',
      }} />
      {/* warm glow */}
      <div style={{
        position: 'absolute', top: -80, right: '10%', width: 600, height: 600, borderRadius: '50%',
        background: `radial-gradient(circle, ${C.primary}28 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* breadcrumb */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32,
          opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease',
        }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, fontFamily: '"DM Sans", sans-serif', textDecoration: 'none' }}>Home</a>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>›</span>
          <span style={{ color: C.accent, fontSize: 13, fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>Faculties & Courses</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end' }}>
          <div>
            <span style={{
              display: 'inline-block', color: C.accent, fontSize: 12, fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16,
              opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s',
            }}>Academic Programmes</span>
            <h1 style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 'clamp(2.8rem, 5vw, 4.8rem)',
              fontWeight: 900, color: '#fff', lineHeight: 1.05, margin: '0 0 24px',
              opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}>
              Faculties &<br />
              <span style={{ color: C.accent, fontStyle: 'italic' }}>Courses</span>
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.8,
              fontFamily: '"DM Sans", sans-serif', maxWidth: 500,
              opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s',
            }}>
              Four faculties, eighteen accredited programmes — all delivered in South African Sign Language with full written support. Choose your future below.
            </p>
          </div>

          {/* Quick stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
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
                borderRadius: 16, padding: '24px 20px',
                display: 'flex', flexDirection: 'column', gap: 6,
              }}>
                <span style={{ fontSize: 28 }}>{icon}</span>
                <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 28, fontWeight: 900, color: C.accent }}>{n}</div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
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
      position: 'sticky', top: 72, zIndex: 90,
      background: 'rgba(253,243,227,0.96)', backdropFilter: 'blur(12px)',
      borderBottom: `2px solid rgba(28,15,5,0.08)`,
      padding: '0 2rem',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 0, overflowX: 'auto' }}>
        {FACULTIES.map(f => (
          <button key={f.id} onClick={() => onChange(f.id)} style={{
            padding: '18px 24px', border: 'none', cursor: 'pointer',
            background: 'transparent', display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: '"DM Sans", sans-serif', fontWeight: active === f.id ? 700 : 500,
            fontSize: 14, whiteSpace: 'nowrap',
            color: active === f.id ? f.color : C.textSecondary,
            borderBottom: active === f.id ? `3px solid ${f.color}` : '3px solid transparent',
            marginBottom: -2, transition: 'color 0.2s, border-color 0.2s',
          }}>
            <span style={{ fontSize: 18 }}>{f.icon}</span>
            {f.name.replace('Faculty of ', '')}
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
        padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 24, textAlign: 'left',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
            <span style={{
              background: accentColor + '18', color: accentColor,
              fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100,
            }}>{course.nqf}</span>
            <span style={{
              background: `${C.navyDark}10`, color: C.textSecondary,
              fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100,
            }}>{course.duration}</span>
            <span style={{
              background: course.bursary ? `${C.success}18` : 'transparent',
              color: course.bursary ? C.success : 'transparent',
              border: course.bursary ? 'none' : 'none',
              fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100,
              display: course.bursary ? 'inline-block' : 'none',
            }}>Bursary Available</span>
          </div>
          <h3 style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: 21, fontWeight: 800, color: C.navyDark, margin: 0,
          }}>{course.name}</h3>
          {!open && (
            <p style={{ margin: '8px 0 0', color: C.textSecondary, fontSize: 14, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.6 }}>
              {course.description.slice(0, 100)}…
            </p>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 20, fontWeight: 900, color: accentColor }}>{course.price}</div>
            <div style={{ color: C.textSecondary, fontSize: 11, fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.06em' }}>{course.mode.split(' · ')[0]}</div>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
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
          padding: '0 32px 32px',
          animation: 'slideDown 0.3s ease',
        }}>
          <p style={{ color: C.textSecondary, fontSize: 15, lineHeight: 1.8, fontFamily: '"DM Sans", sans-serif', margin: '24px 0 28px' }}>
            {course.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
            {[
              { label: 'Duration', value: course.duration, icon: '⏱️' },
              { label: 'Intake', value: course.intake, icon: '📅' },
              { label: 'Credits', value: `${course.credits} Credits`, icon: '🎯' },
              { label: 'Mode', value: course.mode, icon: '🏫' },
            ].map(({ label, value, icon }) => (
              <div key={label} style={{
                background: C.white, borderRadius: 12, padding: '16px 18px',
              }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontSize: 11, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 14, color: C.navyDark, fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
            {/* Accreditation */}
            <div style={{ background: C.white, borderRadius: 16, padding: '20px 22px' }}>
              <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                🏅 Accreditation
              </div>
              {course.accreditation.split(' · ').map(a => (
                <div key={a} style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor, flexShrink: 0 }} />
                  <span style={{ fontSize: 13.5, color: C.navyDark, fontFamily: '"DM Sans", sans-serif' }}>{a}</span>
                </div>
              ))}
            </div>

            {/* Modules */}
            <div style={{ background: C.white, borderRadius: 16, padding: '20px 22px' }}>
              <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                📚 Key Modules
              </div>
              {course.modules.map(m => (
                <div key={m} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor, marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: C.navyDark, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.5 }}>{m}</span>
                </div>
              ))}
            </div>

            {/* Job opportunities */}
            <div style={{ background: C.white, borderRadius: 16, padding: '20px 22px' }}>
              <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                💼 Career Opportunities
              </div>
              {course.jobs.map(j => (
                <div key={j} style={{
                  display: 'inline-block', margin: '0 6px 8px 0',
                  background: accentColor + '18', color: accentColor,
                  fontSize: 12, fontFamily: '"DM Sans", sans-serif', fontWeight: 600,
                  padding: '4px 12px', borderRadius: 100,
                }}>{j}</div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            <a href="#apply" style={{
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
              color: '#fff', padding: '12px 28px', borderRadius: 10,
              fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14,
              textDecoration: 'none', letterSpacing: '0.03em',
              boxShadow: `0 6px 24px ${accentColor}44`,
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.target.style.transform = ''}
            >Apply for This Course</a>
            <a href="#" style={{
              background: 'transparent', border: `1.5px solid ${accentColor}55`,
              color: accentColor, padding: '12px 28px', borderRadius: 10,
              fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 14,
              textDecoration: 'none', letterSpacing: '0.03em',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.target.style.background = accentColor + '12'}
              onMouseLeave={e => e.target.style.background = 'transparent'}
            >Download Prospectus</a>
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
    <div ref={ref} id={faculty.id} style={{ padding: '60px 2rem 100px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Faculty header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 28, marginBottom: 48,
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20, flexShrink: 0,
            background: `${faculty.color}18`,
            border: `2px solid ${faculty.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36,
          }}>{faculty.icon}</div>
          <div>
            <h2 style={{
              fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 900, color: C.navyDark, margin: '0 0 10px',
            }}>{faculty.name}</h2>
            <p style={{ color: C.textSecondary, fontSize: 16, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.7, maxWidth: 700, margin: 0 }}>
              {faculty.description}
            </p>
          </div>
        </div>

        {/* Course cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
    <section ref={ref} id="apply" style={{ background: C.navyDark, padding: '80px 2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.07,
        backgroundImage: `radial-gradient(circle, ${C.accent} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />
      <div style={{
        position: 'absolute', left: '-5%', top: '-20%', width: 500, height: 500,
        borderRadius: '50%', background: `radial-gradient(circle, ${C.accent}22, transparent 70%)`,
      }} />
      <div style={{
        maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2,
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        <span style={{ color: C.accent, fontSize: 12, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          Ready to Start?
        </span>
        <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: '#fff', margin: '16px 0 20px' }}>
          Your Journey Begins Here
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.8, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
          Applications open year-round for most programmes. Our admissions team is fluent in SASL and can assist via video call, email, or in person at our Johannesburg campus.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#" style={{
            background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
            color: '#fff', padding: '16px 40px', borderRadius: 12,
            fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 16,
            textDecoration: 'none', letterSpacing: '0.03em',
            boxShadow: `0 8px 32px rgba(240,165,0,0.4)`,
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform = ''}
          >Apply Online Now</a>
          <a href="#" style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', padding: '16px 40px', borderRadius: 12,
            fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 16,
            textDecoration: 'none', letterSpacing: '0.03em',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.14)'}
            onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.08)'}
          >🤟 Book a SASL Video Call</a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {[['📋', 'Online Form', 'Quick & accessible'], ['📧', 'Email Us', 'admissions@NDTAV.ac.za'], ['📞', 'Call / SMS', '+27 11 000 0000']].map(([icon, label, sub]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ color: '#fff', fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14 }}>{label}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontFamily: '"DM Sans", sans-serif', fontSize: 12, marginTop: 4 }}>{sub}</div>
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
    <footer style={{ background: C.navyDark, borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)', padding: '36px 2rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 13 }}>© 2025 National Deaf Technincal And Vocational Academy · All Rights Reserved</span>
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 13 }}>DHET Registered · SAQA Accredited · NQF Aligned</span>
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
        body { background: ${C.white}; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        button:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; }
        a:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .info-grid  { grid-template-columns: 1fr 1fr !important; }
          .detail-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .info-grid  { grid-template-columns: 1fr !important; }
          .detail-grid { grid-template-columns: 1fr !important; }
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
