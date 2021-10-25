import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Game = () => {
  return (
    <Box
      sx={{ display: 'flex' }}
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#121212',
        color: 'white',
        width: '100%',
        height: '100vh',
      }}
    >
      <CircularProgress style={{ color: 'white' }} />
      <h1>Waiting for opponent...</h1>
    </Box>
  );
};

export default Game;
