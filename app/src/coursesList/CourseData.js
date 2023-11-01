import React, {useEffect, useState} from 'react';
import {Grid, Card, CardContent, Typography, CardActions, Button, CardMedia, CircularProgress} from '@mui/material';

import CourseModal from "../CourseModal/CourseModal";
import Header from "../header/Header";
import axios from "axios";

function CourseList() {

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const apiUrl = 'http://localhost:8000/courses';

        axios
            .get(apiUrl, { withCredentials: true })
            .then((response) => {
                console.log('Create course:', response.data);
                setCourses(response.data)
            })
            .catch((error) => {
                console.error('Error trying to create a new course:', error);
            });
    }, []);

    const openModal = (course) => {
        setSelectedCourse(course);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <Header/>
            <Grid container spacing={2}>
                {courses.map((course) => (
                    <Grid item xs={12} sm={6} key={course.id} marginTop={'10px'}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={course.image}
                            />
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
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => openModal(course)}
                                >
                                    Ver Detalles
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <CourseModal
                open={isModalOpen}
                onClose={closeModal}
                course={selectedCourse}
            />
        </div>
    );
}

export default CourseList;