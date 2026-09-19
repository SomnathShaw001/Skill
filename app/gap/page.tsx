'use client';

import React from 'react';
import { initialGaps } from '@/lib/mock-data';
import { TrendingUp, AlertTriangle, Layers, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CareerGapPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Optimization Engine
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>
          Career Gap & Leverage Matrix
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
          SkillGraph doesn't merely sort your gaps. We calculate systemic leverage to find the shortest path.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {initialGaps.map((gap) => (
          <div key={gap.skillId} className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{gap.skillName}</h3>
                <span className="badge badge-gap">Priority #{gap.priorityRank}</span>
              </div>

              {/* Progress bars: You vs Market */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    <span>Your Proven Evidence</span>
                    <strong style={{ color: '#F87171' }}>{gap.userScore}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px' }}>
                    <div style={{ width: `${gap.userScore}%`, height: '100%', backgroundColor: '#EF4444' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    <span>Market Role Demand</span>
                    <strong style={{ color: '#60A5FA' }}>{gap.marketDemand}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px' }}>
                    <div style={{ width: `${gap.marketDemand}%`, height: '100%', backgroundColor: '#3B82F6' }} />
                  </div>
                </div>
              </div>

              {/* Downstream Unlocks */}
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(139, 92, 246, 0.08)', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.2)', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#C4B5FD', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={14} /> Systemic Leverage ({gap.leverageMultiplier}x Multiplier)
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Unlocks: {gap.downstreamUnlocks.join(', ')}
                </div>
              </div>
            </div>

            <Link href="/roadmap" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
              Add to Sprint Roadmap <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
