import React from 'react';
import {
  FolderSync,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  FolderOpen,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { AutoWatcherStatus } from '../utils/minecraftSync';

interface AutoSyncBannerProps {
  status: AutoWatcherStatus;
  onOpenModal: () => void;
  onQuickConnect: () => void;
  onManualRefresh: () => void;
}

export const AutoSyncBanner: React.FC<AutoSyncBannerProps> = ({
  status,
  onOpenModal,
  onQuickConnect,
  onManualRefresh,
}) => {
  return (
    <div
      id="auto-sync-banner"
      className={`rounded-2xl border-2 transition-all p-3 sm:p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg ${
        status.active
          ? 'bg-gradient-to-r from-emerald-950/40 via-[#141d24] to-[#121620] border-emerald-500/50 shadow-emerald-950/20'
          : 'bg-[#141722] border-stone-800 hover:border-stone-700'
      }`}
    >
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className={`p-2 rounded-xl border flex-shrink-0 ${
          status.active
            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400'
            : 'bg-stone-900 border-stone-800 text-stone-400'
        }`}>
          <FolderSync className={`w-4 h-4 ${status.active ? 'animate-pulse' : ''}`} />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              {status.active ? (
                <>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-emerald-300 font-bold">Auto-Sync Mundo Activo</span>
                </>
              ) : (
                'Sincronización Automática con Carpeta de Logros'
              )}
            </span>
            {status.active && status.fileName && (
              <span className="text-[11px] font-mono bg-stone-900/90 text-stone-300 border border-stone-700 px-2 py-0.5 rounded truncate max-w-[200px]">
                {status.fileName}
              </span>
            )}
          </div>
          <p className="text-[11px] text-stone-400 truncate mt-0.5">
            {status.active
              ? status.lastSyncTime
                ? `Monitoreando carpeta advancements en vivo • Última verificación: ${new Date(status.lastSyncTime).toLocaleTimeString()}`
                : 'Monitoreando carpeta advancements en vivo...'
              : 'Conecta tu carpeta "advancements" para marcar los logros automáticamente mientras juegas'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {status.active ? (
          <>
            <button
              id="auto-sync-refresh-btn"
              onClick={onManualRefresh}
              className="px-3 py-1.5 rounded-xl bg-stone-800/80 border border-stone-700 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Forzar lectura del archivo JSON"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Actualizar</span>
            </button>
            <button
              id="auto-sync-manage-btn"
              onClick={onOpenModal}
              className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-700/80 hover:bg-emerald-900/80 text-emerald-300 text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <span>Ajustes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <>
            <button
              id="auto-sync-info-btn"
              onClick={onOpenModal}
              className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200 text-xs font-medium transition-colors"
            >
              ¿Cómo funciona?
            </button>
            <button
              id="auto-sync-connect-btn"
              onClick={onQuickConnect}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/30 transition-all hover:scale-105"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Conectar Mundo</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
