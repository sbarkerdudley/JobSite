import React, { useContext, useState } from 'react';
import {
  Stack, FormControl, InputLabel, Input, InputAdornment,
} from '@mui/material';
import { LocationOn, LocationOff, Tune } from '@mui/icons-material';
import { parseSearchInput } from '../../utils/searchUtils';
import { JobSearchContext } from './JobSearchContext';

export const LocationSearch = ({ sx }) => {
  const [anywhere, setAnywhere] = useState(false);
  const { setLocation } = useContext(JobSearchContext);
  const label = anywhere ? 'Anywhere' : 'Search Location';

  const LocationSearchIcon = React.memo(() => {
    const icon = anywhere ? <LocationOff /> : <LocationOn sx={{ color: '#85CDD2' }} />;

    return (
      <InputAdornment
        position="end"
        onClick={() => setAnywhere(!anywhere)}
      >
        {icon}
      </InputAdornment>
    );
  }, [anywhere]);

  const handleLocationInput = (e) => setLocation(parseSearchInput(e, 'location'));

  return (
    <FormControl variant="outlined" disabled={!!anywhere} sx={sx}>
      <InputLabel color="secondary" htmlFor="location">{label}</InputLabel>
      <Input
        color="secondary"
        id="location"
        onFocus={() => setAnywhere(false)}
        onChange={handleLocationInput}
        endAdornment={[<LocationSearchIcon anywhere={anywhere} />]}
      />
    </FormControl>
  );
};

const FiltersIcon = () => {
  const { drawer, setDrawer } = useContext(JobSearchContext);
  return (
    <InputAdornment
      sx={{ cursor: 'pointer' }}
      position="end"
      onClick={() => setDrawer(!drawer)}
    >
      <Tune />
    </InputAdornment>
  );
};

export const KeywordSearch = () => {
  const { setKeywords } = useContext(JobSearchContext);

  const handleKeywordsInput = (e) => setKeywords(parseSearchInput(e, 'keywords'));

  return (
    <>
      <InputLabel color="secondary" htmlFor="keywords">
        Search Jobs
      </InputLabel>
      <Input
        id="keywords"
        onChange={handleKeywordsInput}
        endAdornment={<FiltersIcon />}
      />
    </>
  );
};

const JobSearchBars = ({ children }) => (
  <Stack direction="column">
    <FormControl>
      <KeywordSearch />
      <LocationSearch />
      {children}
    </FormControl>
  </Stack>
);

export default JobSearchBars;
