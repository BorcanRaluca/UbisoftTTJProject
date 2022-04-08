import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function FormModal({_idGame, _id }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate= useNavigate();

    //fields
    const [username, setUsername] = useState();
    const [note, setNote] = useState();
    const [comment, setComment] = useState();

    const handleUsername = (event) => setUsername(event.target.value)
    const handleNote = (event) => setNote(event.target.value)
    const handleComment = (event) => setComment(event.target.value)

    const refresh =() => {
        navigate(`/game-selection/${_id}/game/${_idGame}`);
    }

    const handleClick = () => {
        axios
          .post("https://localhost:44368/api/ratings", {
            userName: username,
            note: note,
            gameId: _idGame,
            comment: comment,
          })
          .then(() => {
            setOpen(false);
            window.location.reload(false);
            
            //refresh()
          });
      };
      
    

    return (
        <div>
            <Button onClick={handleOpen} sx={{ color: "white", backgroundColor: "#81e399", marginLeft: "76px" }}>ADD REVIEW</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: "center" }}>
                        Leave your thoughts!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    </Typography>

                    <TextField id="outlined-basic" label="Username"
                        variant="outlined"
                        sx={{
                            width: "inherit",
                            marginBottom: 3
                        }}
                        onInput={handleUsername}
                    />

                    <TextField sx={{ width: "inherit", marginBottom: 3 }}
                        id="outlined-number"
                        label="Number"
                        type="number"
                        InputProps={{ inputProps: { min: 1, max: 10 } }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onInput={handleNote}
                    />
                    <TextField sx={{ width: "inherit", marginBottom: 3 }}
                        id="outlined-multiline-static"
                        label="Comment"
                        multiline
                        rows={7}
                        onInput={handleComment}
                    />
                    <div>
                        <Button variant="contained" sx={{marginLeft:20}} onClick={handleClick}>SEND</Button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default FormModal;