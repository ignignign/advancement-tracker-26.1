export type TabId = 'minecraft' | 'nether' | 'end' | 'adventure' | 'husbandry';

export type AdvancementType = 'task' | 'goal' | 'challenge';

export interface SubCriterion {
  id: string;
  name: string;
  description?: string;
  category?: string;
}

export interface Advancement {
  id: string;
  tab: TabId;
  title: string;
  description: string;
  requirement: string;
  type: AdvancementType;
  hidden?: boolean;
  parent?: string; // parent advancement id for tree structure
  icon: string; // Minecraft item / entity visual tag or lucide fallback
  iconColor?: string;
  subCriteria?: SubCriterion[];
}

export interface TabInfo {
  id: TabId;
  name: string;
  nameEs: string;
  subtitle: string;
  icon: string;
  bgTexture: string;
  themeColor: {
    primary: string;
    border: string;
    badge: string;
    glow: string;
  };
}

export interface TrackerState {
  completed: Record<string, boolean>;
  subCriteriaProgress: Record<string, Record<string, boolean>>; // [advancementId][criterionId] = boolean
  timestamps: Record<string, number>; // completion timestamp
  customNotes?: Record<string, string>;
}

export type StatusFilter = 'all' | 'pending' | 'completed';
export type TypeFilter = 'all' | 'task' | 'goal' | 'challenge' | 'hidden';
export type ViewMode = 'grid' | 'tree' | 'compact';
