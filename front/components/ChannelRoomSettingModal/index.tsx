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
import { useHistory } from 'react-router-dom';
import ChannelForm from '@components/ChannelForm';
import config from '@utils/config';
import { toast } from 'react-toastify';

interface Props {
  settingToggle: boolean;
  onClickSettingBtn: (e: any) => void;
}

const ChannelRoomSettingMoDal: VFC<Props> = ({ settingToggle, onClickSettingBtn }) => {
  const { id } = useParams<{ id: string }>();
  const { data: myChannelList, mutate: channelListMutate } = useSWR<IChannelList[]>(
    '/api/channels/myChannelList',
    fetcher,
  );
  const { data: allChannelList, mutate: MutateAllChannelList } = useSWR<IChannelList[]>(
    '/api/channels/allChannelList',
    fetcher,
  );

  const { data: memberList, mutate: muatememberList } = useSWR<IMemberList[]>(
    `/api/channels/userList/${id}`,
    fetcher,
  );
  const history = useHistory();

  const [isChannelDeleteModal, setIsChannelDeleteModal] = useState(false);
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState('0');
  const [createError, setCreateError] = useState(0);
  const [PasswordValues, setPasswordValues] = useState({
    password: '',
    showPassword: false,
  });

  const onClickChannelDeleteModal = useCallback(
    (e) => {
      e.preventDefault();
      setIsChannelDeleteModal((prev) => !prev);
    },
    [isChannelDeleteModal],
  );

  const onSubmitChannelCreate = useCallback(() => {
    if (name) {
      axios
        .get(`/api/channels/updateChannelName/${id}/${name}`, config)
        .then(() => {
          toast.success('Successfully renamed a channel', {
            autoClose: 4000,
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
          });
          MutateAllChannelList();
          channelListMutate();
          setName('');
        })
        .catch((error) => {
          setCreateError(1);
          setName('');
          setVisibility('0');
          setPasswordValues({
            password: '',
            showPassword: false,
          });
        });
    }
    if (visibility !== '') {
      axios
        .get(`/api/channels/updateChannelType/${id}/${visibility}`, config)
        .then(() => {
          if (parseInt(visibility) === 1) {
            axios
              .post(
                `/api/channels/updateChannelPassword/${id}`,
                {
                  password: PasswordValues.password,
                },
                config,
              )
              .then(() => {
                toast.success('Successfully changed channel password', {
                  autoClose: 4000,
                  position: toast.POSITION.TOP_RIGHT,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  theme: 'colored',
                });
                MutateAllChannelList();
                channelListMutate();
                setName('');
                setVisibility('0');
                setPasswordValues({
                  password: '',
                  showPassword: false,
                });
              })
              .catch(() => {
                setCreateError(1);
              });
          } else {
            MutateAllChannelList();
            channelListMutate();
            setName('');
            setVisibility('0');
            setPasswordValues({
              password: '',
              showPassword: false,
            });
          }
        })
        .catch(() => {
          setCreateError(1);
        });
    }
  }, [name, visibility, PasswordValues]);

  const DeleteClickChannelBtn = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .get(`/api/channels/deleteChannel/${id}`, config)
        .then(() => {
          history.push('/channels');
          channelListMutate();
          MutateAllChannelList();
          toast.success('Successfully deleted the channel', {
            autoClose: 4000,
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
          });
        })
        .catch((error) => {
          toast.error(error.message, {
            autoClose: 4000,
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
          });
        });
    },
    [id],
  );

  return (
    <>
      <Toast>
        {isChannelDeleteModal ? (
          <BasicModal
            NoBtn={onClickChannelDeleteModal}
            YesBtn={DeleteClickChannelBtn}
            headerContent="Delete Channel"
            content="This will remove the channel as well as all of its messages"
          />
        ) : (
          ''
        )}
        <div className={settingToggle ? 'visible' : 'hidden'}>
          <div className="setting-modal-header">
            <h1>
              Settings of{' '}
              {allChannelList?.map((channel: IChannelList) => {
                if (channel.id === parseInt(id)) {
                  return channel.name;
                }
              })}
            </h1>
            <IconButton className="close-icon" aria-label="close" onClick={onClickSettingBtn}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="setting-modal-body">
            <ChannelForm
              value="EDIT"
              onSubmitChannelCreate={onSubmitChannelCreate}
              name={name}
              setVisibility={setVisibility}
              setName={setName}
              setPasswordValues={setPasswordValues}
              createError={createError}
              setCreateError={setCreateError}
            />
          </div>
          <div className="setting-modal-delete-wrapper">
            <h3>Danger Zone</h3>
            <Button
              className="delete-btn"
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={onClickChannelDeleteModal}
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
