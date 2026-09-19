'use client';

import React, { useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import { generateDynamicSprintPlan, SprintDeliverable } from '../../lib/roadmap-engine';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  BookOpen,
  Hammer,
  Award,
  RefreshCw,
} from 'lucide-react';

export default function RoadmapPage() {
  const { user } = useAuth();
  const [hours, setHours] = useState(user?.weeklyHoursCommitment || 8);
  const [durationDays, setDurationDays] = useState(30);
  const [completedTaskIds, setCompletedTaskIds] = useState<Record<string, boolean>>({
    'd-101': true,
    'd-102': true,
  });

  const plan = generateDynamicSprintPlan(hours, durationDays, user?.targetRole || 'Cloud Security Engineer');

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  // Calculate total completed tasks
  const allTasks = plan.weeks.flatMap((w) => w.deliverables);
  const completedCount = allTasks.filter((t) => completedTaskIds[t.id]).length;
  const progressPercent = Math.round((completedCount / allTasks.length) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
            Phase 4 • Execution & Sprint Engine
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>
            {plan.sprintName}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            "Given what I can prove today and what the market asks for, what should I do next?" (GoThrough § 8)
          </p>
        </div>

        {/* Sprint Duration Switcher */}
        <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.04)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
          {[30, 60, 90].map((days) => (
            <button
              key={days}
              onClick={() => setDurationDays(days)}
              style={{
                background: durationDays === days ? 'var(--accent-blue)' : 'transparent',
                color: durationDays === days ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.35rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {days} Days
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Constraint Bar & Hours Recalculation (GoThrough § 17 Step 8 "Wow Moment") */}
      <div
        className="glass-panel"
        style={{
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          borderLeft: '4px solid #60A5FA',
        }}
      >
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Clock size={18} color="#60A5FA" />
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8FAFC' }}>
              Time Constraint Budget: <span style={{ color: '#60A5FA' }}>{hours} hours / week</span>
            </span>
            {hours === 5 && (
              <span className="badge badge-gap" style={{ fontSize: '0.7rem' }}>
                GoThrough § 17 Step 8 Test Mode
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            {plan.velocityDescription} Total sprint commitment: ~{plan.totalEstimatedHours} hours.
          </div>

          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <input
              type="range"
              min={3}
              max={25}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#3B82F6', cursor: 'pointer' }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: '#60A5FA', minWidth: '45px' }}>
              {hours} h/wk
            </span>
          </div>
        </div>

        {/* Quick Preset Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setHours(5)}
            className={hours === 5 ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
          >
            5 hrs/wk (Tight)
          </button>
          <button
            onClick={() => setHours(8)}
            className={hours === 8 ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
          >
            8 hrs/wk (Standard)
          </button>
          <button
            onClick={() => setHours(15)}
            className={hours === 15 ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
          >
            15 hrs/wk (Fast Track)
          </button>
        </div>
      </div>

      {/* Progress & Milestone Completion Counter */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <CheckCircle2 size={22} color="#10B981" />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8FAFC' }}>
              Sprint Deliverable Completion: {completedCount} of {allTasks.length} Milestones ({progressPercent}%)
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Check off deliverables as you complete them to trigger real-time skill graph recalculations.
            </div>
          </div>
        </div>

        <div style={{ width: '200px', height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: '#10B981', transition: 'width 0.3s ease' }} />
        </div>
      </div>

      {/* Weekly Breakdown: Learn → Build → Prove (GoThrough § 8 layout) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {plan.weeks.map((week) => {
          const weekDone = week.deliverables.every((d) => completedTaskIds[d.id]);
          const phaseColor =
            week.phase === 'LEARN' ? '#60A5FA' : week.phase === 'BUILD' ? '#A78BFA' : '#10B981';

          return (
            <div
              key={week.weekNumber}
              className="glass-panel"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: `3px solid ${phaseColor}`,
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {week.phase === 'LEARN' && <BookOpen size={16} color={phaseColor} />}
                    {week.phase === 'BUILD' && <Hammer size={16} color={phaseColor} />}
                    {week.phase === 'PROVE' && <Award size={16} color={phaseColor} />}
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: phaseColor, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      WEEK {week.weekNumber}: {week.phase}
                    </span>
                  </div>

                  <span
                    className={`badge ${weekDone ? 'badge-strong' : 'badge-moderate'}`}
                    style={{ fontSize: '0.7rem' }}
                  >
                    {weekDone ? 'Completed' : `${Math.round(hours / 4)} hrs budget`}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F8FAFC' }}>
                  {week.title}
                </h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Focus: {week.focusSkill}
                </div>

                {/* Deliverable Checkbox Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  {week.deliverables.map((item) => {
                    const isChecked = !!completedTaskIds[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleTask(item.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.65rem',
                          padding: '0.65rem',
                          borderRadius: '8px',
                          background: isChecked ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                          border: isChecked ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Controlled via container div
                          style={{ marginTop: '0.2rem', accentColor: '#10B981', cursor: 'pointer' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.8rem', color: isChecked ? '#D1FAE5' : '#F8FAFC', lineHeight: 1.35, textDecoration: isChecked ? 'line-through' : 'none' }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: isChecked ? '#10B981' : 'var(--text-muted)', marginTop: '0.25rem' }}>
                            ↳ Unlocks: {item.provenEvidenceUnlock} (~{item.estimatedHours}h)
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', fontStyle: 'italic' }}>
                {week.outcomeSummary}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expected Outcome Box (GoThrough § 8: Expected outcome) */}
      <div
        className="glass-panel"
        style={{
          padding: '1.75rem',
          backgroundColor: 'rgba(16, 185, 129, 0.04)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Sparkles size={20} color="#10B981" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10B981' }}>
            Expected Outcome After 30-Day Sprint (GoThrough § 8)
          </h3>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          By completing this targeted sprint grounded in your specific market gap, your Career Readiness Score increases from <strong>68% to 82%</strong>:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
          {plan.expectedEvidenceOutcomes.map((outcome, idx) => (
            <div
              key={idx}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                color: '#34D399',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              {outcome}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
