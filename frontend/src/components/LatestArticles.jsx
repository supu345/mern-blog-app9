import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LatestArticles = () => {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/v1/blogs");
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="container dark:text-white bg-white dark:bg-black pt-[60px]">
      <div className="pb-2">
        <h1 className="text-4xl">
          Latest{" "}
          <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
            Article
          </span>{" "}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {blogs.slice(0, visibleCount).map((blog) => (
          <div className="border border-gray-300 rounded-lg p-4" key={blog._id}>
            <Link to={`/details/${blog["_id"]}`}>
              <img
                src={blog.image}
                alt={blog.title}
                className="mx-auto h-[260px] sm:h-[200px] md:h-[280px] md:w-[360px] object-cover transition duration-700 rounded-xl"
              />

              <h1 className="text-2xl font-bold my-2">{blog.title}</h1>
            </Link>

            <p className="text-xl">{blog.shortDes}</p>
          </div>
        ))}
      </div>
      <div className="text-center py-5">
        {visibleCount < blogs.length && (
          <button
            onClick={loadMore}
            className="bg-gradient-to-r from-blue-500 to-green-300 hover:from-blue-700 hover:to-green-700 transition-all duration-600 text-white px-5 py-2 rounded-full font-bold text-xl mt-5 mb-6"
          >
            {" "}
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default LatestArticles;
