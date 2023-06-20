import React from 'react'
import { TbPlus, TbMinus } from 'react-icons/tb'
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { decreaseQty, deleteCartItem, desceaseQty, increaseQty } from '../redux/productSlice';
import { toast } from 'react-hot-toast';

const CartProductDisplay = ({
  id,
  name,
  category,
  image,
  price,
  qty,
  total,
}) => {

    const dispatch = useDispatch()

    const increase = () => {
        dispatch(increaseQty(id));   
    }
    const descrease = () => {
        dispatch(decreaseQty(id));   
    }

    const deleteProductCard = () => {
        dispatch(deleteCartItem(id));

        toast("One item deleted")
    }
  return (
    <div className="bg-slate-200 p-2 flex gap-3 rounded border-2 border-slate-300">
      <div className="bg-white p-3 rounded overflow-hidden">
        <img src={image} alt="imageCart" className="h-28 w-40 object-cover" />
      </div>

      <div className="flex flex-col gap-1 px-2 w-full">
        <div className="flex items-center gap-2 justify-between">
          <h3 className="font-semibold text-slate-600  capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div onClick={deleteProductCard}>
            <AiFillDelete className="text-xl text-red-400 hover:text-red-600 cursor-pointer" />
          </div>
        </div>
        <p className=" text-slate-500 font-medium ">{category}</p>

        <p className=" text-slate-700 font-bold text-base ">
          <span className="text-red-500 ">DZD </span>
          {price}
        </p>
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <button
              onClick={descrease}
              className="bg-slate-300 hover:bg-yellow-600 py-1 hover:text-white my-2 rounded min-w-[50px] flex items-center justify-center"
            >
              <TbMinus />
            </button>
            <p className="font-semibold px-1">{qty}</p>
            <button
              onClick={increase}
              className="bg-slate-300 hover:bg-yellow-600 py-1 hover:text-white my-2 rounded min-w-[50px] flex items-center justify-center"
            >
              <TbPlus />
            </button>
          </div>

          <div className="flex items-center gap-2 font-bold text-slate-600">
            <p>Total:</p>
            <p>
              <span className="text-red-500">DZD </span>
              {total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductDisplay