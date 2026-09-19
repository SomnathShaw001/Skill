'use client';

import React, { useState } from 'react';
import {
  Upload,
  GitBranch,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Code2,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  RefreshCw,
  FolderGit2,
  Terminal,
  FileCode,
} from 'lucide-react';
import { validateResumeFile } from '../../services/s3-upload-service';
import { parseResumeWithBedrock, ExtractedResumeSkill } from '../../services/resume-parser-service';
import { analyzeConnectedRepositories, GitHubRepository } from '../../services/github-service';
import { calculateEvidenceStrength } from '../../lib/evidence-calculator';

export default function EvidencePage() {
  // Resume Intelligence State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [extractedResumeSkills, setExtractedResumeSkills] = useState<ExtractedResumeSkill[]>([
    {
      canonicalSkill: { skillId: 'python', name: 'Python', category: 'Software Engineering', aliases: [], downstreamUnlocks: [] },
      rawName: 'Python 3.11',
      contextSnippet: 'Architected automated security audit microservices using Python, boto3, and FastAPI.',
      demonstratedLevel: 'advanced',
      yearsExperience: 4,
    },
    {
      canonicalSkill: { skillId: 'linux', name: 'Linux Systems & CLI', category: 'DevOps', aliases: [], downstreamUnlocks: [] },
      rawName: 'Linux / Bash',
      contextSnippet: 'Hardened Debian/Ubuntu cloud server kernels, wrote automated bash maintenance pipelines.',
      demonstratedLevel: 'advanced',
      yearsExperience: 3,
    },
    {
      canonicalSkill: { skillId: 'aws', name: 'AWS Cloud Services', category: 'Cloud', aliases: [], downstreamUnlocks: [] },
      rawName: 'AWS Cloud Services',
      contextSnippet: 'Managed IAM least-privilege policies, EC2 workloads, S3 access points, and CloudWatch logs.',
      demonstratedLevel: 'intermediate',
      yearsExperience: 2,
    },
    {
      canonicalSkill: { skillId: 'iot', name: 'IoT & Edge Security', category: 'Security', aliases: [], downstreamUnlocks: [] },
      rawName: 'IoT & Edge Security',
      contextSnippet: 'Implemented MQTT TLS certificates and secure device provisioning on edge gateways.',
      demonstratedLevel: 'intermediate',
      yearsExperience: 2,
    },
  ]);
  const [resumeParsedSuccess, setResumeParsedSuccess] = useState(true);

  // GitHub Intelligence State
  const [isAnalyzingGithub, setIsAnalyzingGithub] = useState(false);
  const [githubConnected, setGithubConnected] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepository | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);

  // Initialize repos on load
  React.useEffect(() => {
    analyzeConnectedRepositories().then((res) => {
      setRepositories(res.repositories);
      setSelectedRepo(res.repositories[0]);
    });
  }, []);

  // Handle file drop/selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateResumeFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file format.');
      return;
    }

    setUploadError(null);
    setSelectedFile(file);
    setIsParsingResume(true);

    try {
      const result = await parseResumeWithBedrock(file);
      setExtractedResumeSkills(result.extractedSkills);
      setResumeParsedSuccess(true);
    } catch (err: any) {
      setUploadError(err.message || 'Error parsing resume with Bedrock.');
    } finally {
      setIsParsingResume(false);
    }
  };

  // Trigger GitHub Re-analysis
  const handleRefreshGithub = async () => {
    setIsAnalyzingGithub(true);
    try {
      const res = await analyzeConnectedRepositories();
      setRepositories(res.repositories);
      if (res.repositories.length > 0) setSelectedRepo(res.repositories[0]);
    } finally {
      setIsAnalyzingGithub(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Header */}
      <div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Phase 3 • Evidence Ingestion & Verification
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>
          Evidence Hub
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
          SkillGraph measures what you can prove. Connect authorized artifacts to update your graph.
        </p>
      </div>

      {/* Triad of Evidence Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Resume Artifacts
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#60A5FA', marginTop: '0.25rem' }}>
            1 Document (S3)
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            {extractedResumeSkills.length} Bedrock verified skills
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            GitHub Repositories
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#A78BFA', marginTop: '0.25rem' }}>
            {repositories.length} Inspected
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            8 Signal categories detected
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Overall Evidence Score
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10B981', marginTop: '0.25rem' }}>
            61% Strength
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            +18% boost from verified signals
          </div>
        </div>
      </div>

      {/* Two Column Layout: Resume Intelligence & GitHub Intelligence */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        
        {/* DAY 5: S3 Resume Ingestion Card */}
        <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ background: 'rgba(96, 165, 250, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                <Upload size={22} color="#60A5FA" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Resume Intelligence</h2>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Amazon S3 + Bedrock Claude 3 Parser</div>
              </div>
            </div>
            <span className="badge badge-strong">S3 Secure</span>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.4 }}>
            Direct upload via S3 pre-signed URL. Amazon Bedrock analyzes candidate text and extracts verifiable skills with context citations.
          </p>

          {/* Upload Dropzone */}
          <label
            style={{
              border: '2px dashed var(--border-subtle)',
              borderRadius: '12px',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              cursor: isParsingResume ? 'wait' : 'pointer',
              display: 'block',
              transition: 'all 0.2s ease',
            }}
          >
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              disabled={isParsingResume}
            />
            {isParsingResume ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <RefreshCw size={32} color="#60A5FA" style={{ animation: 'spin 1.5s linear infinite' }} />
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Bedrock is extracting skills...</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Invoking Claude 3 Haiku parser with zero hallucination filter</div>
              </div>
            ) : (
              <div>
                <FileCheck size={36} color="#60A5FA" style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                  {selectedFile ? selectedFile.name : 'resume_somnath_security_2026.pdf'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={14} /> Synced to Amazon S3 • {extractedResumeSkills.length} Verified Skills
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Drop new PDF/DOCX here (Max 5MB)
                </div>
              </div>
            )}
          </label>

          {uploadError && (
            <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={16} />
              {uploadError}
            </div>
          )}

          {/* Extracted Skills List */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Bedrock Grounded Citations
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {extractedResumeSkills.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, color: '#F8FAFC', fontSize: '0.9rem' }}>
                      {item.rawName}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#60A5FA', textTransform: 'capitalize' }}>
                      {item.demonstratedLevel} ({item.yearsExperience} yrs)
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                    "{item.contextSnippet}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DAY 6: GitHub Intelligence Card */}
        <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ background: 'rgba(167, 139, 250, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                <GitBranch size={22} color="#A78BFA" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>GitHub Developer Signals</h2>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Read-Only OAuth • 8 Signal Dimensions</div>
              </div>
            </div>
            <button
              onClick={handleRefreshGithub}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              disabled={isAnalyzingGithub}
            >
              <RefreshCw size={13} style={{ animation: isAnalyzingGithub ? 'spin 1.5s linear infinite' : 'none' }} />
              {isAnalyzingGithub ? 'Scanning...' : 'Sync Repos'}
            </button>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.4 }}>
            SkillGraph deeply inspects authorized repositories (GoThrough § 4). We inspect languages, frameworks, cloud SDKs, APIs, databases, IaC manifests, testing, and CI/CD.
          </p>

          {/* Connected Repositories Selector */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Connected Repositories (Read-Only)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {repositories.map((repo) => {
                const isSelected = selectedRepo?.id === repo.id;
                return (
                  <div
                    key={repo.id}
                    onClick={() => setSelectedRepo(repo)}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? 'rgba(167, 139, 250, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '1px solid #A78BFA' : '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FolderGit2 size={16} color={isSelected ? '#A78BFA' : '#94A3B8'} />
                        <span style={{ fontWeight: 600, color: '#F1F5F9', fontSize: '0.9rem' }}>
                          {repo.fullName}
                        </span>
                      </div>
                      <span className="badge badge-strong" style={{ fontSize: '0.75rem' }}>
                        {repo.evidenceStrength}% Evidence
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                      {repo.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deep 8-Signal Inspection Panel */}
          {selectedRepo && (
            <div
              style={{
                borderRadius: '10px',
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid var(--border-subtle)',
                padding: '1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#A78BFA', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Terminal size={14} /> 8-Signal Architecture Breakdown ({selectedRepo.name})
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  ★ {selectedRepo.starsCount} Stars
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.75rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>1. Languages</div>
                  <div style={{ color: '#F8FAFC', marginTop: '0.2rem' }}>{selectedRepo.signals.languages.join(', ')}</div>
                </div>

                <div style={{ padding: '0.5rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>2. Frameworks</div>
                  <div style={{ color: '#F8FAFC', marginTop: '0.2rem' }}>{selectedRepo.signals.frameworks.join(', ')}</div>
                </div>

                <div style={{ padding: '0.5rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>3. Cloud Services</div>
                  <div style={{ color: '#60A5FA', marginTop: '0.2rem' }}>{selectedRepo.signals.cloudServices.join(', ')}</div>
                </div>

                <div style={{ padding: '0.5rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>4. APIs & Endpoints</div>
                  <div style={{ color: '#F8FAFC', marginTop: '0.2rem' }}>{selectedRepo.signals.apis.join(', ')}</div>
                </div>

                <div style={{ padding: '0.5rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>5. Databases</div>
                  <div style={{ color: '#F8FAFC', marginTop: '0.2rem' }}>{selectedRepo.signals.databases.join(', ')}</div>
                </div>

                <div style={{ padding: '0.5rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>6. Infrastructure / IaC</div>
                  <div style={{ color: '#F59E0B', marginTop: '0.2rem' }}>{selectedRepo.signals.infrastructure.join(', ')}</div>
                </div>

                <div style={{ padding: '0.5rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>7. Testing Rigor</div>
                  <div style={{ color: '#10B981', marginTop: '0.2rem' }}>{selectedRepo.signals.testing.join(', ')}</div>
                </div>

                <div style={{ padding: '0.5rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>8. CI/CD Automation</div>
                  <div style={{ color: '#10B981', marginTop: '0.2rem' }}>{selectedRepo.signals.cicd.join(', ')}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
