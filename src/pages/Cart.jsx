import React from 'react'
import { useSelector } from 'react-redux'
import CartProductDisplay from '../components/CartProductDisplay'
import imptyCard from "../assets/empty.gif"
const Cart = () => {
  const productCartItems = useSelector(state => state.product.cartItems)
  
  const totalPrice = productCartItems.reduce((acc, curr) => acc + parseInt(curr.total), 0)
  const totalQty = productCartItems.reduce((acc, curr) => acc + parseInt(curr.qty), 0)
  return (
    <>
      <div className="p-2 md:m-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>
        {productCartItems[0] ? (
          <div className="my-4 flex gap-3">
            <div className="w-full max-w-3xl">
              {productCartItems.map((el) => {
                return (
                  <CartProductDisplay
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    image={el.image}
                    price={el.price}
                    qty={el.qty}
                    total={el.total}
                  />
                );
              })}
            </div>

            {/* total cart item */}
            <div className="w-full max-w-lg  ml-auto">
              <h2 className="bg-red-400 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty:</p>
                <p className="ml-auto w-28 font-bold">
                  {" "}
                  <span className="text-red-500">DZD </span>
                  {totalQty}
                </p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price:</p>
                <p className="ml-auto w-28 font-bold">
                  {" "}
                  <span className="text-red-500">DZD </span>
                  {totalPrice}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <button className="bg-red-400 px-8  text-lg font-bold text-white rounded-full py-1">
                  Payment
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full flex-col">
            <img className="w-full max-w-md" src={imptyCard} alt="empty cart" />
            <p className="text-slate-400 text-3xl font-bold">Empty Cart</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart