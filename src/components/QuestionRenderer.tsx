import { useState, useEffect } from 'react';
import type { Question } from '@/data/examData';

interface QuestionRendererProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answers: string[]) => void;
  currentAnswer: string[];
  mode: 'practice' | 'test';
  showFeedback?: boolean;
}

export default function QuestionRenderer({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  currentAnswer,
  mode,
  showFeedback = false,
}: QuestionRendererProps) {
  const [fillBlankValue, setFillBlankValue] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);

  const shouldShowFeedback = mode === 'practice' && hasAnswered;

  useEffect(() => {
    setFillBlankValue(currentAnswer[0] || '');
    setHasAnswered(currentAnswer.length > 0);
  }, [question.id, currentAnswer]);

  const handleOptionClick = (optionId: string) => {
    if (shouldShowFeedback) return;

    let newAnswer: string[];
    if (question.type === 'single') {
      newAnswer = [optionId];
    } else {
      if (currentAnswer.includes(optionId)) {
        newAnswer = currentAnswer.filter((id) => id !== optionId);
      } else {
        newAnswer = [...currentAnswer, optionId];
      }
    }
    onAnswer(newAnswer);
    if (mode === 'practice') {
      setHasAnswered(true);
    }
  };

  const handleFillBlankSubmit = () => {
    if (fillBlankValue.trim()) {
      onAnswer([fillBlankValue.trim()]);
      if (mode === 'practice') {
        setHasAnswered(true);
      }
    }
  };

  const isCorrect = (optionId: string) => question.correctAnswers.includes(optionId);
  const isSelected = (optionId: string) => currentAnswer.includes(optionId);

  const getOptionClass = (optionId: string) => {
    const baseClass = 'w-full p-4 rounded-lg text-left transition-all duration-200 flex items-start gap-3';
    
    if (shouldShowFeedback || showFeedback) {
      if (isCorrect(optionId) && isSelected(optionId)) {
        return `${baseClass} option-correct`;
      }
      if (isCorrect(optionId)) {
        return `${baseClass} option-correct opacity-70`;
      }
      if (isSelected(optionId) && !isCorrect(optionId)) {
        return `${baseClass} option-incorrect`;
      }
      return `${baseClass} option-default opacity-50`;
    }
    
    if (isSelected(optionId)) {
      return `${baseClass} option-selected`;
    }
    return `${baseClass} option-default`;
  };

  const isFillBlankCorrect = question.correctAnswers.some(
    (ans) => ans.toLowerCase() === fillBlankValue.trim().toLowerCase()
  );

  return (
    <div className="animate-fade-in">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Question {questionNumber} of {totalQuestions}</span>
          <span className="flex items-center gap-1">
            <span className="font-medium text-accent">{question.points}</span> points
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Type Badge */}
      <div className="mb-4">
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">
          {question.type === 'single' && 'Single Select'}
          {question.type === 'multi' && 'Multi Select'}
          {question.type === 'fill-blank' && 'Fill in the Blank'}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-xl font-semibold text-foreground mb-6">{question.question}</h2>

      {/* Options */}
      {(question.type === 'single' || question.type === 'multi') && question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              disabled={shouldShowFeedback || showFeedback}
              className={getOptionClass(option.id)}
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{option.text}</span>
              {(shouldShowFeedback || showFeedback) && isCorrect(option.id) && (
                <svg className="w-5 h-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {(shouldShowFeedback || showFeedback) && isSelected(option.id) && !isCorrect(option.id) && (
                <svg className="w-5 h-5 text-destructive flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fill in the Blank */}
      {question.type === 'fill-blank' && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={fillBlankValue}
              onChange={(e) => setFillBlankValue(e.target.value)}
              placeholder="Type your answer..."
              disabled={shouldShowFeedback || showFeedback}
              className={`input-field flex-1 ${
                (shouldShowFeedback || showFeedback)
                  ? isFillBlankCorrect
                    ? 'border-success bg-success/10'
                    : 'border-destructive bg-destructive/10'
                  : ''
              }`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !shouldShowFeedback && !showFeedback) {
                  handleFillBlankSubmit();
                }
              }}
            />
            {!shouldShowFeedback && !showFeedback && (
              <button
                onClick={handleFillBlankSubmit}
                className="btn-accent"
              >
                Submit
              </button>
            )}
          </div>
          {(shouldShowFeedback || showFeedback) && !isFillBlankCorrect && (
            <p className="text-sm text-muted-foreground">
              Correct answer: <span className="font-medium text-success">{question.correctAnswers[0]}</span>
            </p>
          )}
        </div>
      )}

      {/* Explanation */}
      {(shouldShowFeedback || showFeedback) && (
        <div className="mt-6 p-4 rounded-lg bg-muted border border-border animate-fade-in">
          <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Explanation
          </h4>
          <p className="text-sm text-muted-foreground">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
