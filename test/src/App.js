import "./index.css";
import * as PIXI from "pixi.js";
import { Stage, PixiComponent } from "@inlet/react-pixi";
import React, {useState, useEffect} from "react";
import io from "socket.io-client"; //모듈 가져오기

const socket = io.connect("http://localhost:3095"); //백엔드 서버 포트를3001와 socket연결

socket.emit("game", {game: 1})
socket.emit("player_one", {game: 1})
socket.emit("player_two", {game: 1})

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
    const [speed, setseed] = useState(4);
    const [map, setmap] = useState(1);
    const [random, setrandom] = useState(0);

    useEffect(() => {
      socket.on("gameInfo", (gameInfo) => {
        setBallX(gameInfo.ball_x);
        setBallY(gameInfo.ball_y);
        setPlayOneY(gameInfo.player_one_y);
        setPlayTwoY(gameInfo.player_two_y);
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

    const speedChange = (e) => {
      setseed(e.target.value);
    };
    const mapChange = (e) => {
      setmap(e.target.value);
    };
    const randomChange = (e) => {
      setrandom(e.target.value);
    };
    const onReset1 = () => {
      setseed(4);
    };
    const onReset2 = () => {
      setmap(1);
    };
    const onReset3 = () => {
      setrandom(0);
    };
    const changeGameSet = () => {
      socket.emit("changeGameSet", {game: 1, speed: speed, map: map, random: random})
    };

    return (
      <div>
        <div>
          <b>스피드: {speed}</b>
          <input onChange={speedChange} value={speed}/>
          <button onClick={onReset1}>초기화</button>
          <b>map: {map}</b>
          <input onChange={mapChange} value={map}/>
          <button onClick={onReset2}>초기화</button>
          <b>random: {random}</b>
          <input onChange={randomChange} value={random}/>
          <button onClick={onReset3}>초기화</button>
        </div>
        <div>
          <button onClick={changeGameSet}>Setting</button>
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
      </div>
    );
}

export default App;