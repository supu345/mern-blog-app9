import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import necessary hooks
import DashboardLayout from "../../components/layout/DasboardLayout";
import BlogStore from "../../store/BlogStore";
import { ErrorToast, SuccessToast } from "../../Helper/ValidationHelper";

const EditBlog = () => {
  const { blogId } = useParams(); // Get the blog ID from the URL parameters
  const navigate = useNavigate(); // For navigation after update
  const [values, setvalues] = useState({
    title: "",
    shortDes: "",
    longDes: "",
    image: "",
    remark: "",
    categoryID: "",
  });
  const {
    CategoryList,
    BlogListRequest,
    CategoryListRequest,
    blogFormData,
    blogFormOnChange,
    GetBlogRequest,
    EditBlogRequest,
  } = BlogStore();

  // Add a loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await CategoryListRequest(); // Fetch category data
        const response = await GetBlogRequest(blogId); // Fetch the specific blog by ID
        if (response && response.data) {
          setvalues({
            title: response.data.title,
            shortDes: response.data.shortDes,
            longDes: response.data.longDes,
            image: response.data.image,
            remark: response.data.remark,
            categoryID: response.data.categoryID,
          });
        } else {
          ErrorToast("Failed to fetch blog data. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        ErrorToast("Failed to fetch blog data. Please try again.");
      } finally {
        setIsLoading(false); // Set loading to false after data fetching
      }
    };

    fetchData();
  }, [CategoryListRequest, GetBlogRequest, blogId]);

  // Function to edit the blog
  const editBlog = async () => {
    try {
      const response = await EditBlogRequest(blogId, values);
      if (response.status === "success") {
        SuccessToast("Blog updated successfully");
        navigate("/path-to-blog-list");
      } else {
        ErrorToast("Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      ErrorToast("An error occurred while updating the blog");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Optionally, you can show a loading indicator
  }

  return (
    <DashboardLayout>
      <div className="container">
        <h5 className="text-2xl pb-2 font-semibold text-center hover:text-orange-500">
          Edit Blog
        </h5>
        <div className="border border-gray-300"></div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2">
            <p className="text-xl font-bold mb-2">Blog Title</p>
            <input
              value={values.title}
              onChange={(e) => blogFormOnChange("title", e.target.value)}
              type="text"
              className="outline-none max-w-80 w-full py-1 px-4 rounded-md"
            />
          </div>

          <div className="p-2">
            <p className="text-xl font-bold mb-2">Blog Image URL</p>
            <input
              value={blogFormData.image}
              onChange={(e) => blogFormOnChange("image", e.target.value)}
              type="text"
              className="outline-none max-w-80 w-full py-1 px-4 rounded-md"
            />
          </div>
          <div className="p-2">
            <p className="text-xl font-bold mb-2">Blog Short Description</p>
            <input
              value={blogFormData.shortDes}
              onChange={(e) => blogFormOnChange("shortDes", e.target.value)}
              type="text"
              className="outline-none max-w-80 w-full py-1 px-4 rounded-md"
            />
          </div>
          <div className="p-2">
            <p className="text-xl font-bold mb-2">Blog Long Description</p>
            <input
              value={blogFormData.longDes}
              onChange={(e) => blogFormOnChange("longDes", e.target.value)}
              type="text"
              className="outline-none max-w-80 w-full py-1 px-4 rounded-md"
            />
          </div>

          <div className="p-2">
            <p className="text-xl font-bold mb-2">Remark</p>
            <input
              value={blogFormData.remark}
              onChange={(e) => blogFormOnChange("remark", e.target.value)}
              type="text"
              className="outline-none max-w-80 w-full py-1 px-4 rounded-md"
            />
          </div>
          <div className="p-2">
            <p className="text-xl font-bold mb-2">Categories</p>
            <select
              value={blogFormData.categoryID}
              onChange={(e) => blogFormOnChange("categoryID", e.target.value)}
              className="outline-none max-w-80 w-full py-1 px-4 rounded-md"
            >
              <option value="">Choose Category</option>
              {CategoryList ? (
                CategoryList.map((item) => (
                  <option key={item._id} value={item["_id"]}>
                    {item["categoryName"]}
                  </option>
                ))
              ) : (
                <option>Loading categories...</option>
              )}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 p-2">
            <button
              onClick={editBlog}
              className="bg-blue-700 p-2 text-white rounded-lg mt-5"
            >
              Edit Blog
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditBlog;
