import { useState, useEffect } from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



const UserJobItem = (props) => {
  return (
    <Card >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.job.company}
        </Typography>
        <Typography variant="h5" component="div">
          {props.job.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.job.locations}
        </Typography>
        <Typography sx={{ mb: 2.0 }} color="text.secondary">
          {props.job.interest_level}
        </Typography>
        <Typography variant="body2">
          {props.job.description}
          <br />
          {props.job.date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={(e) => {console.log('e', e)}}>Apply</Button>
      </CardActions>
    </Card>
  )
}

export default UserJobItem;