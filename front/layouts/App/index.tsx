import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import Scrollbars from 'react-custom-scrollbars';
import getToken from '@utils/getToken';

const LogIn = loadable(() => import('@pages/LogIn'));
const TwoFactor = loadable(() => import('@pages/TwoFactor'));
const FirstStep = loadable(() => import('@pages/FirstStep'));
const Content = loadable(() => import('@layouts/Content'));
const Admin = loadable(() => import('@pages/Admin'));

const App = () => {
  return (
    <Scrollbars>
      <Switch>
        <Redirect exact path="/" to="/login" />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/login/first-step" component={FirstStep} />
        <Route exact path="/two-factor" component={TwoFactor} />
        <Route path="/admin/:id" component={Admin} />
        <Route path="/admin" component={Admin} />
        <Route path="/:content" component={Content} />
      </Switch>
    </Scrollbars>
  );
};

export default App;
