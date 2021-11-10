import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Scrollbars from 'react-custom-scrollbars';

const ChannelMemberDrawBar = () => {
  return (
    <div
      style={{
        backgroundColor: '#363636',
        width: '380px',
        height: '100%',
        right: 0,
        // left: 'auto',
        // transform: 'translate(0%)',
        // overflowY: 'auto',
        // overflowX: 'hidden',
        display: 'flex',
        margin: 0,
        flexDirection: 'row',
        // visibility: 'hidden',
      }}
    >
      <Scrollbars>
        <div>
          <ListItem style={{ fontSize: '12px', marginTop: '11px', color: 'gray' }}>Owner</ListItem>
          <ListItem button>
            <Avatar
              src="hohoho"
              alt="Avatar"
              style={{ border: '2px solid red', width: '38px', height: '38px' }}
            />
            <ListItemText primary="hello" style={{ marginLeft: '12px', color: 'white' }} />
          </ListItem>
          <ListItem style={{ fontSize: '12px', marginTop: '11px', color: 'gray' }}>Admin</ListItem>
          <ListItem style={{ fontSize: '12px', marginTop: '11px', color: 'gray' }}>Users</ListItem>
          <ListItem button>
            <Avatar
              src="hohoho"
              alt="Avatar"
              style={{ border: '2px solid red', width: '38px', height: '38px' }}
            />
            <ListItemText primary="hello" style={{ marginLeft: '12px', color: 'white' }} />
          </ListItem>{' '}
          <ListItem button>
            <Avatar
              src="hohoho"
              alt="Avatar"
              style={{ border: '2px solid red', width: '38px', height: '38px' }}
            />
            <ListItemText primary="hello" style={{ marginLeft: '12px', color: 'white' }} />
          </ListItem>
          <ListItem button>
            <Avatar
              src="hohoho"
              alt="Avatar"
              style={{ border: '2px solid red', width: '38px', height: '38px' }}
            />
            <ListItemText primary="hello" style={{ marginLeft: '12px', color: 'white' }} />
          </ListItem>
          <ListItem button>
            <Avatar
              src="hohoho"
              alt="Avatar"
              style={{ border: '2px solid red', width: '38px', height: '38px' }}
            />
            <ListItemText primary="hello" style={{ marginLeft: '12px', color: 'white' }} />
          </ListItem>
          <ListItem button>
            <Avatar
              src="hohoho"
              alt="Avatar"
              style={{ border: '2px solid red', width: '38px', height: '38px' }}
            />
            <ListItemText primary="hello" style={{ marginLeft: '12px', color: 'white' }} />
          </ListItem>
          <ListItem button>
            <Avatar
              src="hohoho"
              alt="Avatar"
              style={{ border: '2px solid red', width: '38px', height: '38px' }}
            />
            <ListItemText primary="hello" style={{ marginLeft: '12px', color: 'white' }} />
          </ListItem>
          <ListItem button>
            <Avatar
              src="hohoho"
              alt="Avatar"
              style={{ border: '2px solid red', width: '38px', height: '38px' }}
            />
            <ListItemText primary="hello" style={{ marginLeft: '12px', color: 'white' }} />
          </ListItem>
          <ListItem button>
            <Avatar
              src="hohoho"
              alt="Avatar"
              style={{ border: '2px solid red', width: '38px', height: '38px' }}
            />
            <ListItemText primary="hello" style={{ marginLeft: '12px', color: 'white' }} />
          </ListItem>
          <ListItem button>
            <Avatar
              src="hohoho"
              alt="Avatar"
              style={{ border: '2px solid red', width: '38px', height: '38px' }}
            />
            <ListItemText primary="hello" style={{ marginLeft: '12px', color: 'white' }} />
          </ListItem>
          <ListItem button>
            <Avatar
              src="hohoho"
              alt="Avatar"
              style={{ border: '2px solid red', width: '38px', height: '38px' }}
            />
            <ListItemText primary="hello" style={{ marginLeft: '12px', color: 'white' }} />
          </ListItem>
          <ListItem button>
            <Avatar
              src="hohoho"
              alt="Avatar"
              style={{ border: '2px solid red', width: '38px', height: '38px' }}
            />
            <ListItemText primary="hello" style={{ marginLeft: '12px', color: 'white' }} />
          </ListItem>
        </div>
      </Scrollbars>
    </div>
  );
};

export default ChannelMemberDrawBar;
