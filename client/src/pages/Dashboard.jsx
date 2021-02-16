import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast, { Toaster } from 'react-hot-toast';
import { BsPencil, BsArchive } from 'react-icons/bs';

import { Sidebar, Loader, Pagination } from '../components';
import { fetchPosts } from '../redux/post/actions';
import { postTypes } from '../redux/post/types';

const Dashboard = () => {
  const dispatch = useDispatch()

  const { user: { _id } } = useSelector(state => state.auth)
  const {
    posts,
    count,
    perPage,
    redirect,
    message,
    loading,
  } = useSelector(state => state.post)

  let { page } = useParams()

  if (page === undefined) {
    page = 1
  }
  useEffect(() => {
    if (redirect) {
      dispatch({ type: postTypes.REDIRECT_FALSE })
    }
    if (message) {
      toast.success(message)
      dispatch({ type: postTypes.REMOVE_MESSAGE })
    }
    dispatch(fetchPosts(_id, page))
  }, [_id, dispatch, message, page, redirect])

  return (
    <div className="flex flex-wrap flex-row">
      <Helmet>
        <title>Dashboard</title>
        <meta name='description' content='ユーザーのプロフィールページ' />
      </Helmet>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: { fontSize: 14 }
        }}
      />
      <div className="container mt-36 mx-auto">
        <div className="row">
          <div className="p-6 w-full max-w-md md:w-3/12">
            <Sidebar />
          </div>
          <div className="p-6 w-full md:w-9/12">
            {!loading ? (
              posts.length > 0 ? (
                posts.map((post) => (
                  <div className="dashboard__posts" key={post._id}>
                    <div className="dashboard__posts__title">
                      <Link to="/">{post.title}</Link>
                    </div>
                    <div className="dashboard__posts__links">
                      <Link to={`/edit/${post._id}`}>
                        <BsPencil className="icon" />
                      </Link>
                      <BsArchive className="icon" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-96">
                  <h2 className="text-3xl text-gray-500">投稿がありません。</h2>
                </div>
              )
            ) : (
              <Loader />
            )}
          </div>
          <Pagination page={page} perPage={perPage} count={count} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
