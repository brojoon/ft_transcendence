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
		background-color: #1678d1;
		border-color: #1678d1;
		color: white;
		width: 160px;
		height: 35px;
		padding: 0 16px;
		font-weight: bold;
	}

`;