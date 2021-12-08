import styled from '@emotion/styled';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const InputCheck = styled.div<{ textColor: string }>`
	display: flex;
	justify-content: space-between;
	color: ${(props) => props.textColor};
	font-size: 12px;
	margin: 0 !important;

	& .name-length {
		white-space: nowrap;
	}
`;

export const NameErrorText = styled.span<{ visible: string }>`
	margin-left: 8px;
	visibility: ${(props) => props.visible};
`;



export const ChannelFormContainer = styled(FormControl)`
	width: 100%;

	& .input {
		color: white;
	}

	& .MuiInput-root{
		color: white;
	}

	& .css-1480iag-MuiInputBase-root-MuiInput-root:before {
		border-bottom: 1px solid rgb(255, 255, 255, 0.6);

	}

	& .css-1480iag-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before {
			border-bottom: 1px solid white;
	}

`;

export const ChannelCreateBtn = styled(Button)`
	width: 91px;
	height: 36px;
	margin 5px 0 12px 8px;
	font-weight:600;
`;



export const ErrorText = styled.h3`
color: red;
`;

