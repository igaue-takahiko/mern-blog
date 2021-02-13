import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { authTypes } from '../redux/auth/types';

const Sidebar = () => {
  const dispatch = useDispatch()

  const logout = () => {
    localStorage.removeItem('myToken')
    dispatch({ type: authTypes.LOGOUT })
  }
  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      <div className="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
      <div className="flex items-center justify-center h-20 shadow-md">
        <h1 className="text-3xl uppercase text-indigo-500">
          Setting
        </h1>
      </div>
        <ul className="flex flex-col py-4">
          <li>
            <Link
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-indigo-300"
              to="/"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-3xl text-gray-400">
              <i className='bx bx-rename' ></i>
              </span>
              <span className="text-xl font-medium">
                名前変更
              </span>
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-indigo-300"
              to="/"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-3xl text-gray-400">
              <i className='bx bx-lock-open-alt'></i>
              </span>
              <span className="text-xl font-medium">
                パスワード変更
              </span>
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-indigo-300"
              to="/login" onClick={logout}
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-3xl text-gray-400">
                <i className="bx bx-log-out"></i>
              </span>
              <span className="text-xl font-medium">
                ログアウト
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
