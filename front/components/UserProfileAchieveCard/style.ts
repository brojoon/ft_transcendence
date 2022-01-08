import styled from '@emotion/styled';

export const UserProfileAchieveCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	color: white;
	font-size: 16px;
	width: 100%;
	background-color: #1e1e1e;
	border: 1px solid rgba(57, 57, 57, 0.7);
	margin-bottom: 15px;
	height: 320px;

	& .achievements-header {
		margin: 18px;
		font-size: 22px;
	}

	& .achievements-achievement {
		margin: 15px;
		border: 1px solid rgba(57, 57, 57, 0.7);
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