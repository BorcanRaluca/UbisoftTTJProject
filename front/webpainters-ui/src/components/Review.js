import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';




function Review({ _username, _comment, _note, _id, _idGame, status}) {
const [deleted, setDeleted] = useState("false")    
    return (
        <>
        <Card sx={{ minWidth: 275, marginBottom: 3, width: 500 }}>
            <IconButton onClick={() => {
                axios.delete(`https://localhost:44368/api/ratings/${_idGame}/${_id}`)
                setDeleted({status})
                window.location.reload(false);
            }
            }> 
                <DeleteIcon sx={{padding:2, float:"right"}}/>
            </IconButton> 
            <CardContent>
                <Typography sx={{ fontSize: 14, color:"dark", fontWeight:"bold"}} color="text.secondary" gutterBottom>
                {_username}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {_note}/10
                </Typography>
                <Typography variant="body2" sx={{ fontWeight:"italics"}}>
                {_comment}
                </Typography>
            </CardContent>
        </Card>
        </>
    );
}

export default Review;