import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const PopularCategory = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popular-categories"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/popular-categories");
      return data;
    },
  });

  /* ============ Loading State ============ */
  if (isLoading) {
    return <p className="text-center py-10">Loading Categories...</p>;
  }

  /* ============ Error State ============ */
  if (isError) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load categories
      </p>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-medium">Popular Categories</h2>
          <p className="text-gray-500 mt-2">
            Find your perfect product in just one click.
          </p>
        </div>

        {categories.length > 0 && (
          <span className="text-blue-500 text-sm hover:underline cursor-pointer">
            View All
          </span>
        )}
      </div>

      {/* ============ Empty State ============ */}
      {categories.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-medium">No categories available</p>
          <p className="text-sm mt-2">
            Categories will appear here once added
          </p>
        </div>
      ) : (
        /* ============ Categories Grid ============ */
        <div
          className="
            grid grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-6
            gap-4
          "
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="border border-blue-500 rounded-lg bg-white
                         h-48 flex flex-col items-center justify-between
                         p-4 hover:shadow-lg transition"
            >
              {/* Image */}
              <div className="w-24 h-24 flex items-center justify-center">
                <img
                  src={category.categoryImage}
                  alt={category.category}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text */}
              <div className="text-center">
                <h4 className="font-medium text-sm truncate w-32 mx-auto">
                  {category.category}
                </h4>
                <p className="text-blue-500 text-xs mt-1">
                  {category.count}{" "}
                  {category.count === 1 ? "Item" : "Items"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularCategory;
