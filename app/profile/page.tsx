'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { availableTargetRoles } from '@/lib/mock-data';
import {
  User,
  ShieldCheck,
  Clock,
  Save,
  CheckCircle2,
  Lock,
  Mail,
  Cloud,
} from 'lucide-react';

export default function ProfilePage() {
  const { user, updateTargetRole, updateWeeklyHours } = useAuth();
  const [selectedRole, setSelectedRole] = useState(user?.targetRole || 'Cloud Security Engineer');
  const [hours, setHours] = useState(user?.weeklyHoursCommitment || 8);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateTargetRole(selectedRole);
    updateWeeklyHours(hours);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Configuration
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>
          Profile & Target Role
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
          Manage your target career specialization and available sprint time budget.
        </p>
      </div>

      {isSaved && (
        <div style={{
          padding: '1rem',
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '8px',
          color: '#34D399',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.9rem',
        }}>
          <CheckCircle2 size={18} /> Profile & target role settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* User Identity Section */}
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} color="#60A5FA" /> Candidate Details
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Full Name
              </label>
              <input
                type="text"
                disabled
                value={user?.name || 'Somnath'}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  color: 'var(--text-muted)',
                  fontSize: '0.95rem',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Email Address (Cognito Verified)
              </label>
              <input
                type="email"
                disabled
                value={user?.email || 'somnath@skillgraph.dev'}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  color: 'var(--text-muted)',
                  fontSize: '0.95rem',
                }}
              />
            </div>
          </div>
        </div>

        {/* Target Role Selector (Task 3.5) */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} color="#10B981" /> Target Role Selection
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Changing your target role re-weights market demand and adjusts critical skill gap calculations.
          </p>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {availableTargetRoles.map((role) => (
              <option key={role} value={role} style={{ backgroundColor: '#0A0D15', color: '#fff' }}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Weekly Hours Commitment */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} color="#F59E0B" /> Weekly Time Commitment
            </h2>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F59E0B', fontFamily: 'var(--font-heading)' }}>
              {hours} hours / week
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Used by the Roadmap Engine to generate realistic 30-day "Learn → Build → Prove" sprints.
          </p>

          <input
            type="range"
            min="3"
            max="25"
            step="1"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: '#2563EB', cursor: 'pointer' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            <span>3 hrs (Focused sprint)</span>
            <span>8 hrs (Standard sprint)</span>
            <span>25 hrs (Full-time intensive)</span>
          </div>
        </div>

        {/* AWS Backend Persistence Notice */}
        <div style={{
          padding: '1rem',
          borderRadius: '8px',
          backgroundColor: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <Cloud size={20} color="#60A5FA" />
          <div style={{ fontSize: '0.8rem', color: '#93C5FD' }}>
            Changes are saved to your authenticated Cognito user attributes and synced to DynamoDB (`PK: USER#somnath`, `SK: PROFILE`).
          </div>
        </div>

        <div>
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
            <Save size={16} /> Save Profile & Recalculate Graph
          </button>
        </div>
      </form>
    </div>
  );
}
