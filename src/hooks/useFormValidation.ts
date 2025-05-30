
import { useState, useCallback } from 'react';
import { QuestionConfig } from '@/components/FeedbackForm';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const useFormValidation = () => {
  const [validationResults, setValidationResults] = useState<Record<string, ValidationResult>>({});

  const validateQuestion = useCallback((question: QuestionConfig, value: any): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required field validation
    if (question.required) {
      if (value === undefined || value === null || value === '') {
        errors.push('This field is required');
      }
      
      if (question.type === 'multi-choice' && Array.isArray(value) && value.length === 0) {
        errors.push('Please select at least one option');
      }
    }

    // Type-specific validation
    switch (question.type) {
      case 'text':
        if (value && typeof value === 'string') {
          if (value.length < 3 && question.required) {
            warnings.push('Consider providing more detailed feedback');
          }
          if (value.length > 500) {
            errors.push('Response is too long (maximum 500 characters)');
          }
        }
        break;
        
      case 'star':
        if (value !== undefined && (value < 1 || value > 5)) {
          errors.push('Rating must be between 1 and 5 stars');
        }
        break;
        
      case 'nps':
        if (value !== undefined && (value < 0 || value > 10)) {
          errors.push('NPS score must be between 0 and 10');
        }
        break;
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }, []);

  const validateAllQuestions = useCallback((questions: QuestionConfig[], responses: Record<string, any>) => {
    const results: Record<string, ValidationResult> = {};
    
    questions.forEach(question => {
      results[question.id] = validateQuestion(question, responses[question.id]);
    });
    
    setValidationResults(results);
    return results;
  }, [validateQuestion]);

  const getValidationResult = useCallback((questionId: string): ValidationResult => {
    return validationResults[questionId] || { isValid: true, errors: [], warnings: [] };
  }, [validationResults]);

  return {
    validateQuestion,
    validateAllQuestions,
    getValidationResult,
    validationResults
  };
};
