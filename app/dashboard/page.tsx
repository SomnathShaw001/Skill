'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { initialSkills, initialMarketSkills, initialGaps } from '@/lib/mock-data';
import {
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  GitFork,
  Radar,
  Sparkles,
  Bot,
  Send,
  Calendar,
  Layers,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import CareerAgentChat from '@/components/CareerAgentChat';

export default function DashboardPage() {
  const { user } = useAuth();

  const profile = user || {
    name: 'Somnath',
    targetRole: 'Cloud Security Engineer',
    careerReadiness: 68,
    marketAlignment: 74,
    evidenceStrength: 61,
    skillCoverage: 72,
    weeklyHoursCommitment: 8,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
            Command Center
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>
            Career Intelligence
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Active Target:</span>
            <strong style={{ color: '#60A5FA', fontSize: '0.9rem' }}>{profile.targetRole}</strong>
          </div>
          <Link href="/profile" className="btn-secondary" style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}>
            Switch Role
          </Link>
        </div>
      </div>

      {/* Main Career Readiness Hero Card (GoThrough § 1) */}
      <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          {/* Left Readiness Column */}
          <div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Overall Career Readiness
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '4.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#60A5FA', lineHeight: 1 }}>
                {profile.careerReadiness}%
              </span>
              <span style={{ color: '#34D399', fontSize: '1rem', fontWeight: 600 }}>
                +14% vs. last sprint
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div style={{
              width: '100%',
              height: '14px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '7px',
              overflow: 'hidden',
              marginBottom: '2rem',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
            }}>
              <div style={{
                width: `${profile.careerReadiness}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #2563EB 0%, #60A5FA 50%, #34D399 100%)',
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.6)',
              }} />
            </div>

            {/* KPI Triad */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Market Alignment</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{profile.marketAlignment}%</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Evidence Strength</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{profile.evidenceStrength}%</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Skill Coverage</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{profile.skillCoverage}%</div>
              </div>
            </div>
          </div>

          {/* Right Signals & CTA Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '2rem' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Signal Highlights
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#F87171' }}>
              <AlertTriangle size={20} />
              <span style={{ fontSize: '1rem' }}><strong>4 critical skill gaps</strong> (IAM, Terraform, SIEM)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#60A5FA' }}>
              <TrendingUp size={20} />
              <span style={{ fontSize: '1rem' }}><strong>3 skills increasing</strong> in market demand</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#34D399' }}>
              <CheckCircle2 size={20} />
              <span style={{ fontSize: '1rem' }}><strong>7 skills strongly supported</strong> by code evidence</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/graph" className="btn-primary" style={{ flex: 1, textAlign: 'center' }}>
                <GitFork size={16} /> View Career Graph
              </Link>
              <Link href="/roadmap" className="btn-secondary" style={{ flex: 1, textAlign: 'center' }}>
                <Calendar size={16} /> 30-Day Sprint
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Gap Analysis Preview & Market Radar Quick View */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* Gap Summary Card */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={20} color="#F87171" />
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Priority Gap Leverage</h2>
            </div>
            <Link href="/gap" style={{ fontSize: '0.85rem', color: '#60A5FA', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              All Gaps <ChevronRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {initialGaps.slice(0, 3).map((gap) => (
              <div
                key={gap.skillId}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{gap.skillName}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    You: <strong>{gap.userScore}%</strong> vs. Market: <strong>{gap.marketDemand}%</strong>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-gap">Priority #{gap.priorityRank}</span>
                  <div style={{ fontSize: '0.75rem', color: '#A78BFA', marginTop: '0.3rem' }}>
                    {gap.leverageMultiplier}x Leverage
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Radar Quick View */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Radar size={20} color="#34D399" />
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Market Demand Velocity</h2>
            </div>
            <Link href="/market" style={{ fontSize: '0.85rem', color: '#60A5FA', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Market Radar <ChevronRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {initialMarketSkills.slice(0, 4).map((skill) => (
              <div key={skill.skillId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ fontWeight: 500 }}>{skill.skillName}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '120px', height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${skill.demandScore}%`, height: '100%', backgroundColor: skill.demandScore > 80 ? '#2563EB' : '#10B981' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#60A5FA', width: '35px', textAlign: 'right' }}>
                    {skill.demandScore}%
                  </span>
                  <span style={{ color: skill.trend.includes('UP') ? '#34D399' : 'var(--text-muted)', fontWeight: 700 }}>
                    {skill.trendSymbol}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bedrock AI Career Agent Interactive Console (GoThrough § 10, § 17) */}
      <div id="agent-drawer">
        <CareerAgentChat targetRole={profile.targetRole} />
      </div>
    </div>
  );
}
