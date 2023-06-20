import React from 'react'
import { Link } from 'react-router-dom';
import { addCartItem } from '../redux/productSlice';
import { useDispatch } from 'react-redux';



const CardFeature = ({ id,name, category, price, image, loading }) => {

  const dispatch = useDispatch()
  const handleAddCartProduct = (e) => {
    // e.stopPropagation()
    dispatch(addCartItem({
      _id: id,
      name,
      price,
      category,
      image
    })); 
  }
  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg pt-5 px-4 cursor-pointer">
      {name ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex items-center justify-center">
              <img src={image} alt="prodImage" className="h-full" />
            </div>
            <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className=" text-slate-500 font-medium">{category}</p>

            <p className=" text-slate-500 font-bold">
              <span className="text-red-500">DZD </span>
              {price}
            </p>
          </Link>
          <button
            onClick={handleAddCartProduct}
            className="bg-yellow-500 hover:bg-yellow-600 w-full py-1 text-white my-2 rounded-full"
          >
            Add Card
          </button>
        </>
      ) : (
        <p className="h-40 flex items-center justify-center">{loading}</p>
      )}
    </div>
  );
};

export default CardFeature