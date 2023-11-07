import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Rating,
} from '@mui/material';

function CourseModal({ open, onClose, course }) {
    if (course == null) {
        return;
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Detalles del Curso</DialogTitle>
            <DialogContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2">{course.category}</Typography>
                <Typography variant="body1">{course.description}</Typography>
                <Typography variant="body1">Contenido: {course.content}</Typography>
                <Box display="flex" alignItems="center">
                    <Typography variant="body1" style={{ marginRight: '8px' }}>
                        Puntuación:
                    </Typography>
                    <Rating
                        name="averageRating"
                        value={course.averageRating}
                        readOnly
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CourseModal;