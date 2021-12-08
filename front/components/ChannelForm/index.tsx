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
import {
  InputCheck,
  ChannelFormContainer,
  ChannelCreateBtn,
  NameErrorText,
  ErrorText,
} from './style';

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
  createError: number;
  channelNameError: number;
  channelPasswordError: number;
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
  createError,
  channelNameError,
  channelPasswordError,
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
      <ChannelFormContainer variant="standard">
        <InputLabel className="input" htmlFor="component-simple">
          Name
        </InputLabel>
        <Input
          className="input2"
          id="component-simple"
          autoComplete="off"
          value={name}
          onChange={onChangeName}
        />
      </ChannelFormContainer>
      <InputCheck textColor={name.length > 20 ? '#dd2c00' : 'hsla(0,0%,100%,.7)'}>
        <NameErrorText visible={channelNameError == 0 ? 'hidden' : 'visible'}>
          Name length must be between 1 and 20
        </NameErrorText>
        <span className="name-length"> {name.length} / 20</span>
      </InputCheck>
      <ChannelFormContainer variant="standard">
        <InputLabel className="input" id="demo-simple-select-standard-label">
          Visibility
        </InputLabel>
        <Select
          className="input"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={visibility}
          onChange={onChangeVisibility}
          label="Visibility"
        >
          <MenuItem value={0}>Public</MenuItem>
          <MenuItem value={1}>Protected</MenuItem>
          <MenuItem value={2}>Private</MenuItem>
        </Select>
      </ChannelFormContainer>
      {parseInt(visibility) === 1 ? (
        <ChannelFormContainer variant="standard">
          <InputLabel className="input" htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            autoComplete="off"
            type={PasswordValues.showPassword ? 'text' : 'password'}
            value={PasswordValues.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  className="input"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {PasswordValues.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </ChannelFormContainer>
      ) : null}
      {channelPasswordError ? <ErrorText>Password length must be between 1 and 20</ErrorText> : ''}
      <ChannelCreateBtn variant="contained" onClick={onSubmitChannelCreate}>
        {value}
      </ChannelCreateBtn>
      {createError ? (
        createError === 1 ? (
          <ErrorText>
            Failed either the channel already exists or there is a problem with the server
          </ErrorText>
        ) : (
          <ErrorText>Failed to create channel</ErrorText>
        )
      ) : (
        ''
      )}
    </Box>
  );
};

export default ChannelForm;
