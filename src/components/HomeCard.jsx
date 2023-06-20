import React from 'react'
import { Link } from 'react-router-dom';

const HomeCard = ({ name, image, price, category, loading, id }) => {
  return (
    <div className="bg-white p-2 rounded shadow-md flex items-center justify-center flex-col w-40 min-h-[160px] min-w-[190px]">
      {name ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="w-40 min-h-[160px]">
              <img src={image} alt="prodImage" className="h-full w-full" />
            </div>
            <h3 className="font-semibold text-slate-600 text-center capitalize text-lg">
              {name}
            </h3>
            <p className="text-center text-slate-500 font-medium">{category}</p>

            <p className="text-center text-slate-500 font-bold">
              <span className="text-red-500">DZD </span>
              {price}
            </p>
          </Link>
        </>
      ) : (
        <p>{loading}</p>
      )}
    </div>
  );
};

export default HomeCard