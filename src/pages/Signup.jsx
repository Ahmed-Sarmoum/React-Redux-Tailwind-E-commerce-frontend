import React, { useState } from 'react'
import { BiShow, BiHide } from 'react-icons/bi'
import SignupImg from '../assets/login-animation.gif'
import { Link, useNavigate } from 'react-router-dom'
import { ImageToBase64 } from '../utility/ImageToBase64'
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    imageProfile: ""
  })

  console.log(data)

  const handleShowPassword = () => {
    setShowPassword(prev => !prev)
  }
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleUploadProfileImage = async (e) => {
    const data = await ImageToBase64(e.target.files[0]);

    setData((prev) => {
      return {
        ...prev,
        imageProfile: data,
      };
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { firstName, email, password, confirmPassword } = data
    if (firstName && email && password && confirmPassword)  {
      if  (password === confirmPassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const dataFetched = await fetchData.json()
        console.log(dataFetched.message);
        toast(dataFetched.message)
        if (dataFetched.alert) {
          navigate("/login")
        }
      } else {
        toast("password and confirm password not equal");
      }
    } else {
      toast("Please enter required fields!!");
    }
  }
  return (
    <div className="p-3 md:p-4">
 
      <div className="w-full max-w-sm bg-white m-auto  flex-col p-4">
        {/* <h1 className='text-center text-2xl font-bold'>Sign Up</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md m-auto relative">
          <img
            src={data.imageProfile ? data.imageProfile : SignupImg}
            alt="signup"
            className="w-full"
          />
          <label htmlFor="profileImage" className="cursor-pointer">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 w-full text-center bg-opacity-75">
              <p className="text-sm text-white p-1">Upload</p>
            </div>
            <input
              accept="image/*"
              type={"file"}
              id="profileImage"
              className="hidden"
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500"
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1  mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500"
            value={data.lastName}
            onChange={handleOnChange}
          />

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

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex  px-2 bg-slate-200 py-1 mt-1  mb-2 rounded focus-within:outline focus-within:outline-blue-500">
            <input
              type={!showConfirmPassword ? "password" : "text"}
              id="confirmPassword"
              name="confirmPassword"
              className=" w-full bg-slate-200 border-none outline-none "
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className="flex text-2xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
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
          Already have account ?{" "}
          <Link to={"/login"} className="text-red-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup