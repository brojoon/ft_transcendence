import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

export const AdminPageContainer = styled.div`
	background-color: white;
	height: 100%;

	& .admin-page-header {
		background-color: #d3d3d3;
		height: 70px;
		font-weight: 700;
		font-size: 30px;
		line-height: 65px;
		box-shadow:
			rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
	}

	& .header-span {
		margin-left: 50px;
	}
`;

export const AdminPageWrapper = styled(Box)`
	width: 100%;
	height: calc(100% - 180px);
	margin-top: 10px;

	& .tab-panel-2-list {
		width: 100%;
	}

	& .tab-panel-2-text {
		margin-left: 12px;
	}

	& .tab-panel-3-list {
		width: 100%;
	}

	& .tab-panel-3-avatar {
		border: 2px solid red;
	}

	& .tab-panel-3-text {
		margin-left: 12px;
	}

	& .tab-panel-4-list {
		width: 100%;
	}

	& .tab-panel-4-list-item {
		font-size: 16px;
		margin-top: 11px;
		color: gray;
	}

	& .tab-panel-4-avatar {
		border: 2px solid red;
		width: 38px;
		height: 38px;
	}

	& .tab-pannel-4-text {
		margin-left: 12px;
	}

	& .mute-icon {
		color: red;
	}

	& .delete-channel-wrapper {
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
	}

	& .delete-btn {
		background-color: red;
		font-weight: 600;
	}

	& .tab-panel-5-list {
		width: 100%;
	}

	& .tab-panel-5-avatar {
		border: 2px solid red;
	}

	& .tab-panel-5-text {
		margin-left: 12px;
	}



`;


export const TabPanelAatar = styled<{ isState: string }>(Avatar)`
	border: ${(props) => props.isState};
`;