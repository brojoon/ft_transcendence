import React from 'react';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import PowerIcon from '@mui/icons-material/Power';
import VoiceOverOffSharpIcon from '@mui/icons-material/VoiceOverOffSharp';
import SensorsIcon from '@mui/icons-material/Sensors';
import SensorsOffIcon from '@mui/icons-material/SensorsOff';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const ChannelProfile = () => {
  return (
    <div
      style={{
        width: '200px',
        height: '200px',
        backgroundColor: '#1e1e1e',
        color: 'white',
        position: 'fixed',
        left: '-201px',
      }}
    >
      <div style={{ display: 'flex', borderBottom: '#3a3a3a' }}>
        <div>Avatar</div>
        <div>name</div>
      </div>
      <div style={{ borderBottom: '#3a3a3a' }}>
        <div>
          <EmojiEventsIcon />
          Win Count
        </div>
        <div>
          <EventBusyIcon />
          Loss Count
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div>admin</div>
        <div>mute</div>
        <div>profile</div>
        <div>MESSAGE</div>
      </div>
    </div>
  );
};

export default ChannelProfile;
