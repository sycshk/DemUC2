import { KPIMetric, PnLRow, WaterfallDataPoint } from './types';

// Colors
export const COLORS = {
  NAVY: '#003366',
  RED: '#F40009',
  BLUE: '#1CA9C9',
  BG: '#F4F6F8',
  WHITE: '#FFFFFF',
  GREEN: '#10B981', // For positive variance
};

// FX Rates (Base: HKD)
// Logic: Local * Rate = HKD
// Therefore: HKD / Rate = Local
export const FX_RATES = {
  china: 1.08,   // 1 RMB = 1.08 HKD
  usa: 7.82,     // 1 USD = 7.82 HKD
  hk: 1.00,      // 1 HKD = 1.00 HKD
  taiwan: 0.25,  // 1 TWD = 0.25 HKD
};

// Mock KPI Data
export const KPI_DATA: KPIMetric[] = [
  { id: '1', label: 'Total Revenue', value: '$4,285m', variance: 5.2, trend: 'up' },
  { id: '2', label: 'Attributable Profit', value: '$842m', variance: -1.4, trend: 'down' },
  { id: '3', label: 'EBITDA', value: '$1,105m', variance: 2.8, trend: 'up' },
  { id: '4', label: 'Volume (Unit Cases)', value: '89.2m', variance: 0.5, trend: 'up' },
];

// Mock Waterfall Data (Bridge)
// Logic: Previous Year -> Price -> Volume -> Mix -> FX -> Cost -> Current Budget
export const WATERFALL_DATA: WaterfallDataPoint[] = [
  { name: 'LY Actual', value: 800, start: 0, end: 800, isTotal: true },
  { name: 'Price', value: 120, start: 800, end: 920 },
  { name: 'Volume', value: 40, start: 920, end: 960 },
  { name: 'Mix', value: -30, start: 930, end: 960 }, // Visual trick: start is lower
  { name: 'FX', value: -50, start: 880, end: 930 },
  { name: 'Cost', value: -120, start: 760, end: 880 },
  { name: 'Budget', value: 760, start: 0, end: 760, isTotal: true },
];

// Mock Trend Data
export const TREND_DATA = [
  { month: 'Jan', profit: 65, cumulative: 65 },
  { month: 'Feb', profit: 58, cumulative: 123 },
  { month: 'Mar', profit: 72, cumulative: 195 },
  { month: 'Apr', profit: 68, cumulative: 263 },
  { month: 'May', profit: 80, cumulative: 343 },
  { month: 'Jun', profit: 85, cumulative: 428 },
  { month: 'Jul', profit: 92, cumulative: 520 },
  { month: 'Aug', profit: 88, cumulative: 608 },
  { month: 'Sep', profit: 75, cumulative: 683 },
  { month: 'Oct', profit: 60, cumulative: 743 },
  { month: 'Nov', profit: 55, cumulative: 798 },
  { month: 'Dec', profit: 44, cumulative: 842 },
];

// Mock P&L Data
export const PNL_DATA: PnLRow[] = [
  { id: '1', label: 'Gross Revenue', level: 1, isTotal: true, values: { group: 4285000, china: 2100000, usa: 1500000, hk: 400000, taiwan: 285000 } },
  { id: '2', label: 'Discounts & Allowances', level: 2, values: { group: -285000, china: -150000, usa: -80000, hk: -30000, taiwan: -25000 } },
  { id: '3', label: 'Net Operating Revenue', level: 1, isTotal: true, values: { group: 4000000, china: 1950000, usa: 1420000, hk: 370000, taiwan: 260000 } },
  { id: '4', label: 'Cost of Goods Sold', level: 1, values: { group: -2400000, china: -1200000, usa: -850000, hk: -200000, taiwan: -150000 } },
  { id: '5', label: 'Gross Profit', level: 1, isTotal: true, values: { group: 1600000, china: 750000, usa: 570000, hk: 170000, taiwan: 110000 } },
  { id: '6', label: 'Operating Expenses', level: 1, values: { group: -800000, china: -350000, usa: -300000, hk: -80000, taiwan: -70000 } },
  { id: '7', label: 'EBITDA', level: 1, isTotal: true, values: { group: 800000, china: 400000, usa: 270000, hk: 90000, taiwan: 40000 } },
];

export const COMPARISON_DATA = [
  { metric: 'Volume (Unit Cases)', actual: 89.2, budget: 88.5, forecast: 90.1, unit: 'm' },
  { metric: 'Gross Revenue', actual: 4285, budget: 4150, forecast: 4300, unit: '$m' },
  { metric: 'Net Operating Revenue', actual: 4000, budget: 3850, forecast: 4050, unit: '$m' },
  { metric: 'Cost of Goods Sold', actual: -2400, budget: -2350, forecast: -2420, unit: '$m' },
  { metric: 'Gross Profit', actual: 1600, budget: 1500, forecast: 1630, unit: '$m' },
  { metric: 'Operating Expenses', actual: -800, budget: -750, forecast: -780, unit: '$m' },
  { metric: 'EBITDA', actual: 1105, budget: 1050, forecast: 1120, unit: '$m' },
  { metric: 'Attributable Profit', actual: 842, budget: 800, forecast: 850, unit: '$m' },
];

export const MACRO_DATA = [
  { indicator: 'China GDP Growth', value: '+5.2%', impact: 'Positive', description: 'Higher than expected recovery boosting consumption in mainland markets.' },
  { indicator: 'Global Sugar Price', value: '+12.5%', impact: 'Negative', description: 'Supply constraints in Brazil increasing raw material costs.' },
  { indicator: 'USD/CNY', value: '7.24', impact: 'Neutral', description: 'Stable within hedging band, minimal FX impact this quarter.' },
  { indicator: 'Aluminum Index', value: '-3.2%', impact: 'Positive', description: 'Lower packaging costs for cans contributing to better margins.' },
];
