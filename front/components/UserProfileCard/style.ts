
import styled from '@emotion/styled';
import Box from '@mui/material/Box';

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

	& .card-avatar {
		width: 180px;
		height: 180px;
		margin-bottom: 20px;
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
		border-color: #393939;
		font-weight: bold;
	}

	& .challenge-btn {
		width: 100%;
		height: 35px;
		background-color: #1678d1;
		border-color: #1678d1;
		font-weight: bold;
	}

	& .friend-block-btn {
		width: 100%;
		height: 35px;
		background-color: #393939;
		border-color: #393939;
		font-weight: bold;
		margin: 20px 0 0 0;
	}

	& .friend-unfriend-btn {
		width: 100%;
		height: 35px;
		background-color: #1e1e1e;
		border: 1px solid #3a3a3a;
		font-weight: bold;
		margin: 20px 0 0 0;
		color: #ec3f31;
	}


	& .friend-btn {
		width: 100%;
		height: 35px;
		background-color: #5ebdff;
		border-color: #5ebdff;
		font-weight: bold;
		margin: 20px 0 0 0;
	}

	& .unblock-btn {
		width: 100%;
		height: 35px;
		background-color: red;
		border-color: red;
		font-weight: bold;
		margin: 20px 0 0 0;
	}

	& .block-btn {
		width: 100%;
		height: 35px;
		background-color: red;
		border-color: red;
		font-weight: bold;
		margin: 20px 0 0 0;
	}

	& .message-block-btn {
		width: 100%;
		height: 35px;
		background-color: #393939;
		border-color: #393939;
		font-weight: bold;
		margin: 20px 0 0 0;
	}

	& .message-btn {
		width: 100%;
		height: 35px;
		background-color: #9CFA24;
		border-color: #9CFA24;
		font-weight: bold;
		margin: 20px 0 0 0;
	}
`;