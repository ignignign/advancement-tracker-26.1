import React, { useState } from 'react';
import { X, Github, Check, Copy, Terminal, Globe, Rocket, GitBranch, FolderGit2 } from 'lucide-react';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubModal: React.FC<GitHubModalProps> = ({ isOpen, onClose }) => {
  const [copiedWorkflow, setCopiedWorkflow] = useState(false);
  const [copiedCommands, setCopiedCommands] = useState(false);

  if (!isOpen) return null;

  const gitCommands = `# 1. Inicializar repositorio git local (si no lo has hecho)
git init
git add .
git commit -m "feat: Minecraft 26.2 AA Tool Advancements Tracker"

# 2. Conectar con tu repositorio remoto de GitHub
git branch -M main
git remote add origin https://github.com/TU_USUARIO/minecraft-26-2-aatool.git

# 3. Subir el proyecto
git push -u origin main`;

  const workflowYml = `name: Deploy to GitHub Pages

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Project
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

  const copyToClipboard = (text: string, type: 'workflow' | 'commands') => {
    navigator.clipboard.writeText(text);
    if (type === 'workflow') {
      setCopiedWorkflow(true);
      setTimeout(() => setCopiedWorkflow(false), 2500);
    } else {
      setCopiedCommands(true);
      setTimeout(() => setCopiedCommands(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="github-modal-container"
        className="bg-[#171a23] border-2 border-stone-700 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-stone-200"
      >
        {/* Header */}
        <div className="bg-[#11131a] px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide">
                Guía de Despliegue en GitHub Pages
              </h3>
              <p className="text-xs text-stone-400">
                Estructura del proyecto y flujo automatizado con GitHub Actions
              </p>
            </div>
          </div>
          <button
            id="close-github-modal"
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-sm">
          {/* Step 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <FolderGit2 className="w-4 h-4" />
              <span>Paso 1: Estructura de Carpetas del Proyecto</span>
            </div>
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 font-mono text-xs text-stone-300 space-y-1">
              <div className="text-emerald-400">minecraft-aatool-26.2/</div>
              <div className="pl-4">├── .github/</div>
              <div className="pl-8 text-amber-300">└── workflows/</div>
              <div className="pl-12 text-amber-300 font-bold">└── deploy.yml <span className="text-stone-500">(Workflow ya configurado)</span></div>
              <div className="pl-4">├── src/</div>
              <div className="pl-8">├── components/</div>
              <div className="pl-8">├── data/ <span className="text-stone-500">(126 logros oficiales de MC 26.2)</span></div>
              <div className="pl-8">├── types.ts</div>
              <div className="pl-8">├── App.tsx</div>
              <div className="pl-8">└── main.tsx</div>
              <div className="pl-4">├── package.json</div>
              <div className="pl-4">├── vite.config.ts</div>
              <div className="pl-4">└── index.html</div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Terminal className="w-4 h-4" />
                <span>Paso 2: Comandos Git para subir a GitHub</span>
              </div>
              <button
                id="copy-git-commands-btn"
                onClick={() => copyToClipboard(gitCommands, 'commands')}
                className="flex items-center gap-1.5 px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-semibold border border-stone-700 transition-colors"
              >
                {copiedCommands ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copiar Comandos
                  </>
                )}
              </button>
            </div>
            <pre className="bg-stone-950 p-4 rounded-xl border border-stone-800 font-mono text-xs text-stone-300 overflow-x-auto whitespace-pre">
              {gitCommands}
            </pre>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Rocket className="w-4 h-4" />
                <span>Paso 3: Workflow de GitHub Actions (.github/workflows/deploy.yml)</span>
              </div>
              <button
                id="copy-workflow-btn"
                onClick={() => copyToClipboard(workflowYml, 'workflow')}
                className="flex items-center gap-1.5 px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-semibold border border-stone-700 transition-colors"
              >
                {copiedWorkflow ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copiar YAML
                  </>
                )}
              </button>
            </div>
            <pre className="bg-stone-950 p-4 rounded-xl border border-stone-800 font-mono text-xs text-stone-300 overflow-x-auto max-h-48 custom-scrollbar whitespace-pre">
              {workflowYml}
            </pre>
          </div>

          {/* Step 4 */}
          <div className="bg-emerald-950/40 border border-emerald-700/60 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <Globe className="w-4 h-4" />
              <span>Paso 4: Activar GitHub Pages en tu repositorio</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-xs text-stone-300">
              <li>En GitHub, ve a tu repositorio &gt; <strong>Settings</strong> &gt; <strong>Pages</strong>.</li>
              <li>En <strong>Build and deployment &gt; Source</strong>, selecciona <span className="font-mono bg-black/40 px-1.5 py-0.5 rounded text-amber-300">GitHub Actions</span>.</li>
              <li>¡Listo! Cada vez que hagas <span className="font-mono text-emerald-400">git push</span>, tu aplicación se compilará y desplegará automáticamente.</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#11131a] px-6 py-3 border-t border-stone-800 flex justify-end">
          <button
            id="close-github-modal-btn"
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
