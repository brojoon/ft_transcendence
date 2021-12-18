import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Match from '@pages/Match';
import PingPong from '@pages/PingPong';
import History from '@pages/History';

const Game = () => {
  return (
    <Switch>
      <Route exact path="/game" component={Match} />
      <Route exact path="/game/ping-pong/:id" component={PingPong} />
      <Route exact path="/game/history/:id" component={History} />
    </Switch>
  );
};

export default Game;
