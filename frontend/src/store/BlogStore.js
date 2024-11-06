import { create } from "zustand"; // Named import instead of default
import axios from "axios";

const BlogStore = create((set) => ({
  blogFormData: {
    title: "",
    shortDes: "",
    longDes: "",
    image: "",
    remark: "",
    categoryID: "",
  },

  blogFormOnChange: (name, value) => {
    set((state) => ({
      blogFormData: {
        ...state.blogFormData,
        [name]: value, // Make sure to use blogFormData here
      },
    }));
  },

  CategoryList: null,
  CategoryListRequest: async () => {
    let res = await axios.get(`/api/v1/categorylist`);
    if (res.data["status"] === "success") {
      set({ CategoryList: res.data["data"] });
    }
  },

  BlogList: null,
  BlogListRequest: async () => {
    let res = await axios.get(`/api/v1/bloglist`);
    if (res.data["status"] === "success") {
      set({ BlogList: res.data["data"] });
    }
  },

  BlogsListRequest: async (page, limit) => {
    try {
      const res = await axios.get(`/api/v1/blogs?page=${page}&limit=${limit}`);
      console.log("API Response:", res.data); // Log the response
      return res.data;
    } catch (error) {
      console.error("API Request Error:", error);
      return { success: false, blogs: [], totalCount: 0 };
    }
  },
  DeleteBlogRequest: async (id) => {
    try {
      let res = await axios.post(`/api/v1/deleteBlog/${id}`);
      if (res.data["status"] === "success") {
        return { status: "success", data: res.data["data"] };
      } else {
        return { status: "fail", data: res.data["message"] };
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      return { status: "fail", data: error.toString() };
    }
  },

  EditBlogRequest: async (id, formData) => {
    try {
      let res = await axios.post(`/api/v1/updateBlog/${id}`, formData); // Send form data in the request
      if (res.data["status"] === "success") {
        return { status: "success", data: res.data["data"] };
      } else {
        return { status: "fail", data: res.data["message"] };
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      return { status: "fail", data: error.toString() };
    }
  },
  CreateBlogRequest: async (formData) => {
    try {
      let res = await axios.post(`/api/v1/createBlog`, formData);
      return res.data; // Ensure the response is in the expected format
    } catch (error) {
      console.error("Error creating blog:", error);
      return { status: "fail", data: error.toString() };
    }
  },

  GetBlogRequest: async (id) => {
    try {
      let res = await axios.get(`/api/v1/updateBlog/${id}`);
      if (res.data["status"] === "success") {
        set({ blogFormData: res.data["data"] }); // Set the fetched blog data to form
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  },

  Details: null,

  DetailsRequest: async (id) => {
    try {
      let res = await axios.get(`/api/v1/BlogDetails/${id}`);
      if (res.data.status === "success") {
        set({ Details: res.data.data });
      } else {
        console.error("Failed to fetch details:", res.data.data);
        set({ Details: null });
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
      set({ Details: null });
    }
  },

  BlogsList: null,
  Total: 0,
  BlogsListRequest: async (pageNo = 1, perPage = 5, searchKey = "0") => {
    try {
      const res = await axios.get(
        `/api/v1/blogList/${pageNo}/${perPage}/${searchKey}`
      );
      if (res.data.status === "success") {
        set({ BlogsList: res.data.data, Total: res.data.total });
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  },
}));

export default BlogStore;
