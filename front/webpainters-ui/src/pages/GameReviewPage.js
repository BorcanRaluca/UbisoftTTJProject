import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import CardImage from "../components/CardImage";
import FormModal from "../components/FormModal";
import "./GameReviewPage.css";
import ReviewList from "../components/ReviewList";
import Button from '@mui/material/Button';

function GameReviewPage() {
  const { id, idGame } = useParams();
  const [game, setGame] = useState(); //un singur joc
  const URL = `https://localhost:44368/api/developers/${id}/games/${idGame}`;

  const getData = () => {
    axios.get(URL).then((response) => {
      setGame(response.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const [username, setUserName] = useState();
  const [note, setNote] = useState();
  const [comment, setComment] = useState();


  if (game)
    return (
      <div className="container">
        <div className="game-details">
          <CardImage
            _name={game.name}
            _type={game.type}
            _releaseDate={game.releaseDate}
            _price={game.price}
            _id={game.id}
            _dev_id={id}
          />
          <div className="add-review-but">
            <FormModal
          _idGame={idGame}
          _id = {id}
          />
          </div>
        </div>
        <div className="review-section">
          <ReviewList _idGame={idGame} />
        </div>
        <div className="sep">
        </div>
      </div>
    );
}

export default GameReviewPage;
