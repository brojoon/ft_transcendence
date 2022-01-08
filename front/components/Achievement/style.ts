import styled from '@emotion/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	color: white;

	& .achieve-header {
		font-size: 18px;
		font-weight: 700;
		padding: 15px 15px;
		border-radius: 3px 3px 0 0;
		background-color: #1e1e1e;
	}

	& .header {
		display: flex;
		justify-content: space-between;
	}

	& .content {
		font-size: 14px;
		color: #bebebe;
		font-weight: 600
	}
`;

export const AchieveBody = styled.div`
	position: relative;
	text-align: center;

	& .progress-text {
			z-index: 15;
			position: absolute;
			right: 50%;
			transform: translateX(50%);
			line-height: 22px;
			font-size: 12px;
			white-space: nowrap;
	}

	& .progress-background {
		background-color: #253161;
		width: 100%;
		font-weight: 500;
		border-radius: 0 0 3px 3px;
		height: 23px;
	}
`;

export const ProgressBar = styled.div<{ width: string }>`
  width: ${(props) => props.width};
	position: absolute;
	z-index: 10;
	background-color: #365dff;
	font-weight: 500;
	border-radius: 0 0 3px 3px;
	height: 23px;
	text-align: center;
	transition: all ease-out 0.5s;
`;