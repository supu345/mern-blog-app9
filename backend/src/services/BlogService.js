const BlogDetailsModel = require("../models/BlogDetailsModel");
const BlogModel = require("../models/BlogModel");
const CategoryModel = require("../models/CategoryModel");

const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

const CategoryListService = async () => {
  try {
    let data = await CategoryModel.find();
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};

const BlogListService = async () => {
  try {
    let data = await BlogModel.find();
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};

const BlogPageService = async (req, res) => {
  try {
    const order = req.body.order || "asc";
    const sortBy = req.body.sortBy || "_id";
    const limit = req.body.limit ? parseInt(req.body.limit) : 10; // Set default limit to 10
    const skip = req.body.skip ? parseInt(req.body.skip) : 0;

    const blogs = await BlogModel.find()
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    const totalBlogs = await BlogModel.countDocuments(); // Get total number of blogs

    res.status(200).json({
      success: true,
      blogs,
      total: totalBlogs, // Include total count in the response
      limit,
      skip,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

const CreateBlogService = async (req, res) => {
  try {
    const { title, shortDes, longDes, image, remark, categoryID } = req.body;

    const newBlog = {
      title,
      shortDes,
      longDes,
      image,
      remark,
      categoryID,
    };

    let result = await BlogModel.create(newBlog);
    return { status: "success", data: result };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

// D=Delete
const DeleteBlogService = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await BlogModel.deleteOne({ _id: id });
    return { status: "success", data: result };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

// U=Update
const UpdateBlogService = async (id, reqBody) => {
  try {
    const result = await BlogModel.findByIdAndUpdate(id, reqBody, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updated document
    });

    if (!result) {
      return { status: "fail", message: "Blog not found" };
    }

    return { status: "success", data: result };
  } catch (e) {
    console.error("Error in UpdateBlogService:", e);
    return { status: "fail", message: e.message };
  }
};

// R=Read By ID
const ReadBlogByIDService = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    const data = await BlogModel.find(query).exec();
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

const DetailsService = async (req) => {
  try {
    let BlogID = new ObjectId(req.params.BlogID);
    let MatchStage = { $match: { _id: BlogID } };

    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        let: { categoryID: { $toObjectId: "$categoryID" } },
        pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$categoryID"] } } }],
        as: "category",
      },
    };
    let JoinWithDetailsStage = {
      $lookup: {
        from: "blogdetails",
        let: { blogID: { $toString: "$_id" } },
        pipeline: [{ $match: { $expr: { $eq: ["$blogID", "$$blogID"] } } }],
        as: "details",
      },
    };

    let UnwindCategoryStage = { $unwind: "$category" };
    let UnwindDetailsStage = { $unwind: "$details" };

    let ProjectionStage = {
      $project: {
        "category._id": 0,
        categoryID: 0,
      },
    };

    let data = await BlogModel.aggregate([
      MatchStage,
      JoinWithCategoryStage,
      JoinWithDetailsStage,
      // UnwindCategoryStage,
      // UnwindDetailsStage,
      ProjectionStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    // Modify the return to correctly format the error
    return { status: "fail", data: e.message || e };
  }
};

//create details

const CreateDetailsService = async (req, res) => {
  try {
    let reqBody = req.body;
    let result = await BlogDetailsModel.create(reqBody);
    return { status: "success", data: result };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

const BlogsListService = async (req, res) => {
  let pageNo = Number(req.params.pageNo);
  let perPage = Number(req.params.perPage);
  let searchValue = req.params.searchKey;
  const skipRow = (pageNo - 1) * perPage;
  let Rows;
  let Total;

  try {
    if (searchValue !== "0") {
      let SearchRgx = { $regex: searchValue, $options: "i" };
      let SearchQuery = {
        $or: [{ title: SearchRgx }, { category: SearchRgx }],
      };

      const totalResult = await BlogModel.aggregate([
        { $match: SearchQuery },
        { $group: { _id: null, total: { $sum: 1 } } }, // Grouping to count total
      ]);

      Total = totalResult.length > 0 ? totalResult[0].total : 0;

      Rows = await BlogModel.aggregate([
        { $match: SearchQuery },
        { $skip: skipRow },
        { $limit: perPage },
      ]);
    } else {
      const totalResult = await BlogModel.aggregate([
        { $group: { _id: null, total: { $sum: 1 } } }, // Grouping to count total
      ]);

      Total = totalResult.length > 0 ? totalResult[0].total : 0;

      Rows = await BlogModel.aggregate([
        { $skip: skipRow },
        { $limit: perPage },
      ]);
    }

    res.status(200).json({ status: "success", total: Total, data: Rows });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
module.exports = {
  CategoryListService,
  BlogListService,
  BlogPageService,
  CreateBlogService,
  DeleteBlogService,
  UpdateBlogService,
  ReadBlogByIDService,
  DetailsService,
  CreateDetailsService,
  BlogsListService,
};
