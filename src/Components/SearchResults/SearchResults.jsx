import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Card from "../../Components/Card/Card";

const SearchResults = () => {
  const [params] = useSearchParams();
  const query = params.get("q");
  const axiosPublic = useAxiosPublic();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["search-products", query],
    enabled: !!query,
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/products/search?q=${query}`
      );
      return data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center py-20 text-gray-500">
        Searching products...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-6">
        Search Results for "{query}"
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-400 text-center">
          No products found
        </p>
      ) : (
        <div
          className="
            grid grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            gap-4
          "
        >
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
