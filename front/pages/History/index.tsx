import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import getCookie from '@utils/cookie';
import { Link } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const option = {
  headers: {
    Authorization: `Bearer ${getCookie('ts_token', 1)}`,
  },
  withCredentials: true,
};

const History = (data: any) => {
  const gameId = data.match.params.id;
  const [userId1, setUserId1] = useState('');
  const [userId2, setUserId2] = useState('');
  const [player1Point, setPlayer1Point] = useState(0);
  const [player2Point, setPlayer2Point] = useState(0);
  const [winner, setWinner] = useState(`${data.match.params.winner}`);

  useEffect(() => {
    async function getGameInfo() {
      await axios
        .get(`http://localhost:3095/api/game/history/${gameId}`, option)
        .then((res: any) => {
          setUserId1(res.data.userId1);
          setUserId2(res.data.userId2);
          setPlayer1Point(res.data.user1Point);
          setPlayer2Point(res.data.user2Point);
          setWinner(res.data.winner);
          // if (res.data.winner === null)
          //   window.location.href = `http://localhost:3000/history/${gameId}`;
        })
        .catch(() => {});
    }
    if (userId1 === '') getGameInfo();
  }, [gameId, userId1]);

  return (
    <div
      style={{
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        fontSize: '30px',
        height: '100vh',
      }}
    >
      <div style={{ marginBottom: '15px', color: `${winner === userId1 ? 'white' : 'red'}` }}>
        [{userId1}] : {player1Point} Point
      </div>
      <div style={{ marginBottom: '15px', color: `${winner === userId2 ? 'white' : 'red'}` }}>
        [{userId2}] : {player2Point} Point
      </div>

      <div style={{ display: 'flex', marginBottom: '18px' }}>
        <EmojiEventsIcon style={{ fontSize: '45px' }} />
        <div style={{ fontSize: '30px' }}>승리자 : {winner}</div>
      </div>
      <div>
        <Link to="/game" style={{ textDecoration: 'none' }}>
          <Button variant="contained"> 매치 페이지로 이동 </Button>
        </Link>
      </div>
    </div>
  );
};

export default History;
