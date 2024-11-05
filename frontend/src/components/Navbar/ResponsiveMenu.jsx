import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Menu as NavbarLinks, DropdownLinks } from "./Navbar";
import { FaCaretDown } from "react-icons/fa";

const ResponsiveMenu = ({ showMenu, setShowMenu }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-8 pb-6  text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      <div className="card">
        {/* <div className="flex items-center justify-start gap-3">
          <FaUserCircle size={50} />
          <div>
            <h1>Hello User</h1>
            <h1 className="text-sm text-slate-500">Premium user</h1>
          </div>
        </div> */}
        <nav className="mt-6">
          <ul className=" text-xl">
            {NavbarLinks.map((data) => (
              <li key={data.id}>
                <Link
                  to={data.link}
                  onClick={() => setShowMenu(false)}
                  className="mb-5 inline-block"
                >
                  {data.name}
                </Link>
              </li>
            ))}
            {/* Dropdown Links */}
            <li className="cursor-pointer" onClick={toggleDropdown}>
              <div className="flex items-center justify-between">
                <span>Pages</span>
                <FaCaretDown
                  className={`transition-transform ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </div>
              {showDropdown && (
                <ul className="pl-4 mt-2 space-y-2 text-lg">
                  {DropdownLinks.map((data) => (
                    <li key={data.id}>
                      <Link
                        to={data.link}
                        onClick={() => setShowMenu(false)}
                        className="inline-block"
                      >
                        {data.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer mt-8">
        <h1>
          Made with ❤ by <a href="https://dilshad-ahmed.github.io/">Suparna</a>{" "}
        </h1>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
