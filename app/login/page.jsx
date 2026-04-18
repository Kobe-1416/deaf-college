'use client';

import { useState, useEffect, useRef } from 'react';

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

// ─── Input field component ───────────────────────────────────────────────────
function Field({ label, type = 'text', placeholder, value, onChange, icon, error, hint, name }) {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === 'password';

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        display: 'block', fontSize: 12, fontWeight: 700,
        color: error ? C.danger : focused ? C.primary : C.textSecondary,
        fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.1em',
        textTransform: 'uppercase', marginBottom: 8,
        transition: 'color 0.2s',
      }}>{label}</label>

      <div style={{ position: 'relative' }}>
        {/* left icon */}
        <div style={{
          position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
          fontSize: 17, pointerEvents: 'none', opacity: focused ? 1 : 0.5,
          transition: 'opacity 0.2s',
        }}>{icon}</div>

        <input
          name={name}
          type={isPassword ? (showPass ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%', padding: '13px 46px 13px 44px',
            borderRadius: 12, fontFamily: '"DM Sans", sans-serif',
            fontSize: 15, color: C.navyDark, background: C.white,
            border: `1.5px solid ${error ? C.danger : focused ? C.primary : 'rgba(28,15,5,0.15)'}`,
            outline: 'none', boxSizing: 'border-box',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: focused ? `0 0 0 3px ${error ? C.danger + '20' : C.primary + '20'}` : 'none',
          }}
        />

        {/* password toggle */}
        {isPassword && (
          <button type="button" onClick={() => setShowPass(s => !s)} style={{
            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 16, opacity: 0.5, padding: 0,
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.target.style.opacity = 1}
            onMouseLeave={e => e.target.style.opacity = 0.5}
          >{showPass ? '🙈' : '👁️'}</button>
        )}
      </div>

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
          <span style={{ fontSize: 12 }}>⚠️</span>
          <span style={{ color: C.danger, fontSize: 12, fontFamily: '"DM Sans", sans-serif' }}>{error}</span>
        </div>
      )}
      {hint && !error && (
        <p style={{ color: C.textSecondary, fontSize: 12, fontFamily: '"DM Sans", sans-serif', marginTop: 6, opacity: 0.8 }}>{hint}</p>
      )}
    </div>
  );
}

// ─── Password strength meter ─────────────────────────────────────────────────
function PasswordStrength({ password }) {
  const checks = [
    { label: '8+ characters', pass: password.length >= 8 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'Number', pass: /[0-9]/.test(password) },
    { label: 'Special character', pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.pass).length;
  const colors = ['#ddd', C.danger, C.accent, C.accent, C.success];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  if (!password) return null;

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i < score ? colors[score] : '#e8e0d8',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {checks.map(c => (
            <span key={c.label} style={{
              fontSize: 11, fontFamily: '"DM Sans", sans-serif',
              color: c.pass ? C.success : C.textSecondary,
              display: 'flex', alignItems: 'center', gap: 4,
              transition: 'color 0.2s',
            }}>
              <span>{c.pass ? '✓' : '○'}</span>{c.label}
            </span>
          ))}
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, fontFamily: '"DM Sans", sans-serif',
          color: colors[score], transition: 'color 0.3s',
        }}>{labels[score]}</span>
      </div>
    </div>
  );
}

// ─── Login Form ──────────────────────────────────────────────────────────────
function LoginForm({ onSwitch }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.email.includes('@')) e.email = 'Please enter a valid email address.';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
  };

  if (success) return <SuccessState label="Signed In" message="Redirecting you to your student portal…" />;

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Field label="Email Address" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={set('email')} icon="📧" error={errors.email} />
      <Field label="Password" type="password" name="password" placeholder="Your password" value={form.password} onChange={set('password')} icon="🔒" error={errors.password} />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 28, marginTop: -12 }}>
        <button type="button" style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: C.primary, fontSize: 13, fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600, padding: 0, textDecoration: 'underline',
        }}>Forgot password?</button>
      </div>

      <SubmitButton loading={loading} label="Sign In to Portal" />

      <Divider />

      <SASLOption />

      <p style={{ textAlign: 'center', marginTop: 28, color: C.textSecondary, fontSize: 14, fontFamily: '"DM Sans", sans-serif' }}>
        Don't have an account?{' '}
        <button type="button" onClick={onSwitch} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: C.primary, fontWeight: 700, fontSize: 14,
          fontFamily: '"DM Sans", sans-serif', padding: 0,
        }}>Register here →</button>
      </p>
    </form>
  );
}

