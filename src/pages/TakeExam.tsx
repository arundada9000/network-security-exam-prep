import { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import QuestionRenderer from '@/components/QuestionRenderer';
import { exams, type Question } from '@/data/examData';

export default function TakeExam() {
  const { examId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const mode = (location.state?.mode as 'practice' | 'test') || 'practice';
  const randomize = location.state?.randomize ?? true;

  const exam = exams.find((e) => e.id === examId);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [timeLeft, setTimeLeft] = useState((exam?.duration || 30) * 60);
  const [isFinished, setIsFinished] = useState(false);

  const questions = useMemo(() => {
    if (!exam) return [];
    const q = [...exam.questions];
    if (randomize) {
      for (let i = q.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [q[i], q[j]] = [q[j], q[i]];
      }
    }
    return q;
  }, [exam, randomize]);

  useEffect(() => {
    if (mode === 'test' && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [mode, isFinished]);

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Exam Not Found</h1>
          <Link to="/exams" className="btn-accent">
            Browse Exams
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const totalAnswered = Object.keys(answers).length;
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    let score = 0;
    let correct = 0;
    questions.forEach((q) => {
      const userAnswer = answers[q.id] || [];
      const isCorrect = 
        q.type === 'fill-blank'
          ? q.correctAnswers.some((ans) => 
              ans.toLowerCase() === (userAnswer[0] || '').toLowerCase()
            )
          : q.correctAnswers.length === userAnswer.length &&
            q.correctAnswers.every((ans) => userAnswer.includes(ans));
      if (isCorrect) {
        score += q.points;
        correct++;
      }
    });
    return { score, correct };
  };

  const handleAnswer = (questionId: string, answer: string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const handleViewResults = () => {
    const { score, correct } = calculateScore();
    navigate(`/exam/${examId}/results`, {
      state: {
        answers,
        questions,
        score,
        correct,
        totalQuestions: questions.length,
        timeTaken: (exam.duration * 60) - timeLeft,
        mode,
      },
    });
  };

  // Results screen for test mode
  if (isFinished && mode === 'test') {
    const { score, correct } = calculateScore();
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="card-elevated p-8 max-w-md w-full text-center animate-fade-in">
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
            percentage >= 70 ? 'bg-success/10' : 'bg-destructive/10'
          }`}>
            {percentage >= 70 ? (
              <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-10 h-10 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">
            {percentage >= 70 ? 'Congratulations!' : 'Keep Practicing!'}
          </h1>
          <p className="text-muted-foreground mb-6">
            {percentage >= 70 
              ? 'You passed the exam. Great work!' 
              : 'You need 70% to pass. Review and try again.'}
          </p>

          <div className="text-5xl font-bold text-accent mb-2">{percentage}%</div>
          <p className="text-sm text-muted-foreground mb-8">
            {correct} of {questions.length} correct • {score} of {totalPoints} points
          </p>

          <div className="flex gap-3">
            <button onClick={handleViewResults} className="btn-accent flex-1">
              View Details
            </button>
            <Link to="/exams" className="btn-secondary flex-1">
              Back to Exams
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="section-container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold text-foreground">{exam.title}</h1>
              <p className="text-sm text-muted-foreground">
                {mode === 'practice' ? 'Practice Mode' : 'Test Mode'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {mode === 'test' && (
                <div className={`px-4 py-2 rounded-lg font-mono text-lg font-medium ${
                  timeLeft < 60 ? 'bg-destructive/10 text-destructive' : 'bg-muted text-foreground'
                }`}>
                  {formatTime(timeLeft)}
                </div>
              )}
              <button 
                onClick={handleFinish} 
                className="btn-secondary text-sm py-2"
              >
                End Exam
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="section-container py-8">
        <div className="max-w-3xl mx-auto">
          {/* Question Navigator */}
          <div className="flex flex-wrap gap-2 mb-8">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                  index === currentIndex
                    ? 'bg-accent text-accent-foreground'
                    : answers[q.id]
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Question */}
          <div className="card-elevated p-6 md:p-8 mb-6">
            <QuestionRenderer
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              totalQuestions={questions.length}
              onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
              currentAnswer={answers[currentQuestion.id] || []}
              mode={mode}
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <span className="text-sm text-muted-foreground">
              {totalAnswered} of {questions.length} answered
            </span>

            {currentIndex === questions.length - 1 ? (
              <button onClick={handleFinish} className="btn-accent">
                Finish Exam
              </button>
            ) : (
              <button onClick={handleNext} className="btn-accent">
                Next
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
