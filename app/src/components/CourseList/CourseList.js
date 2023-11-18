import React from "react";
import "./CourseList.css";
import { Component } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Rating,
  Tab,
  Tabs,
  Typography,
  TextField,
  Link
} from "@mui/material";

class CourseCard extends Component {
  state = {
    openDialog: false
  };

  handleClickOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  render() {
    const { course } = this.props;

    return (
      <>
        <Card>
          <CardActionArea href={`/curso/${course.id}`}>
            <CardMedia
              component="img"
              height="140"
              image={course.image}
              alt={course.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {course.title}
              </Typography>
              <Rating name="half-rating-read" value={course.rating | 0} precision={0.5} readOnly />
              <Typography variant="body2">
                {course.description}
              </Typography>
              <Typography variant="body1" className={"CourseList-price"}>
                ${course.price}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
  }
}


class CourseList extends React.Component {
  state = {
    courses: [],
    category: 0,
    searchQuery: ''
  }

  componentDidMount() {
    axios.get('http://localhost:8000/courses')
      .then((response) => {
        this.setState({ courses: response.data });
      })
      .catch((error) => {
        console.error('Error fetching courses: ', error);
      });
  }

  handleTabChange = (event, newValue) => {
    this.setState({ category: newValue });
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value.toLowerCase() });
  }

  render() {
  const { courses, category, searchQuery } = this.state;
  const filteredCourses = courses.filter(course =>
    (category === 5 ? true : course.category === category) &&
    course.title.toLowerCase().includes(searchQuery)
  );

  return (
    <Box className={"CourseList"}>
      <Typography variant={"h3"} className={"CourseList-title"}>Explora cursos</Typography>
      <TextField
        variant="outlined"
        placeholder="Buscar por título"
        onChange={this.handleSearchChange}
        size="small"
        className={"CourseList-search"}
      />
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={category} onChange={this.handleTabChange} textColor="black" indicatorColor="secondary">
          <Tab label="Programación" />
          <Tab label="Matemática" />
          <Tab label="Marketing" />
          <Tab label="Economía" />
          <Tab label="Arte" />
          <Tab label="Todos" />
        </Tabs>
      </Box>
      <Grid container spacing={5}>
        {filteredCourses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
}

export default CourseList;