// ─── Registration Form ───────────────────────────────────────────────────────
function RegisterForm({ onSwitch }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', idNumber: '',
    phone: '', hearingStatus: '', programme: '', password: '', confirm: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const validateStep1 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim()) e.lastName = 'Last name is required.';
    if (!form.email.includes('@')) e.email = 'Enter a valid email address.';
    if (!form.idNumber.trim()) e.idNumber = 'ID / Passport number is required.';
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.hearingStatus) e.hearingStatus = 'Please select your hearing status.';
    if (!form.programme) e.programme = 'Please select a programme.';
    return e;
  };

  const validateStep3 = () => {
    const e = {};
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match.';
    return e;
  };

  const nextStep = () => {
    const errs = step === 1 ? validateStep1() : step === 2 ? validateStep2() : {};
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(s => s + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateStep3();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 2000);
  };

  if (success) return <SuccessState label="Application Submitted" message="Check your email for confirmation. Our admissions team will be in touch within 2 working days." />;

  return (
    <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }} style={{ width: '100%' }}>
      {/* Step indicator */}
      <StepIndicator current={step} />

      {/* Step 1: Personal details */}
      {step === 1 && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <p style={{ color: C.textSecondary, fontSize: 14, fontFamily: '"DM Sans", sans-serif', marginBottom: 24, lineHeight: 1.6 }}>
            Let's start with your personal information. All fields are required.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Field label="First Name" name="firstName" placeholder="e.g. Thabo" value={form.firstName} onChange={set('firstName')} icon="👤" error={errors.firstName} />
            <Field label="Last Name" name="lastName" placeholder="e.g. Mokoena" value={form.lastName} onChange={set('lastName')} icon="👤" error={errors.lastName} />
          </div>
          <Field label="Email Address" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={set('email')} icon="📧" error={errors.email} />
          <Field label="SA ID / Passport Number" name="idNumber" placeholder="e.g. 0001015009088" value={form.idNumber} onChange={set('idNumber')} icon="🪪" error={errors.idNumber} hint="Your ID number is used for official academic records only." />
          <Field label="Phone / WhatsApp (optional)" type="tel" name="phone" placeholder="+27 71 000 0000" value={form.phone} onChange={set('phone')} icon="📱" />
        </div>
      )}

      {/* Step 2: Academic details */}
      {step === 2 && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <p style={{ color: C.textSecondary, fontSize: 14, fontFamily: '"DM Sans", sans-serif', marginBottom: 24, lineHeight: 1.6 }}>
            Tell us about your hearing status and the programme you're interested in.
          </p>

          {/* Hearing status */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: 'block', fontSize: 12, fontWeight: 700,
              color: errors.hearingStatus ? C.danger : C.textSecondary,
              fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: 12,
            }}>Hearing Status</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { value: 'deaf', label: 'Deaf', icon: '🤟', desc: 'No functional hearing' },
                { value: 'hard-of-hearing', label: 'Hard of Hearing', icon: '👂', desc: 'Partial hearing loss' },
                { value: 'hearing', label: 'Hearing', icon: '🎧', desc: 'Full hearing — e.g. interpreter students' },
                { value: 'deafblind', label: 'DeafBlind', icon: '✋', desc: 'Combined hearing & vision loss' },
              ].map(opt => (
                <label key={opt.value} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px',
                  borderRadius: 12, cursor: 'pointer',
                  border: `1.5px solid ${form.hearingStatus === opt.value ? C.primary : 'rgba(28,15,5,0.13)'}`,
                  background: form.hearingStatus === opt.value ? `${C.primary}0f` : '#fff',
                  transition: 'border-color 0.2s, background 0.2s',
                }}>
                  <input type="radio" name="hearingStatus" value={opt.value} checked={form.hearingStatus === opt.value}
                    onChange={set('hearingStatus')} style={{ display: 'none' }} />
                  <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>{opt.icon}</span>
                  <div>
                    <div style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14, color: form.hearingStatus === opt.value ? C.primary : C.navyDark }}>{opt.label}</div>
                    <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 12, color: C.textSecondary, marginTop: 2 }}>{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>
            {errors.hearingStatus && <p style={{ color: C.danger, fontSize: 12, fontFamily: '"DM Sans", sans-serif', marginTop: 8 }}>⚠️ {errors.hearingStatus}</p>}
          </div>

          {/* Programme select */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block', fontSize: 12, fontWeight: 700,
              color: errors.programme ? C.danger : C.textSecondary,
              fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: 8,
            }}>Programme of Interest</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 17, pointerEvents: 'none' }}>🎓</span>
              <select value={form.programme} onChange={set('programme')} style={{
                width: '100%', padding: '13px 44px', borderRadius: 12,
                border: `1.5px solid ${errors.programme ? C.danger : 'rgba(28,15,5,0.15)'}`,
                outline: 'none', fontFamily: '"DM Sans", sans-serif', fontSize: 15,
                color: form.programme ? C.navyDark : C.textSecondary,
                background: C.white, appearance: 'none', cursor: 'pointer',
                boxSizing: 'border-box',
              }}>
                <option value="">— Select a programme —</option>
                <optgroup label="Technology & Computing">
                  <option>National Diploma: Software Development</option>
                  <option>Short Course: UI/UX & Accessible Design</option>
                  <option>Certificate: IT Technician & Networking</option>
                </optgroup>
                <optgroup label="Business & Management">
                  <option>National Diploma: Business Management</option>
                  <option>Higher Certificate: Bookkeeping & Finance</option>
                  <option>Short Course: Digital Marketing</option>
                </optgroup>
                <optgroup label="Health & Community Services">
                  <option>National Diploma: Social Auxiliary Work</option>
                  <option>Certificate: SASL Interpreting</option>
                </optgroup>
                <optgroup label="Creative Arts">
                  <option>National Diploma: Visual Communication Design</option>
                  <option>Short Course: Sign Language Performance Arts</option>
                </optgroup>
              </select>
              <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, pointerEvents: 'none', opacity: 0.5 }}>▼</span>
            </div>
            {errors.programme && <p style={{ color: C.danger, fontSize: 12, fontFamily: '"DM Sans", sans-serif', marginTop: 8 }}>⚠️ {errors.programme}</p>}
          </div>
        </div>
      )}

      {/* Step 3: Set password */}
      {step === 3 && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <p style={{ color: C.textSecondary, fontSize: 14, fontFamily: '"DM Sans", sans-serif', marginBottom: 24, lineHeight: 1.6 }}>
            Almost done. Create a strong password to secure your portal account.
          </p>
          <Field label="Create Password" type="password" name="password" placeholder="Min. 8 characters" value={form.password} onChange={set('password')} icon="🔒" error={errors.password} />
          <PasswordStrength password={form.password} />
          <Field label="Confirm Password" type="password" name="confirm" placeholder="Repeat your password" value={form.confirm} onChange={set('confirm')} icon="🔒" error={errors.confirm} />

          {/* Terms */}
          <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 28, cursor: 'pointer' }}>
            <input type="checkbox" required style={{ marginTop: 3, accentColor: C.primary, width: 16, height: 16, flexShrink: 0 }} />
            <span style={{ color: C.textSecondary, fontSize: 13, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.65 }}>
              I agree to National Deaf Technincal And Vocational Academy's{' '}
              <a href="/code-of-conduct" style={{ color: C.primary, fontWeight: 700 }}>Code of Conduct</a>
              {' '}and{' '}
              <a href="#" style={{ color: C.primary, fontWeight: 700 }}>Privacy Policy</a>.
              I consent to my information being used for academic and administrative purposes.
            </span>
          </label>
        </div>
      )}

      {/* Navigation buttons */}
      <div style={{ display: 'flex', gap: 12, justifyContent: step > 1 ? 'space-between' : 'flex-end' }}>
        {step > 1 && (
          <button type="button" onClick={() => setStep(s => s - 1)} style={{
            padding: '13px 28px', borderRadius: 12, border: `1.5px solid rgba(28,15,5,0.15)`,
            background: 'transparent', color: C.textSecondary,
            fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 15,
            cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { e.target.style.borderColor = C.primary; e.target.style.color = C.primary; }}
            onMouseLeave={e => { e.target.style.borderColor = 'rgba(28,15,5,0.15)'; e.target.style.color = C.textSecondary; }}
          >← Back</button>
        )}
        {step < 3 ? (
          <button type="submit" style={{
            flex: step === 1 ? '1' : 'unset',
            padding: '13px 32px', borderRadius: 12, border: 'none', cursor: 'pointer',
            background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
            color: '#fff', fontFamily: '"DM Sans", sans-serif', fontWeight: 700,
            fontSize: 15, letterSpacing: '0.03em',
            boxShadow: `0 6px 24px rgba(240,165,0,0.35)`,
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = `0 10px 32px rgba(240,165,0,0.45)`; }}
            onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = `0 6px 24px rgba(240,165,0,0.35)`; }}
          >Continue →</button>
        ) : (
          <SubmitButton loading={loading} label="Submit Application" />
        )}
      </div>

      <p style={{ textAlign: 'center', marginTop: 28, color: C.textSecondary, fontSize: 14, fontFamily: '"DM Sans", sans-serif' }}>
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: C.primary, fontWeight: 700, fontSize: 14,
          fontFamily: '"DM Sans", sans-serif', padding: 0,
        }}>Sign in →</button>
      </p>
    </form>
  );
}

