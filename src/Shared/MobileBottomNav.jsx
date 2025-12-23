import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Grid,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";

import Sidebar from "./Sidbar";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MobileBottomNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [cartCount, setCartCount] = useState(0);

  /* ================= CART COUNT (SAFE EFFECT) ================= */
  useEffect(() => {
    let ignore = false;

    const loadCartCount = async () => {
      try {
        if (!user?.email) {
          if (!ignore) setCartCount(0);
          return;
        }

        const res = await axiosSecure.get(
          `/carts?email=${user.email}`
        );

        if (!ignore) {
          setCartCount(res.data?.length || 0);
        }
      } catch {
        if (!ignore) setCartCount(0);
      }
    };

    loadCartCount();

    return () => {
      ignore = true; // ✅ prevents cascading renders
    };
  }, [user?.email, axiosSecure]);

  return (
    <>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Bottom Navigation (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-30 block md:hidden">
        <div className="flex justify-around items-center py-2">

          {/* Home */}
          <Link to="/" className="flex flex-col items-center text-blue-600">
            <Home size={22} />
            <span className="text-xs">Home</span>
          </Link>

          {/* Category */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col items-center text-blue-600"
          >
            <Grid size={22} />
            <span className="text-xs">Category</span>
          </button>

          {/* Shop (Center Button) */}
          <Link
            to="/all-products"
            className="flex flex-col items-center bg-white rounded-full -mt-6 p-3 shadow-lg text-blue-600"
          >
            <ShoppingBag size={24} />
            <span className="text-xs">Shop</span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex flex-col items-center text-blue-600"
          >
            <ShoppingCart size={22} />
            <span className="text-xs">Cart</span>

            {cartCount > 0 && (
              <span className="absolute -top-1 right-0 bg-red-500 text-white text-[10px] px-1 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="flex flex-col items-center text-blue-600"
          >
            <User size={22} />
            <span className="text-xs">Profile</span>
          </Link>

        </div>
      </div>
    </>
  );
};

export default MobileBottomNav;
