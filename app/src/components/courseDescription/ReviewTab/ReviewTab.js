import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText, Rating, Avatar } from '@mui/material';

const ReviewsTab = () => {
    const reviews = [
        {
            id: 1,
            name: 'Juan Perez',
            comment: 'Excelente curso, lo recomiendo totalmente. Muy útil y bien explicado.',
            rating: 5,
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        {
            id: 2,
            name: 'María González',
            comment: 'El contenido del curso es bastante completo. La presentación de algunos temas podría mejorar.',
            rating: 4,
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
        // Agrega más reseñas según sea necesario
    ];

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
