import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import Avatar from '@mui/material/Avatar';
import {
  MoreVert,
  AttachFile,
  SettingsInputAntenna,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import firebase from 'firebase/compat/app';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import getRecipientEmail from '../utils/getRecipientEmail';
import ReactTimeAgo from 'react-time-ago';

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [input, setInput] = useState('');
  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  );

  const [recipientSnapshot] = useCollection(
    db
      .collection('users')
      .where('email', '===', getRecipientEmail(chat.users, user))
  );

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('users').doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput('');
  };

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}

        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last active:{' '}
              {recipient?.lastSeen?.toDate() ? (
                <ReactTimeAgo date={recipient?.lastSeen?.toDate()} />
              ) : (
                'Unavailable'
              )}
            </p>
          ) : (
            <p>Loading Last active ...</p>
          )}
          <p></p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert color="black" />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage />
      </MessageContainer>

      <InputContainer>
        <EmojiEmotionsIcon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />

        <Stack direction="row" spacing={2}>
          <Button
            type="submit"
            onClick={sendMessage}
            variant="contained"
            color="success"
          >
            SEND
          </Button>
        </Stack>
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Input = styled.input`
  flex: 1;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  outline: 0;
  border: none;
  background-color: whitesmoke;
  z-index: 100;
`;

const EndOfMessage = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

const HeaderIcons = styled.div``;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 1000;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  h3 {
    margin-bottom: 3px;
  }
  p {
    font-size: 14px;
    color: gray;
  }
`;
