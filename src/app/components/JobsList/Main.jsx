import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import JobItem from './JobItem';
import JobFocusItem from './JobFocusItem';

const Main = ({ jobsData }) => {
  // const [jobsState, setJobs] = useState(jobsData.jobs);
  const [jobFocusState, setItem] = useState(jobsData?.[0]);

  const mainFocusFunction = (targetJobItem) => {
    setItem(targetJobItem);
    console.log('job', targetJobItem);
    // console.log('targetJobItem from main', targetJobItem)
    // console.log('state from main', jobFocusState)
  };

  useEffect(() => {
    setItem(jobsData?.[0]);
  }, [jobsData]);

  return (

    <Box sx={{
      display: 'flex', maxWidth: 1400, mr: 'auto', ml: 'auto',
    }}
    >
      <Box sx={{
        overflowY: 'auto', maxHeight: 700, width: 600, m: 2, mr: 4,
      }}
      >
        {jobsData.map((job, index) => {
          console.log(jobFocusState.url)
          return job.url === jobFocusState.url ?
          <JobItem key={`job-${index + 1}`} selected={true} handleFocus={mainFocusFunction} job={job} /> :
          <JobItem key={`job-${index + 1}`} handleFocus={mainFocusFunction} job={job} />
        })}
      </Box>
      <JobFocusItem job={jobFocusState} />
    </Box>

  );
}

export default Main;
