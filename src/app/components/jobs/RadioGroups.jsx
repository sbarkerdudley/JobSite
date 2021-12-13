import React, { useState, useContext } from 'react';
import {
  FormControl, FormControlLabel, FormLabel, InputLabel, RadioGroup, Radio,
} from '@mui/material';
import { JobSearchContext } from './JobSearchContext.jsx';

export const Sort = () => {
  const { sort, setSort } = useContext(JobSearchContext);

  return (
    <FormControl fullWidth>
      <FormLabel id="sort">Sort By</FormLabel>
      <RadioGroup
        aria-label="sort"
        defaultValue=""
        name="sort"
        onChange={(e) => { setSort(e.target.value); }}
      >
        <FormControlLabel value="sort=relevance" label="Relevance" control={<Radio />} />
        <FormControlLabel value="sort=date" label="Date" control={<Radio />} />
        <FormControlLabel value="sort=salary" label="Salary" control={<Radio />} />
      </RadioGroup>
    </FormControl>
  );
};

export const Range = () => {
  const { range, setRange } = useContext(JobSearchContext);

  return (
    <FormControl fullWidth>
      <FormLabel id="range">Location Range</FormLabel>
      <RadioGroup
        // row
        aria-label="range"
        defaultValue=""
        name="range"
        onChange={(e) => { setRange(e.target.value); }}
      >
        <FormControlLabel value="radius=5" label="5 miles" control={<Radio />} />
        <FormControlLabel value="radius=20" label="20 miles" control={<Radio />} />
        <FormControlLabel value="radius=50" label="50 miles" control={<Radio />} />
        <FormControlLabel value="radius=100" label="100 miles" control={<Radio />} />
        <FormControlLabel value="" label="Anywhere" control={<Radio />} />
      </RadioGroup>
    </FormControl>
  );
};

export const Experience = () => {
  const { experience, setExperience } = useContext(JobSearchContext);
  // Non-functional - Responses will have to be filtered server-side

  return (
    <FormControl fullWidth>
      <FormLabel id="experience">Experience Level</FormLabel>
      <RadioGroup
        // row
        aria-label="experience"
        defaultValue={null}
        name="experience"
        onChange={(e) => setExperience(e.target.value)}
      >
        <FormControlLabel value={0} label="Entry Level" control={<Radio />} />
        <FormControlLabel value={1} label="Mid Level" control={<Radio />} />
        <FormControlLabel value={2} label="Senior Level" control={<Radio />} />
        <FormControlLabel value={3} label="Executive Level" control={<Radio />} />
      </RadioGroup>
    </FormControl>
  );
};

export const EmploymentType = () => {
  const { employmentType, setEmploymentType } = useContext(JobSearchContext);

  return (
    <FormControl fullWidth>
      <FormLabel id="employmentType">Employment Type</FormLabel>
      <RadioGroup
        aria-label="employmentType"
        defaultValue={null}
        name="employmentType"
        onChange={(e) => setEmploymentType(e.target.value)}
      >
        <FormControlLabel value="contractperiod=f" label="Full Time" control={<Radio />} />
        <FormControlLabel value="contractperiod=p" label="Part Time" control={<Radio />} />
        <FormControlLabel value="contracttype=i" label="Temporary" control={<Radio />} />
        <FormControlLabel value="contracttype=t" label="Internship" control={<Radio />} />
      </RadioGroup>
    </FormControl>
  );
};

export const WorkSite = () => {
  const { workSite, setWorkSite } = useState(null);

  return (
    <FormControl fullWidth>
      <FormLabel id="workSite">Employment Type</FormLabel>
      <RadioGroup
        aria-label="workSite"
        defaultValue={null}
        name="workSite"
        onChange={(e) => setWorkSite(e.target.value)}
      >
        <FormControlLabel value="remote" label="Remote" control={<Radio />} />
        <FormControlLabel value="onsite" label="On Site" control={<Radio />} />
        <FormControlLabel value="mixed" label="Mixed" control={<Radio />} />
      </RadioGroup>
    </FormControl>
  );
};
