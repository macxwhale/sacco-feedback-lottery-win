
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

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
    <div className="mb-10" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-orange-100 px-4 py-2 rounded-full">
            <Circle className="h-4 w-4 text-blue-600 fill-current" />
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>
          {completedQuestions.includes(currentQuestionIndex) && (
            <div className="bg-green-100 p-1 rounded-full animate-scale-in">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          )}
        </div>
        
        <div className="text-right">
          <div className="bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white px-4 py-2 rounded-full shadow-lg">
            <span className="text-sm font-bold">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {completedQuestions.length} answered
          </div>
        </div>
      </div>
      
      {/* Main progress bar with glassmorphism effect */}
      <div className="relative w-full bg-gray-100 rounded-full h-4 overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#fd8640] rounded-full transition-all duration-1000 ease-out shadow-lg"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full" />
          <div className="absolute right-0 top-0 h-full w-4 bg-white/40 rounded-full animate-pulse" />
        </div>
        
        {/* Completion indicator overlay */}
        <div 
          className="absolute top-0 left-0 h-full bg-green-400/30 rounded-full transition-all duration-700"
          style={{ width: `${completionRate}%` }}
        />
      </div>
      
      {/* Enhanced question dots indicator */}
      <div className="flex justify-between mt-4 px-1">
        {Array.from({ length: totalQuestions }, (_, index) => (
          <div
            key={index}
            className={`relative transition-all duration-500 ${
              index === currentQuestionIndex
                ? 'transform scale-150'
                : ''
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentQuestionIndex
                  ? 'bg-gradient-to-r from-[#f97316] to-[#fb923c] shadow-lg ring-4 ring-orange-200'
                  : completedQuestions.includes(index)
                  ? 'bg-green-500 shadow-md'
                  : 'bg-gray-300'
              }`}
            />
            {completedQuestions.includes(index) && (
              <CheckCircle className="absolute -top-1 -left-1 h-5 w-5 text-green-600 animate-scale-in" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
