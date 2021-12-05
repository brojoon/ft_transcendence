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