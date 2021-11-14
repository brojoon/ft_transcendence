import React, { VFC, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

interface Props {
  onSubmitChannelCreate: (e: any) => void;
  onChangeVisibility: (e: any) => void;
  onChangeName: (e: any) => void;
  handleClickShowPassword: (e: any) => void;
  handleChange: any;
  name: string;
  visibility: string;
  value: string;
  PasswordValues: { password: string; showPassword: boolean };
  setPasswordValues: any;
}

const ChannelForm: VFC<Props> = ({
  onSubmitChannelCreate,
  onChangeVisibility,
  onChangeName,
  handleClickShowPassword,
  handleChange,
  name,
  visibility,
  value,
  PasswordValues,
  setPasswordValues,
}) => {
  const handleMouseDownPassword = useCallback((event: any) => {
    event.preventDefault();
  }, []);
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
        width: 'calc(100% - 15px)',
        padding: '5px 10px',
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl
        variant="standard"
        sx={{ color: 'white !importance' }}
        style={{ color: 'white', width: '100%' }}
      >
        <InputLabel htmlFor="component-simple" style={{ color: 'white' }}>
          Name
        </InputLabel>
        <Input
          id="component-simple"
          value={name}
          onChange={onChangeName}
          style={{ color: 'white' }}
        />
      </FormControl>
      <FormControl variant="standard" sx={{ width: '100%', color: 'white' }}>
        <InputLabel id="demo-simple-select-standard-label" style={{ color: 'white' }}>
          Visibility
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={visibility}
          onChange={onChangeVisibility}
          label="Visibility"
          style={{ color: 'white' }}
        >
          <MenuItem value={0}>Public</MenuItem>
          <MenuItem value={1}>Protected</MenuItem>
          <MenuItem value={2}>Private</MenuItem>
        </Select>
        {parseInt(visibility) === 1 ? (
          <FormControl sx={{ width: '100%', color: 'white', marginTop: '15px' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password" style={{ color: 'white' }}>
              Password
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
        ) : null}
      </FormControl>
      <Button
        variant="contained"
        style={{ width: '91px', height: '36px', margin: '5px 0 12px 8px', fontWeight: 600 }}
        onClick={onSubmitChannelCreate}
      >
        {value}
      </Button>
    </Box>
  );
};

export default ChannelForm;
