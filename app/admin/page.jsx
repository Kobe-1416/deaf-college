'use client';

import { useState } from 'react';

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

// ─── Mock data ────────────────────────────────────────────────────────────────
const STUDENTS = [
  { id: 'SKH-2024-00412', name: 'Thabo Mokoena',    programme: 'Software Development',    year: '2nd', status: 'Active',    balance: 'R 14 600', hearing: 'Deaf' },
  { id: 'SKH-2024-00389', name: 'Amahle Dlamini',   programme: 'Visual Communication',    year: '1st', status: 'Active',    balance: 'R 0',      hearing: 'Deaf' },
  { id: 'SKH-2024-00401', name: 'Ruan van der Berg', programme: 'SASL Interpreting',       year: '1st', status: 'Active',    balance: 'R 2 100',  hearing: 'Hearing' },
  { id: 'SKH-2023-00301', name: 'Fatima Osman',     programme: 'Business Management',     year: '3rd', status: 'Active',    balance: 'R 0',      hearing: 'Hard of Hearing' },
  { id: 'SKH-2024-00455', name: 'Sipho Ndlovu',     programme: 'Social Auxiliary Work',   year: '1st', status: 'Suspended', balance: 'R 8 400',  hearing: 'Deaf' },
  { id: 'SKH-2023-00278', name: 'Priya Naidoo',     programme: 'Software Development',    year: '3rd', status: 'Active',    balance: 'R 0',      hearing: 'Hard of Hearing' },
  { id: 'SKH-2024-00418', name: 'Kagiso Sithole',   programme: 'Digital Marketing',       year: '1st', status: 'Active',    balance: 'R 6 500',  hearing: 'Deaf' },
];

const APPLICATIONS = [
  { id: 'APP-2025-0041', name: 'Lerato Mosia',     programme: 'Software Development',  date: '12 Jan 2025', status: 'Pending',  hearing: 'Deaf',           docs: 'Complete' },
  { id: 'APP-2025-0039', name: 'Marco Ferreira',   programme: 'SASL Interpreting',     date: '10 Jan 2025', status: 'Pending',  hearing: 'Hearing',        docs: 'Incomplete' },
  { id: 'APP-2025-0037', name: 'Nompumelelo Zulu', programme: 'Visual Communication',  date: '8 Jan 2025',  status: 'Approved', hearing: 'Deaf',           docs: 'Complete' },
  { id: 'APP-2025-0033', name: 'David Tlou',       programme: 'Business Management',   date: '5 Jan 2025',  status: 'Approved', hearing: 'Hard of Hearing',docs: 'Complete' },
  { id: 'APP-2025-0029', name: 'Ayanda Khumalo',   programme: 'Social Auxiliary Work', date: '2 Jan 2025',  status: 'Rejected', hearing: 'Deaf',           docs: 'Incomplete' },
];

const PAYMENTS_LOG = [
  { ref: 'PAY-2024-8841', student: 'Thabo Mokoena',     amount: 'R 14 250', type: 'Tuition Sem 2',    date: '15 Jul 2024', status: 'Pending Verification' },
  { ref: 'PAY-2024-8802', student: 'Kagiso Sithole',    amount: 'R 6 500',  type: 'Short Course Fee', date: '12 Jul 2024', status: 'Pending Verification' },
  { ref: 'PAY-2024-8790', student: 'Ruan van der Berg', amount: 'R 2 100',  type: 'Partial Payment',  date: '10 Jul 2024', status: 'Verified' },
  { ref: 'PAY-2024-8755', student: 'Amahle Dlamini',    amount: 'R 14 250', type: 'Tuition Sem 2',    date: '1 Jul 2024',  status: 'Verified' },
  { ref: 'BUR-2024-0119', student: 'Thabo Mokoena',     amount: 'R 10 200', type: 'NSFAS Credit',     date: '20 Jan 2024', status: 'Applied' },
];

