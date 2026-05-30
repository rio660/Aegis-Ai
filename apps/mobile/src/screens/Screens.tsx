import React from 'react';
import { AIAnalysisPanel, BacktestResultCard, CandlestickChart, LicenseStatusCard, MarketTickerCard, PaperTradeForm, PerformanceStats, SafetyWarningBanner, SecurityNoticeCard, SignalDecisionCard, TradeJournalTable } from '../components/components.js';
export function Welcome(){return <><h1>Aegis Trade AI</h1><p>Risk-first AI trading assistant.</p><SafetyWarningBanner/></>}
export function ActivationSuccess(){return <p>Activation successful. This device is now licensed. You will not need to enter the key again unless app data is cleared, the app is reinstalled, or the license expires.</p>}
export function LicenseActive(){return <LicenseStatusCard status="ACTIVE"/>}
export function LicenseInvalid(){return <LicenseStatusCard status="INVALID_SIGNATURE"/>}
export function LicenseExpired(){return <p>This license has expired. Generate a new request code and contact admin.</p>}
export function DeviceMismatch(){return <p>This activation key belongs to another device. Generate a new request code from this device and ask admin for approval.</p>}
export function Dashboard(){return <><MarketTickerCard/><SignalDecisionCard decision="WAIT"/></>}
export function Analysis(){return <><CandlestickChart/><AIAnalysisPanel/></>}
export function PaperTrading(){return <PaperTradeForm/>}
export function Journal(){return <TradeJournalTable/>}
export function Backtest(){return <BacktestResultCard/>}
export function Performance(){return <PerformanceStats/>}
export function Settings(){return <SecurityNoticeCard/>}
