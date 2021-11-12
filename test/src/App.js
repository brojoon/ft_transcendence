import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PingPong from './pages/pingPong';
import Login from './pages/login';
import Match from './pages/match';
import History from './pages/history';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/match" exact={true} component={Match} />
        <Route path="/pingPong/:id" exact={true} component={PingPong} />
        <Route path="/history/:id" exact={true} component={History} />
      </Switch>  
    </div>  
  );
};

export default App;
