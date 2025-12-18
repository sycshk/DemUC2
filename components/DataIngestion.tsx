import React, { useState } from 'react';
import { UploadCloud, FileSpreadsheet, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { MarketFile } from '../types';

const MOCK_FILES: MarketFile[] = [
  { id: '1', market: 'USA', filename: 'USA_Budget_v4.xlsx', status: 'valid', uploadDate: '2024-05-20 10:30 AM' },
  { id: '2', market: 'Hong Kong', filename: 'HK_Budget_FINAL.xlsx', status: 'error', uploadDate: '2024-05-20 11:15 AM', errors: ['Row 45: Invalid Account Code', 'Sheet 2: Formula Reference Error'] },
  { id: '3', market: 'Taiwan', filename: 'TW_Budget_Draft.xlsx', status: 'processing', uploadDate: '2024-05-20 11:20 AM' },
];

const DataIngestion: React.FC = () => {
  const [selectedMarket, setSelectedMarket] = useState('USA');

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6">
      {/* Left Panel: Upload Zone */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        
        {/* Upload Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-swire-navy mb-4">Upload Financial Package</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Market</label>
              <select 
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-swire-navy focus:ring-swire-navy sm:text-sm p-2 border"
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
              >
                <option>USA</option>
                <option>Hong Kong</option>
                <option>Taiwan</option>
                <option>Mainland China</option>
              </select>
            </div>

            <div className="border-2 border-dashed border-swire-navy/30 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
              <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="h-8 w-8 text-swire-navy" />
              </div>
              <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">Excel files (.xlsx) only</p>
              <input type="file" className="hidden" accept=".xlsx" />
            </div>
          </div>
        </div>

        {/* Status List */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex-1 overflow-auto">
          <h3 className="text-lg font-semibold text-swire-navy mb-4">Recent Uploads</h3>
          <div className="space-y-3">
            {MOCK_FILES.map((file) => (
              <div key={file.id} className="border border-gray-100 rounded-md p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded">
                      <FileSpreadsheet className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.market}</p>
                      <p className="text-xs text-gray-500">{file.filename}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {file.status === 'valid' && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1"/> Valid</span>}
                    {file.status === 'error' && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1"/> Error</span>}
                    {file.status === 'processing' && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800"><Loader2 className="w-3 h-3 mr-1 animate-spin"/> Processing</span>}
                  </div>
                </div>
                {file.status === 'error' && file.errors && (
                  <div className="mt-2 bg-red-50 p-2 rounded text-xs text-red-700">
                    <ul className="list-disc list-inside">
                      {file.errors.map((err, idx) => <li key={idx}>{err}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel: Preview */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden relative">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div>
             <h3 className="text-lg font-semibold text-swire-navy">Data Preview: {selectedMarket}</h3>
             <p className="text-xs text-gray-500">Reviewing: USA_Budget_v4.xlsx</p>
          </div>
          <div className="flex space-x-2">
            <button className="text-sm text-gray-600 hover:text-swire-navy px-3 py-1.5 border border-gray-300 rounded bg-white">Download Source</button>
          </div>
        </div>
        
        {/* Mock Spreadsheet Grid */}
        <div className="flex-1 overflow-auto p-0">
           <table className="min-w-full text-xs text-left">
             <thead className="bg-gray-100 font-medium text-gray-500 sticky top-0 z-10 shadow-sm">
               <tr>
                 <th className="p-2 border-b border-r w-12 text-center bg-gray-200">#</th>
                 <th className="p-2 border-b border-r w-64">Account Line Item</th>
                 <th className="p-2 border-b border-r w-24 text-right">Jan</th>
                 <th className="p-2 border-b border-r w-24 text-right">Feb</th>
                 <th className="p-2 border-b border-r w-24 text-right">Mar</th>
                 <th className="p-2 border-b border-r w-24 text-right">Q1 Total</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {[...Array(20)].map((_, i) => (
                 <tr key={i} className="hover:bg-blue-50">
                   <td className="p-2 border-r text-center text-gray-400 bg-gray-50">{i + 1}</td>
                   <td className="p-2 border-r font-medium text-gray-700">GL-Account-{1000 + i}</td>
                   <td className="p-2 border-r text-right font-mono text-gray-600">{(Math.random() * 10000).toFixed(2)}</td>
                   <td className="p-2 border-r text-right font-mono text-gray-600">{(Math.random() * 10000).toFixed(2)}</td>
                   <td className="p-2 border-r text-right font-mono text-gray-600">{(Math.random() * 10000).toFixed(2)}</td>
                   <td className="p-2 border-r text-right font-mono font-bold text-swire-navy">{(Math.random() * 30000).toFixed(2)}</td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>

        {/* Floating Action Button */}
        <div className="absolute bottom-6 right-6">
          <button className="bg-swire-red hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-medium transition-transform transform hover:scale-105 active:scale-95">
             Commit to Consolidation
             <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataIngestion;