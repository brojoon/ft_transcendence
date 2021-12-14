import LeftSideBar from '@components/LeftSideBar';
import Achievements from '@pages/Achievements';
import Channels from '@pages/Channels';
import Social from '@pages/Social';
import Game from '@pages/Game';
import Home from '@pages/Home';
import Profile from '@pages/Profile';
import Users from '@pages/Users';
import { IUserStateList, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import useSWR from 'swr';
import { Container } from './style';
import { disconnect } from 'process';
import io from 'socket.io-client';
import getSocket from '@utils/useSocket';
import ProfileSetting from '@pages/ProfileSetting';

const Content = () => {
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: DMList } = useSWR<number[]>('/api/dms/dmlistOnlyIdJustArray', fetcher);
  const { data: ChannelList } = useSWR<number[]>('/api/channels/myChannelListOnlyId', fetcher);
  const { data: allUserStateList } = useSWR<IUserStateList[]>('/api/users/connect-all', fetcher);

  const history = useHistory();

  if (myData && myData.username === '') {
    history.push('/login/first-step');
  }

  console.log('allUserStateList', allUserStateList);

  let socket = getSocket();
  useEffect(() => {
    if (DMList && ChannelList && myData) {
      socket.emit('login', {
        userId: myData.userId,
        username: myData.username,
        Dms: DMList,
        channels: ChannelList,
      });
    }
  }, [socket, DMList, ChannelList, myData]);

  useEffect(() => {
    socket?.on('onGameList', (onGameList: any) => {
      console.log(onGameList);
      console.log('onGameList !!!');
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('onlineList', (onlineList: any) => {
      console.log(onlineList);
      console.log('onlineList !!!');
    });

    return () => {
      socket.off('onlineList');
    };
  }, [socket]);

  if (!myData) return null;

  return (
    <Container>
      <LeftSideBar />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/social" component={Social} />
        <Route path="/channels" component={Channels} />
        <Route exact path="/users/:id" component={Profile} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/achievements" component={Achievements} />
        <Route path="/game" component={Game} />
        <Route exact path="/profile/setting" component={ProfileSetting} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Container>
  );
};

export default Content;
