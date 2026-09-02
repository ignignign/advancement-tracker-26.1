import { ADVANCEMENTS } from '../data/advancements';
import { TrackerState } from '../types';

export interface MinecraftAdvancementEntry {
  criteria?: Record<string, string>;
  done?: boolean;
}

export interface MinecraftAdvancementsJson {
  [key: string]: MinecraftAdvancementEntry | number | undefined;
  DataVersion?: number;
}

export interface SyncResult {
  completed: Record<string, boolean>;
  subCriteriaProgress: Record<string, Record<string, boolean>>;
  timestamps: Record<string, number>;
  newlyCompletedAdvancementIds: string[];
  totalParsed: number;
}

// Normalizes strings for matching criteria (e.g. "minecraft:cherry_grove" -> "cherry grove")
function normalizeKey(key: string): string {
  return key
    .toLowerCase()
    .replace(/^minecraft:/, '')
    .replace(/[_-]/g, ' ')
    .trim();
}

// Mapping from standard Minecraft resource location to our advancement IDs
export const MINECRAFT_KEY_TO_APP_ID: Record<string, string> = {
  // Minecraft Story
  'minecraft:story/root': 'story_root',
  'minecraft:story/mine_stone': 'mine_stone',
  'minecraft:story/upgrade_tools': 'upgrade_tools',
  'minecraft:story/smelt_iron': 'smelt_iron',
  'minecraft:story/obtain_armor': 'obtain_armor',
  'minecraft:story/lava_bucket': 'lava_bucket',
  'minecraft:story/iron_tools': 'iron_tools',
  'minecraft:story/deflect_arrow': 'deflect_arrow',
  'minecraft:story/form_obsidian': 'form_obsidian',
  'minecraft:story/mine_diamond': 'mine_diamond',
  'minecraft:story/enter_the_nether': 'enter_the_nether',
  'minecraft:story/shiny_gear': 'shiny_gear',
  'minecraft:story/enchant_item': 'enchant_item',
  'minecraft:story/cure_zombie_villager': 'cure_zombie_villager',
  'minecraft:story/follow_ender_eye': 'follow_ender_eye',
  'minecraft:story/enter_the_end': 'enter_the_end',

  // Nether
  'minecraft:nether/root': 'nether_root',
  'minecraft:nether/return_to_sender': 'return_to_sender',
  'minecraft:nether/find_bastion': 'find_bastion',
  'minecraft:nether/obtain_ancient_debris': 'obtain_ancient_debris',
  'minecraft:nether/fast_travel': 'fast_travel',
  'minecraft:nether/find_fortress': 'find_fortress',
  'minecraft:nether/obtain_crying_obsidian': 'obtain_crying_obsidian',
  'minecraft:nether/distract_piglin': 'distract_piglin',
  'minecraft:nether/ride_strider': 'ride_strider',
  'minecraft:nether/uneasy_alliance': 'uneasy_alliance',
  'minecraft:nether/loot_bastion': 'loot_bastion',
  'minecraft:nether/netherite_armor': 'netherite_armor',
  'minecraft:nether/get_wither_skull': 'get_wither_skull',
  'minecraft:nether/obtain_blaze_rod': 'obtain_blaze_rod',
  'minecraft:nether/charge_respawn_anchor': 'charge_respawn_anchor',
  'minecraft:nether/ride_strider_in_overworld_lava': 'ride_strider_in_overworld_lava',
  'minecraft:nether/explore_nether': 'explore_nether',
  'minecraft:nether/summon_wither': 'summon_wither',
  'minecraft:nether/brew_potion': 'brew_potion',
  'minecraft:nether/create_beacon': 'create_beacon',
  'minecraft:nether/all_potions': 'all_potions',
  'minecraft:nether/create_full_beacon': 'create_full_beacon',
  'minecraft:nether/all_effects': 'all_effects',

  // The End
  'minecraft:end/root': 'end_root',
  'minecraft:end/kill_dragon': 'kill_dragon',
  'minecraft:end/dragon_egg': 'dragon_egg',
  'minecraft:end/enter_end_gateway': 'enter_end_gateway',
  'minecraft:end/respawn_dragon': 'respawn_dragon',
  'minecraft:end/dragon_breath': 'dragon_breath',
  'minecraft:end/find_end_city': 'find_end_city',
  'minecraft:end/elytra': 'elytra',
  'minecraft:end/levitate': 'levitate',

  // Adventure
  'minecraft:adventure/root': 'adventure_root',
  'minecraft:adventure/heart_transplanter': 'heart_transplanter',
  'minecraft:adventure/voluntary_exile': 'voluntary_exile',
  'minecraft:adventure/lodestone': 'lodestone',
  'minecraft:adventure/spyglass_at_parrot': 'spyglass_at_parrot',
  'minecraft:adventure/kill_a_mob': 'kill_a_mob',
  'minecraft:adventure/chiseled_bookshelf': 'chiseled_bookshelf',
  'minecraft:adventure/trade': 'trade',
  'minecraft:adventure/trim_armor': 'trim_armor',
  'minecraft:adventure/honey_block_slide': 'honey_block_slide',
  'minecraft:adventure/shoot_crossbow': 'shoot_crossbow',
  'minecraft:adventure/lightning_rod_protect_villager': 'lightning_rod_protect_villager',
  'minecraft:adventure/fall_from_world_height': 'fall_from_world_height',
  'minecraft:adventure/brush_suspicious_block': 'brush_suspicious_block',
  'minecraft:adventure/sneak_near_sculk_sensor': 'sneak_near_sculk_sensor',
  'minecraft:adventure/sleep_in_bed': 'sleep_in_bed',
  'minecraft:adventure/hero_of_the_village': 'hero_of_the_village',
  'minecraft:adventure/spyglass_at_ghast': 'spyglass_at_ghast',
  'minecraft:adventure/throw_trident': 'throw_trident',
  'minecraft:adventure/kill_mob_near_sculk_catalyst': 'kill_mob_near_sculk_catalyst',
  'minecraft:adventure/shoot_arrow': 'shoot_arrow',
  'minecraft:adventure/kill_all_mobs': 'kill_all_mobs',
  'minecraft:adventure/totem_of_undying': 'totem_of_undying',
  'minecraft:adventure/mob_kabob': 'mob_kabob',
  'minecraft:adventure/summon_iron_golem': 'summon_iron_golem',
  'minecraft:adventure/trade_at_world_height': 'trade_at_world_height',
  'minecraft:adventure/smithing_with_style': 'smithing_with_style',
  'minecraft:adventure/two_birds_one_arrow': 'two_birds_one_arrow',
  'minecraft:adventure/whos_the_pillager_now': 'whos_the_pillager_now',
  'minecraft:adventure/arbalistic': 'arbalistic',
  'minecraft:adventure/craft_decorated_pot': 'craft_decorated_pot',
  'minecraft:adventure/adventuring_time': 'adventuring_time',
  'minecraft:adventure/play_jukebox_in_meadows': 'play_jukebox_in_meadows',
  'minecraft:adventure/walk_on_powder_snow': 'walk_on_powder_snow',
  'minecraft:adventure/spyglass_at_dragon': 'spyglass_at_dragon',
  'minecraft:adventure/lightning_strike_villager': 'lightning_strike_villager',
  'minecraft:adventure/sniper_duel': 'sniper_duel',
  'minecraft:adventure/bullseye': 'bullseye',
  'minecraft:adventure/brush_armadillo': 'brush_armadillo',
  'minecraft:adventure/trial_chamber_enter': 'trial_chamber_enter',
  'minecraft:adventure/crafter_crafting_crafter': 'crafter_crafting_crafter',
  'minecraft:adventure/scrape_copper_bulb': 'scrape_copper_bulb',
  'minecraft:adventure/wind_charge_launch': 'wind_charge_launch',
  'minecraft:adventure/open_vault': 'open_vault',
  'minecraft:adventure/open_ominous_vault': 'open_ominous_vault',
  'minecraft:adventure/kill_breeze_with_wind_charge': 'kill_breeze_with_wind_charge',
  'minecraft:adventure/mace_overkill': 'mace_overkill',

  // Husbandry
  'minecraft:husbandry/root': 'husbandry_root',
  'minecraft:husbandry/stay_hydrated': 'stay_hydrated',
  'minecraft:husbandry/bee_nest_campfire': 'bee_nest_campfire',
  'minecraft:husbandry/breed_an_animal': 'breed_an_animal',
  'minecraft:husbandry/allay_deliver_item': 'allay_deliver_item',
  'minecraft:husbandry/ride_boat_with_goat': 'ride_boat_with_goat',
  'minecraft:husbandry/tame_an_animal': 'tame_an_animal',
  'minecraft:husbandry/glow_ink_sac_sign': 'glow_ink_sac_sign',
  'minecraft:husbandry/catch_fish': 'catch_fish',
  'minecraft:husbandry/move_bee_nest_silk_touch': 'move_bee_nest_silk_touch',
  'minecraft:husbandry/tadpole_in_bucket': 'tadpole_in_bucket',
  'minecraft:husbandry/sulfur_cube_absorb_tnt': 'sulfur_cube_absorb_tnt',
  'minecraft:husbandry/obtain_sniffer_egg': 'obtain_sniffer_egg',
  'minecraft:husbandry/plant_seed': 'plant_seed',
  'minecraft:husbandry/wax_on_copper': 'wax_on_copper',
  'minecraft:husbandry/breed_all_animals': 'breed_all_animals',
  'minecraft:husbandry/allay_drop_cake_note_block': 'allay_drop_cake_note_block',
  'minecraft:husbandry/tame_all_cats': 'tame_all_cats',
  'minecraft:husbandry/catch_fish_bucket': 'catch_fish_bucket',
  'minecraft:husbandry/lead_all_frogs': 'lead_all_frogs',
  'minecraft:husbandry/feed_snifflet': 'feed_snifflet',
  'minecraft:husbandry/balanced_diet': 'balanced_diet',
  'minecraft:husbandry/netherite_hoe_till_earth': 'netherite_hoe_till_earth',
  'minecraft:husbandry/wax_off_copper': 'wax_off_copper',
  'minecraft:husbandry/catch_axolotl_bucket': 'catch_axolotl_bucket',
  'minecraft:husbandry/froglights_all': 'froglights_all',
  'minecraft:husbandry/plant_sniffer_seed': 'plant_sniffer_seed',
  'minecraft:husbandry/axolotl_healing_friendship': 'axolotl_healing_friendship',
  'minecraft:husbandry/repair_wolf_armor': 'repair_wolf_armor',
  'minecraft:husbandry/tame_all_wolf_variants': 'tame_all_wolf_variants',
  'minecraft:husbandry/shear_wolf_armor': 'shear_wolf_armor',
};

