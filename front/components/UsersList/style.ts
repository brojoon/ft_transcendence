import styled from '@emotion/styled';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';

export const UsersListContainer = styled(List)`
	height: 100%;
	width: 100%;
	background-color: #1e1e1e;

	& .list-item-wrapper {
		color: white;
	}

	& .list-item-wrapper:hover {
		background-color: rgba(74,75,84,0.5);
	}

	& .avatar {
		border: 2px solid red;
	}

	& .user {
		margin-left: 12px;
	}
`;

export const UserAvatar = styled<{ isState: string }>(Avatar)`
	border: ${(props) => props.isState};
	width: 60px;
	height: 60px;
`;