import React from 'react';
import JobSearchDrawer from './JobSearchDrawer';
import JobSearchProvider from './JobSearchContext';
import JobSearchBars from './JobSearchBars';
import SubmitSearchButton from './SubmitSearchButton';

const JobSearch = ({ setSearchResults, context }) => (
  <JobSearchProvider>
    <JobSearchBars>
      <SubmitSearchButton {...{ setSearchResults, context }} />
      <JobSearchDrawer />
    </JobSearchBars>
  </JobSearchProvider>
);

export default JobSearch;
