// src/App.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-200">
      <Navbar />
      {/* Ensure this <main> tag does NOT have container or mx-auto */}
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default App;