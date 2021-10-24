import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '80px',
  backgroundColor: '#1e1e1e',
}));

const Achievements = () => {
  return (
    <Box sx={{ flexGrow: 1 }} style={{ backgroundColor: '#121212' }}>
      <Grid container spacing={3}>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=2</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Achievements;
