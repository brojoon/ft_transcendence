import React, { VFC, useCallback } from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import PowerIcon from '@mui/icons-material/Power';
import VoiceOverOffSharpIcon from '@mui/icons-material/VoiceOverOffSharp';
import SensorsIcon from '@mui/icons-material/Sensors';
import SensorsOffIcon from '@mui/icons-material/SensorsOff';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { IAllUser } from '@typings/db';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import getToken from '@utils/getToken';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Props {
  user: IAllUser;
}

const ChannelProfile: VFC<Props> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const onClickAppointAdmin = useCallback((e) => {
    e.preventDefault();
    axios.get(`/api/channels/giveAdmin/${id}/${user.userId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  }, []);
  return (
    <div
      style={{
        fontSize: '20px',
        width: '300px',
        height: '350px',
        fontWeight: 600,
        backgroundColor: '#1e1e1e',
        color: 'white',
        position: 'fixed',
        left: '-301px',
        boxShadow:
          '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)',
      }}
    >
      <div style={{ display: 'flex', borderBottom: '1px solid #3a3a3a' }}>
        <div>
          <Avatar
            src={user.profile}
            alt="Avatar"
            style={{
              border: '2px solid red',
              width: '40px',
              height: '40px',
              margin: '17px 15px 20px 20px',
            }}
          />
        </div>
        <div style={{ lineHeight: '70px' }}>{user.userId}</div>
        <div>
          <Button
            onClick={onClickAppointAdmin}
            style={{ color: '#002BC', fontWeight: 600, margin: '20px 0 0 40px' }}
            variant="text"
          >
            admin
          </Button>
        </div>
      </div>
      <div style={{ borderBottom: '1px solid #3a3a3a' }}>
        <div style={{ margin: '17px 15px 20px 20px', display: 'flex' }}>
          <EmojiEventsIcon style={{ fontSize: '40px' }} />
          <div style={{ marginLeft: '15px', lineHeight: '40px' }}>Win Count</div>
        </div>
        <div style={{ margin: '17px 15px 20px 20px', display: 'flex' }}>
          <EventBusyIcon style={{ fontSize: '40px' }} />
          <div style={{ marginLeft: '15px', lineHeight: '40px' }}>Loss Count</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <Button style={{ color: '#979797', fontWeight: 600 }} variant="text">
            profile
          </Button>
          <Button style={{ color: '#979797', fontWeight: 600 }} variant="text">
            message
          </Button>
        </div>
        <div>
          <Button style={{ color: '#979797', fontWeight: 600 }} variant="text">
            mute
          </Button>
          <Button style={{ color: '#979797', fontWeight: 600 }} variant="text">
            kick
          </Button>
          <Button style={{ color: '#979797', fontWeight: 600 }} variant="text">
            ban
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChannelProfile;
