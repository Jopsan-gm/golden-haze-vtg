import React from 'react';

const ProductSkeleton = () => {
    return (
        <div className="bg-white overflow-hidden border border-gray-100 rounded-sm animate-pulse">
            {/* Image Skeleton */}
            <div className="relative aspect-square bg-gray-200">
                <div className="absolute top-2 left-0 bg-gray-300 w-16 h-4 rounded-r-sm" />
            </div>

            {/* Info Skeleton */}
            <div className="p-3 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="space-y-1">
                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
                <div className="h-8 bg-gray-200 rounded w-full mt-4" />
            </div>
        </div>
    );
};

export default ProductSkeleton;
