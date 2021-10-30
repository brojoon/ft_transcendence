// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as PIXI from "pixi.js";
import { Stage, Sprite, PixiComponent } from "@inlet/react-pixi";
import SocketTest from "./SocketTest.js";

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
const bunny = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png";
let scale = { x: 1, y: 1 };

const App = () => (
  <>
    <SocketTest />
    <Stage
      width={1000}
      height={500}
      options={{ antialias: true, backgroundColor: 0xf38bc4 }}
    >
      <Rectangle x={5} y={5} width={990} height={490} fill={0xeec5da} />

      <Rectangle x={5} y={200} width={20} height={100} fill={0xac1a6a} />
      <Rectangle x={975} y={200} width={20} height={100} fill={0xac1a6a} />
      <Circle x={500} y={250} radius={20} fill={0x940665} />

      <Sprite
        x={250}
        y={250}
        anchor={[0.5, 0.5]}
        interactive={true}
        scale={scale}
        image={bunny}
        pointerdown={() => {
          console.log("click");
          scale.x *= 1.25;
          scale.y *= 1.25;

          render();
        }}
      />
    </Stage>
  </>
);

function render() {
  ReactDOM.render(<App />, document.body);
}

render();
