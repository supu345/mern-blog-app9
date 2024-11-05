import React, { useEffect } from "react";
import DashboardLayout from "../../components/layout/DasboardLayout";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import BlogStore from "../../store/BlogStore.js";
import { DeleteAlert } from "../../helper/DeleteAlert.js";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Ensure Swal is imported for alerting

const BlogList = () => {
  const { BlogList, BlogListRequest, CategoryList, CategoryListRequest } =
    BlogStore();

  useEffect(() => {
    (async () => {
      await BlogListRequest(); // Fetch blogs on component mount
      await CategoryListRequest(); // Fetch category data on component mount
    })();
  }, [BlogListRequest, CategoryListRequest]);

  // Function to get category name by ID
  const getCategoryName = (categoryID) => {
    const category = CategoryList?.find((cat) => cat._id === categoryID);
    return category ? category.categoryName : "Unknown Category";
  };

  // Function to truncate strings for readability
  const truncateString = (str, num) => {
    if (str.length <= num) return str;
    return str.slice(0, num) + "...";
  };

  const deleteBlog = async (id) => {
    const { DeleteBlogRequest, BlogListRequest } = BlogStore.getState();
    const result = await DeleteAlert(); // Confirm deletion with the user

    if (result.isConfirmed) {
      try {
        const response = await DeleteBlogRequest(id);

        if (response.status === "success") {
          await Swal.fire("Deleted!", "Your blog has been deleted.", "success");
          console.log("Blog deleted successfully:", response.data);
          await BlogListRequest(); // Refresh the blog list
        } else {
          await Swal.fire(
            "Failed!",
            "There was an issue deleting the blog.",
            "error"
          );
          console.log("Failed to delete blog:", response.data);
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        await Swal.fire(
          "Error!",
          "A network error occurred. Please try again later.",
          "error"
        );
      }
    } else {
      console.log("Blog deletion was cancelled by the user.");
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4">
        <h5 className="text-2xl pb-2 font-semibold hover:text-orange-500 text-center">
          Blog List
        </h5>
        <table className="min-w-full border border-gray-900 border-collapse">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-3 border border-gray-900 text-left">Sl No</th>
              <th className="p-3 border border-gray-900 text-left">Title</th>
              <th className="p-3 border border-gray-900 text-left">
                Short Description
              </th>
              <th className="p-3 border border-gray-900 text-left">image</th>
              <th className="p-3 border border-gray-900 text-left">Category</th>
              <th className="p-3 border border-gray-900 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {BlogList?.map((blog, index) => (
              <tr key={blog._id} className="border-b">
                <td className="p-3 border border-gray-900">{index + 1}</td>
                <td className="p-3 border border-gray-900">{blog.title}</td>
                <td className="p-3 border border-gray-900">
                  {truncateString(blog.shortDes, 50)}
                </td>

                <td className="p-3 border border-gray-900">
                  <img
                    className="w-[200px] h-[70px] object-cover p-2"
                    src={blog.image}
                    alt={blog.title}
                  />
                </td>
                <td className="p-3 border border-gray-900">
                  {getCategoryName(blog.categoryID)}
                </td>
                <td className="p-3 border border-gray-900 text-center">
                  <Link to={`/editBlog/${blog._id}`}>
                    <button className="btn text-info p-2 mb-0 btn-sm ml-2 hover:text-green-700">
                      <AiOutlineEdit size={15} />
                    </button>
                  </Link>
                  <button
                    className="btn text-danger p-2 mb-0 btn-sm ml-2 hover:text-red-700"
                    onClick={() => deleteBlog(blog._id)}
                  >
                    <AiOutlineDelete size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default BlogList;