const STAFF = [
  { name: 'Ms. Lindiwe Dube',    role: 'Academic Advisor',     faculty: 'Technology',  status: 'Active', hearing: 'Hearing' },
  { name: 'Mr. Sipho Nkosi',     role: 'Lecturer',             faculty: 'Technology',  status: 'Active', hearing: 'Deaf' },
  { name: 'Ms. Fatima Jardim',   role: 'Lecturer',             faculty: 'Technology',  status: 'Active', hearing: 'Hearing' },
  { name: 'Dr. Ayesha Patel',    role: 'Senior Lecturer',      faculty: 'Technology',  status: 'Active', hearing: 'Hearing' },
  { name: 'Ms. Zanele Khumalo',  role: 'SASL Lecturer',        faculty: 'Languages',   status: 'Active', hearing: 'Deaf' },
  { name: 'Mr. James Sithole',   role: 'Lecturer',             faculty: 'Technology',  status: 'On Leave', hearing: 'Hearing' },
];

const NOTICES = [
  { title: 'Semester 2 Exam Timetable Released',    sent: '2 Jul 2024',  audience: 'All Students',      status: 'Sent' },
  { title: 'Fees Deadline Reminder — 15 July',      sent: '25 Jun 2024', audience: 'Students w/ Balance', status: 'Sent' },
  { title: 'SASL Storytelling Festival — Sign Up',  sent: '20 Jun 2024', audience: 'All Students',      status: 'Sent' },
  { title: 'Portal Maintenance — 30 Jun 02:00',     sent: '18 Jun 2024', audience: 'All Users',         status: 'Sent' },
  { title: 'New Module Available: Cloud Computing', sent: '—',           audience: 'Year 3 · Tech',     status: 'Draft' },
];

// ─── Primitives ───────────────────────────────────────────────────────────────
const Badge = ({ label, color }) => (
  <span style={{ background: `${color}18`, color, fontSize: 11, fontFamily: '"DM Sans", sans-serif', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100, whiteSpace: 'nowrap' }}>{label}</span>
);

