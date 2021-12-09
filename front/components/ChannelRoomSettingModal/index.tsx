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
  const [channelNameError, setChannelNameError] = useState(0);
  const [channelPasswordError, setChannelPasswordError] = useState(0);
  const [PasswordValues, setPasswordValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = useCallback(() => {
    setPasswordValues({
      ...PasswordValues,
      showPassword: !PasswordValues.showPassword,
    });
  }, [PasswordValues, setPasswordValues]);
  const handleChange = useCallback(
    (prop: any) => (event: any) => {
      setChannelPasswordError(0);
      setPasswordValues({ ...PasswordValues, [prop]: event.target.value });
    },
    [PasswordValues, setPasswordValues],
  );

  const onChangeName = useCallback(
    (e: any) => {
      e.preventDefault();
      setCreateError(0);
      setChannelNameError(0);
      setName(e.target.value);
    },
    [name, setName],
  );

  const onChangeVisibility = useCallback(
    (e: any) => {
      e.preventDefault();
      setCreateError(0);
      setChannelPasswordError(0);
      setVisibility(e.target.value);
    },
    [visibility, setVisibility],
  );

  const onClickChannelDeleteModal = useCallback(
    (e) => {
      e.preventDefault();
      setIsChannelDeleteModal((prev) => !prev);
    },
    [isChannelDeleteModal],
  );

  const onSubmitChannelCreate = useCallback(
    (e) => {
      if (name.length > 20 || name.length < 1) {
        setChannelNameError(1);
        return;
      }
      console.log('PasswordValues.password.length', PasswordValues.password.length);
      console.log('visibility', visibility);
      if (
        visibility == '1' &&
        (PasswordValues.password.length > 20 || PasswordValues.password.length < 1)
      ) {
        console.log('hell');
        setChannelPasswordError(1);
        return;
      }
      e.preventDefault();
      if (name) {
        axios
          .get(`/api/channels/updateChannelName/${id}/${name}`, config)
          .then(() => {
            MutateAllChannelList();
            channelListMutate();
            setName('');
          })
          .catch((error) => {
            setCreateError(1);
          });
      }
      if (visibility !== '') {
        axios
          .get(`/api/channels/updateChannelType/${id}/${visibility}`, config)
          .then(() => {
            console.log('pass1.5', PasswordValues);
            if (parseInt(visibility) === 1) {
              console.log('pass1.6', PasswordValues);
              axios
                .post(
                  `/api/channels/updateChannelPassword/${id}`,
                  {
                    password: PasswordValues.password,
                  },
                  config,
                )
                .then(() => {
                  console.log('pass2', PasswordValues);
                  MutateAllChannelList();
                  channelListMutate();
                  setVisibility('0');
                  setPasswordValues({
                    password: '',
                    showPassword: false,
                  });
                  console.log('pass3', PasswordValues);
                })
                .catch(() => {
                  setCreateError(1);
                });
            } else {
              MutateAllChannelList();
              channelListMutate();
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
    },
    [name, visibility, PasswordValues],
  );

  const DeleteClickChannelBtn = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .get(`/api/channels/deleteChannel/${id}`, config)
        .then(() => {
          channelListMutate();
          MutateAllChannelList();
          muatememberList();
          history.push('/channels');
        })
        .then(() => {})
        .catch(() => {});
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
              onSubmitChannelCreate={onSubmitChannelCreate}
              onChangeVisibility={onChangeVisibility}
              onChangeName={onChangeName}
              name={name}
              visibility={visibility}
              value="EDIT"
              handleClickShowPassword={handleClickShowPassword}
              handleChange={handleChange}
              PasswordValues={PasswordValues}
              setPasswordValues={setPasswordValues}
              createError={createError}
              channelNameError={channelNameError}
              channelPasswordError={channelPasswordError}
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
