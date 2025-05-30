
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Gift, Trophy, Star } from 'lucide-react';
import { FeedbackResponse, QuestionConfig } from './FeedbackForm';

interface ThankYouModalProps {
  isOpen: boolean;
  responses: FeedbackResponse[];
  questions: QuestionConfig[];
  onClose: () => void;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({
  isOpen,
  responses,
  questions,
  onClose
}) => {
  const totalScore = responses.reduce((sum, response) => sum + response.score, 0);
  const averageScore = responses.length > 0 ? Math.round(totalScore / responses.length) : 0;

  const getQuestionText = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    return question?.question || 'Unknown Question';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { icon: Trophy, label: 'Excellent!', color: 'bg-green-100 text-green-800' };
    if (score >= 60) return { icon: Star, label: 'Good!', color: 'bg-yellow-100 text-yellow-800' };
    return { icon: Gift, label: 'Thanks!', color: 'bg-blue-100 text-blue-800' };
  };

  const badge = getScoreBadge(averageScore);
  const BadgeIcon = badge.icon;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#073763]">
            Thank You for Your Feedback!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Score */}
          <Card className="bg-gradient-to-r from-[#073763] to-[#007ACE] text-white">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <BadgeIcon className="h-12 w-12 mr-3" />
                <div>
                  <h3 className="text-3xl font-bold">{averageScore}</h3>
                  <p className="text-blue-200">Average Score</p>
                </div>
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badge.color} bg-white`}>
                {badge.label}
              </div>
            </CardContent>
          </Card>

          {/* Individual Question Scores */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#073763] mb-4">
              Your Question Scores:
            </h4>
            {responses.map((response, index) => (
              <Card key={response.questionId} className="border-l-4 border-l-[#007ACE]">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <p className="text-sm text-gray-600 mb-1">
                        Question {index + 1}
                      </p>
                      <p className="font-medium text-gray-900">
                        {getQuestionText(response.questionId)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Your answer: {
                          Array.isArray(response.value) 
                            ? response.value.join(', ')
                            : String(response.value)
                        }
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(response.score)}`}>
                        {response.score}
                      </div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Total Score Summary */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-[#073763]">
                  Total Points Earned:
                </span>
                <span className="text-2xl font-bold text-[#007ACE]">
                  {totalScore} pts
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Based on {responses.length} answered question{responses.length !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center space-y-4 pt-4">
            <p className="text-gray-600">
              Your feedback helps us improve our services. Thank you for taking the time to share your thoughts!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                className="bg-gradient-to-r from-[#073763] to-[#007ACE] hover:from-[#062c52] hover:to-[#0066a6] text-white"
                onClick={() => {
                  // Simulate navigation to rewards page
                  console.log('Navigate to rewards page');
                }}
              >
                <Gift className="mr-2 h-4 w-4" />
                View Your Rewards
              </Button>
              
              <Button
                variant="outline"
                onClick={onClose}
                className="border-[#073763] text-[#073763] hover:bg-[#073763] hover:text-white"
              >
                Submit Another Response
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
