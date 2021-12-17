import React, { useCallback, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import DriveFileRenameOutlineSharpIcon from '@mui/icons-material/DriveFileRenameOutlineSharp';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import config from '@utils/config';
import { FirstStepContainer, ErrorText } from './style';

const FirstStep = () => {
  const { data: myData, mutate: mutateMyData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const [isNicknameError, setIsNicknameError] = useState(0);
  const [nickname, setNickname] = useState(myData?.userId);

  const history = useHistory();

  const onChangeNickname = useCallback(
    (e) => {
      setIsNicknameError(0);
      setNickname(e.target.value);
    },
    [nickname],
  );

  if (myData?.username) history.push('/home');

  const onSubmitNickname = useCallback(
    (e) => {
      e.preventDefault();
      if (nickname) {
        if (nickname?.length < 1 || nickname?.length > 10) {
          setIsNicknameError(1);
          return;
        } else {
          axios
            .get(`/api/users/update-username/${nickname}`, config)
            .then((res) => {
              if (res.data === false) {
                setIsNicknameError(2);
              } else {
                mutateMyData().then(() => {
                  history.push('/home');
                });
              }
            })
            .catch(() => {
              setIsNicknameError(3);
            });
        }
      }
    },
    [nickname],
  );
  return (
    <FirstStepContainer>
      <div className="avatar-wrapper">
        <Avatar
          className="avatar"
          src={myData?.profile === 'pricture' ? undefined : myData?.profile}
          alt="Avatar"
        />
      </div>
      <b>{myData?.userId}</b>
      <div className="input-nickname-wrapper">
        <FormControl variant="standard">
          <Input
            className="input-nickname"
            onChange={onChangeNickname}
            value={nickname}
            placeholder="nickname"
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <DriveFileRenameOutlineSharpIcon className="input-icon " />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <ErrorText visible={`${isNicknameError ? 'visible' : 'hidden'}`}>
        {isNicknameError === 0 ? 'hidden' : ''}
        {isNicknameError ? isNicknameError === 1 && 'Nickname length must be between 1 and 10' : ''}
        {isNicknameError ? isNicknameError === 2 && 'This nickname is already using' : ''}
        {isNicknameError ? isNicknameError === 3 && 'Something is wrong with the server' : ''}
      </ErrorText>
      <div>
        <Button className="submit-btn" onClick={onSubmitNickname} variant="contained">
          FINALIZE REGISTRATION
        </Button>
      </div>
    </FirstStepContainer>
  );
};

export default FirstStep;
