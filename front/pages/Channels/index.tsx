import React, { useState, useCallback, useEffect } from 'react';
import ChannelLeftDrawBar from '@components/ChannelLeftDrawBar';
import { Container } from './style';
import { Route, Switch, useHistory } from 'react-router-dom';
// import ChannelCreate from '@pages/ChannelCreate';
// import ChannelDiscover from '@pages/ChannelDiscover';
// import ChannelRoom from '@pages/ChannelRoom';
import useSWR from 'swr';
import { IChannelList, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import config from '@utils/config';
import { toast } from 'react-toastify';
import loadable from '@loadable/component';

const ChannelDiscover = loadable(() => import('@pages/ChannelDiscover'));
const ChannelRoom = loadable(() => import('@pages/ChannelRoom'));
const ChannelCreate = loadable(() => import('@pages/ChannelCreate'));

const Channel = () => {
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher);
  const { data: mychannelList, mutate: mutateChannelList } = useSWR<IChannelList[]>(
    '/api/channels/myChannelList',
    fetcher,
  );

  const history = useHistory();
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState('0');
  const [createError, setCreateError] = useState(0);
  const [PasswordValues, setPasswordValues] = useState({
    password: '',
    showPassword: false,
  });

  const onSubmitChannelCreate = useCallback(() => {
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
        setVisibility('0');
        setPasswordValues({
          password: '',
          showPassword: false,
        });
        toast.success('Successfully created a channel', {
          autoClose: 4000,
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: 'colored',
        });
        mutateChannelList().then(() => {
          if (mychannelList) {
            history.push(`/channels/${response.data}`);
          }
        });
      })
      .catch((error) => {
        setCreateError(1);
        setName('');
        setVisibility('0');
        setPasswordValues({
          password: '',
          showPassword: false,
        });
      });
  }, [name, visibility, mychannelList, PasswordValues]);

  return (
    <Container>
      <ChannelLeftDrawBar />
      <Switch>
        <Route exact path="/channels" component={ChannelDiscover} />
        <Route
          exact
          path="/channels/create"
          render={() => (
            <ChannelCreate
              onSubmitChannelCreate={onSubmitChannelCreate}
              name={name}
              setVisibility={setVisibility}
              setName={setName}
              setPasswordValues={setPasswordValues}
              createError={createError}
              setCreateError={setCreateError}
            />
          )}
        />
        <Route exact path="/channels/:id" component={ChannelRoom} />
      </Switch>
    </Container>
  );
};

export default Channel;
