import React, { useState } from 'react';
import { Calendar, Clock, Users, ShieldCheck, ChefHat, CheckCircle2, ChevronRight, X, Sparkles, AlertCircle } from 'lucide-react';
import { MealPlanDay, Recipe, FriendProfile } from '../types';
import { WEEKLY_MEAL_PLAN, INITIAL_RECIPES } from '../data/mockData';

interface MealPlannerProps {
  friend: FriendProfile;
  onOpenScannerWithRecipe?: (recipe: Recipe) => void;
}

export const MealPlanner: React.FC<MealPlannerProps> = ({ friend, onOpenScannerWithRecipe }) => {
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(INITIAL_RECIPES[0]);

  const activeDay: MealPlanDay = WEEKLY_MEAL_PLAN[selectedDayIdx];

  return (
    <div className="space-y-6">
      {/* Top Banner with Featured Safe Meal */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Featured Recipe Image */}
          <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-full bg-stone-100">
            <img
              src="/src/assets/images/hero_safeplate_dish_1791048129513.jpg"
              alt="Artisanal safe dinner spread"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="text-xs font-medium text-amber-300">
                Friday Apartment Dinner
              </div>
              <h3 className="text-lg font-bold">
                {INITIAL_RECIPES[0].title}
              </h3>
              <p className="text-xs text-stone-200 mt-1 line-clamp-2">
                {INITIAL_RECIPES[0].description}
              </p>
            </div>
          </div>

          {/* Details & Roommate Safe Story */}
          <div className="lg:col-span-7 p-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Metadata without pills */}
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span>Certified Roommate Safe</span>
                <span aria-hidden="true">·</span>
                <span>Zero Gluten & Nuts</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">40 min cook</span>
              </div>

              <h2 className="text-xl font-bold tracking-tight text-stone-900">
                Shared Apartment Meal Plan
              </h2>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                Every recipe is calculated so that {friend.name} never has to worry about unexpected Celiac triggers or nut cross-contamination, while making hearty dinners that all roommates crave.
              </p>

              {/* Safe Guarantees */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-semibold text-stone-900">Gluten-Free</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">Tamari & pure corn only</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-semibold text-stone-900">Nut Anaphylaxis Safe</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">Zero peanuts, tree nuts or oils</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-semibold text-stone-900">Student Budget</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">Under $4.20 per portion</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-stone-100">
              <div className="text-xs text-stone-500 italic">
                “This solves the Friday night dinner panic.” — Roommates
              </div>
              <button
                onClick={() => setSelectedRecipe(INITIAL_RECIPES[0])}
                className="px-3 py-1.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap"
              >
                View Recipe & Protocol
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Weekday Selector Bar (Functional tabs) */}
      <div className="flex items-center gap-1.5 p-1.5 bg-stone-200/70 rounded-xl overflow-x-auto scrollbar-none">
        {WEEKLY_MEAL_PLAN.map((plan, idx) => (
          <button
            key={plan.day}
            onClick={() => setSelectedDayIdx(idx)}
            className={`flex-1 min-w-[90px] px-3 py-2 text-xs font-medium rounded-lg transition-colors text-center ${
              selectedDayIdx === idx
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            <div>{plan.day}</div>
            <div className="text-[11px] text-stone-400">{plan.dateStr}</div>
          </button>
        ))}
      </div>

      {/* Day Overview: 4 Meal Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { slot: 'Breakfast', recipe: activeDay.breakfast },
          { slot: 'Lunch', recipe: activeDay.lunch },
          { slot: 'Dinner', recipe: activeDay.dinner },
          { slot: 'Snack', recipe: activeDay.snack }
        ].map(({ slot, recipe }) => (
          <div
            key={slot}
            onClick={() => setSelectedRecipe(recipe)}
            className={`cursor-pointer bg-white rounded-xl p-4 border transition-all text-left flex flex-col justify-between hover:border-stone-400 ${
              selectedRecipe?.id === recipe.id
                ? 'border-amber-500 ring-1 ring-amber-500'
                : 'border-stone-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-[11px] text-stone-400 font-medium mb-1.5">
                <span className="uppercase tracking-wider font-semibold text-stone-600">{slot}</span>
                <span className="font-mono tabular-nums">{recipe.prepTimeMinutes + recipe.cookTimeMinutes}m</span>
              </div>
              <h4 className="text-sm font-bold text-stone-900 line-clamp-2">
                {recipe.title}
              </h4>
              <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                {recipe.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Safe</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Selected Recipe Deep Dive Modal/Drawer */}
      {selectedRecipe && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                <span>{selectedRecipe.category}</span>
                <span aria-hidden="true">·</span>
                <span>Serves <span className="tabular-nums font-mono">{selectedRecipe.servings}</span></span>
                <span aria-hidden="true">·</span>
                <span>Prep: <span className="tabular-nums font-mono">{selectedRecipe.prepTimeMinutes}m</span></span>
                <span aria-hidden="true">·</span>
                <span>Cook: <span className="tabular-nums font-mono">{selectedRecipe.cookTimeMinutes}m</span></span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-stone-900">
                {selectedRecipe.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
                {selectedRecipe.description}
              </p>
            </div>

            <button
              onClick={() => setSelectedRecipe(null)}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Ingredients & Safe Brands */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                Ingredients & Verification ({selectedRecipe.ingredients.length})
              </div>
              <div className="space-y-2">
                {selectedRecipe.ingredients.map((ing, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs flex items-start justify-between gap-2"
                  >
                    <div>
                      <div className="font-semibold text-stone-900">{ing.name}</div>
                      {ing.safeNote && (
                        <div className="text-[11px] text-emerald-700 mt-0.5">
                          ✓ {ing.safeNote}
                        </div>
                      )}
                    </div>
                    <span className="font-mono text-stone-500 shrink-0 text-right">
                      {ing.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation Steps & Cross-Contamination Protocol */}
            <div className="lg:col-span-7 space-y-6">
              {/* Instructions */}
              <div>
                <div className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-3">
                  Step-by-Step Cooking
                </div>
                <div className="space-y-2.5">
                  {selectedRecipe.instructions.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-stone-700">
                      <span className="w-5 h-5 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center font-bold text-stone-800 shrink-0 text-[11px]">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cross-Contamination Protocol Box */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs space-y-2">
                <div className="font-semibold text-amber-900 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <span>Crucial Apartment Kitchen Protocol:</span>
                </div>
                <ul className="space-y-1.5 text-amber-800">
                  {selectedRecipe.crossContaminationProtocol.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedRecipe.storyNote && (
                <div className="text-xs text-stone-500 italic border-l-2 border-amber-400 pl-3 py-1">
                  “{selectedRecipe.storyNote}”
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
