import styled from '@emotion/styled';

export const UserRightModalBack = styled.div`
	color: white;
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 6000;
	background-color: rgba(30, 30, 030, 0.5);

`;

export const UserRightModalContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 400px;
	background-color: #1e1e1e;
	color: #979797;
	opacity: 1;
	border: 1px solid #1e1e1e;
	border-radius: 4px;
	z-index: 7000;
	transform: translate(-50%, -50%);
	box-shadow:
		0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);

	& .wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fec107;
	}

	& .header {
		margin: 1px 10px 0 8px;
		font-size: 20px;
		color: white;
		display: flex;
	}

	& .error-icon {
		color: white;
	}

	& .header-content {
		margin: 0 0 0 4px;
		line-height: 22px;
	}

	& .close-icon {
		color: white;
	}

	& .body {
		margin: 10px;
	}

	& .button-wrapper {
		display: flex;
		justify-content: flex-end;
		margin-top: 15px;
		font-weight: 600;
	}

	& .moderate-btn {
		font-weight: 600
	}

	& .ban-btn {
		font-weight: 600;
		color: red;
	}
`;