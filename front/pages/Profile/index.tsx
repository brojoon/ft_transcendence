import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import UserCard from '@components/UserCard';
import UserMatches from '@components/UserMatches';

const Profile = () => {
  return (
    <Box sx={{ flexGrow: 1 }} style={{ backgroundColor: '#121212', padding: '20px 50px' }}>
      <Grid container spacing={3}>
        <Grid item sm={12} md={3}>
          <UserCard />
        </Grid>
        <Grid item sm={12} md={6}>
          <UserCard />
        </Grid>
        <Grid item sm={12} md={3}>
          <UserCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
