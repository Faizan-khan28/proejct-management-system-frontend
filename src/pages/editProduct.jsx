import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import MoonLoader from "react-spinners/MoonLoader";

export const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${serverUrl}/api/products/${id}`);

      setName(data.product.name);
      setPrice(data.product.price);
      setCategory(data.product.category);
      setInStock(data.product.inStock);

      setLoading(false);
    } catch (err) {
      setError("Failed to load product");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !category) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.put(`${serverUrl}/api/products/${id}`, {
        name,
        price: Number(price),
        category,
        inStock,
      });

      setLoading(false);
      navigate("/");
    } catch (err) {
      setError("Failed to update product");
      setLoading(false);
    }
  };

  if (loading) {
    return (
     <div className="flex justify-center items-center min-h-screen">
      <MoonLoader color="#9333EA" size={60} />
     </div>
   );
  }

 
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">
          Edit Product
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={inStock}
              onChange={e => setInStock(e.target.checked)}
              className="cursor-pointer"
            />
            In Stock
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 cursor-pointer text-white py-2 rounded hover:bg-purple-700 transition"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};
