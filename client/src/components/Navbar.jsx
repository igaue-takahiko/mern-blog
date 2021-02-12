import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from '../images/logo.png';
import { authTypes } from '../redux/auth/types';

const Navbar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const logout = () => {
    localStorage.removeItem('myToken')
    dispatch({ type: authTypes.LOGOUT })
  }

  const Links = user ? (
    <div className="flex">
      <li className="list-none">
        <Link to="/create" className="text-2xl block no-underline px-6 outline-none hover:text-blue-300">
          Create Post
        </Link>
      </li>
      <li className="list-none">
        <Link to="/dashboard" className="text-2xl block no-underline px-6 outline-none hover:text-blue-300">
          Profile
        </Link>
      </li>
      <li className="list-none">
        <Link onClick={logout} to="/login" className="text-2xl block no-underline px-6 outline-none hover:text-blue-300">
          Logout
        </Link>
      </li>
    </div>
  ) : (
    <div className="flex">
      <li className="list-none">
        <Link to="/login" className="text-2xl block no-underline px-6 outline-none hover:text-blue-300">
          Login
        </Link>
      </li>
      <li className="list-none">
        <Link to="/register" className="text-2xl block no-underline px-6 outline-none hover:text-blue-300">
          Register
        </Link>
      </li>
    </div>
  )

  return (
    <div className="fixed w-full top-0 right-0 shadow-md h-32 z-10">
      <div className="container my-0 mx-auto">
        <div className="flex justify-between items-center h-32">
          <div className="w-24">
            <Link to="/">
              <img src={Logo} alt="logo"/>
            </Link>
          </div>
          {Links}
        </div>
      </div>
    </div>
  )
}

export default Navbar
