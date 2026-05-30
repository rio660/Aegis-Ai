import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { AIAnalysisPanel, BacktestResultCard, CandlestickChart, LicenseStatusCard, MarketTickerCard, PaperTradeForm, PerformanceStats, SafetyWarningBanner, SecurityNoticeCard, SignalDecisionCard, TradeJournalTable } from '../components/components.js';
export function Welcome() { return _jsxs(_Fragment, { children: [_jsx("h1", { children: "Aegis Trade AI" }), _jsx("p", { children: "Risk-first AI trading assistant." }), _jsx(SafetyWarningBanner, {})] }); }
export function ActivationSuccess() { return _jsx("p", { children: "Activation successful. This device is now licensed. You will not need to enter the key again unless app data is cleared, the app is reinstalled, or the license expires." }); }
export function LicenseActive() { return _jsx(LicenseStatusCard, { status: "ACTIVE" }); }
export function LicenseInvalid() { return _jsx(LicenseStatusCard, { status: "INVALID_SIGNATURE" }); }
export function LicenseExpired() { return _jsx("p", { children: "This license has expired. Generate a new request code and contact admin." }); }
export function DeviceMismatch() { return _jsx("p", { children: "This activation key belongs to another device. Generate a new request code from this device and ask admin for approval." }); }
export function Dashboard() { return _jsxs(_Fragment, { children: [_jsx(MarketTickerCard, {}), _jsx(SignalDecisionCard, { decision: "WAIT" })] }); }
export function Analysis() { return _jsxs(_Fragment, { children: [_jsx(CandlestickChart, {}), _jsx(AIAnalysisPanel, {})] }); }
export function PaperTrading() { return _jsx(PaperTradeForm, {}); }
export function Journal() { return _jsx(TradeJournalTable, {}); }
export function Backtest() { return _jsx(BacktestResultCard, {}); }
export function Performance() { return _jsx(PerformanceStats, {}); }
export function Settings() { return _jsx(SecurityNoticeCard, {}); }
