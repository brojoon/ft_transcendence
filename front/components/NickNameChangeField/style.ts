import styled from '@emotion/styled';

export const EditNickNameWrapper = styled.div`
	background-color: #1e1e1e;
	margin-top: 25px;
	display: flex;
	flex-direction: column;
	padding: 20px;


	& .nick-input-label {
		margin-bottom: 10px;
	}

	& .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
		border-color: rgba(255, 255, 255, 0.6);
	}

	& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
		border-color: rgba(255, 255, 255, 1);
	}

	& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
		color: white;
	}

`;


export const NickNameErrorContainer = styled.div<{ visibility: string }>`
	color: red; 
	font-size: 14px; 
	margin-top: 5px;
	visibility: ${(props) => props.visibility};
`;