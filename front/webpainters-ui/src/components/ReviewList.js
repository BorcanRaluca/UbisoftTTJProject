import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Review from './Review';
import AverageMark from './AverageMark';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { textAlign } from '@mui/system';

function ReviewList({_idGame}) {
    const [reviews, setReviews] = useState([]);
    const [status, setStatus] = useState(false);

    const handleState = () => setStatus(!status)

    const URL = `https://localhost:44368/api/ratings/${_idGame}`;

    const getData = () => {
        axios.get(URL)
            .then((response) => {
                setReviews(response.data)
            })
    }
    useEffect(() => {
        getData();
    }, [])

    const [average, setAverage] = useState();
    const calcRevAvg = () => {
        let avg = 0;
        for(let i = 0; i < reviews.length; i++) {
            avg += reviews[i].note;
        }
        avg /= reviews.length;
        setAverage(avg);
    }
    useEffect(() => {
        calcRevAvg();
    }, [reviews, status])


    if (reviews)
        return (
            <div>
                <AverageMark style={"textAlign:right"}
                        _avgMark={Math.round(average*100)/100}
                />
                {reviews.map((item, key) => (
                    <Review 
                        _username={item.userName}
                        _id={item.id}
                        _idGame = {_idGame}
                        _comment={item.comment}
                        _note={item.note}
                        _status = {handleState}
                    />
                ))}
            </div>
        );
}

export default ReviewList;