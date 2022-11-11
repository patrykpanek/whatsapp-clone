import React from 'react';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import getRecipientEmail from '../utils/getRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Chat({ id, users }) {
  const [user] = useAuthState(auth);
  let recipientEmail = getRecipientEmail(users, user);
  return (
    <Container>
      <UserAvatar />
      <p>{recipientEmail}</p>
    </Container>
  );
}

export default Chat;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;
