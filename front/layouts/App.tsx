import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

const LogIn = loadable(() => import('@pages/LogIn'));
const ft_transcendence = loadable(() => import('@layouts/ft_transcendence'));

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={LogIn} />
      <Route path="/ft_transcendence" component={ft_transcendence} />
      <Route path="/ft_transcendence/:content" component={ft_transcendence} />
    </Switch>
  );
};

export default App;
