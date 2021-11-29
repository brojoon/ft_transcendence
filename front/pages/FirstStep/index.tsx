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
import getToken from '@utils/getToken';
import { useHistory } from 'react-router-dom';

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
            .get(`/api/users/update-username/${nickname}`, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            })
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
    <div
      style={{
        display: 'flex',
        color: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        fontWeight: 700,
        fontSize: '22px',
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        <Avatar
          src={myData?.profile === 'pricture' ? undefined : myData?.profile}
          alt="Avatar"
          style={{ width: '150px', height: '150px' }}
        />
      </div>
      <b>{myData?.userId}</b>
      <div style={{ margin: '10px 0x' }}>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">type nickname...</InputLabel>
          <Input
            onChange={onChangeNickname}
            value={nickname}
            style={{ color: 'white' }}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <DriveFileRenameOutlineSharpIcon
                  style={{ color: 'black', backgroundColor: 'white' }}
                />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div
        style={{
          color: 'red',
          marginBottom: '35px',
          fontSize: '14px',
          fontWeight: 500,
          visibility: `${isNicknameError ? 'visible' : 'hidden'}`,
        }}
      >
        bad format or duplicated nickname
      </div>
      <div>
        <Button
          onClick={onSubmitNickname}
          variant="contained"
          style={{
            height: '35px',
            backgroundColor: '#597aff',
            borderColor: '#597aff',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
          }}
        >
          FINALIZE REGISTRATION
        </Button>
      </div>
    </div>
  );
};

export default FirstStep;
