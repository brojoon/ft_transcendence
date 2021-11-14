import React, { VFC } from 'react';
import Button from '@mui/material/Button';

interface Props {
  content: string;
  NoBtn: (e: any) => void;
  YesBtn: (e: any) => void;
}
const BasicModal: VFC<Props> = ({ content, NoBtn, YesBtn }) => {
  return (
    <>
      <div
        onClick={NoBtn}
        style={{
          color: 'white',
          position: 'absolute',
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
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '400px',
          height: '120px',
          backgroundColor: '#1e1e1e',
          color: '#979797',
          opacity: '1',
          border: '1px solid #1e1e1e',
          borderRadius: '3px',
          padding: '5px 20px 5px 20px',
          zIndex: 3000,
          transform: 'translate(-50%, -50%)',
          boxShadow:
            '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)',
        }}
      >
        <div>{content}</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
            fontWeight: 600,
          }}
        >
          <Button onClick={NoBtn} style={{ color: '#979797', fontWeight: 600 }} variant="text">
            NO
          </Button>
          <Button onClick={YesBtn} style={{ fontWeight: 600 }} variant="text">
            YES
          </Button>
        </div>
      </div>
    </>
  );
};

export default BasicModal;
