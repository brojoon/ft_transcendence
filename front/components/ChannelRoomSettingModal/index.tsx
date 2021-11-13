import React, { VFC, useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { IMemberList, IChannelList } from '@typings/db';
import fetcher from '@utils/fetcher';
import { Toast } from './style';
import BasicModal from '@components/BasicModal';
import axios from 'axios';
import getToken from '@utils/getToken';
import { useHistory } from 'react-router-dom';
import ChannelForm from '@components/ChannelForm';
interface Props {
  settingToggle: boolean;
  onClickSettingBtn: (e: any) => void;
}

const ChannelRoomSettingMoDal: VFC<Props> = ({ settingToggle, onClickSettingBtn }) => {
  const { id } = useParams<{ id: string }>();
  const { mutate: channelListMutate } = useSWR<IChannelList[]>(
    '/api/channels/myChannelList',
    fetcher,
  );
  const { data: allChannelList } = useSWR<IChannelList[]>('/api/channels/allChannelList', fetcher);

  const [isChannelDeleteModal, setIsChannelDeleteModal] = useState(false);
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState('');
  const history = useHistory();

  const onChangeName = useCallback(
    (e: any) => {
      e.preventDefault();
      setName(e.target.value);
    },
    [name, setName],
  );

  const onChangeVisibility = useCallback(
    (e: any) => {
      e.preventDefault();

      setVisibility(e.target.value);
    },
    [visibility, setVisibility],
  );

  const onClickChannelDeleteModal = useCallback(
    (e) => {
      e.preventDefault();
      setIsChannelDeleteModal((prev) => !prev);
    },
    [isChannelDeleteModal, setIsChannelDeleteModal],
  );

  const onSubmitChannelCreate = useCallback((e) => {}, []);

  const DeleteClickChannelBtn = useCallback((e) => {
    e.preventDefault();
    axios
      .get(`/api/channels/deleteChannel/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then(() => {
        channelListMutate((prev) => {
          const arr: IChannelList[] = [];
          prev?.map((ch) => {
            if (ch.id !== parseInt(id)) {
              arr.push(ch);
            }
          });
          return arr;
        }, true);
        history.push('/ft_transcendence/channels');
      });
  }, []);

  return (
    <>
      <Toast>
        {isChannelDeleteModal ? (
          <BasicModal
            NoBtn={onClickChannelDeleteModal}
            YesBtn={DeleteClickChannelBtn}
            content="This will remove the channel as well as all of its messages"
          />
        ) : (
          ''
        )}
        <div
          className={settingToggle ? 'visible' : 'hidden'}
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            backgroundColor: '#000000',
            zIndex: 1000,
            flexDirection: 'column',
            padding: '0 25px',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', color: 'white', justifyContent: 'space-between' }}>
            <h1>
              Settings of{' '}
              {allChannelList?.map((channel: IChannelList) => {
                if (channel.id === parseInt(id)) {
                  return channel.name;
                }
              })}
            </h1>
            <IconButton aria-label="close" onClick={onClickSettingBtn} style={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <div
            style={{
              backgroundColor: '#1e1e1e',
              borderRadius: '4px',
            }}
          >
            <ChannelForm
              onSubmitChannelCreate={onSubmitChannelCreate}
              onChangeVisibility={onChangeVisibility}
              onChangeName={onChangeName}
              name={name}
              visibility={visibility}
              value="EDIT"
            />
          </div>
          <div
            style={{
              width: '100%',
              height: '120px',
              backgroundColor: '#1e1e1e',
              color: '#e24c34',
              border: '1px solid #a6625f',
              borderRadius: '4px',
              padding: '0 15px',
            }}
          >
            <h3>Danger Zone</h3>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={onClickChannelDeleteModal}
              style={{ backgroundColor: 'red', fontWeight: 600 }}
            >
              DELETE CHANNEL
            </Button>
          </div>
        </div>
      </Toast>
    </>
  );
};

export default ChannelRoomSettingMoDal;
