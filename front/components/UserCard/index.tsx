import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import gravatar from 'gravatar';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Avatar
        src={gravatar.url('hyungjki', { s: '48px', d: 'retro' })}
        alt="Avatar"
        style={{ width: '120px', height: '120px', marginBottom: '25px' }}
      />
      <Typography variant="h5" component="div">
        hyungjki
      </Typography>
    </CardContent>
    <CardActions
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        variant="text"
        style={{ backgroundColor: '365dff', color: 'white', width: '85%', height: '32px' }}
      >
        <b>SETTINGS</b>
      </Button>
    </CardActions>
  </React.Fragment>
);

export default function UserCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card
        variant="outlined"
        style={{
          backgroundColor: '#1e1e1e',
          color: 'white',
          border: '1px solid rgba(57, 57, 57, 0.5)',
        }}
      >
        {card}
      </Card>
    </Box>
  );
}
