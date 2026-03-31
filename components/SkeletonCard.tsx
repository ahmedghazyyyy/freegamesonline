import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-gaming-surface rounded-2xl overflow-hidden border border-white/5 animate-pulse">
      <div className="h-48 bg-white/5"></div>
      <div className="p-4">
        <div className="h-6 bg-white/10 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-white/5 rounded w-full mb-2"></div>
        <div className="h-4 bg-white/5 rounded w-2/3 mb-6"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-white/5 rounded w-1/4"></div>
          <div className="h-4 bg-white/5 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};