const Chip = ({ label, active, onClick }) => (
  <button onClick={onClick} style={{ padding: '6px 14px', borderRadius: 100, border: `1px solid ${active ? C.navyDark : C.border}`, background: active ? C.navyDark : 'transparent', color: active ? '#fff' : C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer', transition: 'all 0.15s' }}>
    {label}
  </button>
);

const Row = ({ children, style = {} }) => (
  <tr style={{ borderBottom: `1px solid ${C.border}`, transition: 'background 0.15s', ...style }}
    onMouseEnter={e => e.currentTarget.style.background = C.bg}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
  >{children}</tr>
);

const TD = ({ children, bold, muted, right }) => (
  <td style={{ padding: '13px 16px', fontSize: 13, fontFamily: '"DM Sans", sans-serif', fontWeight: bold ? 700 : 400, color: muted ? C.textSecondary : C.navyDark, textAlign: right ? 'right' : 'left', whiteSpace: 'nowrap' }}>
    {children}
  </td>
);

const TH = ({ children }) => (
  <th style={{ padding: '11px 16px', fontSize: 10, fontFamily: '"DM Sans", sans-serif', fontWeight: 800, color: C.textSecondary, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left', background: C.bg, whiteSpace: 'nowrap' }}>
    {children}
  </th>
);

const Section = ({ title, sub, action, children }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
      <div>
        <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 19, fontWeight: 900, color: C.navyDark, margin: 0 }}>{title}</h2>
        {sub && <p style={{ color: C.textSecondary, fontSize: 13, fontFamily: '"DM Sans", sans-serif', margin: '3px 0 0' }}>{sub}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

const Table = ({ heads, children }) => (
  <div style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr>{heads.map(h => <TH key={h}>{h}</TH>)}</tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  </div>
);

const Btn = ({ label, color = C.navyDark, onClick, small, outline }) => (
  <button onClick={onClick} style={{
    padding: small ? '6px 14px' : '9px 20px', borderRadius: 8, border: outline ? `1px solid ${C.border}` : 'none',
    background: outline ? 'transparent' : color, color: outline ? C.textSecondary : '#fff',
    fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: small ? 12 : 13,
    cursor: 'pointer', transition: 'opacity 0.15s', whiteSpace: 'nowrap',
  }}
    onMouseEnter={e => e.target.style.opacity = 0.82}
    onMouseLeave={e => e.target.style.opacity = 1}
  >{label}</button>
);

const StatCard = ({ icon, label, value, sub, color = C.navyDark }) => (
  <div style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, padding: '18px 20px' }}>
    <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
    <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 28, fontWeight: 900, color, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 11, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 5 }}>{label}</div>
    {sub && <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', marginTop: 4 }}>{sub}</div>}
  </div>
);

// ─── Tab views ────────────────────────────────────────────────────────────────

function Dashboard() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 22, fontWeight: 900, color: C.navyDark, margin: '0 0 4px' }}>Good morning, Admin 👋</h2>
        <p style={{ color: C.textSecondary, fontSize: 14, fontFamily: '"DM Sans", sans-serif', margin: 0 }}>Here's a snapshot of National Deaf Technincal And Vocational Academy today — {new Date().toDateString()}.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        <StatCard icon="🎓" label="Active Students"   value="512"  sub="+18 this semester" color={C.info} />
        <StatCard icon="📋" label="Open Applications" value="14"   sub="3 incomplete docs"  color={C.accent} />
        <StatCard icon="💳" label="Pending Payments"  value="R 48k" sub="7 to verify"       color={C.danger} />
        <StatCard icon="👥" label="Staff on Campus"   value="34"   sub="2 currently on leave" color={C.success} />
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20 }}>
        {/* Recent applications */}
        <div>
          <Section title="Recent Applications" sub="Last 5 submissions" action={<Btn label="View All" outline small />}>
            <Table heads={['Name', 'Programme', 'Status', '']}>
              {APPLICATIONS.slice(0, 5).map(a => (
                <Row key={a.id}>
                  <TD bold>{a.name}</TD>
                  <TD muted>{a.programme}</TD>
                  <TD><Badge label={a.status} color={a.status === 'Approved' ? C.success : a.status === 'Rejected' ? C.danger : C.accent} /></TD>
                  <TD right><Btn label="View" outline small /></TD>
                </Row>
              ))}
            </Table>
          </Section>
        </div>

        {/* Payment queue */}
        <div>
          <Section title="Payment Queue" sub="Awaiting verification" action={<Btn label="View All" outline small />}>
            <div style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
              {PAYMENTS_LOG.filter(p => p.status === 'Pending Verification').map((p, i, arr) => (
                <div key={p.ref} style={{ padding: '14px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.navyDark, fontFamily: '"DM Sans", sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.student}</div>
                    <div style={{ fontSize: 12, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>{p.type} · {p.date}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 15, fontWeight: 900, color: C.navyDark }}>{p.amount}</div>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginTop: 4 }}>
                      <Btn label="✓ Verify" color={C.success} small />
                      <Btn label="✕" outline small />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* Notices quick-send */}
      <Section title="Quick Notice" sub="Send a message to a student group immediately">
        <div style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, padding: '20px 22px', display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 2, minWidth: 200 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 7 }}>Subject</label>
            <input placeholder="e.g. Reminder: Assignment due tomorrow" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${C.border}`, fontFamily: '"DM Sans", sans-serif', fontSize: 14, color: C.navyDark, background: C.bg, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 7 }}>Audience</label>
            <select style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${C.border}`, fontFamily: '"DM Sans", sans-serif', fontSize: 14, background: C.bg, color: C.navyDark, outline: 'none' }}>
              <option>All Students</option>
              <option>All Staff</option>
              <option>Students w/ Balance</option>
              <option>Year 1</option><option>Year 2</option><option>Year 3</option>
              <option>Technology Faculty</option>
              <option>Business Faculty</option>
            </select>
          </div>
          <Btn label="Send →" color={C.primary} />
        </div>
      </Section>
    </div>
  );
}

