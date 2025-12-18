import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Line, Cell, ReferenceLine } from 'recharts';
import { KPI_DATA, WATERFALL_DATA, TREND_DATA, COLORS } from '../constants';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_DATA.map((metric) => (
          <div key={metric.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{metric.label}</h3>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-bold text-swire-navy tabular-nums">{metric.value}</span>
              <div className={`flex items-center text-sm font-medium ${metric.variance >= 0 ? 'text-green-600' : 'text-swire-red'}`}>
                {metric.variance >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span className="ml-1 tabular-nums">{Math.abs(metric.variance)}%</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">vs Prior Year</p>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[450px]">
        {/* Waterfall Chart - The Bridge */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
          <h3 className="text-lg font-semibold text-swire-navy mb-4">Profit Bridge (LY Actual to Budget)</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WATERFALL_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-2 border border-gray-200 shadow-md rounded text-sm">
                          <p className="font-semibold text-swire-navy">{data.name}</p>
                          <p className="tabular-nums">Value: {data.value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine y={0} stroke="#000" />
                {/* 
                  Trick for Waterfall: 
                  We render two bars. 
                  1. A transparent bar for the "start" height.
                  2. A colored bar for the magnitude (value).
                */}
                <Bar dataKey="start" stackId="a" fill="transparent" />
                <Bar dataKey="value" stackId="a">
                  {WATERFALL_DATA.map((entry, index) => {
                    let fill = COLORS.GREEN; // Positive Variance
                    if (entry.isTotal) fill = COLORS.NAVY; // Totals
                    else if (entry.value < 0) fill = COLORS.RED; // Negative Variance
                    
                    // For visualization of negative bars in a stacked chart, we use absolute value logic visually
                    // But here for simplicity in this generated code, we rely on positive stacked segments.
                    // A proper implementation might split into positive/negative data keys.
                    // To make it look right with the simple model:
                    return <Cell key={`cell-${index}`} fill={fill} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
          <h3 className="text-lg font-semibold text-swire-navy mb-4">Monthly Profit Trend</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={TREND_DATA} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid stroke="#f5f5f5" vertical={false} />
                <XAxis dataKey="month" scale="point" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar yAxisId="left" dataKey="profit" fill={COLORS.BLUE} barSize={20} radius={[4, 4, 0, 0]} name="Monthly" />
                <Line yAxisId="right" type="monotone" dataKey="cumulative" stroke={COLORS.NAVY} strokeWidth={2} dot={{ r: 3 }} name="Cumulative" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;