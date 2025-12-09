import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/UserContext";
import Loading from "../Loading/Loading";

const WishlistPage = () => {
  const { user, loading } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      // Simulate fetching wishlist items
      setTimeout(() => {
        setWishlistItems([
          { id: 1, name: "Book 1", price: 10 },
          { id: 2, name: "Book 2", price: 15 },
        ]);
        setIsLoading(false);
      }, 1000);
    }
  }, [user]);

  if (loading || isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return (
    <div className="wishlist-page p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="wishlist-items space-y-4">
          {wishlistItems.map((item) => (
            <li
              key={item.id}
              className="p-4 border rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">Price: ${item.price}</p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Pay Now
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
