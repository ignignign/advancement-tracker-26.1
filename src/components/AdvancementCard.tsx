import React from 'react';
import { CheckCircle2, Circle, ListChecks, HelpCircle, EyeOff, Sparkles, ExternalLink } from 'lucide-react';
import { Advancement } from '../types';
import { MinecraftIcon } from './MinecraftIcon';

interface AdvancementCardProps {
  advancement: Advancement;
  isCompleted: boolean;
  subProgressCount?: number;
  totalSubCriteria?: number;
  onToggle: (id: string, completed: boolean) => void;
  onOpenSubCriteria?: (advancement: Advancement) => void;
  onViewDetails?: (advancement: Advancement) => void;
}

export const AdvancementCard: React.FC<AdvancementCardProps> = ({
  advancement,
  isCompleted,
  subProgressCount = 0,
  totalSubCriteria = 0,
  onToggle,
  onOpenSubCriteria,
  onViewDetails,
}) => {
  const hasSubCriteria = totalSubCriteria > 0;
  const isChallenge = advancement.type === 'challenge';
  const isGoal = advancement.type === 'goal';

  // Minecraft frame styling based on advancement type
  let borderStyle = 'border-stone-700/80 hover:border-stone-500 bg-[#161922]';
  let badgeStyle = 'bg-stone-800/90 text-stone-300 border-stone-600/60';
  let glowEffect = '';

  if (isCompleted) {
    if (isChallenge) {
      borderStyle = 'border-purple-500/80 bg-gradient-to-br from-purple-950/40 via-[#161922] to-fuchsia-950/30 shadow-lg shadow-purple-900/20';
      badgeStyle = 'bg-purple-900/90 text-purple-200 border-purple-500/80 shadow-sm';
      glowEffect = 'ring-1 ring-purple-500/40';
    } else if (isGoal) {
      borderStyle = 'border-amber-500/80 bg-gradient-to-br from-amber-950/40 via-[#161922] to-yellow-950/20 shadow-lg shadow-amber-900/20';
      badgeStyle = 'bg-amber-900/90 text-amber-200 border-amber-500/80 shadow-sm';
      glowEffect = 'ring-1 ring-amber-500/40';
    } else {
      borderStyle = 'border-emerald-500/80 bg-gradient-to-br from-emerald-950/40 via-[#161922] to-teal-950/20 shadow-lg shadow-emerald-900/20';
      badgeStyle = 'bg-emerald-900/90 text-emerald-200 border-emerald-500/80 shadow-sm';
      glowEffect = 'ring-1 ring-emerald-500/40';
    }
  }

  return (
    <div
      id={`advancement-card-${advancement.id}`}
      className={`group relative flex flex-col justify-between p-4 rounded-xl border-2 transition-all duration-200 select-none ${borderStyle} ${glowEffect}`}
    >
      <div>
        {/* Top Header Row: Icon, Title, Type Badge */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3">
            {/* Minecraft Item Frame */}
            <button
              type="button"
              onClick={() => onToggle(advancement.id, !isCompleted)}
              title={isCompleted ? "Marcar como pendiente" : "Marcar como completado"}
              className={`relative p-2.5 rounded-lg border-2 transition-transform duration-150 active:scale-95 flex items-center justify-center ${
                isCompleted
                  ? isChallenge
                    ? 'bg-purple-900 border-purple-400 text-purple-100 shadow-md shadow-purple-500/30'
                    : isGoal
                    ? 'bg-amber-900 border-amber-400 text-amber-100 shadow-md shadow-amber-500/30'
                    : 'bg-emerald-900 border-emerald-400 text-emerald-100 shadow-md shadow-emerald-500/30'
                  : 'bg-stone-900/90 border-stone-700 text-stone-400 group-hover:border-stone-500 group-hover:text-stone-200'
              }`}
            >
              <MinecraftIcon name={advancement.icon} className="w-5 h-5" />
              {isCompleted && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-black rounded-full p-0.5 shadow">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white fill-emerald-600" />
                </div>
              )}
            </button>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className={`text-base font-bold tracking-tight transition-colors ${
                  isCompleted
                    ? 'text-white'
                    : 'text-stone-200 group-hover:text-white'
                }`}>
                  {advancement.title}
                </h4>

                {advancement.hidden && (
                  <span title="Logro Oculto / Secreto" className="text-stone-500 hover:text-stone-300">
                    <EyeOff className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              {/* Subtitle / Tag */}
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border ${badgeStyle}`}>
                  {advancement.type === 'challenge' ? 'Desafío' : advancement.type === 'goal' ? 'Meta' : 'Progreso'}
                </span>
                {advancement.tab && (
                  <span className="text-[11px] text-stone-400 capitalize">
                    {advancement.tab}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Direct Checkbox Button */}
          <button
            id={`toggle-btn-${advancement.id}`}
            type="button"
            onClick={() => onToggle(advancement.id, !isCompleted)}
            className={`p-1.5 rounded-lg border transition-all ${
              isCompleted
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-sm'
                : 'bg-stone-900/80 border-stone-700 text-stone-500 hover:border-stone-500 hover:text-stone-300'
            }`}
            title={isCompleted ? "Marcar como pendiente" : "Completar"}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 fill-emerald-700 text-white" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Description & Requirement */}
        <p className="text-xs text-stone-300 font-normal leading-relaxed mb-2">
          {advancement.description}
        </p>

        <div className="bg-black/30 rounded-lg p-2 border border-stone-800/80 text-[11px] text-stone-400 flex items-start gap-1.5">
          <span className="text-stone-500 font-bold uppercase tracking-wider text-[9px] mt-0.5 flex-shrink-0">
            Requisito:
          </span>
          <span className="text-stone-300 font-medium">
            {advancement.requirement}
          </span>
        </div>
      </div>

      {/* Bottom Action Footer */}
      {hasSubCriteria && (
        <div className="mt-3 pt-2.5 border-t border-stone-800 flex items-center justify-between gap-2">
          <button
            id={`subcriteria-btn-${advancement.id}`}
            type="button"
            onClick={() => onOpenSubCriteria && onOpenSubCriteria(advancement)}
            className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-between border transition-all ${
              subProgressCount === totalSubCriteria && totalSubCriteria > 0
                ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300 hover:bg-emerald-900'
                : 'bg-stone-900/90 border-stone-700 text-stone-300 hover:border-stone-500 hover:bg-stone-800'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <ListChecks className="w-3.5 h-3.5 text-emerald-400" />
              Ver lista de requisitos
            </span>
            <span className="font-mono text-[11px] font-bold bg-black/40 px-2 py-0.5 rounded text-emerald-400">
              {subProgressCount} / {totalSubCriteria}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
