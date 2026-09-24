import { useState, useCallback } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { withViewTransition } from '../../hooks/useViewTransition';

export default function MCQ({ question, options }: { question: string; options: Array<{ id: string; text: string; isCorrect: boolean }> }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { addXP } = useGameStore();

  const handleSelect = useCallback((optionId: string) => {
    if (selected) return;
    setSelected(optionId);
    const correctOption = options.find((o) => o.isCorrect);
    const isCorrect = optionId === correctOption?.id;
    setShowFeedback(true);
    if (isCorrect) {
      withViewTransition(() => addXP(10));
    }
  }, [selected, options, addXP]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, optionId: string, index: number) => {
    if (e.key === String(index + 1) && !selected) {
      handleSelect(optionId);
    }
    if (e.key === 'Enter' && selected && !showFeedback) {
      setShowFeedback(true);
    }
  }, [selected, showFeedback, handleSelect]);

  return (
    <div className="space-y-4" role="group" aria-label="Multiple choice question">
      <h3 className="text-xl font-bold">{question}</h3>
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selected === option.id;
          const isCorrect = option.isCorrect;
          let bgClass = 'bg-gray-800 hover:bg-gray-700 border border-gray-600';
          if (isSelected && isCorrect) bgClass = 'bg-green-600 border-green-400';
          else if (isSelected && !isCorrect) bgClass = 'bg-red-600 border-red-400';
          else if (isSelected) bgClass = 'bg-blue-600 border-blue-400';

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              onKeyDown={(e) => handleKeyDown(e, option.id, index)}
              disabled={!!selected}
              className={`touch-target w-full text-left px-4 py-3 rounded-lg border text-base ${bgClass}`}
              aria-label={`Option ${index + 1}: ${option.text}`}
            >
              <span className="mr-2 font-bold">{index + 1}.</span>
              {option.text}
            </button>
          );
        })}
      </div>
      {showFeedback && selected && (
        <div className="mt-4 p-4 rounded-lg bg-gray-800">
          {options.find((o) => o.id === selected)?.isCorrect ? (
            <p className="text-green-400">Correct! +10 XP</p>
          ) : (
            <p className="text-red-400">Incorrect. Try again!</p>
          )}
        </div>
      )}
      <p className="text-xs text-gray-500 mt-2">Press 1-{options.length} to select an option</p>
    </div>
  );
}
