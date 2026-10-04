import React, { useState } from 'react';
import { X, Heart, MessageSquare, Share2, Copy, Check, QrCode, Sparkles } from 'lucide-react';
import { FriendProfile } from '../types';

interface HandoffModalProps {
  friend: FriendProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdateFeedback: (newQuote: string) => void;
}

export const HandoffModal: React.FC<HandoffModalProps> = ({
  friend,
  isOpen,
  onClose,
  onUpdateFeedback,
}) => {
  const [feedbackInput, setFeedbackInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showSavedFeedbackAlert, setShowSavedFeedbackAlert] = useState(false);

  if (!isOpen) return null;

  const handleSaveFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackInput.trim()) return;
    onUpdateFeedback(feedbackInput.trim());
    setFeedbackInput('');
    setShowSavedFeedbackAlert(true);
    setTimeout(() => setShowSavedFeedbackAlert(false), 2500);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
              <Heart className="w-4 h-4 fill-rose-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                Hand Off SafePlate to {friend.name}
              </h3>
              <p className="text-xs text-stone-500">
                Bonus Points: Hand it over and tell us what they said!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-700">
          {/* Friend's Real Reaction Quote */}
          <div className="p-5 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-2">
            <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>What {friend.name} Said:</span>
            </div>
            <blockquote className="text-sm font-medium text-stone-900 italic leading-relaxed">
              {friend.quote}
            </blockquote>
            <div className="text-[11px] text-stone-500 text-right pt-1 font-mono">
              — {friend.quoteAuthor}
            </div>
          </div>

          {/* Record New Feedback */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-3">
            <div className="font-semibold text-stone-900 text-xs">
              Record a New Note or Reaction from {friend.name}:
            </div>
            <form onSubmit={handleSaveFeedback} className="space-y-2">
              <textarea
                rows={3}
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                placeholder={`Type what ${friend.name} said when you shared the app with them...`}
                className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
              <div className="flex items-center justify-between">
                {showSavedFeedbackAlert && (
                  <span className="text-[11px] text-emerald-700 font-medium">
                    ✓ Feedback updated!
                  </span>
                )}
                <button
                  type="submit"
                  disabled={!feedbackInput.trim()}
                  className="ml-auto px-3 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 rounded-lg transition-colors"
                >
                  Save Quote
                </button>
              </div>
            </form>
          </div>

          {/* Quick Share with Roommate */}
          <div className="border border-stone-200 rounded-xl p-4 flex items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-stone-900">
                Share this App with {friend.name}
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Runs directly in their phone browser without installing an app or registering an account.
              </p>
            </div>
            <button
              onClick={handleCopyShareLink}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200 shrink-0"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy App Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
