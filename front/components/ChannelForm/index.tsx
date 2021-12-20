import React, { VFC, useState, useCallback, useEffect } from 'react';
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
  onSubmitChannelCreate: () => void;
  setVisibility: (e: any) => void;
  setName: (e: any) => void;
  name: string;
  value: string;
  setPasswordValues: any;
  createError: number;
  setCreateError: (e: any) => void;
}

const ChannelForm: VFC<Props> = ({
  onSubmitChannelCreate,
  setVisibility,
  setName,
  name,
  value,
  setPasswordValues,
  createError,
  setCreateError,
}) => {
  const handleMouseDownPassword = useCallback((event: any) => {
    event.preventDefault();
  }, []);
  const [channelFormName, setChannelFormName] = useState('');
  const [channelFormVisibility, setChannelFormVisibility] = useState('0');
  const [channelFormPasswordValues, setChannelFormPasswordValues] = useState({
    password: '',
    showPassword: false,
  });
  const [channelNameError, setChannelNameError] = useState(0);
  const [channelPasswordError, setChannelPasswordError] = useState(0);

  useEffect(() => {
    if (name) {
      onSubmitChannelCreate();
      setChannelFormName('');
      setChannelFormVisibility('0');
      setChannelFormPasswordValues({ password: '', showPassword: false });
    }
  }, [name]);

  const onChannelCreateFromBtn = useCallback(() => {
    if (channelFormName.length > 10 || channelFormName.length < 1) {
      setChannelNameError(1);
      return;
    }
    if (
      channelFormVisibility == '1' &&
      (channelFormPasswordValues.password.length > 20 ||
        channelFormPasswordValues.password.length < 1)
    ) {
      setChannelPasswordError(1);
      return;
    }
    setName(channelFormName);
    setVisibility(channelFormVisibility);
    setPasswordValues(channelFormPasswordValues);
  }, [channelFormName, channelFormVisibility, channelFormPasswordValues]);

  const onChangeFormName = useCallback(
    (e) => {
      setChannelFormName(e.target.value);
      if (channelNameError) setChannelNameError(0);
      if (createError) setCreateError(0);
    },
    [createError, channelNameError],
  );

  const onChangeFormVisibility = useCallback((e) => {
    e.preventDefault();
    setChannelFormVisibility(e.target.value);
    setChannelFormPasswordValues({ password: '', showPassword: false });
    setCreateError(0);
  }, []);

  const handleClickShowPassword = useCallback(() => {
    setChannelFormPasswordValues({
      ...channelFormPasswordValues,
      showPassword: !channelFormPasswordValues.showPassword,
    });
  }, [channelFormPasswordValues, setChannelFormPasswordValues]);
  const handleChange = useCallback(
    (prop: any) => (event: any) => {
      setChannelPasswordError(0);
      setChannelFormPasswordValues({ ...channelFormPasswordValues, [prop]: event.target.value });
    },
    [channelFormPasswordValues, setChannelFormPasswordValues],
  );

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
          value={channelFormName}
          onChange={onChangeFormName}
        />
      </ChannelFormContainer>
      <InputCheck textColor={channelFormName.length > 10 ? '#dd2c00' : 'hsla(0,0%,100%,.7)'}>
        <NameErrorText visible={channelNameError == 0 ? 'hidden' : 'visible'}>
          Name length must be between 1 and 10
        </NameErrorText>
        <span className="name-length"> {channelFormName.length} / 10</span>
      </InputCheck>
      <ChannelFormContainer variant="standard">
        <InputLabel className="input" id="demo-simple-select-standard-label">
          Visibility
        </InputLabel>
        <Select
          className="input"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={channelFormVisibility}
          onChange={onChangeFormVisibility}
          label="Visibility"
        >
          <MenuItem value={0}>Public</MenuItem>
          <MenuItem value={1}>Protected</MenuItem>
          <MenuItem value={2}>Private</MenuItem>
        </Select>
      </ChannelFormContainer>
      {parseInt(channelFormVisibility) === 1 ? (
        <ChannelFormContainer variant="standard">
          <InputLabel className="input" htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            autoComplete="off"
            type={channelFormPasswordValues.showPassword ? 'text' : 'password'}
            value={channelFormPasswordValues.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  className="input"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {channelFormPasswordValues.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </ChannelFormContainer>
      ) : null}
      {channelPasswordError ? <ErrorText>Password length must be between 1 and 20</ErrorText> : ''}
      <ChannelCreateBtn variant="contained" onClick={onChannelCreateFromBtn}>
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
