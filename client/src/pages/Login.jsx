import React,{ useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import toast, { Toaster } from 'react-hot-toast';

import { postLogin } from '../redux/auth/actions';
import { BgImage } from '../components';

const initialState = {
  email: "",
  password: "",
}

const Login = () => {
  const dispatch = useDispatch()
  const { loading, loginErrors } = useSelector(state => state.auth)

  const [ userData, setUserData ] = useState(initialState)
  const { email, password } = userData

  useEffect(() => {
    if (loginErrors.length > 0) {
      loginErrors.map((error) => toast.error(error.msg))
    }
  },[loginErrors])

  const handleChangeInput = useCallback((e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  },[userData])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(postLogin(userData))
  }

  return (
    <div className="flex flex-wrap flex-row">
      <Helmet>
        <title>Login</title>
        <meta name="description" content="ユーザーログインフォーム" />
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
                  <h3 className="form-title">Login</h3>
                </div>
                <div className="group">
                  <input
                    className="group__control"
                    type="text" name="email" placeholder="メールアドレス" autoComplete="true"
                    value={email} onChange={handleChangeInput}
                  />
                </div>
                <div className="group">
                  <input
                    className="group__control"
                    type="password" name="password" placeholder="パスワード(半角英数６文字以上)" autoComplete="true"
                    value={password} onChange={handleChangeInput}
                  />
                </div>
                <div className="group">
                  <button
                    className="primary-btn"
                  >
                    {loading ? "..." : "ログイン"}
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

export default Login
