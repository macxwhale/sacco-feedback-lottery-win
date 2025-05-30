
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentQuestionIndex,
  totalQuestions,
  canGoNext,
  onPrevious,
  onNext
}) => {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="flex justify-between items-center">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0}
        className="border-[#073763] text-[#073763] hover:bg-[#073763] hover:text-white"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>

      <Button
        onClick={onNext}
        disabled={!canGoNext}
        className="bg-gradient-to-r from-[#073763] to-[#007ACE] hover:from-[#062c52] hover:to-[#0066a6] text-white"
      >
        {isLastQuestion ? 'Submit' : 'Next'}
        {!isLastQuestion && (
          <ChevronRight className="ml-2 h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
