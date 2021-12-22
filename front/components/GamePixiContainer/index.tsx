import * as PIXI from 'pixi.js';
import { Stage, PixiComponent } from '@inlet/react-pixi';
import React, { useState, useEffect, useCallback, VFC } from 'react';
import axios from 'axios';
import getSocket from '@utils/useSocket';
import 'regenerator-runtime';
import { useParams } from 'react-router-dom';
import { PixiContainer } from './style';

const socket = getSocket();

interface RectangleProps {
  width: number;
  height: number;
  x: number;
  y: number;
  fill: number;
}

interface CircleProps {
  x: number;
  y: number;
  radius: number;
  fill: number;
}

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
//사각형
const Rectangle = PixiComponent<RectangleProps, PIXI.Graphics>('Rectangle', {
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
const Circle = PixiComponent<CircleProps, PIXI.Graphics>('Circle', {
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
  // headers: {
  //   Authorization: `Bearer ${getCookie('ts_token', 1)}`,
  // },
  withCredentials: true,
};

interface Props {
  mapSelect: number;
  player: string;
}

const GamePixiContainer: VFC<Props> = ({ mapSelect, player }) => {
  const { id } = useParams<{ id: string }>();
  const [ball_x, setBallX] = useState(500);
  const [ball_y, setBallY] = useState(250);
  const [player_one_y, setPlayOneY] = useState(200);
  const [player_two_y, setPlayTwoY] = useState(200);

  const fetchDataFunc = async () => {
    await axios.get(`http://localhost:3095/api/game/start/${id}`, option);
  };

  useEffect(() => {
    socket.on('gameInfo', (gameInfo: any) => {
      setBallX(gameInfo.ball_x);
      setBallY(gameInfo.ball_y);
    });
    return () => {
      socket.off('gameInfo');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('player_one', (playerInfo: any) => {
      setPlayOneY(playerInfo.player_one_y);
    });
    return () => {
      socket.off('player_one');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('player_two', (playerInfo: any) => {
      setPlayTwoY(playerInfo.player_two_y);
    });
    return () => {
      socket.off('player_two');
    };
  }, [socket]);

  useEffect(() => {
    const keyDownHandler = (e: any) => {
      // 잠시 이걸 이용
      if (e.keyCode === 87 && player !== '') {
        socket.emit('player_one_up', { game: id });
      } else if (e.keyCode === 83 && player !== '') {
        socket.emit('player_one_down', { game: id });
      } else if (e.keyCode === 79 && player !== '') {
        socket.emit('player_two_up', { game: id });
      } else if (e.keyCode === 76 && player !== '') {
        socket.emit('player_two_down', { game: id });
      } else if (e.keyCode === 84 && player !== '') {
        fetchDataFunc();
      }
      // if (e.keyCode === 87 && player === "playerOne"){
      //   socket.emit('player_one_up', {game: gameId});
      // } else if (e.keyCode === 83 && player === "playerOne"){
      //   socket.emit('player_one_down', {game: gameId});
      // } else if (e.keyCode === 79 && player === "playerTwo") {
      //   socket.emit('player_two_up', {game: gameId});
      // } else if (e.keyCode === 76 && player === "playerTwo") {
      //   socket.emit('player_two_down', {game: gameId});
      // } else if (e.keyCode === 87 && player !== "") {
      //   axios.get(`http://localhost:3095/api/game/start/${gameId}`, option);
      // }
    };
    document.addEventListener('keydown', keyDownHandler, false);
  }, [player, id]);

  return (
    <PixiContainer>
      <Stage width={1000} height={500} options={{ antialias: true, backgroundColor: 0x365dff }}>
        <Rectangle x={0} y={player_one_y} width={15} height={100} fill={0xffffff} />
        <Rectangle x={985} y={player_two_y} width={15} height={100} fill={0xffffff} />
        {mapSelect === 1 ? (
          <Rectangle x={350} y={100} width={300} height={50} fill={0x263238} />
        ) : null}
        {mapSelect === 1 ? (
          <Rectangle x={350} y={350} width={300} height={50} fill={0x263238} />
        ) : null}
        <Circle x={ball_x} y={ball_y} radius={10} fill={0xffffff} />
      </Stage>
    </PixiContainer>
  );
};

export default GamePixiContainer;
