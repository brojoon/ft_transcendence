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
import ChannelForm from '@components/ChannelForm';

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
            borderRadius: '5px',
          }}
        >
          <ChannelForm
            onSubmitChannelCreate={onSubmitChannelCreate}
            onChangeVisibility={onChangeVisibility}
            onChangeName={onChangeName}
            name={name}
            visibility={visibility}
            value="CREATE"
          />
        </div>
      </div>
    </div>
  );
};

export default ChannelCreate;
