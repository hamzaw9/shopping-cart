import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-xl">Shopping Cart</div>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-300 transition duration-300">
              Home
            </Link>
            <Link to="/shop" className="hover:text-gray-300 transition duration-300">
              Shop
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
