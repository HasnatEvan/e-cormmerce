import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Sidebar from "../../../../Components/Sidebar/Sidebar";
import ManageOrdersTable from "./ManageOrdersTable";

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/orders");
      return data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4 bg-white">
      <div className="flex flex-col md:flex-row gap-6">

        {/* ================= SIDEBAR ================= */}
        <aside className="hidden md:block md:w-1/4">
          <Sidebar />
        </aside>

        {/* ================= MAIN ================= */}
        <main className="w-full md:w-3/4 flex flex-col min-h-[80vh]">

          {/* ===== LOADING (CENTER LIKE MyOrders) ===== */}
          {isLoading && (
            <div className="flex flex-1 items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <p className="text-gray-500 text-lg">
                  Loading orders...
                </p>
              </div>
            </div>
          )}

          {/* ===== ERROR ===== */}
          {isError && !isLoading && (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-red-500 text-lg">
                Failed to load orders
              </p>
            </div>
          )}

          {/* ===== CONTENT ===== */}
          {!isLoading && !isError && (
            <>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                Manage Orders
              </h2>

              {orders.length === 0 ? (
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-gray-400 text-lg">
                    📦 No orders found
                  </p>
                </div>
              ) : (
                <ManageOrdersTable
                  orders={orders}
                  refetch={refetch}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ManageOrders;
