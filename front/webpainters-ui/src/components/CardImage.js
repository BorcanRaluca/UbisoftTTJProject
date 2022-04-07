import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function CardImage({ _name, _type, _releaseDate, _price, _key, _id, _dev_id }) {
    const [dateConverted, setDateConverted] = useState();
    const navigate= useNavigate();
    
    useEffect(() => {
        const conv = _releaseDate.split("", 10)
        setDateConverted(conv)
    }, [])

    const handleClickGame = () => {
        navigate(`/game-selection/${_dev_id}/game/${_id}`);
    }

    return (
            <Card sx={{ maxWidth: 210, display: 'inline-block', padding:1.5, margin:2}}>
                <CardActionArea onClick={handleClickGame}>
                    <CardMedia
                        component="img"
                        src={require(`./images/${_id}.jpg`)}
                        alt="games are fun!"

                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            {_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align='center'>
                            <b>Genre </b>: {_type} <br />
                            <b> Starting from </b> : {_price} $<br />
                            <b>Released on </b> : {dateConverted} <br />
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>  
    );
}

export default CardImage;