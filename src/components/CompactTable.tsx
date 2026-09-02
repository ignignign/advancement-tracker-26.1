import React from 'react';
import { CheckCircle2, Circle, ListChecks, EyeOff, Search } from 'lucide-react';
import { Advancement } from '../types';
import { MinecraftIcon } from './MinecraftIcon';

interface CompactTableProps {
  advancements: Advancement[];
  completedMap: Record<string, boolean>;
  subCriteriaProgress: Record<string, Record<string, boolean>>;
  onToggle: (id: string, completed: boolean) => void;
  onOpenSubCriteria: (advancement: Advancement) => void;
}

export const CompactTable: React.FC<CompactTableProps> = ({
  advancements,
  completedMap,
  subCriteriaProgress,
  onToggle,
  onOpenSubCriteria,
}) => {
  return (
    <div className="bg-[#141720] rounded-xl border border-stone-800 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-stone-300">
          <thead className="bg-[#0e1017] text-[11px] uppercase tracking-wider text-stone-400 font-bold border-b border-stone-800">
            <tr>
              <th className="py-3 px-4 w-12 text-center">Estado</th>
              <th className="py-3 px-4">Logro</th>
              <th className="py-3 px-4">Pestaña</th>
              <th className="py-3 px-4">Tipo</th>
              <th className="py-3 px-4">Requisito Oficial</th>
              <th className="py-3 px-4 text-center">Sub-requisitos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800/60">
            {advancements.map((adv) => {
              const isCompleted = !!completedMap[adv.id];
              const subList = adv.subCriteria || [];
              const subProgress = subCriteriaProgress[adv.id] || {};
              const completedSubCount = subList.filter(s => subProgress[s.id]).length;
              const hasSub = subList.length > 0;

              return (
                <tr
                  key={adv.id}
                  id={`table-row-${adv.id}`}
                  className={`hover:bg-stone-800/40 transition-colors ${
                    isCompleted ? 'bg-emerald-950/20' : ''
                  }`}
                >
                  {/* Status Checkbox */}
                  <td className="py-2.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => onToggle(adv.id, !isCompleted)}
                      className="inline-flex items-center justify-center p-1 rounded hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
                      title={isCompleted ? "Marcar como pendiente" : "Completar"}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950" />
                      ) : (
                        <Circle className="w-5 h-5 text-stone-600" />
                      )}
                    </button>
                  </td>

                  {/* Title and Icon */}
                  <td className="py-2.5 px-4 font-medium">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded border ${
                        isCompleted
                          ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                          : 'bg-stone-900 border-stone-700 text-stone-400'
                      }`}>
                        <MinecraftIcon name={adv.icon} className="w-4 h-4" />
                      </div>
                      <div>
                        <span className={`font-semibold ${isCompleted ? 'text-emerald-300' : 'text-stone-200'}`}>
                          {adv.title}
                        </span>
                        {adv.hidden && (
                          <span title="Oculto" className="ml-1.5 text-stone-500 inline-block align-middle">
                            <EyeOff className="w-3.5 h-3.5" />
                          </span>
                        )}
                        <p className="text-xs text-stone-500 line-clamp-1">{adv.description}</p>
                      </div>
                    </div>
                  </td>

                  {/* Tab */}
                  <td className="py-2.5 px-4 capitalize text-stone-400 text-xs">
                    {adv.tab}
                  </td>

                  {/* Type */}
                  <td className="py-2.5 px-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      adv.type === 'challenge'
                        ? 'bg-purple-950/80 text-purple-300 border-purple-800'
                        : adv.type === 'goal'
                        ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                        : 'bg-stone-800/80 text-stone-400 border-stone-700'
                    }`}>
                      {adv.type}
                    </span>
                  </td>

                  {/* Requirement */}
                  <td className="py-2.5 px-4 text-xs text-stone-300 font-mono">
                    {adv.requirement}
                  </td>

                  {/* Sub criteria */}
                  <td className="py-2.5 px-4 text-center">
                    {hasSub ? (
                      <button
                        type="button"
                        onClick={() => onOpenSubCriteria(adv)}
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono font-semibold border transition-all ${
                          completedSubCount === subList.length
                            ? 'bg-emerald-950 border-emerald-600 text-emerald-300'
                            : 'bg-stone-900 border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-500'
                        }`}
                      >
                        <ListChecks className="w-3.5 h-3.5 text-emerald-400" />
                        {completedSubCount}/{subList.length}
                      </button>
                    ) : (
                      <span className="text-stone-600 font-mono text-xs">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
