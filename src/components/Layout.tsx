import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="bg-gray-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-xl">Shopping Cart</div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-6">
            <Link
              to="/"
              className="hover:text-gray-300 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="hover:text-gray-300 transition duration-300"
            >
              Shop
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="sm:hidden relative">
            <button
              className="text-white text-xl"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              ☰
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-8 w-36 bg-gray-900 text-white p-4 rounded-lg shadow-lg border border-gray-700 z-10">
                <Link
                  to="/"
                  className="block mb-2 hover:text-gray-400 transition duration-200"
                  onClick={closeMenu}
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  className="block hover:text-gray-400 transition duration-200"
                  onClick={closeMenu}
                >
                  Shop
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4 h-[calc(100vh-60px)] overflow-auto">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
