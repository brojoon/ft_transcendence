import React from 'react';
import loadable from '@loadable/component';
import { Container } from './style';
import { Route, Switch } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

// import SocialSlider from '@pages/SocialSlider';
// import DirectMessage from '@pages/DirectMessage';
const SocialSlider = loadable(() => import('@pages/SocialSlider'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Social = () => {
  const isMobile = useMediaQuery({ maxWidth: 700 });
  return (
    <Container style={{ borderLeft: '1px solid #4f4f4f', margin: '0', padding: '0' }}>
      <Switch>
        <Route exact path="/social" component={SocialSlider} />
        <Route exact path="/social/dm/:id" component={DirectMessage} />
      </Switch>
    </Container>
  );
};

export default Social;
