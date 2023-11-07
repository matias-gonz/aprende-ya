import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Rating,
    TextField,
} from '@mui/material';

function CourseModal({ open, onClose, course }) {
    const [editedCourse, setEditedCourse] = useState(null);

    const handleEditClick = () => {
        setEditedCourse({ ...course });
    };


    const handleSaveClick = () => {
        if (editedCourse) {
        const course_id = course.id;
        const apiUrl = `http://localhost:8000/course/${course_id}`;
    
        axios.put(apiUrl, course, { withCredentials: true })
          .then((response) => {
            setEditedCourse(null);
            alert('curso guardado');
          })
          .catch((error) => console.error('Error saving user data: ', error));

          onClose();
      }};

    const handleFieldChange = (event) => {
        if (editedCourse) {
            const { name, value } = event.target;
            setEditedCourse((prevCourse) => ({
                ...prevCourse,
                [name]: value,
            }));
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Detalles del Curso</DialogTitle>
            <DialogContent>
                <Typography variant="h6">
                    {editedCourse ? (
                        <TextField
                            name="title"
                            value={editedCourse.title}
                            onChange={handleFieldChange}
                        />
                    ) : (
                        course.title
                    )}
                </Typography>
                <Typography variant="body2">
                    {editedCourse ? (
                        <TextField
                            name="category"
                            value={editedCourse.category}
                            onChange={handleFieldChange}
                        />
                    ) : (
                        course.category
                    )}
                </Typography>
                <Typography variant="body1">
                    {editedCourse ? (
                        <TextField
                            name="description"
                            value={editedCourse.description}
                            onChange={handleFieldChange}
                        />
                    ) : (
                        course.description
                    )}
                </Typography>
                <Typography variant="body1">
                    Contenido: {course.content}
                </Typography>

            </DialogContent>
            <DialogActions>
                {editedCourse ? (
                    <>
                        <Button onClick={handleSaveClick} color="primary">
                            Guardar
                        </Button>
                        <Button onClick={() => setEditedCourse(null)} color="default">
                            Cancelar
                        </Button>
                    </>
                ) : (
                    <Button onClick={handleEditClick} color="primary">
                        Editar
                    </Button>
                )}
                <Button onClick={onClose} color="default">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CourseModal;
