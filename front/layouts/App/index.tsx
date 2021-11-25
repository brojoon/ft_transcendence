import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import Scrollbars from 'react-custom-scrollbars';

const LogIn = loadable(() => import('@pages/LogIn'));
const TwoFactor = loadable(() => import('@pages/TwoFactor'));
const FirstStep = loadable(() => import('@pages/FirstStep'));
const ft_transcendence = loadable(() => import('@layouts/ft_transcendence'));

const App = () => {
  return (
    <Scrollbars>
      <Switch>
        <Redirect exact path="/" to="/ft_transcendence/login" />
        <Redirect exact path="/ft_transcendence" to="/ft_transcendence/login" />
        <Route exact path="/ft_transcendence/login/first-step" component={FirstStep} />
        <Route exact path="/ft_transcendence/login" component={LogIn} />
        <Route exact path="/ft_transcendence/two-factor" component={TwoFactor} />
        <Route exact path="/ft_transcendence/:content" component={ft_transcendence} />
      </Switch>
    </Scrollbars>
  );
};

export default App;
