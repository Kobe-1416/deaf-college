'use client';

import { useState, useEffect } from 'react';

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


// ─── Mock student data ────────────────────────────────────────────────────────
const STUDENT = {
  name: 'Thabo Mokoena',
  initials: 'TM',
  id: 'SKH-2024-00412',
  programme: 'National Diploma: Software Development',
  faculty: 'Technology & Computing',
  year: '2nd Year',
  status: 'Active',
  hearingStatus: 'Deaf',
  email: 'thabo.mokoena@students.National Deaf Technincal And Vocational.ac.za',
  phone: '+27 71 234 5678',
  dob: '12 January 2002',
  idNumber: '020112 5009 088',
  address: '14 Ntuli Street, Soweto, Johannesburg, 1804',
  emergencyContact: 'Nomsa Mokoena (Mother) · +27 82 000 1111',
  advisor: 'Ms. Lindiwe Dube',
  gpa: '74%',
  credits: 180,
  outstanding: 'R 4 200.00',
  parkingPermit: 'Active · Bay 3B',
};

const COURSES = [
  { code: 'SD301', name: 'Advanced Web Technologies', credits: 16, progress: 72, grade: '76%', lecturer: 'Mr. Sipho Nkosi', day: 'Mon/Wed', time: '09:00–11:00', room: 'Tech Lab 2', status: 'In Progress', color:  C.primary },
  { code: 'SD302', name: 'Database Design & SQL', credits: 12, progress: 58, grade: '69%', lecturer: 'Ms. Fatima Jardim', day: 'Tue/Thu', time: '11:00–13:00', room: 'Tech Lab 1', status: 'In Progress', color:  C.info },
  { code: 'SD303', name: 'Mobile App Development', credits: 16, progress: 45, grade: '81%', lecturer: 'Mr. James Sithole', day: 'Wed/Fri', time: '14:00–16:00', room: 'Tech Lab 3', status: 'In Progress', color:  C.success },
  { code: 'SD304', name: 'Software Engineering Principles', credits: 12, progress: 90, grade: '73%', lecturer: 'Dr. Ayesha Patel', day: 'Mon/Thu', time: '13:00–14:30', room: 'Room 204', status: 'In Progress', color: C.purple },
  { code: 'GEN201', name: 'SASL Communication & Linguistics', credits: 8, progress: 100, grade: '88%', lecturer: 'Ms. Zanele Khumalo', day: 'Fri', time: '09:00–11:00', room: 'Auditorium B', status: 'Complete', color:  C.accent },
];

const TIMETABLE = {
  Mon: [
    { code: 'SD301', name: 'Advanced Web Technologies', time: '09:00–11:00', room: 'Tech Lab 2', color:  C.primary },
    { code: 'SD304', name: 'Software Engineering', time: '13:00–14:30', room: 'Room 204', color: C.purple },
  ],
  Tue: [
    { code: 'SD302', name: 'Database Design & SQL', time: '11:00–13:00', room: 'Tech Lab 1', color:  C.info },
  ],
  Wed: [
    { code: 'SD301', name: 'Advanced Web Technologies', time: '09:00–11:00', room: 'Tech Lab 2', color:  C.primary },
    { code: 'SD303', name: 'Mobile App Development', time: '14:00–16:00', room: 'Tech Lab 3', color:  C.success },
  ],
  Thu: [
    { code: 'SD302', name: 'Database Design & SQL', time: '11:00–13:00', room: 'Tech Lab 1', color:  C.info },
    { code: 'SD304', name: 'Software Engineering', time: '13:00–14:30', room: 'Room 204', color: C.purple },
  ],
  Fri: [
    { code: 'GEN201', name: 'SASL Communication', time: '09:00–11:00', room: 'Auditorium B', color:  C.accent },
    { code: 'SD303', name: 'Mobile App Development', time: '14:00–16:00', room: 'Tech Lab 3', color:  C.success },
  ],
};

const PAYMENTS = [
  { id: 'INV-2024-001', desc: 'Tuition Fee — Semester 1', amount: 'R 14 250.00', date: '15 Jan 2024', status: 'Paid', method: 'EFT' },
  { id: 'INV-2024-002', desc: 'Registration Fee 2024', amount: 'R 800.00', date: '10 Jan 2024', status: 'Paid', method: 'Card' },
  { id: 'INV-2024-003', desc: 'Parking Permit — Annual', amount: 'R 1 200.00', date: '10 Jan 2024', status: 'Paid', method: 'EFT' },
  { id: 'INV-2024-004', desc: 'Tuition Fee — Semester 2', amount: 'R 14 250.00', date: '15 Jul 2024', status: 'Outstanding', method: '—' },
  { id: 'INV-2024-005', desc: 'Library Access Fee', amount: 'R 350.00', date: '15 Jul 2024', status: 'Outstanding', method: '—' },
  { id: 'BUR-2024-001', desc: 'NSFAS Bursary Credit — Sem 1', amount: '- R 10 200.00', date: '20 Jan 2024', status: 'Applied', method: 'NSFAS' },
];

