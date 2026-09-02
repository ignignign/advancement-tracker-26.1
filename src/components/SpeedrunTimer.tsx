import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag, Timer as TimerIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { TabId } from '../types';

interface SpeedrunTimerProps {
  completedCount: number;
  totalCount: number;
  activeTab: TabId | 'all';
  tabStats: Record<TabId, { completed: number; total: number }>;
}

export const SpeedrunTimer: React.FC<SpeedrunTimerProps> = ({
  completedCount,
  totalCount,
  activeTab,
  tabStats
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [splits, setSplits] = useState<{ id: string; name: string; time: number; count: number }[]>([]);

  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now() - elapsedMs;
      const updateTimer = () => {
        setElapsedMs(performance.now() - startTimeRef.current);
        animationFrameRef.current = requestAnimationFrame(updateTimer);
      };
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedMs(0);
    setSplits([]);
  };

  const handleAddSplit = () => {
    const splitName = activeTab === 'all' ? `Split #${splits.length + 1}` : `Tab ${activeTab.toUpperCase()}`;
    setSplits(prev => [
      ...prev,
      {
        id: `split_${Date.now()}`,
        name: splitName,
        time: elapsedMs,
        count: completedCount
      }
    ]);
  };

  const formatTime = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;
    const millis = Math.floor((ms % 1000) / 10);

    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${hours > 0 ? `${pad(hours)}:` : ''}${pad(minutes)}:${pad(seconds)}.${pad(millis)}`;
  };

  return (
    <div 
      id="speedrun-timer-widget"
      className="bg-[#151821] border border-stone-800 rounded-xl p-3 shadow-lg flex flex-col transition-all"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg ${isRunning ? 'bg-emerald-950 text-emerald-400 animate-pulse' : 'bg-stone-800 text-stone-400'}`}>
            <TimerIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
              AA Speedrun Timer
            </div>
            <div className="font-mono text-2xl font-black text-stone-100 tracking-tight">
              {formatTime(elapsedMs)}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          <button
            id="timer-start-pause-btn"
            onClick={handleStartPause}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold text-xs transition-colors shadow-sm ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" /> Pausa
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" /> Iniciar
              </>
            )}
          </button>

          <button
            id="timer-split-btn"
            onClick={handleAddSplit}
            disabled={elapsedMs === 0}
            title="Registrar Split"
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Flag className="w-4 h-4" />
          </button>

          <button
            id="timer-reset-btn"
            onClick={handleReset}
            disabled={elapsedMs === 0 && !isRunning}
            title="Reiniciar Cronómetro"
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {splits.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Expanded Splits List */}
      {isExpanded && splits.length > 0 && (
        <div className="mt-3 pt-3 border-t border-stone-800 space-y-1.5 max-h-36 overflow-y-auto custom-scrollbar text-xs">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
            Splits Registrados ({splits.length})
          </div>
          {splits.map((s, idx) => (
            <div key={s.id} className="flex items-center justify-between py-1 px-2 bg-stone-900/60 rounded border border-stone-800/80">
              <span className="text-stone-300 font-medium">
                #{idx + 1} {s.name} ({s.count}/{totalCount})
              </span>
              <span className="font-mono font-bold text-emerald-400">{formatTime(s.time)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
