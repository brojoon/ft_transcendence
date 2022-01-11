import React, { useCallback, useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import TextField from '@mui/material/TextField';
import config from '@utils/config';
import { TwoFactorSwitchBack, TwoFactorSwitchContainer } from './style';
import { toast } from 'react-toastify';

const TwoFactorSwitch = () => {
  const { data: isTwoFactor } = useSWR<boolean>('/api/users/two-factor-status', fetcher);
  const [checked, setChecked] = useState(false);
  const [imgsrc, setImgsrc] = useState('');
  const [isQRModal, setisQRModal] = useState(false);
  const [OTPvalue, setOTPvalue] = useState('');

  useEffect(() => {
    if (isTwoFactor) {
      setChecked(isTwoFactor);
    }
  }, [isTwoFactor]);

  const onSubmitOTPvalue = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        axios
          .get(`/api/auth/otpCodeCheck/${OTPvalue}`, config)
          .then((e) => {
            if (e.data === true) {
              setOTPvalue('');
              axios
                .get('/api/users/turn-on', config)
                .then(() => {
                  toast.success('Successfully authenticated', {
                    autoClose: 3000,
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored',
                  });
                  setChecked(true);
                  setisQRModal(false);
                })
                .catch((error) => {
                  toast.error(error.message, {
                    autoClose: 3000,
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored',
                  });
                });
            } else {
              toast.error('Authenticate failed', {
                autoClose: 3000,
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored',
              });
            }
          })
          .catch((error) => {
            toast.error(error.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_RIGHT,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              theme: 'colored',
            });
          });
      }
    },
    [OTPvalue],
  );

  const onChangeOTPinput = useCallback(
    (e) => {
      setOTPvalue(e.target.value);
    },
    [OTPvalue],
  );

  const handleChange = useCallback((event: any) => {
    if (event.target.checked === false) {
      axios
        .get('/api/users/turn-off', config)
        .then(() => {
          toast.success('Successfully turned off authentication', {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
          });
          setChecked(false);
        })
        .catch((error) => {
          toast.error(error.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
          });
          setChecked(true);
        });
    }
    if (event.target.checked === true) {
      axios
        .get(`/api/auth/make-qrcode`, {
          withCredentials: true,
          responseType: 'blob',
          // headers: {
          //   Authorization: `Bearer ${getToken()}`,
          // },
        })
        .then((res) => {
          setImgsrc(
            window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] })),
          );
          setChecked(true);
        })
        .catch((error) => {
          toast.error(error.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
          });
          setChecked(false);
        });
    }
  }, []);

  const onClickQRModal = useCallback(() => {
    if (checked) {
      setChecked(false);
      setisQRModal(false);
    } else setisQRModal(true);
  }, [isQRModal, checked]);

  return (
    <>
      {isQRModal && checked && (
        <>
          <TwoFactorSwitchBack onClick={onClickQRModal}></TwoFactorSwitchBack>
          <TwoFactorSwitchContainer>
            <IconButton className="close-icon" onClick={onClickQRModal}>
              <CloseIcon />
            </IconButton>
            <img className="qr-img" src={imgsrc} />
            <TextField
              className="text-field"
              onKeyPress={onSubmitOTPvalue}
              onChange={onChangeOTPinput}
              value={OTPvalue}
              id="outlined-basic"
              label="OTP"
              variant="outlined"
              autoComplete="off"
            />
          </TwoFactorSwitchContainer>
        </>
      )}
      <Switch
        onClick={onClickQRModal}
        checked={checked ? true : false}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </>
  );
};

export default TwoFactorSwitch;
