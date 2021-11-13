import React, { VFC } from 'react';
import Button from '@mui/material/Button';

interface Props {
  content: string;
  NoBtn: (e: any) => void;
  YesBtn: (e: any) => void;
}
const BasicModal: VFC<Props> = ({ content, NoBtn, YesBtn }) => {
  return (
    <div
      style={{
        color: 'white',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,

        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(30, 30, 030, 0.5)',
      }}
    >
      <div
        style={{
          width: '400px',
          height: '120px',
          backgroundColor: '#1e1e1e',
          color: '#979797',
          opacity: '1',
          border: '1px solid #1e1e1e',
          borderRadius: '3px',
          padding: '12px 20px 5px 20px',
        }}
      >
        <div>{content}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button onClick={NoBtn} style={{ color: '#979797' }} variant="text">
            NO
          </Button>
          <Button onClick={YesBtn} variant="text">
            YES
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicModal;
