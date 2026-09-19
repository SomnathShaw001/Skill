'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Radar,
  GitPullRequest,
  Bot,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow orbs */}
      <div
        className="glow-orb"
        style={{
          width: '500px',
          height: '500px',
          background: 'rgba(37, 99, 235, 0.25)',
          top: '-100px',
          left: '15%',
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: '450px',
          height: '450px',
          background: 'rgba(139, 92, 246, 0.2)',
          top: '200px',
          right: '10%',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem 6rem', position: 'relative', zIndex: 1 }}>
        {/* Top Tag & Lane Banner */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '9999px',
            padding: '0.35rem 0.9rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#60A5FA',
          }}>
            <Sparkles size={14} /> #commercial-potential
          </span>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '9999px',
            padding: '0.35rem 0.9rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#34D399',
          }}>
            #startup lane
          </span>
        </div>

        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 4rem' }}>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
          }}>
            Your career is not a résumé. <br />
            It’s a <span className="gradient-text">continuously changing skill graph</span>.
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            fontWeight: 400,
          }}>
            "Given what I can actually prove today and what the market is asking for, what should I do next?"
            SkillGraph calculates your real gap, system leverage, and the shortest sprint to close it.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
              Launch Your Career Graph <ArrowRight size={18} />
            </Link>
            <Link href="/dashboard" className="btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
              Explore Live Demo
            </Link>
          </div>
        </div>

        {/* Live ASCII Teaser Preview Card */}
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '960px', margin: '0 auto 5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '1rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginLeft: '0.5rem' }}>
                live_career_intelligence.sh
              </span>
            </div>
            <span className="badge badge-strong">Target: Cloud Security Engineer</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Left readiness summary */}
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Overall Career Readiness
              </div>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#60A5FA' }}>
                68%
              </div>
              <div style={{ width: '100%', height: '10px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, #2563EB, #60A5FA)' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Market Alignment</span>
                  <strong>74%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Evidence Strength</span>
                  <strong>61%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Skill Coverage</span>
                  <strong>72%</strong>
                </div>
              </div>
            </div>

            {/* Right Signal Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#F87171' }}>
                <AlertTriangle size={20} />
                <span style={{ fontSize: '0.95rem' }}><strong>4 critical skill gaps</strong> (IAM, Terraform, SIEM)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#60A5FA' }}>
                <TrendingUp size={20} />
                <span style={{ fontSize: '0.95rem' }}><strong>3 skills increasing</strong> in market demand</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#34D399' }}>
                <CheckCircle2 size={20} />
                <span style={{ fontSize: '0.95rem' }}><strong>7 skills strongly supported</strong> by code evidence</span>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <Link href="/dashboard" className="btn-primary" style={{ width: '100%' }}>
                  View Full Career Intelligence Graph
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <ShieldCheck size={22} color="#60A5FA" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>1. Evidence Over Claims</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Measures what you can actually demonstrate through resumes and authorized GitHub code, not what you merely claim.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Radar size={22} color="#34D399" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>2. Live Market Radar</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Continuously ground your skill trajectory in real-time employer demand velocity without web scrape noise.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Layers size={22} color="#A78BFA" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>3. Systemic Leverage</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Prioritizes foundational skills (like Terraform) that unlock multiple downstream capabilities on your career graph.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Bot size={22} color="#FBBF24" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>4. Bedrock Career Agent</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Strictly grounded AI tools that reason from your verified graph to explain why you aren't ready and budget your time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
