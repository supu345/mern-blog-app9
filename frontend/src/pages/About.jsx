import React from "react";
import { IoIosRocket } from "react-icons/io";
import { SiPowerpages } from "react-icons/si";
import { BsFileBarGraph } from "react-icons/bs";
import Subscribe from "../components/Subscribe ";
import Layout from "../components/layout/layout";
const About = () => {
  return (
    <Layout>
      <div className="dark:text-white dark:bg-black">
        <p className="px-7 pt-8 text-center">Home/About</p>
        <div className="">
          <div className="container mx-auto px-4">
            <div className="h-[300px] md:h-[200px] py-10 md:py-[80px] flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Hey,
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Wonderful
                </span>
                <span> to Meet You</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3 px-4 pb-5 justify-center">
          <div className="w-1/3">
            <img
              src="https://images.pexels.com/photos/20474596/pexels-photo-20474596/free-photo-of-person-carrying-snowboards-in-winter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="w-[500px] h-[400px] object-cover rounded-2xl"
            />
          </div>
          <div className="w-1/3">
            <img
              src="https://images.pexels.com/photos/28571323/pexels-photo-28571323/free-photo-of-autumn-vines-on-stone-building-in-sweden.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="w-[500px] h-[400px] object-cover rounded-2xl"
            />
          </div>
          <div className="w-1/3">
            <img
              src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="w-[500px] h-[400px] object-cover rounded-2xl"
            />
          </div>
        </div>
        <p className="text-2xl font-bold pt-[50px] w-1/2 mx-auto  justify-start">
          By 2016, we began to see the fruits of our labor as word spread about
          our work, leading us to our first major client — a regional retail
          chain. This was a pivotal moment for us, as it allowed us to hire our
          first employee. Emma stepped up to lead user experience design, while
          Liam and I focused on coding and project management.
        </p>
        <p className="text-2xl font-bold pt-7 pb-[60px] w-1/2 mx-auto  justify-start">
          As we gathered to reflect on our incredible journey, hosting a
          community event to showcase local tech talent felt like the perfect
          way to give back and inspire the next generation of innovators. It
          reminded us that with passion, collaboration, and a bit of code,
          anything is possible.
        </p>
        {/* 3 div */}
        <div className="flex flex-row gap-6 px-6 mb-8 ">
          <div className="w-1/3 bg-slate-200 dark:bg-black dark:border-white dark:border shadow-md rounded-lg px-8 py-4">
            <IoIosRocket className="text-orange-500 text-5xl mb-7 mt-6" />
            <p className="text-2xl font-bold">Empowering Innovation</p>
            <p className="mb-6 mt-2">
              We consistently push the boundaries of technology, leading to
              unique and effective solutions.
            </p>
          </div>
          <div className="w-1/3 bg-slate-200 dark:bg-black dark:border-white dark:border shadow-md rounded-lg px-8 py-4">
            <SiPowerpages className="text-blue-500 text-5xl mb-7 mt-6" />
            <p className="text-2xl font-bold">Empowering Innovation</p>
            <p className="mb-6 mt-2">
              We consistently push the boundaries of technology, leading to
              unique and effective solutions.
            </p>
          </div>
          <div className="w-1/3 bg-slate-200 dark:bg-black dark:border-white dark:border shadow-md rounded-lg px-8 py-4">
            <BsFileBarGraph className="text-green-500 text-5xl mb-7 mt-6" />
            <p className="text-2xl font-bold">Empowering Innovation</p>
            <p className="mb-6 mt-2">
              We consistently push the boundaries of technology, leading to
              unique and effective solutions.
            </p>
          </div>
        </div>
        <Subscribe />
      </div>
    </Layout>
  );
};

export default About;
