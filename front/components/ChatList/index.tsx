import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const ChatList = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#272727' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Avatar
          </Typography>
          <Button
            sx={{
              backgroundColor: '#355DFF',
              color: 'white',
              width: '113',
              height: '36px',
              padding: '0 16px',
              fontWeight: 600,
            }}
          >
            CHALLENGE
            <span className="mdif786 mdi-sword-cross"></span>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ChatList;
