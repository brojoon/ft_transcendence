import LeftSideBar from '@components/LeftSideBar';
import FullWidthGrid from '@pages/Channel';
import React from 'react';
import { Container } from './style';

const ft_transcendence = () => {
  return (
    <Container>
      <LeftSideBar />
      <FullWidthGrid />
    </Container>
  );
};

export default ft_transcendence;
