import React, { useState } from 'react';
import { LayoutDashboard, Upload, FileJson, Table2, FileBarChart, Settings, Bell, Search, UserCircle, ChevronDown, Menu, TrendingUp } from 'lucide-react';
import Dashboard from './components/Dashboard';
import DataIngestion from './components/DataIngestion';
import ConsolidatedView from './components/ConsolidatedView';
import VarianceAnalysis from './components/VarianceAnalysis';
import { ViewState } from './types';
import { FX_RATES } from './constants';

// Sidebar Item Component
const NavItem: React.FC<{ 
  icon: React.ElementType; 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
      isActive 
        ? 'bg-[#002244] border-swire-red text-white' 
        : 'border-transparent text-gray-300 hover:bg-[#002244] hover:text-white'
    }`}
  >
    <Icon size={20} className={isActive ? 'text-white' : 'text-gray-400'} />
    <span>{label}</span>
  </button>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [fiscalYear, setFiscalYear] = useState('2024');
  const [scenario, setScenario] = useState('Budget');
  const [currency, setCurrency] = useState('HKD');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'ingestion': return <DataIngestion />;
      case 'adjustments': return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <FileJson size={48} className="mb-4 text-gray-300" />
          <p className="text-lg">Adjustments Module Under Development</p>
        </div>
      );
      case 'consolidation': return <ConsolidatedView currency={currency} />;
      case 'variance': return <VarianceAnalysis />;
      case 'settings': return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6 pb-6 border-b border-gray-100">
             <div className="flex items-center space-x-4 mb-2">
                <Settings size={28} className="text-swire-navy" />
                <h2 className="text-2xl font-semibold text-swire-navy">System Settings</h2>
             </div>
             <p className="text-gray-500">Manage global configurations, user permissions, and FX tables.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Foreign Exchange Rates</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency Pair</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rate (to HKD)</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                     <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">RMB / HKD</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">{FX_RATES.china.toFixed(4)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-400">May 20, 2024</td>
                     </tr>
                     <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">USD / HKD</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">{FX_RATES.usa.toFixed(4)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-400">May 20, 2024</td>
                     </tr>
                     <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TWD / HKD</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">{FX_RATES.taiwan.toFixed(4)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-400">May 20, 2024</td>
                     </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-gray-400 italic">* Rates are pulled from Corporate Treasury automatically every 24h.</p>
            </div>
          </div>
        </div>
      );
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <FileBarChart size={48} className="mb-4 text-gray-300" />
          <p className="text-lg">Reports Module Under Development</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-swire-bg font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-swire-navy flex flex-col shadow-xl z-20">
        <div className="h-16 flex items-center px-6 bg-[#002855]">
          <span className="text-white text-xl font-bold tracking-tight">Swire<span className="text-swire-red font-light">CC</span></span>
        </div>
        
        <div className="flex-1 py-6 space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" isActive={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
          <NavItem icon={Upload} label="Data Ingestion" isActive={currentView === 'ingestion'} onClick={() => setCurrentView('ingestion')} />
          <NavItem icon={FileJson} label="Adjustments" isActive={currentView === 'adjustments'} onClick={() => setCurrentView('adjustments')} />
          <NavItem icon={Table2} label="Consolidated View" isActive={currentView === 'consolidation'} onClick={() => setCurrentView('consolidation')} />
          <NavItem icon={TrendingUp} label="Variance & AI" isActive={currentView === 'variance'} onClick={() => setCurrentView('variance')} />
          <NavItem icon={FileBarChart} label="Reports" isActive={currentView === 'reports'} onClick={() => setCurrentView('reports')} />
          <NavItem icon={Settings} label="Settings" isActive={currentView === 'settings'} onClick={() => setCurrentView('settings')} />
        </div>

        <div className="p-4 border-t border-blue-900">
           <div className="flex items-center space-x-3 text-white">
             <div className="bg-swire-blue p-2 rounded-full">
               <UserCircle size={20} />
             </div>
             <div>
               <p className="text-sm font-medium">Finance Controller</p>
               <p className="text-xs text-blue-200">Corp HQ</p>
             </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
          
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-semibold text-swire-navy">
              {currentView === 'dashboard' ? 'Financial Performance' : 
               currentView === 'ingestion' ? 'Data Ingestion Portal' :
               currentView === 'consolidation' ? 'Consolidated P&L' : 
               currentView === 'variance' ? 'Variance Analysis & AI Insights' :
               currentView === 'settings' ? 'System Configuration' : 'Module'}
            </h1>
            
            {/* Global Context Controls */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1 space-x-1">
              <select 
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
                className="bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 py-1 pl-3 pr-8 cursor-pointer hover:bg-white rounded-md transition-colors"
              >
                <option>FY 2024</option>
                <option>FY 2025</option>
                <option>FY 2023</option>
              </select>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex space-x-1">
                 {['Actual', 'Budget', 'Forecast'].map(s => (
                   <button 
                    key={s}
                    onClick={() => setScenario(s)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                      scenario === s 
                      ? 'bg-white text-swire-navy shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                   >
                     {s}
                   </button>
                 ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Currency Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setCurrency('HKD')}
                className={`px-3 py-1 text-xs font-bold rounded ${currency === 'HKD' ? 'bg-swire-navy text-white shadow-sm' : 'text-gray-500'}`}
              >
                HKD
              </button>
              <button 
                onClick={() => setCurrency('Local')}
                className={`px-3 py-1 text-xs font-bold rounded ${currency === 'Local' ? 'bg-swire-navy text-white shadow-sm' : 'text-gray-500'}`}
              >
                Local
              </button>
            </div>

            <div className="relative">
               <Bell size={20} className="text-gray-500 hover:text-swire-navy cursor-pointer" />
               <span className="absolute -top-1 -right-1 h-2 w-2 bg-swire-red rounded-full"></span>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;