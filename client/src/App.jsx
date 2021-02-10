import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home, Login, Register } from './pages';

const App = () => {
  return (
    <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </Switch>
    </>
  );
}

export default App;
