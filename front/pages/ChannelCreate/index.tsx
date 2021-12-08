import React, { useState, useCallback, VFC, useEffect } from 'react';
import ChannelHeader from '@components/ChannelHeader';
import ChannelForm from '@components/ChannelForm';
import { ChannelCreateContainer } from './style';
import { NumberLiteralType } from 'typescript';

interface Props {
  onSubmitChannelCreate: (e: any) => void;
  onChangeVisibility: (e: any) => void;
  onChangeName: (e: any) => void;
  handleClickShowPassword: (e: any) => void;
  handleChange: any;
  name: string;
  visibility: string;
  PasswordValues: { password: string; showPassword: boolean };
  setPasswordValues: any;
  createError: number;
  channelNameError: number;
  channelPasswordError: number;
}

const ChannelCreate: VFC<Props> = ({
  onSubmitChannelCreate,
  onChangeVisibility,
  onChangeName,
  handleClickShowPassword,
  handleChange,
  PasswordValues,
  setPasswordValues,
  name,
  visibility,
  createError,
  channelNameError,
  channelPasswordError,
}) => {
  return (
    <ChannelCreateContainer>
      <ChannelHeader content={'Create a Channel'} />
      <div className="wrapper">
        <div className="channel-form-wrapper">
          <ChannelForm
            onSubmitChannelCreate={onSubmitChannelCreate}
            onChangeVisibility={onChangeVisibility}
            onChangeName={onChangeName}
            name={name}
            visibility={visibility}
            value="CREATE"
            handleClickShowPassword={handleClickShowPassword}
            handleChange={handleChange}
            PasswordValues={PasswordValues}
            setPasswordValues={setPasswordValues}
            createError={createError}
            channelNameError={channelNameError}
            channelPasswordError={channelPasswordError}
          />
        </div>
      </div>
    </ChannelCreateContainer>
  );
};

export default ChannelCreate;
