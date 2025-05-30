import React, { useEffect } from 'react';
import { FeedbackHeader } from './feedback/FeedbackHeader';
import { EnhancedProgressBar } from './feedback/EnhancedProgressBar';
import { EnhancedQuestionRenderer } from './feedback/EnhancedQuestionRenderer';
import { NavigationButtons } from './feedback/NavigationButtons';
import { ThankYouModal } from './ThankYouModal';
import { EnhancedLoading } from './feedback/EnhancedLoading';
import { SuccessAnimation } from './feedback/SuccessAnimation';
import { useFeedbackForm } from '@/hooks/useFeedbackForm';
import { ProgressInsights } from './feedback/ProgressInsights';
import { SmartSuggestions } from './feedback/SmartSuggestions';
import { useAnalytics } from '@/hooks/useAnalytics';

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

  const {
    trackQuestionStart,
    trackQuestionResponse,
    getAverageResponseTime,
    getEstimatedTimeRemaining,
    engagementScore
  } = useAnalytics(responses, questions.length, finalResponses);

  useEffect(() => {
    trackQuestionStart();
  }, [currentQuestionIndex, trackQuestionStart]);

  const handleQuestionResponse = (questionId: string, value: any) => {
    handleResponse(questionId, value);
    trackQuestionResponse();
  };

  if (isLoading) {
    return <EnhancedLoading />;
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

        <ProgressInsights
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          completedQuestions={completedQuestions}
          estimatedTimeRemaining={getEstimatedTimeRemaining(currentQuestionIndex)}
          averageResponseTime={getAverageResponseTime()}
        />

        <EnhancedQuestionRenderer
          question={currentQuestion}
          value={responses[currentQuestion?.id]}
          onChange={(value) => handleQuestionResponse(currentQuestion.id, value)}
          validation={getValidationResult(currentQuestion?.id)}
        />

        <SmartSuggestions
          currentQuestion={currentQuestion}
          responses={responses}
          onSuggestionClick={(value) => handleQuestionResponse(currentQuestion.id, value)}
        />

        <NavigationButtons
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          canGoNext={isCurrentQuestionAnswered()}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      </div>

      <SuccessAnimation 
        show={isComplete && !finalResponses.length}
        message="Feedback Submitted!"
      />

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
