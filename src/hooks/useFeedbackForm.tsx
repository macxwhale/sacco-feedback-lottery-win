
import { useState, useEffect } from 'react';
import { QuestionConfig, FeedbackResponse } from '@/components/FeedbackForm';
import { fetchQuestions } from '@/services/questionsService';
import { useFormNavigation } from './useFormNavigation';
import { useFormResponses } from './useFormResponses';

export const useFeedbackForm = () => {
  const [questions, setQuestions] = useState<QuestionConfig[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [finalResponses, setFinalResponses] = useState<FeedbackResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { responses, handleResponse, generateFinalResponses, resetResponses } = useFormResponses();
  const { currentQuestionIndex, goToNext, goToPrevious, resetNavigation } = useFormNavigation(questions.length);

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchQuestions();
      setQuestions(data);
      setIsLoading(false);
    };
    loadQuestions();
  }, []);

  const isCurrentQuestionAnswered = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return false;
    
    const response = responses[currentQuestion.id];
    if (!currentQuestion.required) return true;
    
    if (currentQuestion.type === 'multi-choice') {
      return Array.isArray(response) && response.length > 0;
    }
    
    return response !== undefined && response !== null && response !== '';
  };

  const submitFeedback = async () => {
    const responsesWithScores = generateFinalResponses();
    setFinalResponses(responsesWithScores);
    setIsComplete(true);
    console.log('Submitting feedback:', responsesWithScores);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      goToNext();
    } else {
      submitFeedback();
    }
  };

  const resetForm = () => {
    resetNavigation();
    resetResponses();
    setIsComplete(false);
    setFinalResponses([]);
  };

  return {
    questions,
    currentQuestionIndex,
    responses,
    isComplete,
    finalResponses,
    isLoading,
    handleResponse,
    isCurrentQuestionAnswered,
    goToNext: handleNext,
    goToPrevious,
    resetForm
  };
};
