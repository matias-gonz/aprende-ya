import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText, Rating, Avatar } from '@mui/material';
import {useEffect, useState} from "react";
import axios from "axios";

const ReviewsTab = ({ course_id }) => {
    const [courseReviews, setCourseReviews] = useState([]);
    const [users, setUsers] = useState([])
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const courseApiUrl = `http://localhost:8000/course/${course_id}/reviews`;

        axios.get(courseApiUrl, {withCredentials: true})
            .then((response) => setCourseReviews(response.data))
            .catch((error) => console.error('Error fetching user data: ', error));

        const userApiUrl = `http://localhost:8000/users`;

        axios.get(userApiUrl, {withCredentials: true})
            .then((response) => setUsers(response.data))
            .catch((error) => console.error('Error fetching user data: ', error));
    }, [course_id]);

    useEffect(() => {
        if (users.length > 0 && courseReviews.length > 0) {
            const reviews = courseReviews.map(relation => {
                const user = users.find(user => user.id === relation.user_id);

                return {
                    name: user ? user.name : 'Usuario no encontrado',
                    comment: relation.review || 'Sin comentario',
                    rating: relation.rating || 0
                };
            });

            setReviews(reviews);
        }
    }, [users, courseReviews]);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Reseñas
            </Typography>
            <Divider />
            <List>
                {reviews.map((review) => (
                    <React.Fragment key={review.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={review.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {review.comment}
                                        </Typography>
                                        <br />
                                        <Rating name="read-only" value={review.rating} readOnly />
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default ReviewsTab;
