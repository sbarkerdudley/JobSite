import React, { useState } from 'react';
import {
  AppBar, Button, Toolbar, Grid, Popper, Box, Divider,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import TextLogo from '../assets/TextLogo.png';
import MobileLogo from '../assets/MobileLogo.png';
import { useWindowSize } from '../utils/customHooks';
import MobilePopout from './home/MobilePopout';
import Theme from '../Theme';
import SecondaryButton from './SecondaryButton';
import ResumeIcon from '../assets/cv.svg';
import Profile from '../assets/profile.svg';

const NavBar = ({ loggedIn }) => {
  const { width } = useWindowSize();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'profile-popper' : undefined;

  const ovalStyle = {
    position: 'absolute',
    top: -190,
    right: -180,
    borderRadius: '35%',
    width: 280,
    height: 250,
    backgroundColor: '#4A485B',
  };

  function displayPopover() {
    if (loggedIn) {
      return (
        <Box sx={{
          border: 1, p: 1, bgcolor: '#4A485B', display: 'flex', flexDirection: 'column',
        }}
        >
          <Button
            onClick={() => {
              handleClick();
              navigate('/profile');
            }}
            sx={{ textTransform: 'none' }}
          >
            Profile
          </Button>
          <Divider sx={{ backgroundColor: 'white' }} />
          <Button
            onClick={() => {
              handleClick();
              navigate('/jobs');
            }}
            sx={{ textTransform: 'none' }}
          >
            View Saved Jobs
          </Button>
          <Divider sx={{ backgroundColor: 'white' }} />
          <Button
            onClick={() => {
              handleClick();
              navigate('/profile');
            }}
            sx={{ textTransform: 'none' }}
          >
            View Your Resume
          </Button>
        </Box>
      );
    }
    return (
      <Box sx={{
        border: 1, p: 1, bgcolor: '#4A485B', display: 'flex', flexDirection: 'column',
      }}
      >
        <Button
          onClick={() => {
            handleClick();
            navigate('/');
          }}
          sx={{ textTransform: 'none' }}
        >
          Sign in to View Profile
        </Button>
      </Box>
    );
  }

  function createNavElements() {
    if (location.pathname === '/dashboard' || location.pathname === '/jobs') {
      return (
        <Box sx={{
          height: 100, display: 'flex', alignItems: 'end', pb: 2,
        }}
        >
          <SecondaryButton text="Find Jobs" selected={location.pathname === '/dashboard'} onClick={() => navigate('/dashboard')} />
          <SecondaryButton text="View Saved Jobs" selected={location.pathname === '/jobs'} onClick={() => navigate('/jobs')} />
        </Box>
      );
    }
    return null;
  }

  if (width < 800) {
    return (
      <Grid item xs={1} sx={[{ zIndex: 2 }, Theme.palette.azure]}>
        <AppBar position="static" elevation={0} style={{ height: '100%' }}>
          <Toolbar sx={{
            justifyContent: 'space-between', position: 'relative', overflow: 'hidden', pr: 0,
          }}
          >
            <img alt="JobSite" src={MobileLogo} height="60" />
            <Box sx={ovalStyle} />
            <MobilePopout />
          </Toolbar>
        </AppBar>
      </Grid>
    );
  }
  return (
    <Grid item xs={1} sx={[{ zIndex: 2 }, Theme.palette.azure]}>
      <AppBar position="static" elevation={location.pathname === '/dashboard' || location.pathname === '/jobs' ? 0 : 3} style={{ height: '100%' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Button onClick={() => navigate('/')}>
              <img alt="JobSite" src={TextLogo} height="100" />
            </Button>
            {createNavElements()}
          </Box>

          <Box>
            <Button aria-describedby={id} onClick={handleClick}>
              <img src={Profile} alt="Profile" width="50" />
            </Button>

            <Popper id={id} open={open} anchorEl={anchorEl} style={{ zIndex: 3 }}>
              {displayPopover()}
            </Popper>

            <Button onClick={() => navigate('/profile')}>
              <img src={ResumeIcon} alt="Resume" width="50" />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default NavBar;
