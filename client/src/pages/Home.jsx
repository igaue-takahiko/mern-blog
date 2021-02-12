import React from 'react'
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>T.I Blog</title>
        <meta name="description" content="技術ブログサイト" />
      </Helmet>
    </div>
  )
}

export default Home
