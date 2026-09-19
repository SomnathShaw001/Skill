'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  AlertTriangle,
  Layers,
  ArrowRight,
  GitPullRequest,
  CheckCircle2,
  Sparkles,
  Zap,
  Network,
  ArrowDown,
} from 'lucide-react';
import { calculateCareerGaps, SYSTEMIC_DEPENDENCY_CHAINS, CareerGapAnalysisItem } from '../../lib/gap-engine';

export default function CareerGapPage() {
  const gaps = calculateCareerGaps('cloud-security-engineer');
  const [selectedGap, setSelectedGap] = useState<CareerGapAnalysisItem>(gaps[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Header */}
      <div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Phase 4 • Optimization & Systemic Leverage
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>
          Career Gap & Leverage Matrix
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
          SkillGraph doesn't merely sort your gaps. We calculate systemic leverage to identify the shortest practical path.
        </p>
      </div>

      {/* Triad of Gap Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid #EF4444' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Critical Skill Gaps
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F87171', marginTop: '0.25rem' }}>
            4 Gaps Detected
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            IAM (51%), Terraform (52%), SIEM (47%)
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid #8B5CF6' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Highest Leverage Multiplier
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#A78BFA', marginTop: '0.25rem' }}>
            3.2x (Terraform)
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Unlocks 3 downstream cloud capabilities
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid #10B981' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Proven Surplus Areas
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34D399', marginTop: '0.25rem' }}>
            2 Strengths
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Python (+11%), Docker (+7%) vs market
          </div>
        </div>
      </div>

      {/* Main Two Column: YOU vs MARKET Comparative Table & Dependency Traversal */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        
        {/* YOUR GAP: YOU vs MARKET (GoThrough § 7 exact table) */}
        <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Your Gap: Proven vs. Market</h2>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sorted by Systemic Leverage Priority</div>
            </div>
            <span className="badge badge-strong">Target: Cloud Security</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  <th style={{ padding: '0.65rem 0.75rem' }}>Capability</th>
                  <th style={{ padding: '0.65rem 0.75rem' }}>YOU</th>
                  <th style={{ padding: '0.65rem 0.75rem' }}>MARKET</th>
                  <th style={{ padding: '0.65rem 0.75rem' }}>Gap / Delta</th>
                  <th style={{ padding: '0.65rem 0.75rem' }}>Leverage</th>
                </tr>
              </thead>
              <tbody>
                {gaps.map((item) => {
                  const isSelected = selectedGap?.skillId === item.skillId;
                  return (
                    <tr
                      key={item.skillId}
                      onClick={() => setSelectedGap(item)}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        backgroundColor: isSelected ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
                        transition: 'background 0.15s',
                      }}
                    >
                      <td style={{ padding: '0.75rem', fontWeight: 600, color: '#F8FAFC' }}>
                        {item.skillName}
                      </td>

                      <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: item.gapSize > 0 ? '#F87171' : '#34D399' }}>
                        {item.userScore}%
                      </td>

                      <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#60A5FA' }}>
                        {item.marketDemand}%
                      </td>

                      <td style={{ padding: '0.75rem' }}>
                        {item.gapSize > 0 ? (
                          <span style={{ color: '#F87171', fontWeight: 600, fontSize: '0.8rem' }}>
                            -{item.gapSize}%
                          </span>
                        ) : (
                          <span style={{ color: '#34D399', fontWeight: 600, fontSize: '0.8rem' }}>
                            +{item.surplus}% (Surplus)
                          </span>
                        )}
                      </td>

                      <td style={{ padding: '0.75rem' }}>
                        <span
                          className={`badge ${item.leverageMultiplier >= 2.5 ? 'badge-gap' : 'badge-moderate'}`}
                          style={{ fontSize: '0.7rem' }}
                        >
                          {item.leverageMultiplier}x
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <Link
              href="/roadmap"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Generate 30-Day Sprint Plan from Gaps <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Systemic Dependency Traversal Explorer */}
        <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Network size={20} color="#A78BFA" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Dependency & Leverage Traversal</h2>
            </div>
            <span className="badge badge-strong" style={{ background: 'rgba(167, 139, 250, 0.15)', color: '#C4B5FD' }}>
              GoThrough § 7 Model
            </span>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.4 }}>
            Closing high-leverage foundational skills unlocks multiple downstream capabilities simultaneously.
          </p>

          {/* Selected Skill Focus Box */}
          {selectedGap && (
            <div
              style={{
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                padding: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ fontWeight: 700, color: '#F8FAFC', fontSize: '1rem' }}>
                  {selectedGap.skillName} (Priority #{selectedGap.priorityRank})
                </div>
                <span className="badge badge-gap">
                  Leverage: {selectedGap.leverageMultiplier}x
                </span>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Deficit of <strong>{selectedGap.gapSize}%</strong> against market demand.
                {selectedGap.downstreamUnlocks.length > 0 && (
                  <span> Resolving this bottleneck directly unlocks:</span>
                )}
              </div>

              {/* Traversal Chain Visual */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ padding: '0.65rem 0.85rem', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#F87171', fontWeight: 600, fontSize: '0.85rem' }}>
                  🎯 Root Bottleneck: {selectedGap.skillName}
                </div>

                {selectedGap.downstreamUnlocks.map((unlock, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '1rem' }}>
                    <ArrowDown size={14} color="#A78BFA" style={{ margin: '0.15rem 0' }} />
                    <div style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.2)', color: '#C4B5FD', fontSize: '0.8rem', width: '100%' }}>
                      ↳ Unlocks: {unlock}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Canonical Chains Reference */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Master Unlock Traversal Chains
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {SYSTEMIC_DEPENDENCY_CHAINS.map((c, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.75rem',
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#A78BFA', marginBottom: '0.2rem' }}>
                    {c.chain.join(' → ')}
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>{c.rationale}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
