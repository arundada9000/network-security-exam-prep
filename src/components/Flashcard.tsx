import { useState } from 'react';
import type { Question } from '@/data/examData';

interface FlashcardProps {
  question: Question;
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
  totalCards: number;
  onMarkKnown: () => void;
  onMarkUnknown: () => void;
}

export default function Flashcard({
  question,
  onNext,
  onPrevious,
  currentIndex,
  totalCards,
  onMarkKnown,
  onMarkUnknown,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    onNext();
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    onPrevious();
  };

  const getAnswerText = () => {
    if (question.type === 'fill-blank') {
      return question.correctAnswers[0];
    }
    if (question.options) {
      return question.correctAnswers
        .map(id => question.options?.find(opt => opt.id === id)?.text)
        .filter(Boolean)
        .join(', ');
    }
    return '';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Card {currentIndex + 1} of {totalCards}
        </span>
        <div className="flex items-center gap-2">
          <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card */}
      <div
        className="relative h-80 cursor-pointer perspective-1000"
        onClick={handleFlip}
      >
        <div
          className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front - Question */}
          <div className="absolute inset-0 backface-hidden">
            <div className="card-glass h-full p-8 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent mb-4">
                {question.type === 'single' ? 'Single Choice' : question.type === 'multi' ? 'Multiple Choice' : 'Fill in the Blank'}
              </span>
              <p className="text-xl font-medium text-foreground leading-relaxed">
                {question.question}
              </p>
              <p className="text-sm text-muted-foreground mt-6">
                Click to reveal answer
              </p>
            </div>
          </div>

          {/* Back - Answer */}
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <div className="card-glass h-full p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-accent/5 to-success/5">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-success/10 text-success mb-4">
                Answer
              </span>
              <p className="text-2xl font-bold text-success mb-4">
                {getAnswerText()}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="p-3 rounded-xl bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Previous card"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => { onMarkUnknown(); handleNext(); }}
          className="px-4 py-3 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="hidden sm:inline">Still Learning</span>
        </button>

        <button
          onClick={handleFlip}
          className="px-4 py-3 rounded-xl bg-accent text-accent-foreground hover:opacity-90 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="hidden sm:inline">Flip</span>
        </button>

        <button
          onClick={() => { onMarkKnown(); handleNext(); }}
          className="px-4 py-3 rounded-xl bg-success/10 text-success hover:bg-success/20 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="hidden sm:inline">Got It!</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === totalCards - 1}
          className="p-3 rounded-xl bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Next card"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Keyboard hints */}
      <div className="flex justify-center gap-4 mt-4 text-xs text-muted-foreground">
        <span>← → Navigate</span>
        <span>Space Flip</span>
      </div>
    </div>
  );
}
