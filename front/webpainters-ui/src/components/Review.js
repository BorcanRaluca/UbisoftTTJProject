import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function Review({ _username, _comment, _note, _key, _id }) {
    return (
        <Card sx={{ minWidth: 275, marginBottom: 3, width: 500 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {_username}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {_note}/10
                </Typography>
                <Typography variant="body2">
                {_comment}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Review;