import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";

import Logo from '../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import { toast } from 'react-hot-toast';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleShowMenu = () => {
    setShowMenu(prev => !prev);
  }

  const handleLogout = () => {
    dispatch(logoutRedux())
    toast('User logout!')
  }

  console.log(process.env.REACT_APP_ADMIN_EMAIL);
  console.log(userData.email);

  const cartItemsNumber = useSelector(state => state.product.cartItems)

  return (
    <div>
      <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
        {/* Desktop **************************/}

        <div className="flex items-center h-full justify-between">
          <Link to={"/"}>
            <div className="h-10">
              <img src={Logo} alt="logo" className="h-full" />
            </div>
          </Link>

          <div className="flex items-center gap-4 md:gap-7">
            <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
              <Link to={""}>Home</Link>
              <Link to={"menu/6491b133626a0659c0d2c18f"}>Menu</Link>
              <Link to={"about"}>About</Link>
              <Link to={"contact"}>Contact</Link>
            </nav>
            <div className="text-2xl text-slate-600 relative cursor-pointer">
              <Link to={"cart"}>
                <BsCartFill />
                {cartItemsNumber.length > 0 &&  
                <div className="absolute -top-2 -right-1 text-white bg-red-500 h-5 w-5 rounded-full text-sm text-center">
                  {cartItemsNumber.length}
                </div>
                
                }
              </Link>
            </div>
            <div className="text-slate-600" onClick={handleShowMenu}>
              <div className="text-3xl cursor-pointer h-8 w-8 rounded-full overflow-hidden drop-shadow-md">
                {userData.imageProfile ? (
                  <img
                    src={userData.imageProfile}
                    alt="userImage"
                    className="h-full w-full"
                  />
                ) : (
                  <HiOutlineUserCircle />
                )}
              </div>
              {showMenu && (
                <div className="absolute right-2 bg-white py-3  shadow drop-shadow-md flex flex-col min-w-[100px] text-center">
                  {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                    <Link
                      to={"newproduct"}
                      className="whitespace-nowrap cursor-pointer px-2"
                    >
                      New Product
                    </Link>
                  )}

                  {userData.firstName ? (
                    <p
                      onClick={handleLogout}
                      className="whitespace-nowrap cursor-pointer px-2"
                    >
                      Logout
                    </p>
                  ) : (
                    <Link
                      to={"login"}
                      className="whitespace-nowrap cursor-pointer px-2"
                    >
                      Login
                    </Link>
                  )}
                  <nav className="text-base md:text-lg flex md:hidden flex-col px-2">
                    <Link className="py-1" to={""}>
                      Home
                    </Link>
                    <Link className="py-1" to={"menu/6491b133626a0659c0d2c18f"}>
                      Menu
                    </Link>
                    <Link className="py-1" to={"about"}>
                      About
                    </Link>
                    <Link className="py-1" to={"contact"}>
                      Contact
                    </Link>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile **************************/}
      </header>
    </div>
  );
}

export default Header