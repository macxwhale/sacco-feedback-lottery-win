
import { useState, useEffect } from 'react';
import { QuestionConfig, FeedbackResponse } from '@/components/FeedbackForm';

export const useFeedbackForm = () => {
  const [questions, setQuestions] = useState<QuestionConfig[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [finalResponses, setFinalResponses] = useState<FeedbackResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated API call to fetch questions configuration
  useEffect(() => {
    const fetchQuestions = async () => {
      // Simulated API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample questions configuration
      const sampleQuestions: QuestionConfig[] = [
        {
          id: 'satisfaction',
          type: 'star',
          question: 'How satisfied are you with our service?',
          required: true,
        },
        {
          id: 'nps',
          type: 'nps',
          question: 'How likely are you to recommend Police Sacco to a friend or colleague?',
          required: true,
        },
        {
          id: 'ease-of-use',
          type: 'likert',
          question: 'Our services are easy to use',
          required: true,
          scale: {
            min: 1,
            max: 5,
            minLabel: 'Strongly Disagree',
            maxLabel: 'Strongly Agree'
          }
        },
        {
          id: 'preferred-service',
          type: 'single-choice',
          question: 'Which service do you use most frequently?',
          required: true,
          options: ['Savings Account', 'Loans', 'Insurance', 'Investment', 'Mobile Banking']
        },
        {
          id: 'improvements',
          type: 'multi-choice',
          question: 'What areas would you like us to improve? (Select all that apply)',
          required: false,
          options: ['Customer Service', 'Mobile App', 'Interest Rates', 'Branch Hours', 'Online Services']
        },
        {
          id: 'comments',
          type: 'text',
          question: 'Please share any additional comments or suggestions',
          required: false,
        }
      ];
      
      setQuestions(sampleQuestions);
      setIsLoading(false);
    };

    fetchQuestions();
  }, []);

  const generateRandomScore = () => Math.floor(Math.random() * 100) + 1;

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

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

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      submitFeedback();
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const submitFeedback = async () => {
    const responsesWithScores: FeedbackResponse[] = Object.entries(responses).map(([questionId, value]) => ({
      questionId,
      value,
      score: generateRandomScore()
    }));

    setFinalResponses(responsesWithScores);
    setIsComplete(true);
    
    // Simulated API call to submit feedback
    console.log('Submitting feedback:', responsesWithScores);
  };

  const resetForm = () => {
    setCurrentQuestionIndex(0);
    setResponses({});
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
    goToNext,
    goToPrevious,
    resetForm
  };
};
