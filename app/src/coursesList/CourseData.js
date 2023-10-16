import React from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';

import Header from "../header/Header";

function CourseList({ courses }) {
    const coursesData = [
        {
            id: 1,
            title: 'Curso de Programación en JavaScript',
            description: 'Aprende a programar en JavaScript desde cero.',
            content: 'Lecciones en video, ejercicios y proyectos prácticos.',
            category: 'Desarrollo Web',
        },
        {
            id: 2,
            title: 'Curso de Diseño Gráfico Avanzado',
            description: 'Mejora tus habilidades de diseño gráfico.',
            content: 'Diseño de logotipos, ilustraciones y manipulación de imágenes.',
            category: 'Diseño Gráfico',
        },
        {
            id: 3,
            title: 'Curso de Marketing Digital',
            description: 'Domina las estrategias de marketing en línea.',
            content: 'Publicidad en redes sociales, SEO y analítica web.',
            category: 'Marketing',
        },
        {
            id: 4,
            title: 'Curso de Fotografía Profesional',
            description: 'Aprende a tomar fotos impresionantes.',
            content: 'Técnicas de fotografía, edición de imágenes y composición.',
            category: 'Fotografía',
        },
    ];


    return (
        <div>
            <Header/>
            <Grid container spacing={2} padding={4}>
                {coursesData.map((course) => (
                    <Grid item xs={12} sm={6} key={course.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {course.title}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    {course.category}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {course.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Detalles
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default CourseList;