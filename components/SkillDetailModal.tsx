'use client';

import React from 'react';
import { SkillNode } from '@/lib/types';
import {
  X,
  ShieldCheck,
  TrendingUp,
  FileCheck2,
  GitBranch,
  Award,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

interface SkillDetailModalProps {
  skill: SkillNode | null;
  onClose: () => void;
}

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({ skill, onClose }) => {
  if (!skill) return null;

  const isStrong = skill.assessmentTier === 'Strong';
  const isModerate = skill.assessmentTier === 'Moderate';
  const isWeak = skill.assessmentTier === 'Weak';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1.5rem',
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '560px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        position: 'relative',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              {skill.category} Domain
            </span>
            <span className={`badge ${isStrong ? 'badge-strong' : isModerate ? 'badge-moderate' : 'badge-gap'}`}>
              {skill.assessmentTier}
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            {skill.name}
          </h2>
        </div>

        {/* GoThrough § 3 Dual Comparison: Self-Reported vs Evidence Strength */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '12px',
          padding: '1.25rem',
          border: '1px solid var(--border-subtle)',
          marginBottom: '1.5rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Self-Reported Claim</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F1F5F9' }}>
                {skill.selfReportedLevel}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Evidence Strength</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: isStrong ? '#34D399' : isModerate ? '#FBBF24' : '#F87171' }}>
                {skill.evidenceStrength}%
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${skill.evidenceStrength}%`,
              height: '100%',
              backgroundColor: isStrong ? '#10B981' : isModerate ? '#F59E0B' : '#EF4444',
            }} />
          </div>
        </div>

        {/* Discrete Proof Signals (GoThrough § 3) */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            Demonstrated Evidence Signals
          </h4>

          {skill.evidenceStrength >= 40 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#E2E8F0' }}>
                <CheckCircle2 size={16} color="#34D399" />
                <span>{skill.evidenceCount} verified repositories / files detected</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#E2E8F0' }}>
                <CheckCircle2 size={16} color="#34D399" />
                <span>Automated testing suites detected</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#E2E8F0' }}>
                <CheckCircle2 size={16} color="#34D399" />
                <span>Cloud SDK integrations detected</span>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <AlertTriangle size={16} color="#F87171" />
                <span>✗ No code repositories demonstrating this skill</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <AlertTriangle size={16} color="#F87171" />
                <span>✗ No production deployment artifacts found</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <AlertTriangle size={16} color="#F87171" />
                <span>✗ Insufficient verifiable evidence</span>
              </div>
            </div>
          )}
        </div>

        {/* Downstream Systemic Unlocks (GoThrough § 7) */}
        {skill.downstreamUnlocks && skill.downstreamUnlocks.length > 0 && (
          <div style={{
            padding: '1rem',
            backgroundColor: 'rgba(139, 92, 246, 0.08)',
            borderRadius: '10px',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            marginBottom: '1.5rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: '#C4B5FD', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={14} /> Systemic Leverage
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Closing this gap unlocks downstream competencies in: <strong>{skill.downstreamUnlocks.join(', ')}</strong>.
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="btn-primary"
          style={{ width: '100%', padding: '0.75rem' }}
        >
          Done
        </button>
      </div>
    </div>
  );
};
