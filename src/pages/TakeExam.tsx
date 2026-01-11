import { useState, useEffect, useMemo, useCallback } from 'react';
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
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState((exam?.duration || 30) * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [showNavigator, setShowNavigator] = useState(true);

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

  // Timer
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
          break;
        case 'ArrowRight':
          if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
          break;
        case 'b':
        case 'B':
          toggleBookmark(questions[currentIndex].id);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions]);

  const toggleBookmark = useCallback((questionId: string) => {
    setBookmarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  }, []);

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
  const totalAnswered = Object.keys(answers).filter(k => answers[k].length > 0).length;
  const unansweredCount = questions.length - totalAnswered;
  const bookmarkedCount = bookmarked.size;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getTimeClass = () => {
    if (timeLeft < 60) return 'bg-destructive text-destructive-foreground animate-pulse';
    if (timeLeft < 300) return 'bg-warning/20 text-warning';
    return 'bg-muted text-foreground';
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

  const goToFirstUnanswered = () => {
    const idx = questions.findIndex(q => !answers[q.id] || answers[q.id].length === 0);
    if (idx !== -1) setCurrentIndex(idx);
  };

  const goToFirstBookmarked = () => {
    const idx = questions.findIndex(q => bookmarked.has(q.id));
    if (idx !== -1) setCurrentIndex(idx);
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
        <div className="section-container py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="font-semibold text-foreground truncate">{exam.title}</h1>
              <p className="text-xs text-muted-foreground">
                {mode === 'practice' ? 'Practice Mode' : 'Test Mode'} • {totalAnswered}/{questions.length} answered
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {mode === 'test' && (
                <div className={`px-3 py-1.5 rounded-lg font-mono text-sm font-medium ${getTimeClass()}`}>
                  <span className="hidden sm:inline">⏱ </span>{formatTime(timeLeft)}
                </div>
              )}
              <button
                onClick={() => setShowNavigator(!showNavigator)}
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors sm:hidden"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
              <button 
                onClick={handleFinish} 
                className="btn-secondary text-sm py-2 px-3"
              >
                <span className="hidden sm:inline">End </span>Exam
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="section-container py-6">
        <div className="max-w-4xl mx-auto">
          {/* Quick Stats */}
          {(unansweredCount > 0 || bookmarkedCount > 0) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {unansweredCount > 0 && (
                <button
                  onClick={goToFirstUnanswered}
                  className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
                >
                  {unansweredCount} unanswered
                </button>
              )}
              {bookmarkedCount > 0 && (
                <button
                  onClick={goToFirstBookmarked}
                  className="text-xs px-3 py-1.5 rounded-full bg-warning/10 hover:bg-warning/20 text-warning transition-colors flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  {bookmarkedCount} bookmarked
                </button>
              )}
            </div>
          )}

          {/* Question Navigator */}
          <div className={`${showNavigator ? 'block' : 'hidden sm:block'} mb-6`}>
            <div className="flex flex-wrap gap-1.5 p-3 bg-card rounded-xl border border-border">
              {questions.map((q, index) => {
                const isAnswered = answers[q.id] && answers[q.id].length > 0;
                const isMarked = bookmarked.has(q.id);
                const isCurrent = index === currentIndex;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative w-9 h-9 rounded-lg text-xs font-medium transition-all ${
                      isCurrent
                        ? 'bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2 ring-offset-card'
                        : isAnswered
                        ? 'bg-primary/10 text-primary hover:bg-primary/20'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {index + 1}
                    {isMarked && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-warning rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center hidden sm:block">
              Tip: Use ← → arrow keys to navigate, B to bookmark
            </p>
          </div>

          {/* Question */}
          <div className="card-elevated p-5 sm:p-8 mb-6">
            <QuestionRenderer
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              totalQuestions={questions.length}
              onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
              currentAnswer={answers[currentQuestion.id] || []}
              mode={mode}
              isBookmarked={bookmarked.has(currentQuestion.id)}
              onToggleBookmark={() => toggleBookmark(currentQuestion.id)}
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </button>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="hidden sm:inline">{currentIndex + 1} of {questions.length}</span>
            </div>

            {currentIndex === questions.length - 1 ? (
              <button onClick={handleFinish} className="btn-accent flex items-center">
                Finish
                <svg className="w-4 h-4 ml-1 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            ) : (
              <button onClick={handleNext} className="btn-accent flex items-center">
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <svg className="w-4 h-4 ml-1 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
