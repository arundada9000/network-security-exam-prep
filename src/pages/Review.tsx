import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockResults } from '@/data/examData';

export default function Review() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="section-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Results</h1>
            <p className="text-muted-foreground">
              Review your past exam attempts and track your progress.
            </p>
          </div>

          {mockResults.length === 0 ? (
            <div className="card-elevated p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">No Results Yet</h2>
              <p className="text-muted-foreground mb-6">
                You haven't taken any exams yet. Start practicing to see your results here.
              </p>
              <Link to="/exams" className="btn-accent">
                Browse Exams
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mockResults.map((result, index) => {
                const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);
                const passed = percentage >= 70;

                return (
                  <div key={index} className="card-interactive p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{result.examTitle}</h3>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            passed ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                          }`}>
                            {passed ? 'Passed' : 'Failed'}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {result.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s
                          </span>
                          <span>
                            {result.correctAnswers}/{result.totalQuestions} correct
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className={`text-3xl font-bold ${passed ? 'text-success' : 'text-destructive'}`}>
                            {percentage}%
                          </div>
                          <div className="text-xs text-muted-foreground">Score</div>
                        </div>
                        <Link
                          to={`/exam/${result.examId}`}
                          className="btn-secondary text-sm py-2"
                        >
                          Retake
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
