import React from 'react';
import {
  Search,
  Filter,
  CheckSquare,
  Square,
  LayoutGrid,
  GitFork,
  Table as TableIcon,
  CheckCircle2,
  Sparkles,
  X
} from 'lucide-react';
import { StatusFilter, TypeFilter, ViewMode, TabId } from '../types';

interface FiltersBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
  typeFilter: TypeFilter;
  onTypeFilterChange: (type: TypeFilter) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onBatchTabToggle: (checkAll: boolean) => void;
  activeTab: TabId | 'all';
  visibleCount: number;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  viewMode,
  onViewModeChange,
  onBatchTabToggle,
  activeTab,
  visibleCount,
}) => {
  return (
    <div className="bg-[#141720] border-2 border-stone-800 rounded-2xl p-3.5 sm:p-4 shadow-xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[240px]">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          id="global-search-input"
          type="text"
          placeholder="Buscar logro por nombre, descripción o requisito..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-9 py-2 bg-stone-900/90 border border-stone-700 rounded-xl text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Selectors */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status Filter Buttons */}
        <div className="flex rounded-xl bg-stone-900 border border-stone-700 p-1 text-xs font-semibold">
          <button
            id="filter-status-all"
            onClick={() => onStatusFilterChange('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === 'all'
                ? 'bg-stone-700 text-white font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Todos
          </button>
          <button
            id="filter-status-pending"
            onClick={() => onStatusFilterChange('pending')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === 'pending'
                ? 'bg-amber-900/80 text-amber-200 border border-amber-700/60 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Pendientes
          </button>
          <button
            id="filter-status-completed"
            onClick={() => onStatusFilterChange('completed')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === 'completed'
                ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Completados
          </button>
        </div>

        {/* Type Filter Select */}
        <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-700 rounded-xl px-2.5 py-1 text-xs text-stone-300 font-semibold">
          <Filter className="w-3.5 h-3.5 text-stone-400" />
          <select
            id="filter-type-select"
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value as TypeFilter)}
            className="bg-transparent border-none text-stone-200 focus:outline-none cursor-pointer py-1"
          >
            <option value="all" className="bg-stone-900 text-stone-200">Tipo: Todos</option>
            <option value="task" className="bg-stone-900 text-stone-200">Progreso (Task)</option>
            <option value="goal" className="bg-stone-900 text-amber-300">Meta (Goal)</option>
            <option value="challenge" className="bg-stone-900 text-purple-300">Desafío (Challenge)</option>
            <option value="hidden" className="bg-stone-900 text-stone-400">Ocultos / Secretos</option>
          </select>
        </div>

        {/* View Mode Switcher */}
        <div className="flex rounded-xl bg-stone-900 border border-stone-700 p-1 text-xs">
          <button
            id="viewmode-grid-btn"
            onClick={() => onViewModeChange('grid')}
            title="Vista de Cuadrícula"
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-emerald-600 text-white'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            id="viewmode-tree-btn"
            onClick={() => onViewModeChange('tree')}
            title="Vista de Árbol / Ramas"
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'tree'
                ? 'bg-emerald-600 text-white'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <GitFork className="w-4 h-4" />
          </button>
          <button
            id="viewmode-compact-btn"
            onClick={() => onViewModeChange('compact')}
            title="Vista de Tabla Rápida"
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'compact'
                ? 'bg-emerald-600 text-white'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <TableIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Batch Actions */}
        {activeTab !== 'all' && (
          <div className="flex items-center gap-1.5">
            <button
              id="batch-check-tab-btn"
              onClick={() => onBatchTabToggle(true)}
              title="Marcar todos los logros de esta pestaña"
              className="px-2.5 py-1.5 bg-emerald-950/70 border border-emerald-700/80 hover:bg-emerald-900 text-emerald-300 rounded-xl text-xs font-semibold transition-colors"
            >
              Completar Tab
            </button>
            <button
              id="batch-uncheck-tab-btn"
              onClick={() => onBatchTabToggle(false)}
              title="Desmarcar todos los logros de esta pestaña"
              className="px-2.5 py-1.5 bg-stone-900 border border-stone-700 hover:bg-stone-800 text-stone-400 hover:text-stone-200 rounded-xl text-xs font-semibold transition-colors"
            >
              Limpiar Tab
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
