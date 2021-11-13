import LeftSideBar from '@components/LeftSideBar';
import Achievements from '@pages/Achievements';
import Channels from '@pages/Channels';
import Social from '@pages/Social';
import Game from '@pages/Game';
import Home from '@pages/Home';
import Profile from '@pages/Profile';
import Users from '@pages/Users';
import { IDmList, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import useSWR from 'swr';
import { Container } from './style';
import { disconnect } from 'process';
import io from 'socket.io-client';
import getSocket from '@utils/useSocket';

const ft_transcendence = () => {
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: DMList } = useSWR<number[]>('/api/dms/dmlistOnlyIdJustArray', fetcher);
  const { data: ChannelList } = useSWR<number[]>('/api/channels/myChannelListOnlyId', fetcher);

  console.log('DMList', DMList);
  console.log('ChannelList', ChannelList);
  let socket = getSocket();
  useEffect(() => {
    if (DMList && ChannelList && myData) {
      socket.emit('login', {
        userId: myData?.userId,
        Dms: DMList,
        channels: ChannelList,
      });
    }
  }, [socket, DMList, ChannelList, myData]);
  if (!myData) return null;
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
      </Switch>
    </Container>
  );
};

export default ft_transcendence;
