import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import getSocket from '@utils/useSocket';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { MatchContainer } from './style';

const RootPage = () => {
  const history = useHistory();
  function firstRequest() {
    axios
      .get('/api/users', {
        withCredentials: true,
      })
      .then(() => {
        history.push('/home');
      })
      .catch(() => {
        history.push('/login');
      });
  }
  setTimeout(() => {
    firstRequest();
  }, 1000);
  return (
    <MatchContainer>
      <CircularProgress className="progress" />
    </MatchContainer>
  );
};

export default RootPage;
