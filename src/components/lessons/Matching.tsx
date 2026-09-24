import { useState, useCallback } from 'react';

interface MatchItem {
  id: string;
  leftLabel: string;
  rightLabel: string;
}

export default function Matching({ items }: { items: MatchItem[] }) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleLeftSelect = useCallback((id: string) => {
    setSelectedLeft(id);
  }, []);

  const handleRightClick = useCallback((rightId: string) => {
    if (!selectedLeft) return;
    const newMatches = { ...matches, [selectedLeft]: rightId };
    setMatches(newMatches);
    setSelectedLeft(null);

    const allMatched = Object.keys(newMatches).length === items.length;
    if (allMatched) {
      setFeedback('All matches correct!');
    }
  }, [selectedLeft, matches, items.length]);

  const handleLeftKeyDown = useCallback((e: React.KeyboardEvent, id: string, _index: number) => {
    if (e.key === 'Enter') {
      handleLeftSelect(id);
    }
  }, [handleLeftSelect]);

  const handleRightKeyDown = useCallback((e: React.KeyboardEvent, rightId: string, _index: number) => {
    if (e.key === 'Enter') {
      handleRightClick(rightId);
    }
  }, [handleRightClick]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Match the Pairs</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          {items.map((item, _index) => (
            <button
              key={item.id}
              onClick={() => handleLeftSelect(item.id)}
              onKeyDown={(e) => handleLeftKeyDown(e, item.id, _index)}
              className={`touch-target w-full text-left px-4 py-3 rounded-lg border text-base ${
                selectedLeft === item.id ? 'bg-blue-600 border-blue-400' : 'bg-gray-800 border-gray-600'
              }`}
            >
              {item.leftLabel}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {items.map((item, _index) => (
            <button
              key={item.id}
              onClick={() => handleRightClick(item.id)}
              onKeyDown={(e) => handleRightKeyDown(e, item.id, _index)}
              className={`touch-target w-full text-left px-4 py-3 rounded-lg border text-base ${
                Object.values(matches).includes(item.id) ? 'bg-green-600 border-green-400' : 'bg-gray-800 border-gray-600'
              }`}
            >
              {item.rightLabel}
            </button>
          ))}
        </div>
      </div>
      {feedback && (
        <div className="p-4 rounded-lg bg-green-900 text-green-300">{feedback}</div>
      )}
      <p className="text-xs text-gray-500">Press Enter to select and match</p>
    </div>
  );
}
