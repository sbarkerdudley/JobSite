import React, { useState } from 'react';
import {
  Box, Paper, Typography,
} from '@mui/material';
import axios from 'axios';
import JobSearch from '../components/JobSearch/JobSearch';
import Main from '../components/UsersJobList/Main';
import SecondaryButton from '../components/SecondaryButton';

const Jobs = () => {
  const [savedJobsList, setJobs] = useState([]);
  const [interestLevel, setInterest] = useState('');
  const sections = ['Applied', 'Extremely Interested', 'Very Interested', 'Interested'];

  const getSavedJobs = (interestParam) => {
    axios.get('/savedJobs')
      .then((results) => {
        setJobs(results.data);
        setInterest(interestParam);
      })
      .catch(console.error);
  };

  // this is breaking
  const getAppliedJobs = (interestParam) => {
    axios.get('/appliedJobs')
      .then((results) => {
        setJobs(results.data);
        setInterest(interestParam);
      })
      .catch(() => {
        setJobs([{}]);
        setInterest(interestParam);
      });
  };

  const selectJobList = (event) => {
    const buttonName = event.target.innerText;
    switch (buttonName) {
      case 'Applied':
        getAppliedJobs(buttonName);
        break;
      case 'Extremely Interested':
        getSavedJobs(buttonName);
        break;
      case 'Very Interested':
        getSavedJobs(buttonName);
        break;
      case 'Interested':
        getSavedJobs(buttonName);
        break;
      default:
        break;
    }
    // getSavedJobs(buttonName);
  };
  return (
    <Box sx={{ flexDirection: 'column' }}>
      <Paper
        elevation={2}
        square
        sx={{
          width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#EDFEFF', p: 1, mb: 2,
        }}
      >
        <Box sx={{ maxWidth: '50%', width: 1000 }}>
          <JobSearch />
        </Box>
      </Paper>
      <Box sx={{
        display: 'flex', justifyContent: 'center', width: '100%',
      }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, mr: 2 }}>My Jobs</Typography>
        {sections.map((section) => (
          <SecondaryButton
            onClick={(e) => selectJobList(e)}
            value={section}
            text={section}
            selected={section === interestLevel}
          />
        ))}
      </Box>
      <Main
        interestLevel={interestLevel}
        savedJobsList={savedJobsList}
        refreshJobs={getSavedJobs}
      />
    </Box>
  );
};

export default Jobs;
