import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Home, Grid, ShoppingBag, ShoppingCart, User } from "lucide-react";

const Sidebar = ({ isOpen, categories, onClose }) => {
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 right-0 w-64 h-full bg-white shadow-md z-50 transform transition-transform duration-300 overflow-y-auto ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ maxHeight: "100vh" }}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <h2 className="font-bold text-lg text-blue-600">Categories</h2>
        <button onClick={onClose} className="text-blue-600 font-bold">
          X
        </button>
      </div>
      <ul className="p-4">
        {categories.map((cat, idx) => (
          <li key={idx} className="py-2 border-b text-blue-600 hover:text-blue-800 cursor-pointer">
            <Link to={`/category/${cat}`} onClick={onClose}>
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MobileBottomNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = [
    "Rod", "Cement", "Tin Sheet", "Stone & Sand", "Hardware",
    "Grocery", "Cosmetics", "Mobile", "Electric", "Electronics",
    "Furniture", "Motorcycle", "Garments", "Fish Feed", "Poultry Feed",
    "Cattle Feed", "Ceramic", "Tiles", "Tire", "Lubricant",
    "Bicycle", "Glass", "Housing", "Land Development", "Expatriate Network"
  ];

  return (
    <>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        categories={categories}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Bottom Navigation - MOBILE ONLY */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-30 overflow-visible block md:hidden">
        <div className="flex justify-around items-center py-2 relative">

          {/* Home */}
          <Link to="/" className="flex flex-col items-center text-blue-600 hover:text-blue-800">
            <Home size={22} color="#3b82f6" />
            <span className="text-xs">Home</span>
          </Link>

          {/* Category */}
          <button
            className="flex flex-col items-center text-blue-600 hover:text-blue-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Grid size={22} color="#3b82f6" />
            <span className="text-xs">Category</span>
          </button>

          {/* Shop (center button) */}
          <Link
            to="/shop"
            className="flex flex-col items-center text-blue-600 bg-white rounded-full -mt-6 p-3 shadow-lg z-50"
          >
            <ShoppingBag size={24} color="#3b82f6" />
            <span className="text-xs">Shop</span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex flex-col items-center text-blue-600 hover:text-blue-800"
          >
            <ShoppingCart size={22} color="#3b82f6" />
            <span className="text-xs">Cart</span>
            <span className="absolute -top-1 right-0 bg-red-500 text-white text-[10px] px-1 rounded-full">
              0
            </span>
          </Link>

          {/* Profile */}
          <Link to="/profile" className="flex flex-col items-center text-blue-600 hover:text-blue-800">
            <User size={22} color="#3b82f6" />
            <span className="text-xs">Profile</span>
          </Link>

        </div>
      </div>
    </>
  );
};

export default MobileBottomNav;
