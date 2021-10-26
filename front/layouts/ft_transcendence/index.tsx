import LeftSideBar from '@components/LeftSideBar';
import Achievements from '@pages/Achievements';
import Channels from '@pages/Channels';
import Friend from '@pages/Friend';
import Game from '@pages/Game';
import Home from '@pages/Home';
import Profile from '@pages/Profile';
import Users from '@pages/Users';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Route, Switch } from 'react-router-dom';
import { Container } from './style';

const ft_transcendence = () => {
  return (
    <Container>
      <LeftSideBar />
      <Switch>
        <Route path="/ft_transcendence/home" component={Home} />
        <Route path="/ft_transcendence/friend" component={Friend} />
        <Route path="/ft_transcendence/channels" component={Channels} />
        <Route path="/ft_transcendence/users" component={Users} />
        <Route path="/ft_transcendence/achievements" component={Achievements} />
        <Route path="/ft_transcendence/game" component={Game} />
        <Route path="/ft_transcendence/profile" component={Profile} />
      </Switch>
    </Container>
  );
};

export default ft_transcendence;
