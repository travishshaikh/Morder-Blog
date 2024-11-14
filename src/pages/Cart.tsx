import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { state, dispatch } = useApp();
  const subtotal = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  if (state.cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>Cart - ModernBlog Shop</title>
        </Helmet>

        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Continue Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Cart - ModernBlog Shop</title>
        <meta name="description" content="Review your shopping cart" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {state.cart.map((item) => (
                  <li key={item.id} className="p-6">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              dispatch({
                                type: 'UPDATE_QUANTITY',
                                payload: { id: item.id, quantity: item.quantity - 1 },
                              })
                            }
                            disabled={item.quantity <= 1}
                            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                          >
                            -
                          </button>
                          <span className="mx-2 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch({
                                type: 'UPDATE_QUANTITY',
                                payload: { id: item.id, quantity: item.quantity + 1 },
                              })
                            }
                            className="p-1 rounded hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'REMOVE_FROM_CART',
                              payload: item.id,
                            })
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  // Handle checkout logic
                }}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/shop"
                className="block text-center text-blue-600 hover:text-blue-800"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}