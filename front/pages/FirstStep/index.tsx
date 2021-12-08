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
  const [isNicknameError, setIsNicknameError] = useState(false);
  const [nickname, setNickname] = useState(myData?.userId);

  const history = useHistory();

  const onChangeNickname = useCallback(
    (e) => {
      setIsNicknameError(false);
      setNickname(e.target.value);
    },
    [nickname],
  );

  const onSubmitNickname = useCallback(
    (e) => {
      e.preventDefault();
      if (nickname) {
        if (nickname?.length === 0 || nickname?.length >= 20) {
          setIsNicknameError(true);
        } else {
          axios
            .get(`/api/users/update-username/${nickname}`, config)
            .then((res) => {
              if (res.data === false) {
                setIsNicknameError(true);
              } else {
                mutateMyData();
                history.push('/home');
              }
            })
            .catch(() => {
              setIsNicknameError(true);
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
        bad format or duplicated nickname
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
