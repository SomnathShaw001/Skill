'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GitFork,
  FileCheck2,
  Radar,
  TrendingUp,
  CalendarDays,
  UserCheck,
  Bot
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Skill Graph', href: '/graph', icon: GitFork },
  { label: 'Evidence Hub', href: '/evidence', icon: FileCheck2 },
  { label: 'Market Radar', href: '/market', icon: Radar },
  { label: 'Career Gap', href: '/gap', icon: TrendingUp },
  { label: '30-Day Sprint', href: '/roadmap', icon: CalendarDays },
  { label: 'Profile & Target', href: '/profile', icon: UserCheck },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside style={{
      width: '240px',
      height: 'calc(100vh - 64px)',
      backgroundColor: 'var(--bg-dark)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '1.25rem 0.75rem',
      position: 'sticky',
      top: '64px',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <div style={{
          padding: '0 0.75rem 0.75rem',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          fontWeight: 600,
        }}>
          Intelligence Menu
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={18} color={isActive ? '#60A5FA' : '#94A3B8'} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Bedrock AI Career Agent Card */}
      <div style={{
        padding: '1rem',
        borderRadius: '12px',
        background: 'linear-gradient(145deg, rgba(37, 99, 235, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.25)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Bot size={16} color="#A78BFA" />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#C4B5FD' }}>
            Amazon Bedrock
          </span>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '0.75rem' }}>
          Career Agent ready with tool grounding on your verified graph.
        </p>
        <Link
          href="/dashboard#agent-drawer"
          style={{
            display: 'block',
            textAlign: 'center',
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '0.4rem',
            borderRadius: '6px',
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            color: '#E9D5FF',
            border: '1px solid rgba(139, 92, 246, 0.4)',
          }}
        >
          Ask Agent
        </Link>
      </div>
    </aside>
  );
};
