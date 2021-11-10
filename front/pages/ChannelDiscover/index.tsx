import ChannelBody from '@components/ChannelBody';
import ChannelHeader from '@components/ChannelHeader';
import React, { VFC } from 'react';
import { IChannelList } from '@typings/db';

const ChannelDiscover = () => {
  return (
    <div style={{ width: '100%' }}>
      <ChannelHeader content={'Discover some channels'} />
      <ChannelBody />
    </div>
  );
};

export default ChannelDiscover;
