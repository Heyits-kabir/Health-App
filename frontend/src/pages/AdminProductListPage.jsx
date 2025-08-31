// src/pages/AdminProductListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function AdminProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { userInfo } = useAuth();
  const navigate = useNavigate();

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handler for deleting a product
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.delete(`/api/products/${id}`, config);
        // Refetch products after deletion
        fetchProducts();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  // Handler for creating a new product
  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        // The second argument for post is the body, which can be an empty object
        const { data } = await axios.post('/api/products', {}, config);
        // Redirect to the edit page for the newly created product
        navigate(`/admin/product/${data._id}/edit`);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to create product');
      }
    }
  };


  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button onClick={createProductHandler} className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700">
          + Create Product
        </button>
      </div>

      <div className="bg-slate-800 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-700">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">NAME</th>
              <th className="p-4">PRICE</th>
              <th className="p-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t border-slate-700">
                <td className="p-4">{product._id}</td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4 flex space-x-2">
                  <Link to={`/admin/product/${product._id}/edit`} className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-500">
                    Edit
                  </Link>
                  <button onClick={() => deleteHandler(product._id)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProductListPage;