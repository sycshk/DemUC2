import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Filter, Download } from 'lucide-react';
import { PNL_DATA } from '../constants';

const ConsolidatedView: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<string[]>(['1', '3', '5', '7']); // IDs of expanded rows

  const toggleRow = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(100vh-140px)] flex flex-col">
      {/* Toolbar */}
      <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 shadow-sm">
            <Filter size={14} />
            <span>Filter</span>
          </button>
          <div className="h-6 w-px bg-gray-300 mx-2"></div>
          <span className="text-sm text-gray-500">Showing: <span className="font-semibold text-swire-navy">All Markets</span></span>
        </div>
        <button className="flex items-center space-x-1 px-3 py-1.5 bg-swire-navy text-white rounded text-sm hover:bg-blue-900 shadow-sm">
          <Download size={14} />
          <span>Export Excel</span>
        </button>
      </div>

      {/* The Big Grid */}
      <div className="flex-1 overflow-auto relative">
        <table className="min-w-full text-sm border-separate border-spacing-0">
          <thead className="bg-gray-100 text-gray-600 sticky top-0 z-20 shadow-sm">
            <tr>
              <th className="sticky left-0 bg-gray-100 z-30 p-3 text-left border-b border-r w-64 font-semibold text-swire-navy">
                P&L Line Items
              </th>
              <th className="p-3 text-right border-b border-r w-32 font-bold text-swire-navy bg-blue-50">
                Group Total
              </th>
              {/* Region Hierarchy visual - Simplified for MVP */}
              <th className="p-3 text-right border-b border-r w-32 font-semibold">
                Mainland China
              </th>
              <th className="p-3 text-right border-b border-r w-32 font-semibold">
                USA
              </th>
              <th className="p-3 text-right border-b border-r w-32 font-semibold">
                Hong Kong
              </th>
              <th className="p-3 text-right border-b border-r w-32 font-semibold">
                Taiwan
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {PNL_DATA.map((row) => (
              <tr key={row.id} className={`hover:bg-blue-50 group ${row.isTotal ? 'bg-gray-50 font-semibold' : ''}`}>
                
                {/* Fixed First Column */}
                <td className={`sticky left-0 z-10 p-2 border-r border-b-0 border-gray-200 ${row.isTotal ? 'bg-gray-50' : 'bg-white group-hover:bg-blue-50'}`}>
                  <div 
                    className="flex items-center cursor-pointer select-none"
                    style={{ paddingLeft: `${(row.level - 1) * 1.5}rem` }}
                    onClick={() => toggleRow(row.id)}
                  >
                    {/* Fake expansion triangle for all rows to align, only visible if children exist in a real app */}
                    {row.level === 1 ? (
                        expandedRows.includes(row.id) ? <ChevronDown size={14} className="text-gray-400 mr-1" /> : <ChevronRight size={14} className="text-gray-400 mr-1" />
                    ) : <span className="w-4 mr-1"></span>}
                    <span className={row.isTotal ? 'text-swire-navy' : 'text-gray-700'}>
                      {row.label}
                    </span>
                  </div>
                </td>

                {/* Data Columns */}
                <td className={`p-2 text-right border-r tabular-nums ${row.isTotal ? 'bg-blue-50/50 text-swire-navy font-bold' : 'text-gray-800'}`}>
                  {formatNumber(row.values.group)}
                </td>
                <td className="p-2 text-right border-r tabular-nums text-gray-600">
                  {formatNumber(row.values.china)}
                </td>
                <td className="p-2 text-right border-r tabular-nums text-gray-600">
                  {formatNumber(row.values.usa)}
                </td>
                <td className="p-2 text-right border-r tabular-nums text-gray-600">
                  {formatNumber(row.values.hk)}
                </td>
                <td className="p-2 text-right border-r tabular-nums text-gray-600">
                  {formatNumber(row.values.taiwan)}
                </td>
              </tr>
            ))}
            
            {/* Filler rows to make it look like a full sheet */}
            {[...Array(10)].map((_, i) => (
              <tr key={`filler-${i}`} className="hover:bg-blue-50">
                 <td className="sticky left-0 z-10 p-2 border-r bg-white group-hover:bg-blue-50 text-gray-300 italic pl-8">
                   Other Adjustment {i+1}
                 </td>
                 <td className="p-2 text-right border-r text-gray-300">-</td>
                 <td className="p-2 text-right border-r text-gray-300">-</td>
                 <td className="p-2 text-right border-r text-gray-300">-</td>
                 <td className="p-2 text-right border-r text-gray-300">-</td>
                 <td className="p-2 text-right border-r text-gray-300">-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsolidatedView;