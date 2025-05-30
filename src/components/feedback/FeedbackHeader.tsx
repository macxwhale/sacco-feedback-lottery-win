
import React from 'react';

export const FeedbackHeader: React.FC = () => {
  return (
    <div className="mb-8 text-center">
      <img 
        src="https://policesacco.com/wp-content/uploads/2021/07/police-sacco-logo.png" 
        alt="Police Sacco"
        className="h-16 mx-auto mb-4"
        onError={(e) => {
          // Fallback to text if image fails to load
          e.currentTarget.style.display = 'none';
          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
          if (nextElement) {
            nextElement.style.display = 'block';
          }
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
  );
};
