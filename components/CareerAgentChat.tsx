'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Wrench,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Bot,
  User,
  Clock,
  Terminal,
} from 'lucide-react';
import { queryCareerAgent, CareerAgentResponse, AgentToolCall } from '../agents/career-agent';
import Link from 'next/link';

interface Message {
  sender: 'user' | 'agent';
  text: string;
  toolsUsed?: AgentToolCall[];
  citations?: string[];
  suggestedAction?: {
    label: string;
    route: string;
  };
  timestamp: string;
}

export default function CareerAgentChat({ targetRole = 'Cloud Security Engineer' }: { targetRole?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'agent',
      text: `Hello Somnath. I am your SkillGraph Career Agent grounded in Amazon Bedrock. I reason strictly across your verified skills, market requirements, and gap leverage. Ask me why you're not ready or to build your sprint plan.`,
      timestamp: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedToolIndex, setExpandedToolIndex] = useState<string | null>(null);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response: CareerAgentResponse = await queryCareerAgent(
        textToSend,
        'user_demo_somnath',
        targetRole,
        8
      );

      const agentMsg: Message = {
        sender: 'agent',
        text: response.answer,
        toolsUsed: response.toolsUsed,
        citations: response.groundedCitations,
        suggestedAction: response.suggestedAction,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: 'Encountered an issue executing Bedrock tool pipeline. Please try again.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '560px',
        overflow: 'hidden',
        border: '1px solid rgba(59, 130, 246, 0.25)',
      }}
    >
      {/* Header with Anti-Hallucination Badge */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={16} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8FAFC' }}>
              SkillGraph Career Agent
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Amazon Bedrock • 3 Grounded DynamoDB Tools
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: '0.7rem',
            color: '#10B981',
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '0.25rem 0.5rem',
            borderRadius: '6px',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <ShieldCheck size={13} />
          <span>Zero Hallucination Guard</span>
        </div>
      </div>

      {/* Message Stream */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              gap: '0.35rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
              }}
            >
              {msg.sender === 'user' ? (
                <>
                  <span>You</span>
                  <User size={12} />
                </>
              ) : (
                <>
                  <Bot size={12} color="#60A5FA" />
                  <span>Bedrock Career Agent</span>
                </>
              )}
            </div>

            <div
              style={{
                maxWidth: '85%',
                padding: '0.85rem 1.1rem',
                borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                background:
                  msg.sender === 'user'
                    ? 'var(--accent-blue)'
                    : 'rgba(255, 255, 255, 0.04)',
                border: msg.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
                color: '#F8FAFC',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap',
              }}
            >
              {msg.text}

              {/* Tool Calls Inspector */}
              {msg.toolsUsed && msg.toolsUsed.length > 0 && (
                <div style={{ marginTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.65rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#A78BFA', fontWeight: 600, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Wrench size={12} /> Grounded Tool Invocations ({msg.toolsUsed.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {msg.toolsUsed.map((tool, tIdx) => {
                      const toolKey = `${idx}-${tIdx}`;
                      const isExpanded = expandedToolIndex === toolKey;
                      return (
                        <div
                          key={tIdx}
                          style={{
                            background: 'rgba(0, 0, 0, 0.3)',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            fontSize: '0.7rem',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            onClick={() => setExpandedToolIndex(isExpanded ? null : toolKey)}
                            style={{
                              padding: '0.35rem 0.5rem',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              cursor: 'pointer',
                              color: '#C4B5FD',
                            }}
                          >
                            <span style={{ fontFamily: 'var(--font-mono)' }}>
                              🔧 {tool.toolName}()
                            </span>
                            {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                          </div>

                          {isExpanded && (
                            <div style={{ padding: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(0, 0, 0, 0.4)', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', maxHeight: '120px', overflowY: 'auto' }}>
                              <div style={{ color: 'var(--text-muted)' }}>// Input:</div>
                              <pre style={{ margin: '0.2rem 0' }}>{JSON.stringify(tool.input, null, 2)}</pre>
                              <div style={{ color: 'var(--text-muted)', marginTop: '0.4rem' }}>// Output:</div>
                              <pre style={{ margin: '0.2rem 0' }}>{JSON.stringify(tool.output, null, 2)}</pre>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Citations */}
              {msg.citations && msg.citations.length > 0 && (
                <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {msg.citations.map((c, cIdx) => (
                    <span
                      key={cIdx}
                      style={{
                        fontSize: '0.65rem',
                        padding: '0.2rem 0.45rem',
                        borderRadius: '4px',
                        background: 'rgba(96, 165, 250, 0.1)',
                        color: '#60A5FA',
                        border: '1px solid rgba(96, 165, 250, 0.2)',
                      }}
                    >
                      ✓ {c}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Button */}
              {msg.suggestedAction && (
                <div style={{ marginTop: '0.85rem' }}>
                  <Link
                    href={msg.suggestedAction.route}
                    className="btn-primary"
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.35rem 0.75rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    {msg.suggestedAction.label} <ArrowRight size={13} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <Sparkles size={14} color="#60A5FA" style={{ animation: 'spin 1.5s linear infinite' }} />
            <span>Agent querying DynamoDB tools & reasoning...</span>
          </div>
        )}
      </div>

      {/* Preset Demo Inquiry Shortcuts (GoThrough § 17 Steps 6, 7, 8) */}
      <div
        style={{
          padding: '0.5rem 1rem',
          borderTop: '1px solid var(--border-subtle)',
          background: 'rgba(0, 0, 0, 0.2)',
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
        }}
      >
        <button
          onClick={() => handleSend('Why am I not ready for this role?')}
          style={{
            whiteSpace: 'nowrap',
            fontSize: '0.75rem',
            padding: '0.35rem 0.65rem',
            borderRadius: '6px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            color: '#F87171',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Step 6: "Why am I not ready?"
        </button>

        <button
          onClick={() => handleSend('Build my 30-day plan')}
          style={{
            whiteSpace: 'nowrap',
            fontSize: '0.75rem',
            padding: '0.35rem 0.65rem',
            borderRadius: '6px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.25)',
            color: '#60A5FA',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Step 7: "Build my 30-day plan"
        </button>

        <button
          onClick={() => handleSend('What happens if I only have 5 hours per week?')}
          style={{
            whiteSpace: 'nowrap',
            fontSize: '0.75rem',
            padding: '0.35rem 0.65rem',
            borderRadius: '6px',
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            color: '#C084FC',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Step 8: "5 hrs/week constraint"
        </button>
      </div>

      {/* Input Bar */}
      <div
        style={{
          padding: '0.75rem 1rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '0.5rem',
          background: 'rgba(15, 23, 42, 0.8)',
        }}
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask why you're not ready or request a personalized sprint..."
          style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '0.55rem 0.85rem',
            color: '#F8FAFC',
            fontSize: '0.85rem',
            outline: 'none',
          }}
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputQuery.trim() || isLoading}
          className="btn-primary"
          style={{
            padding: '0.55rem 1rem',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
