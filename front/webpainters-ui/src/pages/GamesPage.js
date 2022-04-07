import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import BoxComponent from '../components/BoxComponent';
import axios from 'axios';

function GamesPage() {
    const {id} = useParams();
    const [games, setGames]= useState([]);
    const URL = `https://localhost:44368/api/developers/${id}/games`

    const getData = () => {
        axios.get(URL)
            .then((response) => {
                setGames(response.data)
                console.log(response.data)
            })
    }
    //get data
    useEffect(() => {
        getData();
    }, [])

    if(games)
    return(
        <div>
            <h1>-- Games under the ? name --</h1>
            {games.map((item, key) => (
                        <BoxComponent
                            _name={item.name}
                            _headquartes={item.type}
                            _foundingDate={item.releaseDate}
                            _noEmployees ={item.price}
                            _key = {key}
                            _id={item.id}
                        />
                    ))}
        </div>
    );
}

export default GamesPage;