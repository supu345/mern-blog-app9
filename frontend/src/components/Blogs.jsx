import React, { useEffect, useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { CiLinkedin } from "react-icons/ci";
import Slider from "react-slick";
import BlogStore from "../store/BlogStore";
import { FaChevronLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-1 z-10 transform -translate-y-1/2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    onClick={onClick}
  >
    <FaAngleRight className="text-3xl hover:text-red-500 text-black bg-slate-200 p-2 rounded-md" />
  </div>
);

// Custom Prev Arrow
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-1 z-10 transform -translate-y-1/2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    onClick={onClick}
  >
    <FaChevronLeft className="text-3xl text-black bg-slate-200 p-2 rounded-md hover:text-red-500" />
  </div>
);
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Blogs = () => {
  const { CategoryList, BlogList, BlogsListRequest, BlogsList, Total } =
    BlogStore();
  let [searchKey, setSearchKey] = useState("0");
  let [perPageKey, setPerPageKey] = useState(5);
  //console.log(BlogList);

  useEffect(() => {
    BlogsListRequest(1, perPageKey, searchKey);
  }, [perPageKey, searchKey]);

  const handlePageClick = (event) => {
    GetProductList(event.selected + 1, perPageKey, searchKey);
  };
  // Helper function to get category name
  const getCategoryName = (categoryID) => {
    const category = CategoryList?.find((cat) => cat._id === categoryID);
    return category ? category.categoryName : "Unknown Category";
  };

  const settings = {
    dots: false,
    infinite: true, // Enable infinite scrolling
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1, // Scroll one slide at a time
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="dark:text-white dark:bg-black">
      <div className="px-4 sm:px-8 pt-[70px]">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Column */}
          <div className="md:w-2/3 w-full">
            {Array.isArray(BlogList) && BlogList.length > 0 ? (
              BlogList.map((data) => (
                <div key={data._id} className="mb-8">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative w-full md:w-1/2 pr-0 md:pr-6">
                      <Link to={`/details/${data["_id"]}`}>
                        <img
                          src={data.image || "https://default-image-url.com"}
                          alt="Main Blog Image"
                          className="h-full w-full object-cover rounded-2xl" // Ensure image takes full height and width of the container
                        />
                      </Link>
                      <p className="absolute top-0 left-0 bg-white text-black text-xl font-bold px-2 py-1 rounded-lg m-4 uppercase">
                        {getCategoryName(data.categoryID)}
                      </p>
                    </div>
                    <div className="py-4 md:w-1/2 w-full">
                      <p>
                        {data.author} on {data.date}
                      </p>
                      <h1 className="text-xl font-bold py-4">{data.title}</h1>
                      <p>{data.shortDes}</p>
                      <p className="text-gray-500 text-sm mt-2">
                        Created on: {formatDate(data.createdAt)} | Updated on:{" "}
                        {formatDate(data.updatedAt)}
                      </p>
                      <Link to={`/details/${data["_id"]}`}>
                        <button className="bg-gradient-to-r from-blue-400 to-blue-700 p-2 rounded-md mt-4 text-white text-md px-3 cursor-pointer font-bold shadow-lg shadow-blue-100">
                          Discover More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center p-4">
                <p>No blogs available</p>
              </div>
            )}

            <div>
              <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                pageClassName="page-item"
                pageLinkClassName="px-3 py-2 border border-gray-300 rounded-full hover:bg-gray-200 text-gray-700"
                previousClassName="page-item"
                previousLinkClassName="px-3 py-2 border border-gray-300 rounded-full hover:bg-gray-200 text-gray-700"
                nextClassName="page-item"
                nextLinkClassName="px-3 py-2 border border-gray-300 rounded-full hover:bg-gray-200 text-gray-700"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="px-3 py-2 text-gray-700"
                pageCount={Total / perPageKey}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName="flex justify-center space-x-2 mt-4"
                activeClassName="bg-blue-500 text-white"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-1/3 w-full">
            {/* About Section */}
            <div className="border bg-slate-100 dark:bg-black rounded-md shadow-md px-6 py-6">
              <p className="mb-5 pl-2">About</p>
              <div className="flex flex-row gap-2 items-center">
                <img
                  src="https://img.freepik.com/free-psd/3d-rendering-buy-online-icon_23-2151563897.jpg"
                  alt="avatar"
                  className="w-[70px] h-[70px] rounded-full p-2"
                />
                <div className="font-bold text-md">
                  <p>Ethan Caldwell</p>
                  <p>Reflective Blogger</p>
                </div>
              </div>
              <p className="px-4 font-normal">
                Ethan Caldwell shares thoughtful insights and reflections on
                life, culture, and personal growth. His work explores the
                intersections of creativity and experience.
              </p>
              <div className="px-4 flex flex-row gap-3 mt-5 items-center text-xl pb-8">
                <BsTwitterX />
                <FaFacebookF />
                <IoLogoInstagram />
                <CiLinkedin />
              </div>
            </div>

            {/* Featured Posts */}
            <p className="mb-5 pl-2 uppercase py-6">Featured Posts</p>
            <div className="relative group">
              <Slider {...settings}>
                {Array.isArray(BlogList) && BlogList.length > 0 ? (
                  BlogList.map((data) => (
                    <div
                      key={data.id}
                      className="relative w-[300px] h-[300px] overflow-hidden rounded-xl"
                    >
                      <img
                        src={data.image || "https://default-image-url.com"}
                        className="object-cover w-full h-full"
                        alt="Featured Post"
                      />
                      <div className="absolute bottom-0 mb-6 text-white pl-4">
                        <p>{data.author}</p>
                        <p className="text-xl font-bold">{data.title}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center p-4">
                    <p>No blogs available</p>
                  </div>
                )}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
