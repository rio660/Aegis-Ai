export interface InternalAlert {
    id: string;
    level: 'info' | 'warning' | 'critical';
    message: string;
    createdAt: string;
}
export declare function createAlert(level: InternalAlert['level'], message: string): InternalAlert;
