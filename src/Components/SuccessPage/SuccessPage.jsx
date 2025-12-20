import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-xl shadow-lg p-6 sm:p-8 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          Order Successful 🎉
        </h2>

        {/* Message */}
        <p className="text-sm sm:text-base text-gray-600 mb-5">
          Thank you for your order!  
          Your order has been placed successfully and is now being processed.
        </p>

        {/* Info box */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mb-6 text-sm sm:text-base text-green-700">
          📦 You will receive a confirmation call very soon.  
          Please keep your phone available.
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link to="/orders">
            <button className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition">
              View My Orders
            </button>
          </Link>

          <Link to="/products">
            <button className="w-full border border-gray-300 py-2.5 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
