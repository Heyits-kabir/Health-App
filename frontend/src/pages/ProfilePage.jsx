// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { userInfo } = useAuth(); // Get user info from context, which includes the token

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      // We only fetch if userInfo and its token exist
      if (userInfo && userInfo.token) {
        try {
          // *** This is the important part for protected requests ***
          const config = {
            headers: {
              // Send the token in the Authorization header
              Authorization: `Bearer ${userInfo.token}`,
            },
          };

          const { data } = await axios.get('/api/users/profile', config);
          setUserProfile(data);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch profile');
        } finally {
          setLoading(false);
        }
      } else {
        setError('Not authorized. Please log in.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userInfo]); // Re-run effect if userInfo changes

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto bg-slate-800 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
      {userProfile && (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400">Name</label>
            <p className="text-white text-lg">{userProfile.name}</p>
          </div>
          <div>
            <label className="block text-gray-400">Email</label>
            <p className="text-white text-lg">{userProfile.email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;