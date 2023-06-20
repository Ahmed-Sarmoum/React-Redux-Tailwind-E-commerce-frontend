import React from 'react'
import { CiForkAndKnife } from 'react-icons/ci';

const FilterProduct = ({ category, onClick, isActivate }) => {
  return (
    <div onClick={onClick}>
      <div
        className={`text-3xl p-5 bg-yellow-500 rounded-full cursor-pointer ${
          isActivate && `bg-red-600`
        }`}
      >
        <CiForkAndKnife className={`${isActivate && `text-white`}`} />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct