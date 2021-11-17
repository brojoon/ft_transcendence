import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function TwoFactorSwitch() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };

  return (
    <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
  );
}
