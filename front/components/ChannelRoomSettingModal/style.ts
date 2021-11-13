import styled from '@emotion/styled';

export const Toast = styled.div`
	.hidden {
		transform: translateY(100%);
		transition: all ease-in 0.2s;
		opacity: 0;
	}

	.visible {
		transform: translateY(0%);
		transition: all ease-out 0.2s;
	}
`;