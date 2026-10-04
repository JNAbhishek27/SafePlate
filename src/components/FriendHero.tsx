import React from 'react';
import { ShieldCheck, Cpu, HardDriveDownload, Lock, Heart, Sparkles, MessageSquare } from 'lucide-react';
import { FriendProfile } from '../types';

interface FriendHeroProps {
  profile: FriendProfile;
  onOpenHandoff: () => void;
  onOpenScanner: () => void;
}

export const FriendHero: React.FC<FriendHeroProps> = ({
  profile,
  onOpenHandoff,
  onOpenScanner,
}) => {
  return (
    <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-stone-800 shadow-sm">
      {/* Background subtle ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Col: The Story & The Person */}
        <div className="flex-1 space-y-4">
          {/* Metadata kicker without pill enclosure */}
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
            <span>Built for a Friend</span>
            <span aria-hidden="true">·</span>
            <span>{profile.relationship}</span>
            <span aria-hidden="true">·</span>
            <span>100% On-Device Open AI</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white max-w-2xl leading-snug">
            SafePlate for {profile.name}
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            {profile.primaryStory}
          </p>

          {/* Constraints & Allergy Matrix (Zero-Pill: Clean unboxed list with typographic separators) */}
          <div className="pt-2">
            <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
              Critical Medical & Dietary Constraints:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {profile.allergiesOrConstraints.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-stone-800/80 rounded-xl p-3 border border-stone-700/60"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-stone-100">{item.label}</span>
                    <span className="text-[11px] text-amber-400 font-medium">{item.level}</span>
                  </div>
                  <p className="text-stone-400 leading-normal text-[11px]">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenScanner}
              className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap"
            >
              Scan Food Label for {profile.name}
            </button>
            <button
              onClick={onOpenHandoff}
              className="px-4 py-2 text-xs font-medium text-stone-300 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
              <span>Read {profile.name}'s Feedback</span>
            </button>
          </div>
        </div>

        {/* Right Col: Friend Avatar Card & Open AI Guarantee */}
        <div className="lg:w-80 shrink-0 bg-stone-800/90 rounded-xl p-5 border border-stone-700/70 space-y-4">
          <div className="flex items-center gap-3.5">
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/40 shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-stone-700 border-2 border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-lg shrink-0">
                {profile.avatarFallback}
              </div>
            )}
            <div>
              <div className="text-sm font-semibold text-white">{profile.name}</div>
              <div className="text-xs text-stone-400">{profile.relationship}</div>
              <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Verified Safe Protocol</div>
            </div>
          </div>

          {/* What Sam Said Preview Quote */}
          <div className="border-t border-stone-700/60 pt-3">
            <div className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold mb-1">
              Friend's Verdict:
            </div>
            <p className="text-xs text-stone-300 italic leading-relaxed line-clamp-3">
              {profile.quote}
            </p>
          </div>

          {/* Privacy & Open Source Micro-Guarantees */}
          <div className="border-t border-stone-700/60 pt-3 space-y-2 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Zero Health Data Egress (100% On-Device)</span>
            </div>
            <div className="flex items-center gap-2">
              <HardDriveDownload className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Runs Offline in Grocery Store Basements</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Gemma 2B / Llama 3.2 Open Weights</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
