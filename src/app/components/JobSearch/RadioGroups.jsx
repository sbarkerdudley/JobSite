import React, { useContext } from 'react';
import {
  FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Grid,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { JobSearchContext } from './JobSearchContext';

const radioStyle = { '&.Mui-checked': { color: '#4A485B' } };
const labelStyle = { '&.Mui-focused': { color: '#4A485B', fontWeight: 700 } };
const R = <Radio sx={radioStyle} />;

export const Sort = () => {
  const { setSort } = useContext(JobSearchContext);
  const locationHook = useLocation();
  const url = new URLSearchParams(locationHook.search);

  return (
    <FormControl fullWidth>
      <FormLabel id="sort" sx={labelStyle}>Sort By</FormLabel>
      <RadioGroup
        row
        aria-label="sort"
        defaultValue={url.has('sort') ? `sort=${url.get('sort')}` : null}
        name="sort"
        onChange={(e) => { setSort(e.target.value); }}
      >
        <FormControlLabel key={1} value="sort=relevance" label="Relevance" control={R} />
        <FormControlLabel key={2} value="sort=date" label="Date" control={R} />
        <FormControlLabel key={3} value="sort=salary" label="Salary" control={R} />
      </RadioGroup>
    </FormControl>
  );
};

export const Range = () => {
  const { setRange } = useContext(JobSearchContext);
  const locationHook = useLocation();
  const url = new URLSearchParams(locationHook.search);

  return (
    <FormControl fullWidth>
      <FormLabel id="range" sx={labelStyle}>Location Range</FormLabel>
      <RadioGroup
        aria-label="range"
        defaultValue={url.has('radius') ? `radius=${url.get('radius')}` : null}
        name="range"
        onChange={(e) => { setRange(e.target.value); }}
      >
        <FormControlLabel key="5" value="radius=5" label="5 miles" control={R} />
        <FormControlLabel key="20" value="radius=20" label="20 miles" control={R} />
        <FormControlLabel key="50" value="radius=50" label="50 miles" control={R} />
        <FormControlLabel key="100" value="radius=100" label="100 miles" control={R} />
        <FormControlLabel key="__" value="" label="Anywhere" control={R} />
      </RadioGroup>
    </FormControl>
  );
};

export const Experience = () => {
  const { setExperience } = useContext(JobSearchContext);
  const locationHook = useLocation();
  const url = new URLSearchParams(locationHook.search);

  return (
    <FormControl fullWidth>
      <FormLabel id="experience" sx={labelStyle}>Experience Level</FormLabel>
      <RadioGroup
        row
        aria-label="experience"
        defaultValue={url.has('experienceLevel') ? `experienceLevel=${url.get('experienceLevel')}` : null}
        name="experience"
        onChange={(e) => setExperience(e.target.value)}
      >
        <FormControlLabel value="experienceLevel=Entry" label="Entry" control={R} />
        <FormControlLabel value="experienceLevel=Mid" label="Mid" control={R} />
        <FormControlLabel value="experienceLevel=Senior" label="Senior" control={R} />
        <FormControlLabel value="experienceLevel=Executive" label="Executive" control={R} />
      </RadioGroup>
    </FormControl>
  );
};

export const EmploymentType = () => {
  const { setEmploymentType } = useContext(JobSearchContext);
  const locationHook = useLocation();
  const url = new URLSearchParams(locationHook.search);

  return (
    <FormControl fullWidth>
      <FormLabel id="employmentType" sx={labelStyle}>Employment Type</FormLabel>
      <RadioGroup
        aria-label="employmentType"
        defaultValue={url.has('employmentType') ? `employmentType=${url.get('employmentType')}` : null}
        name="employmentType"
        onChange={(e) => setEmploymentType(e.target.value)}
      >
        <Grid>
          <FormControlLabel value="employmentType=Part-Time" label="Part Time" control={R} />
          <FormControlLabel value="employmentType=Full-Time" label="Full Time" control={R} />
          <FormControlLabel value="employmentType=Temporary" label="Temporary" control={R} />
          <FormControlLabel value="employmentType=Internship" label="Internship" control={R} />
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

export const WorkSite = () => {
  const { setWorkSite } = useContext(JobSearchContext);
  const locationHook = useLocation();
  const url = new URLSearchParams(locationHook.search);

  return (
    <FormControl fullWidth>
      <FormLabel id="worksite" sx={labelStyle}>Work Site</FormLabel>
      <RadioGroup
        row
        aria-label="worksite"
        defaultValue={url.has('worksite') ? `worksite=${url.get('worksite')}` : null}
        name="worksite"
        onChange={(e) => setWorkSite(`worksite=${e.target.value}`)}
      >
        <FormControlLabel value="worksite=Remote" label="Remote" control={R} />
        <FormControlLabel value="worksite=On-site" label="On Site" control={R} />
        <FormControlLabel value="" label="Mixed" control={R} />
      </RadioGroup>
    </FormControl>
  );
};
