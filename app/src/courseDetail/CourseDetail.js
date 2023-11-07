// CourseDetail.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';

function CourseDetail(props) {
    const [course, setCourse] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        // Realiza una solicitud para obtener los detalles del curso según el ID proporcionado en los parámetros de la URL
        axios
            .get(`http://localhost:8000/courses/${id}`, { withCredentials: true })
            .then((response) => {
                setCourse(response.data);
            })
            .catch((error) => {
                console.error('Error trying to fetch course details:', error);
            });
    }, [id]);

    if (!course) {
        return <div>Cargando...</div>;
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                {course.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Categoría: {course.category}
            </Typography>
            <img src={course.image} alt={course.title} style={{ maxWidth: '100%' }} />
            <Typography variant="body1" paragraph>
                Descripción: {course.description}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
                Valoración: {course.rating}
            </Typography>
        </Container>
    );
}

export default CourseDetail;
