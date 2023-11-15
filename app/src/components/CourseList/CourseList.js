import "./CourseList.css";
import {Component} from "react";
import axios from "axios";
import {
  Box, Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid, Rating,
  Tab,
  Tabs,
  Typography
} from "@mui/material";

class CourseCard extends Component {
  render() {
    const {course} = this.props;
    return (
      <Card>
        <CardActionArea>
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
            <Rating name="half-rating-read" defaultValue={course.rating | 0} precision={0.5} readOnly />
            <Typography variant="body1">
              {course.description}
            </Typography>
            <Typography variant="body1" className={"CourseList-price"}>
              ${course.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" className={"CourseList-inscribirse-button"}>
            Inscribirse
          </Button>
        </CardActions>
      </Card>
    )
  }
}


class CourseList extends Component {
  state = {
    courses: [],
    category: 0,
  }

  constructor(props) {
    super(props);

    axios.get('http://localhost:8000/courses').then((response) => {
      this.setState({courses: response.data});
    }).catch((error) => {
      console.error('Error fetching courses: ', error);
    });
  }

  handleTabChange = (event, newValue) => {
    this.setState({category: newValue});
  }

  render() {
    const {courses, category} = this.state;
    return (
      <Box className={"CourseList"}>
        <Typography variant={"h3"} className={"CourseList-title"}>Explora cursos</Typography>
        <Box sx={{borderBottom: 1, borderColor: 'divider', mb: 3}}>
          <Tabs value={category} onChange={this.handleTabChange} textColor="black" indicatorColor="secondary">
            <Tab label="Programación" className={category === 0 ? 'CourseList-tab-selected' : 'CourseList-tab'}/>
            <Tab label="Matemática" className={category === 1 ? 'CourseList-tab-selected' : 'CourseList-tab'}/>
            <Tab label="Marketing" className={category === 2 ? 'CourseList-tab-selected' : 'CourseList-tab'}/>
            <Tab label="Economía" className={category === 3 ? 'CourseList-tab-selected' : 'CourseList-tab'}/>
            <Tab label="Arte" className={category === 4 ? 'CourseList-tab-selected' : 'CourseList-tab'}/>
          </Tabs>
        </Box>
        <Grid container spacing={5}>
        {courses.filter((course) => (course.category === category)).map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard course={course}/>
          </Grid>
        ))}
        </Grid>
      </Box>
    )
  }
}

export default CourseList;
