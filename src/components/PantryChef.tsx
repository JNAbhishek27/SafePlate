import React, { useState } from 'react';
import { ChefHat, Plus, Trash2, Zap, RefreshCw, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { Recipe, OpenModelId, FriendProfile } from '../types';
import { OPEN_MODELS } from '../data/mockData';
import { generatePantryRecipeWithOpenModel } from '../services/openAiEngine';

interface PantryChefProps {
  friend: FriendProfile;
}

const DEFAULT_PANTRY = [
  'Jasmine Rice',
  'Organic Canned Chickpeas',
  'Fresh Eggs',
  'Baby Spinach',
  'Garlic & Olive Oil',
  'Coconut Milk'
];

export const PantryChef: React.FC<PantryChefProps> = ({ friend }) => {
  const [selectedModel, setSelectedModel] = useState<OpenModelId>('gemma-2b-it');
  const [items, setItems] = useState<string[]>(DEFAULT_PANTRY);
  const [newItemInput, setNewItemInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemInput.trim()) return;
    setItems([...items, newItemInput.trim()]);
    setNewItemInput('');
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const rec = await generatePantryRecipeWithOpenModel(items, selectedModel, friend.name);
      setGeneratedRecipe(rec);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="bg-white rounded-xl p-5 border border-stone-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-stone-900">
              Pantry & Fridge Quick Cook
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Turn random ingredients in the apartment into a certified safe meal for {friend.name} without ordering risky takeout.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Model:</span>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as OpenModelId)}
              className="text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              {OPEN_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: What's in the kitchen right now */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl p-5 border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                Ingredients On Hand ({items.length})
              </span>
              <button
                onClick={() => setItems(DEFAULT_PANTRY)}
                className="text-[11px] text-stone-400 hover:text-stone-700 transition-colors"
              >
                Reset Default
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-xs"
                >
                  <span className="font-medium text-stone-800">{item}</span>
                  <button
                    onClick={() => handleRemoveItem(idx)}
                    className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Item Form */}
            <form onSubmit={handleAddItem} className="flex gap-2">
              <input
                type="text"
                value={newItemInput}
                onChange={(e) => setNewItemInput(e.target.value)}
                placeholder="Add ingredient (e.g. tofu, corn...)"
                className="flex-1 text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400 text-stone-800"
              />
              <button
                type="submit"
                className="px-3 py-2 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || items.length === 0}
              className="w-full py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Safe Recipe...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Generate Safe Meal (Local Open Model)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Generated Result */}
        <div className="lg:col-span-7">
          {isGenerating ? (
            <div className="bg-white rounded-xl p-8 border border-stone-200 flex flex-col items-center justify-center min-h-[300px] text-center space-y-3">
              <ChefHat className="w-8 h-8 text-amber-500 animate-bounce" />
              <div className="text-sm font-semibold text-stone-800">
                Crafting on-device recipe for {friend.name}...
              </div>
              <p className="text-xs text-stone-400 max-w-sm">
                Validating zero cross-contact hazards and checking safe apartment preparation steps.
              </p>
            </div>
          ) : generatedRecipe ? (
            <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-5">
              <div className="border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <span>100% On-Demand</span>
                  <span aria-hidden="true">·</span>
                  <span>Prep: <span className="tabular-nums font-mono">{generatedRecipe.prepTimeMinutes}m</span></span>
                  <span aria-hidden="true">·</span>
                  <span>Cook: <span className="tabular-nums font-mono">{generatedRecipe.cookTimeMinutes}m</span></span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-stone-900">
                  {generatedRecipe.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {generatedRecipe.description}
                </p>
              </div>

              {/* Ingredients list */}
              <div>
                <div className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2">
                  Ingredients Used
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {generatedRecipe.ingredients.map((ing, i) => (
                    <div key={i} className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                      <div className="font-semibold text-stone-800">{ing.name}</div>
                      <div className="text-[11px] text-emerald-700">{ing.safeNote}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <div className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2">
                  Instructions
                </div>
                <div className="space-y-2">
                  {generatedRecipe.instructions.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                      <span className="w-4 h-4 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center font-bold text-stone-700 text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kitchen Protocol */}
              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                <div className="font-semibold">Safe Roommate Protocol:</div>
                <ul className="space-y-1 text-amber-800 text-[11px]">
                  {generatedRecipe.crossContaminationProtocol.map((rule, idx) => (
                    <li key={idx}>• {rule}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 border border-stone-200 flex flex-col items-center justify-center min-h-[300px] text-center space-y-2">
              <ChefHat className="w-8 h-8 text-stone-300" />
              <div className="text-xs text-stone-600 font-medium">Ready to cook something safe?</div>
              <p className="text-xs text-stone-400 max-w-sm">
                Add whatever is currently in your fridge and click "Generate Safe Meal".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
