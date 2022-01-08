import styled from '@emotion/styled';

export const ProtectedRoomModalBack = styled.div`
	color: white;
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 2000;
	background-color: rgba(30, 30, 030, 0.5);
`;

export const ProtectedRoomModalContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	width: 500px;
	height: 180px;
	background-color: #1e1e1e;
	color: #979797;
	opacity: 1;
	border: 1px solid #1e1e1e;
	border-radius: 3px;
	padding: 10px 20px 10px 20px;
	z-index: 3000;
	transform: translate(-50%, -50%);
	boxShadow:
		0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);

	& .header {
		display: flex;
		color: white;
		justify-content: space-between;
	}

	& .close-icon {
		color: white;
	}

	& .body {
		display: flex;
	}

	& .form-control {
		width: 100%;
		color: white;
		margin-top: 15px;
	}

	& .input-label {
		color: white;
	}

	& .visibility-icon {
		color: white;
	}

	& .join-btn {
		width: 120px;
		height: 45px;
		background-color: #597aff;
		border-color: #597aff;
		font-weight: bold;
		margin: 20px 0 0 10px;
	}

	& .password-error-text {
		color: red;
		font-weight: 600;
	}

	& .css-1480iag-MuiInputBase-root-MuiInput-root {
		color: white;
	}

	& .css-1480iag-MuiInputBase-root-MuiInput-root:before {
		border-bottom: 1px solid rgba(255, 255, 255, 0.6);
	}

	& .css-1480iag-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before {
		border-bottom: 1px solid rgba(255, 255, 255, 1);

	}
`;