
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

export const FeedbackHeader: React.FC = () => {
  return (
    <div className="text-center mb-8 relative">
      <Link 
        to="/admin" 
        className="absolute top-0 right-0 p-2 text-gray-400 hover:text-[#073763] transition-colors"
        title="Admin Dashboard"
      >
        <Settings size={20} />
      </Link>
      <div className="mb-4">
        <img 
          src="/lovable-uploads/367347fe-02da-4338-b8ba-91138293d303.png" 
          alt="Police Sacco Logo" 
          className="h-16 mx-auto mb-4"
        />
      </div>
      <h1 className="text-3xl font-bold text-[#073763] mb-2">
        Police Sacco Feedback
      </h1>
      <p className="text-gray-600 max-w-md mx-auto">
        Help us improve our services by sharing your experience with us.
      </p>
    </div>
  );
};
