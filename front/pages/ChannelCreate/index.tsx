import React, { useState, useCallback, VFC, useEffect } from 'react';
import ChannelHeader from '@components/ChannelHeader';
import ChannelForm from '@components/ChannelForm';
import { ChannelCreateContainer } from './style';
import { NumberLiteralType } from 'typescript';

interface Props {
  onSubmitChannelCreate: () => void;
  setVisibility: (e: any) => void;
  setName: (e: any) => void;
  name: string;
  setPasswordValues: any;
  createError: number;
  setCreateError: (e: any) => void;
}

const ChannelCreate: VFC<Props> = ({
  onSubmitChannelCreate,
  setVisibility,
  setName,
  setPasswordValues,
  name,
  createError,
  setCreateError,
}) => {
  return (
    <ChannelCreateContainer>
      <ChannelHeader content={'Create a Channel'} />
      <div className="wrapper">
        <div className="channel-form-wrapper">
          <ChannelForm
            value="CREATE"
            onSubmitChannelCreate={onSubmitChannelCreate}
            name={name}
            setVisibility={setVisibility}
            setName={setName}
            setPasswordValues={setPasswordValues}
            createError={createError}
            setCreateError={setCreateError}
          />
        </div>
      </div>
    </ChannelCreateContainer>
  );
};

export default ChannelCreate;
