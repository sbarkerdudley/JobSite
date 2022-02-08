import { useState, useEffect } from 'react';
import * as React from 'react';
import axios from 'axios';
import {
  Card, Typography, Box, Divider,
} from '@mui/material';
import Interweave from 'interweave';
import ta from 'time-ago';
import OneClickApplyButton from '../OneClickApplyButton/OneClickApplyButton';

const JobFocusItem = ({ job }) => {
  const [description, setDescription] = useState(job?.description || '');

  useEffect(() => {
    setDescription(job.description);
    axios.get('/data/jobsearchdescription', {
      params: {
        url: job?.url,
      },
    })
      .then((results) => {
        setDescription(results.data);
      })
      .catch(() => {
        setDescription(`${job.description} Full Job Description unavailable for this job at this time`);
      });
  }, [job.description, job.url]);

  if (job) {
    return (
      <Card
        variant="outlined"
        sx={{
          mb: 2, position: 'relative', width: 1100, p: 2, backgroundColor: '#EDFEFF', borderColor: '#9096A3', borderRadius: 2, borderWidth: 3, display: 'flex', flexDirection: 'column', mt: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ mb: 1 }} variant="h5" component="div">
              {job.title}
            </Typography>
            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 700 }} color="text.primary" gutterBottom>
              {job.company}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {job.locations}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'end' }}>
            <OneClickApplyButton job={job} />
          </Box>
        </Box>

        <Divider sx={{ mt: 2, mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="button" sx={{ fontWeight: 700 }}>LOCATION</Typography>
          <Typography color="text.secondary">{job.locations}</Typography>
        </Box>

        <Divider sx={{ mt: 2, mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="button" sx={{ fontWeight: 700 }}>POSTED</Typography>
          <Typography color="text.secondary">{ta.ago(job.date)}</Typography>
        </Box>

        <Divider sx={{ mt: 2, mb: 2 }} />

        <Box sx={{ overflowY: 'auto', height: 350 }}>
          <Typography variant="body2">
            <Interweave content={description} />
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 4,
        }}
        >
          <Typography>
            {ta.ago(job.date)}
          </Typography>
        </Box>
      </Card>
    );
  }
  return null;
};

export default JobFocusItem;
