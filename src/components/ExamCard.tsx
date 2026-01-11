import { Link } from 'react-router-dom';
import type { Exam } from '@/data/examData';

interface ExamCardProps {
  exam: Exam;
}

export default function ExamCard({ exam }: ExamCardProps) {
  const difficultyColors = {
    Beginner: 'bg-success/10 text-success',
    Intermediate: 'bg-warning/10 text-warning',
    Advanced: 'bg-destructive/10 text-destructive',
  };

  return (
    <div className="card-interactive p-6 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${difficultyColors[exam.difficulty]}`}>
          {exam.difficulty}
        </span>
        <span className="text-xs text-muted-foreground">{exam.category}</span>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">{exam.title}</h3>
      <p className="text-sm text-muted-foreground mb-4 flex-grow">{exam.description}</p>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{exam.duration} min</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{exam.totalQuestions} questions</span>
        </div>
      </div>

      <Link
        to={`/exam/${exam.id}`}
        className="btn-accent text-sm py-2.5 text-center w-full"
      >
        Start Exam
      </Link>
    </div>
  );
}
