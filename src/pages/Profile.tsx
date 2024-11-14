import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { Settings, CreditCard, ShoppingBag, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { state } = useApp();

  if (!state.user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Profile - ModernBlog</title>
        <meta name="description" content="Manage your account settings" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-8">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                state.user.name
              )}&background=0D8ABC&color=fff`}
              alt={state.user.name}
              className="h-20 w-20 rounded-full"
            />
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {state.user.name}
              </h1>
              <p className="text-gray-600">{state.user.email}</p>
              {state.user.isPremium && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mt-2">
                  Premium Member
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-4">
                <Settings className="h-6 w-6 text-gray-400 mr-3" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Account Settings
                </h2>
              </div>
              <ul className="space-y-4">
                <li>
                  <button className="text-blue-600 hover:text-blue-800">
                    Edit Profile
                  </button>
                </li>
                <li>
                  <button className="text-blue-600 hover:text-blue-800">
                    Change Password
                  </button>
                </li>
                <li>
                  <button className="text-blue-600 hover:text-blue-800">
                    Notification Preferences
                  </button>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 text-gray-400 mr-3" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Subscription
                </h2>
              </div>
              {state.user.isPremium ? (
                <div>
                  <p className="text-gray-600 mb-4">
                    Your premium subscription is active
                  </p>
                  <button className="text-blue-600 hover:text-blue-800">
                    Manage Subscription
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-4">
                    Upgrade to premium for exclusive content
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Upgrade Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <ShoppingBag className="h-6 w-6 text-gray-400 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Orders
              </h2>
            </div>
            <div className="text-gray-600">
              {/* Replace with actual order history */}
              <p>No recent orders</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <BookOpen className="h-6 w-6 text-gray-400 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">
                Reading History
              </h2>
            </div>
            <div className="text-gray-600">
              {/* Replace with actual reading history */}
              <p>No recent articles read</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}