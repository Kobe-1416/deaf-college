'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

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

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => {
      if (window.innerWidth > 960) setOpen(false);
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
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
    <nav
      className="top-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(28,15,5,0.96)' : 'rgba(28,15,5,0.82)',
        backdropFilter: 'blur(12px)',
        transition: 'background 0.4s ease',
        padding: '0 1rem',
      }}
    >
      <div className="nav-inner">
        <div className="nav-brand">
          <div className="nav-mark">SA</div>
          <div className="nav-brand-text">
            <div className="nav-title">National Deaf Technincal And Vocational Academy</div>
            <div className="nav-subtitle">South Africa</div>
          </div>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{open ? '✕' : '☰'}</span>
        </button>

        <div className="nav-links-wrap">
          <div className="nav-links">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="nav-link"
                style={{
                  color: l.label === 'Contact' ? C.accent : 'rgba(255,255,255,0.78)',
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <a href="#apply" className="nav-cta">
            Apply Now
          </a>
        </div>
      </div>

      {open && (
        <div className="nav-mobile-panel">
          <div className="nav-mobile-links">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="nav-mobile-link"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <a href="#apply" className="nav-mobile-cta" onClick={() => setOpen(false)}>
            Apply Now
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero-section section-pad" style={{ background: C.navyDark, position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: `radial-gradient(circle, ${C.accent} 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 450,
          height: 450,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.primary}25 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.accent}20 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <div className="page-container hero-shell">
        <div
          className="breadcrumb-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 32,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.6s ease',
            flexWrap: 'wrap',
          }}
        >
          <a href="/" className="breadcrumb-link">
            Home
          </a>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>›</span>
          <span className="breadcrumb-current">Contact Us</span>
        </div>

        <div className="hero-grid">
          <div>
            <div
              className="pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(240,165,0,0.1)',
                border: '1px solid rgba(240,165,0,0.25)',
                borderRadius: 100,
                padding: '6px 18px',
                marginBottom: 24,
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'none' : 'translateY(12px)',
                transition: 'opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s',
              }}
            >
              <span style={{ fontSize: 16 }}>🤟</span>
              <span className="pill-text">SASL Support Available</span>
            </div>

            <h1
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1.0,
                margin: '0 0 24px',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'none' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
              }}
            >
              Let&apos;s
              <br />
              <span style={{ color: C.accent, fontStyle: 'italic' }}>Connect</span>
            </h1>

            <p
              style={{
                color: 'rgba(255,255,255,0.58)',
                fontSize: 17,
                lineHeight: 1.8,
                fontFamily: '"DM Sans", sans-serif',
                maxWidth: 520,
                margin: '0 0 36px',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'none' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s',
              }}
            >
              Whether you&apos;re a prospective student, a parent, or simply curious about National Deaf Technincal And Vocational Academy — we&apos;re here to help. Reach us via phone, email, or book a SASL video call.
            </p>

            <div
              className="hero-actions"
              style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.7s ease 0.28s',
              }}
            >
              <a href="#form" className="primary-button">
                Send a Message
              </a>
              <a href="#sasl" className="secondary-button">
                <span>🤟</span> Book SASL Call
              </a>
            </div>
          </div>

          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
            }}
          >
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
    <div className="contact-cards">
      {contacts.map((c, i) => (
        <div
          key={c.label}
          className="quick-contact-card"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 18,
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            animation: `slideIn 0.5s ease ${i * 0.08}s backwards`,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              flexShrink: 0,
              background: `${c.color}22`,
              border: `1px solid ${c.color}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
            }}
          >
            {c.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div className="small-label">{c.label}</div>
            <div className="card-text">{c.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SASLBooking() {
  const [ref, visible] = useReveal();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [booked, setBooked] = useState(false);

  const dates = ['Mon 22 Apr', 'Tue 23 Apr', 'Wed 24 Apr', 'Thu 25 Apr', 'Fri 26 Apr'];
  const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

  return (
    <section id="sasl" ref={ref} className="section-pad" style={{ background: C.white }}>
      <div className="page-container">
        <div
          style={{
            textAlign: 'center',
            marginBottom: 48,
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>🤟</span>
          <h2 className="section-title">Book a SASL Video Call</h2>
          <p className="section-subtitle">
            Speak with our admissions team, academic advisors, or student support via South African Sign Language. Available Monday to Friday, 09:00–17:00.
          </p>
        </div>

        {!booked ? (
          <div className="panel card-pad">
            <div style={{ marginBottom: 32 }}>
              <label className="field-label">Select a Date</label>
              <div className="date-chip-group">
                {dates.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className="chip-button"
                    style={{
                      borderColor: selectedDate === d ? C.primary : 'rgba(28,15,5,0.15)',
                      background: selectedDate === d ? `${C.primary}0f` : '#fff',
                      color: selectedDate === d ? C.primary : C.textSecondary,
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div style={{ marginBottom: 32, animation: 'fadeIn 0.3s ease' }}>
                <label className="field-label">Select a Time</label>
                <div className="time-grid">
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className="time-button"
                      style={{
                        borderColor: selectedTime === t ? C.primary : 'rgba(28,15,5,0.15)',
                        background: selectedTime === t ? `${C.primary}0f` : '#fff',
                        color: selectedTime === t ? C.primary : C.textSecondary,
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedTime && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <div className="booking-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                  <div>
                    <label className="field-label">Your Name</label>
                    <input
                      placeholder="e.g. Thabo Mokoena"
                      className="text-input"
                    />
                  </div>
                  <div>
                    <label className="field-label">Email Address</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="text-input"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label className="field-label">Reason for Call (optional)</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. I'd like to discuss admission requirements for Software Development..."
                    className="text-area"
                  />
                </div>

                <div className="notice-box success-notice">
                  <span style={{ fontSize: 20, flexShrink: 0 }}>✅</span>
                  <div>
                    <div className="notice-title">
                      Confirmed: {selectedDate} at {selectedTime}
                    </div>
                    <div className="notice-copy">
                      You&apos;ll receive a video call link via email 30 minutes before the scheduled time.
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setBooked(true)}
                  className="primary-button block-button"
                >
                  Confirm Booking →
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="success-card">
            <span style={{ fontSize: 56, display: 'block', marginBottom: 20 }}>🤟</span>
            <h3 className="success-title">SASL Call Booked!</h3>
            <p className="section-subtitle" style={{ maxWidth: 480, marginBottom: 28 }}>
              Your SASL video call is confirmed for <strong>{selectedDate} at {selectedTime}</strong>. Check your email for the video link and joining instructions.
            </p>
            <button
              type="button"
              onClick={() => {
                setBooked(false);
                setSelectedDate('');
                setSelectedTime('');
              }}
              className="ghost-button"
            >
              Book Another Call
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ContactForm() {
  const [ref, visible] = useReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

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
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section id="form" ref={ref} className="section-pad" style={{ background: C.white }}>
      <div className="page-container form-shell">
        {submitted ? (
          <div className="success-shell">
            <div className="success-icon">✅</div>
            <h3 className="success-title" style={{ color: C.navyDark }}>
              Message Sent!
            </h3>
            <p className="section-subtitle">
              Thank you for reaching out. Our team will respond within 1 business day. If you need urgent assistance, please call us directly at <strong>+27 11 123 4567</strong>.
            </p>
            <button type="button" onClick={() => setSubmitted(false)} className="ghost-button">
              Send Another Message
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                textAlign: 'center',
                marginBottom: 48,
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(20px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
              }}
            >
              <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>📬</span>
              <h2 className="section-title">Send Us a Message</h2>
              <p className="section-subtitle">
                Have a question about admissions, programmes, or student life? Fill in the form below and we&apos;ll get back to you within 1 business day.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="panel card-pad"
            >
              <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 16px', marginBottom: 20 }}>
                <Field label="Your Name" value={form.name} onChange={update('name')} error={errors.name} placeholder="e.g. Thabo Mokoena" icon="👤" />
                <Field label="Email Address" value={form.email} onChange={update('email')} error={errors.email} placeholder="your@email.com" icon="📧" />
                <Field label="Phone Number (optional)" value={form.phone} onChange={update('phone')} placeholder="+27 71 000 0000" icon="📱" />
                <Field label="Subject" value={form.subject} onChange={update('subject')} placeholder="e.g. Admission Enquiry" icon="💬" />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label className={`field-label ${errors.message ? 'error' : ''}`}>Your Message</label>
                <textarea
                  value={form.message}
                  onChange={update('message')}
                  rows={5}
                  placeholder="Tell us how we can help you…"
                  className={`text-area ${errors.message ? 'input-error' : ''}`}
                />
                {errors.message && <p className="error-text">⚠️ {errors.message}</p>}
              </div>

              <button type="submit" className="primary-button block-button">
                Send Message →
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

function Field({ label, value, onChange, error, placeholder, icon }) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label className={`field-label ${error ? 'error' : focused ? 'focused' : ''}`}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <span className="input-icon">{icon}</span>
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`text-input with-icon ${error ? 'input-error' : focused ? 'input-focused' : ''}`}
        />
      </div>
      {error && <p className="error-text">⚠️ {error}</p>}
    </div>
  );
}

function LocationHours() {
  const [ref, visible] = useReveal();
  const hours = [
    { day: 'Monday – Friday', time: '08:00 – 17:00', open: true },
    { day: 'Saturday', time: '09:00 – 13:00', open: true },
    { day: 'Sunday & Public Holidays', time: 'Closed', open: false },
  ];

  return (
    <section ref={ref} className="section-pad" style={{ background: C.white }}>
      <div className="page-container">
        <div
          style={{
            textAlign: 'center',
            marginBottom: 48,
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <h2 className="section-title">Visit Our Campus</h2>
          <p className="section-subtitle">
            Explore our facilities, meet our staff, and get a feel for life at National Deaf Technincal And Vocational Academy. Walk-ins welcome during office hours.
          </p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          <div
            className="panel"
            style={{
              overflow: 'hidden',
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
            }}
          >
            <div style={{ background: C.white, height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, borderBottom: `1px solid rgba(28,15,5,0.07)` }}>
              <span style={{ fontSize: 48 }}>🗺️</span>
              <span style={{ color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontSize: 14 }}>Interactive map placeholder</span>
            </div>
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>📍</span>
                <div>
                  <div className="card-heading">Our Address</div>
                  <div className="section-subtitle" style={{ textAlign: 'left', margin: 0 }}>
                    14 Mandela Drive
                    <br />
                    Soweto, Johannesburg
                    <br />
                    1804, South Africa
                  </div>
                </div>
              </div>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="ghost-button">
                Open in Google Maps →
              </a>
            </div>
          </div>

          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            <div className="panel" style={{ padding: '28px 32px', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 24 }}>🕐</span>
                <h3 className="card-heading" style={{ margin: 0 }}>Office Hours</h3>
              </div>
              {hours.map((h, i) => (
                <div key={i} className="hours-row">
                  <span className="hours-day">{h.day}</span>
                  <span className={`hours-time ${h.open ? 'open' : 'closed'}`}>{h.time}</span>
                </div>
              ))}
            </div>

            <div className="notice-box info-notice">
              <span style={{ fontSize: 24, flexShrink: 0 }}>ℹ️</span>
              <div>
                <div className="notice-title" style={{ color: C.info }}>Campus Tours Available</div>
                <div className="notice-copy">
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

function Footer() {
  const socials = [
    { icon: '📘', label: 'Facebook', url: '#' },
    { icon: '📷', label: 'Instagram', url: '#' },
    { icon: '🐦', label: 'Twitter', url: '#' },
    { icon: '💼', label: 'LinkedIn', url: '#' },
    { icon: '📺', label: 'YouTube', url: '#' },
  ];

  return (
    <footer style={{ background: C.navyDark, color: 'rgba(255,255,255,0.45)', padding: '60px 1rem 32px' }}>
      <div className="page-container">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div className="nav-mark" style={{ width: 42, height: 42, fontSize: 18 }}>SA</div>
              <div>
                <div style={{ fontFamily: '"DM Sans", sans-serif', color: '#fff', fontWeight: 700, fontSize: 14 }}>National Deaf Technincal And Vocational Academy</div>
                <div className="nav-subtitle">South Africa</div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, fontFamily: '"DM Sans", sans-serif', marginBottom: 16 }}>
              Empowering the Deaf and hard-of-hearing community through accessible, SASL-first education.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  title={s.label}
                  className="social-button"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Quick Links</h4>
            {['Home', 'Faculties', 'Campus Events', 'Code of Conduct', 'Apply Now'].map((l) => (
              <a key={l} href="#" className="footer-link">
                {l}
              </a>
            ))}
          </div>

          <div>
            <h4 className="footer-heading">Contact</h4>
            <div style={{ fontSize: 14, lineHeight: 1.9, fontFamily: '"DM Sans", sans-serif' }}>
              📍 14 Mandela Drive, Soweto
              <br />
              📞 +27 11 123 4567
              <br />
              📧 info@NDTAV.ac.za
              <br />
              🤟 SASL support available
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Accreditation</h4>
            <p style={{ fontSize: 13, lineHeight: 1.7, fontFamily: '"DM Sans", sans-serif' }}>
              Registered with the Department of Higher Education and Training (DHET). Programmes accredited by CHE and SAQA. Member of DeafSA.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span style={{ fontSize: 13, fontFamily: '"DM Sans", sans-serif' }}>
            © 2025 National Deaf Technincal And Vocational Academy · All Rights Reserved
          </span>
          <div className="footer-bottom-links">
            {['Privacy Policy', 'Terms of Use', 'Accessibility'].map((l) => (
              <a key={l} href="#" className="footer-mini-link">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function ContactPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700;1,9..144,900&family=DM+Sans:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.white}; }
        a { text-decoration: none; }
        button:focus-visible, a:focus-visible, input:focus-visible, textarea:focus-visible {
          outline: 2px solid ${C.accent};
          outline-offset: 2px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .page-container {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .section-pad {
          padding: 100px 1rem;
        }

        .hero-section {
          padding-top: 140px;
          padding-bottom: 80px;
        }

        .hero-shell {
          display: block;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 72px;
          gap: 1rem;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .nav-mark {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: linear-gradient(135deg, ${C.accent}, ${C.primary});
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "DM Sans", sans-serif;
          font-weight: 900;
          color: #fff;
          font-size: 20px;
          flex-shrink: 0;
        }

        .nav-title {
          font-family: "DM Sans", sans-serif;
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          line-height: 1.1;
          max-width: 400px;
        }

        .nav-subtitle {
          color: ${C.accent};
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .nav-links-wrap {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
          flex-wrap: wrap;
        }

        .nav-link {
          font-size: 13.5px;
          letter-spacing: 0.04em;
          font-family: "DM Sans", sans-serif;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-link:hover { color: ${C.accent} !important; }

        .nav-cta,
        .primary-button,
        .secondary-button,
        .ghost-button,
        .nav-mobile-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 10px;
          font-family: "DM Sans", sans-serif;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          cursor: pointer;
          border: none;
        }

        .nav-cta,
        .primary-button,
        .nav-mobile-cta {
          background: linear-gradient(135deg, ${C.accent}, ${C.primary});
          color: #fff;
          box-shadow: 0 6px 24px rgba(240,165,0,0.35);
        }

        .nav-cta { padding: 9px 22px; font-size: 13px; letter-spacing: 0.04em; }
        .primary-button { padding: 12px 28px; font-size: 14px; }
        .secondary-button {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          padding: 12px 28px;
          font-size: 14px;
          font-weight: 600;
        }

        .ghost-button {
          padding: 11px 20px;
          border: 1px solid ${C.border};
          background: transparent;
          color: ${C.primary};
          font-size: 14px;
        }

        .nav-toggle {
          display: none;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.14);
          color: #fff;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
        }

        .nav-mobile-panel {
          display: none;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 0 14px;
        }

        .nav-mobile-links {
          display: grid;
          gap: 10px;
          padding: 14px;
          background: rgba(15, 12, 58, 0.96);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
        }

        .nav-mobile-link {
          color: rgba(255,255,255,0.85);
          padding: 12px 14px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          font-family: "DM Sans", sans-serif;
          font-weight: 600;
        }

        .nav-mobile-cta {
          margin-top: 12px;
          width: 100%;
          padding: 12px 18px;
        }

        .breadcrumb-link,
        .breadcrumb-current {
          font-size: 13px;
          font-family: "DM Sans", sans-serif;
        }

        .breadcrumb-link {
          color: rgba(255,255,255,0.4);
        }

        .breadcrumb-current {
          color: ${C.accent};
          font-weight: 600;
        }

        .pill-text {
          color: ${C.accent};
          font-size: 12px;
          font-family: "DM Sans", sans-serif;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .contact-cards {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .small-label,
        .field-label {
          font-family: "DM Sans", sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 700;
          font-size: 12px;
          display: block;
          margin-bottom: 8px;
        }

        .small-label {
          color: rgba(255,255,255,0.4);
          margin-bottom: 6px;
        }

        .card-text {
          color: #fff;
          font-size: 14px;
          font-family: "DM Sans", sans-serif;
          font-weight: 600;
          line-height: 1.6;
          white-space: pre-line;
        }

        .section-title {
          font-family: "DM Sans", sans-serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 900;
          color: ${C.navyDark};
          margin: 0 0 12px;
        }

        .section-subtitle {
          color: ${C.textSecondary};
          font-size: 16px;
          font-family: "DM Sans", sans-serif;
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.75;
          text-align: center;
        }

        .panel {
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 8px 40px rgba(28,15,5,0.1);
          border: 1px solid rgba(28,15,5,0.07);
        }

        .card-pad {
          padding: 40px 48px;
        }

        .date-chip-group {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .chip-button,
        .time-button {
          border-radius: 12px;
          border: 1.5px solid rgba(28,15,5,0.15);
          background: #fff;
          cursor: pointer;
          transition: all 0.2s;
          font-family: "DM Sans", sans-serif;
          font-weight: 600;
        }

        .chip-button {
          padding: 12px 20px;
          font-size: 14px;
        }

        .time-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
          gap: 10px;
        }

        .time-button {
          padding: 12px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
        }

        .text-input,
        .text-area {
          width: 100%;
          border-radius: 12px;
          border: 1.5px solid rgba(28,15,5,0.15);
          font-family: "DM Sans", sans-serif;
          font-size: 15px;
          color: ${C.navyDark};
          background: ${C.white};
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .text-input {
          padding: 12px 16px;
        }

        .text-input.with-icon {
          padding-left: 42px;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
          opacity: 0.55;
          transition: opacity 0.2s;
        }

        .text-area {
          padding: 14px 16px;
          resize: vertical;
        }

        .input-focused {
          border-color: ${C.primary};
          box-shadow: 0 0 0 3px rgba(26,21,86,0.12);
        }

        .input-error {
          border-color: ${C.danger} !important;
          box-shadow: 0 0 0 3px rgba(192,57,43,0.10);
        }

        .field-label.focused,
        .field-label.error {
          transition: color 0.2s;
        }

        .field-label.focused {
          color: ${C.primary};
        }

        .field-label.error,
        .error-text {
          color: ${C.danger};
        }

        .error-text {
          font-size: 12px;
          font-family: "DM Sans", sans-serif;
          margin-top: 6px;
        }

        .notice-box {
          border-radius: 14px;
          padding: 16px 20px;
          margin-bottom: 24px;
          display: flex;
          gap: 12px;
        }

        .success-notice {
          background: ${C.success}0f;
          border: 1px solid ${C.success}30;
        }

        .info-notice {
          background: ${C.info}0f;
          border: 1px solid ${C.info}30;
        }

        .notice-title {
          font-family: "DM Sans", sans-serif;
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .notice-copy {
          font-family: "DM Sans", sans-serif;
          font-size: 13px;
          color: ${C.textSecondary};
          line-height: 1.7;
        }

        .success-card,
        .success-shell {
          background: ${C.successLight};
          border-radius: 20px;
          padding: 48px;
          text-align: center;
          border: 1px solid ${C.success}30;
        }

        .success-shell {
          max-width: 680px;
          margin: 0 auto;
          background: transparent;
          border: none;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: ${C.successLight};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 38px;
          margin: 0 auto 24px;
          border: 2px solid ${C.success}30;
        }

        .success-title {
          font-family: "DM Sans", sans-serif;
          font-size: 28px;
          font-weight: 900;
          margin: 0 0 12px;
          color: ${C.success};
        }

        .block-button {
          width: 100%;
          padding: 14px;
          font-size: 16px;
          border-radius: 12px;
        }

        .card-heading {
          font-family: "DM Sans", sans-serif;
          font-size: 18px;
          font-weight: 900;
          color: ${C.navyDark};
          margin-bottom: 6px;
        }

        .hours-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid rgba(28,15,5,0.07);
          gap: 16px;
        }

        .hours-row:last-child {
          border-bottom: none;
        }

        .hours-day {
          font-size: 14px;
          color: ${C.navyDark};
          font-family: "DM Sans", sans-serif;
          font-weight: 600;
        }

        .hours-time {
          font-size: 14px;
          font-family: "DM Sans", sans-serif;
          font-weight: 700;
          text-align: right;
        }

        .hours-time.open { color: ${C.success}; }
        .hours-time.closed { color: ${C.textSecondary}; }

        .social-button {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: background 0.2s;
        }

        .social-button:hover { background: rgba(255,255,255,0.15); }

        .footer-heading {
          color: #fff;
          font-family: "DM Sans", sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .footer-link,
        .footer-mini-link {
          display: block;
          color: rgba(255,255,255,0.5);
          font-family: "DM Sans", sans-serif;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-link {
          margin-bottom: 8px;
          font-size: 14px;
        }

        .footer-mini-link {
          font-size: 13px;
        }

        .footer-link:hover,
        .footer-mini-link:hover {
          color: ${C.accent};
        }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }

        @media (max-width: 1120px) {
          .hero-grid,
          .contact-grid,
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }

          .hero-grid {
            gap: 40px !important;
          }

          .footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 960px) {
          .nav-links-wrap { display: none; }
          .nav-toggle { display: inline-flex; align-items: center; justify-content: center; }
          .nav-mobile-panel { display: block; }
          .nav-title { max-width: 260px; font-size: 14px; }
          .section-pad { padding: 84px 1rem !important; }
          .hero-section { padding-top: 110px !important; padding-bottom: 64px !important; }
          .card-pad { padding: 28px 24px !important; }
          .booking-grid,
          .form-grid {
            grid-template-columns: 1fr !important;
          }
          .time-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 640px) {
          .nav-inner {
            min-height: 64px;
          }

          .nav-brand {
            gap: 10px;
          }

          .nav-mark {
            width: 38px;
            height: 38px;
            font-size: 16px;
          }

          .nav-title {
            max-width: 180px;
            font-size: 12.5px;
            line-height: 1.15;
          }

          .hero-shell {
            padding-left: 0;
            padding-right: 0;
          }

          .hero-grid {
            gap: 28px !important;
          }

          .hero-actions {
            flex-direction: column;
          }

          .hero-actions a,
          .primary-button,
          .secondary-button,
          .ghost-button,
          .nav-mobile-cta {
            width: 100%;
          }

          .quick-contact-card {
            padding: 16px !important;
            align-items: flex-start !important;
          }

          .contact-cards {
            gap: 12px;
          }

          .date-chip-group {
            gap: 8px;
          }

          .chip-button {
            flex: 1 1 calc(50% - 8px);
          }

          .section-title {
            font-size: clamp(1.8rem, 8vw, 2.5rem);
          }

          .section-subtitle {
            font-size: 15px;
          }

          .success-card,
          .success-shell {
            padding: 28px 20px;
          }

          .footer-grid {
            grid-template-columns: 1fr !important;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-bottom-links {
            flex-wrap: wrap;
            gap: 12px;
          }

          .notice-box {
            padding: 14px 16px;
            align-items: flex-start;
          }
        }

        button,
        input,
        textarea {
          font: inherit;
        }
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
