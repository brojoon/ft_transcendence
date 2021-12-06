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
		justify-content: space-between;
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

export const UserProfileContainer1 = styled.div<{ winner: string }>`
	color: ${(props) => props.winner};
	margin-bottom: 15px;

	& .profile1-wrapper {
		margin-left: 25px;
	}

	& .avatar1 {
		width: 250px;
		height: 250px;
		margin-bottom: 8px;
	}


`;

export const UserProfileContainer2 = styled.div<{ winner: string }>`
	color: ${(props) => props.winner};
	margin-bottom: 15px;

	& .profile1-wrapper2 {
		margin-right: 25px;
	}

	& .avatar2 {
		width: 250px;
		height: 250px;
		margin-bottom: 8px;
	}


`;