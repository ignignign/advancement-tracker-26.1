import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { ADVANCEMENTS, TABS } from './data/advancements';
import { Advancement, TabId, StatusFilter, TypeFilter, ViewMode, TrackerState } from './types';
import { soundEngine } from './utils/audio';
import { Header } from './components/Header';
import { TabsNav } from './components/TabsNav';
import { FiltersBar } from './components/FiltersBar';
import { AdvancementCard } from './components/AdvancementCard';
import { AdvancementTree } from './components/AdvancementTree';
import { CompactTable } from './components/CompactTable';
import { SubCriteriaModal } from './components/SubCriteriaModal';
import { SpeedrunTimer } from './components/SpeedrunTimer';
import { GitHubModal } from './components/GitHubModal';
import { SingleFileExportModal } from './components/SingleFileExportModal';
import { Sparkles, Trophy, CheckCircle, Flame } from 'lucide-react';

const STORAGE_KEY = 'minecraft_26_2_advancements_state_v1';

export default function App() {
  // Persistence state
  const [trackerState, setTrackerState] = useState<TrackerState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      completed: {},
      subCriteriaProgress: {},
      timestamps: {}
    };
  });

  // UI state
  const [activeTab, setActiveTab] = useState<TabId | 'all'>('all');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTimer, setShowTimer] = useState(false);

  // Modals state
  const [selectedAdvancementForSub, setSelectedAdvancementForSub] = useState<Advancement | null>(null);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [isSingleFileModalOpen, setIsSingleFileModalOpen] = useState(false);

  // Sync sound engine
  useEffect(() => {
    soundEngine.enabled = soundEnabled;
  }, [soundEnabled]);

  // Save to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trackerState));
    } catch {
      // ignore
    }
  }, [trackerState]);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('global-search-input')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute tab statistics
  const tabStats = useMemo(() => {
    const stats: Record<TabId, { completed: number; total: number }> = {
      minecraft: { completed: 0, total: 0 },
      nether: { completed: 0, total: 0 },
      end: { completed: 0, total: 0 },
      adventure: { completed: 0, total: 0 },
      husbandry: { completed: 0, total: 0 },
    };

    ADVANCEMENTS.forEach(adv => {
      stats[adv.tab].total += 1;
      if (trackerState.completed[adv.id]) {
        stats[adv.tab].completed += 1;
      }
    });

    return stats;
  }, [trackerState.completed]);

  const totalCompleted = useMemo(() => {
    return Object.values(trackerState.completed).filter(Boolean).length;
  }, [trackerState.completed]);

  const totalAdvancements = ADVANCEMENTS.length;

  // Toggle single advancement
  const handleToggleAdvancement = useCallback((id: string, completed: boolean) => {
    const adv = ADVANCEMENTS.find(a => a.id === id);

    setTrackerState(prev => {
      const newCompleted = { ...prev.completed, [id]: completed };
      const newTimestamps = { ...prev.timestamps };

      if (completed) {
        newTimestamps[id] = Date.now();
      } else {
        delete newTimestamps[id];
      }

      // If completing an advancement that has sub-criteria, also check all sub-criteria
      let newSubProgress = { ...prev.subCriteriaProgress };
      if (adv?.subCriteria && adv.subCriteria.length > 0) {
        const subMap: Record<string, boolean> = {};
        adv.subCriteria.forEach(item => {
          subMap[item.id] = completed;
        });
        newSubProgress[id] = subMap;
      }

      return {
        ...prev,
        completed: newCompleted,
        subCriteriaProgress: newSubProgress,
        timestamps: newTimestamps
      };
    });

    // Sound & Confetti triggers
    if (completed) {
      if (adv?.type === 'challenge') {
        soundEngine.playAdvancementComplete(true, false);
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#a855f7', '#ec4899', '#38bdf8', '#fbbf24']
        });
      } else if (adv?.type === 'goal') {
        soundEngine.playAdvancementComplete(false, true);
      } else {
        soundEngine.playAdvancementComplete(false, false);
      }
    } else {
      soundEngine.playUncheck();
    }
  }, []);

  // Toggle sub-criterion
  const handleToggleSubCriterion = useCallback((advancementId: string, criterionId: string, checked: boolean) => {
    const adv = ADVANCEMENTS.find(a => a.id === advancementId);
    if (!adv || !adv.subCriteria) return;

    setTrackerState(prev => {
      const currentSubMap = prev.subCriteriaProgress[advancementId] || {};
      const newSubMap = { ...currentSubMap, [criterionId]: checked };

      // Check if all sub criteria are now done
      const completedCount = adv.subCriteria!.filter(c => newSubMap[c.id]).length;
      const isAllDone = completedCount === adv.subCriteria!.length;

      const newCompleted = { ...prev.completed, [advancementId]: isAllDone };
      const newTimestamps = { ...prev.timestamps };
      if (isAllDone && !prev.completed[advancementId]) {
        newTimestamps[advancementId] = Date.now();
      }

      return {
        ...prev,
        completed: newCompleted,
        subCriteriaProgress: {
          ...prev.subCriteriaProgress,
          [advancementId]: newSubMap
        },
        timestamps: newTimestamps
      };
    });

    if (checked) {
      soundEngine.playClick();
    } else {
      soundEngine.playUncheck();
    }
  }, []);

  // Batch toggle sub-criteria
  const handleBatchSubToggle = useCallback((advancementId: string, checkAll: boolean) => {
    const adv = ADVANCEMENTS.find(a => a.id === advancementId);
    if (!adv || !adv.subCriteria) return;

    setTrackerState(prev => {
      const newSubMap: Record<string, boolean> = {};
      adv.subCriteria!.forEach(c => {
        newSubMap[c.id] = checkAll;
      });

      const newCompleted = { ...prev.completed, [advancementId]: checkAll };
      const newTimestamps = { ...prev.timestamps };
      if (checkAll) newTimestamps[advancementId] = Date.now();

      return {
        ...prev,
        completed: newCompleted,
        subCriteriaProgress: {
          ...prev.subCriteriaProgress,
          [advancementId]: newSubMap
        },
        timestamps: newTimestamps
      };
    });

    if (checkAll) {
      soundEngine.playAdvancementComplete(adv.type === 'challenge', adv.type === 'goal');
    } else {
      soundEngine.playUncheck();
    }
  }, []);

  // Batch toggle entire tab
  const handleBatchTabToggle = useCallback((checkAll: boolean) => {
    if (activeTab === 'all') return;
    const tabAdvancements = ADVANCEMENTS.filter(a => a.tab === activeTab);

    setTrackerState(prev => {
      const newCompleted = { ...prev.completed };
      const newTimestamps = { ...prev.timestamps };
      const newSubProgress = { ...prev.subCriteriaProgress };

      tabAdvancements.forEach(adv => {
        newCompleted[adv.id] = checkAll;
        if (checkAll) {
          newTimestamps[adv.id] = Date.now();
        } else {
          delete newTimestamps[adv.id];
        }

        if (adv.subCriteria && adv.subCriteria.length > 0) {
          const subMap: Record<string, boolean> = {};
          adv.subCriteria.forEach(c => {
            subMap[c.id] = checkAll;
          });
          newSubProgress[adv.id] = subMap;
        }
      });

      return {
        ...prev,
        completed: newCompleted,
        subCriteriaProgress: newSubProgress,
        timestamps: newTimestamps
      };
    });

    if (checkAll) {
      soundEngine.playAdvancementComplete(true, false);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7 }
      });
    } else {
      soundEngine.playUncheck();
    }
  }, [activeTab]);

  // Reset all
  const handleResetProgress = useCallback(() => {
    if (window.confirm('¿Estás seguro de que deseas reiniciar todo el progreso de logros?')) {
      setTrackerState({
        completed: {},
        subCriteriaProgress: {},
        timestamps: {}
      });
      soundEngine.playUncheck();
    }
  }, []);

  // Export JSON Backup
  const handleExportJson = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(trackerState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `minecraft-aatool-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [trackerState]);

  // Import JSON Backup
  const handleImportJson = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (json && typeof json === 'object' && json.completed) {
          setTrackerState(json);
          soundEngine.playAdvancementComplete(false, true);
          alert('¡Progreso importado con éxito!');
        } else {
          alert('El archivo JSON no tiene un formato válido de Minecraft AA Tool.');
        }
      } catch {
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
  }, []);

  // Open sub-criteria modal
  const handleOpenSubCriteria = useCallback((advancement: Advancement) => {
    setSelectedAdvancementForSub(advancement);
    setIsSubModalOpen(true);
  }, []);

  // Filtered Advancements list
  const filteredAdvancements = useMemo(() => {
    const term = search.toLowerCase().trim();

    return ADVANCEMENTS.filter(adv => {
      // Tab filter
      if (activeTab !== 'all' && adv.tab !== activeTab) return false;

      // Status filter
      const isDone = !!trackerState.completed[adv.id];
      if (statusFilter === 'completed' && !isDone) return false;
      if (statusFilter === 'pending' && isDone) return false;

      // Type filter
      if (typeFilter === 'hidden') {
        if (!adv.hidden) return false;
      } else if (typeFilter !== 'all') {
        if (adv.type !== typeFilter) return false;
      }

      // Search term
      if (term) {
        const matchTitle = adv.title.toLowerCase().includes(term);
        const matchDesc = adv.description.toLowerCase().includes(term);
        const matchReq = adv.requirement.toLowerCase().includes(term);
        const matchSub = adv.subCriteria?.some(s => s.name.toLowerCase().includes(term));
        if (!matchTitle && !matchDesc && !matchReq && !matchSub) return false;
      }

      return true;
    });
  }, [activeTab, statusFilter, typeFilter, search, trackerState.completed]);

  return (
    <div className="min-h-screen bg-[#0c0e14] text-stone-200 p-3 sm:p-6 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="max-w-7xl mx-auto w-full space-y-4 sm:space-y-6">
        {/* Top Header */}
        <Header
          completedCount={totalCompleted}
          totalCount={totalAdvancements}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onReset={handleResetProgress}
          onExportJson={handleExportJson}
          onImportJson={handleImportJson}
          onOpenSingleHtml={() => setIsSingleFileModalOpen(true)}
          onOpenGitHub={() => setIsGitHubModalOpen(true)}
          showTimer={showTimer}
          onToggleTimer={() => setShowTimer(!showTimer)}
        />

        {/* Optional Speedrun Timer Widget */}
        {showTimer && (
          <SpeedrunTimer
            completedCount={totalCompleted}
            totalCount={totalAdvancements}
            activeTab={activeTab}
            tabStats={tabStats}
          />
        )}

        {/* 5 Official Minecraft Tabs Navigation */}
        <TabsNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          tabStats={tabStats}
          totalCompleted={totalCompleted}
          totalAll={totalAdvancements}
        />

        {/* Search, Filter and View Mode Toolbar */}
        <FiltersBar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onBatchTabToggle={handleBatchTabToggle}
          activeTab={activeTab}
          visibleCount={filteredAdvancements.length}
        />

        {/* Main Content Area based on ViewMode */}
        <main className="min-h-[400px]">
          {filteredAdvancements.length === 0 ? (
            <div className="bg-[#141720] border-2 border-stone-800 rounded-2xl p-12 text-center text-stone-400 space-y-3 shadow-xl">
              <Flame className="w-12 h-12 mx-auto text-stone-600 opacity-60" />
              <h3 className="text-lg font-bold text-stone-200">No se encontraron logros</h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                No hay logros que coincidan con la búsqueda "{search}" o los filtros actuales. Prueba a limpiar los filtros.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setStatusFilter('all');
                  setTypeFilter('all');
                  setActiveTab('all');
                }}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold transition-colors"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : viewMode === 'tree' ? (
            <AdvancementTree
              advancements={filteredAdvancements}
              completedMap={trackerState.completed}
              subCriteriaProgress={trackerState.subCriteriaProgress}
              onToggle={handleToggleAdvancement}
              onOpenSubCriteria={handleOpenSubCriteria}
              currentTab={activeTab}
            />
          ) : viewMode === 'compact' ? (
            <CompactTable
              advancements={filteredAdvancements}
              completedMap={trackerState.completed}
              subCriteriaProgress={trackerState.subCriteriaProgress}
              onToggle={handleToggleAdvancement}
              onOpenSubCriteria={handleOpenSubCriteria}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAdvancements.map((advancement) => {
                const isCompleted = !!trackerState.completed[advancement.id];
                const subList = advancement.subCriteria || [];
                const subProgress = trackerState.subCriteriaProgress[advancement.id] || {};
                const subProgressCount = subList.filter(c => subProgress[c.id]).length;

                return (
                  <AdvancementCard
                    key={advancement.id}
                    advancement={advancement}
                    isCompleted={isCompleted}
                    subProgressCount={subProgressCount}
                    totalSubCriteria={subList.length}
                    onToggle={handleToggleAdvancement}
                    onOpenSubCriteria={handleOpenSubCriteria}
                  />
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full mt-10 pt-6 border-t border-stone-800/80 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span>Minecraft 26.2 Official Advancements Tracker</span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">{totalCompleted} / 126 Completados</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSingleFileModalOpen(true)}
            className="hover:text-emerald-400 transition-colors"
          >
            Opción 1: Archivo Único (.html)
          </button>
          <span>•</span>
          <button
            onClick={() => setIsGitHubModalOpen(true)}
            className="hover:text-emerald-400 transition-colors"
          >
            Opción 2: GitHub Actions (.yml)
          </button>
        </div>
      </footer>

      {/* Sub Criteria Modal */}
      <SubCriteriaModal
        advancement={selectedAdvancementForSub}
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        subProgress={selectedAdvancementForSub ? (trackerState.subCriteriaProgress[selectedAdvancementForSub.id] || {}) : {}}
        onToggleSubCriterion={handleToggleSubCriterion}
        onBatchToggle={handleBatchSubToggle}
      />

      {/* GitHub Workflow & Deploy Guide Modal */}
      <GitHubModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />

      {/* Single File HTML Standalone Modal */}
      <SingleFileExportModal
        isOpen={isSingleFileModalOpen}
        onClose={() => setIsSingleFileModalOpen(false)}
      />
    </div>
  );
}
