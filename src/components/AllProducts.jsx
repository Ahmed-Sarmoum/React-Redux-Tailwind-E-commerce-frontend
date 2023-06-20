import React, { useEffect, useRef, useState } from "react";
import FilterProduct from "./FilterProduct";
import CardFeature from "./CardFeature";
import { useSelector } from "react-redux";

const AllProducts = ({heading}) => {
  const products = useSelector((state) => state.product.productList);
  const loadingArrayCardFeature = Array(10).fill(null);
  const slideAllProductRef = useRef();

  const categoryList = ["All", ...new Set(products.map((el) => el.category))];
  // Filter data display
  const [filterItem, setFilterItem] = useState("");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    setFilterData(products);
  }, [products]);

  const handleFilterProduct = (category) => {
    setFilterItem(category);
    if (category === "All") {
      setFilterData(() => {
        return products;
      });
    } else {
      const filter = products.filter(
        (el) => el.category.toLowerCase() === category.toLowerCase()
      );
      setFilterData(() => {
        return filter;
      });
    }
  }; 
  return (
    <div>
      <div className="my-5">
        <div className="flex items-center py-4 mt-4">
          <h2 className="font-bold text-2xl text-slate-800">{heading}</h2>
        </div>

        <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
          {categoryList[0] &&
            categoryList.map((el, i) => {
              return (
                <FilterProduct
                  key={i}
                  category={el}
                  isActivate={el === filterItem}
                  onClick={() => handleFilterProduct(el)}
                />
              );
            })}
        </div>

        <div
          className="flex flex-wrap justify-center gap-4 my-4"
          ref={slideAllProductRef}
        >
          {filterData[0]
            ? filterData.map((el) => {
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
    </div>
  );
};

export default AllProducts;
