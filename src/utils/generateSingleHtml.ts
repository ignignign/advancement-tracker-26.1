import { ADVANCEMENTS, TABS } from '../data/advancements';

export function generateSingleHtmlString(): string {
  const jsonAdvancements = JSON.stringify(ADVANCEMENTS);
  const jsonTabs = JSON.stringify(TABS);

  return `<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minecraft Advancements Tracker 26.2 (AA Tool - Standalone)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            mcDark: '#12141a',
            mcCard: '#181b24',
            mcBorder: '#292e3d'
          }
        }
      }
    }
  </script>
  <style>
    body { background-color: #0f1117; color: #e2e8f0; font-family: system-ui, -apple-system, sans-serif; }
    .custom-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
    .custom-scroll::-webkit-scrollbar-track { background: #12141a; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #374151; border-radius: 4px; }
    .custom-scroll::-webkit-scrollbar-thumb:hover { background: #4b5563; }
  </style>
</head>
<body class="min-h-screen p-4 sm:p-6 text-stone-200">
  <div class="max-w-7xl mx-auto space-y-6">
    <!-- Header -->
    <header class="bg-mcCard border border-stone-800 rounded-2xl p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-2xl">⛏️</span>
          <h1 class="text-2xl font-black text-white tracking-tight">Minecraft 26.2 AA Tool</h1>
          <span class="text-xs bg-emerald-950 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded-full font-bold">126 Logros Oficiales</span>
        </div>
        <p class="text-xs text-stone-400 mt-1">Seguimiento de logros sin dependencias externas • Auto-guardado en LocalStorage</p>
      </div>

      <div class="flex items-center gap-4 bg-stone-900/80 px-4 py-2.5 rounded-xl border border-stone-800">
        <div>
          <div class="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Progreso Global</div>
          <div id="global-stats-text" class="text-xl font-black text-emerald-400 font-mono">0 / 126 (0%)</div>
        </div>
        <div class="w-32 bg-stone-800 h-2.5 rounded-full overflow-hidden border border-stone-700">
          <div id="global-progress-bar" class="bg-emerald-500 h-full w-0 transition-all duration-300"></div>
        </div>
        <button id="reset-all-btn" class="text-xs bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 px-2.5 py-1.5 rounded-lg transition-colors font-medium">
          Reiniciar
        </button>
      </div>
    </header>

    <!-- Tabs Navigation -->
    <nav class="flex flex-wrap gap-2" id="tabs-container">
      <button data-tab="all" class="tab-btn active px-4 py-2 rounded-xl text-sm font-bold bg-emerald-600 text-white shadow-md transition-all">
        Todos (126)
      </button>
      <button data-tab="minecraft" class="tab-btn px-4 py-2 rounded-xl text-sm font-semibold bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-all">
        Minecraft (16)
      </button>
      <button data-tab="nether" class="tab-btn px-4 py-2 rounded-xl text-sm font-semibold bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-all">
        Nether (23)
      </button>
      <button data-tab="end" class="tab-btn px-4 py-2 rounded-xl text-sm font-semibold bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-all">
        The End (9)
      </button>
      <button data-tab="adventure" class="tab-btn px-4 py-2 rounded-xl text-sm font-semibold bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-all">
        Adventure (47)
      </button>
      <button data-tab="husbandry" class="tab-btn px-4 py-2 rounded-xl text-sm font-semibold bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-all">
        Husbandry (31)
      </button>
    </nav>

    <!-- Filters Bar -->
    <div class="bg-mcCard border border-stone-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
      <div class="relative flex-1 min-w-[240px]">
        <input 
          id="search-input" 
          type="text" 
          placeholder="Buscar logro por nombre, descripción o requisito..." 
          class="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-emerald-500"
        />
      </div>
      <div class="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <select id="status-filter" class="bg-stone-900 border border-stone-700 text-stone-300 rounded-lg px-3 py-2 focus:outline-none">
          <option value="all">Estado: Todos</option>
          <option value="pending">Solo Pendientes</option>
          <option value="completed">Solo Completados</option>
        </select>
        <select id="type-filter" class="bg-stone-900 border border-stone-700 text-stone-300 rounded-lg px-3 py-2 focus:outline-none">
          <option value="all">Tipo: Todos</option>
          <option value="task">Progreso (Task)</option>
          <option value="goal">Meta (Goal)</option>
          <option value="challenge">Desafío (Challenge)</option>
        </select>
      </div>
    </div>

    <!-- Advancements Grid -->
    <main id="advancements-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Generated via JS -->
    </main>
  </div>

  <script>
    const ADVANCEMENTS = ${jsonAdvancements};
    const STORAGE_KEY = 'mc_26_2_advancements_standalone';

    let state = {
      completed: JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'),
      currentTab: 'all',
      search: '',
      status: 'all',
      type: 'all'
    };

    function save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.completed));
      render();
    }

    function toggleAdvancement(id) {
      state.completed[id] = !state.completed[id];
      save();
    }

    function render() {
      const grid = document.getElementById('advancements-grid');
      const search = state.search.toLowerCase();

      let completedCount = 0;
      ADVANCEMENTS.forEach(a => { if (state.completed[a.id]) completedCount++; });
      const totalCount = ADVANCEMENTS.length;
      const pct = Math.round((completedCount / totalCount) * 100);

      document.getElementById('global-stats-text').textContent = completedCount + ' / ' + totalCount + ' (' + pct + '%)';
      document.getElementById('global-progress-bar').style.width = pct + '%';

      const filtered = ADVANCEMENTS.filter(a => {
        if (state.currentTab !== 'all' && a.tab !== state.currentTab) return false;
        if (state.status === 'completed' && !state.completed[a.id]) return false;
        if (state.status === 'pending' && state.completed[a.id]) return false;
        if (state.type !== 'all' && a.type !== state.type) return false;
        if (search) {
          const matchTitle = a.title.toLowerCase().includes(search);
          const matchDesc = a.description.toLowerCase().includes(search);
          const matchReq = a.requirement.toLowerCase().includes(search);
          if (!matchTitle && !matchDesc && !matchReq) return false;
        }
        return true;
      });

      if (filtered.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-12 text-stone-500">No se encontraron logros con los filtros seleccionados.</div>';
        return;
      }

      grid.innerHTML = filtered.map(a => {
        const isDone = !!state.completed[a.id];
        const isChallenge = a.type === 'challenge';
        const isGoal = a.type === 'goal';

        let borderClass = 'border-stone-800 bg-stone-900/60';
        let badgeColor = 'bg-stone-800 text-stone-400 border-stone-700';

        if (isDone) {
          if (isChallenge) {
            borderClass = 'border-purple-500/80 bg-purple-950/30';
            badgeColor = 'bg-purple-900 text-purple-200 border-purple-600';
          } else if (isGoal) {
            borderClass = 'border-amber-500/80 bg-amber-950/30';
            badgeColor = 'bg-amber-900 text-amber-200 border-amber-600';
          } else {
            borderClass = 'border-emerald-500/80 bg-emerald-950/30';
            badgeColor = 'bg-emerald-900 text-emerald-200 border-emerald-600';
          }
        }

        return \`
          <div class="border-2 rounded-xl p-4 transition-all \${borderClass} flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 class="font-bold text-base \${isDone ? 'text-white' : 'text-stone-200'}">\${a.title}</h3>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border \${badgeColor}">\${a.type}</span>
                    <span class="text-xs text-stone-400 capitalize">\${a.tab}</span>
                  </div>
                </div>
                <button 
                  onclick="toggleAdvancement('\${a.id}')"
                  class="p-2 rounded-lg border \${isDone ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-stone-950 text-stone-600 border-stone-800 hover:border-stone-600 hover:text-stone-300'}"
                >
                  \${isDone ? '✓ Hecho' : '○ Marcar'}
                </button>
              </div>
              <p class="text-xs text-stone-300 mb-2">\${a.description}</p>
              <div class="bg-black/40 p-2 rounded text-[11px] text-stone-400 border border-stone-800/80">
                <span class="text-stone-500 font-bold">REQUISITO:</span> \${a.requirement}
              </div>
            </div>
          </div>
        \`;
      }).join('');
    }

    // Event listeners
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => {
          b.className = 'tab-btn px-4 py-2 rounded-xl text-sm font-semibold bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-all';
        });
        btn.className = 'tab-btn active px-4 py-2 rounded-xl text-sm font-bold bg-emerald-600 text-white shadow-md transition-all';
        state.currentTab = btn.getAttribute('data-tab');
        render();
      });
    });

    document.getElementById('search-input').addEventListener('input', (e) => {
      state.search = e.target.value;
      render();
    });

    document.getElementById('status-filter').addEventListener('change', (e) => {
      state.status = e.target.value;
      render();
    });

    document.getElementById('type-filter').addEventListener('change', (e) => {
      state.type = e.target.value;
      render();
    });

    document.getElementById('reset-all-btn').addEventListener('click', () => {
      if (confirm('¿Deseas reiniciar todo tu progreso de logros?')) {
        state.completed = {};
        save();
      }
    });

    render();
  </script>
</body>
</html>`;
}
