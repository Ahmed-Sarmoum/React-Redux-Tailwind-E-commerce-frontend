import React, {  useRef } from "react";
import { useSelector } from "react-redux";
import HomeCard from "../components/HomeCard";
import CardFeature from "../components/CardFeature";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProducts from "../components/AllProducts";

const Home = () => {
  const products = useSelector((state) => state.product.productList);
  const homeProductCartList = products.slice(0, 4);
  const listVegetable = products.filter((e) => e.category === "vegetable");

  const loadingArray = Array(4).fill(null);
  const loadingArrayCardFeature = Array(10).fill(null);

  const slideProductRef = useRef();

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const previousProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2 py-4">
          <div className="flex gap-3 bg-red-400 w-40 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-100">Bike Delivery</p>
            <img
              alt="bike"
              src="https://www.iconpacks.net/icons/2/free-bicycle-icon-1769-thumb.png"
              className="h-9"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold  py-3">
            The Fast Delevery in <span className="text-red-700">Your Home</span>
          </h2>
          <p className="py-3 text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident.
          </p>
          <button className="font-bold bg-red-400 text-slate-200 px-4 py-2 mt-3 rounded-md">
            Order Now
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, i) => {
                return <HomeCard key={i} loading={"loading..."} />;
              })}
        </div>
      </div>

      <div className="">
        <div className="flex items-center">
          <h2 className="font-bold text-2xl text-slate-800">Fresh Vegetable</h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={previousProduct}
              className="bg-slate-300 hover:bg-yellow-400 text-lg p-1 rounded-full "
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-yellow-400 text-lg p-1 rounded-full "
            >
              <GrNext />
            </button>
          </div>
        </div>

        <div
          className="flex mt-4 gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {listVegetable[0]
            ? listVegetable.map((el) => {
                return (
                  <CardFeature
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayCardFeature.map((el, i) => {
                return <CardFeature key={i} loading={"loading..."} />;
              })}
        </div>
      </div>

      <AllProducts heading={"Your Products"} />
    </div>
  );
};

export default Home;
