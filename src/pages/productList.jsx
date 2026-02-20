import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import toast, { Toaster } from "react-hot-toast";
import MoonLoader from "react-spinners/MoonLoader";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${serverUrl}/api/products/`);
      setProducts(data.product || data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products");
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${serverUrl}/api/products/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Toaster position="top-center" />

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-600">
            All Products
          </h2>

          <Link
            to="/add-product"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            + Add Product
          </Link>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <MoonLoader color="#9333EA" size={60} />
          </div>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-500">
            No products found
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <div className="hidden md:block bg-white shadow-md rounded-lg overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">In Stock</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{product.name}</td>
                      <td className="p-3">₹{product.price}</td>
                      <td className="p-3">{product.category}</td>
                      <td className="p-3">
                        {product.inStock ? "Yes" : "No"}
                      </td>
                      <td className="p-3 flex gap-2">
                        <Link
                          to={`/edit-product/${product._id}`}
                          className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden flex flex-col gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-md rounded-lg p-4 border border-purple-500"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-purple-600">
                      {product.name}
                    </h3>

                    <span
                      className={`text-sm px-2 py-1 rounded ${
                        product.inStock
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <p className="text-gray-600">
                    <strong>Price:</strong> ₹{product.price}
                  </p>

                  <p className="text-gray-600 mb-3">
                    <strong>Category:</strong> {product.category}
                  </p>

                  <div className="flex gap-3">
                    <Link
                      to={`/edit-product/${product._id}`}
                      className="flex-1 bg-purple-500 text-white text-center py-2 rounded hover:bg-purple-600 transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 bg-red-500 cursor-pointer text-white py-2 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};