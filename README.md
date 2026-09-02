#  Minecraft 26.2 Advancements Tracker (AA Tool)

An interactive web application for tracking all **126 official Minecraft 26.2 advancements** in real time, inspired by `aatool` for All-Advancements speedrunners and completionists.

---

##  English Version

###  Key Features
* **Full 26.2 Database**: 126 verified advancements across all 5 official tabs:
  *  **Story**: 16 advancements
  *  **Nether**: 23 advancements
  *  **The End**: 9 advancements
  *  **Adventure**: 47 advancements
  *  **Husbandry**: 31 advancements
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

###  How to Auto-Sync with Your Minecraft World
1. Click **"Auto-Sync"** or **"Conectar Mundo"** in the top bar.
2. Select your world's `advancements` folder:
   * **Windows**: `%appdata%\.minecraft\saves\<YourWorld>\advancements`
   * **macOS**: `~/Library/Application Support/minecraft/saves/<YourWorld>/advancements`
   * **Linux**: `~/.minecraft/saves/<YourWorld>/advancements`
3. As you unlock advancements in the game, the tracker automatically updates with sounds and confetti!

---

##  Versin en Espaol

###  Caractersticas Principales
* **Base de datos 26.2 Completa**: 126 logros oficiales verificados organizados en las 5 pestaas del juego:
  *  **Minecraft (Historia)**: 16 logros
  *  **Nether**: 23 logros
  *  **The End**: 9 logros
  *  **Adventure**: 47 logros
  *  **Husbandry**: 31 logros
* **Sincronizacin Automtica en Vivo**: Monitorea la carpeta `advancements/<UUID>.json` de tu mundo local en tiempo real con File System Access API. Los logros y sub-criterios se marcan solos mientras juegas.
* **Checklists de Sub-criterios Detallados**:
  * *Adventuring Time* (55 biomas del Overworld)
  * *Monsters Hunted* (41 monstruos)
  * *A Balanced Diet* (40 alimentos)
  * *Two by Two* (26 animales reproducibles)
  * *A Complete Catalogue* (11 gatos)
  * *The Whole Pack* (9 lobos)
  * *Smithing with Style* (8 plantillas de herrera)
  * *Hot Tourist Destinations* (5 biomas del Nether)
* **3 Modos de Visualizacin**: Cuadrcula de Tarjetas, rbol Jerrquico Oficial y Tabla Compacta rpida.
* **Cronmetro Speedrun**: Cronmetro con milisegundos y registro de splits por pestaa.
* **Audio y Confeti**: Efectos sonoros con Web Audio API y animacin de confeti para desafos.
* **Doble Entrega**:
  * **App Web React**: Versin completa con panel de monitoreo y ajustes.
  * **Archivo nico Autnomo (`single-file/index.html`)**: Versin monoltica 100% offline sin dependencias.

###  Cmo Sincronizar Automticamente con tu Mundo
1. Haz clic en **"Auto-Sync"** o **"Conectar Mundo"** en la barra superior.
2. Selecciona la carpeta `advancements` de tu mundo:
   * **Windows**: `%appdata%\.minecraft\saves\<TuMundo>\advancements`
   * **macOS**: `~/Library/Application Support/minecraft/saves/<TuMundo>/advancements`
   * **Linux**: `~/.minecraft/saves/<TuMundo>/advancements`
3. Listo! Cada vez que consigas un logro en Minecraft, la app lo detectar en vivo, lo marcar y reproducir el sonido de victoria.
