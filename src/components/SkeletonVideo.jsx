import React from 'react';

const SkeletonVideo = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 rounded-lg h-44 mb-2"></div>
      <div className="flex">
        <div className="bg-gray-300 rounded-full h-10 w-10 mr-2"></div>
        <div className="flex-1">
          <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
          <div className="bg-gray-300 h-3 w-1/2 mb-1 rounded"></div>
          <div className="bg-gray-300 h-3 w-1/4 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonVideo;
