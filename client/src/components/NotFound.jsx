import React from 'react'
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Helmet>
        <title>404 - NotFound</title>
        <meta name='description' content='Oops! That page could not found' />
      </Helmet>
        <h1 className="line-through text-gray-500 text-7xl">
          404 | Not Found
        </h1>
        <p className="text-2xl ml-8">
          ページが見つかりません。
        </p>
    </div>
  )
}

export default NotFound
