import styled from '@emotion/styled';

export const BackgroundHeight = styled.div`
	height: 100vh;
	width: 100%;
	background-color: #424242;
`;

export const PingPongContainer = styled.div`
	background-color: #424242;
	margin: 0;
	width: 100%;
	height: 100%;
	color: white;

	& .pixi-container {
		border: 5px solid #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

export const GameReadyContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 20px;

	& .player-one-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	& .player-one-avatar {
		width: 300px;
		height: 300px;
	}

	& .player-one-text {
		margin: 10px 0;
	}


	& .versus {
		font-weight: 700;
		font-size: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	& .player-two-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	& .player-two-avatar {
		width: 300px;
		height: 300px;
	}

	& .player-two-text {
		margin: 10px 0;
	}


	& .css-sghohy-MuiButtonBase-root-MuiButton-root.Mui-disabled {
		color: white;
	}

`;

export const UserPointContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 15px;

	& .point-wrapper {
		display: flex;
	}

	& .point-icon {
		font-size: 27px;
	}

`

export const GameInitBtnContainer = styled.div<{ width: string }>`

	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: ${(props) => props.width};

	& .game-btn {
		color: white;
	}

	& .game-text {
		margin-top: 5px;
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