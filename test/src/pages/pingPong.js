import "./index.css";
import * as PIXI from "pixi.js";
import { Stage, PixiComponent } from "@inlet/react-pixi";
import React, {useState, useEffect, useCallback} from "react";
import axios from 'axios';
import getSocket from './socket.js';
import getCookie from './cookie.js';

const socket = getSocket();

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

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

const PingPong = (data) =>{
  const [ball_x , setBallX] = useState(500);
  const [ball_y , setBallY] = useState(250);
  const [player_one_y, setPlayOneY] = useState(200);
  const [player_two_y , setPlayTwoY] = useState(200);
  const [player1, setPlay1] = useState(0);
  const [player2, setPlay2] = useState(0);
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
  useEffect( () => {
    axios.get(`http://localhost:3095/api/users`, {
      headers: {
          Authorization: `Bearer ${getCookie('ts_token', 1)}`
      },
      withCredentials: true
    }).then(res => {
      setUserId(res.data.userId);
      socket.emit('login', {userId: res.data.userId, Dms: [], channels: []});
      axios.get(`http://localhost:3095/api/dms/history/${data.match.params.id}`, {
        headers: {
          Authorization: `Bearer ${getCookie('ts_token', 1)}`
        },
        withCredentials: true
      }).then(res => {
        if ( userId === res.data.userId1){
          setPlayer("playerOne");
          socket.emit('game', {
            gameId: data.match.params.id, 
            player: "playerOne",
            user1Point: res.data.user1Point,
            user2Point: res.data.user2Point
          })
        }   
        else if (userId === res.data.userId2) {
          setPlayer("playerTwo");
          socket.emit('game', {
            gameId: data.match.params.id, 
            player: "playerTwo",
            user1Point: res.data.user1Point,
            user2Point: res.data.user2Point
          })
        }      
      })
    })  
  }, [data.match.params.id, userId]);

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
        socket.emit('player_one_up', {game: data.match.params.id});
      }
      if (e.keyCode === 83 && player === "playerOne"){
        socket.emit('player_one_down', {game: data.match.params.id});
      }
      if (e.keyCode === 79 && player === "playerTwo") {
        socket.emit('player_two_up', {game: data.match.params.id});
      }
      if (e.keyCode === 76 && player === "playerTwo") {
        socket.emit('player_two_down', {game: data.match.params.id});
      }
    };
    document.addEventListener('keydown', keyDownHandler, false);
  }, [player, data.match.params.id]);

  const readyPlayer1 = () => {
    if (player === "playerOne") {
      setPlay1(1);
      axios.get(`http://localhost:3095/api/dms/ready1/${data.match.params.id}`, {
        headers: {
          Authorization: `Bearer ${getCookie('ts_token', 1)}`
        },
        withCredentials: true
      })
    }
      
  };
  const readyPlayer2 = () => {
    if (player === "playerTwo") {
      axios.get(`http://localhost:3095/api/dms/ready2/${data.match.params.id}`, {
        headers: {
          Authorization: `Bearer ${getCookie('ts_token', 1)}`
        },
        withCredentials: true
      })      
      setPlay2(1);
    } 
  };
  const speed1 = () => {
    if (player !== "")
      setSpeed(2);
  };
  const speed2 = () => {
    if (player !== "")
      setSpeed(3);
  };
  const speed3 = () => {
    if (player !== "")
      setSpeed(4);
  };
  const set3 = () => {
    setSet(3);
  };
  const set5 = () => {
    if (player !== "")
      setSet(5);
  };
  const map0 = () => {
    if (player !== "")
      setMap(0);
  };
  const map1 = () => {
    if (player !== "")
      setMap(1);
  };
  const random0 = () => {
    if (player !== "")
      setRandom(0);
  };
  const random1 = () => {
    if (player !== "")
      setRandom(1);
  };
  const gameStart = useCallback(() => {
    if (player !== "")
      axios.get(`http://localhost:3095/api/game/start/${data.match.params.id}`, {
      });
  }, [player, data.match.params.id]);

  //////////upload////////
  const headers = { 
    'Authorization': `Bearer ${getCookie('ts_token', 1)}`
  }
  const [content, setContent] = useState("");
  const onChange = e => {
    setContent(e.target.files[0]);
  };
  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", content); 
    axios.defaults.headers.post = null
    axios.post("http://localhost:3095/api/users/upload", formData, {headers})
      .then(res => {
        alert("successfully");
      })
      .catch(err => {
        alert("fail");
      });
  };
  ////////////////////////////////

  const changeGameSet = async() => {
    await socket.emit("changeGameSet", {game: data.match.params.id, speed:speed, set: set, map: map, random: random})
    await gameStart();  
  };
  return (
    <div>
      <div>
        <h3>[ {player} 화면 ]</h3>
        <b>player1 ready: {player1} </b>
        <button onClick={readyPlayer1}>{ player1 === 0 ? '준비' : '완료' }</button>
        <b>player2 ready: {player2} </b>
        <button onClick={readyPlayer2}>{ player2 === 0 ? '준비' : '완료' }</button>
      </div>
      <div>
        <button onClick={changeGameSet}>게임시작 </button>
        <b> (player 1,2 모두 레디 해야 시작됨 ) </b>
      </div>
      <div>
        <b> player1 Point: {user1Point} </b>
        <b> [up: w / down: s] </b>
        <b> player2 Point: {user2Point} </b>
        <b> [up: o / down: l] </b>
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
        <b>speed: {speed} </b>
        <button onClick={speed1}>1단계</button>
        <button onClick={speed2}>2단계</button>
        <button onClick={speed3}>3단계</button>
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
