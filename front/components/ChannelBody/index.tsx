import React, { VFC, useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
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
import getToken from '@utils/getToken';
import ProtectedRoomModal from '@components/ProtectedRoomModal';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: 'white',
  height: '100px',
  backgroundColor: '#1e1e1e',
  fontSize: '14px',
}));

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
  const onClickPublicRoom = useCallback((channelId, e) => {
    e.preventDefault();
    console.log(e);
    axios
      .post(
        `/api/channels/join/${channelId}`,
        {
          password: '1234',
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      )
      .then(() => {
        mutateAllChannelList();
        mutateMyChannelList();
        history.push(`/ft_transcendence/channels/${channelId}`);
      })
      .catch((e) => {
        mutateAllChannelList();
        mutateMyChannelList();
        history.push(`ft_transcendence/channels`);
      });
  }, []);

  const onClickProtectedRoom = useCallback(
    (roomNumber, e) => {
      e.preventDefault();
      console.log('onClickProtectedRoom');
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
    <Box
      sx={{ flexGrow: 1 }}
      style={{
        backgroundColor: '#121212',
        padding: '15px 8px 15px 15px',
        width: '100%',
        height: 'calc(100% - 64px)',
      }}
    >
      <Scrollbars>
        <Grid container spacing={3} style={{ width: '100%' }}>
          {channelPasswordModal ? (
            <ProtectedRoomModal
              channelPasswordModal={channelPasswordModal}
              setChannelPasswordModal={setChannelPasswordModal}
              channelPasswordRoomNumber={channelPasswordRoomNumber}
              setChannelPasswordRoomNumber={setChannelPasswordRoomNumber}
            />
          ) : null}
          {allChannelList?.map((Channel: any) => {
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
                <Grid item xs={12} sm={12} md={6}>
                  <Card
                    onClick={(e) => {
                      onClickPublicRoom(Channel.id, e);
                    }}
                    style={{ backgroundColor: '#1e1e1e', color: 'white' }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                          <span>{Channel.name}</span>
                          {Channel.type === 1 ? <span>{<LockIcon />}</span> : null}
                        </Typography>
                        <Typography variant="body2" color="hsla(0,0%,100%,.7)">
                          {Channel.authId}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            } else if (Channel.type === 1) {
              return (
                <Grid item xs={12} sm={12} md={6}>
                  <Card
                    onClick={(e) => {
                      onClickProtectedRoom(Channel.id, e);
                    }}
                    style={{ backgroundColor: '#1e1e1e', color: 'white' }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                          <span>{Channel.name}</span>
                          {Channel.type === 1 ? <span>{<LockIcon />}</span> : null}
                        </Typography>
                        <Typography variant="body2" color="hsla(0,0%,100%,.7)">
                          {Channel.authId}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            }
          })}
        </Grid>
      </Scrollbars>
    </Box>
  );
};

export default ChannelBody;
