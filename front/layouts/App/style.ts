import styled from '@emotion/styled';

export const ScrollbarColor = styled.div`
  ...style;
  background-color: #787c7f;
  width: 8px;
  border-radius: 5px;

	&:hover {
		background-color: white;
	}

  & .Toastify__toast-theme--ligh {
		background-color: red;
  }
`;