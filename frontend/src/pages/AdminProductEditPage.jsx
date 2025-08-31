// src/pages/AdminProductEditPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function AdminProductEditPage() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  // State for form fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        // Pre-fill the form with existing product data
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
        setImageUrl(data.imageUrl);
        setStock(data.stock);
        setCategory(data.category);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setUpdateSuccess(false);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`/api/products/${productId}`, {
        name, price, description, imageUrl, stock, category
      }, config);
      
      setUpdateSuccess(true);
      setLoading(false);
      // Optionally navigate away after a few seconds
      setTimeout(() => navigate('/admin/productlist'), 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Link to="/admin/productlist" className="inline-block bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 mb-6">
        &larr; Back to Product List
      </Link>
      <div className="max-w-lg mx-auto bg-slate-800 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
        {error && <div className="bg-red-500 text-white p-3 rounded-md mb-4">{error}</div>}
        {updateSuccess && <div className="bg-green-500 text-white p-3 rounded-md mb-4">Product updated successfully!</div>}
        
        <form onSubmit={submitHandler}>
          {/* Add form fields for each product property */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 bg-slate-700 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Price</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 bg-slate-700 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 bg-slate-700 rounded-md"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Image URL</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-3 py-2 bg-slate-700 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Stock</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full px-3 py-2 bg-slate-700 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 bg-slate-700 rounded-md" />
          </div>

          <button type="submit" className="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminProductEditPage;