import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';


export const MyProfileCardContainer = styled(Box)`
	width: 100%;

	& .card {
		background-color: #1e1e1e;
		color: white;
		border: 1px solid rgba(57, 57, 57, 0.7);
		width: 100%;
		padding: 5px 10px 15px 10px;
	}

	& .card-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	& .avatar {

	}

	& span {
		color: #52575d;
		font-weight: 500;
	}

	& .card-actions {
		display: flex;
		flexDirection: column;
		justifyContent: center;
		alignItems: center;

	}

	& .setting-link {
		width: 100%;
	}

	& .setting-btn {
		width: 100%;
		height: 35px;
		background-color: #597aff;
		border-color: #597aff;
		font-weight: bold;
	}

	& .admin-btn {
		width: 100%;
		height: 35px;
		background-color: rgba(255, 212, 0, 0.9);
		font-weight: bold;
	}

	& .admin-btn:hover {
		background-color: rgba(255, 212, 0, 1);

	}

	& .admin-block-btn {
		width: 100%;
		height: 35px;
		background-color: #393939 !important;
		border-color: #393939 !important;
		font-weight: bold;
	}
`;

export const UserAvatar = styled(Avatar) <{ isstate: string }>`
	border: ${(props) => props.isstate};
	width: 180px;
	height: 180px;
	margin-bottom: 20px;
`;