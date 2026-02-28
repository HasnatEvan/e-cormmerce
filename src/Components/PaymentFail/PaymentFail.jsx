import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentFail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 px-4">
      <div className="bg-white w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl shadow-xl p-6 sm:p-8 text-center border border-gray-100 animate-fadeIn">
        <div className="h-2 w-24 mx-auto rounded-full bg-red-500 mb-4"></div>

        <div className="flex justify-center mb-4">
          <XCircle className="text-red-500 w-16 h-16 sm:w-20 sm:h-20" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
          Payment Failed
        </h2>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
          Your payment could not be completed. Please try again or choose a
          different method.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-5 mb-6 text-sm sm:text-base text-red-700 shadow-sm">
          If the amount was deducted, it will be reversed automatically by your
          bank or provider.
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/checkout">
            <button className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 active:scale-[.98] transition">
              Try Again
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

export default PaymentFail;
