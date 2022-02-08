/* eslint-disable max-len */
import React from 'react';
import {
  Grid, Paper, Box,
} from '@mui/material';
import AccountSelection from '../components/home/AccountSelection';
import { useWindowSize } from '../utils/customHooks';
import Hero from '../assets/hero.png';
import JobSearch from '../components/JobSearch/JobSearch';

const centerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const Home = ({ createAccount, newLogIn, nav }) => {
  const { width } = useWindowSize();


  if (width < 800) { // mobile rendering
    return (
      <Box sx={{
        display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center',
      }}
      >
        <Paper
          elevation={5}
          square
          sx={{
            width: '100%', p: 2,
          }}
        >
          <JobSearch />

        </Paper>
      </Box>

    );
  } // desktop rendering
  return (
    <Grid container item xs={10} direction="column">
      <Grid
        item
        xs={8}
        className="hero"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${Hero})`,
          backgroundSize: 'cover',
          p: 0,
        }}
      >
        <AccountSelection createAccount={createAccount} newLogIn={newLogIn} nav={nav} />
      </Grid>
    </Grid>
  );
};

export default Home;
