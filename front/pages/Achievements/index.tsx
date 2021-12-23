import React from 'react';
import Grid from '@mui/material/Grid';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import StarIcon from '@mui/icons-material/Star';
import BusinessIcon from '@mui/icons-material/Business';
import Achievement from '@components/Achievement';
import SendIcon from '@mui/icons-material/Send';
import GroupsIcon from '@mui/icons-material/Groups';
import FacebookIcon from '@mui/icons-material/Facebook';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ForumIcon from '@mui/icons-material/Forum';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ShieldIcon from '@mui/icons-material/Shield';
import SecurityIcon from '@mui/icons-material/Security';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import SchoolIcon from '@mui/icons-material/School';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import GavelIcon from '@mui/icons-material/Gavel';
import { IAchievement } from '@typings/db';
import { AchievementsContainer } from './style';

const Achievements = () => {
  const { data: friendCount } = useSWR<IAchievement>(`/api/friend/countFriend`, fetcher, {
    dedupingInterval: 10000,
  });
  const { data: DmListCount } = useSWR<IAchievement>(`/api/dms/getDmListNum`, fetcher, {
    dedupingInterval: 10000,
  });
  const { data: matchCount } = useSWR<IAchievement>(`/api/game/achievement/numOfFight`, fetcher, {
    dedupingInterval: 10000,
  });
  const { data: winCount } = useSWR<IAchievement>(`/api/game/achievement/numOfWin`, fetcher, {
    dedupingInterval: 10000,
  });
  const { data: loseCount } = useSWR<IAchievement>(`/api/game/achievement/numOfLose`, fetcher, {
    dedupingInterval: 10000,
  });
  const { data: channelCount } = useSWR<IAchievement>(
    `/api/channels/achievement/numOfChannels`,
    fetcher,
  );
  return (
    <AchievementsContainer>
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
            Icon={LocalPoliceIcon}
            maxCount={15}
            curValue={loseCount}
            header={'Captain America'}
            condition={'Lose 15 games'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Achievement
            Icon={LightbulbIcon}
            maxCount={5}
            curValue={matchCount}
            header={'Welcome newbie '}
            condition={'Match 5 times'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Achievement
            Icon={SchoolIcon}
            maxCount={30}
            curValue={matchCount}
            header={'Alumnus'}
            condition={'Match 30 times'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Achievement
            Icon={LocalDiningIcon}
            maxCount={5}
            curValue={winCount}
            header={'Warriors'}
            condition={'Win 5 games'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Achievement
            Icon={LocalFireDepartmentIcon}
            maxCount={15}
            curValue={winCount}
            header={'Fighter'}
            condition={'Win 15 games'}
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
            Icon={SendIcon}
            maxCount={5}
            curValue={DmListCount}
            header={'Paper Airplane'}
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

        <Grid item xs={12} sm={6} md={4}>
          <Achievement
            Icon={AirplanemodeActiveIcon}
            maxCount={300}
            curValue={matchCount}
            header={'Air Force Medal of honor'}
            condition={'Match 300 times'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Achievement
            Icon={ShieldIcon}
            maxCount={5}
            curValue={loseCount}
            header={'Shield'}
            condition={'Lose 5 games'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Achievement
            Icon={SecurityIcon}
            maxCount={100}
            curValue={loseCount}
            header={'Aegis'}
            condition={'Lose 100 games'}
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
            Icon={GavelIcon}
            maxCount={100}
            curValue={winCount}
            header={'Mjolnir'}
            condition={'Win 100 games'}
          />
        </Grid>
      </Grid>
    </AchievementsContainer>
  );
};

export default Achievements;
