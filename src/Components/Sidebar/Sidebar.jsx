import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaLock,
  FaSignOutAlt,
  FaPlus
} from "react-icons/fa";
import { MdDashboard, MdRateReview } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div
      className="
        w-full
        md:w-60
        bg-white
        shadow-md
        p-4 md:p-6
        md:h-[calc(100vh-64px)]
        md:sticky md:top-[64px]
        overflow-y-auto
        rounded-lg md:rounded-none
      "
    >
      {/* ================= Profile ================= */}
      <div className="flex flex-col items-center text-center mb-6">
        <FaUserCircle className="text-gray-400 text-6xl md:text-7xl" />
        <h2 className="mt-2 font-semibold text-gray-800 text-sm md:text-base">
          None
        </h2>
        <p className="text-gray-500 text-xs md:text-sm break-all">
          hasnatevan59@gmail.com
        </p>
      </div>

      {/* ================= Menu ================= */}
      <ul className="space-y-3 md:space-y-4">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center gap-3 text-gray-700 font-medium hover:text-red-500"
          >
            <MdDashboard className="text-lg" />
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/cart"
            className="flex items-center gap-3 text-gray-700 hover:text-red-500"
          >
            <FaShoppingCart className="text-lg" />
            Cart History
          </Link>
        </li>

        <li>
          <Link
            to="/purchase-history"
            className="flex items-center gap-3 text-gray-700 hover:text-red-500"
          >
            <RiFileList3Line className="text-lg" />
            Purchase History
          </Link>
        </li>

        <li>
          <Link
            to="/wishlist"
            className="flex items-center gap-3 text-gray-700 hover:text-red-500"
          >
            <FaHeart className="text-lg" />
            Wishlist
          </Link>
        </li>

        <li>
          <Link
            to="/my-reviews"
            className="flex items-center gap-3 text-gray-700 hover:text-red-500"
          >
            <MdRateReview className="text-lg" />
            My Review
          </Link>
        </li>

        <li>
          <Link
            to="/profile"
            className="flex items-center gap-3 text-gray-700 hover:text-red-500"
          >
            <FaUserCircle className="text-lg" />
            Manage Profile
          </Link>
        </li>

        <li>
          <Link
            to="/add-products"
            className="flex items-center gap-3 text-gray-700 hover:text-red-500"
          >
            <FaPlus className="text-lg" />
            Add Products
          </Link>
        </li>

        <li>
          <Link
            to="/change-password"
            className="flex items-center gap-3 text-gray-700 hover:text-red-500"
          >
            <FaLock className="text-lg" />
            Change Password
          </Link>
        </li>

        <li>
          <Link
            to="/logout"
            className="flex items-center gap-3 text-gray-700 hover:text-red-500"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
