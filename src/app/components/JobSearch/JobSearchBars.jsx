/* eslint-disable */
import React, { useContext, useState } from 'react';
import {
  Box, Stack, FormControl, InputLabel, Input, InputAdornment,
} from '@mui/material';
import { LocationOn, LocationOff, Tune } from '@mui/icons-material';
import { parseSearchInput } from '../../utils/searchUtils';
import { JobSearchContext } from './JobSearchContext';

export const LocationSearch = ({ sx }) => {
  const [anywhere, setAnywhere] = useState(false);
  const { setLocation } = useContext(JobSearchContext);
  const label = anywhere ? 'Anywhere' : 'Search Location';

  const LocationSearchIcon = () => {
    const icon = anywhere ? <LocationOff /> : <LocationOn sx={{ color: '#85CDD2' }} />;

    return (
      <InputAdornment
        position="end"
        sx={{ cursor: 'pointer' }}
        onClick={() => setAnywhere(!anywhere)}
      >
        {icon}
      </InputAdornment>
    );
  };

  const handleLocationInput = (e) => setLocation(parseSearchInput(e, 'location'));

  return (
    <FormControl variant="outlined" disabled={!!anywhere} sx={sx}>
      <InputLabel color="secondary" htmlFor="location">{label}</InputLabel>
      <Input
        color="secondary"
        id="location"
        onFocus={() => setAnywhere(false)}
        onChange={handleLocationInput}
        endAdornment={[<LocationSearchIcon />]}
      />
    </FormControl>
  );
};

export const KeywordSearch = ({ sx }) => {
  const { keywords, setKeywords } = useContext(JobSearchContext);
  const { drawer, setDrawer } = useContext(JobSearchContext);

  const FiltersIcon = () => (
    <InputAdornment
      sx={{ cursor: 'pointer' }}
      position="end"
      onClick={() => setDrawer(!drawer)}
    >
      <Tune />
    </InputAdornment>
  );

  const handleKeywordsInput = (e) => setKeywords(parseSearchInput(e, 'keywords'));

  return (
    <FormControl {...{ sx }}>
      <InputLabel color="secondary" htmlFor="keywords">
        Search Jobs
      </InputLabel>
      <Input
        color="secondary"
        id="keywords"
        onChange={handleKeywordsInput}
        endAdornment={<FiltersIcon />}
      />
    </FormControl>
  );
};

const JobSearchBars = ({ children }) => {
  const styles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  };
  return (
    <Stack sx={[{ m: 1, p: 1 }]}>
      <Box sx={styles}>
        <KeywordSearch sx={{ mb: 1, width: '45%' }} />
        <LocationSearch sx={{ width: '45%' }} />
      </Box>
      {children}
    </Stack>
  );
};

export default JobSearchBars;
