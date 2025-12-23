import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaAngleDown } from "react-icons/fa";

import logo from "../../src/assets/Logo/logo.png";
import englishFlag from "../../src/assets/Flag/english.png";
import bdFlag from "../../src/assets/Flag/bd.jpg";

import useAxiosPublic from "../Hooks/useAxiosPublic";

const MobileSidebar = ({ menuOpen, setMenuOpen }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [mobileLanguageOpen, setMobileLanguageOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  const [categories, setCategories] = useState([]);
  const axiosPublic = useAxiosPublic();

  /* ================= Fetch Categories ================= */
  useEffect(() => {
    axiosPublic
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, [axiosPublic]);

  const brands = ["Campaign", "Trending", "Brands", "Outlets"];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex-1 flex items-center justify-center"
          >
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>

          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl ml-2 text-blue-500"
          >
            <FaTimes />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b text-sm font-semibold">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-2 ${
              activeTab === "profile"
                ? "text-black border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
          >
            PROFILE
          </button>

          <button
            onClick={() => setActiveTab("filter")}
            className={`flex-1 py-2 ${
              activeTab === "filter"
                ? "text-black border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
          >
            FILTER DATA
          </button>
        </div>

        {/* ================= Profile Tab ================= */}
        {activeTab === "profile" && (
          <div className="flex flex-col px-4 py-4 space-y-2">
            <Link
              to="/retailer-register"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 rounded hover:bg-blue-50 text-gray-700"
            >
              Retailer Register
            </Link>

            <Link
              to="/customer-register"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 rounded hover:bg-blue-50 text-gray-700"
            >
              Customer Register
            </Link>

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 rounded hover:bg-blue-50 text-gray-700"
            >
              Login
            </Link>
          </div>
        )}

        {/* ================= Filter Tab ================= */}
        {activeTab === "filter" && (
          <div className="flex flex-col px-4 py-4 space-y-2 text-sm">

            {/* Categories */}
            <button
              onClick={() =>
                setMobileCategoriesOpen(!mobileCategoriesOpen)
              }
              className="flex items-center justify-between w-full px-4 py-2 rounded hover:bg-gray-50"
            >
              <span>Categories</span>
              <FaAngleDown
                className={`transition-transform ${
                  mobileCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileCategoriesOpen && (
              <ul className="ml-4 border-l pl-3">
                {categories.map((cat, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/category/${encodeURIComponent(cat.name)}`}
                      onClick={() => {
                        setMenuOpen(false);
                        setMobileCategoriesOpen(false);
                      }}
                      className="block py-1 text-gray-700 hover:text-blue-600"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Pages */}
            <button
              onClick={() =>
                setMobileBrandsOpen(!mobileBrandsOpen)
              }
              className="flex items-center justify-between w-full px-4 py-2 rounded hover:bg-gray-50"
            >
              <span>Pages</span>
              <FaAngleDown
                className={`transition-transform ${
                  mobileBrandsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileBrandsOpen && (
              <ul className="ml-4 border-l pl-3">
                {brands.map((brand, idx) => (
                  <li
                    key={idx}
                    className="py-1 text-gray-700 hover:text-blue-600 cursor-pointer"
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            )}

            {/* Language */}
            <button
              onClick={() =>
                setMobileLanguageOpen(!mobileLanguageOpen)
              }
              className="flex items-center justify-between w-full px-4 py-2 rounded hover:bg-gray-50"
            >
              <span>Language</span>
              <FaAngleDown
                className={`transition-transform ${
                  mobileLanguageOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileLanguageOpen && (
              <ul className="ml-4 border-l pl-3">
                <li
                  onClick={() => {
                    setLanguage("English");
                    setMobileLanguageOpen(false);
                  }}
                  className="py-1 flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={englishFlag}
                    className="w-5 h-5 rounded-full"
                  />
                  English
                </li>

                <li
                  onClick={() => {
                    setLanguage("বাংলা");
                    setMobileLanguageOpen(false);
                  }}
                  className="py-1 flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={bdFlag}
                    className="w-5 h-5 rounded-full"
                  />
                  বাংলা
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default MobileSidebar;
