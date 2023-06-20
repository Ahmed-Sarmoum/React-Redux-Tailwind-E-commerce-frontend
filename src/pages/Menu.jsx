import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import AllProducts from '../components/AllProducts';
import { addCartItem } from '../redux/productSlice';

const Menu = () => {
  const { filterBy } = useParams();
  const productData = useSelector((state) => state.product.productList);
  const productDisplay = productData[0] && productData.find(
    (el) => el._id === filterBy
  );

  const dispatch = useDispatch();
  const handleAddCartProduct = (e) => {
    // e.stopPropagation()
    dispatch(addCartItem(productDisplay));
  };

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl bg-white m-auto md:flex">
        <div className="max-w-[320px] overflow-hidden w-full p-5">
          <img
            src={productDisplay.image}
            alt="desplayProduct"
            className="hover:scale-105 transition-all h-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600  capitalize text-2xl text-2xl md:text-4xl">
            {productDisplay.name}
          </h3>
          <p className=" text-slate-500 font-medium text-2xl">
            {productDisplay.category}
          </p>

          <p className=" text-slate-700 font-bold  md:text-2xl">
            <span className="text-red-500 ">DZD </span>
            {productDisplay.price}
          </p>

          <div className="flex gap-3">
            <button className="bg-yellow-500 hover:bg-yellow-600 py-1 text-white my-2 rounded min-w-[100px]">
              Buy
            </button>
            <button
              onClick={handleAddCartProduct}
              className="bg-yellow-500 hover:bg-yellow-600 py-1 text-white my-2 rounded min-w-[100px]"
            >
              Add Card
            </button>
          </div>
          <div>
            <p className="text-slate-600 font-medium">Description:</p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>

      <AllProducts heading={"Related Products"} />
    </div>
  );
  
}

export default Menu