function Students() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = STUDENTS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search);
    const matchFilter = filter === 'All' || s.status === filter || s.hearing === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 340px' : '1fr', gap: 20 }}>
      <div>
        <Section
          title="Students"
          sub={`${filtered.length} of ${STUDENTS.length} records`}
          action={<Btn label="+ Enrol Student" color={C.success} />}
        >
          {/* Search + filters */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or student number…" style={{ flex: 1, minWidth: 220, padding: '9px 14px', borderRadius: 10, border: `1px solid ${C.border}`, fontFamily: '"DM Sans", sans-serif', fontSize: 13, background: C.surface, color: C.navyDark, outline: 'none' }} />
            {['All', 'Active', 'Suspended', 'Deaf', 'Hearing'].map(f => <Chip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />)}
          </div>

          <Table heads={['Student No.', 'Name', 'Programme', 'Year', 'Hearing', 'Balance', 'Status', '']}>
            {filtered.map(s => (
              <Row key={s.id}>
                <TD muted>{s.id}</TD>
                <TD bold>{s.name}</TD>
                <TD muted>{s.programme}</TD>
                <TD muted>{s.year}</TD>
                <TD><Badge label={s.hearing} color={s.hearing === 'Deaf' ? C.purple : s.hearing === 'Hearing' ? C.info : C.accent} /></TD>
                <TD><span style={{ color: s.balance === 'R 0' ? C.success : C.danger, fontWeight: 700, fontFamily: '"DM Sans", sans-serif' }}>{s.balance}</span></TD>
                <TD><Badge label={s.status} color={s.status === 'Active' ? C.success : C.danger} /></TD>
                <TD right><Btn label="View" outline small onClick={() => setSelected(s)} /></TD>
              </Row>
            ))}
          </Table>
        </Section>
      </div>

      {/* Student detail drawer */}
      {selected && (
        <div style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, padding: '22px', animation: 'fadeIn 0.2s ease', alignSelf: 'flex-start', position: 'sticky', top: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"DM Sans", sans-serif', fontWeight: 900, fontSize: 15, color: '#fff' }}>
                {selected.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 16, fontWeight: 900, color: C.navyDark }}>{selected.name}</div>
                <div style={{ fontSize: 11, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>{selected.id}</div>
              </div>
            </div>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: C.textSecondary, padding: 0, lineHeight: 1 }}>✕</button>
          </div>

          {[
            ['Programme', selected.programme],
            ['Year', selected.year],
            ['Hearing Status', selected.hearing],
            ['Account Balance', selected.balance],
            ['Status', selected.status],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 12, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>{l}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.navyDark, fontFamily: '"DM Sans", sans-serif' }}>{v}</span>
            </div>
          ))}

          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Btn label="Edit Profile" color={C.navyDark} />
            <Btn label="Send Message" outline />
            <Btn label={selected.status === 'Active' ? 'Suspend Account' : 'Reinstate Account'} color={selected.status === 'Active' ? C.danger : C.success} />
          </div>
        </div>
      )}
    </div>
  );
}

