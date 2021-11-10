import React, { VFC } from 'react';
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
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: 'white',
  height: '100px',
  backgroundColor: '#1e1e1e',
  fontSize: '14px',
}));

const ChannelBody = () => {
  const { data: allChannelList } = useSWR<IChannelList[]>(`/api/channels/allChannelList`, fetcher);
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
          {allChannelList?.map((Channel: any) => {
            return (
              <Grid item xs={12} sm={12} md={6}>
                <Link
                  to={`/ft_transcendence/channels/${Channel.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Card style={{ backgroundColor: '#1e1e1e', color: 'white' }}>
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                          <span>{Channel.name}</span>
                          <span style={{ right: 0 }}>hi</span>
                        </Typography>
                        <Typography variant="body2" color="hsla(0,0%,100%,.7)">
                          {Channel.authId}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Scrollbars>
    </Box>
  );
};

export default ChannelBody;
