
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

export const UserProfileCardContainer = styled(Box)`
	width: 100%;

	& .card-container {
		background-color: #1e1e1e;
		color: white;
		border: 1px solid rgba(57, 57, 57, 0.7);
		width: 100%;
		padding: 5px 10px 15px 10px;
	}

	& .card-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	& .card-user-text {
		color: #52575d;
		font-weight: 500;
	}

	& .card-action {
		display: flex;
		flex-direction: column;
		justify-content: space-betweens;
	}

	& .challenge-block-btn {
		width: 100%;
		height: 35px;
		background-color: #393939;
		font-weight: bold;
	}

	& .watch-btn {
		width: 100%;
		height: 35px;
		background-color: rgba(255, 212, 0, 0.8);
		font-weight: bold;
	}

	& .watch-btn:hover {
		background-color: rgba(255, 212, 0, 1);
	}

	& .challenge-btn {
		width: 100%;
		height: 35px;
		background-color: rgba(22, 120, 209, 0.8);
		font-weight: bold;
	}

	& .challenge-btn:hover	 {
		background-color: rgba(22, 120, 209, 1);
	}

	& .friend-block-btn {
		width: 100%;
		height: 35px;
		background-color: #393939;
		font-weight: bold;
		margin: 20px 0 0 0;
	}

	& .friend-unfriend-btn {
		width: 100%;
		height: 35px;
		background-color: rgba(30, 30, 30, 0.8);
		font-weight: bold;
		margin: 20px 0 0 0;
		color: #ec3f31;
	}

	& .friend-unfriend-btn:hover {
		background-color: rgba(30, 30, 30, 1);
	}


	& .friend-btn {
		width: 100%;
		height: 35px;
		background-color: rgba(94, 189, 255, 0.8);
		font-weight: bold;
		margin: 20px 0 0 0;
	}

	& .friend-btn:hover {
		background-color: rgba(94, 189, 255, 1);
	}

	& .unblock-btn {
		width: 100%;
		height: 35px;
		background-color: red;
		font-weight: bold;
		margin: 20px 0 0 0;
	}

	& .block-btn {
		width: 100%;
		height: 35px;
		background-color: rgba(255, 0, 0, 0.8);
		font-weight: bold;
		margin: 20px 0 0 0;
	}

	& .block-btn:hover {
		background-color: rgba(255, 0, 0, 1);
	}

	& .message-block-btn {
		width: 100%;
		height: 35px;
		background-color: #393939;
		font-weight: bold;
		margin: 20px 0 0 0;
	}

	& .message-btn {
		width: 100%;
		height: 35px;
		background-color: rgba(156, 250, 36, 0.8);
		font-weight: bold;
		margin: 20px 0 0 0;
	}

	& .message-btn:hover {
		background-color: rgba(156, 250, 36, 1);
	}
`;

export const UserAvatar = styled(Avatar) <{ isstate: string }>`
	border: ${(props) => props.isstate};
	width: 180px;
	height: 180px;
	margin-bottom: 20px;
`;