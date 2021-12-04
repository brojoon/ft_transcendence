import styled from '@emotion/styled';

export const ChannelChatListContainer = styled.div`
	background: #1e1e1e;
	width: 100%;
	height: 100%;
	padding: 8px 0 8px 15px;

	& .chat-container {
		display: flex;
		color: white;
	}

	& .profile-container {
		margin-right: 10px;
	}

	& .chat-avatar {
		width: 40px;
		height: 40px;
		margin-bottom: 25px;
	}

	& .chat-text {
		margin-top: 0;
	}
`;