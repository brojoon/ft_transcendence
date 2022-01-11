import styled from '@emotion/styled';

export const MatchContainer = styled.div<{ ismobile: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	flex-direction: column;
	height: 100vh;

	color: white;

	& .progress {
		color: white;
	}

	& > h1 {
		font-size: ${(props) => props.ismobile ? '1.3em' : '2em'}; 
	}
`;