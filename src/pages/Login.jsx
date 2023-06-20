import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import SignupImg from "../assets/login-animation.gif";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { loginRedux } from "../redux/userSlice";


const Login = () => {
  const navigate = useNavigate()

  const useData = useSelector(state => state)
  console.log('useData', useData)

  const dispatch = useDispatch()


  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "", 
  });

  console.log(data);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  }; 

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) { 
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const fetchedData = await fetchData.json();
      
      if (fetchedData.alert) {
        dispatch(loginRedux(fetchedData));
        navigate('/')
      } else {
        navigate('/signup')
      }
      toast(useData.user.firstName + " " + fetchedData.message);
    } else {
      toast("Please enter required fields!!");
    }
  };
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto  flex-col p-4">
        {/* <h1 className='text-center text-2xl font-bold'>Sign Up</h1> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md m-auto">
          <img src={SignupImg} alt="signup" className="w-full" />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
     
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1  mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex  px-2 bg-slate-200 py-1 mt-1  mb-2 rounded focus-within:outline focus-within:outline-blue-500">
            <input
              type={!showPassword ? "password" : "text"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 border-none outline-none "
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-2xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

       
          <button
            type="submit"
            className="text-white text-xl max-w-[120px] w-full bg-red-500 hover:bg-red-600 cursor-pointer m-auto font-medium py-1 rounded-full mt-5"
          >
            Sign up
          </button>
        </form>
        <p className="text-sm mt-2">
          Don't have account ?{" "}
          <Link to={"/signup"} className="text-red-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
