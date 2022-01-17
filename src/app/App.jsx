import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ProfileProvider from './components/Profile/ProfileContext';
import JobSearchProvider from './components/JobSearch/JobSearchContext';
import {
  Home, Dashboard, LogIn, SignUp, Jobs, Profile,
} from './pages';
import { useWindowSize } from './utils/customHooks';
import Theme from './Theme';

import NavBar from './components/NavBar';
import authUtils from './utils/authUtils';

const App = () => {
  const { width } = useWindowSize();
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    authUtils
      .getUser()
      .then((res) => setLoggedIn(res.data.loggedIn));
  }, []);

  const newLogIn = (cb) => {
    authUtils.getUser()
      .then((res) => {
        setLoggedIn(res.data.loggedIn);
        if (!res.data.loggedIn) {
          alert('Invalid username or password');
        } else if (typeof (cb) === 'function') {
          cb(res.data.loggedIn);
        }
      });
  };

  const nav = (val) => {
    if (val) {
      navigate('/dashboard');
    }
  };

  return (
    <div data-testid="app">
      <CssBaseline />
      <ThemeProvider theme={Theme}>
        <ProfileProvider>
          <JobSearchProvider>
            <Grid container direction="column" sx={{ width: '100vw', minHeight: '100vh' }}>
              <NavBar loggedIn={loggedIn} />

              <Routes>
                <Route path="/" element={<Home newLogIn={newLogIn} nav={nav} />} exact />
                <Route path="/signup" element={width < 800 ? <SignUp /> : <Home createAccount />} exact />
                <Route path="/login" element={width < 800 ? <LogIn /> : <Home newLogIn={newLogIn} />} exact />
                <Route path="/dashboard" element={<Dashboard />} exact />
                <Route
                  path="/profile"
                  element={loggedIn ? <Profile /> : <Home newLogIn={newLogIn} />}
                  exact
                />
                <Route
                  path="/jobs"
                  element={
                    loggedIn ? <Jobs /> : <Home newLogIn={newLogIn} />
                  }
                  exact
                />
              </Routes>
            </Grid>
          </JobSearchProvider>
        </ProfileProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
