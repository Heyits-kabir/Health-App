// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import our custom hook

function LoginPage() {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get the login function from our context
  const { login } = useAuth();
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError('');
    setLoading(true);

    try {
      // Make a POST request to your backend's login endpoint
      const { data } = await axios.post('/api/users/login', { email, password });
      
      // If successful, call the login function from the context
      login(data);

      // Redirect user to the homepage after successful login
      navigate('/');
    } catch (err) {
      // Set error message from backend response, or a generic one
      setError(err.response?.data?.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
        {error && <div className="bg-red-500 text-white p-3 rounded-md mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 disabled:bg-gray-500"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-400">
            New Customer?{' '}
            <Link to="/register" className="text-cyan-400 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;