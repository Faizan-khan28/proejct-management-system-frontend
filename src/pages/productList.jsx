import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import toast, {  Toaster } from "react-hot-toast";
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
      <Toaster position="top-center" reverseOrder={false}/>
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-600">
            All Products
          </h2>

          <Link
            to="/add-product"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            + Add Product
          </Link>
        </div>

        {loading && (
         <div className="flex justify-center items-center h-64">
           <MoonLoader color="#9333EA" size={60} />
         </div>
       )}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
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
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-4 text-center">
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id} className="border-t">
                      <td className="p-3">{product.name}</td>
                      <td className="p-3">₹{product.price}</td>
                      <td className="p-3">{product.category}</td>
                      <td className="p-3">
                        {product.inStock ? "Yes" : "No"}
                      </td>
                      <td className="p-3 flex gap-2">
                        <Link
                          to={`/edit-product/${product._id}`}
                          className="bg-purple-500  text-white cursor-pointer px-3 py-1 rounded hover:bg-purple-600"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-500 text-white cursor-pointer px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
