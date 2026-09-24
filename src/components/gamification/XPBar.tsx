import { useGameStore } from '../../stores/gameStore';

export default function XPBar() {
  const { xp, level } = useGameStore();
  const required = 100 * Math.pow(level, 1.5);
  const percentage = Math.min((xp / required) * 100, 100);

  return (
    <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full xp-bar-fill"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
