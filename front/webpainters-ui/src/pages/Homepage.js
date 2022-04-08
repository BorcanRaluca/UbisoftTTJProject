import '../App.css';
import React, { useState, useEffect } from 'react';
import DevelopersPage from './DevelopersPage';
import Typography from '@mui/material/Typography';

function Homepage() {
  return (

    <div className="App">
      <Typography  sx={{ mb: 1.5, fontSize: 25 }} color="text.secondary">
        The Web-painters 
      </Typography>
      <Typography  variant="overline" sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
        Hey, hey! We are the Web-painters, a team of four girl passionate about technology.
      </Typography>
      <Typography variant="overline" sx={{  mb: 1.5, fontSize: 12, fontWeight:"bold" }} color="text.secondary">
        And today we want to present to you our game shelf! :)
      </Typography>
      <DevelopersPage />

    </div>
  );
}

export default Homepage;