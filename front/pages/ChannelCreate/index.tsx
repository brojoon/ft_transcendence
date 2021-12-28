import React, { useState, useCallback, VFC, useEffect } from 'react';
import ChannelHeader from '@components/ChannelHeader';
import ChannelForm from '@components/ChannelForm';
import { ChannelCreateContainer } from './style';
import ChannelLeftDrawBar from '@components/ChannelLeftDrawBar';
import { useMediaQuery } from 'react-responsive';

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
  const isMobile = useMediaQuery({ maxWidth: 650 });
  return (
    <>
      {isMobile ? null : <ChannelLeftDrawBar />}

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
    </>
  );
};

export default ChannelCreate;
