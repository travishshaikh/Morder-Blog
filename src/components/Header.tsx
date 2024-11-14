import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { state, dispatch } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              ModernBlog
            </Link>
          </div>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles and products..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={state.searchQuery}
                onChange={(e) =>
                  dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })
                }
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <nav className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Link
                to="/shop"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Shop
              </Link>
              {state.user?.isAdmin && (
                <Link
                  to="/shop/new"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <PlusCircle className="h-5 w-5" />
                </Link>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Link
                to="/blog"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Blog
              </Link>
              {state.user?.isAdmin && (
                <Link
                  to="/blog/new"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <PlusCircle className="h-5 w-5" />
                </Link>
              )}
            </div>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-gray-900" />
              {state.cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {state.cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
            <Link to={state.user ? '/profile' : '/login'}>
              <User className="h-6 w-6 text-gray-700 hover:text-gray-900" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}