import styled from '@emotion/styled';

export const DMLeftDrawerContainer = styled.div`
	width: 300px;
	height: 100%;
	padding: 30px 15px;
	background-color: #363636;
	border-right: 1px solid #4f4f4f;

	& .search-input {
		width: 100%;
		outline: none;
		resize: none;
		border-radius: 4px;
		background: #bdbdbd;
		font-size: 16px;
		font-weight: bold;
		font-family: monospace;
		height: 7%;
		color: black;
		border: none;
		padding: 0 12px;
	}

	& .friend-icon-wrapper {
		border-top: 1px solid #4f4f4f;
		border-bottom: 1px solid #4f4f4f;
		margin: 10px 0;
		padding: 14px 0 0;
		height: 14%;
	}

	& .css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root.Mui-selected {
		background-color: #666666;
	}

	& .friend-list-wrapper {
		margin: 0;
		padding: 0;
	}

	& .friend-list-btn {
		color: white;
	}

	& .friend-list-icon {
		margin-right: 20px;
	}
`;

export const DMListContainer = styled.div`
	height: 79%;

	& .list {
		padding: 5px 0;
		margin: 0;
	}

	& .list-item-button {
		padding: 8px;
	}

	& .avatar {
		border: 2px solid red;
		margin-left: 0;
	}

	& .user-id {
		margin-left: 12px;
		color: white;
	}
`;