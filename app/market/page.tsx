'use client';

import React from 'react';
import { initialMarketSkills } from '@/lib/mock-data';
import { Radar, TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';

export default function MarketRadarPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Market Intelligence
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>
          Market Radar
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
          Real-time hiring demand frequency and velocity trends across current Cloud Security roles.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Required Capability</th>
              <th style={{ padding: '0.75rem 1rem' }}>Market Demand</th>
              <th style={{ padding: '0.75rem 1rem' }}>Trend Velocity</th>
              <th style={{ padding: '0.75rem 1rem' }}>Your Proven Evidence</th>
              <th style={{ padding: '0.75rem 1rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {initialMarketSkills.map((skill) => (
              <tr key={skill.skillId} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', fontSize: '0.95rem' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>{skill.skillName}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '100px', height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${skill.demandScore}%`, height: '100%', backgroundColor: skill.demandScore > 80 ? '#2563EB' : '#10B981' }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#60A5FA' }}>
                      {skill.demandScore}%
                    </span>
                  </div>
                </td>
                <td style={{ padding: '1rem', fontWeight: 700, color: skill.trend.includes('UP') ? '#34D399' : 'var(--text-muted)' }}>
                  {skill.trendSymbol} {skill.trend.replace('_', ' ')}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: skill.isCriticalGap ? '#F87171' : '#34D399', fontWeight: 600 }}>
                    {skill.currentEvidenceScore}%
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  {skill.isCriticalGap ? (
                    <span className="badge badge-gap">Critical Gap</span>
                  ) : (
                    <span className="badge badge-strong">Aligned</span>
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
