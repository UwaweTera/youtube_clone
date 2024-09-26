import React from 'react';

const CommentSkeleton = () => {
  return (
    <div className="flex items-start space-x-2 mt-4 animate-pulse">
      <div className="rounded-full bg-gray-300 h-8 w-8"></div>
      <div className="flex-grow">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
