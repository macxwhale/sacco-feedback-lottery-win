
import React from 'react';

export const FeedbackHeader: React.FC = () => {
  return (
    <div className="mb-8 text-center">
      <img 
        src="/lovable-uploads/367347fe-02da-4338-b8ba-91138293d303.png" 
        alt="Kenya National Police DT SACCO"
        className="h-20 mx-auto mb-4"
        onError={(e) => {
          // Fallback to text if image fails to load
          e.currentTarget.style.display = 'none';
          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
          if (nextElement) {
            nextElement.style.display = 'block';
          }
        }}
      />
      <div style={{ display: 'none' }} className="text-2xl font-bold text-[#f97316]">
        Kenya National Police DT SACCO
      </div>
      <h1 className="text-3xl font-bold text-[#f97316] mt-4">
        We Value Your Feedback
      </h1>
      <p className="text-gray-600 mt-2">
        Help us serve you better by sharing your experience
      </p>
    </div>
  );
};
