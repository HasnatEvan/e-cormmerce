// NewArrivals.jsx
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Card from "../../../Components/Card/Card";

const NewArrivals = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/products");
      return data;
    },
  });

  /* ============ Loading State ============ */
  if (isLoading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  /* ============ Error State ============ */
  if (isError) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load products
      </p>
    );
  }

  /* ============ FILTER: ONLY New Arrivals ============ */
  const newArrivalProducts = products.filter(
    (product) => product.productType === "New Arrivals"
  );

  return (
    <div className="px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="mb-2 sm:mb-0">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            New Arrivals
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Fresh picks — just landed in our store.
          </p>
        </div>

        {/* View All only if New Arrivals exist */}
        {newArrivalProducts.length > 0 && (
          <div className="flex justify-end w-full sm:w-auto">
            <button className="text-blue-500 text-xs sm:text-sm font-medium">
              View All
            </button>
          </div>
        )}
      </div>

      {/* ============ Empty State ============ */}
      {newArrivalProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">
            No new arrivals available
          </p>
          <p className="text-sm mt-2">
            New products will appear here soon
          </p>
        </div>
      ) : (
        /* ============ Products Grid ============ */
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {newArrivalProducts.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
