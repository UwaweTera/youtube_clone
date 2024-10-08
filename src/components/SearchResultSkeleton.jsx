import React from 'react';

const SearchResultSkeleton = () => {
  return (
    <div className="cursor-pointer grid grid-cols-3 w-full gap-x-2 animate-pulse">
      <div className="bg-gray-300 rounded-lg h-60 col-span-1 my-2"></div>
      <div className="py-3 px-2 col-span-2">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="flex items-center space-x-1 my-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default SearchResultSkeleton;
