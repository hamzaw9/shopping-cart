import { useEffect, useState } from "react";

interface product {
  id: number;
  image: string;
  title: string;
}

const Shop = () => {
  const [products, setProducts] = useState<product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-lg text-gray-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center text-red-600 text-lg p-6">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">The Shop</h1>

      {/* Cart Info Section (Static) */}
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm mb-6">
        <span className="text-lg font-medium">Items in Cart: 0</span>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Checkout
        </button>
      </div>

      {/* Products */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-72 sm:w-full sm:max-w-[550px] border rounded-lg p-4 shadow-sm flex flex-col items-center justify-between bg-white hover:shadow-md hover:border-blue-500 transition duration-200"
          >
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="w-24 h-32 object-contain mb-4"
              />
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-center font-semibold text-sm mb-2">
                {product.title}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <button className="px-2.5 py-1 bg-gray-300 rounded">-</button>
                <input
                  type="number"
                  className="w-12 text-center border rounded appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  defaultValue={1}
                  min={1}
                />

                <button className="px-2.5 py-1 bg-gray-300 rounded">+</button>
              </div>

              <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
