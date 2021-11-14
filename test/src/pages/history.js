import React, {useState, useEffect} from 'react';
import axios from 'axios';
import getCookie from './cookie.js';

const option = {
  headers: {
    Authorization: `Bearer ${getCookie('ts_token', 1)}`
  },
  withCredentials: true  
}

const History = (data) => {
  const gameId = data.match.params.id;
  const [userId1, setUserId1] = useState("");
  const [userId2, setUserId2] = useState("");
  const [player1Point, setPlayer1Point] = useState(0);
  const [player2Point, setPlayer2Point] = useState(0);
  const [winner, setWinner] = useState(`${data.match.params.winner}`);

  useEffect(() => {
    async function getGameInfo() {
       await axios.get(`http://localhost:3095/api/game/history/${gameId}`, option)
        .then(res => {
          setUserId1(res.data.userId1);
          setUserId2(res.data.userId2);
          setPlayer1Point(res.data.user1Point);
          setPlayer2Point(res.data.user2Point);
          setWinner(res.data.winner);
          // if (res.data.winner === null)
          //   window.location.href = `http://localhost:3000/history/${gameId}`;
        }     
    )}
    if (userId1 === "")
      getGameInfo();
  }, [gameId, userId1]);

  const match = () => {
    window.location.href = `http://localhost:3000/match`;     
  };

  return (
    <div>
      <h1> [{userId1}] : {player1Point} 승 </h1>
      <h1> [{userId2}] : {player2Point} 승 </h1>
      <h1> 승리자 : {winner} </h1>
      <div>
        <button onClick={match}> to match page </button>
      </div>  
    </div>
  );
};

export default History;