// ─── Step Indicator ──────────────────────────────────────────────────────────
function StepIndicator({ current }) {
  const steps = ['Personal Details', 'Academic Info', 'Set Password'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'unset' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                background: done ? C.success : active ? `linear-gradient(135deg, ${C.accent}, ${C.primary})` : 'rgba(28,15,5,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"DM Sans", sans-serif', fontWeight: 800, fontSize: 13,
                color: done || active ? '#fff' : C.textSecondary,
                transition: 'background 0.3s',
                boxShadow: active ? `0 4px 16px rgba(240,165,0,0.4)` : 'none',
              }}>
                {done ? '✓' : idx}
              </div>
              <span style={{
                fontSize: 10, fontFamily: '"DM Sans", sans-serif',
                fontWeight: active ? 700 : 500,
                color: active ? C.primary : done ? C.success : C.textSecondary,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                whiteSpace: 'nowrap', transition: 'color 0.3s',
              }}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                flex: 1, height: 2, margin: '-20px 8px 0', borderRadius: 2,
                background: done ? C.success : 'rgba(28,15,5,0.1)',
                transition: 'background 0.3s',
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Submit Button ───────────────────────────────────────────────────────────
function SubmitButton({ loading, label }) {
  return (
    <button type="submit" disabled={loading} style={{
      width: '100%', padding: '15px', borderRadius: 12, border: 'none',
      background: loading ? 'rgba(28,15,5,0.1)' : `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
      color: loading ? C.textSecondary : '#fff',
      fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 16,
      letterSpacing: '0.03em', cursor: loading ? 'not-allowed' : 'pointer',
      boxShadow: loading ? 'none' : `0 8px 32px rgba(240,165,0,0.35)`,
      transition: 'all 0.3s',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    }}>
      {loading ? (
        <>
          <div style={{
            width: 18, height: 18, border: `2px solid ${C.textSecondary}`,
            borderTopColor: 'transparent', borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
          }} />
          Verifying…
        </>
      ) : label}
    </button>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(28,15,5,0.1)' }} />
      <span style={{ color: C.textSecondary, fontSize: 12, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, letterSpacing: '0.06em' }}>OR CONTINUE WITH</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(28,15,5,0.1)' }} />
    </div>
  );
}

// ─── SASL Video Option ───────────────────────────────────────────────────────
function SASLOption() {
  return (
    <button type="button" style={{
      width: '100%', padding: '13px', borderRadius: 12,
      border: `1.5px solid rgba(28,15,5,0.15)`,
      background: '#fff', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14, color: C.navyDark,
      transition: 'border-color 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.target.style.borderColor = C.accent; e.target.style.boxShadow = `0 0 0 3px ${C.accent}22`; }}
      onMouseLeave={e => { e.target.style.borderColor = 'rgba(28,15,5,0.15)'; e.target.style.boxShadow = 'none'; }}
    >
      <span style={{ fontSize: 20 }}>🤟</span>
      SASL Video Verification
    </button>
  );
}

// ─── Success State ───────────────────────────────────────────────────────────
function SuccessState({ label, message }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', animation: 'fadeIn 0.5s ease' }}>
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: C.successLight, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 38, margin: '0 auto 24px',
        border: `2px solid ${C.success}30`,
        animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}>🤟</div>
      <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 28, fontWeight: 900, color: C.navyDark, margin: '0 0 12px' }}>
        {label}!
      </h3>
      <p style={{ color: C.textSecondary, fontSize: 15, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.75, marginBottom: 32 }}>
        {message}
      </p>
      <a href="/" style={{
        display: 'inline-block',
        background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
        color: '#fff', padding: '12px 32px', borderRadius: 10,
        fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 15,
        textDecoration: 'none', boxShadow: `0 6px 24px rgba(240,165,0,0.35)`,
      }}>Back to Home</a>
    </div>
  );
}

// ─── Left Panel ───────────────────────────────────────────────────────────────
function LeftPanel({ mode }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const quotes = [
    { text: '"Education is the most powerful weapon which you can use to change the world."', author: 'Nelson Mandela' },
    { text: '"In Sign Language, our hands are our voice and movement is our expression."', author: 'National Deaf Technincal And Vocational Academy Ethos' },
    { text: '"Ubuntu: I am because we are. Every National Deaf Technincal And Vocational student belongs to something greater."', author: 'Campus Community' },
  ];
  const [qIndex] = useState(() => Math.floor(Math.random() * quotes.length));

  return (
    <div style={{
      background: C.navyDark, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '56px 48px',
      height: '100%',
    }}>
      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05,
        backgroundImage: `radial-gradient(circle, ${C.accent} 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }} />
      {/* Glow orbs */}
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${C.primary}30 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-5%', left: '-10%', width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle, ${C.accent}20 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14, position: 'relative',
        opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(-12px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}>
        <div style={{
          width: 50, height: 50, borderRadius: 14,
          background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: '"DM Sans", sans-serif', fontWeight: 900, color: '#fff', fontSize: 22,
          boxShadow: `0 8px 24px rgba(240,165,0,0.4)`,
        }}>SA</div>
        <div>
          <div style={{ fontFamily: '"DM Sans", sans-serif', color: '#fff', fontWeight: 700, fontSize: 17, lineHeight: 1.1 }}>National Deaf Technincal And Vocational Academy</div>
          <div style={{ color: C.accent, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 3 }}>Student Portal</div>
        </div>
      </div>

      {/* Main message */}
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 0' }}>
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
        }}>
          <span style={{
            display: 'inline-block', background: `${C.accent}20`, border: `1px solid ${C.accent}35`,
            color: C.accent, fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 800,
            letterSpacing: '0.16em', textTransform: 'uppercase', padding: '5px 16px', borderRadius: 100, marginBottom: 28,
          }}>
            {mode === 'login' ? '👋 Welcome Back' : '🎓 Join Our Community'}
          </span>

          <h2 style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 'clamp(2rem, 3.2vw, 3rem)',
            fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: '0 0 20px',
          }}>
            {mode === 'login' ? (
              <>Your portal,<br /><span style={{ color: C.accent, fontStyle: 'italic' }}>your future</span></>
            ) : (
              <>Begin your<br /><span style={{ color: C.accent, fontStyle: 'italic' }}>journey here</span></>
            )}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.8, maxWidth: 320 }}>
            {mode === 'login'
              ? 'Access your coursework, timetable, results, and campus resources — all in one place, fully accessible in SASL.'
              : 'Create your account to apply for a programme, access SASL learning resources, and become part of the National Deaf Technincal And Vocational family.'}
          </p>
        </div>

        {/* Feature pills */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 12, marginTop: 36,
          opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease 0.3s',
        }}>
          {[
            { icon: '🤟', text: 'SASL video resources & support' },
            { icon: '📋', text: 'Course materials & timetables' },
            { icon: '💳', text: 'Fees, bursaries & payment via Stripe' },
            { icon: '🏆', text: 'Results, achievements & transcripts' },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: 'rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              }}>{icon}</div>
              <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, fontFamily: '"DM Sans", sans-serif' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div style={{
        position: 'relative', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 28,
        opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease 0.4s',
      }}>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontStyle: 'italic', fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: '0 0 10px' }}>
          {quotes[qIndex].text}
        </p>
        <p style={{ color: C.accent, fontSize: 12, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: '0.08em', margin: 0 }}>
          — {quotes[qIndex].author}
        </p>
      </div>
    </div>
  );
}

