import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Cpu, ArrowRightLeft, Sparkles, RefreshCw, Zap, CheckCircle2, Copy, Check } from 'lucide-react';
import { AnalysisResult, OpenModelId, FriendProfile } from '../types';
import { OPEN_MODELS } from '../data/mockData';
import { analyzeIngredientsWithOpenModel } from '../services/openAiEngine';

interface IngredientScannerProps {
  friend: FriendProfile;
}

const PRESET_EXAMPLES = [
  {
    name: 'Thai Curry Takeout Label',
    ingredients: 'Chicken breast, coconut milk, red curry paste, fish sauce, regular soy sauce, peanut oil garnish, crushed peanuts, eggplant, jasmine rice.'
  },
  {
    name: 'Apartment Snack Mix',
    ingredients: 'Whole grain wheat pretzels, barley malt syrup, roasted almonds, milk chocolate drops, vegetable oil, sea salt. May contain trace peanuts from shared facility.'
  },
  {
    name: 'Safe Homemade Lemon Chicken',
    ingredients: 'Fresh bone-in chicken thighs, yukon gold potatoes, extra virgin olive oil, fresh rosemary, garlic, sea salt, freshly squeezed lemon juice, cracked black pepper.'
  },
  {
    name: 'Store-Bought Teriyaki Marinade',
    ingredients: 'Water, naturally brewed soy sauce (water, wheat, soybeans, salt), high fructose corn syrup, modified food starch, maltodextrin, garlic powder, toasted sesame oil.'
  }
];

