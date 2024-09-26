import React from 'react';

const VideoSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 w-full aspect-video mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="flex items-center mb-4">
        <div className="rounded-full bg-gray-300 h-10 w-10 mr-3"></div>
        <div>
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoSkeleton;
