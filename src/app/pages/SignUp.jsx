import React, { useState } from 'react';
import Axios from 'axios';
import { Input, Stack, Typography } from '@mui/material';
import PrimaryButton from '../components/PrimaryButton';

const SignUp = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const register = () => {
    Axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: 'http://localhost:3000/register',
    });
  };
  return (
    <Stack
      direction="column"
      sx={{ p: 2, m: 2 }}
    >
      <Typography variant="h3">
        Register
      </Typography>
      <br />
      <Input
        placeholder="username"
        onChange={(e) => setRegisterUsername(e.target.value)}
      />
      <Input
        placeholder="password"
        onChange={(e) => setRegisterPassword(e.target.value)}
      />
      <PrimaryButton
        onClick={register}
        text="Sign Up"
      />
    </Stack>
  );
};

export default SignUp;
