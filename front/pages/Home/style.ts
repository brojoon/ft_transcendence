import styled from '@emotion/styled';

export const Container = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content:center;
	width: 100%;
	margin: 0;
	padding: 0 0 130px 0;
	background-image: url("../../img/bg3.jpg");
	background-repeat : no-repeat;
	background-size : cover;
	flex-direction: column;
	color: white;	

	& .header {
		margin: 0;
		padding: 0;
		font-size: 40px;
	}

	& .header-sub {
		margin: 0 0 40px 0;
		padding: 0;
	}

	& .btn-wrapper {
		display: flex;
	}

	& .introduce-btn {
		border-radius: 25px;
		padding: 10px 22px;
		border: 1px solid white;
		corsor: point;
		background: none;
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		font-weight: 700;

	}

	& .Intro-icon {
		padding: 0;
		margin: 0;
		font-size: 25px;
	}

	& .quick-play-btn {
		border-radius: 25px;
		padding: 10px 22px;
		background: black;
		corsor: point;
		margin-left: 25px;
		box-shadow: none;
		border: none;
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		font-weight: 700;

	}

	& .quick-icon {
		padding: 0;
		margin: 0;
		font-size: 25px;
	} 

`;