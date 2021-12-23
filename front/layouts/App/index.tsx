import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import Scrollbars from 'react-custom-scrollbars';
import SocketContext from '@store/socket';
import { ScrollbarColor } from './style';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'regenerator-runtime';

const LogIn = loadable(() => import('@pages/LogIn'));
const TwoFactor = loadable(() => import('@pages/TwoFactor'));
const FirstStep = loadable(() => import('@pages/FirstStep'));
const Content = loadable(() => import('@layouts/Content'));
const Admin = loadable(() => import('@pages/Admin'));
const AdminChannel = loadable(() => import('@pages/AdminChannel'));

const App = () => {
  // let isLogin = undefined;

  // async function firstRequest() {
  //   await axios
  //     .get('/api/users', {
  //       withCredentials: true,
  //     })
  //     .then(() => {
  //       console.log('hi');
  //       isLogin = true;
  //     })
  //     .catch(() => {
  //       isLogin = false;
  //     });
  // }

  // firstRequest();
  // console.log(isLogin);
  return (
    <SocketContext>
      <ToastContainer />
      <Scrollbars
        autoHide
        renderThumbVertical={({ style, ...props }) => <ScrollbarColor {...props} />}
      >
        <Switch>
          <Redirect exact path="/" to="/login" />
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
