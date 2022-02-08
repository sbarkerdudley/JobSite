/* eslint-disable */
import React, { useContext } from 'react';
import { Drawer, Box, Typography } from '@mui/material';
import JobSearchParams from './JobSearchParams';
import { JobSearchContext } from './JobSearchContext';
import PrimaryButton from '../PrimaryButton';

const JobSearchDrawer = () => {
  const { drawer, setDrawer } = useContext(JobSearchContext);
  const toggleDrawer = () => setDrawer((d) => !d);

  return (
    <Drawer
      anchor="right"
      variant="temporary"
      open={drawer}
      sx={{color: 'secondary'}}
      onClose={toggleDrawer}
    >
      <Box sx={{ minWidth: 250, m: 3 }}>
        <Typography variant={'h4'}>Filters</Typography>
        <JobSearchParams />
        <PrimaryButton onClick={toggleDrawer} text="Filter" />
      </Box>
    </Drawer>
  );
};

export default JobSearchDrawer;
