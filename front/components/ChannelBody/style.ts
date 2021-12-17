import styled from '@emotion/styled';
import Box from '@mui/material/Box';

export const ChannelBodyContainer = styled(Box)`
	background-color: #121212;
	padding: 15px 8px 15px 15px;
	width: 100%;
	height: calc(100% - 64px);

	& .grid-container {
		width: 100%;
	}

	& .card {
		background-color: #1e1e1e;
		color: white;
	}

	& .channel-name {
		display:flex;
		justify-content: space-between;
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