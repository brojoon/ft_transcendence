import React, { VFC } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  onClickModalClose: (e: any) => void;
}

const ChannelInviteModal: VFC<Props> = ({ onClickModalClose }) => {
  return (
    <>
      <div
        onClick={onClickModalClose}
        style={{
          color: 'white',
          position: 'fixed',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 2000,
          backgroundColor: 'rgba(30, 30, 030, 0.5)',
        }}
      ></div>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '500px',
          height: '180px',
          backgroundColor: '#1e1e1e',
          color: '#979797',
          opacity: '1',
          border: '1px solid #1e1e1e',
          borderRadius: '3px',
          padding: '10px 20px 10px 20px',
          zIndex: 3000,
          transform: 'translate(-50%, -50%)',
          boxShadow:
            '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)',
        }}
      >
        <div style={{ display: 'flex', color: 'white', justifyContent: 'space-between' }}>
          <h2>Invite people to channel</h2>
          <IconButton aria-label="close" onClick={onClickModalClose} style={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default ChannelInviteModal;
