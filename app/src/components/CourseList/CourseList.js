import "./CourseList.css";
import {Component} from "react";
import axios from "axios";
import {Box, Tab, Tabs} from "@mui/material";

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
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={category} onChange={this.handleTabChange} textColor="black" indicatorColor="secondary">
            <Tab label="Programación" className={category === 0 ? 'CourseList-tab-selected' : 'CourseList-tab'}/>
            <Tab label="Matemática" className={category === 1 ? 'CourseList-tab-selected' : 'CourseList-tab'}/>
            <Tab label="Marketing" className={category === 2 ? 'CourseList-tab-selected' : 'CourseList-tab'}/>
            <Tab label="Economía" className={category === 3 ? 'CourseList-tab-selected' : 'CourseList-tab'}/>
            <Tab label="Arte" className={category === 4 ? 'CourseList-tab-selected' : 'CourseList-tab'}/>
          </Tabs>
        </Box>
        {courses.filter((course) => (course.category === category)).map((course) => (
          <div>
            <p>{course.title}</p>
          </div>
        ))}
      </Box>
    )
  }
}

export default CourseList;
