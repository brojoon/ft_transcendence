import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';


export const UserFriendCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	color: white;
	font-size: 16px;
	width: 100%;
	background-color: #1e1e1e;
	border: 1px solid rgba(57, 57, 57, 0.7);
	height: 300px;

	& .friends-header {
		margin: 18px;
		font-size: 22px;
	}

	& .list-item-wrapper {
		color: white;
	}

	& .list-item-wrapper:hover {
		background-color: rgba(74,75,84,0.5);
	}

	& .user {
		margin-left: 12px;
	}

	& .no-friend-wrapper {
		display: flex;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

`;

export const UserAvatar = styled<{ isState: string }>(Avatar)`
	border: ${(props) => props.isState};

`;