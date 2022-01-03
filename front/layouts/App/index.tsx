import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import Scrollbars from 'react-custom-scrollbars';
import SocketContext from '@store/socket';
import { ScrollbarColor } from './style';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'regenerator-runtime';

import LogIn from '@pages/LogIn';
import TwoFactor from '@pages/TwoFactor';
import FirstStep from '@pages/FirstStep';
import Content from '@layouts/Content';
import Admin from '@pages/Admin';
import AdminChannel from '@pages/AdminChannel';
import RootPage from '@pages/RootPage';

// const LogIn = loadable(() => import('@pages/LogIn'));
// const TwoFactor = loadable(() => import('@pages/TwoFactor'));
// const FirstStep = loadable(() => import('@pages/FirstStep'));
// const Content = loadable(() => import('@layouts/Content'));
// const Admin = loadable(() => import('@pages/Admin'));
// const AdminChannel = loadable(() => import('@pages/AdminChannel'));
// const RootPage = loadable(() => import('@pages/RootPage'));

const App = () => {
  return (
    <SocketContext>
      <ToastContainer />
      <Scrollbars
        autoHide
        renderThumbVertical={({ style, ...props }) => <ScrollbarColor {...props} />}
      >
        <Switch>
          <Route exact path="/" component={RootPage} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/login/first-step" component={FirstStep} />
          <Route exact path="/two-factor" component={TwoFactor} />
          <Route exact path="/admin/:id" component={AdminChannel} />
          <Route exact path="/admin" component={Admin} />
          <Route path="/:content" component={Content} />
        </Switch>
      </Scrollbars>
    </SocketContext>
  );
};

export default App;
