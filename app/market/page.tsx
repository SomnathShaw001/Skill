'use client';

import React, { useState } from 'react';
import {
  Radar,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Info,
  Database,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { getMarketProfileForRole } from '../../lib/market-engine';
import { initialSkills } from '../../lib/mock-data';

export default function MarketRadarPage() {
  const [selectedRole, setSelectedRole] = useState('cloud-security-engineer');
  const marketProfile = getMarketProfileForRole(selectedRole);

  // Map user's current evidence strength against market demand
  const skillsWithUserEvidence = marketProfile.skills.map((marketSkill) => {
    const userSkill = initialSkills.find((s) => s.skillId === marketSkill.skillId);
    const userScore = userSkill ? userSkill.evidenceStrength : 0;
    const gap = marketSkill.demandScore - userScore;
    const isCritical = gap > 30;

    return {
      ...marketSkill,
      userScore,
      gap,
      isCritical,
    };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
            Phase 3 • Market Intelligence
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>
            Market Radar
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Real-time hiring demand frequency and velocity trends across current cloud security roles.
          </p>
        </div>

        {/* Role Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.04)', padding: '0.35rem 0.5rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#F8FAFC',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="cloud-security-engineer" style={{ background: '#0F172A' }}>Cloud Security Engineer</option>
            <option value="devops-engineer" style={{ background: '#0F172A' }}>DevOps / Platform Engineer</option>
          </select>
        </div>
      </div>

      {/* Dataset Attribution & Market Metadata Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          borderLeft: '4px solid #2563EB',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Database size={20} color="#60A5FA" />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8FAFC' }}>
              Curated Market Dataset (O*NET & Cloud Security Postings Index)
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
              Sample: 1,420 postings • License: CC BY 4.0 / Public Domain • Legally accessible data (GoThrough § 5 & § 6)
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg Compensation</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10B981' }}>{marketProfile.averageSalary}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Role Growth</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#60A5FA' }}>{marketProfile.marketGrowthRate}</div>
          </div>
        </div>
      </div>

      {/* Market Radar Table (GoThrough § 6 layout) */}
      <div className="glass-panel" style={{ padding: '1.75rem', overflowX: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Radar size={18} color="#60A5FA" /> Required Capabilities & Market Velocity
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Comparing Your Evidence vs. Market Demand
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Capability</th>
              <th style={{ padding: '0.75rem 1rem' }}>Hiring Demand</th>
              <th style={{ padding: '0.75rem 1rem' }}>Trend</th>
              <th style={{ padding: '0.75rem 1rem' }}>Your Proven Evidence</th>
              <th style={{ padding: '0.75rem 1rem' }}>Top Mentioned In Postings</th>
              <th style={{ padding: '0.75rem 1rem' }}>Priority Status</th>
            </tr>
          </thead>
          <tbody>
            {skillsWithUserEvidence.map((item) => (
              <tr
                key={item.skillId}
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                  fontSize: '0.9rem',
                  transition: 'background 0.2s',
                }}
              >
                <td style={{ padding: '1rem', fontWeight: 600, color: '#F8FAFC' }}>
                  {item.name}
                </td>

                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '120px', height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${item.demandScore}%`,
                          height: '100%',
                          backgroundColor: item.demandScore > 80 ? '#2563EB' : item.demandScore > 60 ? '#3B82F6' : '#60A5FA',
                          borderRadius: '4px',
                        }}
                      />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#60A5FA', fontSize: '0.85rem' }}>
                      {item.demandScore}%
                    </span>
                  </div>
                </td>

                <td style={{ padding: '1rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: item.trend === 'up-up' ? '#34D399' : item.trend === 'up' ? '#10B981' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <span>{item.trendArrow}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                      {item.trendLabel}
                    </span>
                  </span>
                </td>

                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        color: item.isCritical ? '#F87171' : '#34D399',
                        fontSize: '0.85rem',
                      }}
                    >
                      {item.userScore}%
                    </span>
                    {item.isCritical && (
                      <span style={{ fontSize: '0.7rem', color: '#F87171' }}>
                        (-{item.gap}%)
                      </span>
                    )}
                  </div>
                </td>

                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {item.topMentionedIn?.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.2rem 0.45rem',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>

                <td style={{ padding: '1rem' }}>
                  {item.isCritical ? (
                    <span className="badge badge-gap">
                      Critical Gap
                    </span>
                  ) : item.userScore >= 60 ? (
                    <span className="badge badge-strong">
                      Aligned
                    </span>
                  ) : (
                    <span className="badge badge-moderate">
                      Moderate
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
