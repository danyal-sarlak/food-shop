
import React from 'react';

const FoodSkeleton = () => {
  return (
    <div className='flex flex-wrap gap-5 justify-center'>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className=" w-60 md:w-64 h-[360px] pl-8 md:pl-0 flex flex-col bg-gray-200 animate-pulse rounded-lg">
          <div className="h-2/3 bg-gray-300 rounded-t-lg"></div>
          <div className="flex flex-col justify-between p-2">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
            <div className="flex gap-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
              <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodSkeleton;
