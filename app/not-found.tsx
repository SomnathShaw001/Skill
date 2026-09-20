import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: 'var(--bg-black)',
      color: 'var(--text-primary)',
    }}>
      <div style={{
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        background: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        color: '#F87171',
        fontSize: '0.85rem',
        fontWeight: 600,
        marginBottom: '1.5rem',
      }}>
        404 — Route Not Found
      </div>
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '2.5rem',
        fontWeight: 800,
        marginBottom: '1rem',
        letterSpacing: '-0.02em',
      }}>
        Page Not Found
      </h1>
      <p style={{
        color: 'var(--text-secondary)',
        maxWidth: '460px',
        lineHeight: 1.6,
        marginBottom: '2rem',
      }}>
        The requested page does not exist or has moved. Return to the career intelligence dashboard to explore your skills.
      </p>
      <Link href="/dashboard/" className="btn-primary" style={{
        padding: '0.75rem 1.5rem',
        fontSize: '0.95rem',
        fontWeight: 600,
      }}>
        Return to Dashboard
      </Link>
    </div>
  );
}
