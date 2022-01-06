import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { TwoFactorContainer } from './style';
import { toast } from 'react-toastify';

const TwoFactor = () => {
  const history = useHistory();
  const onSubmitForm = useCallback((e) => {
    if (e.target.value) {
      axios
        .get(`/api/auth/qrlogin/${e.target.value}`, {
          withCredentials: true,
        })
        .then(() => {
          toast.success('Successfully authenticated', {
            autoClose: 4000,
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
          });
          setTimeout(() => {
            history.push('/home');
          }, 4000);
        })
        .catch((error) => {
          toast.error(error.message, {
            autoClose: 4000,
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
          });
        });
    }
  }, []);

  const onKeydownOTP = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSubmitForm(e);
        e.target.value = '';
      }
    },
    [onSubmitForm],
  );
  return (
    <TwoFactorContainer>
      <form onSubmit={onSubmitForm}>
        <TextField
          className="text-field"
          id="outlined-basic"
          label="OTP"
          variant="outlined"
          onKeyPress={onKeydownOTP}
          autoComplete="off"
        />
      </form>
    </TwoFactorContainer>
  );
};

export default TwoFactor;
