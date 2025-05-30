
import React from 'react';
import { FeedbackHeader } from './feedback/FeedbackHeader';
import { ProgressBar } from './feedback/ProgressBar';
import { QuestionRenderer } from './feedback/QuestionRenderer';
import { NavigationButtons } from './feedback/NavigationButtons';
import { ThankYouModal } from './ThankYouModal';
import { useFeedbackForm } from '@/hooks/useFeedbackForm';

export interface QuestionConfig {
  id: string;
  type: 'star' | 'nps' | 'likert' | 'single-choice' | 'multi-choice' | 'text';
  question: string;
  required: boolean;
  options?: string[];
  scale?: {
    min: number;
    max: number;
    minLabel?: string;
    maxLabel?: string;
  };
}

export interface FeedbackResponse {
  questionId: string;
  value: any;
  score: number; // Random score 1-100
}

const FeedbackForm = () => {
  const {
    questions,
    currentQuestionIndex,
    responses,
    isComplete,
    finalResponses,
    isLoading,
    handleResponse,
    isCurrentQuestionAnswered,
    goToNext,
    goToPrevious,
    resetForm
  } = useFeedbackForm();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#073763]"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        <FeedbackHeader />
        
        <ProgressBar 
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />

        <QuestionRenderer
          question={currentQuestion}
          value={responses[currentQuestion?.id]}
          onChange={(value) => handleResponse(currentQuestion.id, value)}
        />

        <NavigationButtons
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          canGoNext={isCurrentQuestionAnswered()}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      </div>

      <ThankYouModal
        isOpen={isComplete}
        responses={finalResponses}
        questions={questions}
        onClose={resetForm}
      />
    </div>
  );
};

export default FeedbackForm;
