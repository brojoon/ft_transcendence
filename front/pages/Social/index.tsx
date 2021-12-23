import React from 'react';
import loadable from '@loadable/component';
import DMLeftDrawer from '@components/DMLeftDrawer';
import { Container } from './style';
import { Route, Switch } from 'react-router-dom';
// import DirectMessage from '@pages/DirectMessage';
// import SocialSlider from '@pages/SocialSlider';

const SocialSlider = loadable(() => import('@pages/SocialSlider'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Social = () => {
  return (
    <Container style={{ borderLeft: '1px solid #4f4f4f', margin: '0', padding: '0' }}>
      <DMLeftDrawer />
      <Switch>
        <Route exact path="/social" component={SocialSlider} />
        <Route exact path="/social/dm/:id" component={DirectMessage} />
      </Switch>
    </Container>
  );
};

export default Social;
