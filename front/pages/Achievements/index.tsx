import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Scrollbars from 'react-custom-scrollbars';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import StarIcon from '@mui/icons-material/Star';
import { Translate } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: 'white',
  height: '100px',
  backgroundColor: '#1e1e1e',
  fontSize: '14px',
}));

const Achievements = () => {
  const { data: friendNumber } = useSWR<number>(`/api/friend/countFriend`, fetcher);
  const { data: DmListNum } = useSWR<number>(`/api/dms/getDmListNum`, fetcher);

  return (
    <Box sx={{ flexGrow: 1 }} style={{ padding: '20px 20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: 'white',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                padding: '15px 15px',
                borderRadius: '3px 3px 0 0',
                backgroundColor: '#1e1e1e',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Registered!</span>
                <div>icon</div>
              </div>
              <span style={{ fontSize: '14px', color: '#bebebe', fontWeight: 600 }}>
                Create an account
              </span>
            </div>
            <div
              style={{ backgroundColor: '#365dff', fontWeight: 500, borderRadius: '0 0 3px 3px' }}
            >
              progress
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: 'white',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                padding: '15px 15px',
                borderRadius: '3px 3px 0 0',
                backgroundColor: '#1e1e1e',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Star</span>
                <div>
                  <StarIcon />
                </div>
              </div>
              <span style={{ fontSize: '14px', color: '#bebebe', fontWeight: 600 }}>
                Have 100 friends
              </span>
            </div>
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div
                style={{
                  zIndex: 15,
                  position: 'absolute',
                  right: '50%',
                  transform: 'translateX(50%)',
                }}
              >
                {friendNumber} / 100
              </div>
              <div
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  backgroundColor: '#365dff',
                  fontWeight: 500,
                  borderRadius: '0 0 3px 3px',

                  width: `${friendNumber ? friendNumber : 0}%`,
                  height: '23px',
                  textAlign: 'center',
                }}
              ></div>
              <div
                style={{
                  backgroundColor: '#253161',
                  width: '100%',
                  fontWeight: 500,
                  borderRadius: '0 0 3px 3px',
                  textAlign: 'center',
                  height: '23px',
                }}
              ></div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: 'white',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                padding: '15px 15px',
                borderRadius: '3px 3px 0 0',
                backgroundColor: '#1e1e1e',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Registered!</span>
                <div>icon</div>
              </div>
              <span style={{ fontSize: '14px', color: '#bebebe', fontWeight: 600 }}>
                Create an account
              </span>
            </div>
            <div
              style={{ backgroundColor: '#365dff', fontWeight: 500, borderRadius: '0 0 3px 3px' }}
            >
              progress
            </div>
          </div>
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
