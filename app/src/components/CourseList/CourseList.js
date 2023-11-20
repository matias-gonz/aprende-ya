import React, {Component} from "react";
import "./CourseList.css";
import axios from "axios";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Rating,
  Tab,
  Tabs,
  TextField,
  Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Cookies from "js-cookie";

class CourseCard extends Component {
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
    searchQuery: '',
    coursesRelation: []
  }

  componentDidMount() {
    axios.get('http://localhost:8000/courses')
      .then((response) => {
        this.setState({ courses: response.data });
      })
      .catch((error) => {
        console.error('Error fetching courses: ', error);
      });

    const user_id = Cookies.get('user_id');
    const apiUrl = `http://localhost:8000/courses/${user_id}`;
    axios.get(apiUrl)
        .then((response) => {
          this.setState({ coursesRelation: response.data });
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
    const { courses, category, searchQuery, coursesRelation } = this.state;

    let filteredCourses = []

    if (category === 0) {
      const userCourseIds = coursesRelation.map(course => course.course_id);
      const userCoursesSet = new Set(userCourseIds);

      filteredCourses = courses.filter(course => userCoursesSet.has(course.id));
    } else {
      filteredCourses = courses.filter(course =>
          (category === 6 ? true : course.category === category) &&
          course.title.toLowerCase().includes(searchQuery)
      );
    }

  return (
    <Box className={"CourseList"}>
      <Typography variant={"h3"} className={"CourseList-title"}>Explora cursos</Typography>
      <Grid container>
        <Grid item>
          <Container style={{ padding: 0 }}>
            <Tabs value={category} onChange={this.handleTabChange} textColor="black" indicatorColor="secondary">
              <Tab label="Mis Cursos" />
              <Tab label="Programación" />
              <Tab label="Matemática" />
              <Tab label="Marketing" />
              <Tab label="Economía" />
              <Tab label="Arte" />
              <Tab label="Todos" />
            </Tabs>
          </Container>
        </Grid>
        <Grid item xs={5}>
          <Container style={{boxSizing: "content-box"}}>
            <TextField
                variant="outlined"
                placeholder="Buscar por título"
                onChange={this.handleSearchChange}
                size="small"
                className={"CourseList-search"}
                fullWidth
                InputProps={{
                  endAdornment: (
                      <InputAdornment position="start">
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                  ),
                }}
            />
          </Container>
        </Grid>
      </Grid>
      <Grid container spacing={5} style={{marginTop: '10px'}}>
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
