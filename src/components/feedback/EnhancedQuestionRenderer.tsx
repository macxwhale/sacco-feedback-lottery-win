
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { StarRating } from './StarRating';
import { NPSRating } from './NPSRating';
import { LikertScale } from './LikertScale';
import { MultipleChoice } from './MultipleChoice';
import { OpenText } from './OpenText';
import { EmojiRating } from './EmojiRating';
import { RankingQuestion } from './RankingQuestion';
import { MatrixQuestion } from './MatrixQuestion';
import { EnhancedSlider } from './EnhancedSlider';
import { QuestionConfig } from '../FeedbackForm';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface EnhancedQuestionRendererProps {
  question: QuestionConfig;
  value: any;
  onChange: (value: any) => void;
  validation?: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
}

export const EnhancedQuestionRenderer: React.FC<EnhancedQuestionRendererProps> = ({
  question,
  value,
  onChange,
  validation
}) => {
  const hasValue = value !== undefined && value !== null && value !== '';
  const isValid = validation?.isValid !== false;

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'star':
        return <StarRating value={value || 0} onChange={onChange} />;
      case 'nps':
        return <NPSRating value={value} onChange={onChange} />;
      case 'likert':
        return <LikertScale value={value} onChange={onChange} scale={question.scale} />;
      case 'emoji':
        return <EmojiRating value={value} onChange={onChange} options={question.options || []} />;
      case 'ranking':
        return <RankingQuestion value={value} onChange={onChange} options={question.options || []} />;
      case 'matrix':
        return <MatrixQuestion value={value} onChange={onChange} options={question.options || []} scale={question.scale} />;
      case 'slider':
        return <EnhancedSlider value={value} onChange={onChange} scale={question.scale} />;
      case 'single-choice':
      case 'multi-choice':
        return <MultipleChoice options={question.options || []} value={value} onChange={onChange} multiple={question.type === 'multi-choice'} />;
      case 'text':
        return <OpenText value={value || ''} onChange={onChange} placeholder="Please share your thoughts..." />;
      default:
        return null;
    }
  };

  return (
    <Card className="mb-8 shadow-lg border-0 animate-fade-in">
      <CardHeader className={`bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white rounded-t-lg relative ${
        hasValue && isValid ? 'border-b-2 border-green-400' : ''
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl pr-4">
              {question.question}
            </CardTitle>
            {question.required && (
              <span className="text-orange-200 text-sm flex items-center mt-1">
                <span className="text-red-300 mr-1">*</span>
                Required
              </span>
            )}
          </div>
          {hasValue && isValid && (
            <CheckCircle className="h-6 w-6 text-green-300 flex-shrink-0" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {validation?.errors && validation.errors.length > 0 && (
          <Alert className="mb-4 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {validation.errors[0]}
            </AlertDescription>
          </Alert>
        )}
        
        {validation?.warnings && validation.warnings.length > 0 && (
          <Alert className="mb-4 border-yellow-200 bg-yellow-50">
            <Info className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-700">
              {validation.warnings[0]}
            </AlertDescription>
          </Alert>
        )}

        <div role="group" aria-labelledby={`question-${question.id}`}>
          {renderQuestionInput()}
        </div>
      </CardContent>
    </Card>
  );
};
