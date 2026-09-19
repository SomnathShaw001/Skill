'use client';

import React from 'react';
import { initialSkills } from '@/lib/mock-data';
import { GitFork, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function SkillGraphPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Visualization
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>
          Interactive Skill Graph
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
          A network of capabilities representing self-reported claims corroborated against verified evidence.
        </p>
      </div>

      {/* Graph Legend & Status */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <span className="badge badge-strong">🟢 Strong Evidence (&ge; 75%)</span>
        <span className="badge badge-moderate">🟡 Moderate Evidence (40-74%)</span>
        <span className="badge badge-gap">🔴 Critical Gap (&lt; 40%)</span>
      </div>

      {/* Graph Node Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {initialSkills.map((skill) => {
          const tierBadgeClass =
            skill.assessmentTier === 'Strong'
              ? 'badge-strong'
              : skill.assessmentTier === 'Moderate'
              ? 'badge-moderate'
              : 'badge-gap';

          return (
            <div
              key={skill.skillId}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderLeft:
                  skill.assessmentTier === 'Strong'
                    ? '4px solid #10B981'
                    : skill.assessmentTier === 'Moderate'
                    ? '4px solid #F59E0B'
                    : '4px solid #EF4444',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    {skill.category}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{skill.name}</h3>
                </div>
                <span className={`badge ${tierBadgeClass}`}>{skill.assessmentTier}</span>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Evidence Strength:</span>
                  <strong style={{ color: '#60A5FA' }}>{skill.evidenceStrength}%</strong>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${skill.evidenceStrength}%`,
                      height: '100%',
                      backgroundColor:
                        skill.assessmentTier === 'Strong'
                          ? '#10B981'
                          : skill.assessmentTier === 'Moderate'
                          ? '#F59E0B'
                          : '#EF4444',
                    }}
                  />
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div>Self-Claimed: <strong>{skill.selfReportedLevel}</strong></div>
                <div>Verified Artifacts: <strong>{skill.evidenceCount} sources</strong></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
