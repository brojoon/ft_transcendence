import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Match from '@pages/Match';
import PingPong from '@pages/PingPong';
import History from '@pages/History';
import { Socket } from 'socket.io-client';

const Game = () => {
  return (
    <Switch>
      <Route path="/game" exact={true} component={Match} />
      <Route path="/game/ping-pong/:id" exact={true} component={PingPong} />
      <Route path="/game/history/:id" exact={true} component={History} />
    </Switch>
  );
};

export default Game;