const CLUBS = [
  { name: 'Tech & Coding Society', icon: '💻', members: 48, status: 'Member', meetings: 'Every Tuesday 15:00', category: 'Academic', color:  C.info },
  { name: 'Deaf Football Club', icon: '⚽', members: 22, status: 'Member', meetings: 'Mon & Thu 16:00', category: 'Sports', color:  C.primary },
  { name: 'SASL Drama & Arts', icon: '🎭', members: 31, status: 'Not Joined', meetings: 'Wednesday 14:00', category: 'Cultural', color: C.purple },
  { name: 'Student Representative Council', icon: '🏛️', members: 15, status: 'Not Joined', meetings: 'Bi-weekly Fri 13:00', category: 'Governance', color:  C.accent },
  { name: 'Chess & Esports Club', icon: '♟️', members: 19, status: 'Member', meetings: 'Friday 15:00', category: 'Recreation', color:  C.success },
  { name: 'Deaf Entrepreneurs Circle', icon: '🚀', members: 27, status: 'Not Joined', meetings: 'Thursday 17:00', category: 'Business', color: C.rust },
];

const COMMS = [
  { from: 'Academic Registrar', subject: 'Semester 2 Examination Timetable Released', date: '2 Jul 2024', read: false, priority: 'high', body: 'Dear Student, please note that the Semester 2 examination timetable is now available on the portal. Examinations commence 12 August 2024. SASL-assisted examinations must be booked by 19 July.' },
  { from: 'Ms. Lindiwe Dube (Academic Advisor)', subject: 'Mid-year academic review — please schedule a meeting', date: '28 Jun 2024', read: false, priority: 'normal', body: 'Hi Thabo, I would like to schedule your mid-year academic review. Please use the portal to book a slot that suits you. SASL video meetings are available.' },
  { from: 'Finance Department', subject: 'Reminder: Semester 2 fees due 15 July 2024', date: '25 Jun 2024', read: true, priority: 'high', body: 'This is a reminder that your Semester 2 tuition fees of R14 250.00 are due by 15 July 2024. Upload proof of payment or contact the finance office. NSFAS students: ensure your registration is confirmed.' },
  { from: 'Student Affairs', subject: "SASL Storytelling Festival — Don't miss it!", date: '20 Jun 2024', read: true, priority: 'low', body: 'Join us on 8 March for the annual SASL Storytelling Festival in the Main Auditorium. Sign up to perform or volunteer. All are welcome.' },
  { from: 'IT Support', subject: 'Student portal maintenance — Sunday 30 Jun 02:00–04:00', date: '18 Jun 2024', read: true, priority: 'normal', body: 'Please note the student portal will be unavailable for maintenance on Sunday 30 June between 02:00 and 04:00. Any inconvenience is regretted.' },
];

const MODULES_AVAILABLE = [
  { code: 'SD401', name: 'Cloud Computing & DevOps', credits: 16, semester: '1', prereq: 'SD301', available: true },
  { code: 'SD402', name: 'Artificial Intelligence Fundamentals', credits: 12, semester: '1', prereq: 'SD302', available: true },
  { code: 'SD403', name: 'Cybersecurity Essentials', credits: 12, semester: '1', prereq: 'None', available: true },
  { code: 'SD404', name: 'Final Year Project (WIL)', credits: 24, semester: '1 & 2', prereq: 'SD301, SD302, SD303', available: false },
  { code: 'GEN301', name: 'Research Methods', credits: 8, semester: '2', prereq: 'None', available: true },
];

// ─── Shared UI primitives ─────────────────────────────────────────────────────
const Badge = ({ label, color, bg, size = 12 }) => (
  <span style={{
    background: bg || `${color}18`, color: color,
    fontSize: size, fontFamily: '"DM Sans", sans-serif', fontWeight: 800,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    padding: '3px 10px', borderRadius: 100, whiteSpace: 'nowrap',
  }}>{label}</span>
);

const Card = ({ children, style = {} }) => (
  <div style={{
    background: '#fff', borderRadius: 18,
    border: `1px solid ${C.border}`,
    boxShadow: '0 2px 16px rgba(28,15,5,0.06)',
    ...style,
  }}>{children}</div>
);

const SectionTitle = ({ icon, title, sub }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: sub ? 6 : 0 }}>
      <span style={{ fontSize: 22 }}>{icon}</span>
      <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 22, fontWeight: 900, color:  C.navyDark, margin: 0 }}>{title}</h2>
    </div>
    {sub && <p style={{ color:  C.textSecondary, fontSize: 14, fontFamily: '"DM Sans", sans-serif', margin: 0, paddingLeft: 32 }}>{sub}</p>}
  </div>
);

function ProgressBar({ value, color }) {
  return (
    <div style={{ background: 'rgba(28,15,5,0.08)', borderRadius: 4, height: 6, width: '100%' }}>
      <div style={{ height: '100%', borderRadius: 4, background: color, width: `${value}%`, transition: 'width 0.6s ease' }} />
    </div>
  );
}

// ─── Tab views ────────────────────────────────────────────────────────────────

