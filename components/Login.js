import { Button } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { auth, provider } from '../firebase';

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="https://cdn2.downdetector.com/static/uploads/logo/whatsapp-messenger.png" />
        <Button onClick={signIn} variant="outlined">
          Sign in with Google
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 100px;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;
