import React, { VFC } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import { UserRightModalBack, UserRightModalContainer } from './style';

interface Props {
  content: string;
  headerContent: string;
  NoBtn: (e: any) => void;
  ModerateBtn: (e: any) => void;
  BanBtn: (e: any) => void;
}
const UserRightModal: VFC<Props> = ({ content, NoBtn, ModerateBtn, BanBtn, headerContent }) => {
  return (
    <>
      <UserRightModalBack onClick={NoBtn}></UserRightModalBack>
      <UserRightModalContainer>
        <div className="wrapper">
          <div className="header">
            <ErrorIcon className="error-icon" />
            <div className="header-content">{headerContent}</div>
          </div>
          <div>
            <IconButton className="close-icon" onClick={NoBtn}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div className="body">{content}</div>
        <div className="button-wrapper">
          <Button className="moderate-btn" onClick={ModerateBtn} variant="text">
            Moderator
          </Button>
          <Button className="ban-btn" onClick={BanBtn} variant="text">
            Ban
          </Button>
        </div>
      </UserRightModalContainer>
    </>
  );
};

export default UserRightModal;
