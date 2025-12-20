import {
  FaHeart,
  FaShoppingCart,
  FaAngleDown,
  FaThLarge,
  FaBars
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import MobileSidebar from "./MobileSidebar ";

const MainNavbar = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);

  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const categoryRef = useRef();

  const activeClass = "text-blue-500 font-semibold";
  const normalClass = "text-blue-500 hover:text-blue-600";

  /* ================= Fetch Categories ================= */
  useEffect(() => {
    axiosPublic.get("/categories")
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  }, [axiosPublic]);

  /* ================= Fetch Wishlist & Cart Count ================= */
  useEffect(() => {
    if (!user) {
      setWishlistCount(0);
      setCartCount(0);
      return;
    }

    const loadCounts = async () => {
      try {
        const [wishlistRes, cartRes] = await Promise.all([
          axiosSecure.get(`/wishlists?email=${user.email}`),
          axiosSecure.get(`/carts?email=${user.email}`)
        ]);

        setWishlistCount(wishlistRes.data.length);
        setCartCount(cartRes.data.length);
      } catch (error) {
        console.error("Count load failed");
      }
    };

    loadCounts();
  }, [user, axiosSecure]);

  /* ================= Outside Click Close ================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full shadow-md bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* ================= Left ================= */}
        <div className="flex items-center gap-6">

          {/* Categories Dropdown */}
          <div ref={categoryRef} className="relative hidden md:block">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex items-center gap-2 font-medium text-blue-500"
            >
              <FaThLarge />
              <span>All Categories</span>
              <FaAngleDown />
            </button>

            {categoriesOpen && (
              <div className="absolute bg-white shadow-md rounded-md mt-2 w-64 z-50 max-h-80 overflow-y-auto">
                <ul className="flex flex-col text-sm">
                  {categories.map((cat, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                    >
                      {cat.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 ml-8">
            <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeClass : normalClass}>Dashboard</NavLink>
            <NavLink to="/trending" className={({ isActive }) => isActive ? activeClass : normalClass}>Trending</NavLink>
            <NavLink to="/brands" className={({ isActive }) => isActive ? activeClass : normalClass}>Brands</NavLink>
            <NavLink to="/outlets" className={({ isActive }) => isActive ? activeClass : normalClass}>Outlets</NavLink>
          </div>
        </div>

        {/* ================= Right ================= */}
        <div className="hidden md:flex items-center gap-8">

          {/* Wishlist */}
          <NavLink to="/wishlist" className="relative flex items-center gap-2 text-blue-500">
            <FaHeart className="text-xl" />
            <span className="text-sm">Wishlist</span>

            {wishlistCount > 0 && (
              <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </NavLink>

          {/* Cart */}
          <NavLink to="/cart" className="relative flex items-center gap-2 text-blue-500">
            <FaShoppingCart className="text-xl" />
            <span className="text-sm">Cart</span>

            {cartCount > 0 && (
              <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>

        {/* ================= Mobile ================= */}
        <div className="md:hidden flex items-center gap-2 w-full">
          <button
            className="text-2xl text-blue-500"
            onClick={() => setMenuOpen(true)}
          >
            <FaBars />
          </button>

          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-1 border border-blue-500 rounded"
          />
        </div>
      </div>

      <MobileSidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
};

export default MainNavbar;
