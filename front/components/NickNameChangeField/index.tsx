import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import TextField from '@mui/material/TextField';

import axios from 'axios';
import { EditNickNameWrapper, NickNameErrorContainer } from './style';

const NickNameChangeField = () => {
  const { data: myData, mutate: mutateMyData } = useSWR<IUser | null>('/api/users', fetcher);
  const [changeNickname, setChangeNickname] = useState('');
  const [isNickError, setIsNickError] = useState(0);

  const onChangeNickname = useCallback((e) => {
    e.preventDefault();
    setChangeNickname(e.target.value);
    setIsNickError(0);
  }, []);

  const onKeyDownNickname = useCallback(
    (e) => {
      if (!changeNickname) return;

      if (changeNickname.length > 10) {
        setIsNickError(2);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        axios
          .get(`/api/users/update-username/${changeNickname}`, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data === false) {
              setIsNickError(1);
              return;
            }
            mutateMyData();
            setChangeNickname('');
          })
          .catch(() => {
            setIsNickError(1);
          });
      }
    },
    [mutateMyData, changeNickname],
  );

  return (
    <EditNickNameWrapper>
      <span className="nick-input-label">Edit nickname</span>
      <TextField
        value={changeNickname}
        onChange={onChangeNickname}
        onKeyPress={onKeyDownNickname}
        fullWidth
        label="nickname"
        id="fullWidth"
        autoComplete="off"
      />
      <NickNameErrorContainer visibility={isNickError === 0 ? 'hidden' : 'visiblle'}>
        {isNickError && isNickError === 1 ? (
          <span>This nickname is already in use by another user</span>
        ) : (
          <span>Nickname length limit is 10 characters</span>
        )}
      </NickNameErrorContainer>
    </EditNickNameWrapper>
  );
};

export default NickNameChangeField;
