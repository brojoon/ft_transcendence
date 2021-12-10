import React from 'react';
import Grid from '@mui/material/Grid';
import MyProfileCard from '@components/MyProfileCard';
import UserProfileCard from '@components/UserProfileCard';
import UserMatches from '@components/UserMatches';
import UserStatistics from '@components/UserStatistics';
import UserFriendCard from '@components/UserFriendCard';
import UserProfileAchieveCard from '@components/UserProfileAchieveCard';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import { IUser, IAllUser } from '@typings/db';
import useSWR from 'swr';
import { ProfileContainer } from './style';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { data: alluser } = useSWR<IAllUser[], any[]>('/api/users/alluser', fetcher);
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  let UserData;
  if (id && id !== myData?.userId) {
    alluser?.map((user) => {
      if (user.userId === id) UserData = user;
    });
  }

  return (
    <ProfileContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={3}>
          {id === undefined || id === myData?.userId || !UserData ? (
            <MyProfileCard />
          ) : (
            <UserProfileCard UserData={UserData} />
          )}
          {id === undefined || id === myData?.userId || !UserData ? (
            <UserStatistics userData={myData} />
          ) : (
            <UserStatistics userData={UserData} />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          {id === undefined || id === myData?.userId || !UserData ? (
            <UserMatches userData={myData} />
          ) : (
            <UserMatches userData={UserData} />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          {id === undefined || id === myData?.userId || !UserData ? (
            <UserProfileAchieveCard userData={myData} />
          ) : (
            <UserProfileAchieveCard userData={UserData} />
          )}
          {id === undefined || id === myData?.userId || !UserData ? (
            <UserFriendCard userData={myData} />
          ) : (
            <UserFriendCard userData={UserData} />
          )}
        </Grid>
      </Grid>
    </ProfileContainer>
  );
};

export default Profile;
