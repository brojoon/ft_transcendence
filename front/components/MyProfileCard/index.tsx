import React, { useContext, useCallback, useEffect, useState } from 'react';
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
import { MyProfileCardContainer, UserAvatar } from './style';
import { SocketContext } from '@store/socket';

const MyProfileCard = () => {
  const { id } = useParams<{ id: string }>();
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { onlineList, onGameList } = useContext(SocketContext);
  const [isState, setIsState] = useState(0);

  const getState = useCallback(() => {
    setIsState(0);
    onGameList?.map((onGameUser) => {
      if (onGameUser.userId === myData?.userId) setIsState(2);
    });

    onlineList?.map((onlineUser) => {
      if (onlineUser.userId === myData?.userId) setIsState(1);
    });
  }, [onGameList, onlineList, myData]);

  useEffect(() => {
    if (myData && onGameList !== undefined && onlineList !== undefined) {
      getState();
    }
  }, [myData, onGameList, onlineList]);

  return (
    <MyProfileCardContainer>
      <Card className="card" variant="outlined">
        <CardContent className="card-content">
          <UserAvatar
            isState={
              isState
                ? isState === 1
                  ? '2px solid #1ed14b'
                  : '2px solid #FFD400'
                : '2px solid #d63638'
            }
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
      </Card>
    </MyProfileCardContainer>
  );
};

export default MyProfileCard;
