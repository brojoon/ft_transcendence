import styled from '@emotion/styled';

export const PingPongContainer = styled.div`
	background-color: #424242;
	margin: 0;
	width: 100%;
	height: 100vh;
	color: white;

	& .pixi-container {
		border: 5px solid #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

export const GameSettingContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 20px;

	& .css-1kty9di-MuiFormLabel-root-MuiInputLabel-root {
		color: white;
	}

	& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
		color: white;
	}
`;

export const GameReadyContainer = styled.div`
	display: flex;
	justify-content: space-between;
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

	& .player-one-ready-btn {
		color: white;
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

	& .player-two-ready-btn {
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