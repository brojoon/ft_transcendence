import styled from '@emotion/styled';

export const FirstStepContainer = styled.div`
	display: flex;
	color: white;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;g
	font-weight: 700;
	font-size: 22px;

	& .avatar-wrapper {
		margin-bottom: 10px;
	}

	& .avatar {
		width: 180px;
		height: 180px;
	}

	& .input-nickname-wrapper {
		margin: 10px 0x; 
	}

	& .input-nickname {
		color: white;
	}


	& .input-icon {
		color: black;
		background-color: white;
	}

	& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root {
		color: white;
	}

	& .css-1480iag-MuiInputBase-root-MuiInput-root:before {
		border-bottom: 1px solid rgba(255, 255, 255, 0.6);
	}

	& .css-1480iag-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before {
		border-bottom: 1px solid rgba(255, 255, 255, 1);
	}
`;

export const ErrorText = styled.div<{ visible: string }>`
	color: red;
	margin-bottom: 15px;
	font-size: 14px;
	font-weight: 500;
	visibility: ${(props) => props.visible};
`;