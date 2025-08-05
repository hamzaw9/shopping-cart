import { useEffect, useState } from "react";

interface product {
  id: number;
  image: string;
  title: string;
}
interface CartItem {
  id: number;
  quantity: number;
}

const Shop = () => {
  const [products, setProducts] = useState<product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<{ [productId: number]: number }>({});

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

  const handleAddToCart = (product: CartItem) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, product]);
    }
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

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
        <span className="text-lg font-medium">
          Items in Cart: {totalQuantity}
        </span>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
          Checkout
        </button>
      </div>

      {/* Products */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-72 sm:w-full sm:max-w-[400px] border rounded-lg p-4 shadow-sm flex flex-col items-center justify-between bg-white hover:shadow-md hover:border-blue-500 transition duration-200"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-24 h-32 object-contain mb-4"
            />

            <div className="flex flex-col items-center">
              <h2 className="text-center font-semibold text-sm mb-2">
                {product.title}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <button
                  className="px-2.5 py-1 bg-gray-300 rounded cursor-pointer"
                  onClick={() => {
                    setQuantities((prev) => {
                      const current = prev[product.id] || 1;
                      return {
                        ...prev,
                        [product.id]: Math.max(1, current - 1),
                      };
                    });
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-12 text-center border rounded appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min={1}
                  value={quantities[product.id] || 1} // fallback to 1 if undefined
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) {
                      setQuantities((prev) => ({
                        ...prev,
                        [product.id]: val,
                      }));
                    }
                  }}
                  onBlur={(e) => {
                    const val = parseInt(e.target.value);
                    if (!val || val < 1) {
                      setQuantities((prev) => ({
                        ...prev,
                        [product.id]: 1,
                      }));
                    }
                  }}
                />

                <button
                  className="px-2.5 py-1 bg-gray-300 rounded cursor-pointer"
                  onClick={() => {
                    setQuantities((prev) => {
                      const current = prev[product.id] || 1;
                      return {
                        ...prev,
                        [product.id]: current + 1,
                      };
                    });
                  }}
                >
                  +
                </button>
              </div>

              <button
                onClick={() =>
                  handleAddToCart({
                    id: product.id,
                    quantity: quantities[product.id] || 1,
                  })
                }
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm cursor-pointer"
              >
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
