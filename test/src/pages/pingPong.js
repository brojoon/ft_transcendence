import "./index.css";
import * as PIXI from "pixi.js";
import { Stage, PixiComponent } from "@inlet/react-pixi";
import React, {useState, useEffect} from "react";
import axios from 'axios';
import getSocket from './socket.js';
import getCookie from './cookie.js';

const socket = getSocket();

//PIXI세팅
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
//사각형
const Rectangle = PixiComponent("Rectangle", {
    create: () => new PIXI.Graphics(),
    applyProps: (g, _, props) => {
      const { fill, x, y, width, height } = props;
      g.clear();
      g.beginFill(fill);
      g.drawRect(x, y, width, height);
      g.endFill();
    },
  });
// 원
const Circle = PixiComponent("Circle", {
  create: () => new PIXI.Graphics(),
  applyProps: (g, _, props) => {
    const { fill, x, y, radius } = props;
    g.clear();
    g.beginFill(fill);
    g.drawCircle(x, y, radius);
    g.endFill();
  },
});
// axio 옵션
const option = {
  headers: {
    Authorization: `Bearer ${getCookie('ts_token', 1)}`
  },
  withCredentials: true  
}

const PingPong = (data) =>{
  const gameId = data.match.params.id;
  const [ball_x , setBallX] = useState(500);
  const [ball_y , setBallY] = useState(250);
  const [player_one_y, setPlayOneY] = useState(200);
  const [player_two_y , setPlayTwoY] = useState(200);
  const [player1Ready, setPlay1Ready] = useState(0);
  const [player2Ready, setPlay2Ready] = useState(0);
  const [user1Point, setUser1Point] = useState(0);
  const [user2Point, setUser2Point] = useState(0);
  const [set, setSet] = useState(3);
  const [map, setMap] = useState(0);
  const [speed, setSpeed] = useState(3);
  const [random, setRandom] = useState(0);
  const [userId, setUserId] = useState("");
  const [player, setPlayer] = useState("");
  
  // 내정보 받아오고 => 게임 기록 가져오고 => 내정보와 userId 매칭후 player one인지 two인지 확인
  // playerOne인 경우 게임 리셋하고 게임포인트 집어 넣기
  useEffect(() => {
    async function getGameInfo() {
      let temUserId = "";
      // 내정보 받기
      await axios.get(`http://localhost:3095/api/users`, option)
        .then(res => {
          temUserId =res.data.userId;
          socket.emit('login', {userId: temUserId, Dms: [], channels: []});
        }) 
      // history와 비교 (진행상태 확인 =>  완료된 게임이면 결과 창으로 바로 이동)
      await axios.get(`http://localhost:3095/api/game/history/${gameId}`, option)
        .then(res => {
        if (res.data.state === 2)
          window.location.href = `http://localhost:3000/history/${gameId}`;
        setUserId(temUserId);
        if (temUserId === res.data.userId1){
          setPlayer("playerOne");
          setPlay2Ready(res.data.playerTwoJoin);
          socket.emit('game', {
            gameId: gameId, 
            player: "playerOne",
            player1Ready: 0,
            player2Ready: res.data.playerTwoJoin
          })
        }
        else if (temUserId === res.data.userId2) {
          setPlayer("playerTwo");
          setPlay1Ready(res.data.playerOneJoin);
          socket.emit('game', {
            gameId: gameId, 
            player: "playerTwo",
            player1Ready: res.data.playerOneJoin,
            player2Ready: 0   
          })
        } else {
          socket.emit('game', {
            gameId: gameId, 
            player: "",
            player1Ready: res.data.playerOneJoin,
            player2Ready: res.data.playerTwoJoin   
          })          
        }
        socket.emit("gamePoint", {
          gameId: gameId,
          user1Point: res.data.user1Point,
          user2Point: res.data.user2Point
        })
        if (res.data.user1Point + res.data.user2Point >= 3) {
          socket.emit("changeGameSet", {
            gameId: gameId, 
            speed: speed,
            set: 5, 
            map: map, 
            random: random
          })
        }      
      })
    }
    if (userId === "")
      getGameInfo();
  }, [gameId, userId, map, player, random, speed]);

  useEffect(() => {
    socket.on("gameInfo", (gameInfo) => {
      setBallX(gameInfo.ball_x);
      setBallY(gameInfo.ball_y);
    });
  }, []);

  useEffect(() => {
    socket.on("point", (point) => {
      setUser1Point(point.player1);
      setUser2Point(point.player2);
      if (point.player1 + point.player2 >= set)
        window.location.href = `http://localhost:3000/history/${gameId}`;
    });
  }, [set, gameId]);

  useEffect(() => {
    socket.on("ready", (ready) => {
      setPlay1Ready(ready.player1);
      setPlay2Ready(ready.player2);
    });
  }, []);

  useEffect(() => {
    socket.on("player_one", (playerInfo) => {
      setPlayOneY(playerInfo.player_one_y);
    });
  }, []);

  useEffect(() => {
    socket.on("player_two", (playerInfo) => {
      setPlayTwoY(playerInfo.player_two_y);
    });
  }, []);

  useEffect(() => {
    socket.on("gameSet", (set) => {
      setSpeed(set.length);
      setSet(set.game_set);
      setMap(set.game_map);
      setRandom(set.random_map);
    });
  }, []);

  useEffect(() => {
    const keyDownHandler = (e) => {
      console.log(player);
      if (e.keyCode === 87 && player === "playerOne"){
        socket.emit('player_one_up', {game: gameId});
      }
      if (e.keyCode === 83 && player === "playerOne"){
        socket.emit('player_one_down', {game: gameId});
      }
      if (e.keyCode === 79 && player === "playerTwo") {
        socket.emit('player_two_up', {game: gameId});
      }
      if (e.keyCode === 76 && player === "playerTwo") {
        socket.emit('player_two_down', {game: gameId});
      }
    };
    document.addEventListener('keydown', keyDownHandler, false);
  }, [player, gameId]);

  const readyPlayer1 = () => {
    if (player === "playerOne" && player1Ready === 0) {
      socket.emit("gameReady", {
        gameId: gameId, 
        player: 1,
        userId: userId
      })
    }
  };
  const readyPlayer2 = () => {
    if (player === "playerTwo" && player2Ready === 0) {
      socket.emit("gameReady", {
        gameId: gameId, 
        player: 2,
        userId: userId
      })        
    } 
  };
  const speed1 = () => {
    if (player !== "") {
      socket.emit("changeGameSet", {
        gameId: gameId, 
        speed: 2,
        set: set, 
        map: map, 
        random: random
      })
    }      
  };
  const speed2 = () => {
    if (player !== "") {
      socket.emit("changeGameSet", {
        gameId: gameId, 
        speed: 3,
        set: set, 
        map: map, 
        random: random
      })
    }
  };
  const speed3 = () => {
    if (player !== "") {
      socket.emit("changeGameSet", {
        gameId: gameId, 
        speed: 4,
        set: set, 
        map: map, 
        random: random
      })
    }
  };
  const set3 = () => {
    console.log(user1Point + user2Point);
    if (player !== "" && (user1Point + user2Point < 3)) {
      socket.emit("changeGameSet", {
        gameId: gameId, 
        speed:speed,
        set: 3, 
        map: map, 
        random: random
      })
    }
  };
  const set5 = () => {
    if (player !== "") {
      socket.emit("changeGameSet", {
        gameId: gameId, 
        speed: speed,
        set: 5, 
        map: map, 
        random: random
      })
    }
  };
  const map0 = () => {
    if (player !== "")
      socket.emit("changeGameSet", {
        gameId: gameId, 
        speed:speed,
        set: set, 
        map: 0, 
        random: random
      })
  };
  const map1 = () => {
    if (player !== "") {
      socket.emit("changeGameSet", {
        gameId: gameId, 
        speed:speed,
        set: set, 
        map: 1, 
        random: random
      })
    }  
  };
  const random0 = () => {
    if (player !== "") {
      socket.emit("changeGameSet", {
        gameId: gameId, 
        speed:speed,
        set: set, 
        map: map, 
        random: 0
      })
    }
  };
  const random1 = () => {
    if (player !== "") {
      socket.emit("changeGameSet", {
        gameId: gameId, 
        speed:speed,
        set: set, 
        map: map, 
        random: 1
      })
    }    
  };

  //////////upload////////
  const [content, setContent] = useState("");
  const onChange = e => {
    setContent(e.target.files[0]);
  };
  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", content); 
    axios.defaults.headers.post = null
    axios.post("http://localhost:3095/api/users/upload", formData, option)
      .then(res => {
        alert("successfully");
      })
      .catch(err => {
        alert("fail");
      });
  };
  ////////////////////////////////

  const changeGameSet = async() => {
    if (player !== "")
      await axios.get(`http://localhost:3095/api/game/start/${gameId}`, option); 
  };

  return (
    <div>
      <div>
        <h3>[ {userId} 화면 ({player !== "" ? player : "구경꾼"}) ]</h3>
        <b> playerOne {player1Ready === 0 ? '준비중..' : '완료'} </b>
        <button onClick={readyPlayer1}>{ player1Ready === 0 ? 'ready' : '완료' }</button>
        <b> playerTwo {player2Ready === 0 ? '준비중..' : '완료'} </b>
        <button onClick={readyPlayer2}>{ player2Ready === 0 ? 'ready' : '완료' }</button>
      </div>
      <div>
        <button onClick={changeGameSet}>게임시작 </button>
        <b> (모두 레디 시 시작됨) </b>
      </div>
      <div>
        <b> playerOne Point: [ {user1Point} ] </b>
        <b> (up: w / down: s) </b>
        <b> playerTwo Point: [ {user2Point} ] </b>
        <b> (up: o / down: l) </b>
      </div>
      <div>
      <Stage width={1000} height={500} options={{ antialias: true, backgroundColor: 0xeec5da }}>
        <Rectangle x={0} y={player_one_y} width={10} height={100} fill={0xac1a6a} />
        <Rectangle x={990} y={player_two_y} width={10} height={100} fill={0xac1a6a} />
        {map === 1 ? <Rectangle x={350} y={100} width={300} height={50} fill={0xf38bc4} /> : null}
        {map === 1 ? <Rectangle x={350} y={350} width={300} height={50} fill={0xf38bc4} /> : null}
        <Circle x={ball_x} y={ball_y} radius={10} fill={0x940665} />
      </Stage>
      </div>
      <div>
        <b>total set: {set} </b>
        <button onClick={set3}>3판</button>
        <button onClick={set5}>5판</button>
      </div>
      <div>
        <b>speed: {speed === 2 ? '1단계': (speed === 3 ? '2단계' : '3단계')} </b>
        <button onClick={speed1}> 1단계</button>
        <button onClick={speed2}> 2단계</button>
        <button onClick={speed3}> 3단계</button>
      </div>
      <div>
        <b>map: {map} </b>
        <button onClick={map0}>기본맵</button>
        <button onClick={map1}>장애물맵</button>
      </div>
      <div>
        <b>random: {random} </b>
        <button onClick={random0}>기본</button>
        <button onClick={random1}>랜덤팅김</button>
        <form onSubmit={onSubmit}>
            <input type="file" onChange={onChange} />
            <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default PingPong;
