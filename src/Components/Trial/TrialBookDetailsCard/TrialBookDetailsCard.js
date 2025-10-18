import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/UserContext";
import useAdmin from "../../Hooks/useAdmin";
import useBuyer from "../../Hooks/useBuyer";
import useSeller from "../../Hooks/useSeller";

const TrialBookDetailsCard = ({ book, setItem, setPrice, setPicture }) => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isBuyer] = useBuyer(user?.email);
  const [isSeller] = useSeller(user?.email);
  const {
    name,
    description,
    price,
    mobileNumber,
    originalPrice,
    date,
    image_url,
    condition,
    place,
    email,
    userName,
    isVerified,
    category,
  } = book;
  console.log(isVerified);
  const wishlist = {
    name: name,
    price: price,
    email: user?.email,
    userImage: user?.photoURL,
    productImage: image_url,
  };
  const handleAddToWishlist = () => {
    fetch("http://localhost:5000/wishlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(wishlist),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Product added to wishlist");
      });
  };
  return (
    <div className="flex flex-col h-full">
      <div
        className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-transform duration-200 hover:scale-[1.015] group"
        style={{ minHeight: '320px' }}
      >
        {/* Book Image */}
        <div className="md:w-1/3 flex items-center justify-center bg-gray-50 p-4">
          <img
            className="rounded-lg object-cover w-40 h-56 md:w-36 md:h-52 group-hover:scale-105 transition-transform duration-200 border border-gray-100"
            src={image_url}
            alt={name}
            loading="lazy"
          />
        </div>
        {/* Book Details */}
        <div className="flex-1 flex flex-col p-5 gap-2">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-semibold text-gray-900 flex-1 truncate">{name}</h2>
            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-600 border border-gray-200">
              {category}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 items-center text-sm">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-800 font-medium border border-gray-200">
              ${price} <span className="ml-1 text-xs text-gray-400">Resale</span>
            </span>
            {originalPrice && (
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-white text-gray-400 border border-gray-200 line-through">
                ${originalPrice} <span className="ml-1 text-xs text-gray-300">Original</span>
              </span>
            )}
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-white text-gray-500 border border-gray-200 font-medium">
              {condition}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500 font-medium">Seller:</span>
            <span className="text-sm font-semibold text-gray-800">{userName}</span>
            {isVerified ? (
              <span className="ml-1 px-2 py-0.5 rounded bg-gray-200 text-gray-700 text-xs font-medium border border-gray-200">Verified</span>
            ) : (
              <span className="ml-1 px-2 py-0.5 rounded bg-gray-100 text-gray-400 text-xs font-medium border border-gray-200">Unverified</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-1">
            <span>{mobileNumber}</span>
            <span>{place}</span>
            <span>{date}</span>
          </div>
          <p className="mt-2 text-gray-700 text-sm line-clamp-3">{description}</p>
          <div className="flex-1" />
          <div className="flex items-center gap-3 mt-4">
            {isBuyer ? (
              <>
                <button
                  className="inline-flex items-center px-4 py-2 rounded-md bg-gray-900 text-white font-medium shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                  onClick={handleAddToWishlist}
                  title="Add to wishlist"
                >
                  Wishlist
                </button>
                <label
                  htmlFor="booking-modal"
                  className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 text-gray-900 font-medium shadow-sm hover:bg-gray-200 border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                  onClick={() => {
                    setItem(name);
                    setPrice(price);
                    setPicture(image_url);
                  }}
                  title="Book now"
                >
                  Book now
                </label>
              </>
            ) : (
              <span className="text-sm font-medium text-gray-400">You need to be a buyer to purchase this</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialBookDetailsCard;
