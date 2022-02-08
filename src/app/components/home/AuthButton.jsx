import React from 'react';
import { Typography, Button } from '@mui/material';
import Google from '../../assets/Google.svg';
import Facebook from '../../assets/Facebook logo.svg';
import Apple from '../../assets/apple logo.svg';

const fb = {
  backgroundColor: '#3b5998', color: 'white', '&:hover': { backgroundColor: 'rgba(59, 89, 152, 0.8)' },
};

const apple = {
  backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
};

const google = {
  backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
};

const AuthButton = ({
  text, onClick, styleOverride, textStyleOverride,
}) => {
  let type = {};
  let image = null;
  switch (text) {
    case 'Facebook':
      type = fb;
      image = Facebook;
      break;
    case 'Apple':
      type = apple;
      image = Apple;
      break;
    case 'Google':
      type = google;
      image = Google;
      break;
    default:
      type = {};
      break;
  }
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      sx={[{
        textTransform: 'none', p: 2, pl: 2, m: 1, justifyContent: 'start', width: 300,
      }, type, styleOverride]}
    >
      <img src={image} width="20" alt={`${text} logo`} style={{ transform: 'translateY(-5%)' }} />
      <Typography sx={[{ fontWeight: 700, ml: 1 }, textStyleOverride]}>
        Continue with
        {' '}
        {text}
      </Typography>
    </Button>
  );
};

export default AuthButton;
