import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';

export const UserAvatar = styled(Avatar) <{ isstate: string }>`
	border: ${(props) => props.isstate};

`;