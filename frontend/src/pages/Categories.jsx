import React, { useEffect, useState } from "react";
import Subscribe from "../components/Subscribe ";
import { FcReading } from "react-icons/fc";
import BlogStore from "../store/BlogStore";
import Layout from "../components/layout/layout";

const Categories = () => {
  const { CategoryListRequest, CategoryList } = BlogStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await CategoryListRequest();
      } catch (err) {
        setError("Failed to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [CategoryListRequest]);

  return (
    <Layout>
      <div className="dark:text-white dark:bg-black">
        <p className="px-4 pt-8 text-center">Home/Categories</p>
        <div className="container px-4">
          <div className="h-[300px] md:h-[200px] py-10 md:py-[80px] flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold">
              Categories
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 px-4 pb-5 justify-center">
          <div className="w-full md:w-[90%] lg:w-[90%] relative">
            {loading ? (
              <p className="text-center text-gray-500">Loading categories...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : Array.isArray(CategoryList) && CategoryList.length > 0 ? (
              <div className="flex justify-center pb-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
                  {CategoryList.map((data) => (
                    <div key={data.id} className="relative ">
                      <img
                        src={data.categoryImg} // Use dynamic category image
                        className="w-[400px] h-[200px] object-cover rounded-2xl" // Use w-full for responsive width
                        alt={`Category: ${data.categoryName}`} // Improved alt text for accessibility
                      />
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-7 flex flex-row gap-2 items-center bg-gray-100 p-2 px-3 rounded-full shadow-blue-200 shadow-lg">
                        <p className="font-bold text-md text-normal dark:text-black">
                          {data.categoryName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No categories available
              </p>
            )}
          </div>
        </div>
        <Subscribe />
      </div>
    </Layout>
  );
};

export default Categories;
