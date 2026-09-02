import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  FolderSync,
  CheckCircle2,
  AlertCircle,
  Clock,
  FolderOpen,
  FileJson,
  X,
  Play,
  Pause,
  RefreshCw,
  FolderCheck,
  HardDrive,
  Info,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { AutoWatcherStatus, parseMinecraftAdvancementsJson } from '../utils/minecraftSync';
import { TrackerState } from '../types';
import { ADVANCEMENTS } from '../data/advancements';

interface AutoSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  watcherStatus: AutoWatcherStatus;
  onSelectDirectory: () => void;
  onSelectFile: () => void;
  onDisconnect: () => void;
  onManualRefresh: () => void;
  recentUnlocked: Array<{ id: string; title: string; type: string; timestamp: number }>;
  isSupported: boolean;
  onFileFallbackImport: (file: File) => void;
}

export const AutoSyncModal: React.FC<AutoSyncModalProps> = ({
  isOpen,
  onClose,
  watcherStatus,
  onSelectDirectory,
  onSelectFile,
  onDisconnect,
  onManualRefresh,
  recentUnlocked,
  isSupported,
  onFileFallbackImport,
}) => {
  const [activeOsTab, setActiveOsTab] = useState<'win' | 'mac' | 'linux'>('win');
  const fallbackInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141722] border-2 border-stone-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-[#181c2b]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-600 text-emerald-400">
              <FolderSync className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  Sincronización Automática con Mundo Minecraft
                </h2>
                <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-700/60 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
                  Live Watcher
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Detecta y marca tus logros en tiempo real al jugar en tu mundo local
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 custom-scrollbar text-stone-300 text-sm">
          {/* Active Connection Status Card */}
          <div className={`p-4 rounded-xl border-2 transition-all ${
            watcherStatus.active
              ? 'bg-emerald-950/25 border-emerald-600/80 shadow-lg shadow-emerald-950/30'
              : 'bg-stone-900/80 border-stone-800'
          }`}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-3.5 h-3.5 rounded-full ${
                  watcherStatus.active ? 'bg-emerald-400 animate-ping' : 'bg-stone-600'
                }`} />
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    {watcherStatus.active ? (
                      <span className="text-emerald-300 flex items-center gap-1.5">
                        <FolderCheck className="w-4 h-4" />
                        Monitoreo Activo en Tiempo Real
                      </span>
                    ) : (
                      <span className="text-stone-400">Sin Carpeta Conectada</span>
                    )}
                  </div>
                  <div className="text-xs text-stone-400 mt-0.5">
                    {watcherStatus.active ? (
                      <span>
                        Archivo:{' '}
                        <code className="text-stone-300 bg-stone-900 px-1.5 py-0.5 rounded border border-stone-700 font-mono">
                          {watcherStatus.fileName || watcherStatus.folderName}
                        </code>
                      </span>
                    ) : (
                      'Selecciona tu carpeta advancements para comenzar a sincronizar automáticamente'
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {watcherStatus.active ? (
                  <>
                    <button
                      onClick={onManualRefresh}
                      title="Comprobar archivo ahora"
                      className="px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-700 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Comprobar
                    </button>
                    <button
                      onClick={onDisconnect}
                      className="px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-800/80 hover:bg-red-900 text-red-300 text-xs font-semibold transition-colors"
                    >
                      Desconectar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onSelectDirectory}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all scale-[1.02]"
                  >
                    <FolderOpen className="w-4 h-4" />
                    Conectar Carpeta / Mundo
                  </button>
                )}
              </div>
            </div>

            {watcherStatus.lastSyncTime && (
              <div className="mt-3 pt-3 border-t border-emerald-900/40 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  Última lectura: {new Date(watcherStatus.lastSyncTime).toLocaleTimeString()}
                </span>
                <span className="text-emerald-300 font-mono font-semibold">
                  {watcherStatus.totalSyncedCount} logros sincronizados
                </span>
              </div>
            )}
          </div>

          {/* Quick Selection Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={onSelectDirectory}
              className="p-3.5 rounded-xl bg-stone-900/90 border-2 border-stone-800 hover:border-emerald-500/80 hover:bg-stone-800/80 text-left transition-all group"
            >
              <div className="flex items-center gap-2.5 text-white font-bold text-sm mb-1 group-hover:text-emerald-300">
                <FolderOpen className="w-4 h-4 text-emerald-400" />
                Opción A: Carpeta "advancements"
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Selecciona la carpeta <code className="text-stone-300 font-mono">advancements</code> de tu mundo. La app elegirá y monitoreará tu archivo automáticamente.
              </p>
            </button>

            <button
              onClick={onSelectFile}
              className="p-3.5 rounded-xl bg-stone-900/90 border-2 border-stone-800 hover:border-emerald-500/80 hover:bg-stone-800/80 text-left transition-all group"
            >
              <div className="flex items-center gap-2.5 text-white font-bold text-sm mb-1 group-hover:text-emerald-300">
                <FileJson className="w-4 h-4 text-amber-400" />
                Opción B: Archivo &lt;UUID&gt;.json
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Selecciona directamente el archivo JSON de tu jugador dentro de la carpeta advancements de tu mundo.
              </p>
            </button>
          </div>

          {/* Path helper guides by OS */}
          <div className="bg-[#11131a] border border-stone-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-stone-400" />
                ¿Dónde encontrar la carpeta de tu mundo?
              </div>
              <div className="flex rounded-lg bg-stone-900 p-0.5 text-xs font-medium border border-stone-800">
                <button
                  onClick={() => setActiveOsTab('win')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeOsTab === 'win' ? 'bg-stone-700 text-white font-bold' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Windows
                </button>
                <button
                  onClick={() => setActiveOsTab('mac')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeOsTab === 'mac' ? 'bg-stone-700 text-white font-bold' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  macOS
                </button>
                <button
                  onClick={() => setActiveOsTab('linux')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeOsTab === 'linux' ? 'bg-stone-700 text-white font-bold' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Linux
                </button>
              </div>
            </div>

            <div className="bg-stone-950 p-3 rounded-lg border border-stone-800 font-mono text-xs text-emerald-300 select-all overflow-x-auto">
              {activeOsTab === 'win' && '%appdata%\\.minecraft\\saves\\<TuMundo>\\advancements'}
              {activeOsTab === 'mac' && '~/Library/Application Support/minecraft/saves/<TuMundo>/advancements'}
              {activeOsTab === 'linux' && '~/.minecraft/saves/<TuMundo>/advancements'}
            </div>

            <p className="text-[11px] text-stone-500">
              💡 <strong>Tip de Speedrunner:</strong> Al seleccionar la carpeta, el navegador monitorea cambios cada segundo. Cada vez que completes un logro en Minecraft, la app lo marcará de inmediato con sonido y animación.
            </p>
          </div>

          {/* Recent Unlocked in Live Session */}
          {recentUnlocked.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Desbloqueados recientemente en esta sesión:
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                {recentUnlocked.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="p-2 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="font-bold text-white">{item.title}</span>
                      <span className="text-[10px] uppercase font-bold text-stone-400 bg-stone-800 px-1.5 py-0.5 rounded">
                        {item.type}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 font-mono">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-[#181c2b] flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Los datos se procesan 100% de forma local y privada en tu navegador.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
