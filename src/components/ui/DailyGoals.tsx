import { useGameStore } from '../../stores/gameStore';

function ProgressRing({ progress, size = 80, strokeWidth = 6, color = '#3b82f6' }: { progress: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(148, 163, 184, 0.15)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="progress-ring-circle"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold gradient-text">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}

export default function DailyGoals() {
  const { dailyGoalProgress, modulesCompletedToday, modulesGoalToday, streak } = useGameStore();

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const completedDays = [true, true, true, true, true, false, false];

  return (
    <div className="glass-card rounded-2xl p-5 mx-4 mb-4 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Daily Goals</h3>
          <p className="text-sm text-gray-400 mt-1">
            Current Streak: <span className="text-orange-400 font-semibold">🔥 {streak} Days</span>
          </p>
        </div>
        <ProgressRing progress={dailyGoalProgress} color="#8b5cf6" />
      </div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          {days.map((day, i) => (
            <div
              key={day}
              className={`touch-target w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                completedDays[i]
                  ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-lg shadow-orange-500/30 scale-110'
                  : 'bg-white/5 text-gray-500'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        <span className="text-sm text-gray-400">
          {modulesCompletedToday}/{modulesGoalToday} Modules
        </span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-2.5 rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 transition-all duration-1000 ease-out"
          style={{ width: `${(modulesCompletedToday / modulesGoalToday) * 100}%` }}
        />
      </div>
    </div>
  );
}
