import styled from '@emotion/styled';

export const UserMatchesContainer = styled.div`
	display: flex;
	flex-direction: column;
	color: white;
	font-size: 16px;
	width: 100%;
	background-color: #1e1e1e;
	border: 1px solid rgba(57, 57, 57, 0.7);

	& .profile-matches-header {
		margin: 18px;
		font-size: 22px;
	}

	& .profile-pagination-wrapper {
		border-top: 1px solid rgba(57, 57, 57, 0.7);
		color: white;

	}

	& .profile-pagination-wrapper {
		color: white;
	}
	& .profile-pagination {
		overflow: hidden;
	}

	& .css-1mf6u8l-MuiSvgIcon-root-MuiSelect-icon {
		color: white;
	}

	& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon {
		color: white;
	}
	
`;

export const UserMatchesListWrapper = styled.div`

  & .list-item-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid rgba(57, 57, 57, 0.7);
		padding: 6px 15px;
		color: white;
	}

	& .list-item-wrapper:hover {
		background: #666666;
	}

	& .avatar {
		width: 56px;
		height: 56px;
	}

	& .opponent-text {
		color: white;
	}

	& .user-text {
		color: white;
	}

	& .user-matches-icon-win {
		font-size: 34px;
		color: #ffe937;
	}
	& .user-matches-icon-lose {
		font-size: 34px;
		color: #ec443b;
	}

	& .matches-text {
		display: flex;
		justify-content: space-between;
		width: 63%;
	}
`;

export const UserMatchesResult = styled.div<{ textColor: string }>`
	color: ${((props) => props.textColor)};
`;