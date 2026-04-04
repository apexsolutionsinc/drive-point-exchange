'use client';

import React from 'react';
import Image from 'next/image';

const TrustpilotStar = ({ filled = true }: { filled?: boolean }) => (
  <div className={`w-6 h-6 flex items-center justify-center ${filled ? 'bg-[#00b67a]' : 'bg-[#dcdce6]'}`}>
    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  </div>
);

export default function TrustpilotReviews() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 mt-4">
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 lg:gap-5 text-white/90">
        
        {/* Left Side: Text */}
        <div className="flex items-center gap-1.5 text-sm sm:text-base">
          <span className="font-medium whitespace-nowrap">Our customers say</span>
          <span className="font-bold text-white text-base sm:text-lg whitespace-nowrap">Excellent</span>
        </div>

        {/* Middle: 5 Green Stars */}
        <div className="flex gap-[2px]">
          <TrustpilotStar />
          <TrustpilotStar />
          <TrustpilotStar />
          <TrustpilotStar />
          <TrustpilotStar />
        </div>

        {/* Right Side: Rating & Brand */}
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="whitespace-nowrap">
            4.3 out of 5 based on <a href="https://www.trustpilot.com/review/drivepointexchange.com" target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-white/50 hover:decoration-white transition-colors">14 reviews</a>
          </span>
          <span className="flex items-center gap-1 font-bold text-white whitespace-nowrap">
            <svg className="w-5 h-5 text-[#00b67a]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Trustpilot
          </span>
        </div>

      </div>

      {/* Underneath Text */}
      <a 
        href="https://www.trustpilot.com/review/drivepointexchange.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-xs text-white/60 hover:text-white/90 underline decoration-white/30 hover:decoration-white/80 transition-colors mt-2"
      >
        Trustpilot checks reviews
      </a>
    </div>
  );
}
