const {
  CategoryListService,
  BlogListService,
  CreateBlogService,
  DeleteBlogService,
  UpdateBlogService,
  ReadBlogByIDService,
  DetailsService,
  CreateDetailsService,
  BlogsListService,
} = require("../services/BlogService");

exports.CategoryList = async (req, res) => {
  let result = await CategoryListService();
  return res.status(200).json(result);
};

exports.BlogList = async (req, res) => {
  let result = await BlogListService();
  return res.status(200).json(result);
};

//create blog

exports.CreateBlog = async (req, res) => {
  try {
    let result = await CreateBlogService(req, res);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in CreateBlog controller:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

//delete blog
exports.DeleteBlog = async (req, res) => {
  try {
    let result = await DeleteBlogService(req, res);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in Delete Blog controller:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

//update blog
exports.UpdateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UpdateBlogService(id, req.body);

    if (result.status === "fail") {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in UpdateBlog controller:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

//Read by ID blog
exports.ReadBlogByID = async (req, res) => {
  try {
    let result = await ReadBlogByIDService(req, res);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in ReadBlogByID controller:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

exports.BlogPage = async (req, res) => {
  let result = await BlogPageService();
  return res.status(200).json(result);
};
exports.BlogDetails = async (req, res) => {
  let result = await DetailsService(req);
  if (result.status === "fail") {
    return res.status(500).json(result); // Send status 500 for errors
  }
  return res.status(200).json(result);
};

//create details contoller
exports.CreateBlogDetails = async (req, res) => {
  try {
    let result = await CreateDetailsService(req, res);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in CreateDetails Blog controller:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};
exports.BlogsList = async (req, res) => {
  let result = await BlogsListService(req, res);
  return result;
};
