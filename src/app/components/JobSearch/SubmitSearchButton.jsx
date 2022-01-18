/* eslint-disable no-unused-expressions */
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { JobSearchContext } from './JobSearchContext';
import PrimaryButton from '../PrimaryButton';

const SubmitSearchButton = ({ setSearchResults, context }) => {
  const navigate = useNavigate();
  const locationHook = useLocation();
  const {
    range,
    sort,
    keywords,
    location,
    experience,
    employmentType,
  } = useContext(JobSearchContext);

  const submitSearch = () => {
    const query = [];
    (keywords) && (query.push(keywords));
    (location) && (query.push(location));
    (sort) && (query.push(sort));
    (range) && (query.push(range));
    (experience) && (query.push(experience));
    (employmentType) && (query.push(employmentType));

    const queryString = query.join('&');
    if (context === 'jobsearch') {
      navigate(`${locationHook.pathname}?${queryString}`);
      axios.get(`http://localhost:3000/data/jobsearch?${queryString}`)
        .then((results) => {
          if (setSearchResults) setSearchResults(results.data);
        });
    } else {
      navigate(`/dashboard?${queryString}`);
    }
  };

  useEffect(() => {
    if (context === 'jobsearch') {
      axios.get(`http://localhost:3000/data/jobsearch${locationHook.search}`)
        .then((results) => {
          setSearchResults(results?.data);
        });
    }
  }, [context, locationHook.search, setSearchResults]);

  return (
    <PrimaryButton
      onClick={submitSearch}
      text="Find Jobs"
    />
  );
};

export default SubmitSearchButton;
