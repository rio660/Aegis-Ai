import type { ApprovalRequestRecord, LicenseFeature, LicenseStatus, TradingDecision } from '@aegis/shared-types';
export declare function AppShell({ children }: {
    children: any;
}): any;
export declare function MobileBottomNav(): any;
export declare function SidebarNav(): any;
export declare function SecurityNoticeCard(): any;
export declare function RequestCodeCard({ code }: {
    code: string;
}): any;
export declare function ActivationKeyForm({ onSubmit }: {
    onSubmit: (key: string) => void;
}): any;
export declare function LicenseStatusCard({ status }: {
    status: LicenseStatus;
}): any;
export declare function ActivationRequiredScreen({ code, onActivate }: {
    code: string;
    onActivate: (key: string) => void;
}): any;
export declare function AdminModeLogin(): any;
export declare function BotSetupForm(): any;
export declare function BotControlPanel(): any;
export declare function ApprovalRequestCard({ record }: {
    record: ApprovalRequestRecord;
}): any;
export declare function ApprovalInbox({ records }: {
    records: ApprovalRequestRecord[];
}): any;
export declare function LicenseManager(): any;
export declare function AdminAuditLog(): any;
export declare function MarketTickerCard(): any;
export declare function CandlestickChart(): any;
export declare function IndicatorPanel(): any;
export declare function MarketRegimeBadge({ regime }: {
    regime: string;
}): any;
export declare function SignalDecisionCard({ decision }: {
    decision: TradingDecision;
}): any;
export declare function RiskCalculator(): any;
export declare function AIAnalysisPanel(): any;
export declare function PaperTradeForm(): any;
export declare function OpenPositionsTable(): any;
export declare function TradeJournalTable(): any;
export declare function PerformanceStats(): any;
export declare function BacktestResultCard(): any;
export declare function SafetyWarningBanner(): any;
export declare const FEATURES: LicenseFeature[];
