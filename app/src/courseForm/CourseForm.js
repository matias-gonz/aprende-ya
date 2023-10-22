import React, { useState } from 'react';
import {
    Typography,
    TextField,
    Button,
    Container,
    Box,
} from '@mui/material';
import {Link} from "react-router-dom";
import Header from "../header/Header";
import axios from "axios";
import Cookies from "js-cookie";

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px', // Agrega padding alrededor del formulario
};

function CourseForm({ onAddCourse }) {
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        content: '',
        category: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCourse(courseData);

        const apiUrl = 'localhost:8000/' + Cookies.get('user_id') + '/course';

        axios
            .post(apiUrl, courseData)
            .then((response) => {
                console.log('Create course:', response.data);
                Cookies.set('user_id', response.data['user_id'], { expires: 1 });
            })
            .catch((error) => {
                console.error('Error trying to create a new course:', error);
            });
    };

    return (
        <div>
            <Header/>
            <Container maxWidth="sm">
                <Typography variant="h5" component="div" padding={2} display="flex" alignItems="center" justifyContent="center">
                    Agregar Nuevo Curso
                </Typography>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <TextField
                        fullWidth
                        label="Título del Curso"
                        name="title"
                        value={courseData.title}
                        onChange={handleInputChange}
                        style={{ marginBottom: '16px' }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={5}
                        label="Descripción"
                        name="description"
                        value={courseData.description}
                        onChange={handleInputChange}
                        style={{ marginBottom: '16px' }}
                    />
                    <TextField
                        fullWidth
                        label="Contenido"
                        multiline
                        rows={5}
                        name="content"
                        value={courseData.content}
                        onChange={handleInputChange}
                        style={{ marginBottom: '16px' }}
                    />
                    <TextField
                        fullWidth
                        label="Categoría"
                        name="category"
                        value={courseData.category}
                        onChange={handleInputChange}
                        style={{ marginBottom: '16px' }}
                    />
                    <Button type="submit" variant="contained" color="primary" component={Link} to="/cursos">
                        Agregar Curso
                    </Button>
                </form>
            </Container>
        </div>
    );
}

export default CourseForm;