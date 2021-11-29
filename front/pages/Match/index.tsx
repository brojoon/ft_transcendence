import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import getSocket from '@utils/useSocket';
import getCookie from '@utils/cookie';

const option = {
  headers: {
    Authorization: `Bearer ${getCookie('ts_token', 1)}`,
  },
  withCredentials: true,
};

const Match = () => {
  const [userId, setUserId] = useState('');
  const [button, setButton] = useState('MATCH');

  const socket = getSocket();

  useEffect(() => {
    async function getGameInfo() {
      axios
        .get(`http://localhost:3095/api/users`, option)
        .then((res: any) => {
          setUserId(res.data.userId);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setUserId('등록 되지 않는 아이디 입니다.');
          }
        });
    }
    if (userId === '') getGameInfo();
  }, [userId]);

  const onClickMatch = useCallback(() => {
    if (userId === '등록 되지 않는 아이디 입니다.' || userId === '') {
      window.location.href = 'http://localhost:3095';
    } else {
      setButton('기다리는 중');
      socket.emit('matching', { userId: userId, gameId: 0 });
    }
  }, [userId, socket]);

  useEffect(() => {
    socket.on('matched', (matched: any) => {
      if (userId === matched.playerOne && matched.gameId === 0) {
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
            socket.emit('matching', { userId: userId, gameId: res.data });
            window.location.href = `http://localhost:3095/pingPong/${res.data}`;
          });
      } else if (userId === matched.playerTwo && matched.gameId !== 0) {
        window.location.href = `http://localhost:3095/pingPong/${matched.gameId}`;
      }
    });
  }, [socket, userId]);

  return (
    <div>
      <div>
        <b>ID : {userId} </b>
      </div>
      <div>
        <button onClick={onClickMatch}>{button}</button>
      </div>
    </div>
  );
};

export default Match;
