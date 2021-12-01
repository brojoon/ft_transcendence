import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import getSocket from '@utils/useSocket';
import getCookie from '@utils/cookie';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';

const option = {
  headers: {
    Authorization: `Bearer ${getCookie('ts_token', 1)}`,
  },
  withCredentials: true,
};

const Match = () => {
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const [ismatching, setIsMatching] = useState(false);

  const history = useHistory();
  const socket = getSocket();

  const onClickMatch = useCallback(() => {
    setIsMatching(true);
    socket.emit('matching', { userId: myData?.userId, gameId: 0 });
  }, [myData, socket]);

  useEffect(() => {
    socket.on('matched', (matched: any) => {
      if (myData?.userId === matched.playerOne && matched.gameId === 0) {
        axios
          .post(
            `http://localhost:3095/api/dms/sendMessage/${matched.playerTwo}/1/0`,
            { message: '' },
            {
              headers: {
                Authorization: `Bearer ${getCookie('ts_token', 1)}`,
              },
            },
          )
          .then((res) => {
            socket.emit('matching', { userId: myData?.userId, gameId: res.data });
            history.push(`/game/ping-pong/${res.data}`);
          });
      } else if (myData?.userId === matched.playerTwo && matched.gameId !== 0) {
        history.push(`/game/ping-pong/${matched.gameId}`);
      }
    });
  }, [socket, myData]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {ismatching ? (
        <Box
          sx={{ display: 'flex' }}
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#121212',
            color: 'white',
            width: '100%',
            height: '100vh',
          }}
        >
          <CircularProgress style={{ color: 'white' }} />
          <h1>Waiting for opponent...</h1>
        </Box>
      ) : (
        <div style={{ height: '100vh', alignItems: 'center', display: 'flex' }}>
          <Button variant="contained" onClick={onClickMatch}>
            MATCH
          </Button>
        </div>
      )}
    </div>
  );
};

export default Match;
