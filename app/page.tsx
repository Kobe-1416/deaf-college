'use client';

import type { CSSProperties, ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  label: string;
}

function NavLink({ href, label }: NavLinkProps) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    target.style.background = '#7a6620';
    target.style.transform = 'translateY(-2px)';
    target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    target.style.background = '#998426';
    target.style.transform = 'translateY(0)';
    target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
  };

  const linkStyle: CSSProperties = {
    padding: 'clamp(8px, 2.5vw, 10px) clamp(12px, 4vw, 20px)',
    background: '#998426',
    color: '#fff',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 'clamp(12px, 3.5vw, 14px)',
    display: 'inline-block',
    transition: 'all 0.2s ease',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '160px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <a
      href={href}
      style={linkStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label}
    </a>
  );
}

export default function Page() {
  const mainStyle: CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#F5F5F5',
    fontFamily: 'system-ui, sans-serif',
    paddingTop: '80px',
  };

  const headerStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    padding: 'clamp(12px, 4vw, 16px) clamp(16px, 5vw, 24px)',
    background: '#1A1556',
    color: '#fff',
    fontWeight: 600,
    letterSpacing: '0.05em',
    fontSize: 'clamp(14px, 4vw, 18px)',
    zIndex: 100,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const contentStyle: CSSProperties = {
    textAlign: 'center',
    padding: 'clamp(20px, 5vw, 40px)',
    maxWidth: '100%',
    width: '100%',
  };

  const h1Style: CSSProperties = {
    fontSize: 'clamp(28px, 7vw, 42px)',
    color: '#1A1556',
    marginBottom: 'clamp(8px, 2vw, 10px)',
    margin: '0 auto clamp(8px, 2vw, 10px)',
    padding: '0 clamp(16px, 5vw, 24px)',
    lineHeight: 1.2,
  };

  const paragraphStyle: CSSProperties = {
    color: '#555',
    fontSize: 'clamp(14px, 4vw, 16px)',
    marginBottom: 'clamp(20px, 5vw, 24px)',
    padding: '0 clamp(16px, 5vw, 24px)',
  };

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
    gap: 'clamp(8px, 3vw, 12px)',
    padding: '0 clamp(16px, 5vw, 24px)',
    maxWidth: '900px',
    margin: '0 auto',
    justifyItems: 'center',
  };

  const footerStyle: CSSProperties = {
    marginTop: 'clamp(40px, 10vw, 60px)',
    padding: 'clamp(16px, 5vw, 24px)',
    fontSize: 'clamp(12px, 3vw, 14px)',
    color: '#888',
  };

  const footerParagraphStyle: CSSProperties = {
    marginTop: '8px',
    fontSize: 'clamp(11px, 2.5vw, 13px)',
  };

  return (
    <main style={mainStyle}>
      {/* Header */}
      <div style={headerStyle}>
        Sikhuluma Academy
      </div>

      {/* Content */}
      <div style={contentStyle}>
        <h1 style={h1Style}>
          Sikhuluma Academy
        </h1>

        <p style={paragraphStyle}>
          Student & Staff Portal System
        </p>

        {/* Navigation Grid */}
        <div style={gridStyle}>
          <NavLink href="/" label="Home" />
          <NavLink href="/faculties" label="Faculties" />
          <NavLink href="/events" label="Events" />
          <NavLink href="/code-of-conduct" label="Code of Conduct" />
          <NavLink href="/contact" label="Contact" />
          <NavLink href="/student-portal" label="Student Portal" />
          <NavLink href="/admin" label="Admin Portal" />
          <NavLink href="/login" label="Login / Register" />
        </div>

        {/* Footer note */}
        <div style={footerStyle}>
          <p>Welcome to Sikhuluma Academy</p>
          <p style={footerParagraphStyle}>
            Select a section above to explore
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          main {
            padding-top: 70px;
          }
        }

        @media (max-width: 480px) {
          main {
            padding-top: 65px;
          }
        }
      `}</style>
    </main>
  );
}