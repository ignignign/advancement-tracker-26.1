import React, { useRef } from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Download,
  Upload,
  FileCode,
  Github,
  Trophy,
  Sparkles,
  Layers,
  Timer,
  FolderSync
} from 'lucide-react';
import { TabId } from '../types';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReset: () => void;
  onExportJson: () => void;
  onImportJson: (file: File) => void;
  onOpenSingleHtml: () => void;
  onOpenGitHub: () => void;
  showTimer: boolean;
  onToggleTimer: () => void;
  isAutoSyncActive: boolean;
  onOpenAutoSync: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedCount,
  totalCount,
  soundEnabled,
  onToggleSound,
  onReset,
  onExportJson,
  onImportJson,
  onOpenSingleHtml,
  onOpenGitHub,
  showTimer,
  onToggleTimer,
  isAutoSyncActive,
  onOpenAutoSync,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJson(file);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <header className="bg-[#141720] border-2 border-stone-800 rounded-2xl p-4 sm:p-5 shadow-2xl">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Brand & Version */}
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-900 to-stone-900 border-2 border-emerald-500/60 shadow-lg shadow-emerald-950/40 text-emerald-400">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
                Minecraft AA Tool
              </h1>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-700/80 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-wide">
                v26.2
              </span>
              <span className="bg-stone-800 text-stone-300 border border-stone-700 px-2 py-0.5 rounded-full text-[11px] font-bold">
                126 Logros
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Rastreador interactivo para All Advancements Speedruns y Completistas • Auto-guardado LocalStorage
            </p>
          </div>
        </div>

        {/* Global Progress Bar & Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          {/* Progress Widget */}
          <div className="bg-[#1a1e29] border border-stone-800 rounded-xl px-4 py-2.5 flex items-center gap-3.5 shadow-inner">
            <div>
              <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Progreso Total
              </div>
              <div className="text-lg font-black font-mono text-emerald-400">
                {completedCount} <span className="text-stone-500 text-sm font-normal">/ {totalCount}</span>
                <span className="text-xs font-bold text-stone-300 ml-2">({progressPercent}%)</span>
              </div>
            </div>

            <div className="w-24 sm:w-32 bg-stone-900 h-2.5 rounded-full overflow-hidden border border-stone-700">
              <div
                className="bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-300 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Auto-Sync Live Status Button */}
            <button
              id="header-toggle-sync-btn"
              onClick={onOpenAutoSync}
              className={`px-2.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                isAutoSyncActive
                  ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/40'
                  : 'bg-stone-900 border-stone-700 text-stone-300 hover:text-white hover:border-emerald-500/60'
              }`}
              title={isAutoSyncActive ? "Auto-Sync activo en vivo (clic para ajustes)" : "Conectar carpeta de logros del mundo"}
            >
              <FolderSync className={`w-4 h-4 ${isAutoSyncActive ? 'text-emerald-400 animate-spin' : 'text-stone-400'}`} style={isAutoSyncActive ? { animationDuration: '4s' } : {}} />
              <span className="hidden sm:inline">
                {isAutoSyncActive ? 'Auto-Sync Activo' : 'Auto-Sync'}
              </span>
            </button>

            {/* Speedrun Timer toggle */}
            <button
              id="header-toggle-timer-btn"
              onClick={onToggleTimer}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                showTimer
                  ? 'bg-amber-950/80 border-amber-500 text-amber-300 shadow-md shadow-amber-950/30'
                  : 'bg-stone-900 border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-500'
              }`}
              title="Mostrar/Ocultar Cronómetro Speedrun"
            >
              <Timer className="w-4 h-4" />
              <span className="hidden sm:inline">Cronómetro</span>
            </button>

            {/* Sound Toggle */}
            <button
              id="header-toggle-sound-btn"
              onClick={onToggleSound}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                soundEnabled
                  ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300 shadow-md shadow-emerald-950/30'
                  : 'bg-stone-900 border-stone-700 text-stone-500 hover:text-stone-300 hover:border-stone-500'
              }`}
              title={soundEnabled ? "Sonido activado" : "Sonido silenciado"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Export JSON */}
            <button
              id="header-export-json-btn"
              onClick={onExportJson}
              className="p-2 rounded-xl bg-stone-900 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white transition-all text-xs font-semibold"
              title="Guardar / Exportar Backup JSON"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Import JSON */}
            <button
              id="header-import-json-btn"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-xl bg-stone-900 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white transition-all text-xs font-semibold"
              title="Importar Backup JSON"
            >
              <Upload className="w-4 h-4" />
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </button>

            {/* Single HTML modal */}
            <button
              id="header-single-html-btn"
              onClick={onOpenSingleHtml}
              className="px-3 py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/60 hover:bg-emerald-600/30 text-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              title="Descargar o ver archivo HTML autónomo único"
            >
              <FileCode className="w-4 h-4" />
              <span>Opción 1: HTML Único</span>
            </button>

            {/* GitHub modal */}
            <button
              id="header-github-modal-btn"
              onClick={onOpenGitHub}
              className="px-3 py-2 rounded-xl bg-stone-800 border border-stone-600 hover:bg-stone-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              title="Guía de despliegue en GitHub Pages"
            >
              <Github className="w-4 h-4" />
              <span>Opción 2: GitHub</span>
            </button>

            {/* Reset */}
            <button
              id="header-reset-progress-btn"
              onClick={onReset}
              className="p-2 rounded-xl bg-red-950/40 border border-red-800/80 hover:bg-red-900 text-red-300 transition-all text-xs"
              title="Reiniciar todo el progreso"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
