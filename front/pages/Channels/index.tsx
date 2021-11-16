import React, { useState, useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ChannelLeftDrawBar from '@components/ChannelLeftDrawBar';
import { Container } from '@pages/Social/style';
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
import getToken from '@utils/getToken';
import getSocket from '@utils/useSocket';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
      setCreateError(false);
      setName(e.target.value);
    },
    [name, setName],
  );

  const onChangeVisibility = useCallback(
    (e: any) => {
      e.preventDefault();
      setCreateError(false);
      setVisibility(e.target.value);
    },
    [visibility, setVisibility],
  );

  const onSubmitChannelCreate = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(
          `/api/channels/create/${name}/${visibility}`,
          {
            password: PasswordValues.password,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          },
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
            history.push(`/ft_transcendence/channels/${response.data}`);
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
    <Container
      style={{
        borderLeft: '1px solid #4f4f4f',
        margin: '0',
        padding: '0',
        backgroundColor: '#1e1e1e',
        overflow: 'hidden',
      }}
    >
      <ChannelLeftDrawBar />

      <Switch>
        <Route exact path="/ft_transcendence/channels" render={() => <ChannelDiscover />} />
        <Route
          exact
          path="/ft_transcendence/channels/create"
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
            />
          )}
        />
        <Route path="/ft_transcendence/channels/:id" render={() => <ChannelRoom />} />
      </Switch>
    </Container>
  );
};

export default Channel;
