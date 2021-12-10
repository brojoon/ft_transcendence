import styled from '@emotion/styled';

export const DMChatListContainer = styled.div`
	background: #1e1e1e;
	width: 100%;
	height: 100%;
	padding: 8px 0 8px 15px;

	& .chatList-wrapper {
		color: white; 
		display: flex;
	}

	& .chatList-profile-wrapper {
		margin-right: 10px;
	}

	& .avatar {
		width: 40px;
		height: 40px;
		margin-bottom: 25px;
	}

	& .chat {
		margin-top: 0;
	}
`;

export const StickyHeader = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  width: 100%;
  position: sticky;
  top: 14px;

  & button {
    font-weight: bold;
    font-size: 13px;
    height: 28px;
		color: white;
    line-height: 27px;
    padding: 0 16px;
    z-index: 2;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
    box-shadow: 0 0 0 1px var(--saf-0), 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    border-radius: 24px;
    position: relative;
    top: -13px;
    background: #363636;
    border: none;
    outline: none;
  }
`;