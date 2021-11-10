import React, { useState, useCallback, VFC } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import ChannelHeader from '@components/ChannelHeader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from 'axios';
import getToken from '@utils/getToken';
import useSWR from 'swr';
import { IChannelList } from '@typings/db';
import { useHistory } from 'react-router-dom';
import fetcher from '@utils/fetcher';

interface Props {
  onSubmitChannelCreate: any;
  onChangeVisibility: any;
  onChangeName: any;
  name: string;
  visibility: string;
}

const ChannelCreate: VFC<Props> = ({
  onSubmitChannelCreate,
  onChangeVisibility,
  onChangeName,
  name,
  visibility,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <ChannelHeader content={'Create a Channel'} />
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#121212',
        }}
      >
        <div
          style={{
            backgroundColor: '#1e1e1e',
            margin: '15px 15px 15px',
            width: 'calc(100% - 30px)',
          }}
        >
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1 },
              width: 'calc(100% - 15px)',
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
                style={{ color: 'white', borderColor: 'red  !importance' }}
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
            </FormControl>
            <Button
              variant="contained"
              style={{ width: '91px', height: '36px', margin: '5px 0 12px 8px' }}
              onClick={onSubmitChannelCreate}
            >
              CREATE
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ChannelCreate;
