'use client';

import React, { useState } from 'react';
import { initialSkills } from '@/lib/mock-data';
import { SkillNode } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';
import { SkillGraphVisualizer } from '@/components/SkillGraphVisualizer';
import { SkillDetailModal } from '@/components/SkillDetailModal';
import { GitFork, Info } from 'lucide-react';

export default function SkillGraphPage() {
  const { user } = useAuth();
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);

  const targetRole = user?.targetRole || 'Cloud Security Engineer';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
            Visual Architecture
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>
            Interactive Skill Graph
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Click any capability node to inspect underlying GitHub and resume evidence proof.
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="badge badge-strong">🟢 Strong Evidence (&ge; 75%)</span>
          <span className="badge badge-moderate">🟡 Moderate (40–74%)</span>
          <span className="badge badge-gap">🔴 Critical Gap (&lt; 40%)</span>
        </div>
      </div>

      {/* Main Canvas View */}
      <div className="glass-panel" style={{ padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          marginBottom: '1.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          padding: '0.4rem 0.85rem',
          borderRadius: '20px',
        }}>
          <Info size={14} color="#60A5FA" />
          <span>Nodes represent verified capabilities. Sub-nodes reflect downstream unlock dependencies.</span>
        </div>

        <SkillGraphVisualizer
          skills={initialSkills}
          onSelectSkill={(skill) => setSelectedSkill(skill)}
          targetRole={targetRole}
        />
      </div>

      {/* Detail Slide-Over Modal */}
      {selectedSkill && (
        <SkillDetailModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </div>
  );
}
