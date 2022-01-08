import React, { useCallback, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TwoFactorSwitch from '@components/TwoFactorSwitch';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ProfileSettingContainer } from './style';
import NickNameChangeField from '@components/NickNameChangeField';
import { toast } from 'react-toastify';

const ProfileSetting = () => {
  const { data: myData, mutate: mutateMyData } = useSWR<IUser | null>('/api/users', fetcher);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [imgUrl, setImgUrl] = useState('');

  const onChangeFile = (event: any) => {
    setSelectedFile(event.target.files);
  };

  const onClickClearImg = () => {
    setImgUrl('');
    setSelectedFile(null);
  };

  const onClickUploadBtn = useCallback(() => {
    if (!selectedFile || !selectedFile[0]) return;
    const formData = new FormData();

    formData.append(
      'image',
      selectedFile[0],
      `${myData?.userId}` + selectedFile[0].name.slice(selectedFile[0]?.name?.indexOf('.')),
    );
    const config = {
      withCredentials: true,
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios
      .post('/api/users/upload', formData, config)
      .then((res) => {
        toast.success('Successfully changed your profile picture', {
          autoClose: 4000,
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: 'colored',
        });
        mutateMyData();
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
  }, [myData, selectedFile]);

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
    <ProfileSettingContainer>
      <div className="security-wrapper">
        <div>Security</div>
        <div className="two-factor-wrapper">
          <TwoFactorSwitch />
          <span>2-Factor Authentication</span>
        </div>
      </div>
      <div className="user-avatar-container">
        <div className="user-avatar-wrapper">
          <div className="header-avatar">Avatar</div>
          <div className="user-avatar-upload-section">
            <div className="avatar-upload-wrapper">
              <label htmlFor="contained-button-file">
                <input
                  className="upload-input"
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={onChangeFile}
                />
                <Avatar className="avatar" src={imgUrl ? imgUrl : myData?.profile} alt="Avatar" />
              </label>
              <div className="remove-btn " onClick={onClickClearImg}>
                <IconButton className="remove-icon">
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <span>{myData?.userId}</span>
            <span className="user-nickname">{myData?.username}</span>
            <div className="upload-btn-wrapper">
              <Button
                className="upload-btn"
                variant="contained"
                startIcon={<PhotoCamera />}
                component="span"
                onClick={onClickUploadBtn}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      </div>
      <NickNameChangeField />
    </ProfileSettingContainer>
  );
};

export default ProfileSetting;
