import { useState } from 'react';

interface MatchItem {
  id: string;
  leftLabel: string;
  rightLabel: string;
}

export default function Matching({ items }: { items: MatchItem[] }) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleLeftSelect = (id: string) => {
    setSelectedLeft(id);
  };

  const handleRightClick = (rightId: string) => {
    if (!selectedLeft) return;
    const newMatches = { ...matches, [selectedLeft]: rightId };
    setMatches(newMatches);
    setSelectedLeft(null);

    const allMatched = Object.keys(newMatches).length === items.length;
    if (allMatched) {
      setFeedback('All matches correct!');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Match the Pairs</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLeftSelect(item.id)}
              className={`touch-target w-full text-left px-4 py-3 rounded-lg border text-base ${
                selectedLeft === item.id ? 'bg-blue-600 border-blue-400' : 'bg-gray-800 border-gray-600'
              }`}
            >
              {item.leftLabel}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleRightClick(item.id)}
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
    </div>
  );
}
