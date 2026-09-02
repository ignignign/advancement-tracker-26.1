import { Advancement, TabInfo } from '../types';

export const TABS: TabInfo[] = [
  {
    id: 'minecraft',
    name: 'Minecraft',
    nameEs: 'Minecraft (Historia)',
    subtitle: 'El corazón y la historia del juego',
    icon: 'Pickaxe',
    bgTexture: 'from-stone-900 via-stone-950 to-neutral-950',
    themeColor: {
      primary: 'text-emerald-400',
      border: 'border-emerald-500/40',
      badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50',
      glow: 'shadow-emerald-500/20'
    }
  },
  {
    id: 'nether',
    name: 'Nether',
    nameEs: 'El Nether',
    subtitle: 'Trae ropa de verano...',
    icon: 'Flame',
    bgTexture: 'from-red-950 via-neutral-950 to-orange-950',
    themeColor: {
      primary: 'text-red-400',
      border: 'border-red-500/40',
      badge: 'bg-red-950/80 text-red-300 border-red-700/50',
      glow: 'shadow-red-500/20'
    }
  },
  {
    id: 'end',
    name: 'The End',
    nameEs: 'El Fin (The End)',
    subtitle: '¿O el comienzo?',
    icon: 'Sparkles',
    bgTexture: 'from-purple-950 via-neutral-950 to-fuchsia-950',
    themeColor: {
      primary: 'text-purple-400',
      border: 'border-purple-500/40',
      badge: 'bg-purple-950/80 text-purple-300 border-purple-700/50',
      glow: 'shadow-purple-500/20'
    }
  },
  {
    id: 'adventure',
    name: 'Adventure',
    nameEs: 'Aventura',
    subtitle: 'Aventura, exploración y combate',
    icon: 'Compass',
    bgTexture: 'from-amber-950 via-neutral-950 to-stone-950',
    themeColor: {
      primary: 'text-amber-400',
      border: 'border-amber-500/40',
      badge: 'bg-amber-950/80 text-amber-300 border-amber-700/50',
      glow: 'shadow-amber-500/20'
    }
  },
  {
    id: 'husbandry',
    name: 'Husbandry',
    nameEs: 'Agricultura y Fauna',
    subtitle: 'El mundo está lleno de amigos y comida',
    icon: 'Wheat',
    bgTexture: 'from-lime-950 via-neutral-950 to-green-950',
    themeColor: {
      primary: 'text-lime-400',
      border: 'border-lime-500/40',
      badge: 'bg-lime-950/80 text-lime-300 border-lime-700/50',
      glow: 'shadow-lime-500/20'
    }
  }
];

// Sub-criteria lists for comprehensive checklists
export const BIOMES_55 = [
  'Badlands', 'Bamboo Jungle', 'Beach', 'Birch Forest', 'Cherry Grove',
  'Cold Ocean', 'Dark Forest', 'Deep Cold Ocean', 'Deep Dark', 'Deep Frozen Ocean',
  'Deep Lukewarm Ocean', 'Deep Ocean', 'Desert', 'Dripstone Caves', 'Eroded Badlands',
  'Flower Forest', 'Frozen Ocean', 'Frozen Peaks', 'Frozen River', 'Grove',
  'Ice Spikes', 'Jagged Peaks', 'Jungle', 'Lukewarm Ocean', 'Lush Caves',
  'Mangrove Swamp', 'Meadow', 'Mushroom Fields', 'Ocean', 'Old Growth Birch Forest',
  'Old Growth Pine Taiga', 'Old Growth Spruce Taiga', 'Pale Garden', 'Plains', 'River',
  'Savanna', 'Savanna Plateau', 'Snowy Beach', 'Snowy Plains', 'Snowy Slopes',
  'Snowy Taiga', 'Sparse Jungle', 'Stony Peaks', 'Stony Shore', 'Sunflower Plains',
  'Swamp', 'Taiga', 'Warm Ocean', 'Windswept Forest', 'Windswept Gravelly Hills',
  'Windswept Hills', 'Windswept Savanna', 'Wooded Badlands'
];

export const HOSTILE_MOBS_41 = [
  'Blaze', 'Bogged', 'Breeze', 'Cave Spider', 'Creaking', 'Creeper', 'Drowned',
  'Elder Guardian', 'Ender Dragon', 'Enderman', 'Endermite', 'Evoker', 'Ghast',
  'Guardian', 'Hoglin', 'Husk', 'Magma Cube', 'Phantom', 'Piglin', 'Piglin Brute',
  'Pillager', 'Ravager', 'Shulker', 'Silverfish', 'Skeleton', 'Slime', 'Spider',
  'Stray', 'Vex', 'Vindicator', 'Warden', 'Witch', 'Wither', 'Wither Skeleton',
  'Zoglin', 'Zombie', 'Zombie Villager', 'Zombified Piglin'
];

export const EDIBLE_ITEMS_40 = [
  'Apple', 'Baked Potato', 'Beetroot', 'Beetroot Soup', 'Bread', 'Carrot', 'Chorus Fruit',
  'Cooked Chicken', 'Cooked Cod', 'Cooked Mutton', 'Cooked Porkchop', 'Cooked Rabbit',
  'Cooked Salmon', 'Cookie', 'Dried Kelp', 'Enchanted Golden Apple', 'Golden Apple',
  'Golden Carrot', 'Honey Bottle', 'Melon Slice', 'Mushroom Stew', 'Poisonous Potato',
  'Potato', 'Pufferfish', 'Pumpkin Pie', 'Rabbit Stew', 'Raw Beef', 'Raw Chicken',
  'Raw Cod', 'Raw Mutton', 'Raw Porkchop', 'Raw Rabbit', 'Raw Salmon', 'Rotten Flesh',
  'Spider Eye', 'Steak', 'Suspicious Stew', 'Sweet Berries', 'Glow Berries', 'Tropical Fish'
];

export const BREEDABLE_ANIMALS_26 = [
  'Armadillo', 'Axolotl', 'Bee', 'Camel', 'Cat', 'Chicken', 'Cow', 'Donkey',
  'Fox', 'Frog', 'Goat', 'Horse', 'Llama', 'Mooshroom', 'Mule', 'Ocelot',
  'Panda', 'Pig', 'Rabbit', 'Sheep', 'Sniffer', 'Strider', 'Trader Llama',
  'Turtle', 'Wolf'
];

