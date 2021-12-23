import React, { useEffect, useContext } from 'react';
import LeftSideBar from '@components/LeftSideBar';
import loadable from '@loadable/component';
// import Achievements from '@pages/Achievements';
// import Channels from '@pages/Channels';
// import Social from '@pages/Social';
// import Game from '@pages/Game';
// import Home from '@pages/Home';
// import Profile from '@pages/Profile';
// import Users from '@pages/Users';
// import ProfileSetting from '@pages/ProfileSetting';
import { IUser, IAllUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { Route, Switch, useHistory, Link } from 'react-router-dom';
import useSWR from 'swr';
import { Container } from './style';
import getSocket from '@utils/useSocket';
import { SocketContext } from '@store/socket';
import { toast } from 'react-toastify';

const Home = loadable(() => import('@pages/Home'));
const Social = loadable(() => import('@pages/Social'));
const Channels = loadable(() => import('@pages/Channels'));
const Profile = loadable(() => import('@pages/Profile'));
const Users = loadable(() => import('@pages/Users'));
const Achievements = loadable(() => import('@pages/Achievements'));
const Game = loadable(() => import('@pages/Game'));
const ProfileSetting = loadable(() => import('@pages/ProfileSetting'));

const Content = () => {
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher);
  const { data: DMList } = useSWR<number[]>('/api/dms/dmlistOnlyIdJustArray', fetcher);
  const { data: ChannelList } = useSWR<number[]>('/api/channels/myChannelListOnlyId', fetcher);
  const { data: allUser } = useSWR<IAllUser[], any[]>('/api/users/alluser', fetcher);

  const { setOnlineList, setOnGameList } = useContext(SocketContext);

  const history = useHistory();

  if (myData && myData.username === '') {
    history.push('/login/first-step');
  }

  const socket = getSocket();
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
    socket?.on('onGameList', (data: any) => {
      setOnGameList(data);
      console.log(data);
      console.log('onGameList !!!');
    });
    return () => {
      socket.off('onGameList');
    };
  }, [socket]);

  useEffect(() => {
    socket?.on('onlineList', (data: any) => {
      setOnlineList(data);
      console.log(data);
      console.log('onlineList !!!');
    });

    return () => {
      socket.off('onlineList');
    };
  }, [socket]);

  useEffect(() => {
    socket?.on('notice', (data: any) => {
      toast.info(`${data.username}가 게임을 신청 했습니다 DM을 확인해주세요..!`, {
        autoClose: 6000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'dark',
      });
    });

    return () => {
      socket.off('notice');
    };
  }, [socket, allUser]);

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
