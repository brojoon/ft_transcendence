import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Scrollbars from 'react-custom-scrollbars';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: 'white',
  height: '100px',
  backgroundColor: '#1e1e1e',
  fontSize: '14px',
}));

const Achievements = () => {
  return (
    <Box sx={{ flexGrow: 1 }} style={{ padding: '20px 50px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <div>
              <p style={{ fontSize: '17px' }}>Registered!</p>
              <span style={{ opacity: '0.7', fontSize: '11px' }}>Create an account</span>
            </div>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=2</Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Achievements;
