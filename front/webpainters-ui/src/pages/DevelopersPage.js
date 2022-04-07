import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoxComponent from '../components/BoxComponent';
import TitlePage from '../components/TitlePage';

const URL = "https://localhost:44368/api/developers";

function DevelopersPage() {
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

    if (developers)
        return (
                <div className="list-devs">
                    {developers.map((item, key) => (
                        <BoxComponent
                            _name={item.name}
                            _headquartes={item.headquartes}
                            _foundingDate={item.foundingDate}
                            _noEmployees ={item.noEmployees}
                            _key = {key}
                            _id={item.id}
                        />
                    ))}
                </div>
        );
}

export default DevelopersPage;