import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ManageOrdersTable = ({ orders, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.orderTime) - new Date(a.orderTime)
  );

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

  /* ================= DELETE ORDER (ONLY CANCELLED) ================= */
  const handleDeleteOrder = async (order) => {
    // ❌ Only cancelled orders can be deleted
    if (order.status?.toLowerCase() !== "cancelled") {
      return Swal.fire({
        icon: "warning",
        title: "Action not allowed",
        text: "Only cancelled orders can be deleted.",
        confirmButtonColor: "#2563eb",
      });
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This cancelled order will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/orders/${order._id}`);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Cancelled order has been deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to delete order. Please try again.",
      });
    }
  };

  /* ================= DATE FORMAT ================= */
  const formatDateTime = (time) =>
    new Date(time).toLocaleString("en-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  /* ================= TEXT SHORTENER ================= */
  const truncateText = (text, maxLength = 22) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.slice(0, maxLength) + "…"
      : text;
  };

  /* ================= PRODUCT NAME LOGIC ================= */
  const getProductNames = (order) => {
    if (!order.items || order.items.length === 0) return "N/A";

    const firstProductName = truncateText(order.items[0].name);

    if (order.items.length === 1) {
      return firstProductName;
    }

    return `${firstProductName} and ${order.items.length - 1} more`;
  };

  return (
    <div className="flex flex-col min-h-[80vh]">

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block overflow-x-auto">
        <div className="grid grid-cols-12 border-b border-blue-500 pb-2 text-sm font-medium text-gray-500">
          <div className="col-span-3">Customer</div>
          <div className="col-span-4">Product</div>
          <div className="col-span-2 text-center">Date</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-2 text-center">Action</div>
        </div>

        {sortedOrders.map((order) => {
          const isCancelled =
            order.status?.toLowerCase() === "cancelled";

          return (
            <div
              key={order._id}
              className="grid grid-cols-12 items-center border-b border-blue-200 py-4 text-sm"
            >
              {/* CUSTOMER */}
              <div className="col-span-3">
                <p className="font-medium">
                  {order.userName || "Unknown User"}
                </p>
                <p className="text-sm font-bold text-red-600">
                  ৳ {order.totalPrice}
                </p>
              </div>

              {/* PRODUCT */}
              <div className="col-span-4">
                <p
                  className="font-medium text-gray-700 truncate"
                  title={order.items?.[0]?.name}
                >
                  {getProductNames(order)}
                </p>
              </div>

              {/* DATE */}
              <div className="col-span-2 text-center text-xs">
                {formatDateTime(order.orderTime)}
              </div>

              {/* STATUS */}
              <div className="col-span-1 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* ACTION */}
              <div className="col-span-2 flex items-center justify-center gap-4">
                <button
                  onClick={() =>
                    navigate(`/manage-orders/${order._id}`, {
                      state: order,
                    })
                  }
                  className="text-blue-600 hover:text-blue-800"
                  title="View order details"
                >
                  <FaEye />
                </button>

                <button
                  onClick={() => handleDeleteOrder(order)}
                  disabled={!isCancelled}
                  className={`${
                    isCancelled
                      ? "text-red-500 hover:text-red-700"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                  title={
                    isCancelled
                      ? "Delete cancelled order"
                      : "Only cancelled orders can be deleted"
                  }
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden space-y-4">
        {sortedOrders.map((order) => {
          const isCancelled =
            order.status?.toLowerCase() === "cancelled";

          return (
            <div
              key={order._id}
              className="border border-blue-300 rounded-lg p-4 space-y-3"
            >
              <div>
                <p className="font-medium">
                  {order.userName || "Unknown User"}
                </p>
                <p className="text-sm font-bold text-red-600">
                  ৳ {order.totalPrice}
                </p>
              </div>

              <div className="text-sm">
                <span className="text-gray-500">Product: </span>
                <span
                  className="font-medium"
                  title={order.items?.[0]?.name}
                >
                  {getProductNames(order)}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span>Date</span>
                <span>{formatDateTime(order.orderTime)}</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span>Status</span>
                <span
                  className={`px-2 py-1 rounded ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex justify-end gap-4 pt-2 border-t border-blue-300">
                <button
                  onClick={() =>
                    navigate(`/manage-orders/${order._id}`, {
                      state: order,
                    })
                  }
                  className="text-blue-600"
                >
                  <FaEye />
                </button>

                <button
                  onClick={() => handleDeleteOrder(order)}
                  disabled={!isCancelled}
                  className={`${
                    isCancelled
                      ? "text-red-500"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageOrdersTable;
