'use client';

import React from 'react';
import { Upload, GitBranch, FileCheck, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function EvidencePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Verification
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>
          Evidence Hub
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
          SkillGraph measures what you can prove. Connect authorized artifacts to update your graph.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {/* S3 Resume Ingestion Card */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Upload size={20} color="#60A5FA" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Resume Intelligence</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Uploaded directly to Amazon S3 and processed by Amazon Bedrock for canonical skill extraction.
            </p>

            <div style={{
              border: '2px dashed var(--border-subtle)',
              borderRadius: '12px',
              padding: '2.5rem 1.5rem',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              marginBottom: '1rem',
            }}>
              <FileCheck size={36} color="#60A5FA" style={{ margin: '0 auto 0.75rem' }} />
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                resume_somnath_security_2026.pdf
              </div>
              <div style={{ fontSize: '0.8rem', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={14} /> Synced & Extracted (6 verified skills)
              </div>
            </div>
          </div>

          <button className="btn-secondary" style={{ width: '100%', fontSize: '0.85rem' }}>
            Upload Updated Resume
          </button>
        </div>

        {/* GitHub Repository Intelligence Card */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <GitBranch size={20} color="#A78BFA" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>GitHub Developer Signals</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Deep code inspection extracting SDK imports, IaC manifests, and testing evidence.
            </p>

            <div style={{
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 600, color: '#F1F5F9' }}>somnath/iot-security-platform</span>
                <span className="badge badge-strong">8 Signals</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Detected: Python (68%), AWS SDK (`boto3`), Dockerfile, PyTest test suite, CI/CD Actions.
              </p>
            </div>

            <div style={{
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 600, color: '#F1F5F9' }}>somnath/cloud-audit-agent</span>
                <span className="badge badge-strong">5 Signals</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Detected: TypeScript, AWS CDK manifests, DynamoDB queries, REST endpoints.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <span className="badge badge-strong" style={{ width: '100%', justifyContent: 'center', padding: '0.5rem' }}>
              <CheckCircle2 size={14} /> GitHub Connected (@somnath)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
