import styled from '@emotion/styled';

export const ModalBackground = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(30, 30, 030, 0.5);
	z-index: 100;
`;

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

	& .List-header {
		font-size: 16px;
		margin-top: 11px;
		color: gray;
	}

	& .member-avatar {
		border: 2px solid red;
		width: 38px;
		height: 38px;
	}

	& .member-text {
		margin-left: 12px;
		color: white;
	}

	& .channel-room-btn {
		width: 200px;
		height: 35px;
		background-color: #597aff;
		border-color: #597aff;
		font-weight: bold;
		margin: 10px 0;
	}

	& .unmute-icon {
		color: white;
	}

	& .mute-icon {
		color: red;
	}
`;