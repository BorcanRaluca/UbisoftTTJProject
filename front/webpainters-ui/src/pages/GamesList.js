import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import CardImage from '../components/CardImage';


function GamesList() {
    const { id, nameCompany } = useParams();
    const [games, setGames] = useState([]);
    const URL = `https://localhost:44368/api/developers/${id}/games`

    const getData = () => {
        axios.get(URL)
            .then((response) => {
                setGames(response.data)
            })
    }
    useEffect(() => {
        getData();
    }, [])

    if (games)
        return (    
            <>
             <h1 style={{textAlign:"center"}}>Listed games for {nameCompany}</h1>
                <div className="game-list" style={{margin:5}}>
                    {games.map((item, key) => (
                        <CardImage 
                            _name={item.name}
                            _type={item.type}
                            _releaseDate={item.releaseDate}
                            _price={item.price}
                            _key={key}
                            _id={item.id}
                            _dev_id={id} />
                    ))}
                </div>
            </>
        );
}

export default GamesList;