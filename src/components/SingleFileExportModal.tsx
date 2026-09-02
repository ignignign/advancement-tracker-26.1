import React, { useState } from 'react';
import { X, FileCode, Download, Copy, Check, Sparkles } from 'lucide-react';
import { generateSingleHtmlString } from '../utils/generateSingleHtml';

interface SingleFileExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SingleFileExportModal: React.FC<SingleFileExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const htmlContent = generateSingleHtmlString();

  if (!isOpen) return null;

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'minecraft-aatool-26.2.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="single-file-modal-container"
        className="bg-[#171a23] border-2 border-stone-700 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-stone-200"
      >
        {/* Header */}
        <div className="bg-[#11131a] px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-400">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide">
                Opción 1: Archivo Único Autónomo (.html)
              </h3>
              <p className="text-xs text-stone-400">
                Todo el código (HTML, CSS y JS con los 126 logros) en un único archivo listo para abrir
              </p>
            </div>
          </div>
          <button
            id="close-single-file-modal"
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 flex-1 overflow-y-auto custom-scrollbar">
          <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-bold text-stone-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Descargar o Copiar Archivo Completo
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Guárdalo en tu PC como <code className="text-amber-300 font-mono">index.html</code> y ábrelo con doble clic en cualquier navegador.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="copy-html-content-btn"
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold border border-stone-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" /> ¡Copiado al Portapapeles!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copiar Código
                  </>
                )}
              </button>

              <button
                id="download-html-file-btn"
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                <Download className="w-4 h-4" /> Descargar .html
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-xs text-stone-400 font-bold uppercase tracking-wider">
              Vista previa del código fuente inline:
            </div>
            <pre className="bg-stone-950 p-4 rounded-xl border border-stone-800 font-mono text-xs text-stone-300 overflow-x-auto max-h-64 custom-scrollbar whitespace-pre">
              {htmlContent.slice(0, 1500)}
              {'\n\n/* ... [Resto de los 126 logros y lógica JS empotrada] ... */'}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#11131a] px-6 py-3 border-t border-stone-800 flex justify-end">
          <button
            id="done-single-file-modal-btn"
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
