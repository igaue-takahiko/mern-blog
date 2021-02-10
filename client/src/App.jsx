import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Navbar } from './components';

import { Home, Login, Register } from './pages';

const App = () => {
  return (
    <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </Switch>
    </>
  );
}

export default App;
