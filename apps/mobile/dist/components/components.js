import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
export function AppShell({ children }) { return _jsx("main", { className: "shell", children: children }); }
export function MobileBottomNav() { return _jsx("nav", { className: "bottom", children: "Dashboard \u00B7 Analysis \u00B7 Journal \u00B7 Admin" }); }
export function SidebarNav() { return _jsx("aside", { className: "sidebar", children: "Aegis Trade AI" }); }
export function SecurityNoticeCard() { return _jsx("section", { className: "card warning", children: "This app uses device-bound offline licensing. No offline licensing system is uncrackable. If app data is cleared or the app is reinstalled, reactivation may be required." }); }
export function RequestCodeCard({ code }) { return _jsxs("section", { className: "card", children: [_jsx("h2", { children: "Copy Request Code" }), _jsx("textarea", { readOnly: true, value: code })] }); }
export function ActivationKeyForm({ onSubmit }) { const [key, setKey] = React.useState(''); return _jsxs("form", { onSubmit: (e) => { e.preventDefault(); onSubmit(key); setKey(''); }, children: [_jsx("textarea", { value: key, onChange: (e) => setKey(e.target.value), placeholder: "Paste AEGIS-LIC activation key" }), _jsx("button", { children: "Activate" })] }); }
export function LicenseStatusCard({ status }) { return _jsxs("section", { className: "card", children: [_jsx("strong", { children: "License:" }), " ", status] }); }
export function ActivationRequiredScreen({ code, onActivate }) { return _jsxs(_Fragment, { children: [_jsx("h1", { children: "Activation Required" }), _jsx("p", { children: "Access requires Telegram admin approval. Copy your request code and send it to the official Aegis Trade AI bot." }), _jsx(RequestCodeCard, { code: code }), _jsx(ActivationKeyForm, { onSubmit: onActivate }), _jsx(SecurityNoticeCard, {})] }); }
export function AdminModeLogin() { return _jsxs("section", { className: "card", children: [_jsx("h2", { children: "Admin Mode Login" }), _jsx("input", { type: "password", placeholder: "Local admin PIN" })] }); }
export function BotSetupForm() { return _jsxs("section", { className: "card", children: [_jsx("h2", { children: "Bot Setup" }), _jsx("input", { placeholder: "Telegram bot token" }), _jsx("input", { placeholder: "Admin Telegram ID" }), _jsx("textarea", { placeholder: "License private key" }), _jsx("textarea", { placeholder: "License public key" }), _jsx("input", { placeholder: "Active key ID" })] }); }
export function BotControlPanel() { return _jsxs("section", { className: "card", children: [_jsx("h2", { children: "Bot Control" }), _jsx("button", { children: "Start Bot" }), _jsx("button", { children: "Stop Bot" }), _jsx("button", { children: "Test Bot Token" }), _jsx("button", { children: "Clear Pending Updates" })] }); }
export function ApprovalRequestCard({ record }) { return _jsxs("article", { className: "card", children: [_jsx("h3", { children: record.request.requestId }), _jsxs("p", { children: ["Telegram: ", record.telegramUserId, " @", record.telegramUsername ?? '-'] }), _jsxs("p", { children: ["Device: ", record.request.deviceHash.slice(0, 12), "\u2026 \u00B7 ", record.request.platform, " \u00B7 ", record.request.appVersion] }), _jsx("button", { children: "Approve" }), _jsx("button", { children: "Deny" })] }); }
export function ApprovalInbox({ records }) { return _jsxs("section", { children: [_jsx("h2", { children: "Approval Inbox" }), records.map(r => _jsx(ApprovalRequestCard, { record: r }))] }); }
export function LicenseManager() { return _jsxs("section", { className: "card", children: [_jsx("h2", { children: "Issued / Denied / Revoked Licenses" }), _jsx("p", { children: "Offline licenses already activated on user devices cannot be force-revoked remotely without a hosted backend. This record prevents reissue and documents revocation." })] }); }
export function AdminAuditLog() { return _jsx("section", { className: "card", children: _jsx("h2", { children: "Admin Audit Logs" }) }); }
export function MarketTickerCard() { return _jsx("section", { className: "card", children: "BTC/USDT \u00B7 Public market data only" }); }
export function CandlestickChart() { return _jsx("section", { className: "card chart", children: "Candlestick chart" }); }
export function IndicatorPanel() { return _jsx("section", { className: "card", children: "RSI \u00B7 ATR \u00B7 SMA \u00B7 EMA" }); }
export function MarketRegimeBadge({ regime }) { return _jsx("span", { className: "badge", children: regime }); }
export function SignalDecisionCard({ decision }) { return _jsxs("section", { className: "decision", children: [_jsx("h2", { children: decision }), _jsx("p", { children: "WAIT and NO_TRADE are valid safety-first decisions." })] }); }
export function RiskCalculator() { return _jsx("section", { className: "card", children: "Risk calculator requires stop loss and valid risk/reward." }); }
export function AIAnalysisPanel() { return _jsx("section", { className: "card", children: "AI explanation uses structured engine output only." }); }
export function PaperTradeForm() { return _jsx("section", { className: "card", children: "Paper trading only. No real-money order execution." }); }
export function OpenPositionsTable() { return _jsx("section", { className: "card", children: "Open paper positions" }); }
export function TradeJournalTable() { return _jsx("section", { className: "card", children: "Trading journal" }); }
export function PerformanceStats() { return _jsx("section", { className: "card", children: "Performance review" }); }
export function BacktestResultCard() { return _jsx("section", { className: "card", children: "Backtest simulation result" }); }
export function SafetyWarningBanner() { return _jsx("div", { className: "warning", children: "Winrate 100% tidak realistis dan tidak boleh dijadikan target. Target yang benar adalah disiplin eksekusi, risk management, dan evaluasi performa berbasis data." }); }
export const FEATURES = ['market_dashboard', 'ai_analysis', 'paper_trading', 'journal', 'backtesting', 'performance_review', 'alerts', 'export_data'];
