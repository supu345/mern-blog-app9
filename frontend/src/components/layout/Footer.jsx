import React from "react";
import Logo from "../../assets/logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaKickstarterK } from "react-icons/fa6";
import { FaVimeoV } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="shadow-md pt-6 px-[60px] bg-lime-100 dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div>
        <div className="pl-4">
          <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
            <img src={Logo} alt="Logo" className="w-10" />
            Shopsy
          </a>
          <p className="w-1/2 text-xl py-6">
            Lorem ipsum dolor sit amet consectetur <br />
            possimus eligendi, voluptates impedit
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 pl-4">
        <div className="">
          <p className="text-xl font-bold mb-5">Social</p>
          <div className="flex flex-row gap-2 items-center">
            <FaFacebook className="text-xl text-current" />
            <p className="text-md font-bold">Facebook</p>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <FaXTwitter className="text-xl text-current" />
            <p className="text-md font-bold">Twitter</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <FaKickstarterK className="text-xl text-current" />
            <p className="text-md font-bold">KickstarterK</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <FaVimeoV className="text-xl text-current" />
            <p className="text-md font-bold">FaVimeoV</p>
          </div>
        </div>
        <div className="">
          <p className="text-xl font-bold mb-5">About</p>
          <p className="text-md font-normal mb-2">Style Guide</p>
          <p className="text-md font-normal mb-2">Features</p>
          <p className="text-md font-normal mb-2">Contact</p>
          <p className="text-md font-normal mb-2">404</p>
        </div>
        <div className="">
          <p className="text-xl font-bold mb-5">About</p>
          <p className="text-md font-normal mb-2">Style Guide</p>
          <p className="text-md font-normal mb-2">Features</p>
          <p className="text-md font-normal mb-2">Contact</p>
          <p className="text-md font-normal mb-2">404</p>
        </div>
        <div className="">
          <p className="text-xl font-bold mb-5">About</p>
          <p className="text-md font-normal mb-2">Style Guide</p>
          <p className="text-md font-normal mb-2">Features</p>
          <p className="text-md font-normal mb-2">Contact</p>
          <p className="text-md font-normal mb-2">404</p>
        </div>
      </div>
      <div className="py-8 px-4">
        <p>© 2024 Blog Theme. Published with Suparna.</p>
      </div>
    </div>
  );
};

export default Footer;
