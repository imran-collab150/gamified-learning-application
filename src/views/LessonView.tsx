import { useGameStore } from '../stores/gameStore';
import LessonLayout from '../components/lessons/LessonLayout';

export default function LessonView() {
  const { completedLessons } = useGameStore();

  const sampleLesson = {
    id: 'lesson-1',
    title: 'Introduction to Variables',
    content: 'Variables are containers for storing data. In JavaScript, you can declare variables using `let`, `const`, or `var`. Use `const` by default to prevent accidental reassignment.',
    task: {
      type: 'mcq' as const,
      question: 'Which keyword should you use to declare a constant?',
      options: [
        { id: 'a', text: 'let', isCorrect: false },
        { id: 'b', text: 'const', isCorrect: true },
        { id: 'c', text: 'var', isCorrect: false },
        { id: 'd', text: 'constant', isCorrect: false },
      ],
    },
  };

  return (
    <div className="relative pb-20 lg:pb-0">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="particle top-[20%] right-[10%] w-2 h-2" style={{ animationDelay: '2s', background: 'rgba(99, 130, 246, 0.3)' }} />
        <div className="particle top-[50%] left-[20%] w-1.5 h-1.5" style={{ animationDelay: '4s', background: 'rgba(147, 51, 234, 0.3)' }} />
      </div>

      <div className="relative z-10 px-4 sm:px-6 py-6 sm:py-8">
        <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">Lessons</h2>
        {completedLessons.length === 0 ? (
          <LessonLayout lesson={sampleLesson} />
        ) : (
          <div className="glass-card rounded-xl p-4 sm:p-6 text-center">
            <p className="text-gray-400">All lessons completed! Keep going!</p>
          </div>
        )}
      </div>
    </div>
  );
}
