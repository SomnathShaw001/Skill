'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { generateSprintRoadmap } from '@/lib/mock-data';
import { Calendar, Clock, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RoadmapPage() {
  const { user } = useAuth();
  const [hours, setHours] = useState(user?.weeklyHoursCommitment || 8);

  const roadmap = generateSprintRoadmap(hours, user?.targetRole || 'Cloud Security Engineer');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Sprint Engine
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>
          30-Day Career Sprint
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
          "Given what I can prove today and what the market asks for, what should I do next?"
        </p>
      </div>

      {/* Dynamic Constraint Bar */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={16} color="#60A5FA" /> Time Constraint Budget:
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#60A5FA', fontFamily: 'var(--font-heading)' }}>
            {hours} hours / week
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setHours(5)}
            className={hours === 5 ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
          >
            5 hrs/wk (Tight Budget)
          </button>
          <button
            onClick={() => setHours(8)}
            className={hours === 8 ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
          >
            8 hrs/wk (Standard)
          </button>
          <button
            onClick={() => setHours(15)}
            className={hours === 15 ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
          >
            15 hrs/wk (Accelerated)
          </button>
        </div>
      </div>

      {/* 4-Week Sprint Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {roadmap.weeks.map((week) => (
          <div key={week.weekNumber} className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Week {week.weekNumber}
                </span>
                <span className={`badge ${week.phase === 'LEARN' ? 'badge-moderate' : week.phase === 'BUILD' ? 'badge-strong' : 'badge-gap'}`}>
                  {week.phase}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: '#F8FAFC' }}>
                {week.focusSkill}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {week.deliverables.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#60A5FA', marginTop: '6px', flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
              Allocated: ~{Math.round(hours / 4 * 10) / 10} hours this week
            </div>
          </div>
        ))}
      </div>

      {/* Expected Outcome Box */}
      <div className="glass-panel" style={{ padding: '1.75rem', backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34D399', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} /> Expected Sprint Outcomes
        </h3>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {roadmap.expectedOutcomes.map((outcome, i) => (
            <span key={i} style={{ fontSize: '0.9rem', color: '#E2E8F0', fontWeight: 500 }}>
              {outcome}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
