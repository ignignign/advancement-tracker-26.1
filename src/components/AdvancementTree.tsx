import React from 'react';
import { Advancement, TabId } from '../types';
import { MinecraftIcon } from './MinecraftIcon';
import { CheckCircle2, EyeOff, ListChecks } from 'lucide-react';

interface AdvancementTreeProps {
  advancements: Advancement[];
  completedMap: Record<string, boolean>;
  subCriteriaProgress: Record<string, Record<string, boolean>>;
  onToggle: (id: string, completed: boolean) => void;
  onOpenSubCriteria: (advancement: Advancement) => void;
  currentTab: TabId | 'all';
}

interface TreeNode {
  advancement: Advancement;
  children: TreeNode[];
}

export const AdvancementTree: React.FC<AdvancementTreeProps> = ({
  advancements,
  completedMap,
  subCriteriaProgress,
  onToggle,
  onOpenSubCriteria,
  currentTab
}) => {
  // Build tree hierarchy based on `parent` relationship
  const buildTree = (items: Advancement[]): TreeNode[] => {
    const nodeMap = new Map<string, TreeNode>();
    items.forEach(item => {
      nodeMap.set(item.id, { advancement: item, children: [] });
    });

    const roots: TreeNode[] = [];

    items.forEach(item => {
      const node = nodeMap.get(item.id)!;
      if (item.parent && nodeMap.has(item.parent)) {
        nodeMap.get(item.parent)!.children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  };

  const roots = buildTree(advancements);

  const renderNode = (node: TreeNode, depth: number = 0) => {
    const { advancement, children } = node;
    const isCompleted = !!completedMap[advancement.id];
    const subCriteria = advancement.subCriteria || [];
    const subProgress = subCriteriaProgress[advancement.id] || {};
    const completedSub = subCriteria.filter(c => subProgress[c.id]).length;
    const hasSub = subCriteria.length > 0;

    const isChallenge = advancement.type === 'challenge';
    const isGoal = advancement.type === 'goal';

    return (
      <div key={advancement.id} className="flex flex-col items-start my-1 relative">
        <div className="flex items-center gap-3">
          {/* Connector bullet */}
          {depth > 0 && (
            <div className="w-6 h-0.5 bg-stone-700/80 -mr-2" />
          )}

          {/* Node item */}
          <div
            id={`tree-node-${advancement.id}`}
            className={`group relative flex items-center gap-3 p-2.5 rounded-xl border-2 transition-all select-none shadow-md ${
              isCompleted
                ? isChallenge
                  ? 'bg-purple-950/70 border-purple-500 text-purple-100 shadow-purple-900/30'
                  : isGoal
                  ? 'bg-amber-950/70 border-amber-500 text-amber-100 shadow-amber-900/30'
                  : 'bg-emerald-950/70 border-emerald-500 text-emerald-100 shadow-emerald-900/30'
                : 'bg-[#181b24] border-stone-700 hover:border-stone-500 text-stone-300'
            }`}
          >
            {/* Click to Toggle Icon */}
            <button
              type="button"
              onClick={() => onToggle(advancement.id, !isCompleted)}
              className={`p-2 rounded-lg border flex items-center justify-center transition-transform active:scale-90 ${
                isCompleted
                  ? isChallenge
                    ? 'bg-purple-800 border-purple-400 text-white'
                    : isGoal
                    ? 'bg-amber-800 border-amber-400 text-white'
                    : 'bg-emerald-800 border-emerald-400 text-white'
                  : 'bg-stone-900 border-stone-700 text-stone-400 hover:text-white hover:border-stone-500'
              }`}
            >
              <MinecraftIcon name={advancement.icon} className="w-5 h-5" />
            </button>

            {/* Info */}
            <div 
              className="cursor-pointer"
              onClick={() => onToggle(advancement.id, !isCompleted)}
            >
              <div className="flex items-center gap-1.5">
                <span className={`font-bold text-sm leading-tight ${isCompleted ? 'text-white' : 'text-stone-200'}`}>
                  {advancement.title}
                </span>
                {advancement.hidden && (
                  <EyeOff className="w-3 h-3 text-stone-500" />
                )}
                {isCompleted && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 inline fill-emerald-950" />
                )}
              </div>
              <div className="text-[11px] text-stone-400 max-w-xs truncate mt-0.5">
                {advancement.requirement}
              </div>
            </div>

            {/* Sub criteria button */}
            {hasSub && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenSubCriteria(advancement);
                }}
                className={`ml-2 px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 border transition-colors ${
                  completedSub === subCriteria.length
                    ? 'bg-emerald-900 border-emerald-500 text-emerald-200'
                    : 'bg-stone-900 border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200'
                }`}
              >
                <ListChecks className="w-3 h-3" />
                {completedSub}/{subCriteria.length}
              </button>
            )}
          </div>
        </div>

        {/* Children indented */}
        {children.length > 0 && (
          <div className="pl-8 border-l-2 border-stone-800 ml-5 my-1 space-y-2">
            {children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#11131a] rounded-2xl border-2 border-stone-800 p-6 overflow-x-auto custom-scrollbar shadow-2xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-800">
        <div>
          <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
            Árbol de Progresión de Logros
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            Visualización jerárquica con dependencias oficiales de Minecraft
          </p>
        </div>
        <div className="text-xs text-stone-400 font-medium">
          Haz clic en cualquier nodo para marcarlo como completado
        </div>
      </div>

      <div className="space-y-6">
        {roots.map(root => renderNode(root, 0))}
      </div>
    </div>
  );
};
