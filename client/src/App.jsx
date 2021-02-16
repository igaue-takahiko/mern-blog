import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Navbar, NotFound } from './components';
import { Home, Login, Register, Dashboard, Create } from './pages';
import { RouteLinks, PrivateRoute } from './customHooks';


const App = () => {
  return (
    <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <RouteLinks exact path="/register" component={Register} />
      <RouteLinks exact path="/login" component={Login} />
      <PrivateRoute exact path="/dashboard:page?" component={Dashboard} />
      <PrivateRoute exact path="/create" component={Create} />
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

export default App;
