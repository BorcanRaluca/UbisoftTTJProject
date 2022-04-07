import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

function ReviewList() {
    const [reviews, setReviews] = useState([]);
    const id = 1;
    const URL = `https://localhost:44368/api/ratings/${id}`;

    const getData = () => {
        axios.get(URL)
            .then((response) => {
                setReviews(response.data)
            })
    }
    useEffect(() => {
        getData();
    }, [])

    if (reviews)
        return (
            <div>
                {reviews.map((item, key) => (
                    // <CardImage 
                    //     _name={item.name}
                    //     _type={item.type}
                    //     _releaseDate={item.releaseDate}
                    //     _price={item.price}
                    //     _key={key}
                    //     _id={item.id}
                    //     _dev_id={id} />
                    <span key={key}>{item.userName} {item.comment}</span>
                ))}
            </div>
        );
}

export default ReviewList;