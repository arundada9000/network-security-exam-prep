import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Flashcard from '@/components/Flashcard';
import { exams } from '@/data/examData';
import Confetti from '@/components/Confetti';

export default function Flashcards() {
  const { examId } = useParams();
  const exam = exams.find(e => e.id === examId);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  const [unknownCards, setUnknownCards] = useState<Set<string>>(new Set());
  const [shuffledQuestions, setShuffledQuestions] = useState(exam?.questions || []);
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    if (exam) {
      const shuffled = [...exam.questions].sort(() => Math.random() - 0.5);
      setShuffledQuestions(shuffled);
    }
  }, [exam]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    } else if (e.key === 'ArrowRight') {
      setCurrentIndex(prev => Math.min(shuffledQuestions.length - 1, prev + 1));
    }
  }, [shuffledQuestions.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!exam) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Exam not found</h1>
            <Link to="/exams" className="btn-accent">Browse Exams</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentIndex];
  const totalKnown = knownCards.size;
  const totalUnknown = unknownCards.size;
  const totalReviewed = totalKnown + totalUnknown;
  const allReviewed = totalReviewed === shuffledQuestions.length;

  const handleMarkKnown = () => {
    if (currentQuestion) {
      setKnownCards(prev => new Set(prev).add(currentQuestion.id));
      setUnknownCards(prev => {
        const next = new Set(prev);
        next.delete(currentQuestion.id);
        return next;
      });
    }
    if (totalReviewed + 1 === shuffledQuestions.length) {
      setShowComplete(true);
    }
  };

  const handleMarkUnknown = () => {
    if (currentQuestion) {
      setUnknownCards(prev => new Set(prev).add(currentQuestion.id));
      setKnownCards(prev => {
        const next = new Set(prev);
        next.delete(currentQuestion.id);
        return next;
      });
    }
    if (totalReviewed + 1 === shuffledQuestions.length) {
      setShowComplete(true);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...exam.questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentIndex(0);
    setKnownCards(new Set());
    setUnknownCards(new Set());
    setShowComplete(false);
  };

  const handleReviewUnknown = () => {
    const unknownQuestions = shuffledQuestions.filter(q => unknownCards.has(q.id));
    setShuffledQuestions(unknownQuestions);
    setCurrentIndex(0);
    setKnownCards(new Set());
    setUnknownCards(new Set());
    setShowComplete(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Confetti isActive={showComplete && totalKnown === shuffledQuestions.length} />

      <main className="flex-grow py-8">
        <div className="section-container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <Link to={`/exam/${examId}`} className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Exam
              </Link>
              <h1 className="text-2xl font-bold text-foreground">{exam.title}</h1>
              <p className="text-muted-foreground">Flashcard Study Mode</p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={handleShuffle} className="btn-secondary text-sm py-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Shuffle
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="card-glass p-4 text-center">
              <div className="text-2xl font-bold text-success">{totalKnown}</div>
              <div className="text-xs text-muted-foreground">Mastered</div>
            </div>
            <div className="card-glass p-4 text-center">
              <div className="text-2xl font-bold text-warning">{totalUnknown}</div>
              <div className="text-xs text-muted-foreground">Still Learning</div>
            </div>
            <div className="card-glass p-4 text-center">
              <div className="text-2xl font-bold text-muted-foreground">{shuffledQuestions.length - totalReviewed}</div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
          </div>

          {/* Completion Screen */}
          {showComplete ? (
            <div className="card-glass p-12 text-center animate-fade-in">
              <div className="text-6xl mb-4">
                {totalKnown === shuffledQuestions.length ? '🎉' : '💪'}
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {totalKnown === shuffledQuestions.length 
                  ? 'Perfect! All Cards Mastered!' 
                  : 'Session Complete!'}
              </h2>
              <p className="text-muted-foreground mb-6">
                You mastered {totalKnown} out of {shuffledQuestions.length} cards
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {totalUnknown > 0 && (
                  <button onClick={handleReviewUnknown} className="btn-accent">
                    Review {totalUnknown} Unknown Cards
                  </button>
                )}
                <button onClick={handleShuffle} className="btn-secondary">
                  Start Over
                </button>
                <Link to={`/exam/${examId}`} className="btn-outline">
                  Take Exam
                </Link>
              </div>
            </div>
          ) : currentQuestion && (
            <Flashcard
              question={currentQuestion}
              currentIndex={currentIndex}
              totalCards={shuffledQuestions.length}
              onNext={() => setCurrentIndex(prev => Math.min(shuffledQuestions.length - 1, prev + 1))}
              onPrevious={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              onMarkKnown={handleMarkKnown}
              onMarkUnknown={handleMarkUnknown}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
