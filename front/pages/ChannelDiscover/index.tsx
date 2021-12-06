import ChannelBody from '@components/ChannelBody';
import ChannelHeader from '@components/ChannelHeader';
import React, { VFC } from 'react';
import { ChannelDiscoverContainer } from './style';

const ChannelDiscover = () => {
  return (
    <ChannelDiscoverContainer>
      <ChannelHeader content={'Discover some channels'} />
      <ChannelBody />
    </ChannelDiscoverContainer>
  );
};

export default ChannelDiscover;
