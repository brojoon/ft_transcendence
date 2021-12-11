import styled from '@emotion/styled';

export const UserStatisticsContainer = styled.div`
	display: flex;
	flex-direction: column;
	color:white;
	width: 100%;
	height: 200px;
	background-color: #1e1e1e;
	border: 1px solid rgba(57, 57, 57, 0.7);
	padding: 5px 10px 15px 10px;
	margin-top: 15px;
	font-size: 20px;

	& .statistics-header {
		font-size: 22px;
		margin: 10px 0 15px 10px;
	}

	& .statistics-count-wrapper {
		margin: 10px;
		display: flex;

	}

	& .statistics-match-icon {
		font-size: 45px;

	}

	& .statistics-match-text {
		width: 100%;
		margin-left: 15px;
		line-height: 40px;
		display: flex;
		justify-content: space-between;
	}
`;