# ⛏️ Minecraft 26.2 Advancements Tracker (AA Tool)

An interactive web application for tracking all **126 official Minecraft 26.2 advancements** in real time, inspired by `aatool` for All-Advancements speedrunners and completionists.

---

## 🌟 English Version

### 🚀 Key Features
* **Full 26.2 Database**: 126 verified advancements across all 5 official tabs:
  * 🌿 **Story**: 16 advancements
  * 🔥 **Nether**: 23 advancements
  * 🌌 **The End**: 9 advancements
  * 🧭 **Adventure**: 47 advancements
  * 🌾 **Husbandry**: 31 advancements
* **Live World Auto-Sync**: Monitors your world's `advancements/<UUID>.json` folder in real time via the File System Access API. Achievements and sub-criteria check off automatically as you play.
* **Detailed Sub-Criteria Checklists**:
  * *Adventuring Time* (55 Overworld Biomes)
  * *Monsters Hunted* (41 Hostile Mobs)
  * *A Balanced Diet* (40 Food Items)
  * *Two by Two* (26 Breedable Animals)
  * *A Complete Catalogue* (11 Cats)
  * *The Whole Pack* (9 Wolves)
  * *Smithing with Style* (8 Armor Trims)
  * *Hot Tourist Destinations* (5 Nether Biomes)
* **3 Visualization Modes**: Card Grid, Official Tree Hierarchy, and Fast Compact Table.
* **Speedrun Timer with Splits**: Millisecond-accurate timer with tab completion tracking.
* **Audio & Confetti**: Synthesized Web Audio sound effects and celebratory animations.
* **Dual Delivery**:
  * **Interactive Web App**: Full React SPA with live world folder watcher.
  * **Single Standalone File (`single-file/index.html`)**: Complete zero-dependency offline HTML file.

### 📁 How to Auto-Sync with Your Minecraft World
1. Click **"Auto-Sync"** or **"Conectar Mundo"** in the top bar.
2. Select your world's `advancements` folder:
   * **Windows**: `%appdata%\.minecraft\saves\<YourWorld>\advancements`
   * **macOS**: `~/Library/Application Support/minecraft/saves/<YourWorld>/advancements`
   * **Linux**: `~/.minecraft/saves/<YourWorld>/advancements`
3. As you unlock advancements in the game, the tracker automatically updates with sounds and confetti!

---

## 🌟 Versión en Español

### 🚀 Características Principales
* **Base de datos 26.2 Completa**: 126 logros oficiales verificados organizados en las 5 pestañas del juego:
  * 🌿 **Minecraft (Historia)**: 16 logros
  * 🔥 **Nether**: 23 logros
  * 🌌 **The End**: 9 logros
  * 🧭 **Adventure**: 47 logros
  * 🌾 **Husbandry**: 31 logros
* **Sincronización Automática en Vivo**: Monitorea la carpeta `advancements/<UUID>.json` de tu mundo local en tiempo real con File System Access API. Los logros y sub-criterios se marcan solos mientras juegas.
* **Checklists de Sub-criterios Detallados**:
  * *Adventuring Time* (55 biomas del Overworld)
  * *Monsters Hunted* (41 monstruos)
  * *A Balanced Diet* (40 alimentos)
  * *Two by Two* (26 animales reproducibles)
  * *A Complete Catalogue* (11 gatos)
  * *The Whole Pack* (9 lobos)
  * *Smithing with Style* (8 plantillas de herrería)
  * *Hot Tourist Destinations* (5 biomas del Nether)
* **3 Modos de Visualización**: Cuadrícula de Tarjetas, Árbol Jerárquico Oficial y Tabla Compacta rápida.
* **Cronómetro Speedrun**: Cronómetro con milisegundos y registro de splits por pestaña.
* **Audio y Confeti**: Efectos sonoros con Web Audio API y animación de confeti para desafíos.
* **Doble Entrega**:
  * **App Web React**: Versión completa con panel de monitoreo y ajustes.
  * **Archivo Único Autónomo (`single-file/index.html`)**: Versión monolítica 100% offline sin dependencias.

### 📁 Cómo Sincronizar Automáticamente con tu Mundo
1. Haz clic en **"Auto-Sync"** o **"Conectar Mundo"** en la barra superior.
2. Selecciona la carpeta `advancements` de tu mundo:
   * **Windows**: `%appdata%\.minecraft\saves\<TuMundo>\advancements`
   * **macOS**: `~/Library/Application Support/minecraft/saves/<TuMundo>/advancements`
   * **Linux**: `~/.minecraft/saves/<TuMundo>/advancements`
3. ¡Listo! Cada vez que consigas un logro en Minecraft, la app lo detectará en vivo, lo marcará y reproducirá el sonido de victoria.
