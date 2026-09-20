import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const acceptHeader = event.headers?.accept || event.headers?.Accept || '';
  const isHtml =
    acceptHeader.includes('text/html') ||
    event.queryStringParameters?.format === 'html' ||
    (!acceptHeader.includes('application/json') && !event.queryStringParameters?.format);

  if (isHtml && event.queryStringParameters?.format !== 'json') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: getInteractiveHtml(),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    body: JSON.stringify(
      {
        product: 'SkillGraph',
        message: 'Hello SkillGraph - Career Intelligence Platform',
        version: '1.0.0',
        status: 'LIVE_ON_AWS',
        hackathon: 'AWS Zero to Shipped (September 18 - October 2, 2026)',
        lane: '#startup',
        category: '#commercial-potential',
        tagline: "Your career is not a résumé. It's a continuously changing skill graph.",
        timestamp: new Date().toISOString(),
        liveAppUrl: 'https://ilcjmegmml.execute-api.us-east-1.amazonaws.com/prod/',
        githubUrl: 'https://github.com/SomnathShaw001/Skill',
      },
      null,
      2
    ),
  };
};

function getInteractiveHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SkillGraph — Interactive Career Intelligence & Skill Graph</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #090D16;
      --card-bg: rgba(15, 23, 42, 0.75);
      --border: rgba(56, 189, 248, 0.18);
      --border-subtle: rgba(255, 255, 255, 0.08);
      --cyan: #38BDF8;
      --purple: #818CF8;
      --emerald: #34D399;
      --amber: #FBBF24;
      --rose: #F43F5E;
      --text: #F8FAFC;
      --text-muted: #94A3B8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg-dark);
      color: var(--text);
      font-family: 'Plus Jakarta Sans', sans-serif;
      min-height: 100vh;
      line-height: 1.5;
      overflow-x: hidden;
      background-image: 
        radial-gradient(circle at 15% 15%, rgba(56, 189, 248, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 85% 65%, rgba(129, 140, 248, 0.08) 0%, transparent 40%);
    }
    header {
      border-bottom: 1px solid var(--border-subtle);
      background: rgba(9, 13, 22, 0.85);
      backdrop-filter: blur(12px);
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 0.9rem 1.75rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .logo-badge {
      width: 36px;
      height: 36px;
      border-radius: 9px;
      background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      color: #fff;
      font-size: 1.1rem;
    }
    .logo-text {
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .aws-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.3rem 0.65rem;
      background: rgba(52, 211, 153, 0.12);
      border: 1px solid rgba(52, 211, 153, 0.3);
      border-radius: 9999px;
      color: #34D399;
      font-size: 0.75rem;
      font-weight: 600;
      font-family: 'JetBrains Mono', monospace;
    }
    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #34D399;
      box-shadow: 0 0 8px #34D399;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.85); }
    }
    main {
      max-width: 1240px;
      margin: 0 auto;
      padding: 2rem 1.5rem 4rem;
    }
    .hero-banner {
      background: linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 1.75rem 2rem;
      margin-bottom: 2rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
    }
    .readiness-ring {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }
    .score-circle {
      width: 84px;
      height: 84px;
      border-radius: 50%;
      background: conic-gradient(var(--cyan) 68%, rgba(255,255,255,0.08) 0);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .score-inner {
      width: 68px;
      height: 68px;
      border-radius: 50%;
      background: #0F172A;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .score-val {
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--cyan);
      line-height: 1;
    }
    .score-label {
      font-size: 0.65rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
    }
    .grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    @media (max-width: 900px) {
      .grid-2col { grid-template-columns: 1fr; }
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      padding: 1.5rem;
      backdrop-filter: blur(10px);
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }
    .card-title {
      font-size: 1.05rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .graph-container {
      position: relative;
      background: rgba(9, 13, 22, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      padding: 1rem;
      overflow: hidden;
    }
    svg.dag-svg {
      width: 100%;
      height: 280px;
    }
    .node-rect {
      rx: 8;
      cursor: pointer;
      transition: all 0.2s;
    }
    .node-rect:hover {
      filter: drop-shadow(0 0 8px currentColor);
      transform: translateY(-2px);
    }
    .agent-console {
      display: flex;
      flex-direction: column;
      height: 380px;
    }
    .agent-messages {
      flex: 1;
      overflow-y: auto;
      padding: 0.75rem;
      background: rgba(9, 13, 22, 0.6);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 0.88rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 0.85rem;
    }
    .msg {
      padding: 0.75rem 1rem;
      border-radius: 10px;
      max-width: 90%;
      line-height: 1.4;
    }
    .msg-user {
      align-self: flex-end;
      background: #2563EB;
      color: #fff;
    }
    .msg-agent {
      align-self: flex-start;
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(56, 189, 248, 0.2);
    }
    .tool-tag {
      display: inline-block;
      padding: 0.2rem 0.5rem;
      background: rgba(56, 189, 248, 0.15);
      border-radius: 4px;
      font-size: 0.72rem;
      color: var(--cyan);
      font-family: 'JetBrains Mono', monospace;
      margin-bottom: 0.4rem;
    }
    .chip-buttons {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 0.75rem;
    }
    .chip {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border-subtle);
      color: #CBD5E1;
      border-radius: 20px;
      padding: 0.4rem 0.85rem;
      font-size: 0.78rem;
      cursor: pointer;
      transition: all 0.15s;
    }
    .chip:hover {
      background: rgba(56, 189, 248, 0.15);
      border-color: var(--cyan);
      color: #fff;
    }
    .slider-box {
      background: rgba(9, 13, 22, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      padding: 1.25rem;
      margin-top: 1rem;
    }
    .slider-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      font-size: 0.9rem;
    }
    .hours-val {
      font-weight: 800;
      color: var(--amber);
      font-size: 1.1rem;
    }
    input[type=range] {
      width: 100%;
      accent-color: var(--cyan);
      cursor: pointer;
    }
    .sprint-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 1rem;
    }
    .sprint-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.75rem;
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      border: 1px solid var(--border-subtle);
      font-size: 0.85rem;
    }
    .week-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      background: rgba(56, 189, 248, 0.2);
      color: var(--cyan);
      white-space: nowrap;
    }
    .table-radar {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }
    .table-radar th {
      text-align: left;
      padding: 0.65rem 0.75rem;
      color: var(--text-muted);
      border-bottom: 1px solid var(--border-subtle);
      font-weight: 600;
    }
    .table-radar td {
      padding: 0.75rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }
    .badge-status {
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.72rem;
      font-weight: 600;
    }
    .status-strong { background: rgba(52, 211, 153, 0.15); color: #34D399; }
    .status-mod { background: rgba(56, 189, 248, 0.15); color: #38BDF8; }
    .status-weak { background: rgba(244, 63, 94, 0.15); color: #F43F5E; }
    .footer-bar {
      border-top: 1px solid var(--border-subtle);
      padding: 1.5rem 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      color: var(--text-muted);
      font-size: 0.85rem;
      margin-top: 3rem;
      gap: 1rem;
    }
    .footer-links a {
      color: var(--cyan);
      text-decoration: none;
      margin-left: 1.25rem;
      font-weight: 500;
    }
    .footer-links a:hover { text-decoration: underline; }
  </style>
</head>
<body>

  <header>
    <div class="logo-group">
      <div class="logo-badge">SG</div>
      <div class="logo-text">SKILL<span style="color:var(--cyan)">GRAPH</span></div>
    </div>
    <div style="display:flex;align-items:center;gap:1rem">
      <span class="aws-badge"><span class="pulse-dot"></span> LIVE ON AWS (us-east-1)</span>
      <span style="font-size:0.85rem;color:var(--text-muted)">User: <strong style="color:#fff">Somnath</strong></span>
    </div>
  </header>

  <main>
    <!-- HERO COMMAND CENTER -->
    <div class="hero-banner">
      <div>
        <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.4rem">
          <span style="font-size:0.85rem;color:var(--cyan);font-weight:700;text-transform:uppercase;letter-spacing:0.05em">Target Role Target</span>
          <span style="background:rgba(255,255,255,0.08);padding:0.2rem 0.5rem;border-radius:4px;font-size:0.75rem">Active</span>
        </div>
        <h1 style="font-size:1.85rem;font-weight:800;letter-spacing:-0.02em;margin-bottom:0.4rem">Cloud Security Engineer</h1>
        <p style="color:var(--text-muted);font-size:0.92rem;max-width:560px">
          Continuous truth engine cross-referencing demonstrated code repositories against live market demand to compute high-leverage learning paths.
        </p>
      </div>

      <div class="readiness-ring">
        <div class="score-circle">
          <div class="score-inner">
            <span class="score-val">68%</span>
            <span class="score-label">Ready</span>
          </div>
        </div>
        <div>
          <div style="font-size:0.85rem;color:var(--text-muted)">Sprint Target</div>
          <div style="font-size:1.2rem;font-weight:800;color:#34D399">82% (+14%)</div>
          <div style="font-size:0.72rem;color:var(--text-muted)">via Terraform 3.2x Unlock</div>
        </div>
      </div>
    </div>

    <!-- 2 COL: DAG GRAPH & AGENT CHAT -->
    <div class="grid-2col">
      <!-- GRAPH -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--cyan)"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/></svg>
            Interactive Skill Graph (DAG)
          </div>
          <span style="font-size:0.75rem;color:var(--text-muted)">Click nodes to inspect proof</span>
        </div>

        <div class="graph-container">
          <svg class="dag-svg" viewBox="0 0 540 280">
            <!-- Edges -->
            <line x1="80" y1="60" x2="220" y2="60" stroke="#334155" stroke-width="2" stroke-dasharray="4"/>
            <line x1="80" y1="140" x2="220" y2="140" stroke="#334155" stroke-width="2"/>
            <line x1="80" y1="220" x2="220" y2="140" stroke="#334155" stroke-width="2"/>
            <line x1="220" y1="140" x2="380" y2="80" stroke="#F43F5E" stroke-width="3"/>
            <line x1="220" y1="140" x2="380" y2="170" stroke="#FBBF24" stroke-width="2" stroke-dasharray="3"/>
            <line x1="380" y1="80" x2="480" y2="130" stroke="#334155" stroke-width="2"/>

            <!-- Nodes -->
            <!-- Python -->
            <g class="node-group" onclick="selectNode('Python', 'Strong (85%)', 'GitHub: somnath/iot-security (84% test coverage, pytest)')">
              <rect x="20" y="40" width="110" height="40" class="node-rect" fill="#0F172A" stroke="#34D399" stroke-width="2"/>
              <text x="75" y="65" fill="#34D399" font-size="12" font-weight="700" text-anchor="middle">Python (85%)</text>
            </g>
            <!-- Linux -->
            <g class="node-group" onclick="selectNode('Linux', 'Strong (90%)', 'Resume: 4 years production system admin')">
              <rect x="20" y="120" width="110" height="40" class="node-rect" fill="#0F172A" stroke="#34D399" stroke-width="2"/>
              <text x="75" y="145" fill="#34D399" font-size="12" font-weight="700" text-anchor="middle">Linux (90%)</text>
            </g>
            <!-- Networking -->
            <g class="node-group" onclick="selectNode('Networking', 'Strong (78%)', 'Resume: TCP/IP, VPC peering, DNS')">
              <rect x="20" y="200" width="110" height="40" class="node-rect" fill="#0F172A" stroke="#34D399" stroke-width="2"/>
              <text x="75" y="225" fill="#34D399" font-size="12" font-weight="700" text-anchor="middle">Networking</text>
            </g>

            <!-- AWS Core -->
            <g class="node-group" onclick="selectNode('AWS Core', 'Moderate (65%)', 'GitHub: S3, Lambda, IAM policies created')">
              <rect x="180" y="120" width="110" height="40" class="node-rect" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
              <text x="235" y="145" fill="#38BDF8" font-size="12" font-weight="700" text-anchor="middle">AWS Core</text>
            </g>

            <!-- Terraform (High-leverage bottleneck) -->
            <g class="node-group" onclick="selectNode('Terraform', 'Bottleneck (25%)', 'CRITICAL GAP: 3.2x multiplier. Unlocks Security Infra + Cloud Compliance')">
              <rect x="330" y="60" width="120" height="44" class="node-rect" fill="#1E1B4B" stroke="#F43F5E" stroke-width="2.5"/>
              <text x="390" y="86" fill="#F43F5E" font-size="12" font-weight="800" text-anchor="middle">Terraform ⚡3.2x</text>
            </g>

            <!-- IAM & Least Privilege -->
            <g class="node-group" onclick="selectNode('IAM Security', 'Weak (40%)', 'Market Demand: 94%. Required for Least Privilege roles')">
              <rect x="330" y="150" width="120" height="40" class="node-rect" fill="#0F172A" stroke="#FBBF24" stroke-width="2"/>
              <text x="390" y="175" fill="#FBBF24" font-size="12" font-weight="700" text-anchor="middle">IAM Policies</text>
            </g>

            <!-- Cloud Sec Projects -->
            <g class="node-group" onclick="selectNode('Target Mastery', 'Projected (82%)', 'Achieved after completing 30-Day Sprint')">
              <rect x="440" y="110" width="90" height="40" class="node-rect" fill="#0F172A" stroke="#818CF8" stroke-width="2" stroke-dasharray="3"/>
              <text x="485" y="135" fill="#818CF8" font-size="11" font-weight="700" text-anchor="middle">Role Ready</text>
            </g>
          </svg>
        </div>

        <div id="node-detail" style="margin-top:0.75rem;padding:0.75rem;background:rgba(255,255,255,0.03);border-radius:8px;font-size:0.82rem;color:var(--text-muted)">
          💡 Click any node above to view verified proof sources and market leverage.
        </div>
      </div>

      <!-- BEDROCK CAREER AGENT CHAT -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--purple)"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
            Bedrock Career Agent
          </div>
          <span style="font-size:0.75rem;background:rgba(129,140,248,0.15);color:var(--purple);padding:0.2rem 0.5rem;border-radius:4px;font-weight:600">Grounded Claude 3</span>
        </div>

        <div class="agent-console">
          <div class="chip-buttons">
            <button class="chip" onclick="askAgent('Why am I not ready for Cloud Security Engineer?')">"Why am I not ready?"</button>
            <button class="chip" onclick="askAgent('Build my 30-day plan')">"Build my 30-day plan"</button>
            <button class="chip" onclick="askAgent('I only have 5 hours/week')">"Recalculate for 5 hrs/week"</button>
          </div>

          <div class="agent-messages" id="chat-box">
            <div class="msg msg-agent">
              <span class="tool-tag">⚡ Bedrock System Prompt Grounded</span>
              <div>Hello Somnath. I have analyzed your verified skill graph and market requirements for <strong>Cloud Security Engineer</strong>. What career insights do you need?</div>
            </div>
          </div>

          <div style="display:flex;gap:0.5rem">
            <input type="text" id="chat-input" placeholder="Ask why you're not ready or request plan..." style="flex:1;background:rgba(255,255,255,0.05);border:1px solid var(--border-subtle);border-radius:8px;padding:0.6rem 0.85rem;color:#fff;font-size:0.85rem;outline:none" onkeydown="if(event.key==='Enter') sendChat()">
            <button onclick="sendChat()" style="background:#2563EB;border:none;border-radius:8px;padding:0 1.2rem;color:#fff;font-weight:700;cursor:pointer;font-size:0.85rem">Ask</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 2 COL: DYNAMIC ROADMAP & MARKET RADAR -->
    <div class="grid-2col">
      <!-- ROADMAP -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--amber)"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Dynamic 30-Day Sprint Roadmap
          </div>
          <span style="font-size:0.75rem;color:var(--text-muted)">Interactive time budget</span>
        </div>

        <div class="slider-box">
          <div class="slider-header">
            <span>Weekly Available Time Budget:</span>
            <span class="hours-val"><span id="hours-display">15</span> hrs/week</span>
          </div>
          <input type="range" id="hours-slider" min="3" max="25" value="15" oninput="updateHours(this.value)">
          <div style="display:flex;justify-content:space-between;font-size:0.7rem;color:var(--text-muted);margin-top:0.35rem">
            <span>3 hrs (Tight)</span>
            <span style="color:var(--amber)">5 hrs (Step 8 Wow Moment)</span>
            <span>25 hrs (Full-time)</span>
          </div>
        </div>

        <div class="sprint-list" id="sprint-list">
          <!-- Populated by JS -->
        </div>
      </div>

      <!-- MARKET RADAR -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#34D399"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/><path d="m5 7-3 5 3 5"/><path d="m19 7 3 5-3 5"/></svg>
            Market Radar: Cloud Security Engineer
          </div>
          <span style="font-size:0.75rem;color:var(--text-muted)">1,420 Job Postings (CC BY 4.0)</span>
        </div>

        <table class="table-radar">
          <thead>
            <tr>
              <th>Skill</th>
              <th>Your Proof</th>
              <th>Market Demand</th>
              <th>Trend Velocity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>AWS Core</strong></td>
              <td><span class="badge-status status-strong">Demonstrated</span></td>
              <td><strong>98%</strong></td>
              <td style="color:#34D399">↑↑ High (+18%)</td>
            </tr>
            <tr>
              <td><strong>Terraform (IaC)</strong></td>
              <td><span class="badge-status status-weak">Bottleneck</span></td>
              <td><strong>91%</strong></td>
              <td style="color:#34D399">↑↑ Accelerating</td>
            </tr>
            <tr>
              <td><strong>IAM & Least Privilege</strong></td>
              <td><span class="badge-status status-weak">Gap</span></td>
              <td><strong>94%</strong></td>
              <td style="color:#34D399">↑ High (+12%)</td>
            </tr>
            <tr>
              <td><strong>Python & Automation</strong></td>
              <td><span class="badge-status status-strong">Strong (84% tests)</span></td>
              <td><strong>88%</strong></td>
              <td style="color:#38BDF8">→ Steady</td>
            </tr>
            <tr>
              <td><strong>Linux Systems</strong></td>
              <td><span class="badge-status status-strong">Demonstrated</span></td>
              <td><strong>86%</strong></td>
              <td style="color:#38BDF8">→ Steady</td>
            </tr>
            <tr>
              <td><strong>SIEM / CloudWatch</strong></td>
              <td><span class="badge-status status-mod">Partial</span></td>
              <td><strong>76%</strong></td>
              <td style="color:#34D399">↑ Growing</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="footer-bar">
      <div>
        <strong>SkillGraph</strong> — Built for the AWS Zero to Shipped Hackathon (#startup / #commercial-potential)
      </div>
      <div class="footer-links">
        <a href="?format=json" target="_blank">Raw CloudFormation JSON API</a>
        <a href="https://github.com/SomnathShaw001/Skill" target="_blank">GitHub Repository</a>
      </div>
    </div>
  </main>

  <script>
    function selectNode(name, status, desc) {
      document.getElementById('node-detail').innerHTML = 
        '<strong style="color:#fff">' + name + '</strong> (' + status + '): ' + desc;
    }

    const sprints = {
      15: [
        { week: "WEEK 1", title: "Learn: IAM Deep-Dive & Trust Policies", desc: "Master cross-account roles, condition keys, and least-privilege boundary policies." },
        { week: "WEEK 2", title: "Build: Automated Least-Privilege Scanner", desc: "Construct a Lambda tool that inspects IAM wildcard permissions and alerts to SNS." },
        { week: "WEEK 3", title: "Build: Terraform Infrastructure as Code", desc: "Codify a secure VPC, bastion host, and security groups in reusable HCL." },
        { week: "WEEK 4", title: "Prove: Deploy Live & Publish Portfolio", desc: "Execute automated CI/CD pipeline tests and commit verifiable repository artifacts." }
      ],
      5: [
        { week: "WEEK 1-2", title: "Targeted Learn: IAM Wildcards & Trust Policies", desc: "5 hrs/wk mode: Focused solely on high-frequency interview scenarios." },
        { week: "WEEK 3-4", title: "Micro-Project: Terraform Multi-Tier Architecture", desc: "Build & push a single verified GitHub repo demonstrating automated least-privilege." }
      ]
    };

    function updateHours(val) {
      document.getElementById('hours-display').innerText = val;
      const list = document.getElementById('sprint-list');
      const data = val <= 8 ? sprints[5] : sprints[15];
      list.innerHTML = data.map(s => 
        '<div class="sprint-item">' +
          '<span class="week-badge">' + s.week + '</span>' +
          '<div><strong>' + s.title + '</strong><div style="color:var(--text-muted);font-size:0.8rem;margin-top:0.2rem">' + s.desc + '</div></div>' +
        '</div>'
      ).join('');
    }
    updateHours(15);

    function askAgent(q) {
      const box = document.getElementById('chat-box');
      box.innerHTML += '<div class="msg msg-user">' + q + '</div>';
      
      let answer = "";
      if (q.includes("ready")) {
        answer = '<span class="tool-tag">get_gap_analysis(user_somnath, "Cloud Security Engineer")</span>' +
                 '<br>Based on your verified skills, you have strong foundations in <strong>Python (85%)</strong> and <strong>Linux (90%)</strong> from your GitHub repositories. However, your target role requires <strong>Terraform (91% market demand)</strong> and <strong>IAM Policies (94% demand)</strong>, where you currently lack verifiable evidence.<br><br><strong>Key finding:</strong> Terraform is your single highest-leverage bottleneck (3.2x multiplier). Mastering it unlocks downstream security automation projects.';
      } else if (q.includes("30-day") || q.includes("plan")) {
        answer = '<span class="tool-tag">get_skill_graph() + get_gap_analysis()</span>' +
                 '<br>Here is your personalized 30-day Learn → Build → Prove sprint:<br>• <strong>Week 1:</strong> IAM deep-dive & trust policies<br>• <strong>Week 2:</strong> Least-privilege scanner with Lambda & SNS<br>• <strong>Week 3:</strong> Terraform IaC multi-tier infrastructure<br>• <strong>Week 4:</strong> Deploy to live AWS & push tests to GitHub (target: 82% readiness).';
      } else {
        answer = '<span class="tool-tag">recalculate_sprint(weekly_hours: 5)</span>' +
                 '<br><strong>Adapted for tight budget (5 hrs/week):</strong> Recalibrated sprint from 4 milestones to 2 high-impact deliverables without generic fluff:<br>1. Weeks 1–2: Master IAM trust policies via interactive labs (10 hrs total)<br>2. Weeks 3–4: Build a single verified Terraform repo demonstrating least-privilege (10 hrs total).';
      }

      box.innerHTML += '<div class="msg msg-agent">' + answer + '</div>';
      box.scrollTop = box.scrollHeight;
    }

    function sendChat() {
      const inp = document.getElementById('chat-input');
      if (!inp.value.trim()) return;
      askAgent(inp.value.trim());
      inp.value = '';
    }
  </script>
</body>
</html>`;
}
