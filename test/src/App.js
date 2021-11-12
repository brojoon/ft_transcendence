import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PingPong from './pages/pingPong';
import Login from './pages/login';
import Match from './pages/match';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/match" exact={true} component={Match} />
        <Route path="/pingPong/:id" exact={true} component={PingPong} />
      </Switch>  
    </div>  
  );
};

export default App;
