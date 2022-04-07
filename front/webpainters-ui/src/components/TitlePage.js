import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import '../App.css';

function TitlePage() {
    return (

      <div className="App">
        <Typography sx={{ mb: 1.5, fontSize: 30 }} color="text.secondary">
          The Web-painters
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
        We wanted a Monet, but all we got was the MS Paint version. :) 
        </Typography>
       

      </div>

    );
}
export default TitlePage;