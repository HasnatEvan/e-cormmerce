import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../../../Components/Sidebar/Sidebar";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { state: order } = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [status, setStatus] = useState(order?.status);
  const [updating, setUpdating] = useState(false);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500 text-lg">
        Order data not found
      </div>
    );
  }

  /* ================= STATUS STYLE ================= */
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "returned":
        return "bg-purple-100 text-purple-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  /* ================= UPDATE STATUS ================= */
  const handleStatusUpdate = async () => {
    if (status === order.status) return;

    try {
      setUpdating(true);
      await axiosSecure.patch(`/orders/${order._id}`, { status });
      toast.success("Order status updated");
      order.status = status; // UI instant update
    } catch {
      toast.error("Failed to update status");
      setStatus(order.status);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4">
      <div className="flex flex-col md:flex-row gap-6">

        {/* ================= SIDEBAR ================= */}
        <aside className="hidden md:block md:w-1/4">
          <Sidebar />
        </aside>

        {/* ================= MAIN ================= */}
        <main className="w-full md:w-3/4 flex flex-col gap-6">

          {/* ================= HEADER ================= */}
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white p-5 flex justify-between items-center shadow">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Order Details
            </h2>
            <button
              onClick={() => navigate(-1)}
              className="bg-white text-blue-600 px-4 py-1.5 rounded-md font-medium border border-blue-400 hover:bg-blue-50 transition"
            >
              ← Back
            </button>
          </div>

          {/* ================= CUSTOMER + ORDER INFO ================= */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* ================= CUSTOMER INFO ================= */}
            <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-5 space-y-2">
              <h3 className="font-semibold text-lg text-blue-600 mb-3">
                Customer Information
              </h3>

              <p className="text-lg font-bold text-blue-700">
                {order.userName || "Unknown Customer"}
              </p>

              <p><strong>Email:</strong> {order.userEmail}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>District:</strong> {order.district}</p>
              <p><strong>Area Type:</strong> {order.areaType}</p>
              <p><strong>Address:</strong> {order.address}</p>

              {order.notes && (
                <p><strong>Notes:</strong> {order.notes}</p>
              )}
            </div>

            {/* ================= ORDER INFO ================= */}
            <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-5 space-y-3">
              <h3 className="font-semibold text-lg text-blue-600 mb-3">
                Order Information
              </h3>

              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <p>
                <strong>Transaction ID:</strong>{" "}
                {order.transactionId || order.trxId || "N/A"}
              </p>

              {/* STATUS VIEW */}
              <div className="flex items-center gap-2">
                <strong>Status:</strong>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                    status
                  )}`}
                >
                  {status}
                </span>
              </div>

              {/* STATUS CHANGE */}
              <div className="flex flex-col gap-2 pt-2">
                <label className="text-sm font-medium text-gray-600">
                  Change Status
                </label>

                <div className="flex gap-2">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-blue-300 rounded-md px-3 py-1.5 text-sm focus:outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                    <option value="returned">Returned</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <button
                    onClick={handleStatusUpdate}
                    disabled={updating}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>

              <p>
                <strong>Order Time:</strong>{" "}
                {new Date(order.orderTime).toLocaleString("en-BD")}
              </p>
            </div>
          </div>

          {/* ================= ORDERED ITEMS ================= */}
          <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-5">
            <h3 className="font-semibold text-lg text-blue-600 mb-4">
              Ordered Items
            </h3>

            <div className="space-y-4">
              {order.items.map((item, index) => {
                const imageSrc =
                  item.image ||
                  item.imageUrl ||
                  (Array.isArray(item.images) ? item.images[0] : null);

                return (
                  <div
                    key={index}
                    className="flex gap-4 p-4 border border-blue-200 rounded-lg hover:border-blue-400 hover:shadow transition"
                  >
                    <div className="w-20 h-20 rounded-md overflow-hidden border border-blue-400 bg-blue-50">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-blue-400">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {item.name}
                      </p>
                      <div className="grid sm:grid-cols-3 gap-2 text-sm text-gray-600 mt-2">
                        <p>Price: ৳ {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>
                          Color: {item.color || "N/A"} | Size:{" "}
                          {item.size || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= PRICE SUMMARY ================= */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-300 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-lg text-blue-700 mb-3">
              Price Summary
            </h3>

            <div className="space-y-1 text-sm text-gray-700">
              <p>Sub Total: ৳ {order.subTotal}</p>
              <p>Delivery Fee: ৳ {order.deliveryFee}</p>
              <p>Total Quantity: {order.totalQuantity}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-blue-300 flex justify-between items-center">
              <span className="font-semibold text-blue-800">
                Total Price
              </span>
              <span className="text-2xl font-bold text-blue-700">
                ৳ {order.totalPrice}
              </span>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default OrderDetails;
