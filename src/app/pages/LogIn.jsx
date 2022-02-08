import React, { useState } from 'react';
import Axios from 'axios';
import { Input, Stack, Typography } from '@mui/material';
import PrimaryButton from '../components/PrimaryButton';

const LogIn = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const login = () => {
    Axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: 'http://localhost:3000/login',
    });
  };

  return (
    <Stack
      direction="column"
      sx={{ p: 2, m: 2 }}
    >
      <Typography variant="h3">
        Login
      </Typography>
      <br />
      <Input
        placeholder="username"
        onChange={(e) => setLoginUsername(e.target.value)}
      />
      <Input
        placeholder="password"
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <PrimaryButton
        onClick={login}
        text="Login"
      />
    </Stack>
  );
};

export default LogIn;
