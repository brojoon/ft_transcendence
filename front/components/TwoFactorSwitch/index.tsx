import React, { useCallback, useState } from 'react';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import TextField from '@mui/material/TextField';
import config from '@utils/config';
import { TwoFactorSwitchBack, TwoFactorSwitchContainer } from './style';

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
          // headers: {
          //   Authorization: `Bearer ${getToken()}`,
          // },
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
