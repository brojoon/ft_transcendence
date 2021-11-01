import React, {useCallback} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Scrollbars from 'react-custom-scrollbars';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import { IUser, IAllUser, IDmList } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';

const style = {
  width: '100%',
  bgcolor: '#1e1e1e',
};


const LeftDrawer = () => {
  const { data: dmlist } = useSWR<IDmList[]>('http://localhost:3095/dms/dmlist', fetcher);
  const { data: users } = useSWR<IAllUser[]>('/api/users/alluser', fetcher); 
  const { data: myData } = useSWR<IUser | null>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const onClickUserDM = useCallback(() => {

  }, [])
  return (
    <div
      style={{
        width: '300px',
        height: '100%',
        padding: '30px 15px',
        backgroundColor: '#363636',
      }}
    >
      <input        style={{
            width: '100%',
            outline: 'none',
            resize: 'none',
            borderRadius: '4px',
            background: '#bdbdbd',
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            height: '35px',
            color: 'black',
            border: 'none',
            padding: '0 12px',
          }}>
      </input>
      <div style={{ borderTop: '1px solid #4f4f4f', borderBottom: '1px solid #4f4f4f', margin: '10px 0', padding: '10px 0', }}>
      <ListItem button style={{backgroundColor: '#666666'}}>
          <ListItemText primary="Freinds" style={{ color: 'white' }} />
        </ListItem></div>
        {dmlist?.map((dm : any) => {
          
          return (
            <ListItem button style={{paddingLeft: '0'}} onClick={onClickUserDM}>
              {users?.map((user : any) => {
                if (user.userId === dm.Dmcontents[0].userId1 && dm.Dmcontents[0].userId1 != myData?.userId)
                  return (<Avatar src={user.profile} alt="Avatar" style={{ border: '2px solid red' }} />)
                else if (user.userId === dm.Dmcontents[0].userId2 && dm.Dmcontents[0]?.userId2 != myData?.userId)
                  return (
                    <Avatar src={user.profile} alt="Avatar" style={{ border: '2px solid red' }} />)
              })}
                    <ListItemText primary={dm.Dmcontents[0].userId1} style={{ marginLeft: '12px', color: 'white' }} />
             
            </ListItem>
          )
          })}
    </div>
  );
};

export default LeftDrawer;
