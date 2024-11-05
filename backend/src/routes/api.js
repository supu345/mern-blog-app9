const express = require("express");
const BlogController = require("../controllers/BlogController");
const { BlogPageService } = require("../services/BlogService");
const UserController = require("../controllers/UserController");
const AuthVerification = require("../middlewares/AuthVerification");
const router = express.Router();

router.get("/categorylist", BlogController.CategoryList);
router.get("/bloglist", BlogController.BlogList);
router.post("/createBlog", BlogController.CreateBlog);
router.post("/deleteBlog/:id", BlogController.DeleteBlog);
router.put("/updateBlog/:id", BlogController.UpdateBlog);
router.get("/ReadBlogByID/:id", BlogController.ReadBlogByID);
router.get("/bloglistPage", BlogController.BlogPage);
router.post("/bloglistPage", BlogPageService);
router.get("/BlogDetails/:BlogID", BlogController.BlogDetails);
router.post("/CreateBlogDetails", BlogController.CreateBlogDetails);
router.get("/blogList/:pageNo/:perPage/:searchKey?", BlogController.BlogsList);

// User
router.get("/UserOTP/:email", UserController.UserOTP);
router.get("/VerifyLogin/:email/:otp", UserController.VerifyLogin);
router.get("/UserLogout", AuthVerification, UserController.UserLogout);
router.post("/createContact", UserController.CreateContact);
router.get("/contactList", UserController.ContactList);

router.post("/createSubscribe", UserController.CreateSubscribe);
module.exports = router;
