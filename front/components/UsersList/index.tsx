import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import gravatar from 'gravatar';

const style = {
  width: '100%',
  bgcolor: '#1e1e1e',
};

export default function ListDividers() {
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button>
        <Avatar
          src={gravatar.url('youngrch', { s: '48px', d: 'retro' })}
          alt="Avatar"
          style={{ border: '2px solid red' }}
        />
        <ListItemText primary="youngrch" style={{ marginLeft: '12px' }} />
      </ListItem>
      <ListItem button>
        <Avatar
          src={gravatar.url('hyungjki', { s: '48px', d: 'retro' })}
          alt="Avatar"
          style={{ border: '2px solid green' }}
        />
        <ListItemText primary="hyungjki" style={{ marginLeft: '12px' }} />
      </ListItem>
      <ListItem button>
        <Avatar
          src={gravatar.url('huchoi', { s: '48px', d: 'retro' })}
          alt="Avatar"
          style={{ border: '2px solid red' }}
        />
        <ListItemText primary="huchoi" style={{ marginLeft: '12px' }} />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>{' '}
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
    </List>
  );
}
