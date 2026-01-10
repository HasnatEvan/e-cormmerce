import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 px-4">

      <div className="bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl shadow-xl p-6 sm:p-8 text-center border border-gray-100 animate-fadeIn">

        {/* Top accent bar */}
        <div className="h-2 w-24 mx-auto rounded-full bg-green-500 mb-4"></div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-16 h-16 sm:w-20 sm:h-20 animate-bounce" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
          Order Placed Successfully 🎉
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
          Thank you for shopping with us.  
          Your order is confirmed and currently being processed.
        </p>

        {/* Info box */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-5 mb-6 text-sm sm:text-base text-green-700 shadow-sm">
          📞 You will receive a confirmation call very soon.  
          Please keep your phone available.
        </div>

        {/* Order id placeholder (optional future) */}
        <p className="text-xs text-gray-400 italic mb-3">
          Keep an eye on your order history for updates
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">

          <Link to="/purchase-history">
            <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 active:scale-[.98] transition">
              View My Orders
            </button>
          </Link>

          <Link to="/all-products">
            <button className="w-full border border-gray-300 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 active:scale-[.98] transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
