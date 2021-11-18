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
  const [visibility, setVisibility] = useState('');
  const [createError, setCreateError] = useState(false);
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
      setPasswordValues({ ...PasswordValues, [prop]: event.target.value });
    },
    [PasswordValues, setPasswordValues],
  );

  const onChangeName = useCallback(
    (e: any) => {
      e.preventDefault();
      setCreateError(false);
      setName(e.target.value);
    },
    [name, setName],
  );

  const onChangeVisibility = useCallback(
    (e: any) => {
      e.preventDefault();
      setCreateError(false);
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

  const onSubmitChannelCreate = useCallback(
    (e) => {
      e.preventDefault();
      console.log('pass1', PasswordValues);
      console.log('visibility', visibility);
      if (name) {
        axios
          .get(`/api/channels/changeChannelName/${id}/${name}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          })
          .then(() => {
            MutateAllChannelList();
            channelListMutate();
            setName('');
          })
          .catch(() => {
            setCreateError(true);
          });
      }
      if (visibility) {
        axios
          .get(`/api/channels/changeChannelType/${id}/${visibility}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          })
          .then(() => {
            console.log('pass1.5', PasswordValues);
            if (parseInt(visibility) === 1) {
              console.log('pass1.6', PasswordValues);

              axios
                .post(
                  `/api/channels/changeChannelPassword/${id}/${PasswordValues.password}`,
                  {
                    password: PasswordValues.password,
                  },
                  {
                    withCredentials: true,
                    headers: {
                      Authorization: `Bearer ${getToken()}`,
                    },
                  },
                )
                .then(() => {
                  console.log('pass2', PasswordValues);
                  MutateAllChannelList();
                  channelListMutate();
                  setVisibility('');
                  setPasswordValues({
                    password: '',
                    showPassword: false,
                  });
                  console.log('pass3', PasswordValues);
                });
            } else {
              MutateAllChannelList();
              channelListMutate();
              setVisibility('');
              setPasswordValues({
                password: '',
                showPassword: false,
              });
            }
          });
      }
    },
    [name, visibility, PasswordValues],
  );

  const DeleteClickChannelBtn = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .get(`/api/channels/deleteChannel/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then(() => {
          channelListMutate();
          MutateAllChannelList();
          muatememberList();
          history.push('/ft_transcendence/channels');
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
        <div
          className={settingToggle ? 'visible' : 'hidden'}
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            backgroundColor: '#000000',
            zIndex: 501,
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
              handleClickShowPassword={handleClickShowPassword}
              handleChange={handleChange}
              PasswordValues={PasswordValues}
              setPasswordValues={setPasswordValues}
              createError={createError}
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
