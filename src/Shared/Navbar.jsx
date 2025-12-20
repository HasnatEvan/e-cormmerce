import { FaPhoneAlt, FaUser, FaHeart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../src/assets/Logo/logo.png";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="w-full shadow bg-white px-3 sm:px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4 flex-1">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-7 sm:h-10 md:h-12 w-auto"
            />
          </Link>

          <div className="hidden sm:flex flex-1 max-w-xl relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-blue-500 pl-2 pr-10 py-2 text-sm rounded"
            />
            <button className="absolute right-0 top-0 h-full px-3 bg-blue-500 rounded-r">
              <FaSearch className="text-white text-lg" />
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Phone */}
          <div className="hidden sm:flex items-center gap-1 text-gray-700">
            <FaPhoneAlt />
            <div>
              <p className="text-[10px] text-gray-500">Call Us</p>
              <p className="text-xs font-semibold">0123456789</p>
            </div>
          </div>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="flex flex-col items-center gap-0.5 px-2 py-1 text-blue-500 relative sm:hidden"
          >
            <FaHeart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
            <span className="text-xs">Wishlist</span>
          </Link>

          {/* Account / Logout */}
          {!user ? (
            <Link
              to="/login"
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-blue-500"
            >
              <FaUser className="text-xl" />
              <span className="text-xs">Account</span>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-red-500"
            >
              <FaUser className="text-xl" />
              <span className="text-xs">Logout</span>
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