export const IngredientScanner: React.FC<IngredientScannerProps> = ({ friend }) => {
  const [selectedModel, setSelectedModel] = useState<OpenModelId>('gemma-2b-it');
  const [inputText, setInputText] = useState(PRESET_EXAMPLES[0].ingredients);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copiedSwap, setCopiedSwap] = useState<string | null>(null);

  const handleScan = async (overrideText?: string) => {
    const textToScan = overrideText || inputText;
    if (!textToScan.trim()) return;

    setIsAnalyzing(true);
    try {
      const res = await analyzeIngredientsWithOpenModel(
        textToScan,
        selectedModel,
        friend.name
      );
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectPreset = (ingredients: string) => {
    setInputText(ingredients);
    handleScan(ingredients);
  };

  const copySwap = (swapText: string) => {
    navigator.clipboard.writeText(swapText);
    setCopiedSwap(swapText);
    setTimeout(() => setCopiedSwap(null), 2000);
  };

  // Run initial scan on load once if no result
  React.useEffect(() => {
    if (!result) {
      handleScan(PRESET_EXAMPLES[0].ingredients);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Header / Context */}
      <div className="bg-white rounded-xl p-5 border border-stone-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-stone-900">
              On-Device Ingredient & Label Guardian
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Screen recipes, sauce labels, and pantry items for {friend.name}’s allergies with local open-weight inference.
            </p>
          </div>

          {/* Model Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Model:</span>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as OpenModelId)}
              className="text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-stone-400"
            >
              {OPEN_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.creator.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-4 pt-3 border-t border-stone-100">
          <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
            Try Real-World Test Cases:
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_EXAMPLES.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(preset.ingredients)}
                className="text-xs font-medium px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors text-left"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Input & Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl p-5 border border-stone-200">
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              Ingredient List, Recipe Text, or Package Label
            </label>
            <textarea
              rows={7}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste any ingredient list, e.g.: water, soy sauce (wheat, soybean), peanuts, malt vinegar..."
              className="w-full text-xs font-sans p-3 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400 text-stone-800 leading-relaxed resize-none"
            />

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] text-stone-400 font-mono">
                {inputText.length} chars · Local prompt
              </span>
              <button
                onClick={() => handleScan()}
                disabled={isAnalyzing || !inputText.trim()}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 rounded-lg transition-colors shadow-sm"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Inference Running...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span>Run Open Model Scan</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Model Telemetry Box (Proving local air-gapped run) */}
          {result && (
            <div className="bg-stone-900 text-stone-200 rounded-xl p-4 border border-stone-800 text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-stone-400 font-medium">Inference Telemetry</span>
                <span className="text-[11px] text-emerald-400 font-mono">0 Bytes Cloud Egress</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-stone-800 font-mono">
                <div className="bg-stone-800/80 p-2 rounded-lg">
                  <div className="text-[10px] text-stone-400 uppercase">Latency</div>
                  <div className="text-stone-100 font-bold tabular-nums">{result.latencyMs} ms</div>
                </div>
                <div className="bg-stone-800/80 p-2 rounded-lg">
                  <div className="text-[10px] text-stone-400 uppercase">Tokens</div>
                  <div className="text-stone-100 font-bold tabular-nums">~{result.tokensProcessed}</div>
                </div>
                <div className="bg-stone-800/80 p-2 rounded-lg">
                  <div className="text-[10px] text-stone-400 uppercase">Privacy</div>
                  <div className="text-emerald-400 font-bold">100% Local</div>
                </div>
              </div>
              <p className="text-[11px] text-stone-400 leading-tight pt-1">
                Processed via on-device weights ({result.modelUsed}). No medical or dietary data was uploaded to any remote server.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Analysis Output */}
        <div className="lg:col-span-7">
          {isAnalyzing ? (
            <div className="bg-white rounded-xl p-8 border border-stone-200 flex flex-col items-center justify-center min-h-[360px] text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
              <div className="text-sm font-semibold text-stone-800">
                Running local open-weight parsing on {friend.name}’s health profile...
              </div>
              <p className="text-xs text-stone-400 max-w-sm">
                Scanning for subtle wheat derivatives (malt, farina, brewer’s yeast) and shared processing risks.
              </p>
            </div>
          ) : result ? (
            <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-5">
              {/* Verdict Banner */}
              <div
                className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                  result.status === 'danger'
                    ? 'bg-rose-50 border-rose-200 text-rose-900'
                    : result.status === 'warning'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                }`}
              >
                {result.status === 'danger' ? (
                  <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                ) : result.status === 'warning' ? (
                  <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="font-bold text-sm">{result.headline}</div>
                  <p className="text-xs leading-relaxed opacity-90">{result.summary}</p>
                </div>
              </div>

              {/* Detected Triggers List */}
              {result.triggers.length > 0 && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                    Flagged Triggers ({result.triggers.length})
                  </div>
                  <div className="space-y-2">
                    {result.triggers.map((trigger, i) => (
                      <div
                        key={i}
                        className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-start justify-between gap-2"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-stone-900">
                              {trigger.name}
                            </span>
                            <span className="text-[11px] text-stone-400 font-mono">
                              ({trigger.category})
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            {trigger.reason}
                          </p>
                        </div>
                        {trigger.safeAlternative && (
                          <div className="sm:text-right shrink-0">
                            <div className="text-[10px] uppercase font-semibold text-stone-400">
                              Safe Swap:
                            </div>
                            <div className="text-xs font-medium text-emerald-700">
                              {trigger.safeAlternative}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safe Ingredient Swaps */}
              {result.swapSuggestions.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-semibold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ArrowRightLeft className="w-3.5 h-3.5 text-stone-500" />
                    <span>Safe Roommate Substitutions:</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {result.swapSuggestions.map((swap, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/80 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2 font-medium text-stone-900">
                            <span className="line-through text-stone-400">{swap.original}</span>
                            <span className="text-stone-400">→</span>
                            <span className="text-emerald-800 font-bold">{swap.replacement}</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">{swap.reason}</p>
                        </div>
                        <button
                          onClick={() => copySwap(`${swap.original} → ${swap.replacement}`)}
                          className="shrink-0 p-1.5 text-stone-500 hover:text-stone-800 transition-colors"
                          title="Copy swap"
                        >
                          {copiedSwap === `${swap.original} → ${swap.replacement}` ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cross Contamination Vector Checklist */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <div className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  Cross-Contamination Warnings:
                </div>
                <div className="space-y-1.5">
                  {result.crossContaminationRisks.map((risk, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                      <span className="text-amber-500 font-bold shrink-0">!</span>
                      <span>{risk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safe Prep Notes */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Roommate Kitchen Rule:</span>
                </div>
                <p>
                  If preparing meals for {friend.name}, always use the blue allergy sponge and the green plastic cutting board. Never use the wooden spoons that have stirred gluten pasta.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 border border-stone-200 text-center text-stone-400 text-xs">
              Click "Run Open Model Scan" to analyze ingredients.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
