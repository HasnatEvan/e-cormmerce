import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaLock,
  FaSignOutAlt,
  FaPlus,
  FaBoxes,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

const Sidebar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  /* =====================
     LOGOUT HANDLER
  ===================== */
  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

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
        {user?.photoURL ? (
          <div className="w-24 h-24 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-full h-full object-contain rounded-full p-2"
            />
          </div>
        ) : (
          <FaUserCircle className="text-gray-400 text-7xl" />
        )}

        <h2 className="mt-3 font-semibold text-gray-800 text-sm md:text-base">
          {user?.displayName || "User"}
        </h2>

        <p className="text-gray-500 text-xs md:text-sm break-all">
          {user?.email}
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

        {/* 🔥 Inventory */}
        <li>
          <Link
            to="/inventory"
            className="flex items-center gap-3 text-gray-700 hover:text-red-500"
          >
            <FaBoxes className="text-lg" />
            Inventory
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
            to="/cart"
            className="flex items-center gap-3 text-gray-700 hover:text-red-500"
          >
            <FaShoppingCart className="text-lg" />
            Cart History
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
            to="/purchase-history"
            className="flex items-center gap-3 text-gray-700 hover:text-red-500"
          >
            <RiFileList3Line className="text-lg" />
            Purchase History
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

        {/* ================= Logout ================= */}
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-gray-700 hover:text-red-500 w-full text-left"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
