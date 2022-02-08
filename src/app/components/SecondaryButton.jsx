import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const SecondaryButton = ({
  text, onClick, sx, textStyleOverride, fullWidth, selected, value,
}) => {
  const selectedStyles = selected ? {
    borderBottom: 3,
    borderColor: '#85CDD2',
  } : {};
  return (
    <Button
      fullWidth={fullWidth}
      variant="text"
      color="secondary"
      onClick={onClick}
      value={value}
      sx={[{
        textTransform: 'none', p: 1, ml: 2, mr: 2, borderRadius: 0,
      }, selectedStyles, sx]}
    >
      <Typography value={value} sx={[{ fontWeight: 700, color: '#0F060A' }, textStyleOverride]}>{text}</Typography>
    </Button>
  );
};

export default SecondaryButton;
