// src/pages/RegistrationPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function RegistrationPage() {
  // --- CHANGE 1: State variable is now 'username' ---
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);

    try {
      // --- CHANGE 3: Send 'username' in the request body ---
      const { data } = await axios.post('/api/users/register', { username, email, password });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        {error && <div className="bg-red-500 text-white p-3 rounded-md mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* --- CHANGE 2: The form input now uses 'username' --- */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="username">Username</label>
            <input
              type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required
              className="w-full px-3 py-2 bg-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">Email Address</label>
            <input
              type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-3 py-2 bg-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          {/* ... rest of the form is the same ... */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
            <input
              type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-3 py-2 bg-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
              className="w-full px-3 py-2 bg-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 disabled:bg-gray-500"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;