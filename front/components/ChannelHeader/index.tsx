import React, { VFC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useParams } from 'react-router-dom';

interface Props {
  content: string;
}

const ChannelHeader: VFC<Props> = ({ content }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Box style={{ width: '100%' }}>
        <AppBar position="static" sx={{ bgcolor: '#272727' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {content}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default ChannelHeader;
