import React, { useCallback, useState } from 'react';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import getToken from '@utils/getToken';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import TextField from '@mui/material/TextField';
import config from '@utils/config';

const TwoFactorSwitch = () => {
  const { data: isTwoFactor } = useSWR<Boolean>('/api/users/two-factor-status', fetcher);
  const [checked, setChecked] = useState(isTwoFactor);
  const [imgsrc, setImgsrc] = useState('');
  const [isQRModal, setisQRModal] = useState(false);
  const [OTPvalue, setOTPvalue] = useState('');

  const onSubmitOTPvalue = useCallback(
    (e) => {
      console.log(OTPvalue);
      if (e.key === 'Enter') {
        axios
          .get(`/api/auth/otpCodeCheck/${OTPvalue}`, config)
          .then((e) => {
            setOTPvalue('');
            if (e.data === true) {
              axios
                .get('/api/users/turn-on', config)
                .then(() => {
                  setChecked(true);
                  setisQRModal(false);
                })
                .catch(() => {});
            }
          })
          .catch(() => {});
      }
    },
    [OTPvalue],
  );

  const onChangeOTPinput = useCallback(
    (e) => {
      setOTPvalue(e.target.value);
      console.log(OTPvalue);
    },
    [OTPvalue],
  );

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
    console.log(checked);
    if (checked === true) {
      axios
        .get('/api/users/turn-off', config)
        .then(() => {})
        .catch(() => {
          setChecked(false);
        });
    }
    if (checked === false) {
      axios
        .get(`/api/auth/make-qrcode`, {
          withCredentials: true,
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((res) => {
          setImgsrc(
            window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] })),
          );
        })
        .catch(() => {
          setChecked(true);
        });
    }
  };

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
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              backgroundColor: 'rgba(30, 30, 030, 0.5)',
            }}
            onClick={onClickQRModal}
          ></div>
          <div
            style={{
              position: 'absolute',
              width: '500px',
              height: '550px',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2000,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#1e1e1e',
              boxShadow:
                '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)',
            }}
          >
            <IconButton style={{ color: 'white', marginLeft: '430px' }} onClick={onClickQRModal}>
              <CloseIcon />
            </IconButton>
            <img
              style={{ width: '400px', height: '400px', margin: '10px 45px 0 45px' }}
              src={imgsrc}
            />
            <TextField
              onKeyPress={onSubmitOTPvalue}
              onChange={onChangeOTPinput}
              value={OTPvalue}
              id="outlined-basic"
              label="OTP"
              variant="outlined"
              style={{ margin: '20px' }}
            />
          </div>
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
