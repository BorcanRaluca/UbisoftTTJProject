import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import CardImage from "../components/CardImage";
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
    console.log(id, idGame);
  }, []);

  const [visible, setVisible] = useState(false);
  const handlerForm = () => {
    setVisible(true);
  };

  const [username, setUserName] = useState();
  const [note, setNote] = useState();
  const [comment, setComment] = useState();

  const handlerSendPOST = () => {
    axios
      .post("https://localhost:44368/api/ratings", {
        userName: username,
        note: note,
        gameId: idGame,
        comment: comment,
      })
      .then(() => {
        setVisible(false);
      });
  };

  const handlerHideForm = () => {
    setVisible(false);
    setUserName('');
    setComment('');
  };

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
          <div clasName="add-review-but">
            <Button variant="contained" onClick={handlerForm}>Add review</Button>
          </div>
        </div>
        <div className="review-section">
          <h4>Alti jucatori au apreciat</h4>

          <ReviewList _idGame={idGame} />

          {visible ? (
            <div className="review-form">
              <form>
                <label>Enter a username:</label>
                <input
                  type="text"
                  onChange={(ev) => setUserName(ev.target.value)}
                ></input>
                <br />
                <label>Enter your note:</label>
                <input
                  type="number"
                  onChange={(ev) => setNote(ev.target.value)}
                ></input>
                <br />
                <label>Enter a comment:</label>
                <input
                  type="textarea"
                  onChange={(ev) => setComment(ev.target.value)}
                ></input>
                <br />
                <button onClick={handlerSendPOST}>Submit</button>
                <button onClick={handlerHideForm}>Cancel</button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    );
}

export default GameReviewPage;
