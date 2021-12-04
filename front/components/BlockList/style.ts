import styled from '@emotion/styled';
import List from '@mui/material/List';

export const MuiList = styled(List)`
	width: 100%;
	height: 100%;
	background-color: #1e1e1e;

	& .avatar {
		border: 2px solid red;
	}

	& .list-text {
		margin-left: 12px;
		color: white;
	}
`;