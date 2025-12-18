export type ViewState = 'dashboard' | 'ingestion' | 'adjustments' | 'consolidation' | 'variance' | 'reports' | 'settings';

export interface KPIMetric {
  id: string;
  label: string;
  value: string;
  variance: number; // Percentage
  trend: 'up' | 'down';
}

export interface WaterfallDataPoint {
  name: string;
  start: number;
  end: number;
  value: number;
  isTotal?: boolean;
}

export interface MarketFile {
  id: string;
  market: string;
  filename: string;
  status: 'processing' | 'valid' | 'error';
  uploadDate: string;
  errors?: string[];
}

export interface PnLRow {
  id: string;
  label: string;
  level: 1 | 2 | 3; // Indentation level
  isTotal?: boolean;
  values: {
    group: number;
    china: number;
    usa: number;
    hk: number;
    taiwan: number;
  };
}