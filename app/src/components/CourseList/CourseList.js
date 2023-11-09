import React, {useEffect, useState} from 'react';
import {Grid, Card, CardContent, Typography, CardActions, Button, CardMedia, Rating, Box} from '@mui/material';

import CourseModal from "../courseModal/CourseModal";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import Container from "@mui/material/Container";

import "./CourseList.css";

function CourseList() {

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([])
  const [category, setCategory] = useState(null)

  useEffect(() => {
    const apiUrl = 'http://localhost:8000/courses';

    axios
      .get(apiUrl, {withCredentials: true})
      .then((response) => {
        console.log('Get course:', response.data);
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
    <Box className={"CourseList"}>
      <Container maxWidth="xl" style={{margin: '20px auto'}}>
        <Grid container spacing={2}>
          {courses.filter((course) => (category == null || course.category === category)).map((course) => (
            <Grid item xs={12} sm={3} key={course.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={'https://vilmanunez.com/wp-content/uploads/2016/03/herramientas-y-recursos-para-crear-curso-online.png'}
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
                  <Box display="flex" alignItems="center" style={{marginTop: '10px'}}>
                    <Rating
                      name="averageRating"
                      value={course.rating}
                      readOnly
                    />
                  </Box>
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
      </Container>
      <CourseModal
        open={isModalOpen}
        onClose={closeModal}
        course={selectedCourse}
      />
    </Box>
  );
}

export default CourseList;
