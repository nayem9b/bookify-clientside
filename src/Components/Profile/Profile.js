import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaHeart, FaCog, FaSignOutAlt, FaHome, FaBook } from 'react-icons/fa';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Please log in to view your profile</h2>
          <Link
            to="/signin"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 px-6 py-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center text-blue-600 text-4xl font-bold mb-4 md:mb-0 md:mr-6">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name || 'User'}</h1>
                <p className="text-blue-100">{user.email}</p>
                <p className="text-blue-100 mt-1">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-6 p-6">
            <div className="md:col-span-1">
              <div className="space-y-1">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <FaUser className="mr-3 text-blue-600" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/my-orders"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <FaShoppingBag className="mr-3 text-blue-600" />
                  <span>My Orders</span>
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <FaHeart className="mr-3 text-blue-600" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  to="/my-books"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <FaBook className="mr-3 text-blue-600" />
                  <span>My Books</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <FaCog className="mr-3 text-blue-600" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <FaSignOutAlt className="mr-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Profile Content */}
            <div className="md:col-span-3 mt-6 md:mt-0">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="w-full sm:w-1/3 text-gray-600">Full Name</div>
                    <div className="w-full sm:w-2/3 font-medium">{user.name || 'Not provided'}</div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="w-full sm:w-1/3 text-gray-600">Email Address</div>
                    <div className="w-full sm:w-2/3 font-medium">{user.email}</div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="w-full sm:w-1/3 text-gray-600">Account Type</div>
                    <div className="w-full sm:w-2/3 font-medium capitalize">
                      {user.role || 'buyer'}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="w-full sm:w-1/3 text-gray-600">Member Since</div>
                    <div className="w-full sm:w-2/3 font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/profile/edit"
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      Edit Profile
                    </Link>
                    <Link
                      to="/change-password"
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
