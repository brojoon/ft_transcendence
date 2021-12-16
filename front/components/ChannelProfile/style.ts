import styled from '@emotion/styled';
import Button from '@mui/material/Button';

export const Container = styled.div`
	font-size: 20px;
	width: 300px;
	height: 360px;
	font-Weight: 600;
	background-Color: #1e1e1e;
	color: white;
	position: fixed;
	left: -301px;
	box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);

	& .header {
		border-bottom: 1px solid #3a3a3a;
	}

	& .header-wrapper {
		display: flex;
		align-items: center;
		margin: 12px 15px 20px 20px;
	}


	& .avatar {
		margin-top: 5px;
		width: 50px;
		height: 50px;
		
	}

	& .user-text {
		margin-left: 14px;
	}
`;

export const AdminBtn = styled(Button) <{ btnColor: string }>`
	color: ${(props) => props.btnColor};
	font-weight: 600;
	margin: 0 0 0 40px;
`;

export const MatchDataContainer = styled.div`
	border-bottom: 1px solid #3a3a3a;

	& .count-wrapper {
		margin: 17px 15px 20px 20px;
		display: flex;
	}

	& .match-icon {
		font-size: 40px;
	}

	& .match-text {
		width: 100%;
		margin-left: 15px;
		line-height: 40px;
		display: flex;
		justify-content: space-between;
	}
`;

export const ButtonGroupsContainer = styled.div`
	display: flex;
	flex-direction: column;

	& .profile-message-wrapper {
		border-bottom: 1px solid #3a3a3a;
	}

	& .profile-btn {
		color: #979797;
		font-weight: 600;
		margin: 17px 15px 20px 20px;
	}

	& .message-btn {
		color: #43a047;
		font-weight: 600;
		margin: 17px 15px 20px 20px;
	}

	& .mute-kick-ban-btn {
		color: #d50000;
		font-weight: 600;
		margin: 17px 15px 20px 20px;
	}
`;