function Applications() {
  const [filter, setFilter] = useState('All');
  const statuses = ['All', 'Pending', 'Approved', 'Rejected'];
  const filtered = filter === 'All' ? APPLICATIONS : APPLICATIONS.filter(a => a.status === filter);
  const counts = { All: APPLICATIONS.length, Pending: APPLICATIONS.filter(a => a.status === 'Pending').length, Approved: APPLICATIONS.filter(a => a.status === 'Approved').length, Rejected: APPLICATIONS.filter(a => a.status === 'Rejected').length };

  return (
    <Section
      title="Applications"
      sub="Manage incoming enrolment applications"
      action={<div style={{ display: 'flex', gap: 8 }}>
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{ padding: '7px 14px', borderRadius: 100, border: `1px solid ${filter === s ? C.navyDark : C.border}`, background: filter === s ? C.navyDark : 'transparent', color: filter === s ? '#fff' : C.textSecondary, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
            {s} <span style={{ opacity: 0.6 }}>({counts[s]})</span>
          </button>
        ))}
      </div>}
    >
      <Table heads={['App ID', 'Name', 'Programme', 'Date', 'Hearing', 'Docs', 'Status', 'Actions']}>
        {filtered.map(a => (
          <Row key={a.id}>
            <TD muted>{a.id}</TD>
            <TD bold>{a.name}</TD>
            <TD muted>{a.programme}</TD>
            <TD muted>{a.date}</TD>
            <TD><Badge label={a.hearing} color={a.hearing === 'Deaf' ? C.purple : a.hearing === 'Hearing' ? C.info : C.accent} /></TD>
            <TD><Badge label={a.docs} color={a.docs === 'Complete' ? C.success : C.danger} /></TD>
            <TD><Badge label={a.status} color={a.status === 'Approved' ? C.success : a.status === 'Rejected' ? C.danger : C.accent} /></TD>
            <TD right>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                {a.status === 'Pending' && <><Btn label="Approve" color={C.success} small /><Btn label="Reject" color={C.danger} small /></>}
                <Btn label="View" outline small />
              </div>
            </TD>
          </Row>
        ))}
      </Table>
    </Section>
  );
}

function Payments() {
  const [filter, setFilter] = useState('All');
  const statuses = ['All', 'Pending Verification', 'Verified', 'Applied'];
  const filtered = filter === 'All' ? PAYMENTS_LOG : PAYMENTS_LOG.filter(p => p.status === filter);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        <StatCard icon="⏳" label="Pending Verification" value="2"       sub="Upload received"     color={C.accent} />
        <StatCard icon="✅" label="Verified This Month"  value="R 26 450" sub="4 transactions"      color={C.success} />
        <StatCard icon="🎓" label="NSFAS Credits Applied" value="R 10 200" sub="1 student"          color={C.info} />
      </div>

      <Section
        title="Payment Log"
        sub="All transactions for the current academic year"
        action={<div style={{ display: 'flex', gap: 8 }}>
          {statuses.map(s => <Chip key={s} label={s} active={filter === s} onClick={() => setFilter(s)} />)}
        </div>}
      >
        <Table heads={['Reference', 'Student', 'Amount', 'Type', 'Date', 'Status', 'Actions']}>
          {filtered.map((p, i) => (
            <Row key={i}>
              <TD muted>{p.ref}</TD>
              <TD bold>{p.student}</TD>
              <TD><span style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 900, color: C.navyDark }}>{p.amount}</span></TD>
              <TD muted>{p.type}</TD>
              <TD muted>{p.date}</TD>
              <TD><Badge label={p.status} color={p.status === 'Verified' || p.status === 'Applied' ? C.success : C.accent} /></TD>
              <TD right>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                  {p.status === 'Pending Verification' && <Btn label="✓ Verify" color={C.success} small />}
                  <Btn label="View" outline small />
                </div>
              </TD>
            </Row>
          ))}
        </Table>
      </Section>
    </div>
  );
}

function StaffView() {
  return (
    <Section
      title="Staff"
      sub={`${STAFF.length} staff members`}
      action={<Btn label="+ Add Staff Member" color={C.success} />}
    >
      <Table heads={['Name', 'Role', 'Faculty', 'Hearing Status', 'Status', '']}>
        {STAFF.map((s, i) => (
          <Row key={i}>
            <TD bold>{s.name}</TD>
            <TD muted>{s.role}</TD>
            <TD muted>{s.faculty}</TD>
            <TD><Badge label={s.hearing} color={s.hearing === 'Deaf' ? C.purple : C.info} /></TD>
            <TD><Badge label={s.status} color={s.status === 'Active' ? C.success : C.accent} /></TD>
            <TD right>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                <Btn label="Edit" outline small />
                <Btn label="Message" outline small />
              </div>
            </TD>
          </Row>
        ))}
      </Table>
    </Section>
  );
}

