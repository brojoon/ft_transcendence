import styled from '@emotion/styled';

export const UserFriendCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	color: white;
	font-size: 16px;
	width: 100%;
	background-color: #1e1e1e;
	border: 1px solid rgba(57, 57, 57, 0.7);
	height: 300px;

	& .friends-header {
		margin: 18px;
		font-size: 22px;
	}

	& .list-item-wrapper {
		color: white;
	}

	& .list-item-wrapper:hover {
		background-color: rgba(74,75,84,0.5);
	}

	& .avatar {
		border: 2px solid red;
	}

	& .user {
		margin-left: 12px;
	}

`;