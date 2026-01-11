import { useParams, useLocation, Link } from 'react-router-dom';
import QuestionRenderer from '@/components/QuestionRenderer';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { exams, type Question } from '@/data/examData';

export default function ExamResults() {
  const { examId } = useParams();
  const location = useLocation();

  const exam = exams.find((e) => e.id === examId);
  const {
    answers = {},
    questions = [],
    score = 0,
    correct = 0,
    totalQuestions = 0,
    timeTaken = 0,
  } = location.state || {};

  if (!exam || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">No Results Found</h1>
            <Link to="/exams" className="btn-accent">
              Browse Exams
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalPoints = questions.reduce((sum: number, q: Question) => sum + q.points, 0);
  const percentage = Math.round((score / totalPoints) * 100);
  const passed = percentage >= 70;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  // Calculate stats by question type
  const typeStats = questions.reduce((acc: Record<string, { correct: number; total: number }>, q: Question) => {
    const type = q.type;
    if (!acc[type]) acc[type] = { correct: 0, total: 0 };
    acc[type].total++;
    
    const userAnswer = answers[q.id] || [];
    const isCorrect =
      q.type === 'fill-blank'
        ? q.correctAnswers.some((ans: string) => ans.toLowerCase() === (userAnswer[0] || '').toLowerCase())
        : q.correctAnswers.length === userAnswer.length &&
          q.correctAnswers.every((ans: string) => userAnswer.includes(ans));
    
    if (isCorrect) acc[type].correct++;
    return acc;
  }, {});

  const typeLabels: Record<string, string> = {
    'single': 'Single Select',
    'multi': 'Multi Select',
    'fill-blank': 'Fill in Blank'
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow py-8 sm:py-12">
        <div className="section-container">
          {/* Summary Card */}
          <div className={`card-elevated p-6 md:p-8 mb-8 border-l-4 ${passed ? 'border-l-success' : 'border-l-destructive'}`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                  passed ? 'bg-success/10' : 'bg-destructive/10'
                }`}>
                  {passed ? (
                    <svg className="w-7 h-7 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-7 h-7 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">{exam.title}</h1>
                  <p className={`text-sm font-medium ${passed ? 'text-success' : 'text-destructive'}`}>
                    {passed ? '✓ Passed' : '✗ Not Passed'} — {percentage}% Score
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="text-center px-4 py-3 bg-accent/10 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-accent">{percentage}%</div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
                <div className="text-center px-4 py-3 bg-muted rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-foreground">{correct}/{totalQuestions}</div>
                  <div className="text-xs text-muted-foreground">Correct</div>
                </div>
                <div className="text-center px-4 py-3 bg-muted rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-foreground">{formatTime(timeTaken)}</div>
                  <div className="text-xs text-muted-foreground">Time</div>
                </div>
              </div>
            </div>

            {/* Performance by Type */}
            {Object.keys(typeStats).length > 1 && (
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Performance by Question Type</h3>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(typeStats).map(([type, stats]) => {
                    const typedStats = stats as { correct: number; total: number };
                    return (
                      <div key={type} className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-1.5 rounded-lg">
                        <span className="text-muted-foreground">{typeLabels[type] || type}:</span>
                        <span className={`font-medium ${typedStats.correct === typedStats.total ? 'text-success' : typedStats.correct === 0 ? 'text-destructive' : 'text-foreground'}`}>
                          {typedStats.correct}/{typedStats.total}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Questions Review */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Question Review</h2>
              <span className="text-sm text-muted-foreground">{questions.length} questions</span>
            </div>
            
            {questions.map((q: Question, index: number) => {
              const userAnswer = answers[q.id] || [];
              const isCorrect =
                q.type === 'fill-blank'
                  ? q.correctAnswers.some(
                      (ans: string) => ans.toLowerCase() === (userAnswer[0] || '').toLowerCase()
                    )
                  : q.correctAnswers.length === userAnswer.length &&
                    q.correctAnswers.every((ans: string) => userAnswer.includes(ans));

              return (
                <div key={q.id} className={`card-elevated p-5 sm:p-6 border-l-4 ${isCorrect ? 'border-l-success' : 'border-l-destructive'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect ? 'bg-success/10' : 'bg-destructive/10'
                    }`}>
                      {isCorrect ? (
                        <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-destructive" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm font-medium ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                      {isCorrect ? 'Correct' : 'Incorrect'} • {q.points} pts
                    </span>
                  </div>
                  <QuestionRenderer
                    question={q}
                    questionNumber={index + 1}
                    totalQuestions={questions.length}
                    onAnswer={() => {}}
                    currentAnswer={userAnswer}
                    mode="test"
                    showFeedback
                  />
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-border">
            <Link to={`/exam/${examId}`} className="btn-accent">
              Retake Exam
            </Link>
            <Link to="/exams" className="btn-secondary">
              Browse Other Exams
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