function MyCourses() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div>
      <SectionTitle icon="📚" title="My Courses" sub="Semester 2 · 2024 — 5 enrolled modules · 64 credits" />

      {/* Summary strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Enrolled', value: '5', color:  C.info, icon: '📋' },
          { label: 'In Progress', value: '4', color:  C.accent, icon: '🔄' },
          { label: 'Complete', value: '1', color:  C.success, icon: '✅' },
          { label: 'Avg Grade', value: '77%', color:  C.primary, icon: '🎯' },
        ].map(s => (
          <Card key={s.label} style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{s.icon}</div>
            <div>
              <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 22, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Course cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {COURSES.map((c, i) => (
          <Card key={c.code} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', cursor: 'pointer', gap: 16 }}
              onClick={() => setExpanded(expanded === i ? null : i)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 0 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: `${c.color}18`, border: `1px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 11, fontWeight: 900, color: c.color }}>{c.code}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                    <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 16, fontWeight: 800, color:  C.navyDark }}>{c.name}</span>
                    <Badge label={c.status} color={c.status === 'Complete' ?  C.success :  C.accent} />
                  </div>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>👤 {c.lecturer}</span>
                    <span style={{ fontSize: 12, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>🏫 {c.room}</span>
                    <span style={{ fontSize: 12, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>⏰ {c.day} · {c.time}</span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 20, fontWeight: 900, color: c.color }}>{c.grade}</div>
                <div style={{ fontSize: 11, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>{c.credits} credits</div>
              </div>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: `${c.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform 0.3s', transform: expanded === i ? 'rotate(180deg)' : 'none' }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 4L5.5 7.5L9 4" stroke={c.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ padding: '0 24px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>Course progress</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: c.color, fontFamily: '"DM Sans", sans-serif' }}>{c.progress}%</span>
              </div>
              <ProgressBar value={c.progress} color={c.color} />
            </div>

            {/* Expanded panel */}
            {expanded === i && (
              <div style={{ borderTop: `1px solid ${C.border}`, padding: '20px 24px', background:  C.white, animation: 'fadeIn 0.25s ease' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 16 }}>
                  {[
                    { label: 'Assignments', value: '4 / 5 submitted' },
                    { label: 'Tests', value: '2 / 3 written' },
                    { label: 'Attendance', value: '92%' },
                  ].map(m => (
                    <div key={m.label} style={{ background: '#fff', borderRadius: 10, padding: '12px 14px', border: `1px solid ${C.border}` }}>
                      <div style={{ fontSize: 11, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{m.label}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color:  C.navyDark, fontFamily: '"DM Sans", sans-serif' }}>{m.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button style={{ padding: '9px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', background: c.color, color: '#fff', fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 13 }}>Course Materials</button>
                  <button style={{ padding: '9px 20px', borderRadius: 10, border: `1px solid ${C.border}`, cursor: 'pointer', background: '#fff', color:  C.navyDark, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 13 }}>Assignments</button>
                  <button style={{ padding: '9px 20px', borderRadius: 10, border: `1px solid ${C.border}`, cursor: 'pointer', background: '#fff', color:  C.navyDark, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 13 }}>Results Breakdown</button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function Timetable() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const today = days[new Date().getDay() - 1] || 'Mon';
  const [activeDay, setActiveDay] = useState(today);

  return (
    <div>
      <SectionTitle icon="🗓️" title="My Timetable" sub="Current semester weekly schedule — all sessions have SASL support" />

      {/* Day selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, background: '#fff', borderRadius: 16, padding: 6, border: `1px solid ${C.border}`, width: 'fit-content' }}>
        {days.map(d => (
          <button key={d} onClick={() => setActiveDay(d)} style={{
            padding: '10px 22px', borderRadius: 11, border: 'none', cursor: 'pointer',
            background: activeDay === d ? `linear-gradient(135deg, ${ C.accent}, ${ C.primary})` : 'transparent',
            color: activeDay === d ? '#fff' :  C.textSecondary,
            fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14,
            boxShadow: activeDay === d ? `0 4px 16px rgba(240,165,0,0.3)` : 'none',
            transition: 'all 0.2s',
          }}>
            {d}
            {d === today && <span style={{ marginLeft: 6, fontSize: 9, background: activeDay === d ? 'rgba(255,255,255,0.3)' :  C.success, color: '#fff', padding: '1px 5px', borderRadius: 4 }}>Today</span>}
          </button>
        ))}
      </div>

      {/* Sessions for active day */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
        {(TIMETABLE[activeDay] || []).length === 0 && (
          <Card style={{ padding: '40px', textAlign: 'center', color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>
            No classes scheduled for {activeDay}. 🎉
          </Card>
        )}
        {(TIMETABLE[activeDay] || []).map((s, i) => (
          <Card key={i} style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20, borderLeft: `4px solid ${s.color}` }}>
            <div style={{ textAlign: 'center', minWidth: 72 }}>
              <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 15, fontWeight: 900, color: s.color }}>{s.time.split('–')[0]}</div>
              <div style={{ fontSize: 11, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>–{s.time.split('–')[1]}</div>
            </div>
            <div style={{ width: 1, height: 40, background: C.border }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, color:  C.navyDark, fontSize: 16 }}>{s.name}</div>
              <div style={{ fontSize: 13, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', marginTop: 3 }}>{s.code} · {s.room}</div>
            </div>
            <Badge label="SASL Supported" color={ C.success} />
          </Card>
        ))}
      </div>

      {/* Full week compact grid */}
      <SectionTitle icon="📅" title="Full Week Overview" />
      <Card style={{ padding: '20px 24px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {days.map(d => (
                <th key={d} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 12, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, color: d === today ?  C.primary :  C.textSecondary, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: `2px solid ${d === today ?  C.accent : C.border}` }}>
                  {d} {d === today && '·Today'}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {days.map(d => (
                <td key={d} style={{ padding: '12px', verticalAlign: 'top', minWidth: 160, borderBottom: 'none' }}>
                  {(TIMETABLE[d] || []).map((s, i) => (
                    <div key={i} style={{ background: `${s.color}15`, borderRadius: 8, padding: '8px 10px', marginBottom: 8, borderLeft: `3px solid ${s.color}` }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: s.color, fontFamily: '"DM Sans", sans-serif' }}>{s.time}</div>
                      <div style={{ fontSize: 12, color:  C.navyDark, fontFamily: '"DM Sans", sans-serif', marginTop: 2 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>{s.room}</div>
                    </div>
                  ))}
                  {(TIMETABLE[d] || []).length === 0 && <div style={{ fontSize: 12, color: 'rgba(122,101,88,0.4)', fontFamily: '"DM Sans", sans-serif', paddingTop: 8 }}>Free</div>}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Registration() {
  const [selected, setSelected] = useState([]);
  const toggle = (code) => setSelected(s => s.includes(code) ? s.filter(c => c !== code) : [...s, code]);

  return (
    <div>
      <SectionTitle icon="📝" title="Module Registration" sub="2025 Academic Year — 3rd Year enrolment window is open" />

      {/* Status banner */}
      <div style={{ background: `${ C.success}12`, border: `1px solid ${ C.success}30`, borderRadius: 16, padding: '16px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontSize: 28 }}>✅</span>
        <div>
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, color:  C.success, fontSize: 15 }}>Registration window is open — closes 31 January 2025</div>
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 13, color:  C.textSecondary, marginTop: 2 }}>You are eligible to register for 3rd Year modules. Academic advisor approval required for WIL modules.</div>
        </div>
      </div>

      {/* Currently enrolled */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 17, fontWeight: 800, color:  C.navyDark, margin: '0 0 14px' }}>Currently Registered — Semester 2 · 2024</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {COURSES.map(c => (
            <div key={c.code} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: '#fff', borderRadius: 12, border: `1px solid ${C.border}` }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.status === 'Complete' ?  C.success :  C.accent, flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 800, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', width: 56 }}>{c.code}</span>
              <span style={{ flex: 1, fontSize: 14, color:  C.navyDark, fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>{c.name}</span>
              <Badge label={`${c.credits} credits`} color={ C.textSecondary} />
              <Badge label={c.status} color={c.status === 'Complete' ?  C.success :  C.accent} />
            </div>
          ))}
        </div>
      </div>

      {/* Available for 2025 */}
      <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 17, fontWeight: 800, color:  C.navyDark, margin: '0 0 14px' }}>Available Modules — 2025 Registration</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {MODULES_AVAILABLE.map(m => {
          const isSelected = selected.includes(m.code);
          return (
            <div key={m.code} onClick={() => m.available && toggle(m.code)} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px',
              background: isSelected ? `${ C.primary}0A` : '#fff',
              borderRadius: 12, border: `1.5px solid ${isSelected ?  C.primary : m.available ? C.border : 'rgba(28,15,5,0.05)'}`,
              cursor: m.available ? 'pointer' : 'not-allowed',
              opacity: m.available ? 1 : 0.5,
              transition: 'border-color 0.2s, background 0.2s',
            }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${isSelected ?  C.primary : 'rgba(28,15,5,0.2)'}`, background: isSelected ?  C.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                {isSelected && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5L4 7.5L8 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span style={{ fontSize: 12, fontWeight: 800, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', width: 56 }}>{m.code}</span>
              <span style={{ flex: 1, fontSize: 14, color:  C.navyDark, fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>{m.name}</span>
              <span style={{ fontSize: 12, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>Prereq: {m.prereq}</span>
              <Badge label={`${m.credits} credits`} color={ C.textSecondary} />
              {!m.available && <Badge label="Advisor Approval Required" color={ C.accent} />}
            </div>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div style={{ background:  C.navyDark, borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <div style={{ color: '#fff', fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 15 }}>{selected.length} module{selected.length > 1 ? 's' : ''} selected</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"DM Sans", sans-serif', fontSize: 13, marginTop: 2 }}>Review selection before submitting to your academic advisor</div>
          </div>
          <button style={{ padding: '11px 28px', borderRadius: 10, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg, ${ C.accent}, ${ C.primary})`, color: '#fff', fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14, boxShadow: `0 4px 16px rgba(240,165,0,0.4)` }}>
            Submit Registration →
          </button>
        </div>
      )}
    </div>
  );
}

function Payments() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div>
      <SectionTitle icon="💳" title="Fees & Payments" sub="2024 academic year financial overview" />

      {/* Balance cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Outstanding Balance', value: 'R 14 600.00', color:  C.danger, icon: '⚠️', sub: 'Due 15 Jul 2024' },
          { label: 'Total Paid (2024)', value: 'R 16 250.00', color:  C.success, icon: '✅', sub: 'Including bursary credit' },
          { label: 'NSFAS Credit Applied', value: 'R 10 200.00', color:  C.info, icon: '🎓', sub: 'Semester 1 · 2024' },
        ].map(s => (
          <Card key={s.label} style={{ padding: '20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>{s.icon}</span>
              <span style={{ fontSize: 11, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>{s.sub}</span>
            </div>
            <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 26, fontWeight: 900, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Upload proof */}
      <Card style={{ padding: '20px 24px', marginBottom: 28, border: `1.5px dashed ${ C.accent}60`, background: `${ C.accent}05` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 32 }}>📤</span>
            <div>
              <div style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, color:  C.navyDark, fontSize: 15 }}>Upload Proof of Payment</div>
              <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 13, color:  C.textSecondary, marginTop: 2 }}>Upload a bank receipt, EFT confirmation, or NSFAS approval letter. Accepted: PDF, JPG, PNG (max 5MB)</div>
            </div>
          </div>
          <button onClick={() => setShowUpload(s => !s)} style={{ padding: '10px 24px', borderRadius: 10, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg, ${ C.accent}, ${ C.primary})`, color: '#fff', fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14, boxShadow: `0 4px 16px rgba(240,165,0,0.3)` }}>
            Upload Now
          </button>
        </div>
        {showUpload && (
          <div style={{ marginTop: 20, borderTop: `1px solid ${C.border}`, paddingTop: 20, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>Payment Reference / Invoice</label>
              <select style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${C.border}`, fontFamily: '"DM Sans", sans-serif', fontSize: 14, background: '#fff', color:  C.navyDark }}>
                <option>INV-2024-004 · Tuition Fee Semester 2</option>
                <option>INV-2024-005 · Library Access Fee</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>Select File</label>
              <div style={{ border: `1.5px dashed rgba(28,15,5,0.2)`, borderRadius: 10, padding: '18px', textAlign: 'center', background:  C.white, cursor: 'pointer', color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontSize: 13 }}>
                📎 Click to browse or drag & drop
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button style={{ padding: '10px 22px', borderRadius: 10, border: 'none', cursor: 'pointer', background:  C.success, color: '#fff', fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 14 }}>Submit</button>
            </div>
          </div>
        )}
      </Card>

      {/* Transaction history */}
      <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 17, fontWeight: 800, color:  C.navyDark, margin: '0 0 14px' }}>Transaction History</h3>
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background:  C.white }}>
                {['Invoice / Ref', 'Description', 'Amount', 'Date', 'Method', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAYMENTS.map((p, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${C.border}` }}>
                  <td style={{ padding: '14px 16px', fontSize: 13, color:  C.info, fontFamily: '"DM Sans", sans-serif', fontWeight: 700 }}>{p.id}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color:  C.navyDark, fontFamily: '"DM Sans", sans-serif' }}>{p.desc}</td>
                  <td style={{ padding: '14px 16px', fontSize: 14, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, color: p.amount.startsWith('-') ?  C.success : p.status === 'Outstanding' ?  C.danger :  C.navyDark }}>{p.amount}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', whiteSpace: 'nowrap' }}>{p.date}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>{p.method}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <Badge label={p.status} color={p.status === 'Paid' || p.status === 'Applied' ?  C.success :  C.danger} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function Clubs() {
  const [filter, setFilter] = useState('All');
  const cats = ['All', 'Academic', 'Sports', 'Cultural', 'Governance', 'Recreation', 'Business'];
  const filtered = filter === 'All' ? CLUBS : CLUBS.filter(c => c.category === filter);

  return (
    <div>
      <SectionTitle icon="🏛️" title="Clubs & Activities" sub="You are a member of 3 clubs. Explore and join more below." />

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: '7px 16px', borderRadius: 100, border: `1.5px solid ${filter === c ?  C.navyDark : C.border}`,
            background: filter === c ?  C.navyDark : '#fff', color: filter === c ? '#fff' :  C.textSecondary,
            fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {filtered.map(club => (
          <Card key={club.name} style={{ padding: '22px 24px', borderTop: `3px solid ${club.color}` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${club.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{club.icon}</div>
                <div>
                  <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 16, fontWeight: 800, color:  C.navyDark }}>{club.name}</div>
                  <Badge label={club.category} color={club.color} size={10} />
                </div>
              </div>
              {club.status === 'Member' ? (
                <Badge label="✓ Member" color={ C.success} />
              ) : (
                <button style={{ padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: club.color, color: '#fff', fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 12 }}>Join</button>
              )}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
              <span style={{ fontSize: 12, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>👥 {club.members} members</span>
              <span style={{ fontSize: 12, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>📅 {club.meetings}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Parking() {
  return (
    <div>
      <SectionTitle icon="🚗" title="Parking" sub="Manage your campus parking permit and bay allocation" />

      {/* Permit status */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Permit Status', value: 'Active', color:  C.success, icon: '✅', sub: 'Valid until 31 Dec 2024' },
          { label: 'Bay Allocation', value: 'Bay 3B', color:  C.info, icon: '🅿️', sub: 'Parking Lot C · North Campus' },
          { label: 'Annual Fee', value: 'R 1 200', color:  C.accent, icon: '💳', sub: 'Paid 10 Jan 2024' },
        ].map(s => (
          <Card key={s.label} style={{ padding: '20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>{s.icon}</span>
              <span style={{ fontSize: 11, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>{s.sub}</span>
            </div>
            <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 26, fontWeight: 900, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Parking map placeholder */}
      <Card style={{ padding: '24px', marginBottom: 24 }}>
        <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 17, fontWeight: 800, color:  C.navyDark, margin: '0 0 16px' }}>Campus Parking Map</h3>
        <div style={{ background:  C.white, borderRadius: 14, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px dashed ${C.border}`, flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 40 }}>🗺️</span>
          <span style={{ color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontSize: 14 }}>Interactive parking map — image placeholder</span>
          <Badge label="Your Bay: 3B · Lot C" color={ C.info} />
        </div>
      </Card>

      {/* Rules & actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card style={{ padding: '20px 22px' }}>
          <h4 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 16, fontWeight: 800, color:  C.navyDark, margin: '0 0 14px' }}>📋 Parking Rules</h4>
          {['Permit must be displayed on the dashboard at all times.', 'Parking in unmarked bays results in a R 200 fine.', 'Gates close at 22:00 — after-hours access via security.', 'Report incidents to Campus Security: 011 000 0001.'].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background:  C.primary, marginTop: 7, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.6 }}>{r}</span>
            </div>
          ))}
        </Card>
        <Card style={{ padding: '20px 22px' }}>
          <h4 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 16, fontWeight: 800, color:  C.navyDark, margin: '0 0 14px' }}>⚡ Quick Actions</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['🔄 Renew Permit for 2025',  C.success], ['🔁 Request Bay Change',  C.info], ['📤 Upload Vehicle Docs',  C.accent], ['🆘 Report an Incident',  C.danger]].map(([label, color]) => (
              <button key={label} style={{ padding: '11px 16px', borderRadius: 10, border: `1px solid ${color}30`, background: `${color}0A`, color: color, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' }}
                onMouseEnter={e => e.target.style.background = `${color}18`}
                onMouseLeave={e => e.target.style.background = `${color}0A`}
              >{label}</button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function MyDetails() {
  const [editing, setEditing] = useState(false);
  const fields = [
    { label: 'Full Name', value: STUDENT.name, icon: '👤', editable: false },
    { label: 'Student Number', value: STUDENT.id, icon: '🪪', editable: false },
    { label: 'Email (student)', value: STUDENT.email, icon: '📧', editable: false },
    { label: 'Personal Phone', value: STUDENT.phone, icon: '📱', editable: true },
    { label: 'Date of Birth', value: STUDENT.dob, icon: '🎂', editable: false },
    { label: 'SA ID Number', value: STUDENT.idNumber, icon: '🪪', editable: false },
    { label: 'Residential Address', value: STUDENT.address, icon: '🏠', editable: true },
    { label: 'Hearing Status', value: STUDENT.hearingStatus, icon: '🤟', editable: false },
    { label: 'Emergency Contact', value: STUDENT.emergencyContact, icon: '🆘', editable: true },
    { label: 'Academic Advisor', value: STUDENT.advisor, icon: '👩‍🏫', editable: false },
  ];

  return (
    <div>
      <SectionTitle icon="👤" title="My Details" sub="Your personal and academic profile" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
        {/* Avatar card */}
        <div>
          <Card style={{ padding: '28px', textAlign: 'center', marginBottom: 16 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg, ${ C.accent}, ${ C.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"DM Sans", sans-serif', fontWeight: 900, fontSize: 28, color: '#fff', margin: '0 auto 16px' }}>
              {STUDENT.initials}
            </div>
            <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 19, fontWeight: 900, color:  C.navyDark, marginBottom: 4 }}>{STUDENT.name}</div>
            <div style={{ fontSize: 12, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', marginBottom: 8 }}>{STUDENT.id}</div>
            <Badge label={STUDENT.status} color={ C.success} />
            <div style={{ marginTop: 16, padding: '12px', background:  C.white, borderRadius: 10 }}>
              <div style={{ fontSize: 11, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Programme</div>
              <div style={{ fontSize: 13, color:  C.navyDark, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, lineHeight: 1.5 }}>{STUDENT.programme}</div>
            </div>
            <button style={{ marginTop: 14, width: '100%', padding: '10px', borderRadius: 10, border: `1px dashed ${C.border}`, background: 'transparent', cursor: 'pointer', color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontSize: 13 }}>📷 Change Photo</button>
          </Card>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 12, color:  C.textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Academic Standing</div>
            {[['GPA / Average', STUDENT.gpa,  C.success], ['Credits Earned', `${STUDENT.credits} / 360`,  C.info], ['Year of Study', STUDENT.year,  C.accent]].map(([l, v, col]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 13, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>{l}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: col, fontFamily: '"DM Sans", sans-serif' }}>{v}</span>
              </div>
            ))}
          </Card>
        </div>

        {/* Fields */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 17, fontWeight: 800, color:  C.navyDark, margin: 0 }}>Personal Information</h3>
            <button onClick={() => setEditing(e => !e)} style={{ padding: '8px 20px', borderRadius: 10, border: `1px solid ${editing ?  C.primary : C.border}`, background: editing ?  C.primary : '#fff', color: editing ? '#fff' :  C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              {editing ? '💾 Save Changes' : '✏️ Edit'}
            </button>
          </div>
          <Card>
            {fields.map((f, i) => (
              <div key={f.label} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '14px 20px', borderBottom: i < fields.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <span style={{ fontSize: 20, flexShrink: 0, width: 28, textAlign: 'center' }}>{f.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{f.label}</div>
                  {editing && f.editable
                    ? <input defaultValue={f.value} style={{ width: '100%', padding: '6px 10px', borderRadius: 8, border: `1.5px solid ${ C.primary}`, fontFamily: '"DM Sans", sans-serif', fontSize: 14, color:  C.navyDark, background:  C.white, outline: 'none' }} />
                    : <div style={{ fontSize: 14, color:  C.navyDark, fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>{f.value}</div>
                  }
                </div>
                {!f.editable && <Badge label="Locked" color={ C.textSecondary} size={10} />}
              </div>
            ))}
          </Card>
          <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
            <button style={{ padding: '10px 20px', borderRadius: 10, border: `1px solid ${C.border}`, background: '#fff', color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>📄 Download Student Card</button>
            <button style={{ padding: '10px 20px', borderRadius: 10, border: `1px solid ${C.border}`, background: '#fff', color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>📑 Request Proof of Enrolment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Communications() {
  const [selected, setSelected] = useState(0);
  const [msgs, setMsgs] = useState(COMMS);

  const markRead = (i) => setMsgs(m => m.map((msg, idx) => idx === i ? { ...msg, read: true } : msg));
  const unread = msgs.filter(m => !m.read).length;

  return (
    <div>
      <SectionTitle icon="📬" title="Communications" sub={`${unread} unread message${unread !== 1 ? 's' : ''}`} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 20, height: 560 }}>
        {/* Message list */}
        <Card style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: 8 }}>
            {['All', 'Unread', 'Important'].map(f => (
              <button key={f} style={{ padding: '5px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: f === 'All' ?  C.navyDark : 'transparent', color: f === 'All' ? '#fff' :  C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 12 }}>{f}</button>
            ))}
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {msgs.map((msg, i) => (
              <div key={i} onClick={() => { setSelected(i); markRead(i); }} style={{
                padding: '14px 16px', borderBottom: `1px solid ${C.border}`,
                cursor: 'pointer', background: selected === i ? `${ C.primary}0A` : !msg.read ?  C.white : '#fff',
                borderLeft: selected === i ? `3px solid ${ C.primary}` : '3px solid transparent',
                transition: 'background 0.15s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color:  C.navyDark, fontFamily: '"DM Sans", sans-serif' }}>{msg.from}</span>
                  <span style={{ fontSize: 11, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>{msg.date}</span>
                </div>
                <div style={{ fontSize: 13, color: !msg.read ?  C.navyDark :  C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: !msg.read ? 700 : 400, lineHeight: 1.4, marginBottom: 4 }}>{msg.subject}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {!msg.read && <Badge label="New" color={ C.success} size={9} />}
                  {msg.priority === 'high' && <Badge label="Important" color={ C.danger} size={9} />}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Message detail */}
        <Card style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column' }}>
          {msgs[selected] ? (
            <>
              <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                  {msgs[selected].priority === 'high' && <Badge label="⚠️ Important" color={ C.danger} />}
                  <Badge label={`Received: ${msgs[selected].date}`} color={ C.textSecondary} />
                </div>
                <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 20, fontWeight: 900, color:  C.navyDark, margin: '0 0 8px', lineHeight: 1.2 }}>{msgs[selected].subject}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: `linear-gradient(135deg, ${ C.accent}, ${ C.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#fff', fontFamily: '"DM Sans", sans-serif', fontWeight: 800 }}>
                    {msgs[selected].from[0]}
                  </div>
                  <span style={{ fontSize: 13, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>From: <strong style={{ color:  C.navyDark }}>{msgs[selected].from}</strong></span>
                </div>
              </div>
              <p style={{ color:  C.textSecondary, fontSize: 15, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.8, flex: 1 }}>{msgs[selected].body}</p>
              <div style={{ display: 'flex', gap: 10, marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                <button style={{ padding: '9px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg, ${ C.accent}, ${ C.primary})`, color: '#fff', fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: 13 }}>Reply</button>
                <button style={{ padding: '9px 20px', borderRadius: 10, border: `1px solid ${C.border}`, cursor: 'pointer', background: '#fff', color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 13 }}>Archive</button>
                <button style={{ padding: '9px 20px', borderRadius: 10, border: `1px solid ${C.border}`, cursor: 'pointer', background: '#fff', color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 13 }}>🤟 Request SASL Response</button>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>
              <span style={{ fontSize: 40 }}>📭</span>
              Select a message to read
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'courses',  icon: '📚', label: 'My Courses' },
  { id: 'timetable', icon: '🗓️', label: 'Timetable' },
  { id: 'registration', icon: '📝', label: 'Registration' },
  { id: 'payments', icon: '💳', label: 'Payments' },
  { id: 'clubs',    icon: '🏛️', label: 'Clubs & Activities' },
  { id: 'parking',  icon: '🚗', label: 'Parking' },
  { id: 'details',  icon: '👤', label: 'My Details' },
  { id: 'comms',    icon: '📬', label: 'Communications', badge: 2 },
];

function Sidebar({ active, onChange }) {
  return (
    <aside style={{
      width: 240, background:  C.navyDark, height: '100vh',
      position: 'sticky', top: 0, display: 'flex', flexDirection: 'column',
      flexShrink: 0, overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 0 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${ C.accent}, ${ C.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"DM Sans", sans-serif', fontWeight: 900, color: '#fff', fontSize: 16, flexShrink: 0 }}>SA</div>
          <div>
            <div style={{ fontFamily: '"DM Sans", sans-serif', color: '#fff', fontWeight: 700, fontSize: 13, lineHeight: 1.1 }}>National Deaf Technincal And Vocational</div>
            <div style={{ color:  C.accent, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Student Portal</div>
          </div>
        </div>
      </div>

      {/* Student profile */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(135deg, ${ C.accent}, ${ C.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"DM Sans", sans-serif', fontWeight: 900, fontSize: 14, color: '#fff', flexShrink: 0 }}>TM</div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, color: '#fff', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Thabo Mokoena</div>
            <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>2nd Year · Software Dev</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px' }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => onChange(tab.id)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: active === tab.id ? `linear-gradient(135deg, ${ C.accent}22, ${ C.primary}22)` : 'transparent',
            borderLeft: active === tab.id ? `3px solid ${ C.accent}` : '3px solid transparent',
            textAlign: 'left', marginBottom: 2, transition: 'background 0.15s',
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{tab.icon}</span>
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 13.5, fontWeight: active === tab.id ? 700 : 500, color: active === tab.id ? '#fff' : 'rgba(255,255,255,0.55)', flex: 1 }}>{tab.label}</span>
            {tab.badge && (
              <span style={{ background:  C.danger, color: '#fff', fontSize: 10, fontWeight: 800, borderRadius: 100, padding: '1px 7px', fontFamily: '"DM Sans", sans-serif' }}>{tab.badge}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer links */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif', fontSize: 13, textDecoration: 'none', borderRadius: 10, transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
        >
          <span>🏠</span> Back to Website
        </a>
        <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: 'none', cursor: 'pointer', background: 'transparent', color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif', fontSize: 13, borderRadius: 10, transition: 'color 0.2s', textAlign: 'left' }}
          onMouseEnter={e => e.currentTarget.style.color =  C.danger}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
        >
          <span>🚪</span> Sign Out
        </button>
      </div>
    </aside>
  );
}

// ─── Top bar ──────────────────────────────────────────────────────────────────
function TopBar({ tab }) {
  const current = TABS.find(t => t.id === tab);
  return (
    <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}`, padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 22 }}>{current?.icon}</span>
        <h1 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 20, fontWeight: 900, color:  C.navyDark, margin: 0 }}>{current?.label}</h1>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ background:  C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: '7px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14 }}>🤟</span>
          <span style={{ fontSize: 12, color:  C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>SASL Support Active</span>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background:  C.success }} />
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${ C.accent}, ${ C.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"DM Sans", sans-serif', fontWeight: 900, fontSize: 14, color: '#fff', cursor: 'pointer' }}>TM</div>
      </div>
    </div>
  );
}

// ─── Page root ─────────────────────────────────────────────────────────────────
export default function StudentPortal() {
  const [activeTab, setActiveTab] = useState('courses');

  const renderTab = () => {
    switch (activeTab) {
      case 'courses':      return <MyCourses />;
      case 'timetable':    return <Timetable />;
      case 'registration': return <Registration />;
      case 'payments':     return <Payments />;
      case 'clubs':        return <Clubs />;
      case 'parking':      return <Parking />;
      case 'details':      return <MyDetails />;
      case 'comms':        return <Communications />;
      default:             return <MyCourses />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700;1,9..144,900&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { height: 100%; }
        body { background: ${C.bg}; height: 100%; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(28,15,5,0.15); border-radius: 10px; }
        button:focus-visible { outline: 2px solid ${ C.accent}; outline-offset: 2px; }
        a:focus-visible      { outline: 2px solid ${ C.accent}; outline-offset: 2px; }
      `}</style>

      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Sidebar active={activeTab} onChange={setActiveTab} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <TopBar tab={activeTab} />
          <main style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', animation: 'fadeIn 0.3s ease' }} key={activeTab}>
              {renderTab()}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
