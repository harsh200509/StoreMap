import React from 'react';

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-[4/3] bg-gray-200" />
      {/* Content */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="h-4 bg-gray-200 rounded w-4/5" />
        <div className="h-3 bg-gray-100 rounded w-2/5" />
        <div className="h-5 bg-gray-200 rounded w-1/3 mt-1" />
        <div className="mt-auto flex gap-2 pt-2">
          <div className="h-9 w-9 bg-gray-100 rounded-lg shrink-0" />
          <div className="h-9 flex-1 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
