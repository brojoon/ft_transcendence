import styled from '@emotion/styled';

export const ChatBoxContainer = styled.div`
	height: 60px;
	background-color: #272727;
	padding: 20px 6px 3px 16px;
	display: flex;
	justify-content: center;
	align-items: center;

	& .chat-box-form {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	& .chat-box-input {
		width: 95%;
		outline: none;
		resize: none;
		border-radius: 4px;
		background: #bdbdbd;
		font-size: 16px;
		font-weight: bold;
		font-family: monospace;
		height: 37px;
		color: black;
		border: none;
		padding: 10px;
	}

	& .submit-btn {
		background: #272727;
		box-shadow: none;
		border: none;
		color: white;
		margin-left: 10px;
		cursor: pointer;
	}
`;