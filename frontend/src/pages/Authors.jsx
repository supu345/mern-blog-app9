import React from "react";
import { FcReading } from "react-icons/fc";
import Layout from "../components/layout/layout";

const Authors = () => {
  return (
    <Layout>
      <div className="dark:text-white dark:bg-black">
        <p className="px-7 pt-8 text-center">Home/Authors</p>
        <div className="">
          <div className="container mx-auto px-4">
            <div className="h-[300px] md:h-[200px] py-10 md:py-[80px] flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Authors
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap  gap-5 px-4 pb-[70px] justify-center ">
          <div className="w-[23%] relative border-2 rounded-md h-[400px] flex flex-col items-center justify-center">
            <img
              src="https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="w-[200px] h-[200px] object-cover rounded-full mb-4"
            />
            <p className="text-center font-semibold text-xl">John Doe</p>
            <div className="mt-3 flex items-center gap-2 bg-gray-100 p-2 px-5 border-2 rounded-full">
              <p className="text-xl text-normal dark:text-black">18 Articles</p>
            </div>
          </div>
          <div className="w-[23%] relative border-2 rounded-md h-[400px] flex flex-col items-center justify-center">
            <img
              src="https://images.pexels.com/photos/354951/pexels-photo-354951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="w-[200px] h-[200px] object-cover rounded-full mb-4"
            />
            <p className="text-center font-semibold text-xl">John Doe</p>
            <div className="mt-3 flex items-center gap-2 bg-gray-100 p-2 px-5 border-2 rounded-full">
              <p className="text-xl text-normal dark:text-black">18 Articles</p>
            </div>
          </div>
          <div className="w-[23%] relative border-2 rounded-md h-[400px] flex flex-col items-center justify-center">
            <img
              src="https://images.pexels.com/photos/415263/pexels-photo-415263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="w-[200px] h-[200px] object-cover rounded-full mb-4"
            />
            <p className="text-center font-semibold text-xl">John Doe</p>
            <div className="mt-3 flex items-center gap-2 bg-gray-100 p-2 px-5 border-2 rounded-full">
              <p className="text-xl text-normal dark:text-black">18 Articles</p>
            </div>
          </div>
          <div className="w-[23%] relative border-2 rounded-md h-[400px] flex flex-col items-center justify-center">
            <img
              src="https://images.pexels.com/photos/582039/pexels-photo-582039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="w-[200px] h-[200px] object-cover rounded-full mb-4"
            />
            <p className="text-center font-semibold text-xl">John Doe</p>
            <div className="mt-3 flex items-center gap-2 bg-gray-100 p-2 px-5 border-2 rounded-full">
              <p className="text-xl text-normal dark:text-black">18 Articles</p>
            </div>
          </div>
          <div className="w-[23%] relative border-2 rounded-md h-[400px] flex flex-col items-center justify-center">
            <img
              src="https://images.pexels.com/photos/2853592/pexels-photo-2853592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="w-[200px] h-[200px] object-cover rounded-full mb-4"
            />
            <p className="text-center font-semibold text-xl">John Doe</p>
            <div className="mt-3 flex items-center gap-2 bg-gray-100 p-2 px-5 border-2 rounded-full">
              <p className="text-xl text-normal dark:text-black">18 Articles</p>
            </div>
          </div>
          <div className="w-[23%] relative border-2 rounded-md h-[400px] flex flex-col items-center justify-center">
            <img
              src="https://images.pexels.com/photos/295564/pexels-photo-295564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="w-[200px] h-[200px] object-cover rounded-full mb-4"
            />
            <p className="text-center font-semibold text-xl">John Doe</p>
            <div className="mt-3 flex items-center gap-2 bg-gray-100 p-2 px-5 border-2 rounded-full">
              <p className="text-xl text-normal dark:text-black">18 Articles</p>
            </div>
          </div>
          <div className="w-[23%] relative border-2 rounded-md h-[400px] flex flex-col items-center justify-center">
            <img
              src="https://images.pexels.com/photos/450214/pexels-photo-450214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="w-[200px] h-[200px] object-cover rounded-full mb-4"
            />
            <p className="text-center font-semibold text-xl">John Doe</p>
            <div className="mt-3 flex items-center gap-2 bg-gray-100 p-2 px-5 border-2 rounded-full">
              <p className="text-xl text-normal dark:text-black">18 Articles</p>
            </div>
          </div>
          <div className="w-[23%] relative border-2 rounded-md h-[400px] flex flex-col items-center justify-center">
            <img
              src="https://images.pexels.com/photos/371160/pexels-photo-371160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="w-[200px] h-[200px] object-cover rounded-full mb-4"
            />
            <p className="text-center font-semibold text-xl">John Doe</p>
            <div className="mt-3 flex items-center gap-2 bg-gray-100 p-2 px-5 border-2 rounded-full">
              <p className="text-xl text-normal dark:text-black">18 Articles</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Authors;
