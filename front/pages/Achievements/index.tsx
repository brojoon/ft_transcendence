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
import FacebookIcon from '@mui/icons-material/Facebook';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ForumIcon from '@mui/icons-material/Forum';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import { IAchievement } from '@typings/db';

const Achievements = () => {
  const { data: friendCount } = useSWR<IAchievement>(`/api/friend/countFriend`, fetcher);
  const { data: DmListCount } = useSWR<IAchievement>(`/api/dms/getDmListNum`, fetcher);
  const { data: channelCount } = useSWR<IAchievement>(
    `/api/channels/achievement/numOfChannels`,
    fetcher,
  );

  return (
    <Box sx={{ flexGrow: 1 }} style={{ padding: '20px 20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Achievement
            Icon={ChatBubbleIcon}
            maxCount={5}
            curValue={channelCount}
            header={'Channels member'}
            condition={'Join 5 channels'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Achievement
            Icon={GroupsIcon}
            maxCount={10}
            curValue={friendCount}
            header={'Small group'}
            condition={'Have 10 friends'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Achievement
            Icon={RecordVoiceOverIcon}
            maxCount={30}
            curValue={DmListCount}
            header={'Chatterbox '}
            condition={'DM to 30 people'}
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
            Icon={ForumIcon}
            maxCount={60}
            curValue={channelCount}
            header={'Community member'}
            condition={'Join 60 channels'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Achievement
            Icon={SportsBaseballIcon}
            maxCount={100}
            curValue={DmListCount}
            header={'Chan Ho Park '}
            condition={'DM to 100 people'}
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
            maxCount={5}
            curValue={DmListCount}
            header={'You are not alone'}
            condition={'DM to 5 people'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Achievement
            Icon={FacebookIcon}
            maxCount={150}
            curValue={channelCount}
            header={'Addicted to social media'}
            condition={'Join 150 channels'}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Achievements;
