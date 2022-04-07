import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Review from './Review';
import AverageMark from './AverageMark';

function ReviewList({_idGame}) {
    const [reviews, setReviews] = useState([]);

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
        console.log(avg);
    }
    useEffect(() => {
        calcRevAvg();
        console.log("Effect reviews");
    }, [reviews])


    if (reviews)
        return (
            <div>
                <AverageMark 
                        _avgMark={average}
                />
                {reviews.map((item, key) => (
                    <Review 
                        _username={item.userName}
                        _id={item.id}
                        _comment={item.comment}
                        _note={item.note}
                    />
                ))}
            </div>
        );
}

export default ReviewList;