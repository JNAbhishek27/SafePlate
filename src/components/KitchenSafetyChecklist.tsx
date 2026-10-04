import React, { useState } from 'react';
import { ShieldCheck, AlertOctagon, CheckSquare, Square, Printer, Check, Copy } from 'lucide-react';
import { KITCHEN_SAFETY_RULES } from '../data/mockData';
import { KitchenSafetyRule, FriendProfile } from '../types';

interface KitchenSafetyChecklistProps {
  friend: FriendProfile;
}

export const KitchenSafetyChecklist: React.FC<KitchenSafetyChecklistProps> = ({ friend }) => {
  const [rules, setRules] = useState<KitchenSafetyRule[]>(KITCHEN_SAFETY_RULES);
  const [checkedRules, setCheckedRules] = useState<Record<string, boolean>>({
    'rule-1': true,
    'rule-2': true,
    'rule-3': true,
  });
  const [copiedPledge, setCopiedPledge] = useState(false);

  const toggleCheck = (id: string) => {
    setCheckedRules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyPledge = () => {
    const text = `📋 APARTMENT 4B SAFE KITCHEN PLEDGE (For ${friend.name})
1. THE RED TOASTER IS SACRED: Strictly 100% certified gluten-free bread only.
2. NO DOUBLE DIPPING: Never put a crumb-covered knife back in butter or jam.
3. BLUE SPONGE ONLY: Use the blue sponge for safe cookware.
4. NO LOOSE NUTS: Loose peanuts and almonds are prohibited in common rooms.
5. CLEAN AS YOU GO: Wipe counters before and after prep.`;

    navigator.clipboard.writeText(text);
    setCopiedPledge(true);
    setTimeout(() => setCopiedPledge(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white rounded-xl p-5 border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-stone-900">
              Apartment Cross-Contamination Protocols
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              The non-negotiable kitchen rules that keep {friend.name} safe from accidental hospital visits and autoimmune flares.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyPledge}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200"
            >
              {copiedPledge ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pledge Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy Fridge Pledge</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule) => {
          const isDone = checkedRules[rule.id] || false;
          return (
            <div
              key={rule.id}
              onClick={() => toggleCheck(rule.id)}
              className={`cursor-pointer p-5 rounded-xl border transition-all text-left flex items-start gap-3.5 ${
                isDone
                  ? 'bg-white border-stone-300'
                  : 'bg-stone-50/60 border-stone-200 hover:border-stone-300'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-stone-400 hover:text-stone-700 transition-colors shrink-0"
              >
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </button>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-sm font-bold ${isDone ? 'text-stone-900' : 'text-stone-700'}`}>
                    {rule.title}
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-rose-600 font-mono">
                    {rule.priority}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {rule.description}
                </p>

                <div className="pt-1 text-[11px] text-stone-400 font-medium">
                  Applies to: {rule.appliesTo}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* The Fridge Poster Card */}
      <div className="bg-stone-900 text-stone-100 rounded-xl p-6 border border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="text-xs font-mono text-amber-400">APARTMENT PROTOCOL</div>
            <h3 className="text-base font-bold text-white mt-0.5">
              Why We Take This Seriously
            </h3>
          </div>
          <div className="text-xs text-stone-400">
            For {friend.name} (Celiac Disease & Nut Anaphylaxis)
          </div>
        </div>

        <p className="text-xs text-stone-300 leading-relaxed max-w-3xl">
          Unlike casual food preferences, Celiac Disease is a severe autoimmune reaction where even 20 parts per million of gluten (a microscopic speck of bread crumb) damages the intestinal villi for months. Peanut and tree nut allergies can cause airway closure in minutes. Having clear, visible kitchen boundaries lets all roommates live together without anxiety.
        </p>
      </div>
    </div>
  );
};
