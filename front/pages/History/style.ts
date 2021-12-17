import styled from '@emotion/styled';

export const HistoryContainer = styled.div`
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	font-size: 30px;
	height: 100vh;

	& .wrapper {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
	}

	& .result-wrapper {
		display: flex;
		margin-bottom: 18px;
	}

	& .result-icon {
		font-size: 45px;
	}

	& .result-winnert-text {
		font-size: 30px;
	}




`;

export const UserProfileContainer1 = styled.div`
	margin-bottom: 15px;

	
	& .profile1-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 350px;
		height: 410px;
		border: 1px solid rgba(57, 57, 57, 0.7);
		background-color: #1e1e1e;
		white-space: overflow-wrap;

	}

	& .profile1-wrapper:hover {
		background: #666666;
	}

	& .avatar1 {
		width: 250px;
		height: 250px;
		margin-bottom: 8px;
	}

	& .profile1-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: white;
	}
	


`;

export const UserProfileContainer2 = styled.div`
	margin-bottom: 15px;

	& .profile2-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 350px;
		height: 410px;
		border: 1px solid rgba(57, 57, 57, 0.7);
		background-color: #1e1e1e;
		white-space: overflow-wrap;
	}

	& .profile2-wrapper:hover {
		background: #666666;
	}

	& .avatar2 {
		width: 250px;
		height: 250px;
		margin-bottom: 8px;
	}

	& .profile2-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: white;
	}
	
`;

export const ProfileOneText = styled.div<{ winner: string }>`
	color: ${(props) => props.winner};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const ProfileTwoText = styled.div<{ winner: string }>`
	color: ${(props) => props.winner};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;