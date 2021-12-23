import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import getSocket from '@utils/useSocket';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { MatchContainer } from './style';
import { toast } from 'react-toastify';

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

    return () => {
      if (myData) {
        socket.emit('outMatching', {
          userId: myData?.userId,
        });
      }
    };
  }, [myData, socket]);

  const Matching = useCallback(
    async (matched: any) => {
      await axios
        .post(`/api/dms/sendMessage/${matched.playerTwo}/1/0`, { message: '' }, option)
        .then((res) => {
          socket.emit('matching', { userId: myData?.userId, gameId: res.data });
          history.push(`/game/ping-pong/${res.data}`);
        })
        .catch((error) => {
          toast.error(error.message, {
            autoClose: 4000,
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
          });
          setTimeout(() => {
            history.push('/home');
          }, 4000);
        });
    },
    [myData, socket],
  );

  useEffect(() => {
    socket.on('matched', (matched: any) => {
      if (myData?.userId === matched.playerOne && matched.gameId === 0) {
        Matching(matched);
      } else if (myData?.userId === matched.playerTwo && matched.gameId !== 0) {
        history.push(`/game/ping-pong/${matched.gameId}`);
      }
    });
    return () => {
      socket.off('matched');
    };
  }, [socket, myData, Matching]);

  return (
    <MatchContainer>
      <CircularProgress className="progress" />
      <h1>Waiting for opponent...</h1>
    </MatchContainer>
  );
};

export default Match;
