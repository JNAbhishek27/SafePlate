/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { FriendHero } from './components/FriendHero';
import { MealPlanner } from './components/MealPlanner';
import { IngredientScanner } from './components/IngredientScanner';
import { PantryChef } from './components/PantryChef';
import { KitchenSafetyChecklist } from './components/KitchenSafetyChecklist';
import { GroceryList } from './components/GroceryList';
import { OpenSourceInspector } from './components/OpenSourceInspector';
import { HandoffModal } from './components/HandoffModal';
import { FRIEND_PROFILES } from './data/mockData';
import { FriendProfile } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('planner');
  const [profiles, setProfiles] = useState<FriendProfile[]>(FRIEND_PROFILES);
  const [activeProfile, setActiveProfile] = useState<FriendProfile>(FRIEND_PROFILES[0]);
  const [isHandoffOpen, setIsHandoffOpen] = useState(false);

  const handleUpdateFeedback = (newQuote: string) => {
    const updated = profiles.map((p) =>
      p.id === activeProfile.id
        ? { ...p, quote: `“${newQuote}”` }
        : p
    );
    setProfiles(updated);
    setActiveProfile({
      ...activeProfile,
      quote: `“${newQuote}”`,
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Bar (adheres strictly to the 3-zone contract) */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        activeProfile={activeProfile}
        profiles={profiles}
        onSelectProfile={setActiveProfile}
        onOpenHandoff={() => setIsHandoffOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Friend Hero Section (introduces the person, their story, and dietary rules) */}
        <FriendHero
          profile={activeProfile}
          onOpenHandoff={() => setIsHandoffOpen(true)}
          onOpenScanner={() => setCurrentTab('scanner')}
        />

        {/* Tab Content Panes */}
        {currentTab === 'planner' && (
          <MealPlanner
            friend={activeProfile}
            onOpenScannerWithRecipe={() => setCurrentTab('scanner')}
          />
        )}

        {currentTab === 'scanner' && (
          <IngredientScanner friend={activeProfile} />
        )}

        {currentTab === 'pantry' && (
          <PantryChef friend={activeProfile} />
        )}

        {currentTab === 'rules' && (
          <KitchenSafetyChecklist friend={activeProfile} />
        )}

        {currentTab === 'grocery' && (
          <GroceryList friend={activeProfile} />
        )}

        {currentTab === 'open-ai' && (
          <OpenSourceInspector />
        )}
      </main>

      {/* Handoff & Friend Feedback Modal */}
      <HandoffModal
        friend={activeProfile}
        isOpen={isHandoffOpen}
        onClose={() => setIsHandoffOpen(false)}
        onUpdateFeedback={handleUpdateFeedback}
      />

      {/* Clean quiet footer */}
      <footer className="border-t border-stone-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            <span className="font-semibold text-stone-700">SafePlate</span> · Built with love for {activeProfile.name} · Powered by open-weight AI (Gemma 2B & Llama 3.2)
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentTab('open-ai')}
              className="hover:text-stone-800 transition-colors"
            >
              Why Open Innovation Matters
            </button>
            <button
              onClick={() => setIsHandoffOpen(true)}
              className="hover:text-stone-800 transition-colors"
            >
              Friend's Verdict
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
