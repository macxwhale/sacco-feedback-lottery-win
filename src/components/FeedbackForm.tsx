
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from './feedback/StarRating';
import { NPSRating } from './feedback/NPSRating';
import { LikertScale } from './feedback/LikertScale';
import { MultipleChoice } from './feedback/MultipleChoice';
import { OpenText } from './feedback/OpenText';
import { ThankYouModal } from './ThankYouModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#073763]"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Logo */}
        <div className="mb-8 text-center">
          <img 
            src="https://policesacco.com/wp-content/uploads/2021/07/police-sacco-logo.png" 
            alt="Police Sacco"
            className="h-16 mx-auto mb-4"
            onError={(e) => {
              // Fallback to text if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling!.style.display = 'block';
            }}
          />
          <div style={{ display: 'none' }} className="text-2xl font-bold text-[#073763]">
            Police Sacco
          </div>
          <h1 className="text-3xl font-bold text-[#073763] mt-4">
            We Value Your Feedback
          </h1>
          <p className="text-gray-600 mt-2">
            Help us serve you better by sharing your experience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-[#007ACE] font-medium">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#073763] to-[#007ACE] h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8 shadow-lg border-0 animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-[#073763] to-[#007ACE] text-white rounded-t-lg">
            <CardTitle className="text-xl">
              {currentQuestion?.question}
            </CardTitle>
            {currentQuestion?.required && (
              <span className="text-blue-200 text-sm">* Required</span>
            )}
          </CardHeader>
          <CardContent className="p-6">
            {currentQuestion?.type === 'star' && (
              <StarRating
                value={responses[currentQuestion.id] || 0}
                onChange={(value) => handleResponse(currentQuestion.id, value)}
              />
            )}
            {currentQuestion?.type === 'nps' && (
              <NPSRating
                value={responses[currentQuestion.id]}
                onChange={(value) => handleResponse(currentQuestion.id, value)}
              />
            )}
            {currentQuestion?.type === 'likert' && (
              <LikertScale
                value={responses[currentQuestion.id]}
                onChange={(value) => handleResponse(currentQuestion.id, value)}
                scale={currentQuestion.scale}
              />
            )}
            {(currentQuestion?.type === 'single-choice' || currentQuestion?.type === 'multi-choice') && (
              <MultipleChoice
                options={currentQuestion.options || []}
                value={responses[currentQuestion.id]}
                onChange={(value) => handleResponse(currentQuestion.id, value)}
                multiple={currentQuestion.type === 'multi-choice'}
              />
            )}
            {currentQuestion?.type === 'text' && (
              <OpenText
                value={responses[currentQuestion.id] || ''}
                onChange={(value) => handleResponse(currentQuestion.id, value)}
                placeholder="Please share your thoughts..."
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentQuestionIndex === 0}
            className="border-[#073763] text-[#073763] hover:bg-[#073763] hover:text-white"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={goToNext}
            disabled={currentQuestion?.required && !isCurrentQuestionAnswered()}
            className="bg-gradient-to-r from-[#073763] to-[#007ACE] hover:from-[#062c52] hover:to-[#0066a6] text-white"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
            {currentQuestionIndex < questions.length - 1 && (
              <ChevronRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Thank You Modal */}
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
