import React, { useState, useMemo } from 'react';
import { X, Search, CheckSquare, Square, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { Advancement } from '../types';
import { MinecraftIcon } from './MinecraftIcon';

interface SubCriteriaModalProps {
  advancement: Advancement | null;
  isOpen: boolean;
  onClose: () => void;
  subProgress: Record<string, boolean>;
  onToggleSubCriterion: (advancementId: string, criterionId: string, checked: boolean) => void;
  onBatchToggle: (advancementId: string, checkAll: boolean) => void;
}

export const SubCriteriaModal: React.FC<SubCriteriaModalProps> = ({
  advancement,
  isOpen,
  onClose,
  subProgress,
  onToggleSubCriterion,
  onBatchToggle,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState<'all' | 'pending' | 'completed'>('all');

  const criteria = advancement?.subCriteria || [];

  const completedCount = useMemo(() => {
    if (!advancement || !advancement.subCriteria) return 0;
    return advancement.subCriteria.filter(c => subProgress[c.id]).length;
  }, [advancement, subProgress]);

  const totalCount = criteria.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isFullyCompleted = totalCount > 0 && completedCount === totalCount;

  const filteredCriteria = useMemo(() => {
    return criteria.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const isChecked = !!subProgress[item.id];
      if (!matchesSearch) return false;
      if (filterState === 'pending') return !isChecked;
      if (filterState === 'completed') return isChecked;
      return true;
    });
  }, [criteria, searchTerm, filterState, subProgress]);

  if (!isOpen || !advancement || !advancement.subCriteria) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="subcriteria-modal-container"
        className="bg-[#181b22] border-2 border-stone-700 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden text-stone-200"
      >
        {/* Header with Minecraft styling */}
        <div className="bg-[#12141a] px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg border ${
              advancement.type === 'challenge' 
                ? 'bg-purple-950/60 border-purple-600/60 text-purple-300' 
                : advancement.type === 'goal'
                ? 'bg-amber-950/60 border-amber-500/60 text-amber-300'
                : 'bg-stone-800 border-stone-600 text-stone-300'
            }`}>
              <MinecraftIcon name={advancement.icon} className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-stone-100 tracking-wide font-sans">
                  {advancement.title}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded font-mono font-semibold uppercase ${
                  advancement.type === 'challenge'
                    ? 'bg-purple-900/60 text-purple-300 border border-purple-700/60'
                    : advancement.type === 'goal'
                    ? 'bg-amber-900/60 text-amber-300 border border-amber-700/60'
                    : 'bg-stone-800 text-stone-400 border border-stone-700'
                }`}>
                  {advancement.type}
                </span>
              </div>
              <p className="text-sm text-stone-400 mt-0.5">{advancement.requirement}</p>
            </div>
          </div>
          <button
            id="close-subcriteria-modal"
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress summary bar */}
        <div className="bg-[#1e222b] px-6 py-3 border-b border-stone-800">
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="font-semibold text-stone-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Progreso de requisitos
            </span>
            <span className="font-mono text-emerald-400 font-bold">
              {completedCount} / {totalCount} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-stone-900 h-2.5 rounded-full overflow-hidden border border-stone-700">
            <div
              className={`h-full transition-all duration-300 ${
                isFullyCompleted
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-emerald-600 to-emerald-400'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="px-6 py-3 bg-[#15171e] border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              id="subcriteria-search-input"
              type="text"
              placeholder="Buscar en la lista..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg bg-stone-900 border border-stone-700 p-0.5 text-xs font-medium">
              <button
                onClick={() => setFilterState('all')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filterState === 'all' ? 'bg-stone-700 text-white font-semibold' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Todos ({criteria.length})
              </button>
              <button
                onClick={() => setFilterState('pending')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filterState === 'pending' ? 'bg-amber-900/60 text-amber-300 font-semibold' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Faltantes ({totalCount - completedCount})
              </button>
              <button
                onClick={() => setFilterState('completed')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filterState === 'completed' ? 'bg-emerald-900/60 text-emerald-300 font-semibold' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Completados ({completedCount})
              </button>
            </div>

            <div className="flex gap-1.5">
              <button
                id="check-all-subcriteria-btn"
                onClick={() => onBatchToggle(advancement.id, true)}
                title="Marcar todos"
                className="px-2.5 py-1 text-xs bg-emerald-950 border border-emerald-700 hover:bg-emerald-900 text-emerald-300 rounded font-medium transition-colors"
              >
                Marcar todos
              </button>
              <button
                id="uncheck-all-subcriteria-btn"
                onClick={() => onBatchToggle(advancement.id, false)}
                title="Desmarcar todos"
                className="px-2.5 py-1 text-xs bg-stone-800 border border-stone-700 hover:bg-stone-700 text-stone-300 rounded font-medium transition-colors"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable list of criteria */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-1.5 custom-scrollbar max-h-[50vh]">
          {filteredCriteria.length === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No se encontraron elementos con los filtros actuales.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredCriteria.map((item) => {
                const isChecked = !!subProgress[item.id];
                return (
                  <button
                    key={item.id}
                    id={`subcriterion-toggle-${item.id}`}
                    type="button"
                    onClick={() => onToggleSubCriterion(advancement.id, item.id, !isChecked)}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border text-left transition-all group ${
                      isChecked
                        ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-200'
                        : 'bg-stone-900/60 border-stone-800 hover:border-stone-700 text-stone-300 hover:bg-stone-800/60'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950" />
                      ) : (
                        <Square className="w-5 h-5 text-stone-500 group-hover:text-stone-400" />
                      )}
                    </div>
                    <span className={`text-sm font-medium leading-tight ${isChecked ? 'line-through text-emerald-400/80' : ''}`}>
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#12141a] px-6 py-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>Tip: Al completar todos los requisitos, el logro principal se marcará automáticamente.</span>
          <button
            id="done-subcriteria-modal-btn"
            onClick={onClose}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
