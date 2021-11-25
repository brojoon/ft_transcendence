import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Scrollbars from 'react-custom-scrollbars';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import StarIcon from '@mui/icons-material/Star';
import { Translate } from '@mui/icons-material';
import BusinessIcon from '@mui/icons-material/Business';
import Achievement from '@components/Achievement';
import SendIcon from '@mui/icons-material/Send';
import GroupsIcon from '@mui/icons-material/Groups';
import { IAchievement } from '@typings/db';

const Achievements = () => {
  const { data: friendCount } = useSWR<IAchievement>(`/api/friend/countFriend`, fetcher);
  const { data: DmListCount } = useSWR<IAchievement>(`/api/dms/getDmListNum`, fetcher);

  return (
    <Box sx={{ flexGrow: 1 }} style={{ padding: '20px 20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Achievement
            Icon={GroupsIcon}
            maxCount={3}
            curValue={friendCount}
            header={'Small group'}
            condition={'Have 3 friends'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Achievement
            Icon={BusinessIcon}
            maxCount={5}
            curValue={friendCount}
            header={'Businesses with 5 employees'}
            condition={'Have 5 friends'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Achievement
            Icon={StarIcon}
            maxCount={100}
            curValue={friendCount}
            header={'Star'}
            condition={'Have 100 friends'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Achievement
            Icon={SendIcon}
            maxCount={1}
            curValue={DmListCount}
            header={'My first DM!'}
            condition={'Start your first DM'}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Achievements;
