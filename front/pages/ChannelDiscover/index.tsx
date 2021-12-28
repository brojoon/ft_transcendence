import ChannelBody from '@components/ChannelBody';
import ChannelHeader from '@components/ChannelHeader';
import React, { VFC } from 'react';
import { ChannelDiscoverContainer } from './style';
import ChannelLeftDrawBar from '@components/ChannelLeftDrawBar';
import { useMediaQuery } from 'react-responsive';

const ChannelDiscover = () => {
  return (
    <>
      <ChannelLeftDrawBar />
      <ChannelDiscoverContainer>
        <ChannelHeader content={'Discover some channels'} />
        <ChannelBody />
      </ChannelDiscoverContainer>
    </>
  );
};

export default ChannelDiscover;
