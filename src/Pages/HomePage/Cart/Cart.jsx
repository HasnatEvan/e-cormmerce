import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import Sidebar from "../../../Components/Sidebar/Sidebar";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Cart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  /* =====================
     LOAD CART
  ===================== */
  useEffect(() => {
    if (!user) return;

    const loadCart = async () => {
      try {
        const res = await axiosSecure.get(`/carts?email=${user.email}`);
        setCart(res.data);
      } catch {
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user, axiosSecure]);

  /* =====================
     REMOVE ITEM
  ===================== */
  const handleRemove = async (id) => {
    try {
      await axiosSecure.delete(`/carts/${id}`);
      setCart(prev => prev.filter(item => item._id !== id));
      toast.success("Removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  /* =====================
     UPDATE QUANTITY
  ===================== */
  const updateQuantity = async (item, newQty) => {
    if (newQty < 1) return;

    if (newQty > item.quantity) {
      toast.error("Stock limit exceeded ❌");
      return;
    }

    try {
      await axiosSecure.patch(`/carts/${item._id}`, {
        cartQuantity: newQty,
      });

      setCart(prev =>
        prev.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, cartQuantity: newQty }
            : cartItem
        )
      );
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  /* =====================
     TOTAL PRICE
  ===================== */
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  );

  /* =====================
     CHECKOUT
  ===================== */
  const handleCheckout = () => {
    setCheckoutLoading(true);
    setTimeout(() => navigate("/checkout"), 3000);
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading cart...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white">
      <div className="flex flex-col md:flex-row gap-6">

        {/* Sidebar */}
        <div className="hidden md:block md:w-1/4">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 flex flex-col min-h-[80vh]">
          <h2 className="text-xl font-semibold mb-8">
            Cart Summary
          </h2>

          {cart.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-gray-400 text-lg">
                🛒 Your cart is empty
              </p>
            </div>
          ) : (
            <>
              {/* ===== DESKTOP TABLE ===== */}
              <div className="hidden md:block">
                <div className="grid grid-cols-12 border-b border-gray-300 pb-2 font-medium text-gray-500">
                  <div className="col-span-4">Product</div>
                  <div className="col-span-1 text-center">Color</div>
                  <div className="col-span-1 text-center">Size</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-1 text-center">Qty</div>
                  <div className="col-span-2 text-center">Total</div>
                  <div className="col-span-1 text-center">Action</div>
                </div>

                {cart.map(item => (
                  <div
                    key={item._id}
                    className="grid grid-cols-12 items-center border-b border-gray-300 py-4"
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <img
                        src={item.cartImage}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <p>{item.name}</p>
                    </div>

                    <div className="col-span-1 text-center">
                      {item.selectedColor || "None"}
                    </div>

                    <div className="col-span-1 text-center">
                      {item.selectedSize || "None"}
                    </div>

                    <div className="col-span-2 text-center text-red-600 font-semibold">
                      ৳ {item.price}
                    </div>

                    <div className="col-span-1 flex justify-center gap-2">
                      <button
                        disabled={item.cartQuantity <= 1}
                        onClick={() =>
                          updateQuantity(item, item.cartQuantity - 1)
                        }
                        className="text-red-500 text-xl disabled:opacity-40"
                      >
                        −
                      </button>

                      <span>{item.cartQuantity}</span>

                      <button
                        disabled={item.cartQuantity >= item.quantity}
                        onClick={() =>
                          updateQuantity(item, item.cartQuantity + 1)
                        }
                        className="text-red-500 text-xl disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>

                    <div className="col-span-2 text-center font-semibold">
                      ৳ {item.price * item.cartQuantity}
                    </div>

                    <div className="col-span-1 text-center">
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ===== TOTAL & ACTIONS (BOTTOM) ===== */}
              <div className="mt-auto border border-gray-300 bg-gray-100 p-4">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">
                    Total Item Price:
                  </span>
                  <span className="font-semibold">
                    ৳ {totalPrice}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full bg-red-600 text-white py-2 font-semibold hover:bg-red-700 flex items-center justify-center disabled:opacity-70"
                >
                  {checkoutLoading ? (
                    <span className="loading loading-infinity loading-xl"></span>
                  ) : (
                    "PROCEED TO CHECKOUT"
                  )}
                </button>
              </div>
            </>
          )}

          <Link to="/products">
            <button className="w-full mt-3 border border-gray-300 text-red-600 py-2 font-semibold hover:bg-red-50">
              CONTINUE SHOPPING
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
