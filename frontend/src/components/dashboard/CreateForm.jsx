import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ErrorToast,
  IsEmpty,
  SuccessToast,
} from "../../Helper/ValidationHelper";
import BlogStore from "../../store/BlogStore";
import Editor from "../../components/Editor"; // Import your Editor component if you have one

const CreateForm = () => {
  let navigate = useNavigate();
  const {
    CategoryList,
    CategoryListRequest,
    CreateBlogRequest,
    blogFormData,
    blogFormOnChange,
  } = BlogStore();

  const [editorData, setEditorData] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      if (CategoryList === null) await CategoryListRequest();
    };
    fetchCategories();
  }, [CategoryList, CategoryListRequest]);

  const handleDataChange = (value) => {
    setEditorData(value);
  };
  const SaveData = async () => {
    if (IsEmpty(blogFormData.title)) {
      ErrorToast("Blog title is required");
    } else if (IsEmpty(blogFormData.shortDes)) {
      ErrorToast("Blog short description is required");
    } else if (IsEmpty(editorData)) {
      ErrorToast("Blog long description is required");
    } else if (IsEmpty(blogFormData.image)) {
      ErrorToast("Blog image is required");
    } else if (IsEmpty(blogFormData.remark)) {
      ErrorToast("Blog remark is required");
    } else if (IsEmpty(blogFormData.categoryID)) {
      ErrorToast("Blog category is required");
    } else {
      // Include editor data in the form data before the request
      blogFormOnChange("longDes", editorData);

      const result = await CreateBlogRequest(blogFormData);
      console.log(result);
      if (result.status === "success") {
        SuccessToast("Data saved successfully");
        navigate("/");
      } else {
        ErrorToast("Request failed, please try again");
      }
    }
  };

  return (
    <div className="container">
      <h5 className="text-2xl pb-2 font-semibold text-center hover:text-orange-500">
        Create New Blog
      </h5>
      <div className="border border-gray-300"></div>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2">
          <p className="text-xl font-bold mb-2">Blog Title</p>
          <input
            value={blogFormData.title}
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
            className="outline-none max-w-80 w-full py-8 px-4 rounded-md"
          />
        </div>

        {/* Add your Editor component here */}
        <div className="p-2 col-span-2">
          <p className="text-xl font-bold mb-2">Blog Long Description</p>
          <Editor data={editorData} onDataChange={handleDataChange} />
        </div>
      </div>

      <div className=" p-2">
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
          {CategoryList !== null ? (
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

      <button
        onClick={SaveData}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Save Blog
      </button>
    </div>
  );
};

export default CreateForm;
