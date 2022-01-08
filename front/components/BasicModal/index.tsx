import React, { VFC } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import { ModalBackground, ModalContent, ButtonContainer } from './style';

interface Props {
  content: string;
  headerContent: string;
  NoBtn: (e: any) => void;
  YesBtn: (e: any) => void;
}
const BasicModal: VFC<Props> = ({ content, NoBtn, YesBtn, headerContent }) => {
  return (
    <>
      <ModalBackground onClick={NoBtn}></ModalBackground>
      <ModalContent>
        <div className="container">
          <div className="header">
            <ErrorIcon className="emoji" />
            <div className="header-content">{headerContent}</div>
          </div>
          <div>
            <IconButton className="emoji" onClick={NoBtn}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div className="content">{content}</div>
        <ButtonContainer>
          <Button className="noBtn" onClick={NoBtn} variant="text">
            NO
          </Button>
          <Button onClick={YesBtn} variant="text">
            YES
          </Button>
        </ButtonContainer>
      </ModalContent>
    </>
  );
};

export default BasicModal;
