import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaHome,
  FaCompass,
  FaYoutube,
  FaHistory,
  FaPlayCircle,
  FaClock,
  FaThumbsUp,
  FaChevronDown,
  FaSearch,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md ">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-black p-2 focus:outline-none"
            >
              <FaBars />
            </button>
            <FaYoutube className="text-red-600 text-3xl ml-2" />
            <span className="ml-2 font-bold hidden md:inline">YouTube Clone</span>
          </div>
          <div className="flex-grow mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
              />
              <button className="absolute right-0 top-0 mt-3 mr-3">
                <FaSearch />
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2">
              <FaBell />
            </button>
            <button className="p-2 ml-2">
              <FaUserCircle />
            </button>
          </div>
        </div>
      </div>

      <div className="flex mt-14">
        {/* sidebar */}
        <div
          className={`fixed top-14 left-0 h-full z-50 bg-white text-black transition-all duration-300 ${
            isSmallScreen && !isOpen ? "w-0" : isOpen ? "w-64" : "w-16"
          }`}
        >
          {/* Menu Items */}
          <nav className="mt-4 space-y-2 ml-2">
            <a href="#" className="flex items-center p-3 hover:bg-gray-100">
              <FaHome className="mr-4" />
              <span className={`${isOpen ? "block" : "hidden"}`}>Home</span>
            </a>
            <a href="#" className="flex items-center p-3 hover:bg-gray-100">
              <FaCompass className="mr-4" />
              <span className={`${isOpen ? "block" : "hidden"}`}>Explore</span>
            </a>
            <a href="#" className="flex items-center p-3 hover:bg-gray-100">
              <FaYoutube className="mr-4" />
              <span className={`${isOpen ? "block" : "hidden"}`}>
                Subscriptions
              </span>
            </a>
            <hr className="my-2" />
            <a href="#" className="flex items-center p-3 hover:bg-gray-100">
              <FaPlayCircle className="mr-4" />
              <span className={`${isOpen ? "block" : "hidden"}`}>Library</span>
            </a>
            <a href="#" className="flex items-center p-3 hover:bg-gray-100">
              <FaHistory className="mr-4" />
              <span className={`${isOpen ? "block" : "hidden"}`}>History</span>
            </a>
            <a href="#" className="flex items-center p-3 hover:bg-gray-100">
              <FaClock className="mr-4" />
              <span className={`${isOpen ? "block" : "hidden"}`}>
                Watch Later
              </span>
            </a>
            <a href="#" className="flex items-center p-3 hover:bg-gray-100">
              <FaThumbsUp className="mr-4" />
              <span className={`${isOpen ? "block" : "hidden"}`}>
                Liked Videos
              </span>
            </a>
            <a href="#" className="flex items-center p-3 hover:bg-gray-100">
              <FaChevronDown className="mr-4" />
              <span className={`${isOpen ? "block" : "hidden"}`}>
                Show More
              </span>
            </a>
          </nav>
        </div>
        {/* Main Content */}
        <div
          className={`${
            isOpen && !isSmallScreen
              ? "ml-64"
              : isSmallScreen && !isOpen
              ? "ml-0"
              : "ml-16"
          } p-3 transition-all w-full`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
