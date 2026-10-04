import React from 'react';
import { ShieldCheck, Heart, Sparkles, Send, Users } from 'lucide-react';
import { FriendProfile } from '../types';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  activeProfile: FriendProfile;
  profiles: FriendProfile[];
  onSelectProfile: (profile: FriendProfile) => void;
  onOpenHandoff: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  activeProfile,
  profiles,
  onSelectProfile,
  onOpenHandoff,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);

  const navItems = [
    { id: 'planner', label: 'Meal Planner' },
    { id: 'scanner', label: 'Ingredient Scanner' },
    { id: 'pantry', label: 'Pantry Chef' },
    { id: 'rules', label: 'Kitchen Rules' },
    { id: 'grocery', label: 'Smart Grocery' },
    { id: 'open-ai', label: 'Why Open AI' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onTabChange('planner')}
              className="text-left group flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-stone-900 text-amber-300 flex items-center justify-center font-bold text-sm tracking-tight group-hover:bg-stone-800 transition-colors">
                SP
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-stone-900">
                  SafePlate
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs text-stone-400 font-medium">
                  for {activeProfile.name}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  currentTab === item.id
                    ? 'text-stone-900 font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {item.label}
                {currentTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Friend Profile Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200"
                title="Switch friend profile"
              >
                <Users className="w-3.5 h-3.5 text-stone-500" />
                <span className="max-w-[80px] sm:max-w-none truncate">{activeProfile.name} ({activeProfile.relationship.split(' ')[0]})</span>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-stone-200 py-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    Switch Friend Profile
                  </div>
                  {profiles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProfile(p);
                        setProfileDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-stone-50 transition-colors ${
                        activeProfile.id === p.id ? 'bg-amber-50/60 font-semibold text-stone-900' : 'text-stone-600'
                      }`}
                    >
                      <div>
                        <div className="text-stone-900 font-medium">{p.name}</div>
                        <div className="text-[11px] text-stone-400">{p.relationship}</div>
                      </div>
                      {activeProfile.id === p.id && (
                        <span className="text-amber-600 text-xs font-semibold">Active</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Handoff to Friend Button */}
            <button
              onClick={onOpenHandoff}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>Handoff to {activeProfile.name}</span>
            </button>
          </div>
        </div>

        {/* Mobile Subnav */}
        <div className="lg:hidden flex items-center gap-3 overflow-x-auto py-2.5 border-t border-stone-100 text-xs font-medium text-stone-600 scrollbar-none">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`whitespace-nowrap px-2.5 py-1 rounded-md transition-colors ${
                currentTab === item.id
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'hover:bg-stone-100 text-stone-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
