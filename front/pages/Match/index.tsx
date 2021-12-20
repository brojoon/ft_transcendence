import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import getSocket from '@utils/useSocket';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { MatchContainer } from './style';

const option = {
  // headers: {
  //   Authorization: `Bearer ${getCookie('ts_token', 1)}`,
  // },
  withCredentials: true,
};

const Match = () => {
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher);

  const history = useHistory();
  const socket = getSocket();

  useEffect(() => {
    if (myData) {
      socket.emit('matching', { userId: myData?.userId, gameId: 0 });
    }
  }, [myData, socket]);

  useEffect(() => {
    socket.on('matched', (matched: any) => {
      if (myData?.userId === matched.playerOne && matched.gameId === 0) {
        axios
          .post(
            `http://localhost:3095/api/dms/sendMessage/${matched.playerTwo}/1/0`,
            { message: '' },
            option,
          )
          .then((res) => {
            socket.emit('matching', { userId: myData?.userId, gameId: res.data });
            history.push(`/game/ping-pong/${res.data}`);
          });
      } else if (myData?.userId === matched.playerTwo && matched.gameId !== 0) {
        history.push(`/game/ping-pong/${matched.gameId}`);
      }
    });
    return () => {
      socket.off('matched');
    };
  }, [socket, myData]);

  return (
    <MatchContainer>
      <CircularProgress className="progress" />
      <h1>Waiting for opponent...</h1>
    </MatchContainer>
  );
};

export default Match;
