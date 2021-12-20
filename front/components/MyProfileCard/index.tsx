import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link, useParams } from 'react-router-dom';
import { IUser } from '@typings/db';
import { MyProfileCardContainer, UserAvatar } from './style';
import { SocketContext } from '@store/socket';
import axios from 'axios';

const MyProfileCard = () => {
  const { id } = useParams<{ id: string }>();
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher);
  const { data: isAdmin } = useSWR<boolean>('/api/users/checkAdminOrModerator', fetcher);
  const { onlineList, onGameList } = useContext(SocketContext);
  let isState = 0;
  if (onGameList && myData && onGameList[myData.userId]) isState = 2;
  if (isState === 0 && onlineList && myData) {
    onlineList.map((onlineUser) => {
      if (onlineUser.userId === myData.userId) isState = 1;
    });
  }

  return (
    <MyProfileCardContainer>
      <Card className="card" variant="outlined">
        <CardContent className="card-content">
          <UserAvatar
            isState={`${
              isState
                ? isState === 1
                  ? '2px solid #1ed14b'
                  : '2px solid #FFD400'
                : '2px solid #d63638'
            }`}
            src={myData?.profile}
            alt="Avatar"
          />
          <Typography variant="h5" component="div">
            {myData?.userId}
          </Typography>
          <span>{myData?.username}</span>
        </CardContent>
        <CardActions className="card-actions">
          <Link to="/profile/setting" className="setting-link">
            <Button className="setting-btn" variant="contained">
              SETTING&nbsp;
              <SettingsIcon />
            </Button>
          </Link>
        </CardActions>
        {isAdmin ? (
          <CardActions className="card-actions">
            <Link to="/admin" className="setting-link">
              <Button className="admin-btn" variant="contained">
                ADMIN&nbsp;
                <ManageAccountsIcon />
              </Button>
            </Link>
          </CardActions>
        ) : (
          <CardActions className="card-actions">
            <Button className="admin-block-btn" variant="contained" disabled>
              ADMIN&nbsp;
              <ManageAccountsIcon />
            </Button>
          </CardActions>
        )}
      </Card>
    </MyProfileCardContainer>
  );
};

export default MyProfileCard;
