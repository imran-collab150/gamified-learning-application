import { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import MCQ from './MCQ';
import CodeFix from './CodeFix';
import Matching from './Matching';
import { useGameStore } from '../../stores/gameStore';
import { withViewTransition } from '../../hooks/useViewTransition';

interface Lesson {
  id: string;
  title: string;
  content: string;
  task: {
    type: 'mcq' | 'code-fix' | 'matching';
    question?: string;
    options?: Array<{ id: string; text: string; isCorrect: boolean }>;
    initialCode?: string;
    correctCode?: string;
    items?: Array<{ id: string; leftLabel: string; rightLabel: string }>;
  };
}

export default function LessonLayout({ lesson }: { lesson: Lesson }) {
  const { completeLesson } = useGameStore();
  const [taskComplete, setTaskComplete] = useState(false);

  const handleTaskComplete = () => {
    setTaskComplete(true);
    withViewTransition(() => completeLesson(lesson.id));
  };

  return (
    <div className="space-y-6 p-4 pb-24 sm:pb-6">
      <h2 className="text-2xl font-bold">{lesson.title}</h2>
      <div className="bg-gray-900 p-6 rounded-lg">
        <MarkdownRenderer content={lesson.content} />
      </div>
      <div className="bg-gray-900 p-6 rounded-lg">
        {lesson.task.type === 'mcq' && (
          <MCQ question={lesson.task.question!} options={lesson.task.options!} />
        )}
        {lesson.task.type === 'code-fix' && (
          <CodeFix initialCode={lesson.task.initialCode!} correctCode={lesson.task.correctCode!} />
        )}
        {lesson.task.type === 'matching' && (
          <Matching items={lesson.task.items!} />
        )}
      </div>
      {!taskComplete && (
        <button
          onClick={handleTaskComplete}
          className="touch-target bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg text-lg"
        >
          Submit Task
        </button>
      )}
      {taskComplete && (
        <div className="p-6 rounded-lg bg-green-900 text-green-200 text-center">
          <p className="text-xl font-bold">Lesson Complete! Well done!</p>
        </div>
      )}
    </div>
  );
}
