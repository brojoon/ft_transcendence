import styled from '@emotion/styled';

export const ProfileSettingContainer = styled.div`
	display: flex;
	flex-direction: column;
	color: white;
	margin: 20px;
	width: 100%;
	font-size: 22px;

	& .security-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 20px;
		background-color: #1e1e1e;
	}

	& .two-factor-wrapper {
		display: flex;
	}

	& .user-avatar-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #1e1e1e;
		margin-top: 25px;
	}

	& .user-avatar-wrapper {
		padding: 20px 20px 20px 20px;
	}

	& .header-avatar {
		height: 70px;
	}

	& .user-avatar-upload-section {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	& .avatar-upload-wrapper {
		position: relative;
	}

	& .upload-input {
		display: none;
	}

	& .avatar {
		width: 180px;
		height: 180px;
	}

	& .remove-btn {
		position: absolute;
		top: -5px;
		right: -20px;
		z-index: 10;
	}

	& .remove-icon {
		color: white;
	}

	& .user-nickname {
		color: #52575d;
		font-weight: 500;
	}

	& .upload-btn-wrapper {
		width: 100%;
		margin-top: 12px;
	}

	& .upload-btn {
		width: 100%;
	}
	
`;

export const EditNickNameWrapper = styled.div`
	background-color: #1e1e1e;
	margin-top: 25px;
	display: flex;
	flex-direction: column;
	padding: 20px;


	& .nick-input-label {
		margin-bottom: 10px;
	}

	& .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
		border-color: rgba(255, 255, 255, 0.6);
	}

	& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
		border-color: rgba(255, 255, 255, 1);
	}

	& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
		color: white;
	}

`;

export const NickNameErrorContainer = styled.div<{ visibility: string }>`
	color: red; 
	font-size: 14px; 
	margin-top: 5px;
	visibility: ${(props) => props.visibility};
`;