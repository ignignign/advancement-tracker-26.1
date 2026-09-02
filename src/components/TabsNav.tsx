import React from 'react';
import { TabId } from '../types';
import { TABS } from '../data/advancements';
import { Layers, Sparkles } from 'lucide-react';
import { MinecraftIcon } from './MinecraftIcon';

interface TabsNavProps {
  activeTab: TabId | 'all';
  onSelectTab: (tab: TabId | 'all') => void;
  tabStats: Record<TabId, { completed: number; total: number }>;
  totalCompleted: number;
  totalAll: number;
}

export const TabsNav: React.FC<TabsNavProps> = ({
  activeTab,
  onSelectTab,
  tabStats,
  totalCompleted,
  totalAll,
}) => {
  return (
    <nav className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
      {/* All Tab */}
      <button
        id="tab-btn-all"
        onClick={() => onSelectTab('all')}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all flex-shrink-0 select-none ${
          activeTab === 'all'
            ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-950/40 scale-[1.02]'
            : 'bg-[#151822] border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
        }`}
      >
        <Layers className="w-4 h-4" />
        <span>Todos</span>
        <span className={`text-xs px-2 py-0.5 rounded-md font-mono ${
          activeTab === 'all' ? 'bg-emerald-900/80 text-emerald-200' : 'bg-stone-900 text-stone-500'
        }`}>
          {totalCompleted}/{totalAll}
        </span>
      </button>

      {/* 5 Official Minecraft Tabs */}
      {TABS.map((tab) => {
        const stats = tabStats[tab.id] || { completed: 0, total: 0 };
        const isActive = activeTab === tab.id;
        const isCompleted = stats.total > 0 && stats.completed === stats.total;

        let activeClasses = 'bg-[#151822] border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700';

        if (isActive) {
          if (tab.id === 'minecraft') {
            activeClasses = 'bg-stone-800 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-950/30 scale-[1.02]';
          } else if (tab.id === 'nether') {
            activeClasses = 'bg-red-950/80 border-red-500 text-red-200 shadow-lg shadow-red-950/30 scale-[1.02]';
          } else if (tab.id === 'end') {
            activeClasses = 'bg-purple-950/80 border-purple-400 text-purple-200 shadow-lg shadow-purple-950/30 scale-[1.02]';
          } else if (tab.id === 'adventure') {
            activeClasses = 'bg-amber-950/80 border-amber-400 text-amber-200 shadow-lg shadow-amber-950/30 scale-[1.02]';
          } else if (tab.id === 'husbandry') {
            activeClasses = 'bg-lime-950/80 border-lime-400 text-lime-200 shadow-lg shadow-lime-950/30 scale-[1.02]';
          }
        }

        return (
          <button
            key={tab.id}
            id={`tab-btn-${tab.id}`}
            onClick={() => onSelectTab(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border-2 text-sm font-bold transition-all flex-shrink-0 select-none ${activeClasses}`}
          >
            <MinecraftIcon name={tab.icon} className="w-4 h-4" />
            <span>{tab.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-md font-mono ${
              isActive
                ? 'bg-black/40 text-stone-200 font-bold'
                : isCompleted
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold'
                : 'bg-stone-900 text-stone-500'
            }`}>
              {stats.completed}/{stats.total}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
