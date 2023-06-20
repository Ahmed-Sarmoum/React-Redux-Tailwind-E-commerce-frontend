import { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react';
import { setDataProduct } from "./redux/productSlice";
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  // const products = useSelector((state) => state.product)

  
  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/products`);
      const resData = await res.json()
      console.log("resData  >>", resData);
      dispatch(setDataProduct(resData)); 

    })()
  }) 
  
  return (
    <>
      <Toaster />
      <div className="">
        <Header />
        <main 
           className="pt-16 md:px-6 bg-slate-100 min-h-[calc(100vh)]"
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
