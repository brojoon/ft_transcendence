import React, { VFC, useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Scrollbars from 'react-custom-scrollbars';
import useSWR from 'swr';
import { IChannelList } from '@typings/db';
import fetcher from '@utils/fetcher';
import { Link, useHistory, useParams } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import ProtectedRoomModal from '@components/ProtectedRoomModal';
import config from '@utils/config';
import { ChannelBodyContainer, ScrollbarColor, ChannelCard, ChannelName } from './style';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';

const ChannelBody = () => {
  const { data: allChannelList, mutate: mutateAllChannelList } = useSWR<IChannelList[]>(
    `/api/channels/allChannelList`,
    fetcher,
  );
  const { data: myChannelList, mutate: mutateMyChannelList } = useSWR<IChannelList[]>(
    `/api/channels/myChannelList`,
    fetcher,
  );
  const [channelPasswordModal, setChannelPasswordModal] = useState(false);
  const [channelPasswordRoomNumber, setChannelPasswordRoomNumber] = useState('');
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: 420 });
  const onClickPublicRoom = useCallback((channelId, e) => {
    e.preventDefault();
    axios
      .post(
        `/api/channels/join/${channelId}`,
        {
          password: '',
        },
        config,
      )
      .then(() => {
        mutateAllChannelList();
        mutateMyChannelList().then(() => {
          history.push(`/channels/${channelId}`);
        });
      })
      .catch((error) => {
        if (error.response.data.code === 403) {
          toast.error('This room is not accessible', {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
          });
        } else {
          toast.error(error.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
          });
        }
      });
  }, []);

  const onClickProtectedRoom = useCallback(
    (roomNumber, e) => {
      e.preventDefault();
      setChannelPasswordModal(true);
      setChannelPasswordRoomNumber(roomNumber);
    },
    [
      channelPasswordModal,
      setChannelPasswordModal,
      channelPasswordRoomNumber,
      setChannelPasswordRoomNumber,
    ],
  );
  return (
    <ChannelBodyContainer sx={{ flexGrow: 1 }}>
      <Scrollbars renderThumbVertical={({ style, ...props }) => <ScrollbarColor {...props} />}>
        <Grid className="grid-container" container spacing={3}>
          {channelPasswordModal ? (
            <ProtectedRoomModal
              channelPasswordModal={channelPasswordModal}
              setChannelPasswordModal={setChannelPasswordModal}
              channelPasswordRoomNumber={channelPasswordRoomNumber}
              setChannelPasswordRoomNumber={setChannelPasswordRoomNumber}
            />
          ) : null}
          {allChannelList?.map((Channel: IChannelList) => {
            let flag = false;
            myChannelList?.forEach((myChannel) => {
              if (myChannel.id === Channel.id) {
                flag = true;
                return null;
              }
            });
            if (flag) return null;
            if (Channel.type === 2) {
              return null;
            } else if (Channel.type === 0) {
              return (
                <Grid item xs={12} sm={12} md={6} key={Channel.id}>
                  <ChannelCard
                    ismobile={isMobile}
                    className="card"
                    onClick={(e) => {
                      onClickPublicRoom(Channel.id, e);
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <ChannelName>
                          <span>{Channel.name}</span>
                        </ChannelName>
                        <Typography variant="body2" color="hsla(0,0%,100%,.7)">
                          {Channel.authId}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </ChannelCard>
                </Grid>
              );
            } else if (Channel.type === 1) {
              return (
                <Grid item xs={12} sm={12} md={6} key={Channel.id}>
                  <ChannelCard
                    ismobile={isMobile}
                    className="card"
                    onClick={(e) => {
                      onClickProtectedRoom(Channel.id, e);
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <ChannelName>
                          <span>{Channel.name}</span>
                          <span>{<LockIcon />}</span>
                        </ChannelName>
                        <Typography variant="body2" color="hsla(0,0%,100%,.7)">
                          {Channel.authId}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </ChannelCard>
                </Grid>
              );
            }
          })}
        </Grid>
      </Scrollbars>
    </ChannelBodyContainer>
  );
};

export default ChannelBody;
