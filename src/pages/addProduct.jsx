import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import toast, {Toaster} from "react-hot-toast"

export const AddProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !category) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post(`${serverUrl}/api/products`, {
        name,
        price: Number(price),
        category,
        inStock,
      });

      setLoading(false);
      navigate("/");
    } catch (err) {
      toast.error("Failed to add product");
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false}/>
      <div className="bg-white shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl rounded-lg p-6 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">
          Add Product
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-purple-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-purple-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-purple-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="cursor-pointer"
            />
            In Stock
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white font-medium cursor-pointer py-2 rounded hover:bg-purple-700 transition"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
};