import { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';

export default function CodeFix({ initialCode, correctCode }: { initialCode: string; correctCode: string }) {
  const [code, setCode] = useState(initialCode);
  const [feedback, setFeedback] = useState<string | null>(null);
  const { addXP } = useGameStore();

  const handleSubmit = () => {
    const isCorrect = code.trim() === correctCode.trim();
    if (isCorrect) {
      setFeedback('Correct! Great job.');
      addXP(15);
    } else {
      setFeedback('The code has issues. Check the logic and try again.');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Fix the Code</h3>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full min-h-[120px] p-4 bg-gray-900 text-green-400 font-mono text-base rounded-lg border border-gray-600 resize-none"
      />
      <button onClick={handleSubmit} className="touch-target bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg text-base">
        Submit Fix
      </button>
      {feedback && (
        <div className={`p-4 rounded-lg ${feedback.includes('Correct') ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
          {feedback}
        </div>
      )}
    </div>
  );
}
