import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">

          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-extrabold text-purple-600 cursor-pointer"
          >
            Product Manager
          </h1>

          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <Link to="/" className="hover:text-purple-600 transition">
              Products
            </Link>
            <Link to="/add-product" className="hover:text-purple-600 transition">
              Add Product
            </Link>
          </div>

          <button
            className="md:hidden text-2xl text-purple-600"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-lg font-bold text-purple-600">
            Menu
          </h2>
          <button
            className="text-xl text-gray-600 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col p-6 gap-5 text-gray-700 font-medium">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-purple-600 transition"
          >
            Products
          </Link>

          <Link
            to="/add-product"
            onClick={() => setIsOpen(false)}
            className="hover:text-purple-600 transition"
          >
            Add Product
          </Link>
        </div>
      </div>
    </>
  );
};