import * as React from 'react';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import getToken from '@utils/getToken';

export default function TwoFactorSwitch() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
    console.log(checked);
    if (checked === false) {
      axios
        .get(`/api/auth/make-qrcode`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  return (
    <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
  );
}
