import React, { useCallback, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Container, LoginButton } from './style';
import axios from 'axios';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';

const LogIn = () => {
  const history = useHistory();

  // if (myData && myData.username !== '') {
  //   history.push('/home');myData
  // }

  const onClickGoogleLogin = useCallback(() => {
    axios.get('/api/', {
      withCredentials: true,
    });
  }, []);

  const onClick42Login = useCallback(() => {
    window.location.href = '/api/auth/42';
    console.log('/api/auth/42');
  }, []);
  return (
    <Container>
      <h1>ft_transcendence</h1>
      <div>
        <LoginButton onClick={onClickGoogleLogin} variant="contained" size="large">
          GooGle
        </LoginButton>
        <LoginButton onClick={onClick42Login} variant="contained" size="large">
          42
        </LoginButton>
      </div>
    </Container>
  );
};

export default LogIn;