// Build reverse lookup index for fuzzy matching
const ADVANCEMENT_BY_ID = new Map(ADVANCEMENTS.map(a => [a.id, a]));

export function parseMinecraftAdvancementsJson(
  rawJson: Record<string, any>,
  previousState?: TrackerState
): SyncResult {
  const completed: Record<string, boolean> = { ...(previousState?.completed || {}) };
  const subCriteriaProgress: Record<string, Record<string, boolean>> = {
    ...(previousState?.subCriteriaProgress || {})
  };
  const timestamps: Record<string, number> = { ...(previousState?.timestamps || {}) };
  const newlyCompletedAdvancementIds: string[] = [];
  let totalParsed = 0;

  for (const [rawKey, entry] of Object.entries(rawJson)) {
    if (rawKey === 'DataVersion' || typeof entry !== 'object' || entry === null) {
      continue;
    }

    // Resolve app advancement ID
    let appId = MINECRAFT_KEY_TO_APP_ID[rawKey];
    if (!appId) {
      // Fallback matching without namespace
      const withoutNs = rawKey.replace(/^minecraft:/, '');
      const parts = withoutNs.split('/');
      const leafName = parts[parts.length - 1];

      // Try direct match or compound match
      if (ADVANCEMENT_BY_ID.has(leafName)) {
        appId = leafName;
      } else if (ADVANCEMENT_BY_ID.has(`${parts[0]}_${leafName}`)) {
        appId = `${parts[0]}_${leafName}`;
      }
    }

    if (!appId || !ADVANCEMENT_BY_ID.has(appId)) {
      continue;
    }

    totalParsed++;
    const adv = ADVANCEMENT_BY_ID.get(appId)!;
    const isDone = !!entry.done;

    // Check if newly completed
    if (isDone && !completed[appId]) {
      newlyCompletedAdvancementIds.push(appId);
      timestamps[appId] = Date.now();
    }
    completed[appId] = isDone;

    // Parse sub-criteria if available
    if (adv.subCriteria && adv.subCriteria.length > 0) {
      const criteriaObj: Record<string, string> = entry.criteria || {};
      const subMap: Record<string, boolean> = { ...(subCriteriaProgress[appId] || {}) };

      // Map criteria keys
      const criteriaKeysNormalized = Object.keys(criteriaObj).map(k => ({
        original: k,
        normalized: normalizeKey(k)
      }));

      adv.subCriteria.forEach(subItem => {
        const subItemNameNorm = normalizeKey(subItem.name);
        const subItemIdNorm = normalizeKey(subItem.id);

        const isFound = criteriaKeysNormalized.some(c =>
          c.normalized === subItemNameNorm ||
          c.normalized === subItemIdNorm ||
          c.normalized.includes(subItemNameNorm) ||
          subItemNameNorm.includes(c.normalized) ||
          c.original.toLowerCase().includes(subItem.id.toLowerCase())
        );

        if (isFound || isDone) {
          subMap[subItem.id] = true;
        }
      });

      subCriteriaProgress[appId] = subMap;
    }
  }

  return {
    completed,
    subCriteriaProgress,
    timestamps,
    newlyCompletedAdvancementIds,
    totalParsed
  };
}

export interface AutoWatcherStatus {
  active: boolean;
  folderName: string | null;
  fileName: string | null;
  lastSyncTime: number | null;
  error: string | null;
  totalSyncedCount: number;
}
