import React, { VFC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ChannelHeaderContainer } from './style';

import { useParams } from 'react-router-dom';

interface Props {
  content: string;
}

const ChannelHeader: VFC<Props> = ({ content }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <ChannelHeaderContainer>
        <AppBar className="app-bar" position="static">
          <Toolbar>
            <Typography className="header-text" variant="h6" component="div">
              {content}
            </Typography>
          </Toolbar>
        </AppBar>
      </ChannelHeaderContainer>
    </>
  );
};

export default ChannelHeader;
