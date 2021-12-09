import styled from '@emotion/styled';

export const ChannelLeftDrawBarContainer = styled.div`
	width: 280px;
	height: 100%;
	padding: 30px 15px;
	background-color: #353636;
	border-right: 1px solid #4f4f4f;
	overflow-y: hidden;

	& .search-input {
		width: 100%;
		outline: none;
		resize: none;
		border-radius: 4px;
		background: #bdbdbd;
		font-size: 16px;
		font-weight: bold;
		font-family: monospace;
		color: black;
		border: none;
		padding: 0 15px;
		height: 40px;
	}


	& .header-wrapper {
		border-top: 1px solid #4f4f4f;
		border-bottom: 1px solid #4f4f4f;
		margin: 10px 0;
		padding: 14px 0 0;
		height: 80px;
	}

	& .channel-discover-wrapper {
		padding: 0;
		margin: 0;
	}

	& .channel-discover-wrapper:hover {
		background-color: rgba(74,75,84,0.7);
	}

	& .fireicon {
		margin-right: 15px;
	}

	& .channel-discover-btn {
		color: white;
	}

	& .channel-list-wrapper {
		height: 70%;
	}

	& .channel-list {
		padding: 0;
		margin: 0;
	}

	& .channel-list:hover {
		background-color: rgba(74,75,84,0.7);
	}

	& .css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root.Mui-selected {
		background-color: #666666 !important;
	}

	& .channel-list-btn {
		padding: 0;
		margin: 0;
	}

	& .channel-list-text {
		color: white;
		margin: 4px 0 4px 18px
	}


	
	& .footer {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 11%;
	}

	& .create-btn {
		width: 180px;
		height: 35px;
		background-color: #597aff;
		border-color: #597aff;
		font-weight: bold;
	}
	
	
	& .css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root.Mui-selected {
		background-color: #666666;
	}
`;