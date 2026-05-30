import React from 'react';
import type { ApprovalRequestRecord, LicenseFeature, LicenseStatus, TradingDecision } from '@aegis/shared-types';
export function AppShell({children}:{children:any}){return <main className="shell">{children}</main>}
export function MobileBottomNav(){return <nav className="bottom">Dashboard · Analysis · Journal · Admin</nav>}
export function SidebarNav(){return <aside className="sidebar">Aegis Trade AI</aside>}
export function SecurityNoticeCard(){return <section className="card warning">This app uses device-bound offline licensing. No offline licensing system is uncrackable. If app data is cleared or the app is reinstalled, reactivation may be required.</section>}
export function RequestCodeCard({code}:{code:string}){return <section className="card"><h2>Copy Request Code</h2><textarea readOnly value={code}/></section>}
export function ActivationKeyForm({onSubmit}:{onSubmit:(key:string)=>void}){const [key,setKey]=React.useState('');return <form onSubmit={(e:any)=>{e.preventDefault();onSubmit(key);setKey('')}}><textarea value={key} onChange={(e:any)=>setKey(e.target.value)} placeholder="Paste AEGIS-LIC activation key"/><button>Activate</button></form>}
export function LicenseStatusCard({status}:{status:LicenseStatus}){return <section className="card"><strong>License:</strong> {status}</section>}
export function ActivationRequiredScreen({code,onActivate}:{code:string;onActivate:(key:string)=>void}){return <><h1>Activation Required</h1><p>Access requires Telegram admin approval. Copy your request code and send it to the official Aegis Trade AI bot.</p><RequestCodeCard code={code}/><ActivationKeyForm onSubmit={onActivate}/><SecurityNoticeCard/></>}
export function AdminModeLogin(){return <section className="card"><h2>Admin Mode Login</h2><input type="password" placeholder="Local admin PIN"/></section>}
export function BotSetupForm(){return <section className="card"><h2>Bot Setup</h2><input placeholder="Telegram bot token"/><input placeholder="Admin Telegram ID"/><textarea placeholder="License private key"/><textarea placeholder="License public key"/><input placeholder="Active key ID"/></section>}
export function BotControlPanel(){return <section className="card"><h2>Bot Control</h2><button>Start Bot</button><button>Stop Bot</button><button>Test Bot Token</button><button>Clear Pending Updates</button></section>}
export function ApprovalRequestCard({record}:{record:ApprovalRequestRecord}){return <article className="card"><h3>{record.request.requestId}</h3><p>Telegram: {record.telegramUserId} @{record.telegramUsername??'-'}</p><p>Device: {record.request.deviceHash.slice(0,12)}… · {record.request.platform} · {record.request.appVersion}</p><button>Approve</button><button>Deny</button></article>}
export function ApprovalInbox({records}:{records:ApprovalRequestRecord[]}){return <section><h2>Approval Inbox</h2>{records.map(r=><ApprovalRequestCard record={r}/>)}</section>}
export function LicenseManager(){return <section className="card"><h2>Issued / Denied / Revoked Licenses</h2><p>Offline licenses already activated on user devices cannot be force-revoked remotely without a hosted backend. This record prevents reissue and documents revocation.</p></section>}
export function AdminAuditLog(){return <section className="card"><h2>Admin Audit Logs</h2></section>}
export function MarketTickerCard(){return <section className="card">BTC/USDT · Public market data only</section>}
export function CandlestickChart(){return <section className="card chart">Candlestick chart</section>}
export function IndicatorPanel(){return <section className="card">RSI · ATR · SMA · EMA</section>}
export function MarketRegimeBadge({regime}:{regime:string}){return <span className="badge">{regime}</span>}
export function SignalDecisionCard({decision}:{decision:TradingDecision}){return <section className="decision"><h2>{decision}</h2><p>WAIT and NO_TRADE are valid safety-first decisions.</p></section>}
export function RiskCalculator(){return <section className="card">Risk calculator requires stop loss and valid risk/reward.</section>}
export function AIAnalysisPanel(){return <section className="card">AI explanation uses structured engine output only.</section>}
export function PaperTradeForm(){return <section className="card">Paper trading only. No real-money order execution.</section>}
export function OpenPositionsTable(){return <section className="card">Open paper positions</section>}
export function TradeJournalTable(){return <section className="card">Trading journal</section>}
export function PerformanceStats(){return <section className="card">Performance review</section>}
export function BacktestResultCard(){return <section className="card">Backtest simulation result</section>}
export function SafetyWarningBanner(){return <div className="warning">Winrate 100% tidak realistis dan tidak boleh dijadikan target. Target yang benar adalah disiplin eksekusi, risk management, dan evaluasi performa berbasis data.</div>}
export const FEATURES: LicenseFeature[] = ['market_dashboard','ai_analysis','paper_trading','journal','backtesting','performance_review','alerts','export_data'];
