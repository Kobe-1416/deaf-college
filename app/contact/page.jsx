'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ─── Colour tokens ───────────────────────────────────────────────────────────
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
                color: l.label === 'Contact' ? C.accent : 'rgba(255,255,255,0.78)',
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

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  return (
    <section style={{ background: C.navyDark, padding: '140px 2rem 80px', position: 'relative', overflow: 'hidden' }}>
      {/* animated dot grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `radial-gradient(circle, ${C.accent} 1px, transparent 1px)`,
        backgroundSize: '36px 36px',
      }} />
      {/* glow blobs */}
      <div style={{ position: 'absolute', top: '20%', right: '10%', width: 450, height: 450, borderRadius: '50%', background: `radial-gradient(circle, ${C.primary}25 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${C.accent}20 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: '"DM Sans", sans-serif', textDecoration: 'none' }}>Home</a>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>›</span>
          <span style={{ color: C.accent, fontSize: 13, fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>Contact Us</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(240,165,0,0.1)', border: '1px solid rgba(240,165,0,0.25)',
              borderRadius: 100, padding: '6px 18px', marginBottom: 24,
              opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(12px)',
              transition: 'opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s',
            }}>
              <span style={{ fontSize: 16 }}>🤟</span>
              <span style={{ color: C.accent, fontSize: 12, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                SASL Support Available
              </span>
            </div>

            <h1 style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 'clamp(2.8rem, 5vw, 5rem)',
              fontWeight: 900, color: '#fff', lineHeight: 1.0, margin: '0 0 24px',
              opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}>
              Let's<br />
              <span style={{ color: C.accent, fontStyle: 'italic' }}>Connect</span>
            </h1>

            <p style={{
              color: 'rgba(255,255,255,0.58)', fontSize: 17, lineHeight: 1.8,
              fontFamily: '"DM Sans", sans-serif', maxWidth: 520, margin: '0 0 36px',
              opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s',
            }}>
              Whether you're a prospective student, a parent, or simply curious about National Deaf Technincal And Vocational Academy — we're here to help. Reach us via phone, email, or book a SASL video call.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease 0.28s' }}>
              <a href="#form" style={{
                background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
                color: '#fff', padding: '12px 28px', borderRadius: 10,
                fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14,
                textDecoration: 'none', boxShadow: `0 6px 24px rgba(240,165,0,0.35)`,
              }}>Send a Message</a>
              <a href="#sasl" style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', padding: '12px 28px', borderRadius: 10,
                fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 14, textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span>🤟</span> Book SASL Call
              </a>
            </div>
          </div>

          {/* Quick contact cards */}
          <div style={{
            opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
          }}>
            <QuickContactCards />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickContactCards() {
  const contacts = [
    { icon: '📍', label: 'Visit Us', value: '14 Mandela Drive\nSoweto, Johannesburg\n1804, South Africa', color: C.primary },
    { icon: '📞', label: 'Call Us', value: '+27 11 123 4567\nMon–Fri · 08:00–17:00', color: C.accent },
    { icon: '📧', label: 'Email Us', value: 'info@NDTAV.ac.za\nadmissions@NDTAV.ac.za', color: C.info },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {contacts.map((c, i) => (
        <div key={c.label} style={{
          background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.12)', borderRadius: 18,
          padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16,
          animation: `slideIn 0.5s ease ${i * 0.08}s backwards`,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
            background: `${c.color}22`, border: `1px solid ${c.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
          }}>{c.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>{c.label}</div>
            <div style={{ color: '#fff', fontSize: 14, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{c.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── SASL Video Booking ──────────────────────────────────────────────────────
function SASLBooking() {
  const [ref, visible] = useReveal();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [booked, setBooked] = useState(false);

  const dates = ['Mon 22 Apr', 'Tue 23 Apr', 'Wed 24 Apr', 'Thu 25 Apr', 'Fri 26 Apr'];
  const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

  return (
    <section id="sasl" ref={ref} style={{ background: C.white, padding: '100px 2rem' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: 48,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>🤟</span>
          <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, color: C.navyDark, margin: '0 0 12px' }}>
            Book a SASL Video Call
          </h2>
          <p style={{ color: C.textSecondary, fontSize: 16, fontFamily: '"DM Sans", sans-serif', maxWidth: 560, margin: '0 auto', lineHeight: 1.75 }}>
            Speak with our admissions team, academic advisors, or student support via South African Sign Language. Available Monday to Friday, 09:00–17:00.
          </p>
        </div>

        {!booked ? (
          <div style={{
            background: '#fff', borderRadius: 24, padding: '40px 48px',
            boxShadow: '0 8px 40px rgba(28,15,5,0.1)', border: `1px solid rgba(28,15,5,0.07)`,
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
          }}>
            <div style={{ marginBottom: 32 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 12 }}>
                Select a Date
              </label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {dates.map(d => (
                  <button key={d} onClick={() => setSelectedDate(d)} style={{
                    padding: '12px 20px', borderRadius: 12,
                    border: `1.5px solid ${selectedDate === d ? C.primary : 'rgba(28,15,5,0.15)'}`,
                    background: selectedDate === d ? `${C.primary}0f` : '#fff',
                    color: selectedDate === d ? C.primary : C.textSecondary,
                    fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 14,
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}>{d}</button>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div style={{ marginBottom: 32, animation: 'fadeIn 0.3s ease' }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 12 }}>
                  Select a Time
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 10 }}>
                  {times.map(t => (
                    <button key={t} onClick={() => setSelectedTime(t)} style={{
                      padding: '12px', borderRadius: 10,
                      border: `1.5px solid ${selectedTime === t ? C.primary : 'rgba(28,15,5,0.15)'}`,
                      background: selectedTime === t ? `${C.primary}0f` : '#fff',
                      color: selectedTime === t ? C.primary : C.textSecondary,
                      fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14,
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}>{t}</button>
                  ))}
                </div>
              </div>
            )}

            {selectedTime && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>Your Name</label>
                    <input placeholder="e.g. Thabo Mokoena" style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1.5px solid rgba(28,15,5,0.15)', fontFamily: '"DM Sans", sans-serif', fontSize: 15, color: C.navyDark, background: C.white, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                      onFocus={e => e.target.style.borderColor = C.primary}
                      onBlur={e => e.target.style.borderColor = 'rgba(28,15,5,0.15)'}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>Email Address</label>
                    <input type="email" placeholder="your@email.com" style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1.5px solid rgba(28,15,5,0.15)', fontFamily: '"DM Sans", sans-serif', fontSize: 15, color: C.navyDark, background: C.white, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                      onFocus={e => e.target.style.borderColor = C.primary}
                      onBlur={e => e.target.style.borderColor = 'rgba(28,15,5,0.15)'}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>Reason for Call (optional)</label>
                  <textarea rows={3} placeholder="e.g. I'd like to discuss admission requirements for Software Development..." style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1.5px solid rgba(28,15,5,0.15)', fontFamily: '"DM Sans", sans-serif', fontSize: 15, color: C.navyDark, background: C.white, outline: 'none', resize: 'vertical', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = C.primary}
                    onBlur={e => e.target.style.borderColor = 'rgba(28,15,5,0.15)'}
                  />
                </div>

                <div style={{ background: `${C.success}0f`, border: `1px solid ${C.success}30`, borderRadius: 14, padding: '16px 20px', marginBottom: 24, display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>✅</span>
                  <div>
                    <div style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, color: C.success, fontSize: 14, marginBottom: 4 }}>Confirmed: {selectedDate} at {selectedTime}</div>
                    <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 13, color: C.textSecondary }}>You'll receive a video call link via email 30 minutes before the scheduled time.</div>
                  </div>
                </div>

                <button onClick={() => setBooked(true)} style={{
                  width: '100%', padding: '14px', borderRadius: 12, border: 'none',
                  background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
                  color: '#fff', fontFamily: '"DM Sans", sans-serif', fontWeight: 700,
                  fontSize: 16, cursor: 'pointer', boxShadow: `0 6px 24px rgba(240,165,0,0.35)`,
                  transition: 'transform 0.2s',
                }}
                  onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.target.style.transform = ''}
                >Confirm Booking →</button>
              </div>
            )}
          </div>
        ) : (
          <div style={{
            background: C.successLight, border: `1px solid ${C.success}30`,
            borderRadius: 20, padding: '48px', textAlign: 'center',
            animation: 'fadeIn 0.5s ease',
          }}>
            <span style={{ fontSize: 56, display: 'block', marginBottom: 20 }}>🤟</span>
            <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 28, fontWeight: 900, color: C.success, margin: '0 0 12px' }}>
              SASL Call Booked!
            </h3>
            <p style={{ color: C.textSecondary, fontSize: 16, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.75, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
              Your SASL video call is confirmed for <strong>{selectedDate} at {selectedTime}</strong>. Check your email for the video link and joining instructions.
            </p>
            <button onClick={() => { setBooked(false); setSelectedDate(''); setSelectedTime(''); }} style={{
              padding: '11px 28px', borderRadius: 10, border: `1px solid ${C.success}`,
              background: 'transparent', color: C.success,
              fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14,
              cursor: 'pointer',
            }}>Book Another Call</button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [ref, visible] = useReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Valid email is required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="form" ref={ref} style={{ background: C.white, padding: '100px 2rem' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: C.successLight, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 38, margin: '0 auto 24px',
            border: `2px solid ${C.success}30`,
          }}>✅</div>
          <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 32, fontWeight: 900, color: C.navyDark, margin: '0 0 14px' }}>
            Message Sent!
          </h3>
          <p style={{ color: C.textSecondary, fontSize: 16, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.8, marginBottom: 32 }}>
            Thank you for reaching out. Our team will respond within 1 business day. If you need urgent assistance, please call us directly at <strong>+27 11 123 4567</strong>.
          </p>
          <button onClick={() => setSubmitted(false)} style={{
            padding: '12px 28px', borderRadius: 10,
            border: `1px solid ${C.border}`, background: '#fff',
            color: C.navyDark, fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700, fontSize: 14, cursor: 'pointer',
          }}>Send Another Message</button>
        </div>
      </section>
    );
  }

  return (
    <section id="form" ref={ref} style={{ background: C.white, padding: '100px 2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: 48,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>📬</span>
          <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, color: C.navyDark, margin: '0 0 12px' }}>
            Send Us a Message
          </h2>
          <p style={{ color: C.textSecondary, fontSize: 16, fontFamily: '"DM Sans", sans-serif', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
            Have a question about admissions, programmes, or student life? Fill in the form below and we'll get back to you within 1 business day.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{
          background: '#fff', borderRadius: 24, padding: '40px 48px',
          boxShadow: '0 8px 40px rgba(28,15,5,0.1)', border: `1px solid rgba(28,15,5,0.07)`,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 16px', marginBottom: 20 }}>
            <Field label="Your Name" value={form.name} onChange={set('name')} error={errors.name} placeholder="e.g. Thabo Mokoena" icon="👤" />
            <Field label="Email Address" value={form.email} onChange={set('email')} error={errors.email} placeholder="your@email.com" icon="📧" />
            <Field label="Phone Number (optional)" value={form.phone} onChange={set('phone')} placeholder="+27 71 000 0000" icon="📱" />
            <Field label="Subject" value={form.subject} onChange={set('subject')} placeholder="e.g. Admission Enquiry" icon="💬" />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: errors.message ? '#C0392B' : C.textSecondary, fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
              Your Message
            </label>
            <textarea value={form.message} onChange={set('message')} rows={5} placeholder="Tell us how we can help you…" style={{
              width: '100%', padding: '14px 16px', borderRadius: 12,
              border: `1.5px solid ${errors.message ? '#C0392B' : 'rgba(28,15,5,0.15)'}`,
              fontFamily: '"DM Sans", sans-serif', fontSize: 15, color: C.navyDark,
              background: C.white, outline: 'none', resize: 'vertical',
              boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
              onFocus={e => e.target.style.borderColor = C.primary}
              onBlur={e => e.target.style.borderColor = errors.message ? '#C0392B' : 'rgba(28,15,5,0.15)'}
            />
            {errors.message && <p style={{ color: '#C0392B', fontSize: 12, fontFamily: '"DM Sans", sans-serif', marginTop: 6 }}>⚠️ {errors.message}</p>}
          </div>

          <button type="submit" style={{
            width: '100%', padding: '15px', borderRadius: 12, border: 'none',
            background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
            color: '#fff', fontFamily: '"DM Sans", sans-serif', fontWeight: 700,
            fontSize: 16, cursor: 'pointer', boxShadow: `0 6px 24px rgba(240,165,0,0.35)`,
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform = ''}
          >Send Message →</button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, error, placeholder, icon }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: error ? '#C0392B' : focused ? C.primary : C.textSecondary, fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, transition: 'color 0.2s' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, opacity: focused ? 1 : 0.5, transition: 'opacity 0.2s' }}>{icon}</span>
        <input value={value} onChange={onChange} placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%', padding: '12px 16px 12px 42px', borderRadius: 12,
            border: `1.5px solid ${error ? '#C0392B' : focused ? C.primary : 'rgba(28,15,5,0.15)'}`,
            fontFamily: '"DM Sans", sans-serif', fontSize: 15, color: C.navyDark,
            background: C.white, outline: 'none', boxSizing: 'border-box',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: focused ? `0 0 0 3px ${error ? '#C0392B20' : C.primary + '20'}` : 'none',
          }}
        />
      </div>
      {error && <p style={{ color: '#C0392B', fontSize: 12, fontFamily: '"DM Sans", sans-serif', marginTop: 6 }}>⚠️ {error}</p>}
    </div>
  );
}

// ─── Location & Hours ─────────────────────────────────────────────────────────
function LocationHours() {
  const [ref, visible] = useReveal();

  const hours = [
    { day: 'Monday – Friday', time: '08:00 – 17:00', open: true },
    { day: 'Saturday', time: '09:00 – 13:00', open: true },
    { day: 'Sunday & Public Holidays', time: 'Closed', open: false },
  ];

  return (
    <section ref={ref} style={{ background: C.white, padding: '100px 2rem' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: 48,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, color: C.navyDark, margin: '0 0 12px' }}>
            Visit Our Campus
          </h2>
          <p style={{ color: C.textSecondary, fontSize: 16, fontFamily: '"DM Sans", sans-serif', maxWidth: 560, margin: '0 auto', lineHeight: 1.75 }}>
            Explore our facilities, meet our staff, and get a feel for life at National Deaf Technincal And Vocational Academy. Walk-ins welcome during office hours.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          {/* Map placeholder */}
          <div style={{
            background: '#fff', borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(28,15,5,0.08)', border: `1px solid rgba(28,15,5,0.07)`,
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
          }}>
            <div style={{ background: C.white, height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, borderBottom: `1px solid rgba(28,15,5,0.07)` }}>
              <span style={{ fontSize: 48 }}>🗺️</span>
              <span style={{ color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontSize: 14 }}>Interactive map placeholder</span>
            </div>
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>📍</span>
                <div>
                  <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 18, fontWeight: 900, color: C.navyDark, marginBottom: 6 }}>Our Address</div>
                  <div style={{ color: C.textSecondary, fontSize: 15, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.7 }}>
                    14 Mandela Drive<br />
                    Soweto, Johannesburg<br />
                    1804, South Africa
                  </div>
                </div>
              </div>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block', padding: '10px 20px', borderRadius: 10,
                border: `1px solid ${C.border}`, background: 'transparent',
                color: C.primary, fontFamily: '"DM Sans", sans-serif',
                fontWeight: 700, fontSize: 14, textDecoration: 'none',
              }}>Open in Google Maps →</a>
            </div>
          </div>

          {/* Office hours */}
          <div style={{
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}>
            <div style={{
              background: '#fff', borderRadius: 20, padding: '28px 32px',
              boxShadow: '0 4px 24px rgba(28,15,5,0.08)', border: `1px solid rgba(28,15,5,0.07)`,
              marginBottom: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 24 }}>🕐</span>
                <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 20, fontWeight: 900, color: C.navyDark, margin: 0 }}>Office Hours</h3>
              </div>
              {hours.map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < hours.length - 1 ? `1px solid rgba(28,15,5,0.07)` : 'none' }}>
                  <span style={{ fontSize: 14, color: C.navyDark, fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>{h.day}</span>
                  <span style={{ fontSize: 14, color: h.open ? C.success : C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 700 }}>{h.time}</span>
                </div>
              ))}
            </div>

            <div style={{
              background: `${C.info}0f`, border: `1px solid ${C.info}30`,
              borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 14,
            }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>ℹ️</span>
              <div>
                <div style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, color: C.info, fontSize: 14, marginBottom: 6 }}>Campus Tours Available</div>
                <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 13, color: C.textSecondary, lineHeight: 1.7 }}>
                  Interested in seeing the campus? Book a guided tour via SASL or in-person. Email <strong>tours@NDTAV.ac.za</strong> or call us to schedule.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const socials = [
    { icon: '📘', label: 'Facebook', url: '#' },
    { icon: '📷', label: 'Instagram', url: '#' },
    { icon: '🐦', label: 'Twitter', url: '#' },
    { icon: '💼', label: 'LinkedIn', url: '#' },
    { icon: '📺', label: 'YouTube', url: '#' },
  ];

  return (
    <footer style={{ background: C.navyDark, color: 'rgba(255,255,255,0.45)', padding: '60px 2rem 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48, marginBottom: 48 }}>
          {/* Logo */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"DM Sans", sans-serif', fontWeight: 900, color: '#fff', fontSize: 18 }}>SA</div>
              <div>
                <div style={{ fontFamily: '"DM Sans", sans-serif', color: '#fff', fontWeight: 700, fontSize: 14 }}>National Deaf Technincal And Vocational Academy</div>
                <div style={{ color: C.accent, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase' }}>South Africa</div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, fontFamily: '"DM Sans", sans-serif', marginBottom: 16 }}>
              Empowering the Deaf and hard-of-hearing community through accessible, SASL-first education.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map(s => (
                <a key={s.label} href={s.url} title={s.label} style={{
                  width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, textDecoration: 'none', transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
                  onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.08)'}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontFamily: '"DM Sans", sans-serif', fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>Quick Links</h4>
            {['Home', 'Faculties', 'Campus Events', 'Code of Conduct', 'Apply Now'].map(l => (
              <a key={l} href="#" style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 14, fontFamily: '"DM Sans", sans-serif', textDecoration: 'none', marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = C.accent}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
              >{l}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontFamily: '"DM Sans", sans-serif', fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>Contact</h4>
            <div style={{ fontSize: 14, lineHeight: 1.9, fontFamily: '"DM Sans", sans-serif' }}>
              📍 14 Mandela Drive, Soweto<br />
              📞 +27 11 123 4567<br />
              📧 info@NDTAV.ac.za<br />
              🤟 SASL support available
            </div>
          </div>

          {/* Accreditation */}
          <div>
            <h4 style={{ color: '#fff', fontFamily: '"DM Sans", sans-serif', fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>Accreditation</h4>
            <p style={{ fontSize: 13, lineHeight: 1.7, fontFamily: '"DM Sans", sans-serif' }}>
              Registered with the Department of Higher Education and Training (DHET). Programmes accredited by CHE and SAQA. Member of DeafSA.
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontSize: 13, fontFamily: '"DM Sans", sans-serif' }}>© 2025 National Deaf Technincal And Vocational Academy · All Rights Reserved</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Use', 'Accessibility'].map(l => (
              <a key={l} href="#" style={{ fontSize: 13, fontFamily: '"DM Sans", sans-serif', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = C.accent}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page Root ───────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700;1,9..144,900&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.white}; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        button:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; }
        a:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; }
        input::placeholder, textarea::placeholder { color: rgba(122,101,88,0.45); }
      `}</style>

      <NavBar />
      <Hero />
      <SASLBooking />
      <ContactForm />
      <LocationHours />
      <Footer />
    </>
  );
}
