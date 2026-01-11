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
      <div className="min-h-screen flex flex-col">
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
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="section-container">
          {/* Summary Card */}
          <div className="card-elevated p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">{exam.title}</h1>
                <p className="text-muted-foreground">Exam Results</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="text-center px-6 py-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-accent">{percentage}%</div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
                <div className="text-center px-6 py-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{correct}/{totalQuestions}</div>
                  <div className="text-xs text-muted-foreground">Correct</div>
                </div>
                <div className="text-center px-6 py-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{formatTime(timeTaken)}</div>
                  <div className="text-xs text-muted-foreground">Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Questions Review */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Question Review</h2>
            {questions.map((q: Question, index: number) => {
              const userAnswer = answers[q.id] || [];
              const isCorrect =
                q.type === 'fill-blank'
                  ? q.correctAnswers.some(
                      (ans) => ans.toLowerCase() === (userAnswer[0] || '').toLowerCase()
                    )
                  : q.correctAnswers.length === userAnswer.length &&
                    q.correctAnswers.every((ans) => userAnswer.includes(ans));

              return (
                <div key={q.id} className="card-elevated p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCorrect ? 'bg-success/10' : 'bg-destructive/10'
                    }`}>
                      {isCorrect ? (
                        <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-destructive" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm font-medium ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
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
          <div className="flex flex-wrap gap-4 mt-8">
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
