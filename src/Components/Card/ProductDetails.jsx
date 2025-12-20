import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegHeart, FaShoppingCart, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [loadingCart, setLoadingCart] = useState(false);

  /* =====================
     FETCH PRODUCT
  ===================== */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await axiosPublic.get(`/products/${id}`);
        setProduct(res.data);
        setSelectedImage(res.data?.images?.[0] || "");
      } catch {
        toast.error("Failed to load product ❌");
      }
    };
    loadProduct();
  }, [id, axiosPublic]);

  if (!product) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading product...
      </p>
    );
  }

  const {
    _id,
    name,
    description,
    price,
    finalAmount,
    discount,
    quantity,
    images,
    colors,
    sizes,
  } = product;

  const isOutOfStock = quantity <= 0;

  /* =====================
     ADD TO CART
  ===================== */
  const handleAddToCart = async () => {
    if (isOutOfStock) {
      toast.error("Product is out of stock ❌");
      return false;
    }

    if (!user) {
      toast.warning("Please login first");
      navigate("/login");
      return false;
    }

    if (colors?.length && !selectedColor) {
      toast.warning("Please select a color");
      return false;
    }

    if (sizes?.length && !selectedSize) {
      toast.warning("Please select a size");
      return false;
    }

    const cartItem = {
      productId: _id,
      name,
      price: finalAmount,
      productStock: quantity,
      cartImage: selectedImage,
      selectedColor: selectedColor || null,
      selectedSize: selectedSize || null,
      cartQuantity: 1,
      userEmail: user.email,
    };

    try {
      setLoadingCart(true);
      await axiosSecure.post("/carts", cartItem);
      toast.success("Added to cart ✅");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Add to cart failed ❌");
      return false;
    } finally {
      setLoadingCart(false);
    }
  };

  /* =====================
     ADD TO WISHLIST
  ===================== */
  const handleAddToWishlist = async () => {
    if (!user) {
      toast.warning("Please login first");
      navigate("/login");
      return;
    }

    try {
      await axiosSecure.post("/wishlists", {
        productId: _id,
        name,
        image: selectedImage,
        price: finalAmount,
        userEmail: user.email,
      });
      toast.success("Added to wishlist ❤️");
    } catch (err) {
      if (err.response?.status === 409) {
        toast.info("Already in wishlist");
      } else {
        toast.error("Wishlist failed ❌");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 py-6">
      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Images */}
        <div>
          <img
            src={selectedImage}
            alt={name}
            className="w-full h-[300px] md:h-[420px] object-contain border border-blue-500 rounded"
          />

          <div className="flex gap-2 mt-3 overflow-x-auto">
            {images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 border rounded cursor-pointer ${
                  selectedImage === img
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "hover:border-blue-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">{name}</h2>

          {/* Color */}
          {colors?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-1">Color</h4>
              <div className="flex gap-2 flex-wrap">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 border rounded ${
                      selectedColor === color
                        ? "border-blue-500 bg-blue-50"
                        : ""
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          {sizes?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-1">Size</h4>
              <div className="flex gap-2 flex-wrap">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded ${
                      selectedSize === size
                        ? "border-blue-500 bg-blue-50"
                        : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock */}
          <div className="mt-4 flex justify-between items-center border-b pb-2">
            <span className={`font-semibold ${isOutOfStock ? "text-red-600" : "text-green-600"}`}>
              {isOutOfStock ? "Out of Stock" : `Stock: ${quantity}`}
            </span>

            <button
              onClick={handleAddToWishlist}
              className="border px-3 py-1 rounded-full flex items-center gap-2"
            >
              <FaRegHeart /> Wishlist
            </button>
          </div>

          {/* Price */}
          <div className="mt-5">
            <p className="line-through text-gray-400">৳ {price}</p>
            <p className="text-3xl font-bold">৳ {finalAmount}</p>
            <p className="text-sm text-green-600">You save {discount}%</p>
          </div>

          {/* Buttons */}
          <div className="mt-5 flex gap-3 flex-wrap">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || loadingCart}
              className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-50 disabled:opacity-50"
            >
              <FaShoppingCart /> Add to Cart
            </button>

            <button
              disabled={isOutOfStock || loadingCart}
              onClick={() =>
                navigate("/single-checkout", {
                  state: {
                    product: {
                      productId: _id,
                      name,
                      price: finalAmount,
                      quantity: 1,
                      productStock: quantity,
                      image: selectedImage,
                      selectedColor,
                      selectedSize,
                    },
                  },
                })
              }
              className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 disabled:bg-gray-400"
            >
              Buy Now <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex gap-6 border-b">
          {["Description", "Questions"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-4 text-gray-700 whitespace-pre-line">
          {activeTab === "Description" && description}
          {activeTab === "Questions" && (
            <p>❓ No questions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
