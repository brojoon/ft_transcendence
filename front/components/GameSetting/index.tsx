import React, { useState, useEffect, useCallback, VFC } from 'react';
import axios from 'axios';
import getSocket from '@utils/useSocket';
import 'regenerator-runtime';
import { useHistory, useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { GameSettingContainer } from './style';
const socket = getSocket();

const option = {
  withCredentials: true,
};

interface Props {
  player1Ready: number;
  player2Ready: number;
  mapSelect: number;
  setMapSelect: (e: any) => void;
}

const GameSetting: VFC<Props> = ({ player1Ready, player2Ready, mapSelect, setMapSelect }) => {
  const { id } = useParams<{ id: string }>();
  const [gameSpeed, setGameSpeed] = useState(2);
  const [gameCount, setGameCount] = useState(3);
  const [ballRandom, setBallRandom] = useState(0);

  const onChangeSpeed = useCallback(
    (e: any) => {
      if (player1Ready || player2Ready) return;
      socket.emit('changeGameSet', {
        gameId: id,
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
        gameId: id,
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
        gameId: id,
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
        gameId: id,
        speed: gameSpeed,
        set: gameCount,
        map: mapSelect,
        random: e.target.value,
      });
    },
    [player1Ready, player2Ready],
  );

  useEffect(() => {
    socket.emit('gameCheck', {
      gameId: id,
    });
  }, []);

  useEffect(() => {
    socket.emit('changeGameSet', {
      gameId: id,
      speed: gameSpeed,
      set: gameCount,
      map: mapSelect,
      random: ballRandom,
    });
  }, []);

  useEffect(() => {
    socket.on('gameSet', (set: any) => {
      setGameSpeed(set.length);
      setGameCount(set.game_set);
      setMapSelect(set.game_map);
      setBallRandom(set.random_map);
    });
    return () => {
      socket.off('gameSet');
    };
  }, []);

  return (
    <GameSettingContainer>
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
    </GameSettingContainer>
  );
};

export default GameSetting;
