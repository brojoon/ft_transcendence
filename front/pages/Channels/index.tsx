import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ChannelLeftDrawBar from '@components/ChannelLeftDrawBar';
import { Container } from '@pages/Social/style';
import ChatHeader from '@components/ChannelHeader';
import ChannelBody from '@components/ChannelBody';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Channel = () => {
  return (
    <Container style={{ borderLeft: '1px solid #4f4f4f', margin: '0', padding: '0' }}>
      <ChannelLeftDrawBar />
      <div style={{ width: '100%' }}>
        <ChatHeader />
        <ChannelBody />
      </div>
    </Container>
    // <Box sx={{ flexGrow: 1 }}>
    //   <Grid container spacing={2}>
    //     <Grid item xs={8} md={8}>
    //       <Item>xs=6 md=8</Item>
    //     </Grid>
    //     <Grid item xs={4} md={4}>
    //       <Item>xs=6 md=2</Item>
    //     </Grid>
    //     <Grid item xs={6} md={4}>
    //       <Item>xs=6 md=4</Item>
    //     </Grid>
    //     <Grid item xs={6} md={8}>
    //       <Item>xs=6 md=8</Item>
    //     </Grid>
    //   </Grid>
    // </Box>
  );
};

export default Channel;
