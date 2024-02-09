import React from "react";
import Logo from "../../assets/website/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ handleOrderPopup }) => {
  return (
    <>
      <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
        <div className="container py-10 sm:py-0">
          <div className="flex justify-between items-center">
            <div>
              <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
                <img src={Logo} alt="Logo" className="w-10" />
                Books
              </a>
            </div>

            <div className="flex justify-between items-center gap-4">
              <div className="group relative cursor-pointer">
                <a
                  href="/ "
                  className="flex  items-center gap-[2px] bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
                >
                  Home
                </a>
              </div>

              <Link to="/books-bought">
                <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3">
                  Bought Books
                </button>
              </Link>

              <Link to="/ordered-books">
                <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3">
                  Ordered Books
                </button>
              </Link>

              <ul className="hidden sm:flex items-center gap-4">
                <li className="group relative cursor-pointer">
                  <a
                    href="/sign-up"
                    className="flex  items-center gap-[2px] bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
                  >
                    Sign Up
                  </a>
                </li>
                <li className="group relative cursor-pointer">
                  <a
                    href="/sign-in"
                    className="flex  items-center gap-[2px] bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
                  >
                    Sign In
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
