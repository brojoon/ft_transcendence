import React, { VFC, useCallback, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { IMemberList } from '@typings/db';
import fetcher from '@utils/fetcher';
import config from '@utils/config';
import { ChannelInviteModalBackground, ChannelInviteModalContainer } from './style';

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
      <ChannelInviteModalBackground onClick={onClickModalClose}></ChannelInviteModalBackground>
      <ChannelInviteModalContainer>
        <div className="invite-Modal-wrapper">
          <div className="invite-Modal-header">
            <h2>Invite people to channel</h2>
            <IconButton className="color-white" aria-label="close" onClick={onClickModalClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="invite-Modal-body">
            <TextField
              className="invite-Modal-input"
              value={inviteValue}
              onChange={onChangeInviteInput}
              id="input-with-icon-textfield"
              label="user"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    className="color-white"
                    position="start"
                    onChange={onChangeInviteInput}
                  >
                    <PersonRoundedIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <Button className="invite-Modal-button" variant="contained" onClick={onClickInviteBtn}>
              INVITE
            </Button>
          </div>
          {inviteError && <h3>invited the wrong user</h3>}
        </div>
      </ChannelInviteModalContainer>
    </>
  );
};

export default ChannelInviteModal;
