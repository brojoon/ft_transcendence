import React, { VFC } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';

interface Props {
  content: string;
  headerContent: string;
  NoBtn: (e: any) => void;
  YesBtn: (e: any) => void;
}
const BasicModal: VFC<Props> = ({ content, NoBtn, YesBtn, headerContent }) => {
  return (
    <>
      <div
        onClick={NoBtn}
        style={{
          color: 'white',
          position: 'fixed',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 6000,
          backgroundColor: 'rgba(30, 30, 030, 0.5)',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '400px',
          backgroundColor: '#1e1e1e',
          color: '#979797',
          opacity: '1',
          border: '1px solid #1e1e1e',
          borderRadius: '4px',

          zIndex: 7000,
          transform: 'translate(-50%, -50%)',
          boxShadow:
            '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fec107',
          }}
        >
          <div
            style={{ margin: '1px 10px 0 8px', fontSize: '20px', color: 'white', display: 'flex' }}
          >
            <ErrorIcon style={{ color: 'white' }} />
            <div style={{ margin: '0 0 0 4px', lineHeight: '22px' }}>{headerContent}</div>
          </div>
          <div>
            <IconButton style={{ color: 'white' }} onClick={NoBtn}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div style={{ margin: '10px' }}>{content}</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '15px',
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
