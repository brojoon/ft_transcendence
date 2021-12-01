import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Switch, Route } from 'react-router-dom';
import Match from '@pages/Match';
import PingPong from '@pages/PingPong';
import History from '@pages/History';

const Game = () => {
  return (
    <Switch>
      <Route path="/game" exact={true} component={Match} />
      <Route path="/game/ping-pong/:id" exact={true} component={PingPong} />
      <Route path="/game/history/:id" exact={true} component={History} />
    </Switch>
    // <Box
    //   sx={{ display: 'flex' }}
    //   style={{
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     background: '#121212',
    //     color: 'white',
    //     width: '100%',
    //     height: '100vh',
    //   }}
    // >
    //   <CircularProgress style={{ color: 'white' }} />
    //   <h1>Waiting for opponent...</h1>
    // </Box>
  );
};

export default Game;
