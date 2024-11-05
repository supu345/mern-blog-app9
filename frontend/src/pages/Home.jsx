import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Category from "../components/Category";
import Blogs from "../components/Blogs";
import Subscribe from "../components/Subscribe ";
import BlogStore from "../store/BlogStore";
import Layout from "../components/layout/layout";

const Home = () => {
  const { CategoryListRequest, BlogListRequest } = BlogStore();

  useEffect(() => {
    (async () => {
      await CategoryListRequest();
      await BlogListRequest();
    })();
  }, []);
  return (
    <Layout>
      <Hero />
      <Category />
      <Blogs />
      <Subscribe />
    </Layout>
  );
};

export default Home;
