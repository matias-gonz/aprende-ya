import { useState } from 'react';
import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField, Box, Rating,
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Cookies from "js-cookie";
import axios from "axios";

const ReviewModal = ({ setReviewModal, course_id }) => {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleClose = (e) => {
        setReviewModal(false);
    };

    const handleSubmit = () => {
        const user_id = Cookies.get('user_id');
        const apiUrl = `http://localhost:8000/course/${course_id}/user/${user_id}`;

        const body = {
            user_id: user_id,
            course_id: course_id,
            review: comment,
            rating: parseInt(rating),
            is_finished: true
        }

        console.log(body)

        axios.put(apiUrl, body, {withCredentials: true})
            .then((response) => console.log(response))
            .catch((error) => console.error('Error on update course review: ', error));

        setReviewModal(false);
    };

    return (
        <Box>
            <DialogTitle>Deja tu reseña</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Comentario"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={comment}
                    onChange={handleCommentChange}
                />
                <Box display="flex" alignItems="center" mb={2}>
                    <Rating
                        name="customized-empty"
                        value={rating}
                        precision={1}
                        onChange={handleRatingChange}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        icon={<StarIcon fontSize="inherit" />}
                        max={5}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cerrar</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Enviar
                </Button>
            </DialogActions>
        </Box>
    );
};

export default ReviewModal;