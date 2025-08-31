import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// 1. Import the AuthProvider
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext.jsx';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx'; // 1. Import ProfilePage
import PrivateRoute from './components/PrivateRoute.jsx'; // 2. Import PrivateRoute
import RegistrationPage from './pages/RegistrationPage.jsx';
import CartPage from './pages/CartPage.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import AdminProductListPage from './pages/AdminProductListPage.jsx';
import AdminProductEditPage from './pages/AdminProductEditPage.jsx';

// Define the application routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // The root layout component
    children: [
      {
        index: true, // This makes HomePage the default child route for '/'
        element: <HomePage />,
      },
      {
        path: 'products',
        element: <ProductPage />,
      },
      {
        path: 'product/:id',
        element: <ProductDetailPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegistrationPage />
      },
      {
        path: "cart",
        element: <CartPage />
      },
      {
        path: '',
        element: <PrivateRoute />,
        children: [
          {
            path: '/profile', element: <ProfilePage />
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminRoute />,
        children: [
          { 
            path: 'productlist',
            element: <AdminProductListPage />
          },
          {
            path: 'product/:id/edit',
            element: <AdminProductEditPage/>
          }
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Wrap the RouterProvider with the AuthProvider */}
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);