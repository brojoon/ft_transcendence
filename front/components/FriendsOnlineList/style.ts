import styled from '@emotion/styled';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';

export const FriendsOnlineListContainer = styled(List)`
	width: 100%:
	height: 100%;
	background: #1e1e1e;

	& .friend-list-wrapper:hover {
		background-color: rgba(74,75,84,0.5);
	}

	& .text {
		margin-left: 12px;
		color: white;
	}

`;

export const UserAvatar = styled<{ isState: string }>(Avatar)`
	border: ${(props) => props.isState};

`;