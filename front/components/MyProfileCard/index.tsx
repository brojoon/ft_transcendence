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
import { Link, useParams } from 'react-router-dom';

import { IUser } from '@typings/db';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

const MyProfileCard = () => {
  const { id } = useParams<{ id: string }>();
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Card
        variant="outlined"
        style={{
          backgroundColor: '#1e1e1e',
          color: 'white',
          border: '1px solid rgba(57, 57, 57, 0.5)',
          width: '100%',
          padding: '5px 10px 15px 10px',
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
            style={{ width: '130px', height: '130px', marginBottom: '20px' }}
          />
          <Typography variant="h5" component="div">
            {myData?.userId}
          </Typography>
          <span style={{ color: '#52575d', fontWeight: 500 }}>{myData?.username}</span>
        </CardContent>
        <CardActions
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Link
            to="/ft_transcendence/profile/setting"
            style={{ textDecoration: 'none', width: '100%' }}
          >
            <Button
              variant="contained"
              style={{
                width: '100%',
                height: '35px',
                backgroundColor: '#597aff',
                borderColor: '#597aff',
                fontWeight: 'bold',
              }}
            >
              SETTING&nbsp;
              <SettingsIcon />
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
};

export default MyProfileCard;
