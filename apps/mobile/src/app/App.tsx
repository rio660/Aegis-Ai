import React, { useEffect, useMemo, useState } from 'react';

type Tab = 'dashboard' | 'analysis' | 'trade' | 'journal' | 'admin';
type Decision = 'WAIT' | 'NO_TRADE' | 'CANDIDATE_BUY' | 'CANDIDATE_SELL';

const marketRows = [
  { symbol: 'BTC/USDT', price: '67,892.40', change: '+1.24%', volume: '18.2B', status: 'MOCK', tone: 'good' },
  { symbol: 'ETH/USDT', price: '3,512.65', change: '+2.08%', volume: '9.7B', status: 'MOCK', tone: 'good' },
  { symbol: 'BNB/USDT', price: '595.20', change: '-0.45%', volume: '1.2B', status: 'MOCK', tone: 'bad' }
];

const journalRows = [
  { symbol: 'BTC/USDT', side: 'LONG', pnl: '+2.45R', result: 'WIN', rule: 'Followed Rules' },
  { symbol: 'ETH/USDT', side: 'SHORT', pnl: '-1.20R', result: 'LOSS', rule: 'Mistake: Late Entry' },
  { symbol: 'SOL/USDT', side: 'LONG', pnl: '+0.85R', result: 'WIN', rule: 'Followed Rules' }
];

const indicators = [
  ['SMA 20', '67,231', 'Price above SMA'],
  ['SMA 50', '66,802', 'Bullish base'],
  ['EMA 20', '67,105', 'Short-term support'],
  ['RSI 14', '52.3', 'Neutral'],
  ['ATR 14', '1.02%', 'Moderate'],
  ['Volume MA', '18.2B', 'Normal']
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function shortHash(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) hash = Math.imul(31, hash) + input.charCodeAt(i) | 0;
  return Math.abs(hash).toString(16).padStart(8, '0').slice(0, 8).toUpperCase();
}

function makeDeviceId() {
  const existing = localStorage.getItem('aegis.deviceId');
  if (existing) return existing;
  const value = crypto.randomUUID();
  localStorage.setItem('aegis.deviceId', value);
  return value;
}

function makeRequestCode(deviceId: string) {
  const payload = {
    type: 'AEGIS_ACTIVATION_REQUEST',
    requestId: crypto.randomUUID(),
    deviceId,
    deviceHash: shortHash(deviceId),
    appVersion: '1.0.0',
    platform: 'android',
    createdAt: new Date().toISOString(),
    nonce: crypto.randomUUID()
  };
  const encoded = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  return `AEGIS-REQ.${encoded}.${shortHash(encoded)}`;
}

function LogoMark({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <div className={cx('logoMark', size === 'sm' && 'logoSm', size === 'lg' && 'logoLg')} aria-label="Aegis Trade AI logo">
      <svg viewBox="0 0 64 64" role="img">
        <path className="shieldOuter" d="M32 4 53 13v17c0 13.6-8.4 24-21 30C19.4 54 11 43.6 11 30V13L32 4Z" />
        <path className="shieldInner" d="M32 11 47 17v12c0 9.5-5.8 17.1-15 22-9.2-4.9-15-12.5-15-22V17l15-6Z" />
        <path className="aegisA" d="M20 45 32 17l12 28h-7l-2-5h-6l-2 5h-7Zm11.2-11h1.6L32 31.5 31.2 34Z" />
        <path className="arrowLine" d="M20 40c10-1 20-8 27-20" />
      </svg>
    </div>
  );
}

function SafetyBanner() {
  return (
    <div className="safetyBanner">
      <span className="warnIcon">⚠</span>
      <span>No profit guarantee. No 100% winrate. Risk management required.</span>
    </div>
  );
}

function StatusBadge({ label, tone = 'neutral' }: { label: string; tone?: 'good' | 'bad' | 'warn' | 'neutral' }) {
  return <span className={cx('statusBadge', `status-${tone}`)}>{label}</span>;
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={cx('card', className)}>{children}</section>;
}

function MetricCard({ label, value, detail, tone = 'neutral' }: { label: string; value: string; detail?: string; tone?: 'good' | 'bad' | 'warn' | 'neutral' }) {
  return (
    <Card className="metricCard">
      <p className="muted small">{label}</p>
      <strong className={cx('metricValue', tone)}>{value}</strong>
      {detail && <span className="muted tiny">{detail}</span>}
    </Card>
  );
}

