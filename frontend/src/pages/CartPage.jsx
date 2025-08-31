// src/pages/CartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // Handler to update quantity from the select dropdown
  // We can reuse the addToCart function as it handles updating existing items
  const handleQuantityChange = (product, newQty) => {
    // To 'set' a quantity instead of adding, we first find the existing item
    const exist = cartItems.find((item) => item._id === product._id);
    if (exist) {
      // We calculate the difference needed to reach the new quantity
      const qtyDifference = newQty - exist.qty;
      addToCart(product, qtyDifference);
    }
  };


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center bg-slate-800 p-8 rounded-lg">
          <p className="text-xl">Your cart is empty.</p>
          <Link to="/products" className="inline-block mt-4 bg-cyan-600 text-white px-6 py-2 rounded-md hover:bg-cyan-700">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center bg-slate-800 p-4 rounded-lg shadow-md">
                {/* Image Placeholder */}
                <div className="w-20 h-20 bg-slate-700 rounded-md mr-4"></div>
                <div className="flex-grow">
                  <Link to={`/products/${item._id}`} className="text-lg font-semibold hover:underline">{item.name}</Link>
                  <div className="text-cyan-400 font-bold">${item.price}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={item.qty}
                    onChange={(e) => handleQuantityChange(item, Number(e.target.value))}
                    className="bg-slate-700 text-white p-2 rounded-md"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-400">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal ({totalItems} items)</span>
              <span>${subtotal}</span>
            </div>
            <div className="border-t border-gray-700 my-4"></div>
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>${subtotal}</span>
            </div>
            <button className="w-full mt-6 bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;