import styled from '@emotion/styled';

export const TwoFactorSwitchBack = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1000;
	background-color: rgba(30, 30, 030, 0.5);
`;

export const TwoFactorSwitchContainer = styled.div`
	position: absolute;
	width: 500px;
	height: 550px;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 2000;
	display: flex;
	flex-direction: column;
	background-color: #1e1e1e;
	box-shadow:
		0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
	
	& .close-icon {
		color: white;
		margin-left: 430px;
	}

	& .qr-img {
		width: 400px;
		height: 400px;
		margin: 10px 45px 0 45px;
	}

	& .text-field {
		margin: 20px;

	}

	& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root {
		color: white;
	}

	& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
		color: white;
	}

	& .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
		border-color: rgba(255, 255, 255, 0.6);
	}

	& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
		border-color: rgba(255, 255, 255, 1);

	}






		`;