// ─── Page Root ───────────────────────────────────────────────────────────────
export default function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700;1,9..144,900&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        body { background: ${C.white}; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        input::placeholder { color: rgba(122,101,88,0.55); }
        select option { color: ${C.navyDark}; background: #fff; }

        button:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; }
        a:focus-visible      { outline: 2px solid ${C.accent}; outline-offset: 2px; }

        @media (max-width: 860px) {
          .auth-grid { grid-template-columns: 1fr !important; }
          .left-panel { display: none !important; }
          .auth-wrapper { min-height: 100vh !important; }
        }
      `}</style>

      <div style={{ minHeight: '150vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="auth-grid">

        {/* ── Left decorative panel ── */}
        <div className="left-panel" style={{ position: 'sticky', top: 0, height: '100%',  }}>
          <LeftPanel mode={mode} />
        </div>

        {/* ── Right form panel ── */}
        <div style={{
          background: C.white,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '10px 48px',
          minHeight: '100vh',
          boxSizing: 'border-box',
           
        }} className="auth-wrapper">

          {/* Back to site */}
          <div style={{ width: '100%', maxWidth: 480, marginBottom: 32 }}>
            <a href="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: C.textSecondary, fontSize: 13, fontFamily: '"DM Sans", sans-serif',
              textDecoration: 'none', fontWeight: 600,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = C.primary}
              onMouseLeave={e => e.target.style.color = C.textSecondary}
            >← Back to National Deaf Technincal And Vocational.ac.za</a>
          </div>

          {/* Form card */}
          <div style={{
            width: '100%', maxWidth: 480,
            background: '#fff', borderRadius: 24,
            boxShadow: '0 8px 48px rgba(28,15,5,0.1)',
            border: '1px solid rgba(28,15,5,0.07)',
            padding: '40px 44px',
            animation: 'slideLeft 0.4s ease',
             
          }} key={mode}>

            {/* Mode toggle tabs */}
            <div style={{
              display: 'flex', background: C.white, borderRadius: 14,
              padding: 5, marginBottom: 36, gap: 4,
            }}>
              {[['login', '🔑 Sign In'], ['register', '📝 Register']].map(([m, label]) => (
                <button key={m} type="button" onClick={() => setMode(m)} style={{
                  flex: 1, padding: '10px', borderRadius: 10, border: 'none',
                  cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 700, fontSize: 14, letterSpacing: '0.02em',
                  background: mode === m ? '#fff' : 'transparent',
                  color: mode === m ? C.navyDark : C.textSecondary,
                  boxShadow: mode === m ? '0 2px 12px rgba(28,15,5,0.1)' : 'none',
                  transition: 'all 0.25s ease',
                }}>{label}</button>
              ))}
            </div>

            {/* Heading */}
            <div style={{ marginBottom: 32 }}>
              <h1 style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: 28, fontWeight: 900,
                color: C.navyDark, margin: '0 0 8px', lineHeight: 1.15,
              }}>
                {mode === 'login' ? 'Welcome back 👋' : 'Create your account'}
              </h1>
              <p style={{ color: C.textSecondary, fontSize: 14, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.6 }}>
                {mode === 'login'
                  ? 'Sign in to access your student portal, coursework, and SASL resources.'
                  : 'Join National Deaf Technincal And Vocational Academy. All fields are handled securely via our encrypted portal.'}
              </p>
            </div>

            {mode === 'login'
              ? <LoginForm onSwitch={() => setMode('register')} />
              : <RegisterForm onSwitch={() => setMode('login')} />
            }
          </div>

          {/* Footer note */}
          <p style={{ marginTop: 28, color: C.textSecondary, fontSize: 12, fontFamily: '"DM Sans", sans-serif', textAlign: 'center', opacity: 0.7, maxWidth: 400 }}>
            🔒 Your data is encrypted and protected. National Deaf Technincal And Vocational Academy is POPIA compliant. <br />
            Need help? Email <a href="mailto:support@NDTAV.ac.za" style={{ color: C.primary }}>support@NDTAV.ac.za</a> or book a 🤟 SASL video call.
          </p>
        </div>
      </div>
    </>
  );
}
