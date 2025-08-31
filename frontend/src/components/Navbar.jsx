// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth

function Navbar() {
  // 2. Get user info and logout function from the context
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout(); // Clear user from context and local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="w-full bg-slate-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold text-white hover:text-cyan-400">
          [Your Project Name]
        </Link>
        <div className="space-x-6 flex items-center">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/products" className="text-gray-300 hover:text-white">Products</Link>

          {/* 3. Conditionally render links */}
          {userInfo ? (
            // If user is logged in, show their name (as a link to their profile) and a logout button
            <>
              <Link to="/profile" className="text-gray-300 hover:text-white">
              {userInfo.username}
              </Link>

              <button
                onClick={logoutHandler}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            // If user is not logged in, show the Sign In link
            <Link to="/login" className="text-gray-300 hover:text-white">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;