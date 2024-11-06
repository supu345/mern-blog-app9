import React, { useEffect, useState } from "react";
import Logo from "../../../assets/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";
import ResponsiveMenu from "./ResponsiveMenu";
import { LuMenu } from "react-icons/lu";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import UserStore from "../../../store/UserStore";
import UserSubmitButton from "../../UserSubmitButton";
export const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Categories",
    link: "/categories",
  },
  {
    id: 3,
    name: "Contact",
    link: "/contact",
  },
  {
    id: 4,
    name: "Authors",
    link: "/authors",
  },
];

export const DropdownLinks = [
  {
    id: 1,
    name: "About us",
    link: "/about",
  },
  // {
  //   id: 2,
  //   name: "Blog",
  //   link: "/#",
  // },
  // {
  //   id: 3,
  //   name: "Single Blog",
  //   link: "/details/:id",
  // },

  {
    id: 4,
    name: "Pricing",
    link: "/#",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { isLogin, UserLogoutRequest } = UserStore();

  useEffect(() => {
    console.log("Is user logged in:", isLogin());
  }, [isLogin]);
  const onLogout = async () => {
    await UserLogoutRequest();
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />
              Shopsy
            </a>
          </div>

          {/* search bar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

            {/* order button */}
            {/* <button
              onClick={() => handleOrderPopup()}
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Order
              </span>
              <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button> */}

            {/* Darkmode Switch */}
            <div>
              <DarkMode />
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="sm:hidden flex items-center"
            >
              {/* Replace with a suitable icon for the mobile menu */}
              <div className="md:hidden block">
                {showMenu ? (
                  <HiMenuAlt1
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                ) : (
                  <HiMenuAlt3
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                )}
              </div>
              {/* <LuMenu className="text-xl text-primary" /> */}
            </button>
          </div>
        </div>
      </div>
      {/* lower Navbar */}
      <div className="flex flex-row justify-center">
        <div data-aos="zoom-in" className="flex  justify-center">
          <ul className="sm:flex hidden items-center gap-4 font-bold text-xl pt-3">
            {Menu.map((data) => (
              <li key={data.id}>
                <a
                  href={data.link}
                  className="inline-block px-4 hover:text-primary duration-200"
                >
                  {data.name}
                </a>
              </li>
            ))}
            {/* Simple Dropdown and Links */}
            <li className="group relative cursor-pointer">
              <a href="#" className="flex items-center gap-[2px] py-2">
                Pages
                <span>
                  <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                </span>
              </a>
              <div className=" absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                <ul>
                  {DropdownLinks.map((data) => (
                    <li key={data.id}>
                      <a
                        href={data.link}
                        className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                      >
                        {data.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="ml-[40px]">
          {isLogin() ? (
            <>
              <UserSubmitButton
                onClick={onLogout}
                text="Logout"
                className="btn-secondary my-3  ms-3 d-flex rounded-md"
              />
              {/* <Link
                to="/profile"
                className="btn-secondary flexCenter gap-x-2 medium-16 rounded-md"
              >
                Profile
              </Link> */}
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-green-600 text-white p-1 font-bold text-xl px-4 pl-3 rounded-md mt-3">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ResponsiveMenu component */}
      <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
    </div>
  );
};

export default Navbar;
