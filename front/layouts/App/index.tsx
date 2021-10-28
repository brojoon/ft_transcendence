import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

const LogIn = loadable(() => import('@pages/LogIn'));
const TwoFactor = loadable(() => import('@pages/TwoFactor'));
const ft_transcendence = loadable(() => import('@layouts/ft_transcendence'));

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/ft_transcendence/login" />
      <Redirect exact path="/ft_transcendence" to="/ft_transcendence/login" />
      <Route path="/ft_transcendence/login" component={LogIn} />
      <Route path="/ft_transcendence/two-factor" component={TwoFactor} />
      <Route path="/ft_transcendence/:content" component={ft_transcendence} />
    </Switch>
  );
};

export default App;
