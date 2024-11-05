import React from "react";

const Hero = () => {
  return (
    <div className="dark:text-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="h-[300px] md:h-[400px] py-10 md:py-[80px] flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Soulful{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Journeys:
            </span>
            <span> Tales of Love, Loss, and Transformation</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl pt-4 max-w-2xl">
            Welcome to your ultimate source for fresh insights! Discover curated{" "}
            content designed to enlighten, entertain, and engage readers
            worldwide.
          </p>
        </div>
        <div className="border "></div>
      </div>
    </div>
  );
};

export default Hero;
