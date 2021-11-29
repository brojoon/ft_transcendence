import React, { VFC, useCallback, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import getToken from '@utils/getToken';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import { IChannelList } from '@typings/db';
import fetcher from '@utils/fetcher';

interface Props {
  channelPasswordModal: boolean;
  setChannelPasswordModal: any;
  channelPasswordRoomNumber: string;
  setChannelPasswordRoomNumber: any;
}

const ProtectedRoomModal: VFC<Props> = ({
  channelPasswordModal,
  setChannelPasswordModal,
  channelPasswordRoomNumber,
  setChannelPasswordRoomNumber,
}) => {
  const { data: myChannelList, mutate: mutateChannelList } = useSWR<IChannelList[]>(
    '/api/channels/myChannelList',
    fetcher,
  );
  const { data: allChannelList, mutate: mutateAllChannelList } = useSWR<IChannelList[]>(
    `/api/channels/allChannelList`,
    fetcher,
  );
  const [PasswordValues, setPasswordValues] = useState({
    password: '',
    showPassword: false,
  });
  const [passwordError, setPasswordError] = useState(false);

  const history = useHistory();

  const handleClickShowPassword = useCallback(() => {
    setPasswordValues({
      ...PasswordValues,
      showPassword: !PasswordValues.showPassword,
    });
  }, [PasswordValues, setPasswordValues]);
  const handleChange = useCallback(
    (prop: any) => (event: any) => {
      setPasswordValues({ ...PasswordValues, [prop]: event.target.value });
      setPasswordError(false);
    },
    [PasswordValues, setPasswordValues, passwordError, setPasswordError],
  );
  const handleMouseDownPassword = useCallback((event: any) => {
    event.preventDefault();
  }, []);

  const onClickModalClose = useCallback(
    (e) => {
      e.preventDefault();
      setChannelPasswordModal(false);
      setPasswordValues({
        password: '',
        showPassword: false,
      });
    },
    [channelPasswordModal, setChannelPasswordModal],
  );

  const onSubmitPassword = useCallback(
    (e) => {
      e.preventDefault();
      console.log(PasswordValues);
      axios
        .post(
          `/api/channels/join/${channelPasswordRoomNumber}`,
          {
            password: PasswordValues.password,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          },
        )
        .then((response) => {
          setPasswordValues({
            password: '',
            showPassword: false,
          });
          setChannelPasswordModal(false);
          mutateChannelList();
          mutateAllChannelList();

          history.push(`/channels/${channelPasswordRoomNumber}`);
          setChannelPasswordRoomNumber('');
        })
        .catch((error) => {
          console.log(error);
          setPasswordError(true);
        });
    },
    [PasswordValues, channelPasswordModal, channelPasswordRoomNumber, passwordError],
  );
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
          <h2>Unlock channel access password</h2>
          <IconButton aria-label="close" onClick={onClickModalClose} style={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </div>
        <div style={{ display: 'flex' }}>
          <FormControl sx={{ width: '100%', color: 'white', marginTop: '15px' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password" style={{ color: 'white' }}>
              What is the password?
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={PasswordValues.showPassword ? 'text' : 'password'}
              value={PasswordValues.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    style={{ color: 'white' }}
                  >
                    {PasswordValues.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            onClick={onSubmitPassword}
            variant="contained"
            style={{
              width: '120px',
              height: '45px',
              backgroundColor: '#597aff',
              borderColor: '#597aff',
              fontWeight: 'bold',
              margin: '20px 0 0 10px',
            }}
          >
            JOIN
          </Button>
        </div>
        {passwordError && <span style={{ color: 'red', fontWeight: 600 }}>passwordError</span>}
      </div>
    </>
  );
};

export default ProtectedRoomModal;
