import React from "react";
import BlogStore from "../store/BlogStore";

const Category = () => {
  const { CategoryList } = BlogStore();

  return (
    <div className="dark:text-white dark:bg-black">
      {/* Category header */}
      <p className="text-center text-slate-600 dark:text-white text-xl pt-[50px] pb-[40px]">
        Explore Trending Topics
      </p>

      {Array.isArray(CategoryList) && CategoryList.length > 0 ? (
        <div className="flex justify-center pb-8">
          <div className="grid grid-cols-6 gap-7">
            {CategoryList.map((data) => (
              <div
                key={data.id}
                className="flex flex-row gap-2 items-center bg-gray-100 p-2 px-3 rounded-full shadow-blue-200 shadow-lg"
              >
                <img
                  src={data.categoryImg}
                  className="h-[50px] w-[50px] rounded-full"
                  alt="Category"
                />
                <p className="font-bold text-xl text-normal dark:text-black">
                  {data.categoryName}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No categories available</p>
      )}
    </div>
  );
};

export default Category;
