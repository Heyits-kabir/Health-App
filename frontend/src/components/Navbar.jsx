// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    // The <nav> element itself gets the full width and background color
    <nav className="w-full bg-slate-800 shadow-md">
      {/* This container centers the content within the navbar */}
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold text-white hover:text-cyan-400">
          [Your Project Name]
        </Link>
        <div className="space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/products" className="text-gray-300 hover:text-white">Products</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;