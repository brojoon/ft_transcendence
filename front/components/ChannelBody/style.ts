import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';


export const ChannelBodyContainer = styled(Box)`
	background-color: #121212;
	padding: 15px 8px 15px 15px;
	width: 100%;
	height: calc(100% - 64px);

	& .grid-container {
		width: 100%;
	}
`;

export const ScrollbarColor = styled.div`
  ...style;
  background-color: #787c7f;
  width: 8px;
  border-radius: 5px;

	&:hover {
		background-color: white;
	}
`;

export const ChannelCard = styled(Card) <{ ismobile: boolean }>`
	background-color: #1e1e1e;
	width: ${(props) => { return props.ismobile ? '95%' : '100%' }};
	color: white;
`;

export const ChannelName = styled(Typography)`
	display:flex;
	justify-content: space-between;
`;

