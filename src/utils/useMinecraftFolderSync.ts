import { useState, useEffect, useRef, useCallback } from 'react';
import {
  AutoWatcherStatus,
  parseMinecraftAdvancementsJson,
  SyncResult
} from './minecraftSync';
import { TrackerState } from '../types';
import { ADVANCEMENTS } from '../data/advancements';
import { soundEngine } from './audio';
import confetti from 'canvas-confetti';

interface UseMinecraftFolderSyncProps {
  trackerState: TrackerState;
  onApplySync: (syncResult: SyncResult) => void;
}

export interface UnlockedItem {
  id: string;
  title: string;
  type: string;
  timestamp: number;
}

export function useMinecraftFolderSync({
  trackerState,
  onApplySync,
}: UseMinecraftFolderSyncProps) {
  const [watcherStatus, setWatcherStatus] = useState<AutoWatcherStatus>({
    active: false,
    folderName: null,
    fileName: null,
    lastSyncTime: null,
    error: null,
    totalSyncedCount: 0,
  });

  const [recentUnlocked, setRecentUnlocked] = useState<UnlockedItem[]>([]);
  const [isSupported] = useState<boolean>(() => {
    return typeof window !== 'undefined' && 'showDirectoryPicker' in window;
  });

  const fileHandleRef = useRef<any>(null);
  const dirHandleRef = useRef<any>(null);
  const lastModifiedRef = useRef<number>(0);
  const lastContentHashRef = useRef<string>('');
  const pollTimerRef = useRef<any>(null);
  const trackerStateRef = useRef<TrackerState>(trackerState);

  useEffect(() => {
    trackerStateRef.current = trackerState;
  }, [trackerState]);

  // Process and apply sync payload
  const processJsonString = useCallback((jsonStr: string, fileName?: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed || typeof parsed !== 'object') return;

      const result = parseMinecraftAdvancementsJson(parsed, trackerStateRef.current);
      onApplySync(result);

      const count = Object.values(result.completed).filter(Boolean).length;
      setWatcherStatus(prev => ({
        ...prev,
        active: true,
        fileName: fileName || prev.fileName || 'player.json',
        lastSyncTime: Date.now(),
        totalSyncedCount: count,
        error: null,
      }));

      // Check for newly completed advancements to trigger celebratory sound & confetti
      if (result.newlyCompletedAdvancementIds && result.newlyCompletedAdvancementIds.length > 0) {
        const newItems: UnlockedItem[] = [];
        let hasChallenge = false;
        let hasGoal = false;

        result.newlyCompletedAdvancementIds.forEach(id => {
          const adv = ADVANCEMENTS.find(a => a.id === id);
          if (adv) {
            newItems.push({
              id: adv.id,
              title: adv.title,
              type: adv.type,
              timestamp: Date.now()
            });
            if (adv.type === 'challenge') hasChallenge = true;
            if (adv.type === 'goal') hasGoal = true;
          }
        });

        if (newItems.length > 0) {
          setRecentUnlocked(prev => [...newItems, ...prev].slice(0, 20));

          if (hasChallenge) {
            soundEngine.playAdvancementComplete(true, false);
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.8 },
              colors: ['#a855f7', '#ec4899', '#38bdf8', '#fbbf24']
            });
          } else if (hasGoal) {
            soundEngine.playAdvancementComplete(false, true);
          } else {
            soundEngine.playAdvancementComplete(false, false);
          }
        }
      }
    } catch (err: any) {
      console.error('Error parsing Minecraft advancements JSON:', err);
    }
  }, [onApplySync]);

  // Check file for updates
  const checkCurrentFile = useCallback(async () => {
    if (!fileHandleRef.current) return;
    try {
      const file = await fileHandleRef.current.getFile();
      const currentMod = file.lastModified;

      // Only re-parse if file timestamp modified or hash changed
      if (currentMod !== lastModifiedRef.current) {
        lastModifiedRef.current = currentMod;
        const text = await file.text();
        if (text !== lastContentHashRef.current) {
          lastContentHashRef.current = text;
          processJsonString(text, file.name);
        }
      }
    } catch (err: any) {
      console.warn('Sync poll check error:', err);
    }
  }, [processJsonString]);

  // Start polling interval
  const startPolling = useCallback(() => {
    if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    pollTimerRef.current = setInterval(() => {
      checkCurrentFile();
    }, 1200);
  }, [checkCurrentFile]);

  // Disconnect watcher
  const disconnect = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    fileHandleRef.current = null;
    dirHandleRef.current = null;
    lastModifiedRef.current = 0;
    lastContentHashRef.current = '';

    setWatcherStatus({
      active: false,
      folderName: null,
      fileName: null,
      lastSyncTime: null,
      error: null,
      totalSyncedCount: 0,
    });
  }, []);

  // Select folder via File System Access API
  const selectDirectory = useCallback(async () => {
    if (!('showDirectoryPicker' in window)) {
      alert('Tu navegador no soporta File System Access API para carpetas. Puedes seleccionar el archivo .json directamente.');
      return;
    }

    try {
      const dirHandle = await (window as any).showDirectoryPicker({
        mode: 'read',
      });
      dirHandleRef.current = dirHandle;

      // Find JSON file inside dirHandle (or inside 'advancements' subfolder if user picked world folder)
      let targetFileHandle: any = null;
      let targetFileName = '';
      let newestModified = 0;

      // Check root of selected directory
      for await (const [name, handle] of dirHandle.entries()) {
        if (handle.kind === 'file' && name.endsWith('.json')) {
          const file = await handle.getFile();
          if (file.lastModified > newestModified) {
            newestModified = file.lastModified;
            targetFileHandle = handle;
            targetFileName = name;
          }
        }
      }

      // If not found in root, check if there's an 'advancements' subfolder
      if (!targetFileHandle) {
        for await (const [name, handle] of dirHandle.entries()) {
          if (handle.kind === 'directory' && name.toLowerCase() === 'advancements') {
            for await (const [subName, subHandle] of handle.entries()) {
              if (subHandle.kind === 'file' && subName.endsWith('.json')) {
                const file = await subHandle.getFile();
                if (file.lastModified > newestModified) {
                  newestModified = file.lastModified;
                  targetFileHandle = subHandle;
                  targetFileName = subName;
                }
              }
            }
          }
        }
      }

      if (!targetFileHandle) {
        alert('No se encontraron archivos de logros (.json) en la carpeta seleccionada. Asegúrate de seleccionar la carpeta "advancements" de tu mundo.');
        return;
      }

      fileHandleRef.current = targetFileHandle;
      setWatcherStatus(prev => ({
        ...prev,
        active: true,
        folderName: dirHandle.name,
        fileName: targetFileName,
        error: null
      }));

      // Initial read
      const file = await targetFileHandle.getFile();
      lastModifiedRef.current = file.lastModified;
      const text = await file.text();
      lastContentHashRef.current = text;
      processJsonString(text, targetFileName);

      startPolling();
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Error selecting directory:', err);
        setWatcherStatus(prev => ({ ...prev, error: err.message || 'Error al conectar carpeta' }));
      }
    }
  }, [processJsonString, startPolling]);

  // Select single JSON file
  const selectFile = useCallback(async () => {
    if (!('showOpenFilePicker' in window)) {
      alert('Tu navegador no soporta File System Access API para abrir archivos. Usa el botón de importar normal.');
      return;
    }

    try {
      const [handle] = await (window as any).showOpenFilePicker({
        types: [
          {
            description: 'Minecraft Advancements JSON',
            accept: { 'application/json': ['.json'] },
          },
        ],
        multiple: false,
      });

      if (!handle) return;

      fileHandleRef.current = handle;
      const file = await handle.getFile();
      lastModifiedRef.current = file.lastModified;

      setWatcherStatus(prev => ({
        ...prev,
        active: true,
        folderName: null,
        fileName: file.name,
        error: null
      }));

      const text = await file.text();
      lastContentHashRef.current = text;
      processJsonString(text, file.name);

      startPolling();
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Error selecting file:', err);
      }
    }
  }, [processJsonString, startPolling]);

  // Manual fallback import from input file
  const handleFallbackFileImport = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        processJsonString(text, file.name);
      }
    };
    reader.readAsText(file);
  }, [processJsonString]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
      }
    };
  }, []);

  return {
    watcherStatus,
    recentUnlocked,
    isSupported,
    selectDirectory,
    selectFile,
    disconnect,
    manualRefresh: checkCurrentFile,
    handleFallbackFileImport,
  };
}
