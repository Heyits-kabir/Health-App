// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductDetailPage() {
  // 'useParams' is a hook from React Router that gives us the ':id' from the URL
  const { id: productId } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch the specific product using the ID from the URL
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]); // Re-run the effect if the productId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <Link to="/products" className="inline-block bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 mb-6">
        &larr; Back to Products
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {/* Product image would go here */}
          <div className="bg-slate-800 w-full h-96 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Image Placeholder</span>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-400 mb-6">{product.description}</p>
          <div className="text-3xl font-bold text-cyan-400 mb-6">${product.price}</div>
          <div className="flex items-center mb-6">
            <span className="font-semibold mr-4">Status:</span>
            <span className={product.countInStock > 0 ? 'text-green-500' : 'text-red-500'}>
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <button
            disabled={product.countInStock === 0}
            className="w-full bg-cyan-600 text-white px-6 py-3 rounded-md hover:bg-cyan-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;