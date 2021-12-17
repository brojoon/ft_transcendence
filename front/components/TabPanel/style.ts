import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';

export const UserAvatar = styled(Avatar) <{ isState: string }>`
	border: ${(props) => props.isState};

`;