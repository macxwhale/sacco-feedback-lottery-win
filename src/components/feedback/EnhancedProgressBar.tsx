
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface EnhancedProgressBarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  completedQuestions: number[];
}

export const EnhancedProgressBar: React.FC<EnhancedProgressBarProps> = ({
  currentQuestionIndex,
  totalQuestions,
  completedQuestions
}) => {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const completionRate = (completedQuestions.length / totalQuestions) * 100;

  return (
    <div className="mb-8" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          {completedQuestions.includes(currentQuestionIndex) && (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
        </div>
        <div className="text-right">
          <span className="text-sm text-[#f97316] font-medium">
            {Math.round(progress)}% Complete
          </span>
          <div className="text-xs text-gray-500">
            {completedQuestions.length} answered
          </div>
        </div>
      </div>
      
      {/* Main progress bar */}
      <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#f97316] to-[#fb923c] rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
        
        {/* Completion indicator overlay */}
        <div 
          className="absolute top-0 left-0 h-full bg-green-400 opacity-30 rounded-full transition-all duration-500"
          style={{ width: `${completionRate}%` }}
        />
      </div>
      
      {/* Question dots indicator */}
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalQuestions }, (_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentQuestionIndex
                ? 'bg-[#f97316] scale-125'
                : completedQuestions.includes(index)
                ? 'bg-green-500'
                : 'bg-gray-300'
            }`}
            aria-label={`Question ${index + 1} ${
              index === currentQuestionIndex
                ? 'current'
                : completedQuestions.includes(index)
                ? 'completed'
                : 'pending'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
