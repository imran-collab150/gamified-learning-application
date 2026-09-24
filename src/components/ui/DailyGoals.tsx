import { useGameStore } from '../../stores/gameStore';

function ProgressRing({ progress, size = 80, strokeWidth = 6, color = '#3B82F6' }: { progress: number; size?: number; strokeWidth?: number; color?: string }) {
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
          stroke="#e5e7eb"
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
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-gray-900 dark:text-white">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}

export default function DailyGoals() {
  const { dailyGoalProgress, modulesCompletedToday, modulesGoalToday, streak } = useGameStore();

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const completedDays = [true, true, true, true, true, false, false];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 mx-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daily Goals</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Current Streak: <span className="text-orange-500 font-semibold">🔥 {streak} Days</span>
          </p>
        </div>
        <ProgressRing progress={dailyGoalProgress} />
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1">
          {days.map((day, i) => (
            <div
              key={day}
              className={`touch-target w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                completedDays[i] ? 'bg-orange-400 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {modulesCompletedToday}/{modulesGoalToday} Modules
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(modulesCompletedToday / modulesGoalToday) * 100}%` }}
        />
      </div>
    </div>
  );
}
