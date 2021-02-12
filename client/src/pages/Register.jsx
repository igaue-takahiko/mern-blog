import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import toast, { Toaster } from 'react-hot-toast';

import { postRegister } from '../redux/auth/actions';
import { BgImage } from '../components';

const initialState = {
  name: "",
  email: "",
  password: "",
}

const Register = () => {
  const dispatch = useDispatch()
  const { user, loading, registerErrors } = useSelector(state => state.auth)

  const [ userData, setUserData ] = useState(initialState)
  const { name, email, password } = userData

  useEffect(() => {
    if (registerErrors.length > 0) {
      registerErrors.map((error) => toast.error(error.msg))
    }
  },[registerErrors, user])

  const handleChangeInput = useCallback((e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  },[userData])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(postRegister(userData))
    setUserData(initialState)
  }

  return (
    <div className="flex flex-wrap flex-row">
      <Helmet>
        <title>Register</title>
        <meta name="description" content="ユーザー登録フォーム" />
      </Helmet>
      <div className="row mt-32">
        <div className="w-0 h-0 lg:w-7/12 xl:w-8/12">
          <BgImage />
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              style: { fontSize: 14 }
            }}
          />
        </div>
        <div className="w-full lg:w-5/12 xl:w-4/12">
          <div className="auth__page">
            <div className="auth__page__section">
              <form onSubmit={handleSubmit}>
                <div className="group">
                  <h3 className="form-title">Register</h3>
                </div>
                <div className="group">
                  <input
                    className="group__control"
                    type="text" name="name" placeholder="お名前"
                    value={name} onChange={handleChangeInput}
                  />
                </div>
                <div className="group">
                  <input
                    className="group__control"
                    type="text" name="email" placeholder="メールアドレス" autoComplete="false"
                    value={email} onChange={handleChangeInput}
                  />
                </div>
                <div className="group">
                  <input
                    className="group__control"
                    type="password" name="password" placeholder="パスワード(半角英数６文字以上)" autoComplete="false"
                    value={password} onChange={handleChangeInput}
                  />
                </div>
                <div className="group">
                  <button
                    className="primary-btn"
                  >
                    {loading ? "ログイン" : "新規登録"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
