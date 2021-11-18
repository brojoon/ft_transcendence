import React, { useCallback, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TwoFactorSwitch from '@components/TwoFactorSwitch';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled as muistyled } from '@mui/material/styles';
import axios from 'axios';
import getToken from '@utils/getToken';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Input = muistyled('input')({
  display: 'none',
});

const ProfileSetting = () => {
  const { data: myData, mutate: mutateMyData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [changeNickname, setChangeNickname] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const onChangeNickname = useCallback(
    (e) => {
      e.preventDefault();
      console.log(e.target.keycode);
      setChangeNickname(e.target.value);
    },
    [changeNickname],
  );

  const onChangeFile = (event: any) => {
    console.log('onChangeFile', event.target.files);
    setSelectedFile(event.target.files);
  };

  const onClickClearImg = () => {
    setImgUrl('');
    setSelectedFile(null);
  };

  const onKeyDownNickname = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        axios
          .get(`/api/users/update-username/${changeNickname}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          })
          .then(() => {
            mutateMyData();
            setChangeNickname('');
          })
          .catch(() => {});
      }
    },
    [mutateMyData, changeNickname],
  );

  const onClickUploadBtn = () => {
    if (!selectedFile || !selectedFile[0]) return;
    const formData = new FormData();

    console.log('selectedFile', selectedFile[0], selectedFile[0]?.name);
    console.log(`${myData?.userId}` + '.jpg');

    formData.append(
      'image',
      selectedFile[0],
      `${myData?.userId}` + selectedFile[0].name.slice(selectedFile[0].name.indexOf('.')),
    );
    const config = {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'content-type': 'multipart/form-data',
      },
    };

    axios
      .post('/api/users/upload', formData, config)
      .then((res) => {
        mutateMyData();
        3;
        console.log('upload!!');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preview();
  });

  const preview = () => {
    if (!selectedFile || !selectedFile[0]) return false;
    const reader = new FileReader();

    reader.onload = () => {
      setImgUrl(`${reader.result}`);
    };
    reader.readAsDataURL(selectedFile[0]);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        margin: '20px',
        width: '100%',
        fontSize: '22px',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          backgroundColor: '#1e1e1e',
        }}
      >
        <div>Security</div>
        <div style={{ display: 'flex' }}>
          <TwoFactorSwitch />
          <span>2-Factor Authentication</span>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1e1e1e',
          marginTop: '25px',
        }}
      >
        <div style={{ padding: '20px 20px 20px 20px' }}>
          <div style={{ height: '70px' }}>Avatar</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ position: 'relative' }}>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={onChangeFile}
                />
                <Avatar
                  src={imgUrl ? imgUrl : myData?.profile}
                  alt="Avatar"
                  style={{ width: '150px', height: '150px' }}
                />
              </label>
              <div
                onClick={onClickClearImg}
                style={{ position: 'absolute', top: '-5px', right: '-20px', zIndex: 10 }}
              >
                <IconButton style={{ color: 'white' }}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <span>{myData?.userId}</span>
            <span style={{ color: '#52575d', fontWeight: 500 }}>{myData?.username}</span>
            <div style={{ width: '100%', marginTop: '12px' }}>
              <Button
                variant="contained"
                startIcon={<PhotoCamera />}
                component="span"
                onClick={onClickUploadBtn}
                style={{ width: '100%' }}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: '#1e1e1e',
          marginTop: '25px',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          color: 'white',
        }}
      >
        <span style={{ marginBottom: '10px' }}>Edit nickname</span>
        <TextField
          value={changeNickname}
          onChange={onChangeNickname}
          onKeyPress={onKeyDownNickname}
          fullWidth
          label="nickname"
          id="fullWidth"
          sx={{ color: 'white' }}
          style={{ color: 'white' }}
        />
      </div>
    </div>
  );
};

export default ProfileSetting;
