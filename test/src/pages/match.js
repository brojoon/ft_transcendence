import React, {useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import getSocket from './socket.js';
//import getCookie from './cookie.js';

// const option = {
//   headers: {
//     Authorization: `Bearer ${getCookie('ts_token', 1)}`
//   },
//   withCredentials: true  
// }

const Match = () => {
  // const [userId , setUserId] = useState("");
  // const [button , setButton] = useState("MATCH");

  // const socket = getSocket();

  // useEffect(() => {
  //   async function getGameInfo() {
  //     axios.get(`http://localhost:3095/api/users`, option)
  //     .then(res => {
  //       setUserId(res.data.userId);
  //     }).catch(err => {
  //       if (err.response.status === 401) {
  //         setUserId("등록 되지 않는 아이디 입니다.");
  //       }
  //     })
  //   }
  //   if (userId === "")
  //     getGameInfo();
  // }, [userId]);

  // const onClickMatch = useCallback(() => {
  //   if (userId === "등록 되지 않는 아이디 입니다." || userId === "") {
  //     window.location.href = "http://localhost:3000";
  //   } else {
  //     setButton("기다리는 중");
  //     socket.emit('matching', {userId: userId, gameId: 0});
  //   }
  // }, [userId, socket]);

  // useEffect(  () => {
  //   socket.on("matched", (matched) => {
  //     if ( userId === matched.playerOne && matched.gameId === 0) {
  //       axios.post(`http://localhost:3095/api/dms/sendMessage/${matched.playerTwo}/1/0`, {message: ""}).then(res => {
  //         socket.emit('matching', {userId: userId, gameId: res.data});
  //         window.location.href = `http://localhost:3000/pingPong/${res.data}`;
  //       })   
  //     } else if (userId === matched.playerTwo && matched.gameId !== 0){
  //       window.location.href = `http://localhost:3000/pingPong/${matched.gameId}`;
  //     }
  //   });
  // }, [socket, userId]);

  
  const [userId1 , setUserId1] = useState("");
  const [userId2 , setUserId2] = useState("");
  const [putId , setPutId] = useState("");
  const [gameId , setGameId] = useState("");

  const socket = getSocket();

  const idChange1 = (e) => {
    setUserId1(e.target.value);
  };
  const idChange2 = (e) => {
    setUserId2(e.target.value);
  };

  const onClickMakeGame = useCallback(() => {
    console.log(userId2);
    axios.post(`http://localhost:3095/api/dms/sendMessage/${userId2}/1/0`, {message: ""})
    .then(res => {
      setGameId(res.data);
      console.log("[gameID] =>", gameId)
    })
  }, [userId2, gameId]);

  const aaaaa = (e) => {
    setPutId(e.target.value);
  };

  const onLine = useCallback(() => {
    socket.emit('login', {userId: putId, username: putId, Dms: [1], channels: [1]});
  }, [putId, socket]);

  const onGame = useCallback(() => {
    console.log(putId)
    socket.emit('onGame', {gameId:2, player: putId});
  }, [putId, socket]);

  const offGame = useCallback(() => {
    socket.emit('offGame', {gameId:2, player: putId});
  }, [putId, socket]);

  useEffect(() => {
    socket.on("onlineList", (map) => {
      console.log("[onlineList] =>", map)
    });
  }, [socket]);

  useEffect(() => {
    socket.on("onGameList", (map) => {
      console.log("[onGameList] =>", map)
    });
  }, [socket]);

  return (
    <div>
      <div>
          <input onChange={idChange1} value={userId1}/>
          <input onChange={idChange2} value={userId2}/>
      </div>
      <div>
        <button onClick={onClickMakeGame}>makeGame</button>
      </div>
      <div>
        <input onChange={aaaaa} value={putId}/>
        <button onClick={onLine}>onLine</button>
      </div>
      <div>
        <button onClick={onGame}>onGame</button>
      </div>
      <div>
        <button onClick={offGame}>offGame</button>
      </div>
    </div>
  );
};

export default Match;