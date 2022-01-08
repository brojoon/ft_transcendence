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
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import { IChannelList } from '@typings/db';
import fetcher from '@utils/fetcher';
import config from '@utils/config';
import { ProtectedRoomModalBack, ProtectedRoomModalContainer } from './style';
import { toast } from 'react-toastify';

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
      axios
        .post(
          `/api/channels/join/${channelPasswordRoomNumber}`,
          {
            password: PasswordValues.password,
          },
          config,
        )
        .then((response) => {
          setPasswordValues({
            password: '',
            showPassword: false,
          });
          setChannelPasswordModal(false);
          mutateAllChannelList();
          mutateChannelList().then(() => {
            history.push(`/channels/${channelPasswordRoomNumber}`);
          });
          setChannelPasswordRoomNumber('');
        })
        .catch((error) => {
          if (error.response.data.data.message === '아이디 혹은 비밀번호가 틀림')
            setPasswordError(true);
          else {
            toast.error(error.message, {
              autoClose: 4000,
              position: toast.POSITION.TOP_RIGHT,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              theme: 'colored',
            });
          }
        });
    },
    [PasswordValues, channelPasswordModal, channelPasswordRoomNumber, passwordError],
  );
  return (
    <>
      <ProtectedRoomModalBack onClick={onClickModalClose}></ProtectedRoomModalBack>
      <ProtectedRoomModalContainer>
        <div className="header">
          <h2>Unlock channel access password</h2>
          <IconButton className="close-icon" aria-label="close" onClick={onClickModalClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="body">
          <FormControl className="form-control" variant="standard">
            <InputLabel htmlFor="standard-adornment-password" className="input-label">
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
                    className="visibility-icon "
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {PasswordValues.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button className="join-btn" onClick={onSubmitPassword} variant="contained">
            JOIN
          </Button>
        </div>
        {passwordError && <span className="password-error-text">Password is wrong</span>}
      </ProtectedRoomModalContainer>
    </>
  );
};

export default ProtectedRoomModal;
