import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";

const CategoryCard = ({ category }) => {
  const { user } = useContext(AuthContext);
  const { name, description, to, image } = category;
  return (
    <div>
      <Link to={user ? `${to}` : `/signin`} className='block'>
        <img alt='Art' src={image} className='h-96 w-80 object-cover' />

        <h3 className='mt-4 text-xl font-bold text-gray-900'>{name}</h3>

        <p className='mt-2 w-80 text-gray-700'>{description}</p>
      </Link>
    </div>
  );
};

export default CategoryCard;
