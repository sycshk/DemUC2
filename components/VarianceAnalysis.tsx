import React, { useState } from 'react';
// import { GoogleGenAI } from "@google/genai"; // Commented out for demo stability
import { ArrowUpRight, ArrowDownRight, Sparkles, TrendingUp, DollarSign, Activity, AlertTriangle, RefreshCcw } from 'lucide-react';
import { COMPARISON_DATA, MACRO_DATA, COLORS } from '../constants';
import ReactMarkdown from 'react-markdown';

// Simple loader component
const Loader: React.FC<{ size?: number, className?: string }> = ({ size = 24, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const VarianceAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const calculateVariance = (actual: number, baseline: number) => {
    const diff = actual - baseline;
    const percent = (diff / Math.abs(baseline)) * 100;
    return percent;
  };

  const generateAIInsight = async () => {
    // API Key removed as requested. 
    // simulating a response for the UI demo.
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
        const mockResponse = `### Executive Summary: May 2024 Performance

**1. Key Performance Drivers**
*   **Revenue & Volume:** Strong performance with **Volume up 0.5%** and **Total Revenue up 5.2%**. This is largely driven by the Mainland China recovery exceeding initial projections.
*   **Profitability:** **EBITDA is up 2.8%**, outperforming budget. However, **Attributable Profit is down 1.4%**, primarily due to one-off tax adjustments in the US market (not visible in high-level operational metrics).

**2. Impact of Macro Factors**
*   **China GDP (+5.2%):** The positive GDP growth is directly correlating with our volume recovery in the region, particularly in on-premise consumption.
*   **Global Sugar Price (+12.5%):** This remains a significant headwind. While Revenue is up, our **COGS variance** shows pressure (-2.1% vs Budget), partially eroding the top-line gains.
*   **Aluminum Index (-3.2%):** Lower packaging costs helped offset some of the sugar price increases, preventing a steeper decline in Gross Margins.

**3. Strategic Recommendations**
*   **Pricing:** Consider a tactical price increase on low-margin SKUs in Q3 to fully offset the sugar spike.
*   **Hedging:** Review sugar hedging positions for FY25 immediately to lock in rates if corrections occur.
*   **Cost Control:** Maintain strict Opex discipline in the US to protect the bottom line against further inflationary pressures.`;
        
        setAiAnalysis(mockResponse);
        setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-swire-navy">Performance & Variance Analysis</h2>
        <div className="text-sm text-gray-500">Data as of: <span className="font-medium text-gray-800">May 2024</span></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Left Column: Financial Table */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-swire-navy flex items-center gap-2">
              <Activity size={18} /> Financials: Actual vs Plan
            </h3>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10">
                <tr>
                  <th className="p-3 text-left font-medium">Metric</th>
                  <th className="p-3 text-right font-medium">Actual</th>
                  <th className="p-3 text-right font-medium">Budget</th>
                  <th className="p-3 text-right font-medium">Forecast</th>
                  <th className="p-3 text-right font-medium text-gray-500">Var (Bud)</th>
                  <th className="p-3 text-right font-medium text-gray-500">Var (Fcst)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON_DATA.map((row, idx) => {
                  const varBud = calculateVariance(row.actual, row.budget);
                  const varFcst = calculateVariance(row.actual, row.forecast);
                  // Simple heuristic: If metric is cost (COGS, Opex), invert color logic.
                  const isCost = row.metric.includes('Cost') || row.metric.includes('Expenses') || row.metric === 'COGS';
                  
                  const getCol = (val: number, isCostMetric: boolean) => {
                     if (Math.abs(val) < 0.1) return 'text-gray-400'; // Flat
                     if (isCostMetric) return val > 0 ? 'text-swire-red' : 'text-green-600'; // Higher cost is red
                     return val > 0 ? 'text-green-600' : 'text-swire-red';
                  };

                  return (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      <td className="p-3 font-medium text-gray-800">{row.metric}</td>
                      <td className="p-3 text-right tabular-nums font-semibold text-swire-navy">{row.actual}</td>
                      <td className="p-3 text-right tabular-nums text-gray-600">{row.budget}</td>
                      <td className="p-3 text-right tabular-nums text-gray-600">{row.forecast}</td>
                      <td className={`p-3 text-right tabular-nums font-medium ${getCol(varBud, isCost)}`}>
                        {varBud > 0 ? '+' : ''}{varBud.toFixed(1)}%
                      </td>
                      <td className={`p-3 text-right tabular-nums font-medium ${getCol(varFcst, isCost)}`}>
                         {varFcst > 0 ? '+' : ''}{varFcst.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Macro & AI */}
        <div className="flex flex-col gap-6 h-full">
          
          {/* Macro Indicators */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-swire-navy mb-4 flex items-center gap-2">
              <TrendingUp size={18} /> Macro Context
            </h3>
            <div className="space-y-3">
              {MACRO_DATA.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded p-3 border border-gray-100 hover:border-blue-200 transition-colors">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-700">{item.indicator}</span>
                    <span className={`text-sm font-bold ${item.impact === 'Positive' ? 'text-green-600' : item.impact === 'Negative' ? 'text-swire-red' : 'text-gray-500'}`}>
                      {item.value}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights Section */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-sm border border-blue-100 flex flex-col flex-1 p-4 relative overflow-hidden">
             <div className="flex justify-between items-center mb-3">
               <h3 className="font-semibold text-swire-navy flex items-center gap-2">
                 <Sparkles size={18} className="text-purple-600" /> AI Executive Summary
               </h3>
               {!aiAnalysis && !loading && (
                 <button 
                   onClick={generateAIInsight}
                   className="text-xs bg-white border border-blue-200 text-blue-700 px-3 py-1 rounded-full shadow-sm hover:bg-blue-50 flex items-center gap-1"
                 >
                   <RefreshCcw size={12} /> Analyze
                 </button>
               )}
             </div>

             <div className="flex-1 overflow-y-auto pr-1 text-sm text-gray-700 leading-relaxed custom-markdown">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3">
                    <Loader size={32} className="text-blue-400 animate-spin" />
                    <p className="text-xs animate-pulse">Consulting Gemini models...</p>
                  </div>
                ) : aiAnalysis ? (
                  <div className="prose prose-sm max-w-none prose-headings:text-swire-navy prose-p:text-gray-700 prose-li:text-gray-700">
                    <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                      <Sparkles className="text-purple-400 h-6 w-6" />
                    </div>
                    <p className="text-gray-500 text-sm mb-4">
                      Ready to analyze financial variances against macroeconomic trends?
                    </p>
                    <button 
                      onClick={generateAIInsight}
                      className="bg-swire-navy text-white px-4 py-2 rounded shadow hover:bg-blue-900 transition-colors text-sm font-medium"
                    >
                      Generate Insight
                    </button>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VarianceAnalysis;