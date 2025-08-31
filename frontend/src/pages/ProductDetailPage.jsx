// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // 1. Import the useCart hook

function ProductDetailPage() {
  const { id: productId } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const { addToCart } = useCart(); // 2. Get the addToCart function

  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1); // 3. Add state for quantity
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // 4. Handler for the "Add to Cart" button
  const addToCartHandler = () => {
    addToCart(product, qty);
    navigate('/cart'); // Redirect to the cart page after adding
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <Link to="/products" className="inline-block bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 mb-6">
        &larr; Back to Products
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
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

          {/* 5. Quantity Selector - only shows if product is in stock */}
          {product.countInStock > 0 && (
            <div className="flex items-center mb-6">
              <span className="font-semibold mr-4">Quantity:</span>
              <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="bg-slate-700 text-white p-2 rounded-md"
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={addToCartHandler} // 6. Connect the button to the handler
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