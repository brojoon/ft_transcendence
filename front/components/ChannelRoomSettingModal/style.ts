import styled from '@emotion/styled';

export const Toast = styled.div`
	.hidden {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: #000000;
		z-Index: 501;
		flex-direction: column;
		padding: 0 25px;
		overflowY: auto;
		transform: translateY(100%);
		transition: all ease-in 0.2s;
		opacity: 0;

	}

	.visible {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: #000000;
		z-Index: 501;
		flex-direction: column;
		padding: 0 25px;
		overflowY: auto;
		transform: translateY(0%);
		transition: all ease-out 0.2s;
	}

	& .setting-modal-header {
		display: flex;
		color: white;
		justify-content: space-between
	}

	& .close-icon {
		color: white;
	}

	& .setting-modal-body {
		background-color: #1e1e1e;
		border-radius: 4px;
	}

	& .setting-modal-delete-wrapper {
		width: 100%;
		height: 120px;
		background-color: #1e1e1e;
		color: #e24c34;
		border: 1px solid #a6625f;
		border-radius: 4px;
		padding: 0 15px;
	}

	& .delete-btn {
		background-color: red;
		font-weight: 600;
	}


`;