function Communications() {
  const [compose, setCompose] = useState(false);
  return (
    <div>
      <Section
        title="Notices & Communications"
        sub="All sent and draft notices"
        action={<Btn label="+ Compose Notice" color={C.primary} onClick={() => setCompose(c => !c)} />}
      >
        {compose && (
          <div style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, padding: '22px', marginBottom: 20, animation: 'fadeIn 0.2s ease' }}>
            <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 17, fontWeight: 800, color: C.navyDark, margin: '0 0 16px' }}>Compose New Notice</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              {[['Subject', 'e.g. Important: Exam venue change'], ['Audience', null]].map(([label, placeholder]) => (
                <div key={label}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 7 }}>{label}</label>
                  {placeholder ? (
                    <input placeholder={placeholder} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${C.border}`, fontFamily: '"DM Sans", sans-serif', fontSize: 14, background: C.bg, outline: 'none', boxSizing: 'border-box' }} />
                  ) : (
                    <select style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${C.border}`, fontFamily: '"DM Sans", sans-serif', fontSize: 14, background: C.bg, color: C.navyDark, outline: 'none' }}>
                      <option>All Students</option>
                      <option>All Staff</option>
                      <option>Students w/ Outstanding Balance</option>
                      <option>Year 1 · All Faculties</option>
                      <option>Year 2 · All Faculties</option>
                      <option>Year 3 · All Faculties</option>
                      <option>Technology Faculty</option>
                      <option>Business Faculty</option>
                    </select>
                  )}
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 7 }}>Message Body</label>
              <textarea rows={4} placeholder="Type your message here…" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${C.border}`, fontFamily: '"DM Sans", sans-serif', fontSize: 14, background: C.bg, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Btn label="Send Now" color={C.primary} />
              <Btn label="Save as Draft" outline />
              <Btn label="Cancel" outline onClick={() => setCompose(false)} />
            </div>
          </div>
        )}

        <Table heads={['Subject', 'Audience', 'Date Sent', 'Status', '']}>
          {NOTICES.map((n, i) => (
            <Row key={i}>
              <TD bold>{n.title}</TD>
              <TD muted>{n.audience}</TD>
              <TD muted>{n.sent}</TD>
              <TD><Badge label={n.status} color={n.status === 'Sent' ? C.success : C.textSecondary} /></TD>
              <TD right>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                  {n.status === 'Draft' && <Btn label="Send" color={C.primary} small />}
                  <Btn label="View" outline small />
                </div>
              </TD>
            </Row>
          ))}
        </Table>
      </Section>
    </div>
  );
}

function Reports() {
  const reports = [
    { title: 'Student Enrolment Summary',     icon: '🎓', desc: 'Total enrolments by faculty, year, and hearing status.', type: 'Academic' },
    { title: 'Outstanding Fees Report',        icon: '💳', desc: 'All students with an outstanding balance, filterable by amount.', type: 'Finance' },
    { title: 'Application Conversion Rate',    icon: '📋', desc: 'Approved vs rejected vs pending applications over time.', type: 'Admissions' },
    { title: 'Graduate Employment Outcomes',   icon: '💼', desc: 'Employment status of graduates 6 months after completion.', type: 'Academic' },
    { title: 'SASL Interpreter Usage',         icon: '🤟', desc: 'Interpreter booking rates and availability by session.', type: 'Accessibility' },
    { title: 'Campus Incident Log',            icon: '🛡️', desc: 'Code of conduct incidents, status, and resolutions.', type: 'Conduct' },
  ];

  return (
    <Section title="Reports" sub="Generate and export institutional reports">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {reports.map(r => (
          <div key={r.title} style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, padding: '20px', transition: 'box-shadow 0.15s', cursor: 'default' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(28,15,5,0.08)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>{r.icon}</span>
              <Badge label={r.type} color={C.textSecondary} />
            </div>
            <h4 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 15, fontWeight: 800, color: C.navyDark, margin: '0 0 8px', lineHeight: 1.3 }}>{r.title}</h4>
            <p style={{ fontSize: 13, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.6, margin: '0 0 16px' }}>{r.desc}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn label="Generate" color={C.navyDark} small />
              <Btn label="Export CSV" outline small />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── Sidebar + shell ──────────────────────────────────────────────────────────
const TABS = [
  { id: 'dashboard',    icon: '⚡', label: 'Dashboard' },
  { id: 'students',     icon: '🎓', label: 'Students' },
  { id: 'applications', icon: '📋', label: 'Applications', badge: 2 },
  { id: 'payments',     icon: '💳', label: 'Payments', badge: 2 },
  { id: 'staff',        icon: '👥', label: 'Staff' },
  { id: 'comms',        icon: '📢', label: 'Communications' },
  { id: 'reports',      icon: '📊', label: 'Reports' },
];

export default function AdminPortal() {
  const [tab, setTab] = useState('dashboard');

  const renderTab = () => {
    switch (tab) {
      case 'dashboard':    return <Dashboard />;
      case 'students':     return <Students />;
      case 'applications': return <Applications />;
      case 'payments':     return <Payments />;
      case 'staff':        return <StaffView />;
      case 'comms':        return <Communications />;
      case 'reports':      return <Reports />;
      default:             return <Dashboard />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: ${C.bg}; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(28,15,5,0.12); border-radius: 8px; }
        button:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; }
      `}</style>

      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

        {/* Sidebar */}
        <aside style={{ width: 220, background: C.navyDark, display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }}>
          {/* Logo */}
          <div style={{ padding: '22px 18px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg, ${C.accent}, ${C.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"DM Sans", sans-serif', fontWeight: 900, color: '#fff', fontSize: 14, flexShrink: 0 }}>SA</div>
              <div>
                <div style={{ fontFamily: '"DM Sans", sans-serif', color: '#fff', fontWeight: 700, fontSize: 13, lineHeight: 1.1 }}>National Deaf Technincal And Vocational</div>
                <div style={{ color: C.accent, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Admin Portal</div>
              </div>
            </div>
          </div>

          {/* Admin profile */}
          <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>👩‍💼</div>
            <div>
              <div style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, color: '#fff', fontSize: 12 }}>Admin User</div>
              <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.38)' }}>Student Affairs</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: '10px 8px' }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', borderRadius: 9, border: 'none', cursor: 'pointer', background: tab === t.id ? 'rgba(255,255,255,0.09)' : 'transparent', borderLeft: `3px solid ${tab === t.id ? C.accent : 'transparent'}`, marginBottom: 2, textAlign: 'left', transition: 'background 0.15s' }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{t.icon}</span>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 13, fontWeight: tab === t.id ? 700 : 500, color: tab === t.id ? '#fff' : 'rgba(255,255,255,0.5)', flex: 1 }}>{t.label}</span>
                {t.badge && <span style={{ background: C.danger, color: '#fff', fontSize: 10, fontWeight: 800, borderRadius: 100, padding: '1px 6px', fontFamily: '"DM Sans", sans-serif' }}>{t.badge}</span>}
              </button>
            ))}
          </nav>

          <div style={{ padding: '10px 8px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', color: 'rgba(255,255,255,0.35)', fontFamily: '"DM Sans", sans-serif', fontSize: 12, textDecoration: 'none', borderRadius: 9 }}>🏠 Back to Website</a>
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', border: 'none', cursor: 'pointer', background: 'transparent', color: 'rgba(255,255,255,0.35)', fontFamily: '"DM Sans", sans-serif', fontSize: 12, borderRadius: 9, textAlign: 'left' }}>🚪 Sign Out</button>
          </div>
        </aside>

        {/* Main */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Top bar */}
          <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, height: 58, padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 18, fontWeight: 900, color: C.navyDark }}>
              {TABS.find(t => t.id === tab)?.label}
            </span>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '6px 12px', fontSize: 12, color: C.textSecondary, fontFamily: '"DM Sans", sans-serif' }}>
                📅 {new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.navyDark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, cursor: 'pointer' }}>👩‍💼</div>
            </div>
          </div>

          {/* Content */}
          <main style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
            <div style={{ maxWidth: 1080, margin: '0 auto', animation: 'fadeIn 0.25s ease' }} key={tab}>
              {renderTab()}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
