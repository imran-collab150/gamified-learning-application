import { useGameStore } from '../../stores/gameStore';

export default function LevelBadge() {
  const { level } = useGameStore();

  return (
    <div className="animate-level-up touch-target bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold text-gray-900">
      Lv.{level}
    </div>
  );
}
