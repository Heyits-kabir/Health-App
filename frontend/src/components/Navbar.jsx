// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="w-full bg-slate-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* === CHANGE IS HERE === */}
        <Link to="/" className="text-xl font-bold text-white hover:text-cyan-400">
          MediSource
        </Link>
        {/* ===================== */}
        <div className="space-x-6 flex items-center">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/products" className="text-gray-300 hover:text-white">Products</Link>

          {userInfo ? (
            <>
              {userInfo.role === 'admin' && (
                <Link to="/admin/productlist" className="text-gray-300 hover:text-white font-bold">
                  Admin
                </Link>
              )}
              
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
            <Link to="/login" className="text-gray-300 hover:text-white">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;