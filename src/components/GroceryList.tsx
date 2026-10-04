import React, { useState } from 'react';
import { ShoppingCart, CheckSquare, Square, Plus, Copy, Check, AlertTriangle, ShieldCheck } from 'lucide-react';
import { GroceryItem, FriendProfile } from '../types';
import { INITIAL_GROCERY_ITEMS } from '../data/mockData';

interface GroceryListProps {
  friend: FriendProfile;
}

export const GroceryList: React.FC<GroceryListProps> = ({ friend }) => {
  const [items, setItems] = useState<GroceryItem[]>(INITIAL_GROCERY_ITEMS);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<GroceryItem['category']>('Produce');
  const [copied, setCopied] = useState(false);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: GroceryItem = {
      id: 'g-' + Date.now(),
      name: newItemName.trim(),
      category: newItemCategory,
      amount: '1 unit',
      isCompleted: false,
    };

    setItems([...items, newItem]);
    setNewItemName('');
  };

  const copyToClipboard = () => {
    const lines = items.map(
      (item) =>
        `${item.isCompleted ? '[x]' : '[ ]'} ${item.name} (${item.amount})${
          item.allergyNotice ? ` -- SAFE NOTE: ${item.allergyNotice}` : ''
        }`
    );
    const content = `🛒 GROCERY SHOPPING LIST (Safe for ${friend.name})\n` + lines.join('\n');
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories: GroceryItem['category'][] = [
    'Produce',
    'Proteins',
    'Pantry & Grains',
    'Spices & Condiments'
  ];

  const completedCount = items.filter((i) => i.isCompleted).length;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-xl p-5 border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-stone-900">
              Safe Grocery Shopping List
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Specific brands and label warnings so roommates never accidentally buy unsafe alternatives at the store.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-stone-500 tabular-nums">
              {completedCount} / {items.length} items gathered
            </span>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>List Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy for Group Chat</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Add Item Row */}
        <form onSubmit={handleAddItem} className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-2">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Add grocery item (e.g. San-J Tamari, Bananas)..."
            className="flex-1 min-w-[200px] text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none"
          />
          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value as GroceryItem['category'])}
            className="text-xs px-2.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-700 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </form>
      </div>

      {/* Grouped Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const catItems = items.filter((i) => i.category === cat);
          if (catItems.length === 0) return null;

          return (
            <div key={cat} className="bg-white rounded-xl p-5 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  {cat}
                </span>
                <span className="text-[11px] font-mono text-stone-400 tabular-nums">
                  {catItems.filter((i) => i.isCompleted).length} / {catItems.length}
                </span>
              </div>

              <div className="space-y-2">
                {catItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`cursor-pointer p-3 rounded-xl border transition-colors flex items-start gap-3 ${
                      item.isCompleted
                        ? 'bg-stone-50/50 border-stone-200 opacity-60'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 text-stone-400 hover:text-stone-700 transition-colors shrink-0"
                    >
                      {item.isCompleted ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-semibold ${
                            item.isCompleted ? 'line-through text-stone-400' : 'text-stone-900'
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="text-[11px] text-stone-500 font-mono shrink-0">
                          {item.amount}
                        </span>
                      </div>

                      {item.safeBrandRecommendation && (
                        <div className="text-[11px] text-emerald-700 font-medium">
                          Brand: {item.safeBrandRecommendation}
                        </div>
                      )}

                      {item.allergyNotice && (
                        <div className="text-[11px] text-amber-800 bg-amber-50 rounded px-2 py-0.5 border border-amber-200 flex items-start gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                          <span>{item.allergyNotice}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
