import React, { useState, useCallback, useEffect } from 'react';
import ChannelLeftDrawBar from '@components/ChannelLeftDrawBar';
import { Container } from './style';
import { Route, Switch, useHistory } from 'react-router-dom';
import ChannelCreate from '@pages/ChannelCreate';
import ChannelDiscover from '@pages/ChannelDiscover';
import ChannelRoom from '@pages/ChannelRoom';
import useSWR from 'swr';
import { IChannelList, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import getSocket from '@utils/useSocket';
import config from '@utils/config';

const Channel = () => {
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher);
  const { data: mychannelList, mutate: mutateChannelList } = useSWR<IChannelList[]>(
    '/api/channels/myChannelList',
    fetcher,
  );

  const history = useHistory();
  const socket2 = getSocket();
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState('0');
  const [createError, setCreateError] = useState(0);
  const [channelNameError, setChannelNameError] = useState(0);
  const [channelPasswordError, setChannelPasswordError] = useState(0);
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
      setChannelPasswordError(0);
      setPasswordValues({ ...PasswordValues, [prop]: event.target.value });
    },
    [PasswordValues, setPasswordValues],
  );
  const onChangeName = useCallback(
    (e: any) => {
      e.preventDefault();
      setChannelNameError(0);
      setCreateError(0);
      setName(e.target.value);
    },
    [name, setName],
  );

  const onChangeVisibility = useCallback(
    (e: any) => {
      e.preventDefault();
      setChannelPasswordError(0);
      setVisibility(e.target.value);
      setCreateError(0);
    },
    [visibility, setVisibility],
  );

  const onSubmitChannelCreate = useCallback(
    (e) => {
      e.preventDefault();
      if (name.length > 10 || name.length < 1) {
        setChannelNameError(1);
        return;
      }

      if (
        visibility == '1' &&
        (PasswordValues.password.length > 20 || PasswordValues.password.length < 1)
      ) {
        setChannelPasswordError(1);
        return;
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
          mutateChannelList().then(() => {
            if (mychannelList) {
              history.push(`/channels/${response.data}`);
            }
          });
        })
        .catch((error) => {
          setCreateError(1);
        });
    },
    [name, visibility, mychannelList, PasswordValues],
  );

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
              channelPasswordError={channelPasswordError}
            />
          )}
        />
        <Route exact path="/channels/:id" render={() => <ChannelRoom />} />
      </Switch>
    </Container>
  );
};

export default Channel;
