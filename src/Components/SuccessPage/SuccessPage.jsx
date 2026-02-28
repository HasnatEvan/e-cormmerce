import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-10">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-teal-100/70 blur-3xl" />

      <div className="relative max-w-4xl mx-auto grid gap-8 lg:grid-cols-2 items-center">
        <div className="bg-white/90 backdrop-blur w-full rounded-3xl shadow-2xl border border-emerald-100 p-6 sm:p-8 animate-fadeIn">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="text-emerald-600 w-8 h-8" />
            </div>
            <div>
              <p className="text-emerald-700 text-xs uppercase tracking-widest">
                Payment Confirmed
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Order Placed Successfully
              </h2>
            </div>
          </div>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-4">
            Thank you for shopping with us. Your order is confirmed and now in
            processing.
          </p>

          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:p-5 text-emerald-800 text-sm sm:text-base">
            Our team will call you shortly to confirm delivery details. Keep
            your phone available.
          </div>

          <div className="mt-6 grid gap-3">
            <Link to="/purchase-history">
              <button className="w-full bg-emerald-600 text-white py-3 rounded-2xl font-semibold hover:bg-emerald-700 active:scale-[.98] transition">
                View My Orders
              </button>
            </Link>

            <Link to="/all-products">
              <button className="w-full border border-emerald-200 py-3 rounded-2xl font-semibold text-emerald-700 hover:bg-emerald-50 active:scale-[.98] transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-gray-900">
            What Happens Next
          </h3>

          <div className="mt-5 space-y-4 text-sm sm:text-base">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <p className="font-semibold text-gray-900">Payment verified</p>
                <p className="text-gray-600">
                  We received your payment and created the order.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <p className="font-semibold text-gray-900">Packing items</p>
                <p className="text-gray-600">
                  Your products are being prepared for shipment.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <p className="font-semibold text-gray-900">Out for delivery</p>
                <p className="text-gray-600">
                  We will notify you before dispatch.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-emerald-200 p-4 text-xs sm:text-sm text-gray-500">
            Track your order status anytime in Purchase History.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
