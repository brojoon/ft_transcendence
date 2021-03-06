import styled from '@emotion/styled';
import Badge from '@mui/material/Badge';
import { styled as muiStyled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';


export const LeftSideBarContainer = styled.div`
	width: 55px;
	flex-shrink: 0;
	border-right: '5px solid #121212';

	& .fab-wrapper {
		background: #4d4d4d;
		margin-top: 8px;
		width: 30px;
		height: 1px;
	}
`;

export const Toolbar = styled.div`
	position: fixed;
	left : 0;
	height : 100%;
	width: 55px;
	background-color: #363636;
	font-size: 50px;
	display: flex;
`;

export const NavIcons = styled.div`
	width: 50px;
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 15px;

	.sideBarIcon {
		font-size: 28px;
		width: 45px;
		height: 45px;
		box-shadow: none;
		margin-top: 10px;
	}

	.sideBarIcon:hover {
		background-color: #4a4b54;


	}	
	
	.sideBarIconLast {
		position: fixed;
		bottom: 5px;
		left: 5px;
		width: 45px;
		height: 45px;
		box-shadow: none;
	}

	.sideBarIconLast:hover {
		background-color: #4a4b54;

	}
	
`;

export const StyledBadge = muiStyled(Badge)(({ theme }) => ({
	marginBottom: '15px',
	cursor: 'pointer',
	'& .MuiBadge-badge': {
		backgroundColor: '#44b700',
		color: '#44b700',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			borderRadius: '50%',
			animation: 'ripple 1.2s infinite ease-in-out',
			border: '1px solid currentColor',
			content: '""',
		},
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1,
		},
		'100%': {
			transform: 'scale(2.4)',
			opacity: 0,
		},
	},
}));

export const MyFab = styled(Fab) <{ selected: boolean }>`
	background-color: ${(props) => props.selected ? '#4a4b54' : '#363636'};
	box-shadow: 0;
	color: white;

`;
