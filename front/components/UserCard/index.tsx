import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import gravatar from 'gravatar';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import SettingsIcon from '@mui/icons-material/Settings';

import { IUser } from '@typings/db';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

const UserCard = () => {
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card
        variant="outlined"
        style={{
          backgroundColor: '#1e1e1e',
          color: 'white',
          border: '1px solid rgba(57, 57, 57, 0.5)',
          width: '400px',
          height: '400px',
        }}
      >
        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={myData?.profile}
            alt="Avatar"
            style={{ width: '120px', height: '120px', marginBottom: '25px' }}
          />
          <Typography variant="h5" component="div">
            {myData?.userId}
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
          <h4 style={{ marginTop: '0' }}>{myData?.username}</h4>
          <Button
            variant="contained"
            style={{
              width: '300px',
              height: '35px',
              backgroundColor: '#597aff',
              borderColor: '#597aff',
              fontWeight: 'bold',
              margin: '10px 0',
            }}
          >
            SETTING&nbsp;
            <SettingsIcon />
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default UserCard;
