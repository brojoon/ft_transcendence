import LeftSideBar from '@components/LeftSideBar';
import Achievements from '@pages/Achievements';
import Channels from '@pages/Channels';
import Friend from '@pages/Friend';
import Game from '@pages/Game';
import Home from '@pages/Home';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from './style';

const ft_transcendence = () => {
  return (
    <Container>
      <LeftSideBar />
      <Switch>
        <Route path="/ft_transcendence/home" component={Home} />
        <Route path="/ft_transcendence/channels" component={Channels} />
        <Route path="/ft_transcendence/friends" component={Friend} />
        <Route path="/ft_transcendence/achievements" component={Achievements} />
        <Route path="/ft_transcendence/game" component={Game} />
      </Switch>
    </Container>
  );
};

export default ft_transcendence;
