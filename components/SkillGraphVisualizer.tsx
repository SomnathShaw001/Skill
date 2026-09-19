'use client';

import React from 'react';
import { SkillNode } from '@/lib/types';
import { ShieldCheck, GitFork, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

interface SkillGraphVisualizerProps {
  skills: SkillNode[];
  onSelectSkill: (skill: SkillNode) => void;
  targetRole: string;
}

export const SkillGraphVisualizer: React.FC<SkillGraphVisualizerProps> = ({
  skills,
  onSelectSkill,
  targetRole,
}) => {
  const getSkill = (id: string) => skills.find((s) => s.skillId === id);

  const cloudSkills = skills.filter((s) => s.category === 'Cloud');
  const securitySkills = skills.filter((s) => s.category === 'Security');
  const engineeringSkills = skills.filter((s) => s.category === 'Engineering');

  const renderNode = (skill?: SkillNode) => {
    if (!skill) return null;
    const isStrong = skill.assessmentTier === 'Strong';
    const isModerate = skill.assessmentTier === 'Moderate';
    const isWeak = skill.assessmentTier === 'Weak';

    const borderColor = isStrong ? '#10B981' : isModerate ? '#F59E0B' : '#EF4444';
    const bgColor = isStrong
      ? 'rgba(16, 185, 129, 0.08)'
      : isModerate
      ? 'rgba(245, 158, 11, 0.08)'
      : 'rgba(239, 68, 68, 0.08)';

    return (
      <div
        onClick={() => onSelectSkill(skill)}
        style={{
          padding: '0.85rem 1rem',
          borderRadius: '10px',
          backgroundColor: bgColor,
          border: `1px solid ${borderColor}`,
          cursor: 'pointer',
          minWidth: '150px',
          transition: 'all 0.2s ease',
          boxShadow: `0 4px 12px rgba(0, 0, 0, 0.3)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = `0 8px 20px ${borderColor}33`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.3)`;
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            {skill.category}
          </span>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 800,
            color: borderColor,
            fontFamily: 'var(--font-mono)'
          }}>
            {skill.evidenceStrength}%
          </span>
        </div>

        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#F8FAFC', marginBottom: '0.35rem' }}>
          {skill.name}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          {isStrong ? (
            <CheckCircle2 size={12} color="#10B981" />
          ) : (
            <AlertTriangle size={12} color={borderColor} />
          )}
          <span>{skill.assessmentTier}</span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto', padding: '1rem 0' }}>
      <div style={{ minWidth: '850px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        
        {/* Tier 1: Target Role Root Node */}
        <div style={{
          padding: '1rem 2rem',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
          color: '#FFFFFF',
          fontWeight: 800,
          fontFamily: 'var(--font-heading)',
          fontSize: '1.25rem',
          letterSpacing: '-0.01em',
          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
        }}>
          <ShieldCheck size={22} />
          <span>{targetRole.toUpperCase()}</span>
        </div>

        {/* Vertical Trunk Connector */}
        <div style={{ width: '2px', height: '24px', backgroundColor: 'var(--border-active)' }} />

        {/* Tier 2: Three Domain Branches (Cloud, Security, Engineering) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem', width: '100%', maxWidth: '900px' }}>
          {/* Cloud Domain */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid #3B82F6',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: '#93C5FD',
              marginBottom: '1rem',
            }}>
              CLOUD ARCHITECTURE
            </div>
            <div style={{ width: '2px', height: '16px', backgroundColor: '#3B82F6', marginBottom: '0.5rem' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
              {cloudSkills.map((s) => (
                <div key={s.skillId}>{renderNode(s)}</div>
              ))}
            </div>
          </div>

          {/* Security Domain */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #EF4444',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: '#FCA5A5',
              marginBottom: '1rem',
            }}>
              SECURITY OPERATIONS
            </div>
            <div style={{ width: '2px', height: '16px', backgroundColor: '#EF4444', marginBottom: '0.5rem' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
              {securitySkills.map((s) => (
                <div key={s.skillId}>{renderNode(s)}</div>
              ))}
            </div>
          </div>

          {/* Engineering Domain */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10B981',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: '#6EE7B7',
              marginBottom: '1rem',
            }}>
              CORE ENGINEERING
            </div>
            <div style={{ width: '2px', height: '16px', backgroundColor: '#10B981', marginBottom: '0.5rem' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
              {engineeringSkills.map((s) => (
                <div key={s.skillId}>{renderNode(s)}</div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
