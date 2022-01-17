/* eslint-disable max-len */
import React from 'react';
import {
  Grid, Paper, Typography, Box, Stack,
} from '@mui/material';
import AccountSelection from '../components/home/AccountSelection';
import { useWindowSize } from '../utils/customHooks';
import Hero from '../assets/hero.png';
import Glass from '../assets/magnifying-glass.png';
import Checklist from '../assets/checklist.png';
import Click from '../assets/click 1.png';
import Job from '../assets/job 1.png';
import CustomCard from '../components/home/CustomCard';
import PrimaryButton from '../components/PrimaryButton';
import JobSearch from '../components/JobSearch/JobSearch';

const centerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const Home = ({ createAccount, newLogIn, nav }) => {
  const { width } = useWindowSize();

  const paperStyles = {
    maxWidth: 250,
    backgroundColor: '#EDFEFF',
    p: 1,
    m: 2,
  };

  const buttons = [
    ['Find Jobs', Glass, 'Use our various filters to find the exact job you need.'],
    ['Organize Your Search', Checklist, 'Use various different filters to find the exact job you’re looking for. Save jobs you’re interested and trask responses at a glance.'],
    ['Apply In One Click', Click, 'When browsing for jobs, you can apply in one click, and we’ll send your resume to a recruiter without you ever leaving the page.'],
    ['Keep Track Of Interviews', Job, 'We’ve set up Google Calandar integration to easily track your upcoming interviews throughout your day to day.']];

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
          <Stack direction="column" sx={{ m: 2 }}>
            <JobSearch />
            <PrimaryButton text="Get Started" />
            <div style={{ height: '200px' }} />
          </Stack>
        </Paper>

        <Typography variant="h5" sx={{ fontWeight: 700, m: 3, mt: 5 }}>How It Works</Typography>

        {buttons.map((buttonData, index) => (
          <Paper elevation={3} sx={paperStyles} key={`buttonData-${index + 1}`}>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>{buttonData[0]}</Typography>
            <Typography variant="caption">{buttonData[2]}</Typography>
          </Paper>
        ))}

        <PrimaryButton text="Get Started" />
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
          display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url(${Hero})`, backgroundSize: 'cover', p: 0,
        }}
      >
        <AccountSelection createAccount={createAccount} newLogIn={newLogIn} nav={nav} />
      </Grid>

      <Grid xs={4} item container sx={[centerStyle]}>
        <Grid item xs={12} sx={centerStyle}>
          <Typography variant="h4" sx={{ m: 3 }}>
            How
            {' '}
            <Typography display="inline" variant="h4" color="secondary" sx={{ fontWeight: 'bold' }}>JobSite</Typography>
            {' '}
            Works
          </Typography>
        </Grid>
        <Grid item container xs={12} sx={[centerStyle]}>
          {buttons.map((buttonData, index) => (
            <Grid item m={4} s={6} key={`Custom-card-${index + 1}`}>
              <CustomCard buttonData={buttonData} centerStyle={centerStyle} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
