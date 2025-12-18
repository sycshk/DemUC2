import React, { useState } from 'react';
import { LayoutDashboard, Upload, FileJson, Table2, FileBarChart, Settings, Bell, Search, UserCircle, ChevronDown, Menu } from 'lucide-react';
import Dashboard from './components/Dashboard';
import DataIngestion from './components/DataIngestion';
import ConsolidatedView from './components/ConsolidatedView';
import { ViewState } from './types';

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
      case 'consolidation': return <ConsolidatedView />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <Settings size={48} className="mb-4 text-gray-300" />
          <p className="text-lg">Module Under Development</p>
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
               currentView === 'consolidation' ? 'Consolidated P&L' : 'Module'}
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