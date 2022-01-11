import React, { VFC } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ModalBackground, ModalContent, ButtonContainer } from './style';
import { useMediaQuery } from 'react-responsive';
interface Props {
  content: string;
  headerContent: string;
  onClickIntroduceToggle: (e: any) => void;
}
const IntroduceModal: VFC<Props> = ({ content, onClickIntroduceToggle, headerContent }) => {
  const isMobile = useMediaQuery({ maxWidth: 700 });
  return (
    <>
      <ModalBackground onClick={onClickIntroduceToggle}></ModalBackground>
      <ModalContent isMobile={isMobile}>
        <div className="container">
          <div className="header">
            <div className="header-content">{headerContent}</div>
          </div>
          <div>
            <IconButton className="emoji" onClick={onClickIntroduceToggle}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div className="content">{content}</div>
        <ButtonContainer>
          <Button onClick={onClickIntroduceToggle} variant="text">
            CLOSE
          </Button>
        </ButtonContainer>
      </ModalContent>
    </>
  );
};

export default IntroduceModal;