function MiniSparkline({ tone = 'good' }: { tone?: 'good' | 'bad' }) {
  const points = tone === 'good'
    ? '2,34 16,28 30,31 45,22 58,26 72,18 86,20 100,12'
    : '2,18 16,14 30,22 45,19 58,29 72,23 86,34 100,30';
  return (
    <svg className="sparkline" viewBox="0 0 104 40">
      <polyline points={points} fill="none" stroke={tone === 'good' ? '#22c55e' : '#ef4444'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CandlestickChart() {
  const candles = [
    [8, 78, 28, 'bad'], [16, 70, 45, 'good'], [24, 62, 34, 'bad'], [32, 59, 60, 'good'], [40, 52, 42, 'good'],
    [48, 48, 36, 'bad'], [56, 46, 55, 'good'], [64, 39, 46, 'good'], [72, 35, 30, 'bad'], [80, 31, 52, 'good'], [88, 24, 44, 'good']
  ];
  return (
    <Card className="chartCard">
      <div className="sectionHeader">
        <div>
          <h2>BTC/USDT · 1H</h2>
          <p className="muted">Candlestick preview · public market data only</p>
        </div>
        <StatusBadge label="MOCK" tone="warn" />
      </div>
      <div className="chartArea">
        <div className="priceLine resistance"><span>Resistance 68,500</span></div>
        <div className="priceLine support"><span>Support 65,200</span></div>
        {candles.map(([x, top, h, tone], index) => (
          <i
            key={index}
            className={cx('candle', tone === 'good' ? 'candleGreen' : 'candleRed')}
            style={{ left: `${x}%`, top: `${top}px`, height: `${h}px` }}
          />
        ))}
        <div className="movingAverage maFast" />
        <div className="movingAverage maSlow" />
      </div>
    </Card>
  );
}

function Header({ active, licensed }: { active: Tab; licensed: boolean }) {
  const title = active === 'dashboard' ? 'Dashboard' : active === 'analysis' ? 'Analysis' : active === 'trade' ? 'Risk & Paper' : active === 'journal' ? 'Journal' : 'Admin Mode';
  return (
    <header className="mobileHeader">
      <button className="iconButton" aria-label="Menu">☰</button>
      <div>
        <p className="eyebrow">Aegis Trade AI</p>
        <h1>{title}</h1>
      </div>
      <StatusBadge label={licensed ? 'ACTIVE' : 'DEMO'} tone={licensed ? 'good' : 'warn'} />
    </header>
  );
}

function BottomNav({ active, onChange }: { active: Tab; onChange: (tab: Tab) => void }) {
  const items: Array<[Tab, string, string]> = [
    ['dashboard', '⌂', 'Home'],
    ['analysis', '↗', 'Analysis'],
    ['trade', '◈', 'Trade'],
    ['journal', '☷', 'Journal'],
    ['admin', '⌬', 'Admin']
  ];
  return (
    <nav className="bottomNav">
      {items.map(([id, icon, label]) => (
        <button key={id} onClick={() => onChange(id)} className={cx(active === id && 'active')}>
          <span>{icon}</span>
          <small>{label}</small>
        </button>
      ))}
    </nav>
  );
}

function DesktopSideNav({ active, onChange }: { active: Tab; onChange: (tab: Tab) => void }) {
  const items: Array<[Tab, string]> = [['dashboard', 'Dashboard'], ['analysis', 'Analysis'], ['trade', 'Risk & Paper'], ['journal', 'Journal'], ['admin', 'Admin']];
  return (
    <aside className="sideNav">
      <div className="brandBlock"><LogoMark /><strong>Aegis Trade AI</strong><span>Risk-first assistant</span></div>
      {items.map(([id, label]) => <button key={id} onClick={() => onChange(id)} className={cx(active === id && 'active')}>{label}</button>)}
      <div className="sideNotice">Discipline over emotion. No real-money auto execution.</div>
    </aside>
  );
}

function ActivationScreen({ code, onActivated, deviceId }: { code: string; deviceId: string; onActivated: () => void }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const activate = () => {
    if (!key.trim().startsWith('AEGIS-LIC.')) {
      setError('Activation key invalid. Use a signed AEGIS-LIC key from the official bot.');
      return;
    }
    localStorage.setItem('aegis.license.status', 'ACTIVE');
    localStorage.setItem('aegis.license.keyHash', shortHash(key));
    localStorage.setItem('aegis.license.activatedAt', new Date().toISOString());
    setKey('');
    setError('');
    onActivated();
  };
  return (
    <div className="activationLayout">
      <LogoMark size="lg" />
      <h1>Aegis Trade AI</h1>
      <p className="tagline">Risk-first AI trading assistant.</p>
      <Card className="licenseRequired">
        <div>
          <strong>License Required</strong>
          <p>This device is not activated.</p>
        </div>
        <StatusBadge label="LOCKED" tone="warn" />
      </Card>
      <Card>
        <p className="muted small">Your Request Code</p>
        <code className="requestCode">{code}</code>
        <button className="primaryButton" onClick={() => navigator.clipboard?.writeText(code)}>Copy Code</button>
        <p className="muted tiny">Send this code to the official Telegram bot. Device hash: {shortHash(deviceId)}</p>
      </Card>
      <Card>
        <p className="muted small">Enter Activation Key</p>
        <textarea value={key} onChange={(e) => setKey(e.target.value)} placeholder="Paste AEGIS-LIC activation key once" />
        <button className="primaryButton" onClick={activate}>Activate This Device</button>
        {error && <p className="errorText">{error}</p>}
      </Card>
      <Card className="securityCard">
        <strong>Security Notice</strong>
        <p>No offline licensing system is uncrackable. This app uses device-bound activation to prevent casual sharing. Reinstalling or clearing app data may require reactivation.</p>
      </Card>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="screenGrid dashboardGrid">
      <SafetyBanner />
      <div className="tickerGrid">
        {marketRows.map((row) => (
          <Card key={row.symbol} className="tickerCard">
            <div className="sectionHeader compact"><div><h2>{row.symbol}</h2><p className="muted tiny">Spot · Volume {row.volume}</p></div><StatusBadge label={row.status} tone="warn" /></div>
            <strong className="priceText">{row.price}</strong>
            <div className="tickerFooter"><span className={cx(row.tone === 'good' ? 'good' : 'bad')}>{row.change}</span><MiniSparkline tone={row.tone as 'good' | 'bad'} /></div>
          </Card>
        ))}
      </div>
      <Card className="decisionHero">
        <p className="muted small">AI Decision</p>
        <strong>WAIT</strong>
        <span>Waiting is a valid decision.</span>
        <p>Market is choppy, price is between key levels, and risk/reward is not attractive enough.</p>
      </Card>
      <MetricCard label="Market Regime" value="CHOPPY" detail="Low trend strength" tone="warn" />
      <MetricCard label="Rule Compliance" value="100%" detail="All safety rules satisfied" tone="good" />
      <MetricCard label="Max Risk" value="0.5%" detail="Beginner mode default" tone="neutral" />
      <Card className="aiSummary">
        <h2>AI Analysis Summary</h2>
        <ul>
          <li>BTC/USDT is ranging between support and resistance.</li>
          <li>No clean invalidation level for aggressive entry.</li>
          <li>Best decision: protect capital and wait for confirmation.</li>
        </ul>
      </Card>
    </div>
  );
}

function AnalysisScreen() {
  return (
    <div className="screenGrid analysisGrid">
      <div className="selectorRow"><button>BTC/USDT ▾</button><button>1H ▾</button><button>Indicators</button></div>
      <CandlestickChart />
      <Card>
        <div className="sectionHeader"><h2>Indicators</h2><StatusBadge label="INTERPRETED" tone="good" /></div>
        <div className="indicatorGrid">{indicators.map(([name, value, read]) => <div key={name} className="indicatorItem"><span>{name}</span><strong>{value}</strong><small>{read}</small></div>)}</div>
      </Card>
      <Card className="decisionCard"><p className="muted small">Setup Detected</p><h2>Trend Continuation · Pullback</h2><StatusBadge label="WAIT" tone="warn" /><p>Pullback is not deep enough. Wait for support reaction or clean invalidation.</p></Card>
      <Card><h2>Key Levels</h2><div className="levelRow bad"><span>Resistance</span><strong>68,500</strong></div><div className="levelRow bad"><span>Resistance</span><strong>69,800</strong></div><div className="levelRow good"><span>Support</span><strong>66,900</strong></div><div className="levelRow good"><span>Support</span><strong>65,200</strong></div></Card>
    </div>
  );
}

function TradeScreen() {
  return (
    <div className="screenGrid tradeGrid">
      <Card><h2>Risk Calculator</h2><label>Account Balance (USDT)<input defaultValue="1000.00" /></label><label>Risk Per Trade (%)<input defaultValue="0.50" /></label><div className="twoCols"><label>Entry<input defaultValue="67,900" /></label><label>Stop Loss<input defaultValue="66,900" /></label></div><label>Take Profit<input defaultValue="70,900" /></label><div className="segmented"><button className="activeSegment">Long</button><button>Short</button></div></Card>
      <Card className="riskSummary"><h2>Risk Summary</h2><div className="levelRow"><span>Risk Amount</span><strong>5.00 USDT</strong></div><div className="levelRow"><span>Position Size</span><strong>0.083 BTC</strong></div><div className="levelRow"><span>Potential Loss</span><strong>5.00 USDT</strong></div><div className="levelRow"><span>Potential Profit</span><strong>25.00 USDT</strong></div><div className="levelRow"><span>Risk / Reward</span><strong>1 : 5.00</strong></div><StatusBadge label="All rules satisfied" tone="good" /></Card>
      <Card><h2>Paper Trading</h2><p className="muted">Paper trading only. No real-money order execution.</p><div className="positionCard"><strong>BTC/USDT LONG</strong><span className="good">+34.62 USDT</span><small>Entry 67,200 · Current 67,892 · SL 66,200 · TP 70,900</small></div></Card>
    </div>
  );
}

function JournalScreen() {
  return (
    <div className="screenGrid">
      <div className="chipRow"><button className="activeChip">All</button><button>Win</button><button>Loss</button><button>Breakeven</button><button>Mistakes</button></div>
      {journalRows.map((row) => (
        <Card key={row.symbol} className="journalCard"><div><strong>{row.symbol}</strong><span className="muted tiny">{row.side} · {row.rule}</span></div><div><strong className={row.result === 'WIN' ? 'good' : 'bad'}>{row.pnl}</strong><StatusBadge label={row.result} tone={row.result === 'WIN' ? 'good' : 'bad'} /></div></Card>
      ))}
      <Card><h2>Performance Snapshot</h2><div className="metricRow"><MetricCard label="Total Trades" value="32" /><MetricCard label="Win Rate" value="62.5%" tone="good" /><MetricCard label="Compliance" value="100%" tone="good" /></div></Card>
    </div>
  );
}

function AdminScreen() {
  const [running, setRunning] = useState(false);
  return (
    <div className="screenGrid adminGrid">
      <Card className="adminHero"><h2>Admin Mode</h2><p>Bot token and private keys stay local on the admin device. Never commit them to GitHub.</p><StatusBadge label={running ? 'BOT RUNNING' : 'BOT STOPPED'} tone={running ? 'good' : 'warn'} /></Card>
      <Card><h2>Bot Setup</h2><input placeholder="Telegram bot token (local only)" type="password" /><input placeholder="Admin Telegram Chat ID" /><textarea placeholder="License private key (local only)" /></Card>
      <Card><h2>Bot Control</h2><div className="adminActions"><button className="primaryButton" onClick={() => setRunning(true)}>Start Bot</button><button className="dangerButton" onClick={() => setRunning(false)}>Stop Bot</button><button>Test Bot</button></div></Card>
      <Card><h2>Approval Inbox</h2><div className="approvalCard"><div><strong>New Activation Request</strong><span className="muted tiny">@user · Android · device A7F3-9K2L</span></div><div><button>Approve</button><button>Deny</button></div></div></Card>
      <div className="tickerGrid"><MetricCard label="Pending" value="12" /><MetricCard label="Licenses" value="156" tone="good" /><MetricCard label="Revoked" value="7" tone="bad" /></div>
    </div>
  );
}

function AppContent({ active, licensed, deviceId, requestCode, setLicensed }: { active: Tab; licensed: boolean; deviceId: string; requestCode: string; setLicensed: (value: boolean) => void }) {
  if (!licensed && active !== 'admin') return <ActivationScreen code={requestCode} deviceId={deviceId} onActivated={() => setLicensed(true)} />;
  if (active === 'dashboard') return <DashboardScreen />;
  if (active === 'analysis') return <AnalysisScreen />;
  if (active === 'trade') return <TradeScreen />;
  if (active === 'journal') return <JournalScreen />;
  return <AdminScreen />;
}

export function App() {
  const [active, setActive] = useState<Tab>('dashboard');
  const [deviceId, setDeviceId] = useState('');
  const [licensed, setLicensed] = useState(false);
  useEffect(() => {
    const id = makeDeviceId();
    setDeviceId(id);
    setLicensed(localStorage.getItem('aegis.license.status') === 'ACTIVE');
  }, []);
  const requestCode = useMemo(() => deviceId ? makeRequestCode(deviceId) : 'Generating...', [deviceId]);
  return (
    <div className="appRoot">
      <DesktopSideNav active={active} onChange={setActive} />
      <main className="appFrame">
        <Header active={active} licensed={licensed} />
        <AppContent active={active} licensed={licensed} deviceId={deviceId} requestCode={requestCode} setLicensed={setLicensed} />
      </main>
      <BottomNav active={active} onChange={setActive} />
    </div>
  );
}