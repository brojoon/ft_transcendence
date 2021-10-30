import "./index.css";
import * as PIXI from "pixi.js";
import { Stage, PixiComponent } from "@inlet/react-pixi";
import React, {useState, useEffect} from "react";
import io from "socket.io-client"; //모듈 가져오기

const socket = io.connect("http://localhost:3095"); //백엔드 서버 포트를3001와 socket연결

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
    const [x_site , setName] = useState(500);
    const [y_site , setMsg] = useState(250);

    useEffect(() => {
      socket.on("welcome", (message) => {
        setName(x_site => message.x);
        setMsg(y_site => message.y);
      });
    }, []);

    return (
        <div>
        <Stage width={1000} height={500} options={{ antialias: true, backgroundColor: 0xf38bc4 }}>
          <Rectangle x={5} y={5} width={990} height={490} fill={0xeec5da} />
          <Rectangle x={5} y={200} width={20} height={100} fill={0xac1a6a} />
          <Rectangle x={975} y={200} width={20} height={100} fill={0xac1a6a} />
          <Circle x={x_site} y={y_site} radius={20} fill={0x940665} />
        </Stage>
        </div>
    );
}

export default App;