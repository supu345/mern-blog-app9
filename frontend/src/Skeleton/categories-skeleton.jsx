import React from "react";
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import ImagePlaceholder from "../assets/images/image.json";
import "react-loading-skeleton/dist/skeleton.css";

const CategoriesSkeleton = () => {
  return (
    <div className="flex flex-row gap-8 py-3 overflow-x-auto">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-2 border rounded-lg p-4 shadow-md w-1/6"
        >
          {/* Lottie Animation Section */}
          <div className="flex justify-center items-center w-full">
            <Lottie
              className="w-3/4 h-auto max-w-xs"
              animationData={ImagePlaceholder}
              loop={true}
            />
          </div>

          {/* Skeleton Section */}
          <div className="w-full">
            <Skeleton height={10} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesSkeleton;
