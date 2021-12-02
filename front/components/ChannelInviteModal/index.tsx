import React, { VFC, useCallback, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Button from '@mui/material/Button';
import getToken from '@utils/getToken';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { IMemberList } from '@typings/db';
import fetcher from '@utils/fetcher';
import config from '@utils/config';

interface Props {
  onClickModalClose: (e: any) => void;
  setChannelInviteModal: (e: any) => void;
}

const ChannelInviteModal: VFC<Props> = ({ setChannelInviteModal, onClickModalClose }) => {
  const { id } = useParams<{ id: string }>();
  const { data: memberList, mutate: memberListMutate } = useSWR<IMemberList[]>(
    `/api/channels/userList/${id}`,
    fetcher,
  );
  const [inviteValue, setInviteValue] = useState('');
  const [inviteError, setInviteError] = useState(false);
  const onClickInviteBtn = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .get(`/api/channels/invite/${id}/${inviteValue}`, config)
        .then(() => {
          memberListMutate();
          setInviteValue('');
          setChannelInviteModal(false);
        })
        .catch(() => {
          setInviteError(true);
        });
    },
    [inviteValue, setInviteValue],
  );
  const onChangeInviteInput = useCallback((e) => {
    e.preventDefault();
    setInviteError(false);
    setInviteValue(e.target.value);
  }, []);
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', color: 'white', justifyContent: 'space-between' }}>
            <h2>Invite people to channel</h2>
            <IconButton aria-label="close" onClick={onClickModalClose} style={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <TextField
              value={inviteValue}
              onChange={onChangeInviteInput}
              id="input-with-icon-textfield"
              label="user"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ color: 'white' }}
                    onChange={onChangeInviteInput}
                  >
                    <PersonRoundedIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              style={{ width: 'calc(100% - 130px)', color: 'white' }}
            />
            <Button
              variant="contained"
              onClick={onClickInviteBtn}
              style={{
                width: '110px',
                height: '42px',
                backgroundColor: '#597aff',
                borderColor: '#597aff',
                fontWeight: 'bold',
                marginTop: '10px',
              }}
            >
              INVITE
            </Button>
          </div>
          {inviteError && <h3 style={{ color: 'red', marginTop: '0' }}>invited the wrong user</h3>}
        </div>
      </div>
    </>
  );
};

export default ChannelInviteModal;
