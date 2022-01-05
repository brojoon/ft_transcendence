import styled from '@emotion/styled';
import Box from '@mui/material/Box';

export const DMChatHeaderContainer = styled(Box)`
	flex-grow: 1;

	& .wrapper {
		position: static;
		background-color: #272727;
	}

	& .user-profile-container {
		flex-grow: 1;
	}

	& .user-profile-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		white-space: nowrap;
	}

	& .avatar {
		width: 40px;
		height: 40px;
		left: -10px;
	}

	& .challenge-btn {
		background-color: rgba(22, 120, 209, 0.8);
		color: white;
		width: 160px;
		height: 35px;
		padding: 0 16px;
		font-weight: bold;
	}

	& .challenge-btn:hover	 {
		background-color: rgba(22, 120, 209, 1);
	}


	& .challenge-block-btn {
		width: 160px;
		height: 35px;
		padding: 0 16px;
		background-color: #393939;
		font-weight: bold;
	}
	& .watch-btn {
		width: 160px;
		height: 35px;
		background-color: rgba(255, 212, 0, 0.9);
		font-weight: bold;
	}

	& .watch-btn:hover {
		background-color: rgba(255, 212, 0, 1);

	}

`;