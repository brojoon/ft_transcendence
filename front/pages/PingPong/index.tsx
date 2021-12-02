import * as PIXI from 'pixi.js';
import { Stage, PixiComponent } from '@inlet/react-pixi';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import getSocket from '@utils/useSocket';
import getCookie from '@utils/cookie';
import 'regenerator-runtime';
import { useHistory } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useInput from '@hooks/useInput';
import { IUser, IAllUser } from '@typings/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Translate } from '@mui/icons-material';

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

//PIXI세팅
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
  headers: {
    Authorization: `Bearer ${getCookie('ts_token', 1)}`,
  },
  withCredentials: true,
};

const PingPong = (data: any) => {
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: allUserList } = useSWR<IAllUser[]>('/api/users/alluser', fetcher);
  const gameId = data.match.params.id;
  const [ball_x, setBallX] = useState(495);
  const [ball_y, setBallY] = useState(245);
  const [player_one_y, setPlayOneY] = useState(200);
  const [player_two_y, setPlayTwoY] = useState(200);
  const [player1Ready, setPlay1Ready] = useState(0);
  const [player2Ready, setPlay2Ready] = useState(0);
  const [user1Point, setUser1Point] = useState(0);
  const [user2Point, setUser2Point] = useState(0);
  const [userId, setUserId] = useState('');
  const [player, setPlayer] = useState('');
  const [isGameStart, setIsGameStart] = useState(false);

  const [opponent, setOpponent] = useState('');
  const [opponentProfile, setOpponentProfile] = useState('');

  const [gameSpeed, setGameSpeed] = useState(2);
  const [gameCount, setGameCount] = useState(3);
  const [mapSelect, setMapSelect] = useState(0);
  const [ballRandom, setBallRandom] = useState(0);

  const history = useHistory();

  useEffect(() => {
    if (opponent) {
      allUserList?.map((user) => {
        if (user.userId === opponent) {
          setOpponentProfile(user.profile);
        }
      });
    }
  }, [opponent]);

  useEffect(() => {
    socket.emit('changeGameSet', {
      gameId: gameId,
      speed: gameSpeed,
      set: gameCount,
      map: mapSelect,
      random: ballRandom,
    });
  }, []);

  const onChangeSpeed = useCallback(
    (e: any) => {
      if (player1Ready || player2Ready) return;
      socket.emit('changeGameSet', {
        gameId: gameId,
        speed: e.target.value,
        set: gameCount,
        map: mapSelect,
        random: ballRandom,
      });
    },
    [player1Ready, player2Ready],
  );

  const onChangeMapSelect = useCallback(
    (e: any) => {
      if (player1Ready || player2Ready) return;
      socket.emit('changeGameSet', {
        gameId: gameId,
        speed: gameSpeed,
        set: gameCount,
        map: e.target.value,
        random: ballRandom,
      });
    },
    [player1Ready, player2Ready],
  );

  const onChangeGameCount = useCallback(
    (e: any) => {
      if (player1Ready || player2Ready) return;
      socket.emit('changeGameSet', {
        gameId: gameId,
        speed: gameSpeed,
        set: e.target.value,
        map: mapSelect,
        random: ballRandom,
      });
    },
    [player1Ready, player2Ready],
  );

  const onChangeBallRandom = useCallback(
    (e: any) => {
      if (player1Ready || player2Ready) return;
      socket.emit('changeGameSet', {
        gameId: gameId,
        speed: gameSpeed,
        set: gameCount,
        map: mapSelect,
        random: e.target.value,
      });
    },
    [player1Ready, player2Ready],
  );

  // 내정보 받아오고 => 게임 기록 가져오고 => 내정보와 userId 매칭후 player one인지 two인지 확인
  // playerOne인 경우 게임 리셋하고 게임포인트 집어 넣기
  useEffect(() => {
    async function getGameInfo() {
      let temUserId = '';
      // 내정보 받기
      await axios.get(`http://localhost:3095/api/users`, option).then((res: any) => {
        temUserId = res.data.userId;
        socket.emit('login', { userId: temUserId, Dms: [], channels: [] });
      });
      // history와 비교 (진행상태 확인 =>  완료된 게임이면 결과 창으로 바로 이동)
      await axios
        .get(`http://localhost:3095/api/game/history/${gameId}`, option)
        .then((res: any) => {
          if (res.data.state === 2) history.push(`/game/history/${gameId}`);
          setUserId(temUserId);
          if (temUserId === res.data.userId1) {
            setPlayer('playerOne');
            setOpponent(res.data.userId2);
            setPlay2Ready(res.data.playerTwoJoin);
            socket.emit('game', {
              gameId: gameId,
              player: 'playerOne',
              player1Ready: 0,
              player2Ready: res.data.playerTwoJoin,
            });
          } else if (temUserId === res.data.userId2) {
            setPlayer('playerTwo');
            setPlay1Ready(res.data.playerOneJoin);
            setOpponent(res.data.userId1);

            socket.emit('game', {
              gameId: gameId,
              player: 'playerTwo',
              player1Ready: res.data.playerOneJoin,
              player2Ready: 0,
            });
          } else {
            socket.emit('game', {
              gameId: gameId,
              player: '',
              player1Ready: res.data.playerOneJoin,
              player2Ready: res.data.playerTwoJoin,
            });
          }
          socket.emit('changeGameSet', { gameId: gameId, check: 'check' });
          socket.emit('gamePoint', {
            gameId: gameId,
            user1Point: res.data.user1Point,
            user2Point: res.data.user2Point,
          });
        });
    }
    if (myData?.userId) getGameInfo();
  }, [gameId, myData]);

  useEffect(() => {
    socket.on('gameInfo', (gameInfo: any) => {
      setIsGameStart(true);
      setBallX(gameInfo.ball_x);
      setBallY(gameInfo.ball_y);
    });
  }, []);

  useEffect(() => {
    socket.on('point', (point: any) => {
      setUser1Point(point.player1);
      setUser2Point(point.player2);
    });
  }, []);

  useEffect(() => {
    socket.on('end', () => {
      history.push(`/game/history/${gameId}`);
    });
  }, [gameId]);

  useEffect(() => {
    socket.on('ready', (ready: any) => {
      setPlay1Ready(ready.player1);
      setPlay2Ready(ready.player2);
    });
  }, []);

  useEffect(() => {
    socket.on('player_one', (playerInfo: any) => {
      setPlayOneY(playerInfo.player_one_y);
    });
  }, []);

  useEffect(() => {
    socket.on('player_two', (playerInfo: any) => {
      setPlayTwoY(playerInfo.player_two_y);
    });
  }, []);

  useEffect(() => {
    socket.on('gameSet', (set: any) => {
      setGameSpeed(set.length);
      setGameCount(set.game_set);
      setMapSelect(set.game_map);
      setBallRandom(set.random_map);
    });
  }, []);

  useEffect(() => {
    const keyDownHandler = (e: any) => {
      // 잠시 이걸 이용
      if (e.keyCode === 87 && player !== '') {
        socket.emit('player_one_up', { game: gameId });
      } else if (e.keyCode === 83 && player !== '') {
        socket.emit('player_one_down', { game: gameId });
      } else if (e.keyCode === 79 && player !== '') {
        socket.emit('player_two_up', { game: gameId });
      } else if (e.keyCode === 76 && player !== '') {
        socket.emit('player_two_down', { game: gameId });
      } else if (e.keyCode === 84 && player !== '') {
        axios.get(`http://localhost:3095/api/game/start/${gameId}`, option);
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
  }, [player, gameId]);

  const readyPlayer1 = () => {
    if (player === 'playerOne' && player1Ready === 0) {
      socket.emit('gameReady', {
        gameId: gameId,
        player: 1,
        userId: myData?.userId,
      });
    }
  };
  const readyPlayer2 = () => {
    if (player === 'playerTwo' && player2Ready === 0) {
      socket.emit('gameReady', {
        gameId: gameId,
        player: 2,
        userId: myData?.userId,
      });
    }
  };

  const changeGameSet = async () => {
    if (player !== '') await axios.get(`http://localhost:3095/api/game/start/${gameId}`, option);
    setIsGameStart(true);
  };

  return (
    <div
      style={{
        backgroundColor: '#424242',
        margin: 0,
        width: '100%',
        height: '100vh',
        color: 'white',
      }}
    >
      {isGameStart && (
        <div
          style={{
            border: '5px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stage width={1000} height={500} options={{ antialias: true, backgroundColor: 0x000000 }}>
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
        </div>
      )}
      {!isGameStart && (
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">게임판수</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gameCount}
              label="게임판수"
              onChange={onChangeGameCount}
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">맵선택</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mapSelect}
              label="맵선택"
              onChange={onChangeMapSelect}
            >
              <MenuItem value={0}>Normal</MenuItem>
              <MenuItem value={1}>obstacle</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Speed</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gameSpeed}
              label="Speed"
              onChange={onChangeSpeed}
            >
              <MenuItem value={2}>1단계</MenuItem>
              <MenuItem value={3}>2단계</MenuItem>
              <MenuItem value={4}>3단계</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">ballRandom</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ballRandom}
              label="ballRandom"
              onChange={onChangeBallRandom}
            >
              <MenuItem value={0}>Normal</MenuItem>
              <MenuItem value={1}>Random</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
      {!isGameStart && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '20px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div>
              <Avatar
                src={player === 'playerOne' ? myData?.profile : opponentProfile}
                alt="Avatar"
                style={{ width: '300px', height: '300px' }}
              />
            </div>
            <div style={{ margin: '10px 0' }}>
              {player === 'playerOne' ? myData?.userId + '(나)' : opponent + '(상대편)'}
            </div>
            <div>
              {player === 'playerOne' ? (
                player1Ready === 0 ? (
                  <Button variant="contained" onClick={readyPlayer1}>
                    ready
                  </Button>
                ) : (
                  <Button variant="contained" disabled style={{ color: 'white' }}>
                    완료
                  </Button>
                )
              ) : player1Ready === 0 ? (
                <Button variant="contained" disabled style={{ color: 'white' }}>
                  준비중..
                </Button>
              ) : (
                <Button variant="contained" disabled style={{ color: 'white' }}>
                  완료
                </Button>
              )}
            </div>
          </div>

          <div
            style={{
              fontWeight: 700,
              fontSize: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div>VS</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div>
              <Avatar
                src={player === 'playerTwo' ? myData?.profile : opponentProfile}
                alt="Avatar"
                style={{ width: '300px', height: '300px' }}
              />
            </div>
            <div style={{ margin: '10px 0' }}>
              {player === 'playerTwo' ? myData?.userId + '(나)' : opponent + '(상대편)'}
            </div>
            <div>
              {player === 'playerTwo' ? (
                player2Ready === 0 ? (
                  <Button variant="contained" onClick={readyPlayer2}>
                    ready
                  </Button>
                ) : (
                  <Button variant="contained" disabled style={{ color: 'white' }}>
                    완료
                  </Button>
                )
              ) : player2Ready === 0 ? (
                <Button variant="contained" disabled style={{ color: 'white' }}>
                  준비중..
                </Button>
              ) : (
                <Button variant="contained" disabled style={{ color: 'white' }}>
                  완료
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px' }}>
        {isGameStart && (
          <div style={{ display: 'flex' }}>
            {(player === 'playerOne' ? myData?.userId : opponent) + ' Point'}
            <EventNoteIcon style={{ fontSize: '27px' }} /> {': [ ' + user1Point + ' ] '}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: `${isGameStart ? '' : '100%'}`,
          }}
        >
          {player1Ready && player2Ready ? (
            <Button variant="contained" onClick={changeGameSet} style={{ color: 'white' }}>
              게임시작
            </Button>
          ) : (
            <Button variant="contained" disabled style={{ color: 'white' }}>
              게임시작
            </Button>
          )}
          <div style={{ marginTop: '5px' }}> (모두 레디 시 시작됨) [key : t] </div>
          <div>(up: w / down: s)</div>
          {player === '' && <div>관전중...</div>}
        </div>
        {isGameStart && (
          <div style={{ display: 'flex' }}>
            {(player === 'playerTwo' ? myData?.userId : opponent) + ' Point'}
            <EventNoteIcon style={{ fontSize: '27px' }} /> {': [ ' + user2Point + ' ] '}
          </div>
        )}
      </div>
    </div>
  );
};

export default PingPong;
