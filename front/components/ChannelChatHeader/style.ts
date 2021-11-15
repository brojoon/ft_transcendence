import styled from '@emotion/styled';
import Toolbar from '@mui/material/Toolbar';

export const MyToolbar = styled(Toolbar)`
	.myFab {
		width: 45px;
		height: 45px;
		box-shadow: none;
		color: white;
	}
	.on {
		background-color: #4d4d4d;
	}
	.off {
		background-color: #272727;
	}
	.myFab:hover {
		background-color: #4a4b54;
	}

`;

