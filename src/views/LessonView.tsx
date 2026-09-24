import { useGameStore } from '../stores/gameStore';
import LessonLayout from '../components/lessons/LessonLayout';

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

export default function LessonView() {
  const { completedLessons } = useGameStore();

  return (
    <div>
      <h2 className="text-2xl font-bold p-4">Lessons</h2>
      {completedLessons.length === 0 ? (
        <LessonLayout lesson={sampleLesson} />
      ) : (
        <div className="p-4 bg-gray-900 rounded-lg">
          <p className="text-gray-400">All lessons completed! Keep going!</p>
        </div>
      )}
    </div>
  );
}
