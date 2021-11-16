import styled from '@emotion/styled';

export const Container = styled.div`

	&.MemberDrawBar {
		position: absolute;
		right: 0;
	  background-color: #363636;
		width: 230px;
		height: 100%;
		margin: 0;
		flex-direction: column;
		align-items: center;
		z-index: 500;
		display: flex;
		padding-bottom: 3px;
	}
	&.hidden {
		transform: translateX(100%);
		visibility: none;
		transition: all ease-in 0.2s;
	}
  &.visible {
		transform: translateX(0%);
		transition: all ease-out 0.2s;
		border-left: 1px solid #4f4f4f;
	}
`;