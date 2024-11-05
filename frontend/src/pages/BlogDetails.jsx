import React, { useEffect } from "react";
import Layout from "../components/layout/layout";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { CiLinkedin } from "react-icons/ci";
import { FaChevronLeft, FaAngleRight } from "react-icons/fa6";
import Slider from "react-slick";
import BlogStore from "../store/BlogStore";
import Subscribe from "../components/Subscribe ";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

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

const BlogDetails = () => {
  const { BlogListRequest, BlogList } = BlogStore();
  const { DetailsRequest, Details } = BlogStore();
  const { id } = useParams();
  console.log(Details);

  useEffect(() => {
    (async () => {
      await BlogListRequest();
      await DetailsRequest(id);
    })();
  }, [id]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
    <Layout>
      <div className="dark:text-white dark:bg-black">
        <p className="px-7 pt-8 text-center">Home/Business </p>

        <div className="container mx-auto px-4">
          <div className="h-[300px] md:h-[300px] py-10 md:py-[80px] flex flex-col items-center justify-center text-center">
            <p>Ethan Caldwell on October 16, 2024</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              How Tech Shapes the Future of Work in 2024
            </h1>
            <p className="w-1/2 pt-8">
              Revision Welcome to ultimate source for fresh perspectives!
              Explore curated content to enlighten, entertain and engage global
              readers.
            </p>

            <div className="flex flex-row gap-7 pt-5 uppercase">
              <div className="bg-slate-100 p-1 rounded-lg px-2 font-normal shadow-md">
                <p>Business</p>
              </div>
              <div className="bg-slate-100 p-1 rounded-lg px-2 font-normal shadow-md">
                <p>News</p>
              </div>
            </div>
          </div>

          {Details ? (
            <div className="overflow-hidden rounded-xl mx-auto w-full max-w-5xl">
              <img
                src={Details[0].image}
                alt={Details.title}
                className="w-full h-auto object-cover"
              />
            </div>
          ) : (
            <p>Loading...</p>
          )}

          <div className="grid grid-cols-2 gap-[40px] pt-8">
            <div className="ml-4">
              {Details ? (
                <p className="my-2">{parse(Details[0]["longDes"])}</p>
              ) : (
                <p>Loading...</p>
              )}
            </div>

            <div className="ml-[40px] w-[500px]">
              <div className="border bg-slate-100 rounded-md shadow-md py-6">
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

          <div className="grid grid-cols-3 gap-6 mt-[60px] px-6">
            {[...Array(3)].map((_, index) => (
              <div key={index}>
                <img
                  src="https://images.pexels.com/photos/2116721/pexels-photo-2116721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  className="h-[200px] w-[400px] rounded-xl"
                  alt="Related Post"
                />
                <p className="pt-3">Ethan Caldwell on April 28, 2024</p>
                <p className="text-xl font-bold">
                  How AI is Revolutionizing Business Management in 2024
                </p>
                <p className="pt-3">
                  Learn how AI is transforming business management by optimizing
                  decision-making and improving operational efficiency.
                </p>
              </div>
            ))}
          </div>

          <Subscribe />
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetails;
