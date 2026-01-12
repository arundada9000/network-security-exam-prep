import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { exams } from '@/data/examData';

export default function ExamSetup() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'practice' | 'test'>('practice');
  const [randomize, setRandomize] = useState(true);

  const exam = exams.find((e) => e.id === examId);

  if (!exam) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Exam Not Found</h1>
            <Link to="/exams" className="btn-accent">
              Browse Exams
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleStartExam = () => {
    navigate(`/exam/${examId}/take`, { state: { mode, randomize } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="section-container max-w-2xl">
          {/* Back Link */}
          <Link to="/exams" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Exams
          </Link>

          <div className="card-elevated p-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">{exam.title}</h1>
            <p className="text-muted-foreground mb-6">{exam.description}</p>

            {/* Exam Info */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg mb-8">
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">{exam.totalQuestions}</div>
                <div className="text-xs text-muted-foreground">Questions</div>
              </div>
              <div className="text-center border-x border-border">
                <div className="text-lg font-semibold text-foreground">{exam.duration} min</div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">{exam.difficulty}</div>
                <div className="text-xs text-muted-foreground">Difficulty</div>
              </div>
            </div>

            {/* Mode Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-3">Select Mode</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setMode('practice')}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    mode === 'practice'
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      mode === 'practice' ? 'border-accent' : 'border-muted-foreground'
                    }`}>
                      {mode === 'practice' && <div className="w-2 h-2 rounded-full bg-accent" />}
                    </div>
                    <span className="font-medium text-foreground">Practice Mode</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-7">
                    Get instant feedback and explanations after each question.
                  </p>
                </button>
                <button
                  onClick={() => setMode('test')}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    mode === 'test'
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      mode === 'test' ? 'border-accent' : 'border-muted-foreground'
                    }`}>
                      {mode === 'test' && <div className="w-2 h-2 rounded-full bg-accent" />}
                    </div>
                    <span className="font-medium text-foreground">Test Mode</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-7">
                    Simulate real exam conditions. See results at the end.
                  </p>
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="mb-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <div 
                  onClick={() => setRandomize(!randomize)}
                  className={`w-10 h-6 rounded-full relative transition-colors ${
                    randomize ? 'bg-accent' : 'bg-muted'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-card shadow transition-transform ${
                    randomize ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </div>
                <span className="text-sm text-foreground">Randomize question order</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleStartExam} className="btn-accent flex-1">
                Start Exam
              </button>
              <Link to={`/exam/${examId}/flashcards`} className="btn-secondary flex-1 text-center flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Study Flashcards
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
