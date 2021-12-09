import styled from '@emotion/styled';
import List from '@mui/material/List';

export const MuiList = styled(List)`
	width: 100%;
	height: 100%;
	background-color: #1e1e1e;

	& .block-list-wrapper:hover {
		background-color: rgba(74,75,84,0.5);
	}

	& .avatar {
		border: 2px solid red;
	}

	& .list-text {
		margin-left: 12px;
		color: white;
	}
`;