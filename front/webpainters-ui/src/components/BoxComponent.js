import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./BoxComponent.css"
import { useNavigate } from 'react-router-dom';



function BoxComponent({ _name, _headquartes, _foundingDate, _noEmployees, _key, _id }) {   
    const [foundingDate, setFoundingDate] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const dateConverted = _foundingDate.split("", 10)
        setFoundingDate(dateConverted)
    }, [])

    const handleDeveloperClick = () => {
            //redirect to next page through routes (passing the id? further)
            console.log(_id)
            navigate(`/game-selection/${_id}`);
    }

    return (
        <div className="content">
            <Card sx={{ minWidth: 275 }}  >
                <CardContent >
                    <Typography sx={{ mb: 1.5 , fontSize: 16}} color="text.secondary">
                        {_name}
                    </Typography>
                    <Typography sx={{ fontSize: 11 }} color="text.secondary" gutterBottom>
                        Where it started?
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {_headquartes} - {foundingDate}
                    </Typography>
                    <br />
                    
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        Now numbering more than..
                        <br />
                        {_noEmployees} employees!
                    </Typography>
                   
                </CardContent>
                <CardActions>
                    <Button size="small" style={{ margin: "auto"}} onClick={handleDeveloperClick}>Want to know more?</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default BoxComponent;

