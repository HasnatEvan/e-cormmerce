import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const WishList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =====================
     LOAD WISHLIST
  ===================== */
  useEffect(() => {
    if (!user) return;

    const loadWishlist = async () => {
      try {
        const res = await axiosSecure.get(
          `/wishlists?email=${user.email}`
        );
        setWishlist(res.data);
      } catch {
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [user, axiosSecure]);

  /* =====================
     REMOVE ITEM
  ===================== */
  const handleRemove = async (productId) => {
    try {
      await axiosSecure.delete(
        `/wishlists?productId=${productId}&email=${user.email}`
      );

      setWishlist(prev =>
        prev.filter(item => item.productId !== productId)
      );

      toast.success("Removed from wishlist");
    } catch {
      toast.error("Failed to remove");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading wishlist...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-3">
      <div className="flex flex-col md:flex-row gap-6">

        {/* Sidebar */}
        <div className="md:w-1/4 hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="md:w-3/4 w-full">
          <h2 className="text-xl font-semibold mb-6 text-left md:text-left">
            Wishlist
          </h2>

          {/* EMPTY STATE */}
          {wishlist.length === 0 ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <p className="text-gray-400 text-lg text-center">
                ❤️ Your wishlist is empty
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Header */}
              <div className="hidden md:grid grid-cols-12 font-medium text-gray-500 border-b border-gray-300 pb-2 mb-4 text-center">
                <div className="col-span-6 text-left">Product</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Stock</div>
                <div className="col-span-2">Actions</div>
              </div>

              {/* Wishlist Items */}
              {wishlist.map((item) => (
                <div
                  key={item._id}
                  className="mb-4 md:mb-0 md:grid md:grid-cols-12 md:items-center gap-4 md:border-b md:border-gray-300 pb-4 text-center md:text-left"
                >
                  {/* Mobile Card */}
                  <div className="md:hidden relative border border-gray-300 rounded-lg p-4 flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    >
                      <X size={20} />
                    </button>

                    <Link to={`/product-details/${item.productId}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                    </Link>

                    <p className="text-sm text-gray-700">{item.name}</p>

                    <p className="font-medium text-gray-800">
                      ৳ {item.price}
                    </p>

                    <p
                      className={`text-sm ${
                        item.quantity > 0
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.quantity > 0
                        ? `In stock (${item.quantity})`
                        : "Out of stock"}
                    </p>
                  </div>

                  {/* Desktop Row */}
                  <div className="hidden md:contents">
                    <Link
                      to={`/product-details/${item.productId}`}
                      className="md:col-span-6 flex items-center gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <p className="text-sm text-gray-700 hover:text-blue-500">
                        {item.name}
                      </p>
                    </Link>

                    <div className="md:col-span-2 text-center font-medium">
                      ৳ {item.price}
                    </div>

                    <div
                      className={`md:col-span-2 text-center ${
                        item.quantity > 0
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.quantity > 0
                        ? `In stock (${item.quantity})`
                        : "Out of stock"}
                    </div>

                    <div className="md:col-span-2 flex justify-center">
                      <button
                        onClick={() => handleRemove(item.productId)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishList;
