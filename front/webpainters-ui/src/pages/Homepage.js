import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DevelopersPage from './pages/DevelopersPage';
import Typography from '@mui/material/Typography';


const URL = "https://localhost:44368/api/developers";

function Homepage() {
  const [developers, setDevelopers] = useState([]);

  const getData = () => {
    axios.get(URL)
      .then((response) => {
        setDevelopers(response.data)
      })
  }
  //get data
  useEffect(() => {
    getData();
  }, [])

  const show = () => {
    console.log(developers)
  }
  if (developers)
    return (

      <div className="App">
        <Typography sx={{ mb: 1.5, fontSize: 30 }} color="text.secondary">
          The Web-painters
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
        We wanted a Monet, but all we got was the MS Paint version. :) 
        </Typography>
        <DevelopersPage />

      </div>

    );
}

export default Homepage;