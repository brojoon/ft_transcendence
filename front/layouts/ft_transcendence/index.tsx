import LeftSideBar from '@components/LeftSideBar';
import Achievements from '@pages/Achievements';
import Channels from '@pages/Channels';
import Social from '@pages/Social';
import Game from '@pages/Game';
import Home from '@pages/Home';
import Profile from '@pages/Profile';
import Users from '@pages/Users';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import useSWR from 'swr';
import { Container } from './style';
import DirectMessage from '@pages/DirectMessage';

const ft_transcendence = () => {
  const { data: userData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  console.log(userData);
  if (!userData) return null;
  return (
    <Container>
      <LeftSideBar />
      <Switch>
        <Route path="/ft_transcendence/home" component={Home} />
        <Route path="/ft_transcendence/social" component={Social} />
        <Route path="/ft_transcendence/channels" component={Channels} />
        <Route path="/ft_transcendence/users" component={Users} />
        <Route path="/ft_transcendence/achievements" component={Achievements} />
        <Route path="/ft_transcendence/game" component={Game} />
        <Route path="/ft_transcendence/profile" component={Profile} />
        <Route path="/ft_transcendence/dm" component={DirectMessage} />
      </Switch>
    </Container>
  );
};

export default ft_transcendence;
