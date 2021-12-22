import styled from '@emotion/styled';
import Button from '@mui/material/Button';

export const AdminContainer = styled.div`
	font-size: 20px;
	width: 300px;
	height: 230px;
	font-weight: 600;
	background-color: #1e1e1e;
	color: white;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 9999;
	box-shadow:
		0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);

	& .header {
		border-bottom: 1px solid #3a3a3a;
	}

	& .header-wrapper {
		display: flex;
		align-items: center;
		margin: 17px 15px 20px 20px;
	}


	& .avatar {
		width: 50px;
		height: 50px;
		
	}

	& .user-text {
		margin-left: 14px;
	}

	& .game-history-container {
		border-bottom: 1px solid #3a3a3a;
	}

	& .game-history-container > .game-history-wrapper {
		margin: 17px 15px 20px 20px;
		display: flex;
	}

	& .game-history-container .emoji {
		font-size: 40px;
	}

	& .history-text {
		margin-left: 15px;
		line-height: 40px;
	}




`;

export const AdminBtn = styled(Button) <{ btncolor: string }>`
	color: ${(props) => props.btncolor}; 
	font-weight: 600;
	margin: 0 0 0 40px;
`;

export const ButtonGroupContainer = styled.div`
	display: flex;
	flex-direction: column;

	& .group-wrapper {
		border-bottom: 1px solid #3a3a3a;
	}

	& .profile-btn {
		color: #979797;
		font-weight: 600;
		margin: 17px 15px 20px 20px;
	}
	
	& .feat-button {
		color: #d50000;
		font-weight: 600;
		margin: 17px 15px 20px 20px;
	}
`;