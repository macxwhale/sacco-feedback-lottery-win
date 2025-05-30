
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Star } from 'lucide-react';

interface ProgressInsightsProps {
  currentIndex: number;
  totalQuestions: number;
  completedQuestions: number[];
  estimatedTimeRemaining: number;
  averageResponseTime: number;
}

export const ProgressInsights: React.FC<ProgressInsightsProps> = ({
  currentIndex,
  totalQuestions,
  completedQuestions,
  estimatedTimeRemaining,
  averageResponseTime
}) => {
  const completionPercentage = (currentIndex / totalQuestions) * 100;
  const efficiency = averageResponseTime < 30 ? 'fast' : averageResponseTime < 60 ? 'steady' : 'thoughtful';
  
  const getEfficiencyColor = () => {
    switch (efficiency) {
      case 'fast': return 'bg-green-100 text-green-800';
      case 'steady': return 'bg-blue-100 text-blue-800';
      default: return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <Card className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Progress Insights</span>
            <Badge className={getEfficiencyColor()}>
              {efficiency} responder
            </Badge>
          </div>
          
          <Progress value={completionPercentage} className="h-2" />
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Clock className="h-3 w-3 text-blue-600" />
                <span className="text-xs text-gray-600">Time Left</span>
              </div>
              <span className="text-sm font-semibold text-blue-600">
                ~{estimatedTimeRemaining}s
              </span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-gray-600">Completed</span>
              </div>
              <span className="text-sm font-semibold text-green-600">
                {currentIndex}/{totalQuestions}
              </span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-3 w-3 text-orange-600" />
                <span className="text-xs text-gray-600">Avg Time</span>
              </div>
              <span className="text-sm font-semibold text-orange-600">
                {averageResponseTime}s
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
