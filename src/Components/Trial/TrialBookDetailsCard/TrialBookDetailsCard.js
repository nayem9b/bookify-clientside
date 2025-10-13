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
    image,
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
    productImage: image,
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
    <div>
      <div className='card lg:card-side bg-base-100 shadow-xl'>
        <figure>
          <img className='h-96 w-80' src={image} alt='Album' />
        </figure>
        <div className='card-body'>
          <h2 className='card-title text-2xl'>{name}</h2>
          <p className='text-lg font-bold'>
            {" "}
            <span>Resale Price:</span> {price}
          </p>
          <p>
            {" "}
            <span>Condition:</span> {condition}
          </p>

          <p className=''>
            Seller:{" "}
            <span>
              {userName}{" "}
              {!isVerified ? (
                <div className='text-gray-400'>unverified</div>
              ) : (
                <div className='text-blue-500'>Verified</div>
              )}{" "}
            </span>{" "}
          </p>
          <p>
            {" "}
            <span>Phone Number:</span> {mobileNumber}
          </p>
          <p>
            {" "}
            <span>Resale Price:</span> {price}
          </p>

          {/* <p>
            {" "}
            <span>Original Price:</span> {original_price}
          </p> */}
          {/* <p>
            {" "}
            <span>Years of use:</span> {years_of_use}
          </p> */}
          <p>
            {" "}
            <span>Location:</span> {place}
          </p>
          <p>
            {" "}
            <span>Description:</span> {description}
          </p>
          <p>
            {" "}
            <span>Posted Time:</span> {date}
          </p>
          <div className='card-actions lg:justify-end'>
            {isBuyer ? (
              <div className='grid grid-cols-2 gap-2 '>
                <button
                  className='group relative inline-block overflow-hidden border border-indigo-600 px-4 py-3 focus:outline-none focus:ring'
                  onClick={handleAddToWishlist}>
                  <span className='absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500'></span>

                  <span className='relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white'>
                    Wishlist
                  </span>
                </button>
                <label
                  htmlFor='booking-modal'
                  className='btn text-black border-none bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-300'
                  onClick={() => {
                    setItem(name);
                    setPrice(price);
                  }}>
                  Book now
                </label>
              </div>
            ) : (
              <>
                <h1 className='text-lg font-bold'>
                  You need to be a buyer to purchase this
                </h1>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialBookDetailsCard;
