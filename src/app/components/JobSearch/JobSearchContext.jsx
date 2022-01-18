import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const JobSearchContext = createContext(null);

const JobSearchProvider = ({ children }) => {
  const [range, setRange] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [workSite, setWorkSite] = useState('');
  const [sort, setSort] = React.useState('');
  const [salary, setSalary] = useState([0, 200]);
  const [datePosted, setDatePosted] = useState(null);
  const [experience, setExperience] = useState(null);
  const [employmentType, setEmploymentType] = useState(null);
  const locationHook = useLocation();

  useEffect(() => {
    const url = new URLSearchParams(locationHook.search);
    if (url.has('keywords')) setKeywords(url.get('keywords'));
    if (url.has('sort')) setSort(url.get('sort'));
    if (url.has('radius')) setRange(url.get('radius'));
    if (url.has('location')) setLocation(url.get('location'));
    if (url.has('experienceLevel')) setExperience(url.get('experienceLevel'));
    if (url.has('employmentType')) setWorkSite(url.get('employmentType'));
  }, [locationHook.search]);

  const value = React.useMemo(() => ({
    range,
    setRange,
    sort,
    setSort,
    drawer,
    setDrawer,
    salary,
    setSalary,
    workSite,
    setWorkSite,
    location,
    setLocation,
    keywords,
    setKeywords,
    datePosted,
    setDatePosted,
    experience,
    setExperience,
    employmentType,
    setEmploymentType,
  }), [
    range,
    sort,
    drawer,
    salary,
    workSite,
    location,
    keywords,
    datePosted,
    experience,
    employmentType,
  ]);

  return (
    <JobSearchContext.Provider value={value}>
      {children}
    </JobSearchContext.Provider>
  );
};

export default JobSearchProvider;
