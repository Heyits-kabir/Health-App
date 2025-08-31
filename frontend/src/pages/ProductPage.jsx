// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Link is imported
import axios from 'axios';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          // 2. The entire card is wrapped in a Link
          <Link to={`/product/${product._id}`} key={product._id}>
            <div className="bg-slate-800 rounded-lg shadow-md p-4 flex flex-col justify-between h-full hover:ring-2 hover:ring-cyan-500 transition-all">
              <div>
                <h2 className="text-xl font-semibold text-white">{product.name}</h2>
                <p className="text-gray-400 mt-2 line-clamp-3">{product.description}</p>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold text-cyan-400">${product.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;