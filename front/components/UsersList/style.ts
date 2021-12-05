import styled from '@emotion/styled';
import List from '@mui/material/List';

export const UsersListContainer = styled(List)`
	height: 100%;
	width: 100%;
	background-color: #1e1e1e;

	& .list-item-wrapper {
		color: white;
	}

	& .avatar {
		border: 2px solid red;
	}

	& .user {
		margin-left: 12px;
	}
`;