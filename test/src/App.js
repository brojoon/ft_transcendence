import "./index.css";
import * as PIXI from "pixi.js";
import { Stage, PixiComponent } from "@inlet/react-pixi";
import React, {useState, useEffect, useCallback} from "react";
import io from "socket.io-client"; //모듈 가져오기
import axios from 'axios';

const socket = io.connect("http://localhost:3095"); //백엔드 서버 포트를3001와 socket연결

socket.emit("game", {game: 1})

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

function App() {
    const [ball_x , setBallX] = useState(500);
    const [ball_y , setBallY] = useState(250);
    const [player_one_y, setPlayOneY] = useState(200);
    const [player_two_y , setPlayTwoY] = useState(200);
    const [player1, setPlay1] = useState(0);
    const [player2, setPlay2] = useState(0);
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [set, setSet] = useState(3);
    const [map, setMap] = useState(0);
    const [speed, setSpeed] = useState(2);
    const [random, setRandom] = useState(0);

    useEffect(() => {
      socket.on("gameInfo", (gameInfo) => {
        setBallX(gameInfo.ball_x);
        setBallY(gameInfo.ball_y);
        setPlayOneY(gameInfo.player_one_y);
        setPlayTwoY(gameInfo.player_two_y);
      });
    }, []);

    useEffect(() => {
      socket.on("score", (score) => {
        setScore1(score.player1);
        setScore2(score.player2);
      });
    }, []);

    useEffect(() => {
      const keyDownHandler = (e) => {
        if (e.keyCode === 87){
          socket.emit('player_one_up', {game: 1});
        }
        if (e.keyCode === 83){
          socket.emit('player_one_down', {game: 1});
        }
        if (e.keyCode === 38) {
          socket.emit('player_two_up', {game: 1});
        }
        if (e.keyCode === 40) {
          socket.emit('player_two_down', {game: 1});
        }
      };
      document.addEventListener('keydown', keyDownHandler, false);
    }, []);

    const readyPlayer1 = () => {
      setPlay1(1)
    };
    const readyPlayer2 = () => {
      setPlay2(1);
    };
    const speed1 = () => {
      setSpeed(1);
    };
    const speed2 = () => {
      setSpeed(2);
    };
    const speed3 = () => {
      setSpeed(3);
    };
    const set3 = () => {
      setSet(3);
    };
    const set5 = () => {
      setSet(5);
    };
    const map0 = async() => {
      setMap(0);
    };
    const map1 = async() => {
      setMap(1);
    };
    const random0 = () => {
      setRandom(0);
    };
    const random1 = () => {
      setRandom(1);
    };
    const gameStart = useCallback(() => {
      axios.get('http://localhost:3095/api/game', {
      });
    }, []);

    const changeGameSet = () => {
      socket.emit("changeGameSet", {game: 1, player1:player1, player2:player2, speed:speed, set: set, map: map, random: random})
    };
    return (
      <div>
        <div>
          <b>player1 ready: {player1} </b>
          <button onClick={readyPlayer1}>준비</button>
        </div>
        <div>
          <b>player2 ready: {player2} </b>
          <button onClick={readyPlayer2}>준비</button>
        </div>
        <div>
          <button onClick={changeGameSet}>세팅 완료</button>
          <button onClick={gameStart}>게임 시작</button>
          <b> (세팅완료 눌러야 세팅적용/ player 1,2 모두 레디 해야 시작됨 ) </b>
        </div>
        <div>
          <b>player1 score: {score1} </b>
        </div>
        <div>
          <b>player2 score: {score2} </b>
        </div>
        <div>
        <Stage width={1000} height={500} options={{ antialias: true, backgroundColor: 0xeec5da }}>
          <Rectangle x={0} y={player_one_y} width={20} height={100} fill={0xac1a6a} />
          <Rectangle x={980} y={player_two_y} width={20} height={100} fill={0xac1a6a} />
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
        </div>
      </div>
    );
}

export default App;