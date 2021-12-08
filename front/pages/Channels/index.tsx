import React, { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ChannelLeftDrawBar from '@components/ChannelLeftDrawBar';
import { Container } from './style';
import ChatHeader from '@components/ChannelHeader';
import ChannelBody from '@components/ChannelBody';
import { Route, Switch, useHistory } from 'react-router-dom';
import ChannelCreate from '@pages/ChannelCreate';
import ChannelDiscover from '@pages/ChannelDiscover';
import ChannelRoom from '@pages/ChannelRoom';
import useSWR, { useSWRConfig } from 'swr';
import { IChannelList, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import getSocket from '@utils/useSocket';
import config from '@utils/config';

const Channel = () => {
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: allchannelList, mutate: mutateChannelList } = useSWR<IChannelList[]>(
    '/api/channels/myChannelList',
    fetcher,
  );
  const { data: allChannelList, mutate: mutateAllChannelList } = useSWR<IChannelList[]>(
    `/api/channels/allChannelList`,
    fetcher,
  );
  const { data: myChannelList, mutate: mutateMyChannelList } = useSWR<IChannelList[]>(
    `/api/channels/myChannelList`,
    fetcher,
  );
  const history = useHistory();
  const socket2 = getSocket();
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState('');
  const [createError, setCreateError] = useState(false);
  const [channelNameError, setChannelNameError] = useState(0);
  const [visibilityError, setVisibilityError] = useState(0);
  const [PasswordValues, setPasswordValues] = useState({
    password: '',
    showPassword: false,
  });
  const handleClickShowPassword = useCallback(() => {
    setPasswordValues({
      ...PasswordValues,
      showPassword: !PasswordValues.showPassword,
    });
  }, [PasswordValues, setPasswordValues]);
  const handleChange = useCallback(
    (prop: any) => (event: any) => {
      setPasswordValues({ ...PasswordValues, [prop]: event.target.value });
    },
    [PasswordValues, setPasswordValues],
  );
  const onChangeName = useCallback(
    (e: any) => {
      e.preventDefault();
      setChannelNameError(0);
      setCreateError(false);
      setName(e.target.value);
    },
    [name, setName],
  );

  const onChangeVisibility = useCallback(
    (e: any) => {
      e.preventDefault();
      setVisibility(e.target.value);
      setCreateError(false);
      setVisibilityError(0);
    },
    [visibility, setVisibility],
  );

  const onSubmitChannelCreate = useCallback(
    (e) => {
      e.preventDefault();
      if (name.length > 20) {
        setChannelNameError(1);
        return;
      }
      if (!visibility) {
        setVisibilityError(1);
      }
      axios
        .post(
          `/api/channels/create/${name}/${visibility}`,
          {
            password: PasswordValues.password,
          },
          config,
        )
        .then((response) => {
          setName('');
          setVisibility('');
          setPasswordValues({
            password: '',
            showPassword: false,
          });
          mutateChannelList();
          if (allchannelList) {
            history.push(`/channels/${response.data}`);
          }
        })
        .catch((error) => {
          setCreateError(true);
          console.log(error);
        });
    },
    [name, visibility, allchannelList, PasswordValues],
  );

  // const channelRevalidate = useCallback(() => {
  //   console.log('channel revalidated!!!');
  //   mutateChannelList();
  //   mutateMyChannelList();
  //   mutateAllChannelList();
  // }, []);

  // useEffect(() => {
  //   socket2?.on('channelDelete', channelRevalidate);

  //   return () => {
  //     socket2?.off('channelDelete', channelRevalidate);
  //   };
  // }, [socket2, channelRevalidate]);

  return (
    <Container>
      <ChannelLeftDrawBar />

      <Switch>
        <Route exact path="/channels" render={() => <ChannelDiscover />} />
        <Route
          exact
          path="/channels/create"
          render={() => (
            <ChannelCreate
              onSubmitChannelCreate={onSubmitChannelCreate}
              onChangeVisibility={onChangeVisibility}
              onChangeName={onChangeName}
              name={name}
              visibility={visibility}
              handleClickShowPassword={handleClickShowPassword}
              handleChange={handleChange}
              PasswordValues={PasswordValues}
              setPasswordValues={setPasswordValues}
              createError={createError}
              channelNameError={channelNameError}
            />
          )}
        />
        <Route path="/channels/:id" render={() => <ChannelRoom />} />
      </Switch>
    </Container>
  );
};

export default Channel;
