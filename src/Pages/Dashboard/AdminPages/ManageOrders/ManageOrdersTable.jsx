import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";

const ManageOrdersTable = ({ orders, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.orderTime) - new Date(a.orderTime)
  );
  const cancelledIds = useMemo(
    () =>
      sortedOrders
        .filter((o) => o.status?.toLowerCase() === "cancelled")
        .map((o) => o._id),
    [sortedOrders]
  );

  const allSelected =
    sortedOrders.length > 0 &&
    sortedOrders.every((o) => selectedIds.includes(o._id));

  const toggleSelect = (orderId) => {
    setSelectedIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(sortedOrders.map((o) => o._id));
    }
  };

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
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted!",
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

  /* ================= BULK DELETE (CANCELLED ONLY) ================= */
  const handleBulkDelete = async () => {
    const deletableIds = [...selectedIds];

    if (deletableIds.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No orders selected",
        text: "Please select at least one order.",
        confirmButtonColor: "#2563eb",
      });
    }

    const result = await Swal.fire({
      title: "Delete selected orders?",
      text: `You are deleting ${deletableIds.length} cancelled order(s). This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await Promise.all(
        deletableIds.map((id) => axiosSecure.delete(`/orders/${id}`))
      );

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Selected cancelled orders deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      setSelectedIds((prev) =>
        prev.filter((id) => !deletableIds.includes(id))
      );
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to delete selected orders.",
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

      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="text-sm text-gray-500">
          Selected:{" "}
          <span className="font-semibold text-gray-700">
            {selectedIds.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSelectAll}
            disabled={sortedOrders.length === 0}
            className={`px-3 py-1.5 rounded border text-sm ${
              sortedOrders.length === 0
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-blue-400 text-blue-600 hover:bg-blue-50"
            }`}
          >
            {allSelected ? "Unselect All" : "Select All"}
          </button>

          <button
            onClick={handleBulkDelete}
            disabled={selectedIds.length === 0}
            className={`px-3 py-1.5 rounded text-sm ${
              selectedIds.length === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Delete Selected
          </button>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block overflow-x-auto">
        <div className="grid grid-cols-12 border-b border-blue-500 pb-2 text-sm font-medium text-gray-500">
          <div className="col-span-1 text-center">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              disabled={sortedOrders.length === 0}
            />
          </div>
          <div className="col-span-3">Customer</div>
          <div className="col-span-3">Product</div>
          <div className="col-span-2 text-center">Date</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-2 text-center">Action</div>
        </div>

        {sortedOrders.map((order) => {
          const isCancelled =
            order.status?.toLowerCase() === "cancelled";
          const isSelected = selectedIds.includes(order._id);

          return (
            <div
              key={order._id}
              className="grid grid-cols-12 items-center border-b border-blue-200 py-4 text-sm"
            >
              {/* SELECT */}
              <div className="col-span-1 flex justify-center">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelect(order._id)}
                  title="Select order"
                />
              </div>

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
              <div className="col-span-3">
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
                  className="text-red-500 hover:text-red-700"
                  title="Delete order"
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
          const isSelected = selectedIds.includes(order._id);

          return (
            <div
              key={order._id}
              className="border border-blue-300 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Select</span>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelect(order._id)}
                />
              </div>

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
                  className="text-red-500"
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
