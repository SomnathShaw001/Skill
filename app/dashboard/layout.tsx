'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', width: '100%', minHeight: 'calc(100vh - 64px)' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '2rem', maxWidth: '1400px', margin: '0 auto', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
}
