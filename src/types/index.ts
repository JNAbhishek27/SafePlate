export type AllergenSeverity = 'danger' | 'warning' | 'safe';

export interface AllergenTrigger {
  name: string;
  category: 'gluten' | 'peanut_treenut' | 'dairy' | 'soy' | 'egg' | 'other';
  severity: AllergenSeverity;
  reason: string;
  foundInIngredient?: string;
  safeAlternative?: string;
}

export interface AnalysisResult {
  status: AllergenSeverity;
  headline: string;
  summary: string;
  triggers: AllergenTrigger[];
  crossContaminationRisks: string[];
  safePreparationNotes: string[];
  swapSuggestions: { original: string; replacement: string; reason: string }[];
  modelUsed: string;
  latencyMs: number;
  tokensProcessed: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  category: 'Dinner' | 'Lunch' | 'Breakfast' | 'Snack';
  safetyVerified: boolean;
  allergensFree: string[];
  ingredients: { name: string; amount: string; safeNote?: string }[];
  instructions: string[];
  crossContaminationProtocol: string[];
  image?: string;
  storyNote?: string;
}

export interface MealPlanDay {
  day: string;
  dateStr: string;
  breakfast: Recipe;
  lunch: Recipe;
  dinner: Recipe;
  snack: Recipe;
}

export interface GroceryItem {
  id: string;
  name: string;
  category: 'Produce' | 'Pantry & Grains' | 'Proteins' | 'Dairy & Alternatives' | 'Spices & Condiments';
  amount: string;
  isCompleted: boolean;
  safeBrandRecommendation?: string;
  allergyNotice?: string;
}

export interface KitchenSafetyRule {
  id: string;
  title: string;
  category: 'Cross-Contamination' | 'Storage' | 'Cooking Surfaces' | 'Shared Condiments';
  description: string;
  priority: 'Critical' | 'Important' | 'Standard';
  appliesTo: string;
}

export interface FriendProfile {
  id: string;
  name: string;
  relationship: string;
  photoUrl: string;
  avatarFallback: string;
  primaryStory: string;
  allergiesOrConstraints: {
    label: string;
    level: 'Severe (Anaphylaxis / Celiac)' | 'Moderate' | 'Preference';
    note: string;
  }[];
  favoriteDishes: string[];
  quote: string;
  quoteAuthor: string;
  isCustom?: boolean;
}

export type OpenModelId = 'gemma-2b-it' | 'llama-3.2-1b' | 'smollm2-360m' | 'mistral-7b-instruct' | 'whisper-small';

export interface OpenModelSpec {
  id: OpenModelId;
  name: string;
  creator: string;
  parameters: string;
  contextWindow: string;
  quantization: string;
  ramRequired: string;
  badge: string;
  description: string;
  whyChosen: string;
}
