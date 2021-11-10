import React from 'react';

import DMLeftDrawer from '@components/DMLeftDrawer';
import { Container } from './style';
import { Route, Switch } from 'react-router-dom';
import DirectMessage from '@pages/DirectMessage';
import SocialSlider from '@pages/SocialSlider';

const Social = () => {
  return (
    <Container style={{ borderLeft: '1px solid #4f4f4f', margin: '0', padding: '0' }}>
      <DMLeftDrawer />
      <Switch>
        <Route exact path="/ft_transcendence/social" component={SocialSlider} />
        <Route path="/ft_transcendence/social/dm/:id" component={DirectMessage} />
      </Switch>
    </Container>
  );
};

export default Social;
