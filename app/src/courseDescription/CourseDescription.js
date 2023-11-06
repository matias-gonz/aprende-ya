import React from 'react';
import {Container, Typography, Card, CardContent, Button, Grid, Link, Box} from '@mui/material';
import Header from "../header/Header";

const CourseDescription = () => {
    return (
        <div>
            <Header/>
            <Container maxWidth="xl">
                <Typography variant="h4" gutterBottom>
                    Nombre del Curso
                </Typography>
                <Card style={{ margin: '20px auto' }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Descripción del Curso
                        </Typography>
                        <Typography variant="body1">
                            Esta es una descripción detallada del curso. Aquí puedes explicar de qué trata el curso, sus objetivos, el temario y otros detalles relevantes.
                        </Typography>
                    </CardContent>
                </Card>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Material del Curso
                                </Typography>
                                <Box display="flex" style={{ marginTop: '5px'}}>
                                    <Link href="#" color="primary" style={{ marginRight: '10px' }}>
                                        Material 1
                                    </Link>
                                </Box>
                                <Box display="flex" style={{ marginTop: '5px'}}>
                                    <Link href="#" color="primary" style={{ marginRight: '10px' }}>
                                        Material 1
                                    </Link>
                                </Box>
                                <Box display="flex" style={{ marginTop: '5px'}}>
                                    <Link href="#" color="primary" style={{ marginRight: '10px' }}>
                                        Material 1
                                    </Link>
                                </Box>
                            </CardContent>

                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Consultas sobre el Curso
                                </Typography>
                                <Typography variant="body1">
                                    Aquí puedes proporcionar información sobre cómo los estudiantes pueden realizar consultas sobre el curso. Puedes incluir un formulario de contacto o un enlace a una plataforma de preguntas y respuestas.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default CourseDescription;