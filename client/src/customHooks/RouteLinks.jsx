import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const RouteLinks = ({ path, exact, component }) => {
  const { user } = useSelector((state) => state.auth)

  return user ? (
    <Redirect to="/dashboard" />
  ) : (
    <Route path={path} exact={exact} component={component} />
  )
}

export default RouteLinks
