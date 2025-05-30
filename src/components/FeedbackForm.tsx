
import React from 'react';
import { FeedbackHeader } from './feedback/FeedbackHeader';
import { EnhancedProgressBar } from './feedback/EnhancedProgressBar';
import { EnhancedQuestionRenderer } from './feedback/EnhancedQuestionRenderer';
import { NavigationButtons } from './feedback/NavigationButtons';
import { ThankYouModal } from './ThankYouModal';
import { useFeedbackForm } from '@/hooks/useFeedbackForm';

export interface QuestionConfig {
  id: string;
  type: 'star' | 'nps' | 'likert' | 'single-choice' | 'multi-choice' | 'text' | 'emoji' | 'ranking' | 'matrix' | 'slider';
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
  score: number;
}

const FeedbackForm = () => {
  const {
    questions,
    currentQuestionIndex,
    responses,
    isComplete,
    finalResponses,
    isLoading,
    completedQuestions,
    handleResponse,
    isCurrentQuestionAnswered,
    goToNext,
    goToPrevious,
    resetForm,
    getValidationResult
  } = useFeedbackForm();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#f97316] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your feedback form...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        <FeedbackHeader />
        
        <EnhancedProgressBar 
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          completedQuestions={completedQuestions}
        />

        <EnhancedQuestionRenderer
          question={currentQuestion}
          value={responses[currentQuestion?.id]}
          onChange={(value) => handleResponse(currentQuestion.id, value)}
          validation={getValidationResult(currentQuestion?.id)}
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