export const CAT_VARIANTS_11 = [
  'Black', 'British Shorthair', 'Calico', 'Jellie', 'Persian', 'Ragdoll',
  'Red (Tabby)', 'Siamese', 'Tabby', 'Tuxedo', 'White'
];

export const WOLF_VARIANTS_9 = [
  'Pale (Default)', 'Woods', 'Ashen', 'Black', 'Chestnut', 'Rusty',
  'Spotted', 'Striped', 'Snowy'
];

export const SMITHING_TRIMS_8 = [
  'Spire (End City)', 'Snout (Bastion)', 'Rib (Nether Fortress)',
  'Ward (Ancient City)', 'Silence (Ancient City)', 'Vex (Woodland Mansion)',
  'Tide (Ocean Monument)', 'Wayfinder (Trail Ruins)'
];

export const NETHER_BIOMES_5 = [
  'Crimson Forest', 'Warped Forest', 'Soul Sand Valley', 'Nether Wastes', 'Basalt Deltas'
];

export const FROGLIGHTS_3 = [
  'Ochre Froglight (Warm / Orange)',
  'Pearlescent Froglight (Cold / Purple)',
  'Verdant Froglight (Temperate / Green)'
];

export const ADVANCEMENTS: Advancement[] = [
  // ==========================================
  // 1. MINECRAFT TAB (STORY) - 16 TOTAL
  // ==========================================
  {
    id: 'story_root',
    tab: 'minecraft',
    title: 'Minecraft',
    description: 'The heart and story of the game.',
    requirement: 'Tener una Crafting Table en el inventario.',
    type: 'task',
    icon: 'CraftingTable'
  },
  {
    id: 'mine_stone',
    tab: 'minecraft',
    parent: 'story_root',
    title: 'Stone Age',
    description: 'Mine stone with your new pickaxe.',
    requirement: 'Tener Cobblestone, Blackstone o Cobbled Deepslate en el inventario.',
    type: 'task',
    icon: 'Pickaxe'
  },
  {
    id: 'upgrade_tools',
    tab: 'minecraft',
    parent: 'mine_stone',
    title: 'Getting an Upgrade',
    description: 'Construct a better pickaxe.',
    requirement: 'Tener un Stone Pickaxe en el inventario.',
    type: 'task',
    icon: 'Hammer'
  },
  {
    id: 'smelt_iron',
    tab: 'minecraft',
    parent: 'upgrade_tools',
    title: 'Acquire Hardware',
    description: 'Smelt an iron ingot.',
    requirement: 'Tener un Iron Ingot en el inventario.',
    type: 'task',
    icon: 'Anvil'
  },
  {
    id: 'obtain_armor',
    tab: 'minecraft',
    parent: 'smelt_iron',
    title: 'Suit Up',
    description: 'Protect yourself with a piece of iron armor.',
    requirement: 'Tener cualquier pieza de Iron Armor en el inventario.',
    type: 'task',
    icon: 'ShieldCheck'
  },
  {
    id: 'lava_bucket',
    tab: 'minecraft',
    parent: 'smelt_iron',
    title: 'Hot Stuff',
    description: 'Fill a bucket with lava.',
    requirement: 'Tener un Lava Bucket en el inventario.',
    type: 'task',
    icon: 'Flame'
  },
  {
    id: 'iron_tools',
    tab: 'minecraft',
    parent: 'smelt_iron',
    title: "Isn't It Iron Pick?",
    description: 'Upgrade your pickaxe.',
    requirement: 'Tener un Iron Pickaxe en el inventario.',
    type: 'task',
    icon: 'Wrench'
  },
  {
    id: 'deflect_arrow',
    tab: 'minecraft',
    parent: 'obtain_armor',
    title: 'Not Today, Thank You',
    description: 'Block a projectile with a shield.',
    requirement: 'Deflectar un proyectil con un Shield.',
    type: 'task',
    icon: 'Shield'
  },
  {
    id: 'form_obsidian',
    tab: 'minecraft',
    parent: 'lava_bucket',
    title: 'Ice Bucket Challenge',
    description: 'Obtain a block of obsidian.',
    requirement: 'Tener Obsidian en el inventario.',
    type: 'task',
    icon: 'Box'
  },
  {
    id: 'mine_diamond',
    tab: 'minecraft',
    parent: 'iron_tools',
    title: 'Diamonds!',
    description: 'Acquire diamonds.',
    requirement: 'Tener un Diamond en el inventario.',
    type: 'task',
    icon: 'Gem'
  },
  {
    id: 'enter_the_nether',
    tab: 'minecraft',
    parent: 'form_obsidian',
    title: 'We Need to Go Deeper',
    description: 'Build, light, and enter a Nether Portal.',
    requirement: 'Entrar a la dimensión Nether.',
    type: 'task',
    icon: 'Flame'
  },
  {
    id: 'shiny_gear',
    tab: 'minecraft',
    parent: 'mine_diamond',
    title: 'Cover Me with Diamonds',
    description: 'Wear a full suit of diamond armor.',
    requirement: 'Tener Diamond Armor en el inventario.',
    type: 'task',
    icon: 'Sparkles'
  },
  {
    id: 'enchant_item',
    tab: 'minecraft',
    parent: 'mine_diamond',
    title: 'Enchanter',
    description: 'Enchant an item at an Enchanting Table.',
    requirement: 'Usar una Enchanting Table y aplicar un encantamiento.',
    type: 'task',
    icon: 'BookOpen'
  },
  {
    id: 'cure_zombie_villager',
    tab: 'minecraft',
    parent: 'enter_the_nether',
    title: 'Zombie Doctor',
    description: 'Weaken and then cure a Zombie Villager.',
    requirement: 'Usar un Golden Apple en un Zombie Villager debilitado.',
    type: 'goal',
    icon: 'HeartPulse'
  },
  {
    id: 'follow_ender_eye',
    tab: 'minecraft',
    parent: 'enter_the_nether',
    title: 'Eye Spy',
    description: 'Follow an Eye of Ender.',
    requirement: 'Seguir un Eye of Ender hacia un Stronghold.',
    type: 'task',
    icon: 'Eye'
  },
  {
    id: 'enter_the_end',
    tab: 'minecraft',
    parent: 'follow_ender_eye',
    title: 'The End?',
    description: 'Enter The End.',
    requirement: 'Entrar al End Portal.',
    type: 'task',
    icon: 'Sparkles'
  },

  // ==========================================
  // 2. NETHER TAB - 23 TOTAL
  // ==========================================
  {
    id: 'nether_root',
    tab: 'nether',
    title: 'Nether',
    description: 'Bring summer clothes.',
    requirement: 'Entrar al Nether.',
    type: 'task',
    icon: 'Flame'
  },
  {
    id: 'return_to_sender',
    tab: 'nether',
    parent: 'nether_root',
    title: 'Return to Sender',
    description: 'Destroy a Ghast with a fireball.',
    requirement: 'Matar un Ghast reflejando su fireball.',
    type: 'challenge',
    icon: 'Target'
  },
  {
    id: 'find_bastion',
    tab: 'nether',
    parent: 'nether_root',
    title: 'Those Were the Days',
    description: 'Enter a Bastion Remnant.',
    requirement: 'Entrar a un Bastion Remnant.',
    type: 'task',
    icon: 'Castle'
  },
  {
    id: 'obtain_ancient_debris',
    tab: 'nether',
    parent: 'nether_root',
    title: 'Hidden in the Depths',
    description: 'Obtain Ancient Debris.',
    requirement: 'Tener Ancient Debris en el inventario.',
    type: 'task',
    icon: 'Layers'
  },
  {
    id: 'fast_travel',
    tab: 'nether',
    parent: 'nether_root',
    title: 'Subspace Bubble',
    description: 'Use the Nether to travel 7 km in the Overworld.',
    requirement: 'Usar el Nether para viajar al menos 7000 bloques horizontales en el Overworld.',
    type: 'challenge',
    icon: 'FastForward'
  },
  {
    id: 'find_fortress',
    tab: 'nether',
    parent: 'nether_root',
    title: 'A Terrible Fortress',
    description: 'Break into a Nether Fortress.',
    requirement: 'Entrar a un Nether Fortress.',
    type: 'task',
    icon: 'ShieldAlert'
  },
  {
    id: 'obtain_crying_obsidian',
    tab: 'nether',
    parent: 'nether_root',
    title: 'Who is Cutting Onions?',
    description: 'Obtain Crying Obsidian.',
    requirement: 'Tener Crying Obsidian en el inventario.',
    type: 'task',
    icon: 'Droplets'
  },
  {
    id: 'distract_piglin',
    tab: 'nether',
    parent: 'nether_root',
    title: 'Oh Shiny',
    description: 'Distract Piglins with gold.',
    requirement: 'Usar un ítem de oro en un Piglin adulto sin llevar armadura dorada.',
    type: 'task',
    icon: 'Coins'
  },
  {
    id: 'ride_strider',
    tab: 'nether',
    parent: 'nether_root',
    title: 'This Boat Has Legs',
    description: 'Ride a Strider with a Warped Fungus on a Stick.',
    requirement: 'Montar un Strider usando un Warped Fungus on a Stick.',
    type: 'task',
    icon: 'Navigation'
  },
  {
    id: 'uneasy_alliance',
    tab: 'nether',
    parent: 'return_to_sender',
    title: 'Uneasy Alliance',
    description: 'Rescue a Ghast from the Nether, bring it safely home to the Overworld... and then kill it.',
    requirement: 'Matar un Ghast mientras se está en el Overworld.',
    type: 'challenge',
    icon: 'Ghost'
  },
  {
    id: 'loot_bastion',
    tab: 'nether',
    parent: 'find_bastion',
    title: 'War Pigs',
    description: 'Loot a chest in a Bastion Remnant.',
    requirement: 'Abrir un cofre en un Bastion Remnant.',
    type: 'task',
    icon: 'PackageOpen'
  },
  {
    id: 'netherite_armor',
    tab: 'nether',
    parent: 'obtain_ancient_debris',
    title: 'Cover Me in Debris',
    description: 'Wear a full suit of Netherite armor.',
    requirement: 'Tener un set completo de Netherite Armor en el inventario.',
    type: 'challenge',
    icon: 'ShieldCheck'
  },
  {
    id: 'get_wither_skull',
    tab: 'nether',
    parent: 'find_fortress',
    title: 'Spooky Scary Skeleton',
    description: "Obtain a Wither Skeleton's skull.",
    requirement: 'Tener un Wither Skeleton Skull en el inventario.',
    type: 'task',
    icon: 'Skull'
  },
  {
    id: 'obtain_blaze_rod',
    tab: 'nether',
    parent: 'find_fortress',
    title: 'Into Fire',
    description: 'Relieve a Blaze of its rod.',
    requirement: 'Tener un Blaze Rod en el inventario.',
    type: 'task',
    icon: 'Zap'
  },
  {
    id: 'charge_respawn_anchor',
    tab: 'nether',
    parent: 'obtain_crying_obsidian',
    title: 'Not Quite "Nine" Lives',
    description: 'Charge a Respawn Anchor to the maximum.',
    requirement: 'Cargar completamente un Respawn Anchor.',
    type: 'task',
    icon: 'BatteryCharging'
  },
  {
    id: 'ride_strider_in_overworld_lava',
    tab: 'nether',
    parent: 'ride_strider',
    title: 'Feels Like Home',
    description: 'Take a Strider for a loong ride on a lava lake in the Overworld.',
    requirement: 'Montar un Strider en un lago de lava en el Overworld.',
    type: 'task',
    icon: 'Compass'
  },
  {
    id: 'explore_nether',
    tab: 'nether',
    parent: 'nether_root',
    title: 'Hot Tourist Destinations',
    description: 'Visit all Nether biomes.',
    requirement: 'Visitar los 5 biomas del Nether.',
    type: 'challenge',
    icon: 'MapPin',
    subCriteria: NETHER_BIOMES_5.map((biome, i) => ({
      id: `nether_biome_${i}`,
      name: biome
    }))
  },
  {
    id: 'summon_wither',
    tab: 'nether',
    parent: 'get_wither_skull',
    title: 'Withering Heights',
    description: 'Summon the Wither.',
    requirement: 'Invocar al Wither.',
    type: 'task',
    icon: 'Flame'
  },
  {
    id: 'brew_potion',
    tab: 'nether',
    parent: 'obtain_blaze_rod',
    title: 'Local Brewery',
    description: 'Brew a Potion.',
    requirement: 'Fabricar cualquier poción en una Brewing Stand.',
    type: 'task',
    icon: 'FlaskConical'
  },
  {
    id: 'create_beacon',
    tab: 'nether',
    parent: 'summon_wither',
    title: 'Bring Home the Beacon',
    description: 'Construct and place a Beacon.',
    requirement: 'Activar un Beacon sobre una pirámide.',
    type: 'challenge',
    icon: 'Sun'
  },
  {
    id: 'all_potions',
    tab: 'nether',
    parent: 'brew_potion',
    title: 'A Furious Cocktail',
    description: 'Have every potion effect applied at the same time.',
    requirement: 'Tener los 17 efectos de estado activos simultáneamente.',
    type: 'challenge',
    icon: 'Sparkles'
  },
  {
    id: 'create_full_beacon',
    tab: 'nether',
    parent: 'create_beacon',
    title: 'Beaconator',
    description: 'Bring a beacon to full power.',
    requirement: 'Activar un Beacon con una pirámide completa de nivel 4.',
    type: 'challenge',
    icon: 'Flame'
  },
  {
    id: 'all_effects',
    tab: 'nether',
    parent: 'all_potions',
    title: 'How Did We Get Here?',
    description: 'Have every effect applied at the same time.',
    requirement: 'Tener los 34 efectos de estado activos simultáneamente.',
    type: 'challenge',
    hidden: true,
    icon: 'EyeOff'
  },

  // ==========================================
  // 3. THE END TAB - 9 TOTAL
  // ==========================================
  {
    id: 'end_root',
    tab: 'end',
    title: 'The End',
    description: 'Or the beginning?',
    requirement: 'Entrar al End.',
    type: 'task',
    icon: 'Sparkles'
  },
  {
    id: 'kill_dragon',
    tab: 'end',
    parent: 'end_root',
    title: 'Free the End',
    description: 'Good luck.',
    requirement: 'Matar al Ender Dragon.',
    type: 'challenge',
    icon: 'Sword'
  },
  {
    id: 'dragon_egg',
    tab: 'end',
    parent: 'kill_dragon',
    title: 'The Next Generation',
    description: 'Hold the Dragon Egg.',
    requirement: 'Tener el Dragon Egg en el inventario.',
    type: 'goal',
    icon: 'Egg'
  },
  {
    id: 'enter_end_gateway',
    tab: 'end',
    parent: 'kill_dragon',
    title: 'Remote Getaway',
    description: 'Escape the island.',
    requirement: 'Entrar a un End Gateway.',
    type: 'task',
    icon: 'DoorOpen'
  },
  {
    id: 'respawn_dragon',
    tab: 'end',
    parent: 'kill_dragon',
    title: 'The End... Again...',
    description: 'Respawn the Ender Dragon.',
    requirement: 'Invocar al Ender Dragon con End Crystals.',
    type: 'task',
    icon: 'RotateCcw'
  },
  {
    id: 'dragon_breath',
    tab: 'end',
    parent: 'kill_dragon',
    title: 'You Need a Mint',
    description: "Collect Dragon's Breath in a glass bottle.",
    requirement: "Tener Dragon's Breath en el inventario.",
    type: 'task',
    icon: 'Wind'
  },
  {
    id: 'find_end_city',
    tab: 'end',
    parent: 'enter_end_gateway',
    title: 'The City at the End of the Game',
    description: 'Go on in, what could happen?',
    requirement: 'Entrar a un End City.',
    type: 'task',
    icon: 'Building2'
  },
  {
    id: 'elytra',
    tab: 'end',
    parent: 'find_end_city',
    title: "Sky's the Limit",
    description: 'Find Elytra.',
    requirement: 'Tener Elytra en el inventario.',
    type: 'goal',
    icon: 'Feather'
  },
  {
    id: 'levitate',
    tab: 'end',
    parent: 'find_end_city',
    title: 'Great View From Up Here',
    description: 'Levitate up 50 blocks from the attacks of a Shulker.',
    requirement: 'Subir 50 bloques verticales con el efecto Levitation.',
    type: 'challenge',
    icon: 'ArrowUpCircle'
  },

  // ==========================================
  // 4. ADVENTURE TAB - 47 TOTAL
  // ==========================================
  {
    id: 'adventure_root',
    tab: 'adventure',
    title: 'Adventure',
    description: 'Adventure, exploration, and combat.',
    requirement: 'Matar o ser matado por cualquier entidad viviente.',
    type: 'task',
    icon: 'Compass'
  },
  {
    id: 'heart_transplanter',
    tab: 'adventure',
    parent: 'adventure_root',
    title: 'Heart Transplanter',
    description: 'Pale Garden heart placement.',
    requirement: 'Colocar un Creaking Heart entre bloques de Pale Oak Log.',
    type: 'task',
    icon: 'HeartHandshake'
  },
  {
    id: 'voluntary_exile',
    tab: 'adventure',
    parent: 'adventure_root',
    title: 'Voluntary Exile',
    description: 'Kill a raid captain. Maybe consider staying away from villages for a time...',
    requirement: 'Matar un Raid Captain (Pillager, Evoker, Illusioner o Vindicator con Ominous Banner).',
    type: 'task',
    hidden: true,
    icon: 'Flag'
  },
  {
    id: 'lodestone',
    tab: 'adventure',
    parent: 'adventure_root',
    title: 'Country Lode, Take Me Home',
    description: 'Use a Compass on a Lodestone.',
    requirement: 'Usar un Compass en un Lodestone.',
    type: 'task',
    icon: 'Compass'
  },
  {
    id: 'spyglass_at_parrot',
    tab: 'adventure',
    parent: 'adventure_root',
    title: 'Is It a Bird?',
    description: 'Look at a parrot through a spyglass.',
    requirement: 'Apuntar con un Spyglass a un Parrot.',
    type: 'task',
    icon: 'Eye'
  },
  {
    id: 'kill_a_mob',
    tab: 'adventure',
    parent: 'adventure_root',
    title: 'Monster Hunter',
    description: 'Kill any hostile monster.',
    requirement: 'Matar uno de los 41 monstruos de la lista.',
    type: 'task',
    icon: 'Sword'
  },
  {
    id: 'chiseled_bookshelf',
    tab: 'adventure',
    parent: 'adventure_root',
    title: 'The Power of Books',
    description: 'Read the signal of a Chiseled Bookshelf with a Comparator.',
    requirement: 'Activar un comparador conectado a un Chiseled Bookshelf.',
    type: 'task',
    icon: 'Library'
  },
  {
    id: 'trade',
    tab: 'adventure',
    parent: 'adventure_root',
    title: 'What a Deal!',
    description: 'Successfully trade with a Villager.',
    requirement: 'Completar una transacción con un Villager o Wandering Trader.',
    type: 'task',
    icon: 'Coins'
  },
  {
    id: 'trim_armor',
    tab: 'adventure',
    parent: 'adventure_root',
    title: 'Crafting a New Look',
    description: 'Craft a trimmed armor at a Smithing Table.',
    requirement: 'Aplicar cualquier Armor Trim a cualquier pieza de armadura.',
    type: 'task',
    icon: 'Shirt'
  },
  {
    id: 'honey_block_slide',
    tab: 'adventure',
    parent: 'adventure_root',
    title: 'Sticky Situation',
    description: 'Jump into a Honey Block to break your fall.',
    requirement: 'Deslizarse por un Honey Block mientras se cae.',
    type: 'task',
    icon: 'ShieldAlert'
  },
  {
    id: 'shoot_crossbow',
    tab: 'adventure',
    parent: 'adventure_root',
    title: "Ol' Betsy",
    description: 'Shoot a crossbow.',
    requirement: 'Disparar un Crossbow.',
    type: 'task',
    icon: 'Crosshair'
  },
  {
    id: 'lightning_rod_protect_villager',
    tab: 'adventure',
    parent: 'adventure_root',
    title: 'Surge Protector',
    description: 'Protect a Villager from a lightning strike that would have set them on fire using a Lightning Rod.',
    requirement: 'Un rayo atraído por un Lightning Rod no causar incendio, con un Villager ileso cerca.',
    type: 'challenge',
    icon: 'Zap'
  },
  {
    id: 'fall_from_world_height',
    tab: 'adventure',
    parent: 'adventure_root',
    title: 'Caves & Cliffs',
    description: 'Free fall from the top of the world (build limit) to the bottom of the world and survive.',
    requirement: 'Caer desde Y=319 hasta Y=-59 con un Water Bucket.',
    type: 'challenge',
    icon: 'Mountain'
  },
  {
    id: 'brush_suspicious_block',
    tab: 'adventure',
    parent: 'adventure_root',
    title: 'Respecting the Remnants',
    description: 'Brush a Pottery Sherd from a suspicious block.',
    requirement: 'Usar un Brush en Suspicious Sand o Suspicious Gravel para obtener un Pottery Sherd.',
    type: 'task',
    icon: 'Paintbrush'
  },
  {
    id: 'sneak_near_sculk_sensor',
    tab: 'adventure',
    parent: 'adventure_root',
    title: 'Sneak 100',
    description: 'Sneak near a Sculk Sensor or Warden to prevent it from detecting you.',
    requirement: 'Agacharse cerca de un Sculk Sensor, Sculk Shrieker o Warden sin ser detectado.',
    type: 'challenge',
    icon: 'Footprints'
  },
  {
    id: 'sleep_in_bed',
    tab: 'adventure',
    parent: 'adventure_root',
    title: 'Sweet Dreams',
    description: 'Sleep in a bed to change your respawn point.',
    requirement: 'Acostarse en una cama (aunque sea un instante).',
    type: 'task',
    icon: 'Bed'
  },
  {
    id: 'hero_of_the_village',
    tab: 'adventure',
    parent: 'voluntary_exile',
    title: 'Hero of the Village',
    description: 'Successfully defend a village from a raid.',
    requirement: 'Defender con éxito una aldea de una raid.',
    type: 'challenge',
    hidden: true,
    icon: 'Award'
  },
  {
    id: 'spyglass_at_ghast',
    tab: 'adventure',
    parent: 'spyglass_at_parrot',
    title: 'Is It a Balloon?',
    description: 'Look at a Ghast through a spyglass.',
    requirement: 'Apuntar con un Spyglass a un Ghast.',
    type: 'task',
    icon: 'Eye'
  },
  {
    id: 'throw_trident',
    tab: 'adventure',
    parent: 'kill_a_mob',
    title: 'A Throwaway Joke',
    description: 'Throw a Trident at something. Note: Tridents can be retrieved.',
    requirement: 'Matar cualquier mob con un Trident lanzado.',
    type: 'task',
    icon: 'Target'
  },
  {
    id: 'kill_mob_near_sculk_catalyst',
    tab: 'adventure',
    parent: 'kill_a_mob',
    title: 'It Spreads',
    description: 'Kill a mob near a Sculk Catalyst.',
    requirement: 'Matar un mob cerca de un Sculk Catalyst (excepto Ender Dragon).',
    type: 'task',
    icon: 'Sparkles'
  },
  {
    id: 'shoot_arrow',
    tab: 'adventure',
    parent: 'kill_a_mob',
    title: 'Take Aim',
    description: 'Shoot something with an arrow.',
    requirement: 'Matar un mob con una Arrow, Tipped Arrow o Spectral Arrow.',
    type: 'task',
    icon: 'Crosshair'
  },
  {
    id: 'kill_all_mobs',
    tab: 'adventure',
    parent: 'kill_a_mob',
    title: 'Monsters Hunted',
    description: 'Kill one of every hostile monster.',
    requirement: 'Matar uno de cada uno de los 41 monstruos de la lista.',
    type: 'challenge',
    icon: 'Skull',
    subCriteria: HOSTILE_MOBS_41.map((mob, i) => ({
      id: `mob_${i}`,
      name: mob
    }))
  },
  {
    id: 'totem_of_undying',
    tab: 'adventure',
    parent: 'kill_a_mob',
    title: 'Postmortal',
    description: 'Use a Totem of Undying to cheat death.',
    requirement: 'Sobrevivir un golpe fatal gracias a un Totem of Undying.',
    type: 'challenge',
    icon: 'Heart'
  },
  {
    id: 'mob_kabob',
    tab: 'adventure',
    parent: 'kill_a_mob',
    title: 'Mob Kabob',
    description: 'Skewer a mob with a spear.',
    requirement: 'Ensartar un mob con la nueva arma lanza.',
    type: 'goal',
    icon: 'Sword'
  },
  {
    id: 'summon_iron_golem',
    tab: 'adventure',
    parent: 'trade',
    title: 'Hired Help',
    description: 'Summon an Iron Golem to help defend a village.',
    requirement: 'Invocar un Iron Golem.',
    type: 'task',
    icon: 'Shield'
  },
  {
    id: 'trade_at_world_height',
    tab: 'adventure',
    parent: 'trade',
    title: 'Star Trader',
    description: 'Trade with a Villager at the build height limit.',
    requirement: 'Comerciar con un Villager o Wandering Trader estando en Y>318.',
    type: 'task',
    icon: 'Coins'
  },
  {
    id: 'smithing_with_style',
    tab: 'adventure',
    parent: 'trim_armor',
    title: 'Smithing with Style',
    description: 'Apply these smithing templates at least once: Spire, Snout, Rib, Ward, Silence, Vex, Tide, Wayfinder.',
    requirement: 'Aplicar los 8 Armor Trims especificados.',
    type: 'challenge',
    icon: 'Sparkles',
    subCriteria: SMITHING_TRIMS_8.map((trim, i) => ({
      id: `trim_${i}`,
      name: trim
    }))
  },
  {
    id: 'two_birds_one_arrow',
    tab: 'adventure',
    parent: 'shoot_crossbow',
    title: 'Two Birds, One Arrow',
    description: 'Kill two Phantoms with a piercing arrow.',
    requirement: 'Matar dos Phantoms con una sola flecha usando Piercing en un Crossbow.',
    type: 'challenge',
    icon: 'Target'
  },
  {
    id: 'whos_the_pillager_now',
    tab: 'adventure',
    parent: 'shoot_crossbow',
    title: "Who's the Pillager Now?",
    description: 'Give a Pillager a taste of their own medicine.',
    requirement: 'Matar un Pillager con un disparo de Crossbow.',
    type: 'task',
    icon: 'Crosshair'
  },
  {
    id: 'arbalistic',
    tab: 'adventure',
    parent: 'shoot_crossbow',
    title: 'Arbalistic',
    description: 'Kill five unique mobs with one crossbow shot.',
    requirement: 'Matar 5 mobs distintos con un solo disparo de Crossbow.',
    type: 'challenge',
    hidden: true,
    icon: 'Crosshair'
  },
  {
    id: 'craft_decorated_pot',
    tab: 'adventure',
    parent: 'brush_suspicious_block',
    title: 'Careful Restoration',
    description: 'Make a Decorated Pot out of 4 Pottery Sherds.',
    requirement: 'Craftar un Decorated Pot usando 4 Pottery Sherds.',
    type: 'task',
    icon: 'Package'
  },
  {
    id: 'adventuring_time',
    tab: 'adventure',
    parent: 'adventure_root',
    title: 'Adventuring Time',
    description: 'Discover every biome.',
    requirement: 'Visitar los 55 biomas del Overworld.',
    type: 'challenge',
    icon: 'Compass',
    subCriteria: BIOMES_55.map((biome, i) => ({
      id: `biome_${i}`,
      name: biome
    }))
  },
  {
    id: 'play_jukebox_in_meadows',
    tab: 'adventure',
    parent: 'adventuring_time',
    title: 'Sound of Music',
    description: 'Make the Meadows come alive with the sound of music from a Jukebox.',
    requirement: 'Colocar un Music Disc en un Jukebox dentro de un Meadow.',
    type: 'task',
    icon: 'Disc'
  },
  {
    id: 'walk_on_powder_snow',
    tab: 'adventure',
    parent: 'adventuring_time',
    title: 'Light as a Rabbit',
    description: 'Walk on Powder Snow with Leather Boots.',
    requirement: 'Caminar sobre Powder Snow con Leather Boots puestas.',
    type: 'task',
    icon: 'Footprints'
  },
  {
    id: 'spyglass_at_dragon',
    tab: 'adventure',
    parent: 'spyglass_at_ghast',
    title: 'Is It a Plane?',
    description: 'Look at the Ender Dragon through a spyglass.',
    requirement: 'Apuntar con un Spyglass al Ender Dragon.',
    type: 'task',
    icon: 'Eye'
  },
  {
    id: 'lightning_strike_villager',
    tab: 'adventure',
    parent: 'throw_trident',
    title: 'Very Very Frightening',
    description: 'Strike a Villager with lightning.',
    requirement: 'Golpear a un Villager con un rayo invocado por un Trident con Channeling.',
    type: 'challenge',
    icon: 'Zap'
  },
  {
    id: 'sniper_duel',
    tab: 'adventure',
    parent: 'shoot_arrow',
    title: 'Sniper Duel',
    description: 'Kill a Skeleton from at least 50 meters away.',
    requirement: 'Matar un Skeleton desde al menos 50 bloques de distancia horizontal.',
    type: 'challenge',
    icon: 'Crosshair'
  },
  {
    id: 'bullseye',
    tab: 'adventure',
    parent: 'shoot_arrow',
    title: 'Bullseye',
    description: 'Hit the bullseye of a Target block from at least 30 meters away.',
    requirement: 'Disparar el centro de un Target block desde 30 bloques o más.',
    type: 'challenge',
    icon: 'Target'
  },
  {
    id: 'brush_armadillo',
    tab: 'adventure',
    parent: 'brush_suspicious_block',
    title: "Isn't It Scute?",
    description: 'Get an Armadillo Scute from an Armadillo using a Brush.',
    requirement: 'Usar un Brush en un Armadillo para obtener una Armadillo Scute.',
    type: 'task',
    icon: 'Shield'
  },
  {
    id: 'trial_chamber_enter',
    tab: 'adventure',
    parent: 'adventure_root',
    title: 'Minecraft: Trial(s) Edition',
    description: 'Step foot in a Trial Chamber.',
    requirement: 'Entrar a un Trial Chamber.',
    type: 'task',
    icon: 'Dungeon'
  },
  {
    id: 'crafter_crafting_crafter',
    tab: 'adventure',
    parent: 'trial_chamber_enter',
    title: 'Crafters Crafting Crafters',
    description: 'Have a Crafter craft a Crafter.',
    requirement: 'Usar un Crafter para fabricar otro Crafter.',
    type: 'task',
    icon: 'Boxes'
  },
  {
    id: 'scrape_copper_bulb',
    tab: 'adventure',
    parent: 'trial_chamber_enter',
    title: 'Lighten Up',
    description: 'Scrape a Copper Bulb with an axe to make it brighter.',
    requirement: 'Usar cualquier tipo de hacha en un Copper Bulb lit que esté al menos parcialmente oxidado.',
    type: 'task',
    icon: 'Lightbulb'
  },
  {
    id: 'wind_charge_launch',
    tab: 'adventure',
    parent: 'trial_chamber_enter',
    title: 'Who Needs Rockets?',
    description: 'Use a Wind Charge to launch yourself upward at least 7 blocks.',
    requirement: 'Caer al menos 7 bloques desde donde explotó un Wind Charge que te afectó.',
    type: 'challenge',
    icon: 'Wind'
  },
  {
    id: 'open_vault',
    tab: 'adventure',
    parent: 'trial_chamber_enter',
    title: 'Under Lock and Key',
    description: 'Open a Vault using a Trial Key.',
    requirement: 'Usar un Trial Key en un Vault.',
    type: 'task',
    icon: 'Key'
  },
  {
    id: 'open_ominous_vault',
    tab: 'adventure',
    parent: 'open_vault',
    title: 'Revaulting',
    description: 'Open an Ominous Vault using an Ominous Trial Key.',
    requirement: 'Usar un Ominous Trial Key en un Ominous Vault.',
    type: 'goal',
    icon: 'KeyRound'
  },
  {
    id: 'kill_breeze_with_wind_charge',
    tab: 'adventure',
    parent: 'trial_chamber_enter',
    title: 'Blowback',
    description: 'Kill a Breeze using a deflected Wind Charge.',
    requirement: 'Matar un Breeze con un Wind Charge rebotado por el propio Breeze.',
    type: 'challenge',
    icon: 'Wind'
  },
  {
    id: 'mace_overkill',
    tab: 'adventure',
    parent: 'trial_chamber_enter',
    title: 'Over-Overkill',
    description: 'Deal 50 hearts of damage in a single hit using a Mace.',
    requirement: 'Infligir el daño equivalente a 50 corazones de una sola vez con un Mace (smash attack).',
    type: 'challenge',
    icon: 'Hammer'
  },

  // ==========================================
  // 5. HUSBANDRY TAB - 31 TOTAL
  // ==========================================
  {
    id: 'husbandry_root',
    tab: 'husbandry',
    title: 'Husbandry',
    description: 'The world is full of friends and food.',
    requirement: 'Comer cualquier alimento.',
    type: 'task',
    icon: 'Wheat'
  },
  {
    id: 'stay_hydrated',
    tab: 'husbandry',
    parent: 'husbandry_root',
    title: 'Stay Hydrated!',
    description: 'Place a Dried Ghast in water.',
    requirement: 'Colocar un Dried Ghast en agua.',
    type: 'task',
    icon: 'Droplets'
  },
  {
    id: 'bee_nest_campfire',
    tab: 'husbandry',
    parent: 'husbandry_root',
    title: 'Bee Our Guest',
    description: 'Use a Campfire to collect Honey from a Beehive using a Bottle without aggravating the bees.',
    requirement: 'Colocar una Campfire bajo una Beehive o Bee Nest llena y recoger miel con una Glass Bottle.',
    type: 'task',
    icon: 'Flame'
  },
  {
    id: 'breed_an_animal',
    tab: 'husbandry',
    parent: 'husbandry_root',
    title: 'The Parrots and the Bats',
    description: 'Breed two animals together.',
    requirement: 'Reproducir cualquiera de los 27 animales de la lista.',
    type: 'task',
    icon: 'Heart'
  },
  {
    id: 'allay_deliver_item',
    tab: 'husbandry',
    parent: 'husbandry_root',
    title: "You've Got a Friend in Me",
    description: 'Have an Allay deliver items to you.',
    requirement: 'Dar un ítem a un Allay y que te lo devuelva con más ítems.',
    type: 'task',
    hidden: true,
    icon: 'Handshake'
  },
  {
    id: 'ride_boat_with_goat',
    tab: 'husbandry',
    parent: 'husbandry_root',
    title: 'Whatever Floats Your Goat!',
    description: 'Get in a boat with a Goat.',
    requirement: 'Montarse en un bote junto a un Goat.',
    type: 'task',
    icon: 'Ship'
  },
  {
    id: 'tame_an_animal',
    tab: 'husbandry',
    parent: 'husbandry_root',
    title: 'Best Friends Forever',
    description: 'Tame an animal.',
    requirement: 'Domar cualquiera de los 11 animales de la lista.',
    type: 'task',
    icon: 'HeartHandshake'
  },
  {
    id: 'glow_ink_sac_sign',
    tab: 'husbandry',
    parent: 'husbandry_root',
    title: 'Glow and Behold!',
    description: 'Make the text of a sign glow.',
    requirement: 'Usar un Glow Ink Sac en un Sign o Hanging Sign.',
    type: 'task',
    icon: 'Sparkles'
  },
  {
    id: 'catch_fish',
    tab: 'husbandry',
    parent: 'husbandry_root',
    title: 'Fishy Business',
    description: 'Catch a fish.',
    requirement: 'Tener en el inventario Cod, Salmon, Tropical Fish o Pufferfish (no necesariamente pescado con caña).',
    type: 'task',
    icon: 'Fish'
  },
  {
    id: 'move_bee_nest_silk_touch',
    tab: 'husbandry',
    parent: 'bee_nest_campfire',
    title: 'Total Beelocation',
    description: 'Move a Bee Nest, with 3 bees inside, using Silk Touch.',
    requirement: 'Romper un Bee Nest o Beehive con 3 abejas dentro usando Silk Touch.',
    type: 'task',
    icon: 'Package'
  },
  {
    id: 'tadpole_in_bucket',
    tab: 'husbandry',
    parent: 'husbandry_root',
    title: 'Bukkit Bukkit',
    description: 'Catch a Tadpole in a Bucket.',
    requirement: 'Usar un Water Bucket en un Tadpole.',
    type: 'task',
    icon: 'Bucket'
  },
  {
    id: 'sulfur_cube_absorb_tnt',
    tab: 'husbandry',
    parent: 'husbandry_root',
    title: 'Uh Oh',
    description: 'Passive Sulfur Cube absorbs a block of TNT.',
    requirement: 'Que un Sulfur Cube pasivo absorba un bloque de TNT.',
    type: 'task',
    icon: 'Bomb'
  },
  {
    id: 'obtain_sniffer_egg',
    tab: 'husbandry',
    parent: 'husbandry_root',
    title: 'Smells Interesting',
    description: 'Obtain a Sniffer Egg.',
    requirement: 'Tener un Sniffer Egg en el inventario.',
    type: 'task',
    hidden: true,
    icon: 'Egg'
  },
  {
    id: 'plant_seed',
    tab: 'husbandry',
    parent: 'husbandry_root',
    title: 'A Seedy Place',
    description: 'Plant a seed and watch it grow.',
    requirement: 'Plantar cualquiera de las semillas de la lista (incluyendo Torchflower Seeds y Pitcher Pod).',
    type: 'task',
    icon: 'Sprout'
  },
  {
    id: 'wax_on_copper',
    tab: 'husbandry',
    parent: 'husbandry_root',
    title: 'Wax On',
    description: 'Apply Honeycomb to a Copper block.',
    requirement: 'Usar Honeycomb en cualquiera de los 15 bloques de cobre enceables.',
    type: 'task',
    icon: 'Shield'
  },
  {
    id: 'breed_all_animals',
    tab: 'husbandry',
    parent: 'breed_an_animal',
    title: 'Two by Two',
    description: 'Breed all the animals.',
    requirement: 'Reproducir una pareja de cada uno de los 26 animales de la lista.',
    type: 'challenge',
    icon: 'Heart',
    subCriteria: BREEDABLE_ANIMALS_26.map((animal, i) => ({
      id: `animal_${i}`,
      name: animal
    }))
  },
  {
    id: 'allay_drop_cake_note_block',
    tab: 'husbandry',
    parent: 'allay_deliver_item',
    title: 'Birthday Song',
    description: 'Have an Allay drop a Cake at a Note Block.',
    requirement: 'Que un Allay que recibió un pastel del jugador deje caer otro pastel en un Note Block.',
    type: 'task',
    hidden: true,
    icon: 'Cake'
  },
  {
    id: 'tame_all_cats',
    tab: 'husbandry',
    parent: 'tame_an_animal',
    title: 'A Complete Catalogue',
    description: 'Tame all cat variants.',
    requirement: 'Domar las 11 variantes de Cat.',
    type: 'challenge',
    icon: 'Cat',
    subCriteria: CAT_VARIANTS_11.map((cat, i) => ({
      id: `cat_${i}`,
      name: cat
    }))
  },
  {
    id: 'catch_fish_bucket',
    tab: 'husbandry',
    parent: 'catch_fish',
    title: 'Tactical Fishing',
    description: 'Catch a fish, without a fishing rod.',
    requirement: 'Usar un Water Bucket en un pez vivo para capturarlo.',
    type: 'task',
    icon: 'Fish'
  },
  {
    id: 'lead_all_frogs',
    tab: 'husbandry',
    parent: 'tadpole_in_bucket',
    title: 'When the Squad Hops into Town',
    description: 'Get a lead on all Frogs.',
    requirement: 'Poner una Lead a 4 Frogs (no necesitan estar atadas a la vez).',
    type: 'task',
    icon: 'Link'
  },
  {
    id: 'feed_snifflet',
    tab: 'husbandry',
    parent: 'obtain_sniffer_egg',
    title: 'Little Sniffs',
    description: 'Feed a Snifflet.',
    requirement: 'Dar comida a un Snifflet.',
    type: 'task',
    hidden: true,
    icon: 'Sprout'
  },
  {
    id: 'balanced_diet',
    tab: 'husbandry',
    parent: 'husbandry_root',
    title: 'A Balanced Diet',
    description: "Eat everything that is edible, even if it's not good for you.",
    requirement: 'Comer cada uno de los 40 alimentos de la lista.',
    type: 'challenge',
    icon: 'Apple',
    subCriteria: EDIBLE_ITEMS_40.map((food, i) => ({
      id: `food_${i}`,
      name: food
    }))
  },
  {
    id: 'netherite_hoe_till_earth',
    tab: 'husbandry',
    parent: 'husbandry_root',
    title: 'Serious Dedication',
    description: 'Use a Netherite hoe to till the earth.',
    requirement: 'Tener un Netherite Hoe en el inventario.',
    type: 'challenge',
    icon: 'Shovel'
  },
  {
    id: 'wax_off_copper',
    tab: 'husbandry',
    parent: 'wax_on_copper',
    title: 'Wax Off',
    description: 'Scrape wax off a Copper block.',
    requirement: 'Usar un Axe en cualquiera de los 15 bloques de cobre enceados para retirar la cera.',
    type: 'task',
    icon: 'Sparkles'
  },
  {
    id: 'catch_axolotl_bucket',
    tab: 'husbandry',
    parent: 'catch_fish_bucket',
    title: 'The Cutest Predator',
    description: 'Catch an Axolotl in a Bucket.',
    requirement: 'Usar un Water Bucket en un Axolotl.',
    type: 'task',
    icon: 'Heart'
  },
  {
    id: 'froglights_all',
    tab: 'husbandry',
    parent: 'lead_all_frogs',
    title: 'With Our Powers Combined!',
    description: 'Have a full set of Froglights in your inventory.',
    requirement: 'Tener los 3 tipos de Froglight (ochre, pearlescent, verdant) en el inventario a la vez.',
    type: 'goal',
    icon: 'Sun',
    subCriteria: FROGLIGHTS_3.map((froglight, i) => ({
      id: `froglight_${i}`,
      name: froglight
    }))
  },
  {
    id: 'plant_sniffer_seed',
    tab: 'husbandry',
    parent: 'feed_snifflet',
    title: 'Planting the Past',
    description: 'Plant any Sniffer seed.',
    requirement: 'Plantar Torchflower Seeds o Pitcher Pod.',
    type: 'task',
    hidden: true,
    icon: 'Flower2'
  },
  {
    id: 'axolotl_healing_friendship',
    tab: 'husbandry',
    parent: 'catch_axolotl_bucket',
    title: 'The Healing Power of Friendship!',
    description: 'Emerge from battle with your Axolotl.',
    requirement: 'Matar un mob mientras el jugador tiene el efecto Regeneration otorgado por un Axolotl.',
    type: 'task',
    icon: 'HeartHandshake'
  },
  {
    id: 'repair_wolf_armor',
    tab: 'husbandry',
    parent: 'husbandry_root',
    title: 'Good as New',
    description: 'Repair a damaged Wolf Armor to full durability.',
    requirement: 'Reparar Wolf Armor hasta durabilidad completa usando Armadillo Scutes.',
    type: 'task',
    icon: 'ShieldCheck'
  },
  {
    id: 'tame_all_wolf_variants',
    tab: 'husbandry',
    parent: 'tame_an_animal',
    title: 'The Whole Pack',
    description: 'Tame one of each variant of Wolf.',
    requirement: 'Domar las 9 variantes de Wolf.',
    type: 'challenge',
    icon: 'Dog',
    subCriteria: WOLF_VARIANTS_9.map((wolf, i) => ({
      id: `wolf_${i}`,
      name: wolf
    }))
  },
  {
    id: 'shear_wolf_armor',
    tab: 'husbandry',
    parent: 'repair_wolf_armor',
    title: 'Shear Brilliance',
    description: 'Remove Wolf Armor from a Wolf using Shears.',
    requirement: 'Usar Shears en un lobo con Wolf Armor para quitársela.',
    type: 'task',
    icon: 'Scissors'
  }
];
