import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import CardImage from '../components/CardImage';
import "./GameReviewPage.css"
import ReviewList from '../components/ReviewList';


function GameReviewPage() {
    const { id, idGame } = useParams();
    const [game, setGame] = useState(); //un singur joc
    const URL = `https://localhost:44368/api/developers/${id}/games/${idGame}`

    const getData = () => {
        axios.get(URL)
            .then((response) => {
                setGame(response.data)
            })
    }
    useEffect(() => {
        getData();
        console.log(id, idGame)
    }, [])

    if (game)
        return (
            <div className='container'>
                <div className='game-details'>
                    <CardImage
                        _name={game.name}
                        _type={game.type}
                        _releaseDate={game.releaseDate}
                        _price={game.price}
                        _id={game.id}
                        _dev_id={id} />
                </div>
                <div className='review-section'>
                    <h4>Alti jucatori au apreciat</h4>
                    <ReviewList/>
                </div>
            </div>
        );
}

export default GameReviewPage;