# ⛏️ Minecraft 26.2 Advancements Tracker (AA Tool)

Aplicación web interactiva y moderna para el seguimiento y rastreo en tiempo real de los **126 logros oficiales** de Minecraft 26.2, inspirada en la popular herramienta de código abierto `aatool` para speedrunners y completistas.

---

## 🌟 Características Principales

* **Base de datos completa (Minecraft 26.2)**: 126 logros oficiales organizados en las 5 pestañas del juego:
  * 🌿 **Minecraft (Historia)**: 16 logros
  * 🔥 **Nether**: 23 logros
  * 🌌 **The End**: 9 logros
  * 🧭 **Adventure**: 47 logros
  * 🌾 **Husbandry**: 31 logros
* **Sub-criterios interactivos**: Checklists detallados para logros multirequisito como:
  * *Adventuring Time* (55 biomas del Overworld)
  * *Monsters Hunted* (41 monstruos)
  * *A Balanced Diet* (40 alimentos)
  * *Two by Two* (26 animales reproducibles)
  * *A Complete Catalogue* (11 gatos)
  * *The Whole Pack* (9 lobos)
  * *Smithing with Style* (8 plantillas de herrería)
  * *Hot Tourist Destinations* (5 biomas del Nether)
* **3 Modos de Visualización**:
  1. 🔲 **Cuadrícula de Tarjetas**: Estilo visual fiel al juego (bordes normales, metas doradas, desafíos morados).
  2. 🌿 **Árbol Jerárquico**: Estructura de ramas y dependencias entre logros oficial.
  3. 📋 **Tabla Compacta**: Modo lista ultra-rápido para segunda pantalla o speedruns.
* **Cronómetro Speedrun con Splits**: Cronómetro integrado con milisegundos y registro de tiempos parciales.
* **Efectos de Audio y Celebración**: Sonidos sintetizados mediante Web Audio API y confeti al completar desafíos.
* **Persistencia Total**: Guardado automático en `LocalStorage` con importación y exportación de backups en JSON.

---

## 🚀 Modalidades de Entrega y Despliegue

### 📁 Opción 1: Archivo Único Autónomo (`single-file/index.html`)

Si deseas probar la aplicación de inmediato sin instalar nada ni configurar un servidor:

1. Abre el archivo `single-file/index.html` (o usa el botón **"Opción 1: HTML Único"** dentro de la app para descargarlo).
2. Haz doble clic en el archivo descargado para abrirlo directamente en tu navegador favorito (Chrome, Firefox, Edge, Safari).
3. **¡Listo!** Incluye todo el CSS, JavaScript, base de datos y persistencia en LocalStorage sin requerir conexión a internet.

---

### 🐙 Opción 2: Despliegue Automático en GitHub Pages con GitHub Actions

El proyecto ya cuenta con el archivo de configuración `.github/workflows/deploy.yml` para desplegarse automáticamente.

#### Pasos para publicar en tu repositorio de GitHub:

1. **Inicializar y subir el código:**
```bash
# Inicializar repositorio local
git init
git add .
git commit -m "feat: Minecraft 26.2 AA Tool Advancements Tracker"

# Conectar con tu repositorio en GitHub
git branch -M main
git remote add origin https://github.com/TU_USUARIO/minecraft-26-2-aatool.git

# Subir cambios
git push -u origin main
```

2. **Habilitar GitHub Pages:**
   * Entra a tu repositorio en GitHub.
   * Dirígete a **Settings** &gt; **Pages**.
   * En la sección **Build and deployment &gt; Source**, selecciona **GitHub Actions**.

3. **¡Despliegue automático!**
   * Cada vez que realices un `git push` a `main`, el workflow de GitHub Actions compilará la aplicación con Vite y la publicará en `https://TU_USUARIO.github.io/minecraft-26-2-aatool/`.

---

## 🛠️ Estructura del Proyecto

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # Flujo de despliegue automático en GitHub Pages
├── single-file/
│   └── index.html             # Versión monolítica autónoma sin dependencias
├── src/
│   ├── components/            # Componentes modulares de React
│   │   ├── AdvancementCard.tsx
│   │   ├── AdvancementTree.tsx
│   │   ├── CompactTable.tsx
│   │   ├── FiltersBar.tsx
│   │   ├── GitHubModal.tsx
│   │   ├── Header.tsx
│   │   ├── MinecraftIcon.tsx
│   │   ├── SingleFileExportModal.tsx
│   │   ├── SpeedrunTimer.tsx
│   │   ├── SubCriteriaModal.tsx
│   │   └── TabsNav.tsx
│   ├── data/
│   │   └── advancements.ts    # 126 logros oficiales con sub-criterios
│   ├── utils/
│   │   ├── audio.ts           # Sintetizador Web Audio API
│   │   └── generateSingleHtml.ts
│   ├── types.ts               # Definiciones de TypeScript
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
└── index.html
```

---

## 💻 Desarrollo Local

Para correr el proyecto en tu entorno local con Vite:

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```
