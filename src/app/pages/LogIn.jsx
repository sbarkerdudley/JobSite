import React, { useState } from 'react';
import Axios from 'axios';

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
    <div className="App">

      <div>
        <h1>Login</h1>
        <input
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button type="submit" onClick={login}>Submit</button>
      </div>
    </div>
  );
};

export default LogIn;
